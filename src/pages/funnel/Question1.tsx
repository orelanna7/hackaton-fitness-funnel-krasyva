import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Activity, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import FunnelLayout from "@/components/funnel/FunnelLayout";
import { useFunnelStore } from "@/lib/funnel-store";

const Question1 = () => {
  const navigate = useNavigate();
  const [selectedFrequency, setSelectedFrequency] = useState<string>("");
  const { updateUserData, completeStep } = useFunnelStore();

  const frequencies = [
    {
      value: "never",
      label: "Never",
      description: "I'm just starting my fitness journey",
      icon: "🌱",
    },
    {
      value: "rarely",
      label: "1-2 times per week",
      description: "I exercise occasionally when I have time",
      icon: "🚶",
    },
    {
      value: "sometimes",
      label: "3-4 times per week",
      description: "I have a regular but flexible routine",
      icon: "🏃",
    },
    {
      value: "often",
      label: "5-6 times per week",
      description: "Exercise is an important part of my lifestyle",
      icon: "💪",
    },
    {
      value: "daily",
      label: "Every day",
      description: "I never miss a day of physical activity",
      icon: "🔥",
    },
  ];

  const handleContinue = () => {
    if (selectedFrequency) {
      updateUserData({ exerciseFrequency: selectedFrequency });
      completeStep(3);
      navigate("/funnel/question-2");
    }
  };

  return (
    <FunnelLayout
      step={3}
      title="How often do you currently exercise?"
      subtitle="This helps us understand your current activity level and create a realistic plan"
    >
      <div className="max-w-3xl mx-auto">
        <div className="grid gap-4 mb-8">
          {frequencies.map((frequency, index) => (
            <motion.div
              key={frequency.value}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={`p-6 cursor-pointer border-2 transition-all duration-300 hover:shadow-lg ${
                  selectedFrequency === frequency.value
                    ? "border-fitness-accent bg-fitness-accent/5 shadow-lg scale-[1.02]"
                    : "border-gray-200 hover:border-fitness-accent/50"
                }`}
                onClick={() => setSelectedFrequency(frequency.value)}
              >
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">{frequency.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-lg font-semibold text-fitness-text">
                        {frequency.label}
                      </h3>
                      {selectedFrequency === frequency.value && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-5 h-5 bg-fitness-accent rounded-full flex items-center justify-center"
                        >
                          <Activity className="w-3 h-3 text-white" />
                        </motion.div>
                      )}
                    </div>
                    <p className="text-fitness-text/70">
                      {frequency.description}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <Button
            onClick={handleContinue}
            disabled={!selectedFrequency}
            className="bg-fitness-accent hover:bg-fitness-accent-dark text-white px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Continue
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-6"
        >
          <p className="text-sm text-fitness-text/60">
            Don't worry if you're just starting - we'll create a plan that works
            for your current level!
          </p>
        </motion.div>
      </div>
    </FunnelLayout>
  );
};

export default Question1;
