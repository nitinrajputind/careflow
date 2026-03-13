import { Grievance } from '@/types/grievance';

const DB_NAME = 'CareFlowDB';
const STORE_NAME = 'grievances';
const DB_VERSION = 1;

const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject('Not in browser environment');
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject('Failed to open IndexedDB');
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
  });
};

export const storage = {
  getAll: async (): Promise<Grievance[]> => {
    try {
      const db = await openDB();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.getAll();

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject('Failed to fetch grievances');
      });
    } catch (error) {
      console.error(error);
      return [];
    }
  },

  getById: async (id: string): Promise<Grievance | undefined> => {
    try {
      const db = await openDB();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.get(id);

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject('Failed to fetch grievance');
      });
    } catch (error) {
      console.error(error);
      return undefined;
    }
  },

  save: async (
    grievance: Grievance,
  ): Promise<{ success: boolean; data?: Grievance; error?: string }> => {
    try {
      const db = await openDB();

      const updatedGrievance = {
        ...grievance,
        updatedAt: new Date().toISOString(),
        createdAt: grievance.createdAt || new Date().toISOString(),
      };

      return new Promise((resolve) => {
        const transaction = db.transaction(STORE_NAME, 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.put(updatedGrievance);

        request.onsuccess = () =>
          resolve({ success: true, data: updatedGrievance });
        request.onerror = () =>
          resolve({
            success: false,
            error: 'Database error: Could not save data.',
          });
      });
    } catch (error) {
      console.error('IndexedDB save error:', error);
      return { success: false, error: 'Failed to access browser database.' };
    }
  },

  delete: async (id: string): Promise<void> => {
    try {
      const db = await openDB();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.delete(id);

        request.onsuccess = () => resolve();
        request.onerror = () => reject('Failed to delete grievance');
      });
    } catch (error) {
      console.error(error);
    }
  },
};
