import React, { useEffect, useRef } from 'react';
import { TreePine } from 'lucide-react';

interface ObstacleProps {
  onCollision: () => void;
  isPlaying: boolean;
}

export const Obstacle: React.FC<ObstacleProps> = ({ onCollision, isPlaying }) => {
  const obstacleRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef(800);
  const speedRef = useRef(2); // Slightly faster speed since we only have 2 seconds
  const collisionCheckedRef = useRef(false);

  useEffect(() => {
    if (!isPlaying) {
      positionRef.current = 800;
      collisionCheckedRef.current = false;
      return;
    }

    let lastTimestamp = 0;
    const FRAME_RATE = 1000 / 60; // 60 FPS

    const moveObstacle = (timestamp: number) => {
      if (!obstacleRef.current) return;

      // Control frame rate
      if (timestamp - lastTimestamp < FRAME_RATE) {
        requestAnimationFrame(moveObstacle);
        return;
      }
      lastTimestamp = timestamp;

      positionRef.current -= speedRef.current;
      
      if (positionRef.current < -50) {
        positionRef.current = 800;
        collisionCheckedRef.current = false;
      }

      obstacleRef.current.style.left = `${positionRef.current}px`;

      // Check collision
      const dinoElement = document.querySelector('[class*="Dino_"]');
      if (dinoElement && obstacleRef.current && !collisionCheckedRef.current) {
        const dinoRect = dinoElement.getBoundingClientRect();
        const obstacleRect = obstacleRef.current.getBoundingClientRect();

        // More precise collision detection with smaller hitbox
        const collisionBuffer = 10;
        if (
          dinoRect.right - collisionBuffer > obstacleRect.left &&
          dinoRect.left + collisionBuffer < obstacleRect.right &&
          dinoRect.bottom - collisionBuffer > obstacleRect.top
        ) {
          collisionCheckedRef.current = true;
          onCollision();
          return;
        }
      }

      if (isPlaying) {
        requestAnimationFrame(moveObstacle);
      }
    };

    const animationId = requestAnimationFrame(moveObstacle);
    return () => cancelAnimationFrame(animationId);
  }, [isPlaying, onCollision]);

  return (
    <div
      ref={obstacleRef}
      className="absolute bottom-0 w-12 h-16 flex items-center justify-center"
      style={{ left: '800px' }}
    >
      <TreePine className="w-12 h-16 text-green-500" />
    </div>
  );
};