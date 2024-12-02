import React from 'react';

interface ScoreDisplayProps {
  score: number;
  intensity: number;
}

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score, intensity }) => {
  return (
    <div 
      className="relative mb-8 group"
      style={{
        transform: `scale(${1 + (intensity / 200)})`,
        transition: 'transform 0.1s ease-out'
      }}
    >
      <div className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-2">
        {score}
      </div>
      <div className="text-sm text-indigo-300 text-center opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
        Current Intensity
      </div>
    </div>
  );
};