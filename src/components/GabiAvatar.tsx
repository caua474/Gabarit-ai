import React from 'react';

interface GabiAvatarProps {
  size?: number;
  showOnlineStatus?: boolean;
}

export const GabiAvatar: React.FC<GabiAvatarProps> = ({
  size = 40,
  showOnlineStatus = true,
}) => {
  return (
    <div className="relative inline-block" style={{ width: size, height: size }}>
      <div
        className="w-full h-full rounded-full overflow-hidden border-2 border-indigo-400/50 bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center shadow-md"
      >
        <span className="text-white font-black select-none" style={{ fontSize: size * 0.4 }}>
          ✨
        </span>
      </div>

      {showOnlineStatus && (
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-slate-900 rounded-full" />
      )}
    </div>
  );
};

