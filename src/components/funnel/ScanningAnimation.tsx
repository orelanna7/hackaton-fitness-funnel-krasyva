import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ScanningAnimationProps {
  isScanning: boolean;
  onScanComplete?: () => void;
  duration?: number;
}

const ScanningAnimation: React.FC<ScanningAnimationProps> = ({
  isScanning,
  onScanComplete,
  duration = 3000,
}) => {
  const [scanProgress, setScanProgress] = useState(0);

  useEffect(() => {
    if (!isScanning) {
      setScanProgress(0);
      return;
    }

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          onScanComplete?.();
          return 100;
        }
        return prev + 2;
      });
    }, duration / 50);

    return () => clearInterval(interval);
  }, [isScanning, duration, onScanComplete]);

  return (
    <AnimatePresence>
      {isScanning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-10"
        >
          {/* Scanning line */}
          <motion.div
            className="absolute left-0 right-0 h-0.5 bg-fitness-accent shadow-lg"
            style={{
              background:
                "linear-gradient(90deg, transparent, #946FFF, transparent)",
              boxShadow: "0 0 10px #946FFF",
            }}
            animate={{
              top: ["0%", "100%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-30">
            <div className="grid grid-cols-6 grid-rows-8 h-full w-full">
              {Array.from({ length: 48 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="border border-fitness-accent/30"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.7, 0] }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.03,
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Scanning progress */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-black/70 rounded-lg p-3 text-white">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Analyzing...</span>
                <span className="text-sm">{Math.round(scanProgress)}%</span>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-1.5 overflow-hidden">
                <motion.div
                  className="h-full bg-fitness-accent rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${scanProgress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </div>
          </div>

          {/* Corner brackets */}
          <div className="absolute inset-2">
            <div className="relative w-full h-full">
              {/* Top-left */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-fitness-accent" />
              {/* Top-right */}
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-fitness-accent" />
              {/* Bottom-left */}
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-fitness-accent" />
              {/* Bottom-right */}
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-fitness-accent" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScanningAnimation;
