'use server';

import { revalidatePath } from 'next/cache';
import { v4 as uuidv4 } from 'uuid';
import { db } from '@/lib/db';
import { Grievance, GrievanceStatus } from '@/types/grievance';
import { grievanceSchema } from '@/lib/validations/grievance';

export async function saveGrievanceAction(
  data: Partial<Grievance>,
  status: GrievanceStatus,
) {
  try {
    const id = data.id || uuidv4();

    // Server-side validation for submitted grievances
    if (
      status === 'Submitted' &&
      data.reporter &&
      data.incident &&
      data.supporting
    ) {
      const result = grievanceSchema.safeParse({
        reporter: data.reporter,
        incident: data.incident,
        supporting: data.supporting,
      });

      if (!result.success) {
        const errorMessages = result.error.issues
          .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
          .join(', ');
        throw new Error(`Validation failed: ${errorMessages}`);
      }
    }

    const grievance: Grievance = {
      ...(data as Grievance),
      id,
      status,
      updatedAt: new Date().toISOString(),
    };

    const saved = await db.save(grievance);
    revalidatePath('/dashboard');
    return saved;
  } catch (error) {
    console.error('Error in saveGrievanceAction:', error);
    throw new Error(
      error instanceof Error
        ? error.message
        : 'Failed to save grievance on server',
    );
  }
}

export async function getGrievancesAction() {
  return await db.getAll();
}

export async function getGrievanceByIdAction(id: string) {
  return await db.getById(id);
}

export async function deleteGrievanceAction(id: string) {
  try {
    await db.delete(id);
    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    console.error('Error in deleteGrievanceAction:', error);
    throw new Error('Failed to delete grievance');
  }
}
