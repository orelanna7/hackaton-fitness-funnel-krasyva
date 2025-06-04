import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProgressBarProps {
  progress: number;
  showPercentage?: boolean;
  animated?: boolean;
  showBackButton?: boolean;
  onBack?: () => void;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  showPercentage = true,
  animated = true,
  showBackButton = true,
  onBack,
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };
  return (
    <div className="w-full bg-white/80 backdrop-blur-sm border-b border-fitness-accent/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-3">
            {showBackButton && (
              <Button
                onClick={handleBack}
                variant="ghost"
                size="sm"
                className="p-1 h-auto hover:bg-fitness-accent/10 text-fitness-text"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
            )}
            <span className="text-sm font-medium text-fitness-text">
              Progress
            </span>
          </div>
          {showPercentage && (
            <span className="text-sm font-medium text-fitness-accent">
              {progress}%
            </span>
          )}
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-fitness-accent to-fitness-accent-light rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{
              duration: animated ? 1 : 0,
              ease: "easeOut",
            }}
          />
        </div>

        <div className="flex justify-between mt-1">
          <span className="text-xs text-fitness-text/60">Start</span>
          <span className="text-xs text-fitness-text/60">Complete</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
