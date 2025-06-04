import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Activity, Target, Zap, Star } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Personalized Goals",
      description:
        "Get a custom fitness plan tailored to your specific needs and preferences",
    },
    {
      icon: <Activity className="w-6 h-6" />,
      title: "Smart Analysis",
      description:
        "AI-powered body analysis to understand your current fitness level",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Quick Results",
      description: "Find your perfect workout in just 10 simple steps",
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Expert Matching",
      description: "Get matched with activities that align with your lifestyle",
    },
  ];

  return (
    <div className="min-h-screen bg-fitness-bg">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <motion.h1
              className="text-5xl md:text-6xl font-bold text-fitness-text mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Find Your Perfect
              <span className="block text-fitness-accent">Fitness Journey</span>
            </motion.h1>

            <motion.p
              className="text-xl text-fitness-text/80 mb-8 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Take our personalized quiz to discover the ideal type of physical
              activity that matches your goals, preferences, and lifestyle. Get
              a custom training plan designed just for you.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Button
                onClick={() => navigate("/funnel/photo-upload")}
                size="lg"
                className="bg-fitness-accent hover:bg-fitness-accent-dark text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse-glow"
              >
                Start Your Journey
              </Button>
            </motion.div>
          </motion.div>

          {/* Animated Journey Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mb-16"
          >
            <div className="relative">
              <div className="flex justify-center items-center space-x-4 mb-8">
                {[1, 2, 3, 4, 5].map((step, index) => (
                  <motion.div
                    key={step}
                    className="flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + index * 0.1 }}
                  >
                    <div className="w-12 h-12 rounded-full bg-fitness-accent text-white flex items-center justify-center font-bold text-lg shadow-lg">
                      {step}
                    </div>
                    {index < 4 && (
                      <motion.div
                        className="w-8 h-0.5 bg-fitness-accent/50 mx-2"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 1.2 + index * 0.1 }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>

              <motion.p
                className="text-fitness-text/70 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
              >
                Photo Analysis → Quiz Questions → Smart Matching → Perfect Plan
              </motion.p>
            </div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg border border-fitness-accent/10 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-full bg-fitness-accent/10 flex items-center justify-center text-fitness-accent mb-4 mx-auto">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-fitness-text mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-fitness-text/70">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="bg-gradient-to-r from-fitness-accent to-fitness-accent-light rounded-2xl p-8 text-white"
          >
            <h2 className="text-2xl font-bold mb-4">
              Ready to Transform Your Fitness?
            </h2>
            <p className="mb-6 opacity-90">
              Join thousands who have discovered their perfect workout routine
              through our smart matching system.
            </p>
            <Button
              onClick={() => navigate("/funnel/photo-upload")}
              variant="secondary"
              size="lg"
              className="bg-white text-fitness-accent hover:bg-gray-50 px-8 py-3 rounded-full shadow-lg"
            >
              Begin Quiz Now
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Index;
