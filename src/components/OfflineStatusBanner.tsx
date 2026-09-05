import React, { useState, useEffect } from 'react';

export const OfflineStatusBanner: React.FC = () => {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    setIsOnline(navigator.onLine);
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className="w-full bg-amber-600 text-slate-950 px-4 py-1.5 text-xs font-semibold text-center sticky top-0 z-50">
      ⚡ Você está offline. O banco de dados local continua funcionando!
    </div>
  );
};
