import { create } from "zustand";

export interface UserData {
  // Photo analysis results
  photo?: File;
  bmi?: number;
  bodyFat?: number;
  bodyCondition?: string;

  // Quiz answers
  exerciseFrequency?: string;
  fitnessGoal?: string;
  preferredActivity?: string;
  waterIntake?: number;
  sleepHours?: number;
  stressLevel?: number;

  // Results
  idealSport?: string;
  matchPercentage?: number;
  alternativeSports?: Array<{ name: string; percentage: number }>;

  // Progress
  currentStep: number;
  completedSteps: number[];
}

interface FunnelState {
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
  setCurrentStep: (step: number) => void;
  completeStep: (step: number) => void;
  resetFunnel: () => void;
}

const initialUserData: UserData = {
  currentStep: 1,
  completedSteps: [],
};

export const useFunnelStore = create<FunnelState>((set) => ({
  userData: initialUserData,

  updateUserData: (data) =>
    set((state) => ({
      userData: { ...state.userData, ...data },
    })),

  setCurrentStep: (step) =>
    set((state) => ({
      userData: { ...state.userData, currentStep: step },
    })),

  completeStep: (step) =>
    set((state) => ({
      userData: {
        ...state.userData,
        completedSteps: [...new Set([...state.userData.completedSteps, step])],
      },
    })),

  resetFunnel: () =>
    set(() => ({
      userData: initialUserData,
    })),
}));

// Utility functions for funnel logic
export const calculateProgress = (
  currentStep: number,
  totalSteps: number = 5,
): number => {
  return Math.round((currentStep / totalSteps) * 100);
};

export const analyzeBMI = (
  height: number,
  weight: number,
): { bmi: number; condition: string } => {
  const bmi = weight / (height / 100) ** 2;
  let condition = "Normal";

  if (bmi < 18.5) condition = "Underweight";
  else if (bmi >= 25 && bmi < 30) condition = "Overweight";
  else if (bmi >= 30) condition = "Obese";

  return { bmi: Math.round(bmi * 10) / 10, condition };
};

export const calculateSportMatch = (
  userData: UserData,
): {
  idealSport: string;
  matchPercentage: number;
  alternatives: Array<{ name: string; percentage: number }>;
} => {
  // Mock calculation based on user preferences
  const sports = [
    { name: "Pilates", baseScore: 70 },
    { name: "Yoga", baseScore: 60 },
    { name: "Gym Training", baseScore: 50 },
    { name: "Running", baseScore: 40 },
    { name: "Swimming", baseScore: 65 },
    { name: "Cycling", baseScore: 55 },
  ];

  // Adjust scores based on user data
  sports.forEach((sport) => {
    if (
      userData.fitnessGoal === "flexibility" &&
      (sport.name === "Pilates" ||
        sport.name === "Yoga" ||
        sport.name === "Chair Yoga")
    ) {
      sport.baseScore += 20;
    }
    if (
      userData.fitnessGoal === "wellness" &&
      (sport.name === "Yoga" ||
        sport.name === "Chair Yoga" ||
        sport.name === "Walking")
    ) {
      sport.baseScore += 15;
    }
    if (
      userData.exerciseFrequency === "never" ||
      userData.exerciseFrequency === "rarely"
    ) {
      if (sport.name === "Chair Yoga" || sport.name === "Walking") {
        sport.baseScore += 20;
      }
    }
    if (
      userData.exerciseFrequency === "often" ||
      userData.exerciseFrequency === "daily"
    ) {
      if (sport.name === "Pilates" || sport.name === "Yoga") {
        sport.baseScore += 15;
      }
    }

    // Add some randomness for demo
    sport.baseScore += Math.random() * 20 - 10;
  });

  sports.sort((a, b) => b.baseScore - a.baseScore);

  const idealSport = sports[0];
  const alternatives = sports.slice(1, 3).map((sport) => ({
    name: sport.name,
    percentage: Math.max(Math.round(sport.baseScore), 10),
  }));

  return {
    idealSport: idealSport.name,
    matchPercentage: Math.min(Math.round(idealSport.baseScore), 95),
    alternatives,
  };
};
