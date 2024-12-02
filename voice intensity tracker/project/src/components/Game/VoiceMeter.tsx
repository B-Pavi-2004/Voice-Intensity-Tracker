import React from 'react';

interface VoiceMeterProps {
  intensity: number;
}

export const VoiceMeter: React.FC<VoiceMeterProps> = ({ intensity }) => {
  return (
    <div className="w-64 h-4 bg-black/30 rounded-full overflow-hidden backdrop-blur-sm border border-white/10">
      <div
        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-100"
        style={{ width: `${Math.min(intensity, 100)}%` }}
      />
    </div>
  );
};