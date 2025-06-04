import React from "react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";

interface InteractiveSliderProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  label: string;
  unit?: string;
  formatValue?: (value: number) => string;
  icon?: React.ReactNode;
}

const InteractiveSlider: React.FC<InteractiveSliderProps> = ({
  value,
  onChange,
  min,
  max,
  step = 1,
  label,
  unit = "",
  formatValue,
  icon,
}) => {
  const displayValue = formatValue ? formatValue(value) : `${value}${unit}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 shadow-lg border border-fitness-accent/10"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {icon && (
            <div className="w-8 h-8 rounded-full bg-fitness-accent/10 flex items-center justify-center text-fitness-accent">
              {icon}
            </div>
          )}
          <span className="font-medium text-fitness-text">{label}</span>
        </div>
        <motion.div
          key={value}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          className="px-3 py-1 bg-fitness-accent/10 rounded-lg text-fitness-accent font-bold"
        >
          {displayValue}
        </motion.div>
      </div>

      <div className="space-y-4">
        <Slider
          value={[value]}
          onValueChange={(values) => onChange(values[0])}
          min={min}
          max={max}
          step={step}
          className="w-full"
        />

        <div className="flex justify-between text-xs text-fitness-text/60">
          <span>
            {min}
            {unit}
          </span>
          <span>
            {max}
            {unit}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default InteractiveSlider;
