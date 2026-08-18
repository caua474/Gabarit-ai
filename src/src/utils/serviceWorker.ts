import { StudyMaterial } from '../types';

export interface ServiceWorkerStatus {
  registered: boolean;
  active: boolean;
  offlineReady: boolean;
}

let swRegistration: ServiceWorkerRegistration | null = null;

export async function registerServiceWorker(): Promise<ServiceWorkerStatus> {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return { registered: false, active: false, offlineReady: false };
  }

  try {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
    });

    swRegistration = registration;

    console.log('[Service Worker] Registrado com sucesso:', registration.scope);

    // Check if worker is active
    const active = !!registration.active;

    return {
      registered: true,
      active,
      offlineReady: true,
    };
  } catch (error) {
    console.warn('[Service Worker] Falha ao registrar Service Worker:', error);
    return { registered: false, active: false, offlineReady: false };
  }
}

/**
 * Sends a message to Service Worker to explicitly cache a Bento summary for offline reading.
 */
export function cacheSummaryInServiceWorker(material: StudyMaterial): boolean {
  try {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: 'CACHE_SUMMARY',
        payload: material,
      });
      return true;
    } else if (swRegistration && swRegistration.active) {
      swRegistration.active.postMessage({
        type: 'CACHE_SUMMARY',
        payload: material,
      });
      return true;
    }
  } catch (e) {
    console.warn('[Service Worker] Erro ao enviar mensagem de cache:', e);
  }
  return false;
}

/**
 * Returns current online status.
 */
export function isOnline(): boolean {
  if (typeof navigator !== 'undefined' && 'onLine' in navigator) {
    return navigator.onLine;
  }
  return true;
}
