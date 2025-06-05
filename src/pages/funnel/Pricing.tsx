import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Star, Gift, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import FunnelLayout from "@/components/funnel/FunnelLayout";
import ConfettiEffect from "@/components/funnel/ConfettiEffect";
import { useFunnelStore } from "@/lib/funnel-store";

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  features: string[];
  popular?: boolean;
  description: string;
}

const Pricing = () => {
  const [showBonus, setShowBonus] = useState(false);
  const [confettiActive, setConfettiActive] = useState(false);
  const { userData, completeStep } = useFunnelStore();

  const plans: PricingPlan[] = [
    {
      name: "Starter",
      price: "$9.99",
      period: "/month",
      description: "Perfect for beginners starting their fitness journey",
      features: [
        "Personalized workout plan",
        "Basic progress tracking",
        "Email support",
        "Mobile app access",
      ],
    },
    {
      name: "Pro",
      price: "$19.99",
      period: "/month",
      description: "Best for dedicated fitness enthusiasts",
      popular: true,
      features: [
        "Everything in Starter",
        "Advanced analytics",
        "Video workout library",
        "Priority support",
        "Nutrition guidelines",
        "Progress photos",
      ],
    },
    {
      name: "Elite",
      price: "$39.99",
      period: "/month",
      description: "For serious athletes and fitness pros",
      features: [
        "Everything in Pro",
        "Personal trainer consultation",
        "Custom meal planning",
        "24/7 premium support",
        "Wearable device sync",
        "Advanced body composition analysis",
      ],
    },
  ];

  const handleBonusClick = () => {
    setConfettiActive(true);
    setShowBonus(true);
  };

  const handleSelectPlan = (planName: string) => {
    completeStep(5);
    // In a real app, this would redirect to payment processing
    alert(
      `Thank you for choosing the ${planName} plan! Your personalized ${userData.idealSport} program is being prepared.`,
    );
  };

  const ctaButton = (
    <div className="grid grid-cols-3 gap-3">
      {plans.map((plan, index) => (
        <Button
          key={plan.name}
          onClick={() => handleSelectPlan(plan.name)}
          className={`py-3 text-sm ${
            plan.popular
              ? 'bg-fitness-accent hover:bg-fitness-accent-dark text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-fitness-text'
          }`}
        >
          {plan.name}
        </Button>
      ))}
    </div>
  );

  return (
    <>
      <FunnelLayout
        step={5}
        title="Choose Your Fitness Plan"
        subtitle="Get started with your personalized fitness journey today"
        ctaButton={ctaButton}
      >
        <div className="max-w-6xl mx-auto">
          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-fitness-accent text-white px-4 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                      <Star className="w-3 h-3" />
                      <span>Most Popular</span>
                    </div>
                  </div>
                )}

                <Card
                  className={`p-6 h-full flex flex-col ${
                    plan.popular
                      ? "border-2 border-fitness-accent shadow-xl scale-105"
                      : "border border-gray-200"
                  }`}
                >
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-fitness-text mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-sm text-fitness-text/70 mb-4">
                      {plan.description}
                    </p>
                    <div className="flex items-baseline justify-center">
                      <span className="text-3xl font-bold text-fitness-accent">
                        {plan.price}
                      </span>
                      <span className="text-fitness-text/60 ml-1">
                        {plan.period}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1">
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, featureIndex) => (
                        <motion.li
                          key={featureIndex}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + featureIndex * 0.1 }}
                          className="flex items-center space-x-2"
                        >
                          <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-fitness-text/80">
                            {feature}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    onClick={() => handleSelectPlan(plan.name)}
                  <div className={`w-full py-3 text-center rounded-md ${
                      plan.popular
                        ? 'bg-fitness-accent/10 text-fitness-accent border-2 border-fitness-accent'
                        : 'bg-gray-50 text-fitness-text border border-gray-200'
                    }`}>
                    {plan.popular ? 'Recommended' : 'Available'}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Bonus Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center"
          >
            <Card className="max-w-md mx-auto p-6 border-2 border-dashed border-fitness-accent/50">
              <AnimatePresence mode="wait">
                {!showBonus ? (
                  <motion.div
                    key="bonus-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <div className="relative">
                      <div
                        className="text-4xl mb-3 filter blur-sm cursor-pointer"
                        onClick={handleBonusClick}
                      >
                        🎁
                      </div>
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Sparkles className="w-8 h-8 text-fitness-accent" />
                      </motion.div>
                    </div>

                    <h3 className="font-semibold text-fitness-text mb-2">
                      Mystery Bonus
                    </h3>
                    <p className="text-sm text-fitness-text/70 mb-4">
                      Click to reveal your special bonus!
                    </p>

                  <div className={`w-full py-3 text-center rounded-md ${
                      plan.popular
                        ? 'bg-fitness-accent/10 text-fitness-accent border-2 border-fitness-accent'
                        : 'bg-gray-50 text-fitness-text border border-gray-200'
                    }`}>
                    {plan.popular ? 'Recommended' : 'Available'}
                  </div>
                    key="bonus-revealed"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-4"
                  >
                    <div className="text-4xl mb-3">🍎</div>

                    <h3 className="font-semibold text-fitness-text mb-2">
                      Bonus: Personalized Meal Plan
                    </h3>
                    <p className="text-sm text-fitness-text/70 mb-4">
                      Get a custom nutrition plan designed specifically for your
                      {userData.idealSport && ` ${userData.idealSport}`}{" "}
                      training!
                    </p>

                    <div className="bg-fitness-accent/10 rounded-lg p-3">
                      <p className="text-xs text-fitness-accent font-medium">
                        FREE with any plan - Usually $29.99/month
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>

          {/* Features Comparison */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-12"
          >
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-fitness-text text-center mb-6">
                All Plans Include
              </h3>

              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div className="space-y-2">
                  <div className="text-3xl">🎯</div>
                  <h4 className="font-medium text-fitness-text">
                    Personal Matching
                  </h4>
                  <p className="text-sm text-fitness-text/70">
                    Your perfect {userData.idealSport} program
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="text-3xl">📱</div>
                  <h4 className="font-medium text-fitness-text">Mobile App</h4>
                  <p className="text-sm text-fitness-text/70">
                    Track progress anywhere
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="text-3xl">🔄</div>
                  <h4 className="font-medium text-fitness-text">
                    Regular Updates
                  </h4>
                  <p className="text-sm text-fitness-text/70">
                    Plans adapt as you improve
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="text-3xl">💪</div>
                  <h4 className="font-medium text-fitness-text">
                    Expert Support
                  </h4>
                  <p className="text-sm text-fitness-text/70">
                    Get help when you need it
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Money Back Guarantee */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-center mt-8"
          >
            <p className="text-sm text-fitness-text/60">
              💯 30-day money-back guarantee • Cancel anytime • No hidden fees
            </p>
          </motion.div>
        </div>
      </FunnelLayout>

      <ConfettiEffect
        isActive={confettiActive}
        onComplete={() => setConfettiActive(false)}
      />
    </>
  );
};

export default Pricing;