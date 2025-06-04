import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Dumbbell, Waves, TreePine, Music, Users, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import FunnelLayout from "@/components/funnel/FunnelLayout";
import { useFunnelStore } from "@/lib/funnel-store";

const Question3 = () => {
  const navigate = useNavigate();
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const { updateUserData, completeStep } = useFunnelStore();

  const activities = [
    {
      value: "gym",
      label: "Gym Workouts",
      description: "Weight training, machines, and cardio equipment",
      icon: <Dumbbell className="w-6 h-6" />,
      emoji: "🏋️",
    },
    {
      value: "swimming",
      label: "Swimming",
      description: "Pool exercises and water-based activities",
      icon: <Waves className="w-6 h-6" />,
      emoji: "🏊",
    },
    {
      value: "outdoor",
      label: "Outdoor Activities",
      description: "Running, hiking, cycling in nature",
      icon: <TreePine className="w-6 h-6" />,
      emoji: "🌲",
    },
    {
      value: "dance",
      label: "Dance & Movement",
      description: "Zumba, dance classes, rhythmic exercises",
      icon: <Music className="w-6 h-6" />,
      emoji: "💃",
    },
    {
      value: "group",
      label: "Group Classes",
      description: "Yoga, Pilates, fitness classes with others",
      icon: <Users className="w-6 h-6" />,
      emoji: "👥",
    },
    {
      value: "home",
      label: "Home Workouts",
      description: "Exercise from the comfort of your home",
      icon: <Home className="w-6 h-6" />,
      emoji: "🏠",
    },
  ];

  const toggleActivity = (activityValue: string) => {
    setSelectedActivities((prev) => {
      if (prev.includes(activityValue)) {
        return prev.filter((a) => a !== activityValue);
      } else {
        return [...prev, activityValue];
      }
    });
  };

  const handleContinue = () => {
    if (selectedActivities.length > 0) {
      updateUserData({ preferredActivity: selectedActivities.join(",") });
      completeStep(5);
      navigate("/funnel/question-4");
    }
  };

  return (
    <FunnelLayout
      step={5}
      title="Which activities do you enjoy most?"
      subtitle="Select all that appeal to you - we'll find the perfect match!"
    >
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {activities.map((activity, index) => {
            const isSelected = selectedActivities.includes(activity.value);

            return (
              <motion.div
                key={activity.value}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className={`p-6 cursor-pointer border-2 transition-all duration-300 hover:shadow-lg ${
                    isSelected
                      ? "border-fitness-accent bg-fitness-accent/10 shadow-lg scale-105"
                      : "border-gray-200 hover:border-fitness-accent/50"
                  }`}
                  onClick={() => toggleActivity(activity.value)}
                >
                  <div className="text-center space-y-3">
                    <motion.div
                      className="relative"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="text-4xl mb-2">{activity.emoji}</div>

                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-fitness-accent rounded-full flex items-center justify-center"
                        >
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </motion.div>
                      )}
                    </motion.div>

                    <div>
                      <h3 className="font-semibold text-fitness-text mb-1">
                        {activity.label}
                      </h3>
                      <p className="text-xs text-fitness-text/70">
                        {activity.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center space-y-4"
        >
          <div className="mb-4">
            <motion.div
              className="inline-flex items-center space-x-2 bg-fitness-accent/10 rounded-full px-4 py-2"
              animate={{
                scale: selectedActivities.length > 0 ? [1, 1.05, 1] : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-sm font-medium text-fitness-accent">
                {selectedActivities.length} selected
              </span>
            </motion.div>
          </div>

          <Button
            onClick={handleContinue}
            disabled={selectedActivities.length === 0}
            className="bg-fitness-accent hover:bg-fitness-accent-dark text-white px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
          </Button>

          <p className="text-sm text-fitness-text/60">
            Select multiple activities to get more personalized recommendations
          </p>
        </motion.div>
      </div>
    </FunnelLayout>
  );
};

export default Question3;
