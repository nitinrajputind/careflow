export type GrievanceStatus = 'Draft' | 'Submitted';

export interface ReporterDetails {
  name: string;
  email: string;
  employeeId: string;
  department: string;
  shift: 'Day' | 'Evening' | 'Night';
  contactNumber: string;
}

export interface IncidentDetails {
  title: string;
  type: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  date: string;
  location: string;
  description: string;
  witnesses?: string;
  patientId?: string;
}

export interface SupportingInfo {
  additionalNotes?: string;
  attachments?: string[]; // URLs or filenames
  images?: string[]; // Base64 strings
}

export interface Grievance {
  id: string;
  status: GrievanceStatus;
  reporter: ReporterDetails;
  incident: IncidentDetails;
  supporting: SupportingInfo;
  createdAt: string;
  updatedAt: string;
}

export const INCIDENT_TYPES = [
  'Patient Safety',
  'Staff Conduct',
  'Facility Issue',
  'Privacy Breach',
  'Equipment Failure',
  'Other',
];

export const DEPARTMENTS = [
  'Emergency',
  'Pediatrics',
  'Radiology',
  'Surgery',
  'Administration',
  'Nursing',
  'Pharmacy',
];
