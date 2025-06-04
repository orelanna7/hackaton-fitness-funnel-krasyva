import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import FunnelLayout from "@/components/funnel/FunnelLayout";
import InteractiveSlider from "@/components/funnel/InteractiveSlider";
import { useFunnelStore } from "@/lib/funnel-store";

const Question4 = () => {
  const navigate = useNavigate();
  const [waterIntake, setWaterIntake] = useState(8);
  const { updateUserData, completeStep } = useFunnelStore();

  const getWaterEmoji = (glasses: number) => {
    if (glasses < 4) return "🥤";
    if (glasses < 8) return "💧";
    if (glasses < 12) return "🌊";
    return "💎";
  };

  const getWaterFeedback = (glasses: number) => {
    if (glasses < 4) return "Let's work on increasing your hydration!";
    if (glasses < 8) return "Good start! A bit more would be perfect.";
    if (glasses < 12) return "Excellent hydration habits!";
    return "You're a hydration champion!";
  };

  const formatValue = (value: number) => `${value} glasses`;

  const handleContinue = () => {
    updateUserData({ waterIntake });
    completeStep(6);
    navigate("/funnel/question-5");
  };

  return (
    <FunnelLayout
      step={6}
      title="How much water do you drink daily?"
      subtitle="Proper hydration is crucial for optimal workout performance and recovery"
    >
      <div className="max-w-2xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <div className="text-6xl mb-4">{getWaterEmoji(waterIntake)}</div>
          <motion.p
            key={waterIntake}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-lg text-fitness-accent font-medium"
          >
            {getWaterFeedback(waterIntake)}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <InteractiveSlider
            value={waterIntake}
            onChange={setWaterIntake}
            min={1}
            max={16}
            step={1}
            label="Daily Water Intake"
            formatValue={formatValue}
            icon={<Droplets className="w-4 h-4" />}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl p-6 shadow-lg border border-fitness-accent/10"
        >
          <h3 className="font-semibold text-fitness-text mb-3">
            💡 Hydration Tips
          </h3>
          <ul className="space-y-2 text-sm text-fitness-text/70">
            <li>• Start your day with a glass of water</li>
            <li>• Keep a water bottle with you during workouts</li>
            <li>• Drink before you feel thirsty</li>
            <li>• Add lemon or cucumber for variety</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <Button
            onClick={handleContinue}
            className="bg-fitness-accent hover:bg-fitness-accent-dark text-white px-8 py-3"
          >
            <Droplets className="w-4 h-4 mr-2" />
            Continue
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center"
        >
          <p className="text-sm text-fitness-text/60">
            We'll factor your hydration habits into your personalized plan
          </p>
        </motion.div>
      </div>
    </FunnelLayout>
  );
};

export default Question4;
