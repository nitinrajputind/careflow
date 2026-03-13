import { DEPARTMENTS, INCIDENT_TYPES } from '@/types/grievance';

// ─── Field Config Type ───────────────────────────────────────────────
export interface FieldOption {
  label: string;
  value: string;
}

export interface FormFieldConfig {
  name: string;
  label: string;
  type?: 'text' | 'email' | 'date' | 'number' | 'textarea' | 'select';
  required?: boolean;
  options?: FieldOption[];
  gridSize?: { xs: number; sm?: number; md?: number };
  rows?: number;
  placeholder?: string;
  helperText?: string;
  shrinkLabel?: boolean;
}

export interface FormSectionConfig {
  title: string;
  description?: string;
  fields: FormFieldConfig[];
}

// ─── Reporter Step Schema ────────────────────────────────────────────
export const reporterFieldsSchema: FormSectionConfig = {
  title: 'Reporter Details',
  description: 'Provide your personal and contact information.',
  fields: [
    {
      name: 'reporter.name',
      label: 'Full Name',
      type: 'text',
      required: true,
      gridSize: { xs: 12, sm: 6 },
      placeholder: 'e.g., John Doe',
    },
    {
      name: 'reporter.employeeId',
      label: 'Employee ID',
      type: 'text',
      required: true,
      gridSize: { xs: 12, sm: 6 },
      placeholder: 'e.g., EMP-0042',
    },
    {
      name: 'reporter.email',
      label: 'Email Address',
      type: 'email',
      required: true,
      gridSize: { xs: 12, sm: 6 },
      placeholder: 'e.g., john.doe@careflow.com',
    },
    {
      name: 'reporter.department',
      label: 'Department',
      type: 'select',
      required: true,
      gridSize: { xs: 12, sm: 6 },
      options: DEPARTMENTS.map((d) => ({ label: d, value: d })),
    },
    {
      name: 'reporter.shift',
      label: 'Current Shift',
      type: 'select',
      required: true,
      gridSize: { xs: 12, sm: 6 },
      options: [
        { label: 'Day Shift', value: 'Day' },
        { label: 'Evening Shift', value: 'Evening' },
        { label: 'Night Shift', value: 'Night' },
      ],
    },
    {
      name: 'reporter.contactNumber',
      label: 'Contact Number',
      type: 'text',
      required: true,
      gridSize: { xs: 12, sm: 6 },
      placeholder: 'e.g., 9876543210',
    },
  ],
};

// ─── Incident Step Schema ────────────────────────────────────────────
export const incidentFieldsSchema: FormSectionConfig = {
  title: 'Incident Details',
  description: 'Describe the incident with as much detail as possible.',
  fields: [
    {
      name: 'incident.title',
      label: 'Incident Title',
      type: 'text',
      required: true,
      gridSize: { xs: 12 },
      placeholder: 'Brief summary of the incident',
    },
    {
      name: 'incident.type',
      label: 'Incident Type',
      type: 'select',
      required: true,
      gridSize: { xs: 12, sm: 6 },
      options: INCIDENT_TYPES.map((t) => ({ label: t, value: t })),
    },
    {
      name: 'incident.severity',
      label: 'Severity Level',
      type: 'select',
      required: true,
      gridSize: { xs: 12, sm: 6 },
      options: [
        { label: 'Low - Minimal Impact', value: 'Low' },
        { label: 'Medium - Moderate Impact', value: 'Medium' },
        { label: 'High - Significant Impact', value: 'High' },
        { label: 'Critical - Immediate Action Required', value: 'Critical' },
      ],
    },
    {
      name: 'incident.date',
      label: 'Incident Date',
      type: 'date',
      required: true,
      gridSize: { xs: 12, sm: 6 },
      shrinkLabel: true,
    },
    {
      name: 'incident.patientId',
      label: 'Patient ID (Optional)',
      type: 'text',
      required: false,
      gridSize: { xs: 12, sm: 6 },
      placeholder: 'If applicable',
    },
    {
      name: 'incident.location',
      label: 'Location',
      type: 'text',
      required: true,
      gridSize: { xs: 12 },
      placeholder: 'e.g., Ward B, Room 203',
    },
    {
      name: 'incident.witnesses',
      label: 'Witnesses (Names / Contact if any)',
      type: 'text',
      required: false,
      gridSize: { xs: 12 },
      placeholder: 'Comma-separated names',
    },
    {
      name: 'incident.description',
      label: 'Detailed Description',
      type: 'textarea',
      required: true,
      gridSize: { xs: 12 },
      rows: 4,
      placeholder: 'Provide a full account of the incident...',
    },
  ],
};

// ─── Supporting Info Step Schema ─────────────────────────────────────
export const supportingFieldsSchema: FormSectionConfig = {
  title: 'Supporting Information',
  description: 'Attach any evidence or additional notes.',
  fields: [
    {
      name: 'supporting.additionalNotes',
      label: 'Additional Notes',
      type: 'textarea',
      required: false,
      gridSize: { xs: 12 },
      rows: 3,
      placeholder: 'Any extra context, follow-up actions, or remarks...',
    },
  ],
};
