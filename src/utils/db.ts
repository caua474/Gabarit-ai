import { StudyMaterial, TutorPlan, ELI5Explanation } from '../types';

const DB_NAME = 'GabaritaiDB';
const DB_VERSION = 1;

const STORES = {
  MATERIALS: 'materials',
  TUTOR_PLANS: 'tutorPlans',
  ELI5: 'eli5Explanations',
};

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORES.MATERIALS)) {
        db.createObjectStore(STORES.MATERIALS, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(STORES.TUTOR_PLANS)) {
        db.createObjectStore(STORES.TUTOR_PLANS, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(STORES.ELI5)) {
        db.createObjectStore(STORES.ELI5, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function getAllMaterials(): Promise<StudyMaterial[]> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORES.MATERIALS, 'readonly');
    const store = tx.objectStore(STORES.MATERIALS);
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => reject(request.error);
  });
}

export async function getAllTutorPlans(): Promise<TutorPlan[]> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORES.TUTOR_PLANS, 'readonly');
    const store = tx.objectStore(STORES.TUTOR_PLANS);
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => reject(request.error);
  });
}

export async function getAllELI5Explanations(): Promise<ELI5Explanation[]> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORES.ELI5, 'readonly');
    const store = tx.objectStore(STORES.ELI5);
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => reject(request.error);
  });
}

export async function deleteMaterial(id: string): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORES.MATERIALS, 'readwrite');
    const store = tx.objectStore(STORES.MATERIALS);
    const request = store.delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export async function deleteTutorPlan(id: string): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORES.TUTOR_PLANS, 'readwrite');
    const store = tx.objectStore(STORES.TUTOR_PLANS);
    const request = store.delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export async function deleteELI5Explanation(id: string): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORES.ELI5, 'readwrite');
    const store = tx.objectStore(STORES.ELI5);
    const request = store.delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export async function clearAllMaterials(): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORES.MATERIALS, 'readwrite');
    const store = tx.objectStore(STORES.MATERIALS);
    const request = store.clear();
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export async function clearAllTutorPlans(): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORES.TUTOR_PLANS, 'readwrite');
    const store = tx.objectStore(STORES.TUTOR_PLANS);
    const request = store.clear();
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export async function clearAllELI5Explanations(): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORES.ELI5, 'readwrite');
    const store = tx.objectStore(STORES.ELI5);
    const request = store.clear();
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export async function clearEntireDatabase(): Promise<void> {
  await Promise.all([
    clearAllMaterials(),
    clearAllTutorPlans(),
    clearAllELI5Explanations(),
  ]);
}

