import React, { useEffect, useRef, useState } from 'react';
import { useVoiceDetection } from '../../hooks/useVoiceDetection';
import { Dino } from './Dino';
import { ObstacleManager } from './ObstacleManager';
import { Score } from './Score';
import { GameOver } from './GameOver';

export const DinoGame: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const { intensity } = useVoiceDetection();
  const gameLoopRef = useRef<number>();
  const scoreIntervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (intensity > 30 && isPlaying) {
      document.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space' }));
    }
  }, [intensity, isPlaying]);

  const startGame = () => {
    setIsPlaying(true);
    setGameOver(false);
    setScore(0);
    scoreIntervalRef.current = setInterval(() => {
      setScore(prev => prev + 1);
    }, 100);
  };

  const endGame = () => {
    setIsPlaying(false);
    setGameOver(true);
    if (scoreIntervalRef.current) {
      clearInterval(scoreIntervalRef.current);
    }
    if (gameLoopRef.current) {
      cancelAnimationFrame(gameLoopRef.current);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="relative w-[800px] h-[300px] bg-gray-800 rounded-lg overflow-hidden">
        {!isPlaying && !gameOver && (
          <div className="absolute inset-0 flex items-center justify-center flex-col gap-4">
            <h1 className="text-2xl text-white font-bold">Voice Controlled Rabbit Jump</h1>
            <p className="text-gray-300">Make noise to help the rabbit jump over bushes!</p>
            <button
              onClick={startGame}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Start Game
            </button>
          </div>
        )}
        
        {isPlaying && (
          <>
            <Score score={score} />
            <div className="absolute bottom-0 w-full h-[2px] bg-gray-600" />
            <Dino />
            <ObstacleManager onCollision={endGame} isPlaying={isPlaying} />
          </>
        )}

        {gameOver && <GameOver score={score} onRestart={startGame} />}
        
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all duration-100"
              style={{ width: `${Math.min(intensity, 100)}%` }}
            />
          </div>
          <span className="text-white text-sm">{Math.round(intensity)}%</span>
        </div>
      </div>
    </div>
  );
};