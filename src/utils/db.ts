import { StudyMaterial, TutorPlan, ELI5Explanation } from '../types';

const DB_NAME = 'AssistenteEstudosDB';
const DB_VERSION = 3;

export const STORES = {
  MATERIALS: 'materials',
  TUTOR_PLANS: 'tutor_plans',
  ELI5_EXPLANATIONS: 'eli5_explanations',
} as const;

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !('indexedDB' in window)) {
      reject(new Error('IndexedDB não suportado.'));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORES.MATERIALS)) {
        db.createObjectStore(STORES.MATERIALS, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(STORES.TUTOR_PLANS)) {
        db.createObjectStore(STORES.TUTOR_PLANS, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(STORES.ELI5_EXPLANATIONS)) {
        db.createObjectStore(STORES.ELI5_EXPLANATIONS, { keyPath: 'id' });
      }
    };
  });
}

export async function getAllMaterials(): Promise<StudyMaterial[]> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORES.MATERIALS, 'readonly');
      const req = tx.objectStore(STORES.MATERIALS).getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => resolve([]);
    });
  } catch {
    return [];
  }
}

export async function getAllTutorPlans(): Promise<TutorPlan[]> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORES.TUTOR_PLANS, 'readonly');
      const req = tx.objectStore(STORES.TUTOR_PLANS).getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => resolve([]);
    });
  } catch {
    return [];
  }
}

export async function getAllELI5Explanations(): Promise<ELI5Explanation[]> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORES.ELI5_EXPLANATIONS, 'readonly');
      const req = tx.objectStore(STORES.ELI5_EXPLANATIONS).getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => resolve([]);
    });
  } catch {
    return [];
  }
}

export async function deleteMaterial(id: string): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORES.MATERIALS, 'readwrite');
    tx.objectStore(STORES.MATERIALS).delete(id);
  } catch {}
}

export async function deleteTutorPlan(id: string): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORES.TUTOR_PLANS, 'readwrite');
    tx.objectStore(STORES.TUTOR_PLANS).delete(id);
  } catch {}
}

export async function deleteELI5Explanation(id: string): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORES.ELI5_EXPLANATIONS, 'readwrite');
    tx.objectStore(STORES.ELI5_EXPLANATIONS).delete(id);
  } catch {}
}

export async function clearAllMaterials(): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORES.MATERIALS, 'readwrite');
    tx.objectStore(STORES.MATERIALS).clear();
  } catch {}
}

export async function clearAllTutorPlans(): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORES.TUTOR_PLANS, 'readwrite');
    tx.objectStore(STORES.TUTOR_PLANS).clear();
  } catch {}
}

export async function clearAllELI5Explanations(): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORES.ELI5_EXPLANATIONS, 'readwrite');
    tx.objectStore(STORES.ELI5_EXPLANATIONS).clear();
  } catch {}
}

export async function clearEntireDatabase(): Promise<void> {
  await Promise.all([
    clearAllMaterials(),
    clearAllTutorPlans(),
    clearAllELI5Explanations(),
  ]);
}
