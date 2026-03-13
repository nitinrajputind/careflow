import { z } from 'zod';

export const reporterSchema = z.object({
  name: z.string().trim().min(2, 'Full name must be at least 2 characters'),
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  employeeId: z
    .string()
    .trim()
    .min(3, 'Employee ID must be at least 3 characters'),
  department: z.string().min(1, 'Please select a department'),
  shift: z.enum(['Day', 'Evening', 'Night'], {
    message: 'Please select a shift',
  }),
  contactNumber: z
    .string()
    .trim()
    .min(10, 'Contact number must be at least 10 digits')
    .regex(/^[0-9+\-\s()]+$/, 'Please enter a valid phone number'),
});

export const incidentSchema = z.object({
  title: z.string().trim().min(5, 'Title must be at least 5 characters'),
  type: z.string().min(1, 'Please select an incident type'),
  severity: z.enum(['Low', 'Medium', 'High', 'Critical'], {
    message: 'Please select a severity level',
  }),
  date: z.string().min(1, 'Incident date is required'),
  location: z.string().trim().min(2, 'Location must be at least 2 characters'),
  description: z
    .string()
    .trim()
    .min(10, 'Description must be at least 10 characters'),
  witnesses: z.string().optional(),
  patientId: z.string().optional(),
});

export const supportingSchema = z.object({
  additionalNotes: z.string().optional(),
  images: z.array(z.string()).optional(),
});

export const grievanceSchema = z.object({
  reporter: reporterSchema,
  incident: incidentSchema,
  supporting: supportingSchema,
});

export type ReporterFormData = z.infer<typeof reporterSchema>;
export type IncidentFormData = z.infer<typeof incidentSchema>;
export type SupportingFormData = z.infer<typeof supportingSchema>;
export type GrievanceFormData = z.infer<typeof grievanceSchema>;
