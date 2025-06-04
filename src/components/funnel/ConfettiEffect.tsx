import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  delay: number;
}

interface ConfettiEffectProps {
  isActive: boolean;
  duration?: number;
  onComplete?: () => void;
}

const ConfettiEffect: React.FC<ConfettiEffectProps> = ({
  isActive,
  duration = 3000,
  onComplete,
}) => {
  const [confettiPieces, setConfettiPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (isActive) {
      const pieces: ConfettiPiece[] = [];
      const colors = [
        "#946FFF",
        "#B794FF",
        "#7B5AE6",
        "#FFD700",
        "#FF69B4",
        "#00CED1",
      ];

      for (let i = 0; i < 50; i++) {
        pieces.push({
          id: i,
          x: Math.random() * 100,
          color: colors[Math.floor(Math.random() * colors.length)],
          delay: Math.random() * 0.5,
        });
      }

      setConfettiPieces(pieces);

      const timer = setTimeout(() => {
        setConfettiPieces([]);
        onComplete?.();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isActive, duration, onComplete]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {confettiPieces.map((piece) => (
          <motion.div
            key={piece.id}
            className="absolute w-3 h-3 rounded-full"
            style={{
              backgroundColor: piece.color,
              left: `${piece.x}%`,
            }}
            initial={{
              y: -20,
              opacity: 1,
              rotate: 0,
              scale: 1,
            }}
            animate={{
              y: window.innerHeight + 20,
              opacity: [1, 1, 0],
              rotate: 360,
              scale: [1, 0.8, 0.6],
            }}
            transition={{
              duration: 3,
              delay: piece.delay,
              ease: "easeOut",
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ConfettiEffect;
