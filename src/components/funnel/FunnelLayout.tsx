import React from "react";
import { motion } from "framer-motion";
import { useFunnelStore, calculateProgress } from "@/lib/funnel-store";
import ProgressBar from "./ProgressBar";

interface FunnelLayoutProps {
  children: React.ReactNode;
  step: number;
  title: string;
  subtitle?: string;
  showProgress?: boolean;
}

const FunnelLayout: React.FC<FunnelLayoutProps> = ({
  children,
  step,
  title,
  subtitle,
  showProgress = true,
}) => {
  const { userData } = useFunnelStore();
  const progress = calculateProgress(step);

  return (
    <div className="min-h-screen bg-fitness-bg">
      {showProgress && (
        <div className="fixed top-0 left-0 right-0 z-50">
          <ProgressBar progress={progress} />
        </div>
      )}

      <div className="container mx-auto px-4 py-8 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold text-fitness-text mb-4"
            >
              {title}
            </motion.h1>
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-lg text-fitness-text/80 max-w-2xl mx-auto"
              >
                {subtitle}
              </motion.p>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            {children}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default FunnelLayout;
