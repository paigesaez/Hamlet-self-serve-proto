import React from 'react';
import { Check } from 'lucide-react';
import { StepInfo } from '../../types';

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
  
  return (
    <div className="flex justify-center mb-6 sm:mb-8 px-4">
      <div className="flex items-center space-x-2 sm:space-x-4">
        {steps.map((stepInfo, index) => (
          <div key={stepInfo.number} className="flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full text-xs sm:text-sm font-medium ${
              stepInfo.active
                ? 'bg-[#002147] text-white'
                : index < steps.findIndex(s => s.active)
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-600'
            }`}>
              {index < steps.findIndex(s => s.active) ? (
                <Check className="w-3 h-3 sm:w-4 sm:h-4" />
              ) : (
                stepInfo.number
              )}
            </div>
            <span className={`ml-2 text-xs sm:text-sm hidden sm:inline ${
              stepInfo.active ? 'text-[#002147] font-medium' : 'text-gray-500'
            }`}>
              {stepInfo.title}
            </span>
            {index < steps.length - 1 && (
              <div className={`w-3 sm:w-8 h-0.5 ml-1 sm:ml-4 ${
                index < steps.findIndex(s => s.active) ? 'bg-green-500' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};