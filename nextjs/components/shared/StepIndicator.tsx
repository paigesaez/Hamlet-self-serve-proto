"use client";

import { Progress, Chip } from "@heroui/react";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { StepInfo } from "@/types";

interface StepIndicatorProps {
  currentStep: number;
}

const getStepInfo = (currentStep: number): StepInfo[] => {
  const steps = [
    { number: 1, title: 'Invitation', active: currentStep === 1 },
    { number: 2, title: 'Coverage', active: currentStep >= 10 && currentStep <= 12 },
    { number: 3, title: 'Account', active: currentStep === 13 },
    { number: 4, title: 'Billing', active: currentStep === 14 },
    { number: 5, title: 'Complete', active: currentStep === 6 }
  ];
  return steps;
};

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  const steps = getStepInfo(currentStep);
  const activeIndex = steps.findIndex(s => s.active);
  const progress = ((activeIndex + 1) / steps.length) * 100;
  
  return (
    <div className="flex flex-col items-center mb-6 sm:mb-8 px-4">
      <div className="flex items-center space-x-2 sm:space-x-4 mb-4">
        {steps.map((stepInfo, index) => (
          <motion.div
            key={stepInfo.number}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center"
          >
            <div className={`flex items-center justify-center w-8 h-8 rounded-full text-xs sm:text-sm font-medium transition-all ${
              stepInfo.active
                ? 'bg-primary text-white'
                : index < activeIndex
                  ? 'bg-success text-white'
                  : 'bg-default-200 text-default-600'
            }`}>
              {index < activeIndex ? (
                <Check className="w-3 h-3 sm:w-4 sm:h-4" />
              ) : (
                stepInfo.number
              )}
            </div>
            <span className={`ml-2 text-xs sm:text-sm hidden sm:inline ${
              stepInfo.active ? 'text-primary font-medium' : 'text-default-500'
            }`}>
              {stepInfo.title}
            </span>
            {index < steps.length - 1 && (
              <div className={`w-3 sm:w-8 h-0.5 ml-1 sm:ml-4 transition-all ${
                index < activeIndex ? 'bg-success' : 'bg-default-200'
              }`} />
            )}
          </motion.div>
        ))}
      </div>
      <Progress 
        value={progress} 
        className="max-w-md w-full"
        size="sm"
        color="primary"
      />
    </div>
  );
};