import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Target, Heart, Zap, Scale, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import FunnelLayout from "@/components/funnel/FunnelLayout";
import { useFunnelStore } from "@/lib/funnel-store";

interface Category {
  name: string;
  icon: React.ReactNode;
  progress: number;
  finalScore: number;
  color: string;
}

const CategoryAnalysis = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([
    {
      name: "Cardio Fitness",
      icon: <Heart className="w-5 h-5" />,
      progress: 0,
      finalScore: 78,
      color: "bg-red-500",
    },
    {
      name: "Strength Training",
      icon: <Zap className="w-5 h-5" />,
      progress: 0,
      finalScore: 65,
      color: "bg-orange-500",
    },
    {
      name: "Flexibility",
      icon: <Target className="w-5 h-5" />,
      progress: 0,
      finalScore: 92,
      color: "bg-green-500",
    },
    {
      name: "Weight Management",
      icon: <Scale className="w-5 h-5" />,
      progress: 0,
      finalScore: 71,
      color: "bg-blue-500",
    },
    {
      name: "Endurance",
      icon: <Timer className="w-5 h-5" />,
      progress: 0,
      finalScore: 83,
      color: "bg-purple-500",
    },
  ]);

  const [currentAnalyzing, setCurrentAnalyzing] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalQuestion, setModalQuestion] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const { completeStep } = useFunnelStore();

  useEffect(() => {
    if (currentAnalyzing < categories.length) {
      const timer = setTimeout(() => {
        // Animate progress for current category
        const interval = setInterval(() => {
          setCategories((prev) => {
            const updated = [...prev];
            if (
              updated[currentAnalyzing].progress <
              updated[currentAnalyzing].finalScore
            ) {
              updated[currentAnalyzing].progress += 2;
            } else {
              clearInterval(interval);

              // Show modal for additional questions
              if (Math.random() > 0.6) {
                // 40% chance to show modal
                setModalQuestion(getRandomQuestion());
                setShowModal(true);
              } else {
                setCurrentAnalyzing(currentAnalyzing + 1);
              }
            }
            return updated;
          });
        }, 50);

        return () => clearInterval(interval);
      }, 500);

      return () => clearTimeout(timer);
    } else {
      // All categories analyzed
      setTimeout(() => {
        setIsComplete(true);
      }, 1000);
    }
  }, [currentAnalyzing]);

  const getRandomQuestion = () => {
    const questions = [
      "Do you prefer indoor or outdoor activities?",
      "How important is having a workout buddy?",
      "Do you enjoy competitive activities?",
      "Would you prefer morning or evening workouts?",
      "How do you feel about high-intensity exercises?",
    ];
    return questions[Math.floor(Math.random() * questions.length)];
  };

  const handleModalAnswer = (answer: string) => {
    setShowModal(false);
    // Simulate processing the answer
    setTimeout(() => {
      setCurrentAnalyzing(currentAnalyzing + 1);
    }, 500);
  };

  const handleContinue = () => {
    completeStep(3);
    navigate("/funnel/sport-match");
  };

  return (
    <FunnelLayout
      step={3}
      title="Analyzing Your Fitness Profile"
      subtitle="We're processing your responses to find your perfect workout match"
    >
      <div className="max-w-3xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="text-4xl mb-4">🔍</div>
          <p className="text-fitness-text/70">
            Analyzing {categories.length} fitness categories based on your
            preferences...
          </p>
        </motion.div>

        <div className="space-y-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-10 h-10 rounded-full ${category.color} flex items-center justify-center text-white`}
                    >
                      {category.icon}
                    </div>
                    <h3 className="font-semibold text-fitness-text">
                      {category.name}
                    </h3>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-bold text-fitness-accent">
                      {category.progress}%
                    </div>
                    {index === currentAnalyzing &&
                      category.progress < category.finalScore && (
                        <motion.div
                          animate={{ opacity: [1, 0.5, 1] }}
                          transition={{ repeat: Infinity, duration: 1 }}
                          className="text-xs text-fitness-text/60"
                        >
                          Analyzing...
                        </motion.div>
                      )}
                  </div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <motion.div
                    className={`h-full ${category.color} rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${category.progress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {isComplete && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-6"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="text-6xl"
              >
                ✨
              </motion.div>

              <div>
                <h3 className="text-xl font-semibold text-fitness-text mb-2">
                  Analysis Complete!
                </h3>
                <p className="text-fitness-text/70">
                  We've found your ideal fitness match based on your profile
                </p>
              </div>

              <Button
                onClick={handleContinue}
                className="bg-fitness-accent hover:bg-fitness-accent-dark text-white px-8 py-3"
              >
                See My Perfect Match
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modal for additional questions */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-fitness-text">
              Quick Clarification
            </DialogTitle>
          </DialogHeader>

          <div className="text-center space-y-6 p-4">
            <div className="text-3xl">🤔</div>
            <p className="text-fitness-text">{modalQuestion}</p>

            <div className="space-y-3">
              <Button
                onClick={() => handleModalAnswer("option1")}
                variant="outline"
                className="w-full"
              >
                Morning
              </Button>
              <Button
                onClick={() => handleModalAnswer("option2")}
                variant="outline"
                className="w-full"
              >
                Evening
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </FunnelLayout>
  );
};

export default CategoryAnalysis;
