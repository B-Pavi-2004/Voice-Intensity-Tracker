import React, { useEffect, useRef, useState } from 'react';
import { Rabbit } from 'lucide-react';

export const Dino: React.FC = () => {
  const [isJumping, setIsJumping] = useState(false);
  const dinoRef = useRef<HTMLDivElement>(null);
  const jumpHeightRef = useRef(0);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space' && !isJumping) {
        jump();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isJumping]);

  const jump = () => {
    setIsJumping(true);
    jumpHeightRef.current = 0;

    const jumpAnimation = () => {
      if (jumpHeightRef.current < 100) {
        jumpHeightRef.current += 4;
        if (dinoRef.current) {
          dinoRef.current.style.bottom = `${jumpHeightRef.current}px`;
        }
        requestAnimationFrame(jumpAnimation);
      } else {
        fall();
      }
    };

    requestAnimationFrame(jumpAnimation);
  };

  const fall = () => {
    const fallAnimation = () => {
      if (jumpHeightRef.current > 0) {
        jumpHeightRef.current -= 4;
        if (dinoRef.current) {
          dinoRef.current.style.bottom = `${jumpHeightRef.current}px`;
        }
        requestAnimationFrame(fallAnimation);
      } else {
        setIsJumping(false);
      }
    };

    requestAnimationFrame(fallAnimation);
  };

  return (
    <div
      ref={dinoRef}
      className="absolute left-20 bottom-0 w-12 h-12 flex items-center justify-center transition-transform"
      style={{ transform: 'translateY(-2px)' }}
    >
      <Rabbit className="w-10 h-10 text-white" />
    </div>
  );
};