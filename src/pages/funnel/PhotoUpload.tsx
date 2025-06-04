import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Upload, Camera, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import FunnelLayout from "@/components/funnel/FunnelLayout";
import ScanningAnimation from "@/components/funnel/ScanningAnimation";
import { useFunnelStore } from "@/lib/funnel-store";

const PhotoUpload = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [results, setResults] = useState({
    bmi: 0,
    bodyFat: 0,
    condition: "",
  });

  const { updateUserData, completeStep } = useFunnelStore();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        updateUserData({ photo: file });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = () => {
    setIsScanning(true);
  };

  const handleScanComplete = () => {
    setIsScanning(false);

    // Mock analysis results
    const mockResults = {
      bmi: Math.round((20 + Math.random() * 8) * 10) / 10,
      bodyFat: Math.round((12 + Math.random() * 18) * 10) / 10,
      condition: "Good",
    };

    setResults(mockResults);
    updateUserData(mockResults);
    setAnalysisComplete(true);
  };

  const handleContinue = () => {
    completeStep(2);
    navigate("/funnel/category-analysis");
  };

  return (
    <FunnelLayout
      step={2}
      title="Upload Your Photo"
      subtitle="Let our AI analyze your current fitness level to create a personalized plan"
    >
      <div className="max-w-2xl mx-auto">
        <Card className="p-8">
          {!uploadedImage ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="border-2 border-dashed border-fitness-accent/30 rounded-xl p-12 hover:border-fitness-accent/50 transition-colors">
                <Upload className="w-16 h-16 text-fitness-accent mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-fitness-text mb-2">
                  Upload Your Photo
                </h3>
                <p className="text-fitness-text/70 mb-6">
                  Upload a clear, full-body photo for the most accurate analysis
                </p>

                <div className="space-y-4">
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-fitness-accent hover:bg-fitness-accent-dark text-white px-8 py-3"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Choose Photo
                  </Button>

                  <div className="text-sm text-fitness-text/60">
                    Supported formats: JPG, PNG, WebP (max 10MB)
                  </div>
                </div>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </motion.div>
          ) : (
            <div className="space-y-6">
              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative rounded-xl overflow-hidden max-w-md mx-auto"
                >
                  <img
                    src={uploadedImage}
                    alt="Uploaded"
                    className="w-full h-auto max-h-96 object-cover"
                  />
                  <ScanningAnimation
                    isScanning={isScanning}
                    onScanComplete={handleScanComplete}
                  />
                </motion.div>
              </div>

              <AnimatePresence mode="wait">
                {!analysisComplete && !isScanning && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="text-center space-y-4"
                  >
                    <Button
                      onClick={handleAnalyze}
                      className="bg-fitness-accent hover:bg-fitness-accent-dark text-white px-8 py-3"
                    >
                      <Camera className="w-4 h-4 mr-2" />
                      Analyze Photo
                    </Button>

                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      variant="outline"
                      className="ml-4"
                    >
                      Choose Different Photo
                    </Button>
                  </motion.div>
                )}

                {isScanning && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center space-y-4"
                  >
                    <div className="text-fitness-text font-medium">
                      Analyzing your photo...
                    </div>
                    <div className="text-sm text-fitness-text/70">
                      Our AI is examining your body composition and posture
                    </div>
                  </motion.div>
                )}

                {analysisComplete && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div className="text-center">
                      <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-fitness-text mb-2">
                        Analysis Complete!
                      </h3>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="bg-fitness-accent/10 rounded-lg p-4 text-center"
                      >
                        <div className="text-2xl font-bold text-fitness-accent">
                          {results.bmi}
                        </div>
                        <div className="text-sm text-fitness-text/70">BMI</div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="bg-fitness-accent/10 rounded-lg p-4 text-center"
                      >
                        <div className="text-2xl font-bold text-fitness-accent">
                          {results.bodyFat}%
                        </div>
                        <div className="text-sm text-fitness-text/70">
                          Body Fat
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="bg-fitness-accent/10 rounded-lg p-4 text-center"
                      >
                        <div className="text-xl font-bold text-fitness-accent">
                          {results.condition}
                        </div>
                        <div className="text-sm text-fitness-text/70">
                          Condition
                        </div>
                      </motion.div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-center"
                    >
                      <Button
                        onClick={handleContinue}
                        className="bg-fitness-accent hover:bg-fitness-accent-dark text-white px-8 py-3"
                      >
                        Continue to Questions
                      </Button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          )}
        </Card>
      </div>
    </FunnelLayout>
  );
};

export default PhotoUpload;
