import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import FunnelLayout from "@/components/funnel/FunnelLayout";
import InteractiveSlider from "@/components/funnel/InteractiveSlider";
import { useFunnelStore } from "@/lib/funnel-store";

const Question5 = () => {
  const navigate = useNavigate();
  const [sleepHours, setSleepHours] = useState(7);
  const [stressLevel, setStressLevel] = useState(5);
  const { updateUserData, completeStep } = useFunnelStore();

  const getSleepEmoji = (hours: number) => {
    if (hours < 6) return "😴";
    if (hours < 8) return "😊";
    if (hours < 10) return "😌";
    return "🛌";
  };

  const getStressEmoji = (level: number) => {
    if (level <= 3) return "😌";
    if (level <= 6) return "😐";
    if (level <= 8) return "😰";
    return "🤯";
  };

  const getSleepFeedback = (hours: number) => {
    if (hours < 6) return "More sleep will boost your energy!";
    if (hours < 8) return "Good sleep, but a bit more is ideal.";
    if (hours < 10) return "Perfect amount for recovery!";
    return "You love your sleep time!";
  };

  const getStressFeedback = (level: number) => {
    if (level <= 3) return "You handle stress very well!";
    if (level <= 6) return "Moderate stress levels.";
    if (level <= 8) return "Stress is affecting your wellbeing.";
    return "High stress - let's help you relax!";
  };

  const formatSleep = (value: number) => `${value} hours`;
  const formatStress = (value: number) => `${value}/10`;

  const handleContinue = () => {
    updateUserData({ sleepHours, stressLevel });
    completeStep(7);
    navigate("/funnel/category-analysis");
  };

  return (
    <FunnelLayout
      step={7}
      title="Let's understand your lifestyle"
      subtitle="Sleep and stress levels affect your fitness journey significantly"
    >
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Sleep Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          <div className="text-center">
            <div className="text-5xl mb-3">{getSleepEmoji(sleepHours)}</div>
            <motion.p
              key={sleepHours}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-lg text-fitness-accent font-medium"
            >
              {getSleepFeedback(sleepHours)}
            </motion.p>
          </div>

          <InteractiveSlider
            value={sleepHours}
            onChange={setSleepHours}
            min={4}
            max={12}
            step={0.5}
            label="Hours of Sleep per Night"
            formatValue={formatSleep}
            icon={<Moon className="w-4 h-4" />}
          />
        </motion.div>

        {/* Stress Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          <div className="text-center">
            <div className="text-5xl mb-3">{getStressEmoji(stressLevel)}</div>
            <motion.p
              key={stressLevel}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-lg text-fitness-accent font-medium"
            >
              {getStressFeedback(stressLevel)}
            </motion.p>
          </div>

          <InteractiveSlider
            value={stressLevel}
            onChange={setStressLevel}
            min={1}
            max={10}
            step={1}
            label="Daily Stress Level"
            formatValue={formatStress}
            icon={<Sun className="w-4 h-4" />}
          />
        </motion.div>

        {/* Tips Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl p-6 shadow-lg border border-fitness-accent/10"
        >
          <h3 className="font-semibold text-fitness-text mb-3">
            🌟 Wellness Tips
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-fitness-text/70">
            <div>
              <h4 className="font-medium text-fitness-text mb-2">
                Better Sleep:
              </h4>
              <ul className="space-y-1">
                <li>• Regular bedtime routine</li>
                <li>• No screens before bed</li>
                <li>• Cool, dark environment</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-fitness-text mb-2">
                Stress Relief:
              </h4>
              <ul className="space-y-1">
                <li>• Deep breathing exercises</li>
                <li>• Regular physical activity</li>
                <li>• Mindfulness practices</li>
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <Button
            onClick={handleContinue}
            className="bg-fitness-accent hover:bg-fitness-accent-dark text-white px-8 py-3"
          >
            Continue Analysis
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <p className="text-sm text-fitness-text/60">
            We'll create a plan that works with your sleep and stress patterns
          </p>
        </motion.div>
      </div>
    </FunnelLayout>
  );
};

export default Question5;
