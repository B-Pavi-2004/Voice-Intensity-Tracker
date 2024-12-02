import React, { useEffect, useState } from 'react';
import { useVoiceDetection } from '../../hooks/useVoiceDetection';
import { Volume2, Trophy, Waves } from 'lucide-react';
import { VoiceMeter } from './VoiceMeter';
import { ScoreDisplay } from './ScoreDisplay';

export const VoiceGame: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const { intensity } = useVoiceDetection();

  useEffect(() => {
    if (!isPlaying) return;
    const newScore = Math.round(intensity);
    setScore(newScore);
    if (newScore > highScore) {
      setHighScore(newScore);
    }
  }, [intensity, isPlaying, highScore]);

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-indigo-900 to-gray-900 flex items-center justify-center p-4">
      <div className="relative w-[800px] h-[400px] bg-black/30 backdrop-blur-lg rounded-2xl overflow-hidden border border-indigo-500/20 shadow-2xl">
        {!isPlaying ? (
          <div className="absolute inset-0 flex items-center justify-center flex-col gap-6">
            <Waves className="w-20 h-20 text-indigo-400 animate-pulse" />
            <h1 className="text-3xl text-white font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
              Voice Intensity Tracker
            </h1>
            <p className="text-indigo-200">Make noise to increase your score!</p>
            <div className="flex items-center gap-3 text-indigo-300 mb-2">
              <Trophy className="w-5 h-5" />
              <span>High Score: {highScore}</span>
            </div>
            <button
              onClick={startGame}
              className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all hover:scale-105 transform shadow-lg hover:shadow-indigo-500/30"
            >
              Start Tracking
            </button>
          </div>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
            <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/20 px-4 py-2 rounded-lg">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <span className="text-white font-semibold">{highScore}</span>
            </div>
            
            <Volume2 
              className="w-20 h-20 text-indigo-400 mb-6"
              style={{
                transform: `scale(${1 + (intensity / 100)})`,
                transition: 'transform 0.1s ease-out'
              }}
            />
            
            <ScoreDisplay score={score} intensity={intensity} />
            <VoiceMeter intensity={intensity} />

            <button
              onClick={() => setIsPlaying(false)}
              className="mt-8 px-6 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all border border-white/20 backdrop-blur-sm"
            >
              Stop Tracking
            </button>
          </div>
        )}

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-64 h-64 rounded-full"
              style={{
                background: `radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                transform: `scale(${1 + (intensity / 200)})`,
                transition: 'transform 0.5s ease-out',
                animation: `float ${5 + i * 2}s infinite ease-in-out alternate`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};