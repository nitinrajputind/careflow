// ─── Grievance Status ────────────────────────────────────────────────
export const GRIEVANCE_STATUS = {
  DRAFT: 'Draft',
  SUBMITTED: 'Submitted',
} as const;

export type GrievanceStatusType =
  (typeof GRIEVANCE_STATUS)[keyof typeof GRIEVANCE_STATUS];

// ─── Severity Levels ─────────────────────────────────────────────────
export const SEVERITY_LEVELS = ['Low', 'Medium', 'High', 'Critical'] as const;
export type SeverityType = (typeof SEVERITY_LEVELS)[number];

export const SEVERITY_OPTIONS = [
  { label: 'Low - Minimal Impact', value: 'Low' },
  { label: 'Medium - Moderate Impact', value: 'Medium' },
  { label: 'High - Significant Impact', value: 'High' },
  { label: 'Critical - Immediate Action Required', value: 'Critical' },
] as const;

// ─── Shift Options ───────────────────────────────────────────────────
export const SHIFTS = ['Day', 'Evening', 'Night'] as const;
export type ShiftType = (typeof SHIFTS)[number];

export const SHIFT_OPTIONS = [
  { label: 'Day Shift', value: 'Day' },
  { label: 'Evening Shift', value: 'Evening' },
  { label: 'Night Shift', value: 'Night' },
] as const;

// ─── Status Colors ───────────────────────────────────────────────────
export const STATUS_COLORS = {
  Submitted: { bg: '#10B981', text: '#059669', border: '#10B981' },
  Draft: { bg: '#64748B', text: '#475569', border: '#64748B' },
  default: { bg: '#94A3B8', text: '#64748B', border: '#94A3B8' },
} as const;

// ─── Stats Colors ────────────────────────────────────────────────────
export const STAT_CARD_CONFIG = [
  {
    key: 'total',
    label: 'Total Reports',
    color: '#0F172A',
    bg: 'rgba(15, 23, 42, 0.05)',
  },
  {
    key: 'submitted',
    label: 'Submitted',
    color: '#10B981',
    bg: 'rgba(16, 185, 129, 0.05)',
  },
  {
    key: 'drafts',
    label: 'Drafts',
    color: '#F59E0B',
    bg: 'rgba(245, 158, 11, 0.05)',
  },
] as const;

// ─── Form Steps ──────────────────────────────────────────────────────
export const FORM_STEPS = [
  'Reporter Details',
  'Incident Details',
  'Supporting Info',
  'Review & Submit',
] as const;

// ─── File Upload ─────────────────────────────────────────────────────
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const MAX_IMAGE_DIMENSION = 1200;
export const IMAGE_QUALITY = 0.7;
export const ACCEPTED_IMAGE_TYPES = 'image/*';
