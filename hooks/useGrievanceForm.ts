'use client';

import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import {
  grievanceSchema,
  GrievanceFormData,
} from '@/lib/validations/grievance';
import {
  saveGrievanceAction,
  getGrievanceByIdAction,
} from '@/lib/server-actions/grievance';
import { storage } from '@/lib/storage';
import { Grievance } from '@/types/grievance';
import { FORM_STEPS, GRIEVANCE_STATUS } from '@/lib/constants';

// ─── Types ───────────────────────────────────────────────────────────
interface Notification {
  message: string;
  severity: 'success' | 'error';
}

interface UseGrievanceFormReturn {
  // Form
  methods: ReturnType<typeof useForm<GrievanceFormData>>;
  activeStep: number;
  isSaving: boolean;
  isLoading: boolean;
  grievanceId: string | null;
  notification: Notification | null;

  // Mode flags
  isViewMode: boolean;
  isEditingSubmitted: boolean;
  editId: string | null;

  // Handlers
  handleNext: () => Promise<void>;
  handleBack: () => void;
  handleSaveDraft: () => Promise<void>;
  handleSubmit: () => Promise<void>;
  setActiveStep: (step: number) => void;
  clearNotification: () => void;
}

// ─── Step → Field Mapping ────────────────────────────────────────────
const STEP_FIELDS: Record<number, keyof GrievanceFormData | ''> = {
  0: 'reporter',
  1: 'incident',
  2: 'supporting',
  3: '',
};

// ─── Hook ────────────────────────────────────────────────────────────
export function useGrievanceForm(): UseGrievanceFormReturn {
  const [activeStep, setActiveStep] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [grievanceId, setGrievanceId] = useState<string | null>(null);
  const [notification, setNotification] = useState<Notification | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('edit');
  const isViewMode = searchParams.get('view') === 'true';
  const isEditingSubmitted = searchParams.get('edit') !== null;

  const methods = useForm<GrievanceFormData>({
    resolver: zodResolver(grievanceSchema),
    mode: 'onChange',
    defaultValues: {
      reporter: {
        name: '',
        email: '',
        employeeId: '',
        department: '',
        shift: 'Day',
        contactNumber: '',
      },
      incident: {
        title: '',
        type: '',
        severity: 'Medium',
        date: '',
        location: '',
        description: '',
        witnesses: '',
        patientId: '',
      },
      supporting: { additionalNotes: '', images: [] },
    },
  });

  // ─── Load Existing Grievance ─────────────────────────────────────
  useEffect(() => {
    if (!editId) return;

    const loadGrievance = async () => {
      setIsLoading(true);
      try {
        // Try IndexedDB first, then fall back to server
        const data =
          (await storage.getById(editId)) ||
          (await getGrievanceByIdAction(editId));

        if (data) {
          methods.reset({
            reporter: data.reporter,
            incident: data.incident,
            supporting: data.supporting,
          });
          setGrievanceId(data.id);
        }
      } catch (error) {
        console.error('Failed to load grievance:', error);
        setNotification({
          message: 'Failed to load grievance data.',
          severity: 'error',
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadGrievance();
  }, [editId, methods]);

  // ─── Unsaved Changes Warning ─────────────────────────────────────
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (methods.formState.isDirty && !isViewMode) {
        e.preventDefault();
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [methods.formState.isDirty, isViewMode]);

  // ─── Build Grievance Object ──────────────────────────────────────
  const buildGrievance = useCallback(
    (status: string): Grievance => {
      const values = methods.getValues();
      return {
        id: grievanceId || uuidv4(),
        status: status as Grievance['status'],
        reporter: values.reporter,
        incident: values.incident,
        supporting: values.supporting as Grievance['supporting'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    },
    [grievanceId, methods],
  );

  // ─── Save to Storage + Server ────────────────────────────────────
  const persistGrievance = useCallback(
    async (grievance: Grievance): Promise<boolean> => {
      const storageResult = await storage.save(grievance);
      if (!storageResult.success) {
        setNotification({
          message: storageResult.error || 'Failed to save locally.',
          severity: 'error',
        });
        return false;
      }
      await saveGrievanceAction(grievance, grievance.status);
      return true;
    },
    [],
  );

  // ─── Handlers ────────────────────────────────────────────────────
  const handleNext = useCallback(async () => {
    const field = STEP_FIELDS[activeStep];
    if (!field) {
      setActiveStep((prev) => prev + 1);
      return;
    }

    const isValid = await methods.trigger(field);
    if (isValid) {
      setActiveStep((prev) => prev + 1);
    } else {
      setNotification({
        message: 'Please fix the highlighted errors before proceeding.',
        severity: 'error',
      });
    }
  }, [activeStep, methods]);

  const handleBack = useCallback(() => {
    setActiveStep((prev) => prev - 1);
  }, []);

  const handleSaveDraft = useCallback(async () => {
    const values = methods.getValues();

    const hasData =
      values.reporter.name.trim() ||
      values.reporter.email.trim() ||
      values.reporter.employeeId.trim() ||
      values.incident.title.trim() ||
      values.incident.description.trim();

    if (!hasData) {
      setNotification({
        message: 'Please fill in at least some fields before saving a draft.',
        severity: 'error',
      });
      return;
    }

    // Validate current step (non-blocking)
    const field = STEP_FIELDS[activeStep];
    let hasWarnings = false;
    if (field) {
      const stepValid = await methods.trigger(field);
      if (!stepValid) hasWarnings = true;
    }

    setIsSaving(true);
    try {
      const grievance = buildGrievance(GRIEVANCE_STATUS.DRAFT);
      const saved = await persistGrievance(grievance);

      if (saved) {
        setGrievanceId(grievance.id);
        setNotification({
          message: hasWarnings
            ? 'Draft saved with validation warnings. Please review highlighted fields.'
            : 'Draft saved successfully!',
          severity: 'success',
        });
      }
    } catch (error) {
      setNotification({ message: 'Failed to save draft.', severity: 'error' });
    } finally {
      setIsSaving(false);
    }
  }, [activeStep, methods, buildGrievance, persistGrievance]);

  const handleSubmit = useCallback(async () => {
    // Validate entire form
    const isValid = await methods.trigger();

    if (!isValid) {
      const errors = methods.formState.errors;
      if (errors.reporter) setActiveStep(0);
      else if (errors.incident) setActiveStep(1);
      else if (errors.supporting) setActiveStep(2);

      setNotification({
        message: 'Please fix all validation errors before submitting.',
        severity: 'error',
      });
      return;
    }

    setIsSaving(true);
    try {
      const grievance = buildGrievance(GRIEVANCE_STATUS.SUBMITTED);
      const saved = await persistGrievance(grievance);

      if (saved) {
        setNotification({
          message: editId
            ? 'Grievance updated successfully!'
            : 'Grievance submitted successfully!',
          severity: 'success',
        });
        setTimeout(() => router.push('/dashboard'), 1500);
      }
    } catch (error) {
      console.error('Submission error:', error);
      setNotification({
        message: 'Failed to submit grievance.',
        severity: 'error',
      });
    } finally {
      setIsSaving(false);
    }
  }, [methods, buildGrievance, persistGrievance, router, editId]);

  const clearNotification = useCallback(() => {
    setNotification(null);
  }, []);

  return {
    methods,
    activeStep,
    isSaving,
    isLoading,
    grievanceId,
    notification,
    isViewMode,
    isEditingSubmitted,
    editId,
    handleNext,
    handleBack,
    handleSaveDraft,
    handleSubmit,
    setActiveStep,
    clearNotification,
  };
}
