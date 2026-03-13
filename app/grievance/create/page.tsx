'use client';

import React, { Suspense } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  CircularProgress,
  Alert,
  Snackbar,
  Skeleton,
} from '@mui/material';
import { FormProvider } from 'react-hook-form';
import { Stepper } from '@/components/ui/Stepper';
import { ReporterStep } from './steps/ReporterStep';
import { IncidentStep } from './steps/IncidentStep';
import { SupportingStep } from './steps/SupportingStep';
import { ReviewStep } from './steps/ReviewStep';
import { useGrievanceForm } from '@/hooks/useGrievanceForm';
import { FORM_STEPS } from '@/lib/constants';

// ─── Loading Skeleton ────────────────────────────────────────────────
function FormSkeleton() {
  return (
    <Box sx={{ p: 4 }}>
      <Skeleton
        variant="text"
        width="60%"
        height={40}
        sx={{ mx: 'auto', mb: 4 }}
      />
      <Skeleton variant="rounded" height={60} sx={{ mb: 4 }} />
      {[1, 2, 3].map((i) => (
        <Box key={i} sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Skeleton variant="rounded" height={56} sx={{ flex: 1 }} />
          <Skeleton variant="rounded" height={56} sx={{ flex: 1 }} />
        </Box>
      ))}
    </Box>
  );
}

// ─── Step Renderer ───────────────────────────────────────────────────
function StepContent({
  activeStep,
  isViewMode,
  onEdit,
}: {
  activeStep: number;
  isViewMode: boolean;
  onEdit: (step: number) => void;
}) {
  if (isViewMode) {
    return <ReviewStep onEdit={onEdit} readOnly />;
  }

  switch (activeStep) {
    case 0:
      return <ReporterStep />;
    case 1:
      return <IncidentStep />;
    case 2:
      return <SupportingStep />;
    case 3:
      return <ReviewStep onEdit={onEdit} />;
    default:
      return null;
  }
}

// ─── Main Form Content ──────────────────────────────────────────────
function CreateGrievanceContent() {
  const {
    methods,
    activeStep,
    isSaving,
    isLoading,
    notification,
    isViewMode,
    isEditingSubmitted,
    handleNext,
    handleBack,
    handleSaveDraft,
    handleSubmit,
    setActiveStep,
    clearNotification,
  } = useGrievanceForm();

  if (isLoading) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper sx={{ borderRadius: 2 }}>
          <FormSkeleton />
        </Paper>
      </Container>
    );
  }

  return (
    <>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: '20px',
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: '0 10px 40px -10px rgba(0,0,0,0.08)',
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            align="center"
            sx={{ mb: 4, fontWeight: 'bold' }}
          >
            {isViewMode
              ? 'Grievance Details'
              : 'Healthcare Grievance Submission'}
          </Typography>

          {!isViewMode && (
            <Stepper activeStep={activeStep} steps={[...FORM_STEPS]} />
          )}

          <FormProvider {...methods}>
            <Box sx={{ mt: 4 }}>
              <StepContent
                activeStep={activeStep}
                isViewMode={isViewMode}
                onEdit={setActiveStep}
              />
            </Box>

            {/* Action Buttons */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: isViewMode ? 'center' : 'space-between',
                mt: 6,
              }}
            >
              {isViewMode ? (
                <Button
                  variant="contained"
                  onClick={() => window.history.back()}
                  sx={{ px: 4 }}
                >
                  Back to Dashboard
                </Button>
              ) : (
                <>
                  <Button
                    disabled={activeStep === 0 || isSaving}
                    onClick={handleBack}
                    variant="outlined"
                  >
                    Back
                  </Button>

                  <Box sx={{ display: 'flex', gap: 2 }}>
                    {activeStep < 3 && (
                      <Button
                        onClick={handleSaveDraft}
                        variant="text"
                        disabled={isSaving}
                      >
                        {isSaving ? (
                          <CircularProgress size={20} />
                        ) : (
                          'Save as Draft'
                        )}
                      </Button>
                    )}

                    {activeStep === FORM_STEPS.length - 1 ? (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        disabled={isSaving}
                      >
                        {isSaving ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : isEditingSubmitted ? (
                          'Save Changes'
                        ) : (
                          'Submit Grievance'
                        )}
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        disabled={isSaving}
                      >
                        Next
                      </Button>
                    )}
                  </Box>
                </>
              )}
            </Box>
          </FormProvider>
        </Paper>

        {/* Notification */}
        <Snackbar
          open={!!notification}
          autoHideDuration={4000}
          onClose={clearNotification}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          {notification ? (
            <Alert severity={notification.severity} variant="filled">
              {notification.message}
            </Alert>
          ) : undefined}
        </Snackbar>
      </Container>
    </>
  );
}

// ─── Page Export ──────────────────────────────────────────────────────
export default function CreateGrievancePage() {
  return (
    <Suspense
      fallback={
        <Container maxWidth="md" sx={{ py: 4 }}>
          <Paper sx={{ borderRadius: 2 }}>
            <FormSkeleton />
          </Paper>
        </Container>
      }
    >
      <CreateGrievanceContent />
    </Suspense>
  );
}
