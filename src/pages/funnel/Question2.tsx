import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Target, Heart, Zap, Scale, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import FunnelLayout from "@/components/funnel/FunnelLayout";
import { useFunnelStore } from "@/lib/funnel-store";

const Question2 = () => {
  const navigate = useNavigate();
  const [selectedGoal, setSelectedGoal] = useState<string>("");
  const { updateUserData, completeStep } = useFunnelStore();

  const goals = [
    {
      value: "weight-loss",
      label: "Lose Weight",
      description: "Burn calories and shed unwanted pounds",
      icon: <Scale className="w-6 h-6" />,
      color: "from-red-400 to-pink-400",
    },
    {
      value: "muscle-gain",
      label: "Build Muscle",
      description: "Increase strength and muscle mass",
      icon: <Zap className="w-6 h-6" />,
      color: "from-orange-400 to-red-400",
    },
    {
      value: "endurance",
      label: "Improve Endurance",
      description: "Boost cardiovascular health and stamina",
      icon: <Heart className="w-6 h-6" />,
      color: "from-blue-400 to-indigo-400",
    },
    {
      value: "flexibility",
      label: "Increase Flexibility",
      description: "Enhance mobility and reduce stiffness",
      icon: <Target className="w-6 h-6" />,
      color: "from-green-400 to-teal-400",
    },
    {
      value: "wellness",
      label: "General Wellness",
      description: "Maintain health and feel great overall",
      icon: <Smile className="w-6 h-6" />,
      color: "from-purple-400 to-pink-400",
    },
  ];

  const handleContinue = () => {
    if (selectedGoal) {
      updateUserData({ fitnessGoal: selectedGoal });
      completeStep(4);
      navigate("/funnel/question-3");
    }
  };

  return (
    <FunnelLayout
      step={4}
      title="What's your primary fitness goal?"
      subtitle="Choose the goal that matters most to you right now"
    >
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {goals.map((goal, index) => (
            <motion.div
              key={goal.value}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={`p-6 cursor-pointer border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                  selectedGoal === goal.value
                    ? "border-fitness-accent bg-fitness-accent/5 shadow-xl scale-105"
                    : "border-gray-200 hover:border-fitness-accent/50"
                }`}
                onClick={() => setSelectedGoal(goal.value)}
              >
                <div className="text-center space-y-4">
                  <motion.div
                    className={`w-16 h-16 rounded-full bg-gradient-to-r ${goal.color} flex items-center justify-center text-white mx-auto shadow-lg`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {goal.icon}
                  </motion.div>

                  <div>
                    <h3 className="text-lg font-semibold text-fitness-text mb-2">
                      {goal.label}
                    </h3>
                    <p className="text-sm text-fitness-text/70">
                      {goal.description}
                    </p>
                  </div>

                  {selectedGoal === goal.value && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="w-6 h-6 bg-fitness-accent rounded-full flex items-center justify-center mx-auto"
                    >
                      <Target className="w-4 h-4 text-white" />
                    </motion.div>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center space-y-4"
        >
          <Button
            onClick={handleContinue}
            disabled={!selectedGoal}
            className="bg-fitness-accent hover:bg-fitness-accent-dark text-white px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Target className="w-4 h-4 mr-2" />
            Continue
          </Button>

          <p className="text-sm text-fitness-text/60">
            You can always adjust your goals later as you progress!
          </p>
        </motion.div>
      </div>
    </FunnelLayout>
  );
};

export default Question2;
