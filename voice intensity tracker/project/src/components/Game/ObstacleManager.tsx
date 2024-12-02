import React, { useEffect, useState } from 'react';
import { Obstacle } from './Obstacle';

interface ObstacleManagerProps {
  onCollision: () => void;
  isPlaying: boolean;
}

export const ObstacleManager: React.FC<ObstacleManagerProps> = ({ onCollision, isPlaying }) => {
  const [showObstacle, setShowObstacle] = useState(false);

  useEffect(() => {
    if (!isPlaying) {
      setShowObstacle(false);
      return;
    }

    const spawnObstacle = () => {
      setShowObstacle(true);
      
      // Hide obstacle after 2 seconds
      setTimeout(() => {
        setShowObstacle(false);
      }, 2000);
    };

    // Initial spawn
    spawnObstacle();

    return () => {
      setShowObstacle(false);
    };
  }, [isPlaying]);

  return showObstacle ? <Obstacle onCollision={onCollision} isPlaying={isPlaying} /> : null;
};