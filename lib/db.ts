import { Grievance } from '@/types/grievance';

// Mock in-memory database
// In a real app, this would be a database call
let grievances: Grievance[] = [];

export const db = {
  getAll: async () => {
    return [...grievances].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  },
  getById: async (id: string) => {
    return grievances.find((g) => g.id === id);
  },
  save: async (grievance: Grievance) => {
    const index = grievances.findIndex((g) => g.id === grievance.id);
    if (index !== -1) {
      grievances[index] = { ...grievance, updatedAt: new Date().toISOString() };
    } else {
      grievances.push({
        ...grievance,
        createdAt: grievance.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
    return grievances[index !== -1 ? index : grievances.length - 1];
  },
  delete: async (id: string) => {
    grievances = grievances.filter((g) => g.id !== id);
    return true;
  },
};
