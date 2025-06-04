import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Trophy, Star, Zap, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import FunnelLayout from "@/components/funnel/FunnelLayout";
import { useFunnelStore, calculateSportMatch } from "@/lib/funnel-store";

interface SportResult {
  name: string;
  percentage: number;
  isIdeal?: boolean;
  icon: string;
  description: string;
}

const SportMatch = () => {
  const navigate = useNavigate();
  const { userData, updateUserData, completeStep } = useFunnelStore();
  const [currentPercentage, setCurrentPercentage] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [sportResults, setSportResults] = useState<SportResult[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const getSportIcon = (sport: string) => {
    const icons: { [key: string]: string } = {
      Pilates: "🧘‍♀️",
      Yoga: "🕉️",
      "Gym Training": "🏋️‍♂️",
      Running: "🏃‍♂️",
      Swimming: "🏊‍♀️",
      Cycling: "🚴‍♂️",
    };
    return icons[sport] || "💪";
  };

  const getSportDescription = (sport: string) => {
    const descriptions: { [key: string]: string } = {
      Pilates:
        "Perfect for core strength, flexibility, and mind-body connection",
      Yoga: "Ideal for flexibility, stress relief, and overall wellness",
      "Gym Training": "Great for building strength and muscle definition",
      Running: "Excellent for cardiovascular health and endurance",
      Swimming: "Full-body workout that's easy on joints",
      Cycling: "Low-impact cardio that builds leg strength",
    };
    return descriptions[sport] || "A great fitness activity for your goals";
  };

  // Initialize data only once
  useEffect(() => {
    if (!isInitialized) {
      const matchData = calculateSportMatch(userData);

      const results: SportResult[] = [
        {
          name: matchData.idealSport,
          percentage: matchData.matchPercentage,
          isIdeal: true,
          icon: getSportIcon(matchData.idealSport),
          description: getSportDescription(matchData.idealSport),
        },
        ...matchData.alternatives.map((alt) => ({
          name: alt.name,
          percentage: alt.percentage,
          icon: getSportIcon(alt.name),
          description: getSportDescription(alt.name),
        })),
      ];

      setSportResults(results);

      // Only update if not already set
      if (!userData.idealSport) {
        updateUserData({
          idealSport: matchData.idealSport,
          matchPercentage: matchData.matchPercentage,
          alternativeSports: matchData.alternatives,
        });
      }

      setIsInitialized(true);
    }
  }, [isInitialized, userData, updateUserData]);

  // Animate percentage counter
  useEffect(() => {
    if (isInitialized && sportResults.length > 0) {
      timeoutRef.current = setTimeout(() => {
        intervalRef.current = setInterval(() => {
          setCurrentPercentage((prev) => {
            const targetPercentage = sportResults[0]?.percentage || 0;
            if (prev >= targetPercentage) {
              if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
              }
              setTimeout(() => setShowResults(true), 500);
              return targetPercentage;
            }
            return prev + 2;
          });
        }, 50);
      }, 1000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isInitialized, sportResults]);

  const handleContinue = () => {
    completeStep(4);
    navigate("/funnel/pricing");
  };

  if (!isInitialized || sportResults.length === 0) {
    return (
      <FunnelLayout
        step={4}
        title="Calculating Your Perfect Match..."
        subtitle="Processing your responses to find your ideal workout"
      >
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="text-4xl mb-4 inline-block"
          >
            ⚡
          </motion.div>
          <p className="text-fitness-text/70">
            Please wait while we analyze your preferences...
          </p>
        </div>
      </FunnelLayout>
    );
  }

  return (
    <FunnelLayout
      step={4}
      title="Your Perfect Fitness Match!"
      subtitle="Based on your preferences and goals, we've found your ideal workout"
    >
      <div className="max-w-4xl mx-auto">
        {/* Main Result */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            className="text-8xl mb-6"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            🏆
          </motion.div>

          <h2 className="text-3xl font-bold text-fitness-text mb-4">
            Your Ideal Sport Match
          </h2>

          <Card className="max-w-2xl mx-auto p-8 border-2 border-fitness-accent bg-gradient-to-br from-fitness-accent/5 to-fitness-accent/10">
            <div className="text-center space-y-6">
              <div className="text-6xl">{sportResults[0]?.icon}</div>

              <div>
                <h3 className="text-2xl font-bold text-fitness-text mb-2">
                  {sportResults[0]?.name}
                </h3>
                <p className="text-fitness-text/70">
                  {sportResults[0]?.description}
                </p>
              </div>

              <motion.div
                className="relative"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
              >
                <div className="text-6xl font-bold text-fitness-accent mb-2">
                  {currentPercentage}%
                </div>
                <div className="text-sm text-fitness-text/60">Match Score</div>

                <motion.div
                  className="absolute -inset-4 rounded-full"
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(148, 111, 255, 0.4)",
                      "0 0 0 20px rgba(148, 111, 255, 0)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            </div>
          </Card>
        </motion.div>

        {/* Alternative Sports */}
        <AnimatePresence>
          {showResults && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-semibold text-fitness-text text-center mb-6">
                Other Great Options for You
              </h3>

              <div className="grid md:grid-cols-3 gap-4">
                {sportResults.slice(1).map((sport, index) => (
                  <motion.div
                    key={sport.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                      <div className="text-3xl mb-3">{sport.icon}</div>
                      <h4 className="font-semibold text-fitness-text mb-2">
                        {sport.name}
                      </h4>
                      <div className="text-2xl font-bold text-fitness-accent mb-2">
                        {sport.percentage}%
                      </div>
                      <p className="text-xs text-fitness-text/60">
                        {sport.description}
                      </p>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Benefits Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-white rounded-xl p-6 shadow-lg border border-fitness-accent/10 mt-8"
              >
                <h3 className="font-semibold text-fitness-text mb-4 text-center">
                  Why {sportResults[0]?.name} is Perfect for You
                </h3>

                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div className="space-y-2">
                    <Heart className="w-8 h-8 text-fitness-accent mx-auto" />
                    <h4 className="font-medium text-fitness-text">
                      Matches Your Goals
                    </h4>
                    <p className="text-sm text-fitness-text/70">
                      Aligns perfectly with your fitness objectives
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Zap className="w-8 h-8 text-fitness-accent mx-auto" />
                    <h4 className="font-medium text-fitness-text">
                      Fits Your Lifestyle
                    </h4>
                    <p className="text-sm text-fitness-text/70">
                      Works with your schedule and preferences
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Star className="w-8 h-8 text-fitness-accent mx-auto" />
                    <h4 className="font-medium text-fitness-text">
                      Sustainable
                    </h4>
                    <p className="text-sm text-fitness-text/70">
                      Something you'll actually enjoy doing
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="text-center"
              >
                <Button
                  onClick={handleContinue}
                  className="bg-fitness-accent hover:bg-fitness-accent-dark text-white px-8 py-4 text-lg"
                >
                  <Trophy className="w-5 h-5 mr-2" />
                  Get My Personalized Plan
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FunnelLayout>
  );
};

export default SportMatch;
