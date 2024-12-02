import React from 'react';

interface GameOverProps {
  score: number;
  onRestart: () => void;
}

export const GameOver: React.FC<GameOverProps> = ({ score, onRestart }) => (
  <div className="absolute inset-0 flex items-center justify-center flex-col gap-4 bg-black/70">
    <h2 className="text-3xl text-white font-bold">Game Over!</h2>
    <p className="text-xl text-white">Final Score: {score}</p>
    <button
      onClick={onRestart}
      className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
    >
      Play Again
    </button>
  </div>
);