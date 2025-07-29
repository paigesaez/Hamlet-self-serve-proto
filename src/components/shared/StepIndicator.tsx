import React from 'react';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
}

const steps = [
  { id: 1, name: 'Jurisdictions', step: 10 },
  { id: 2, name: 'Governing Bodies', step: 11 },
  { id: 3, name: 'Topics', step: 12 },
  { id: 4, name: 'Account', step: 13 },
  { id: 5, name: 'Payment', step: 14 }
];

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  const currentIndex = steps.findIndex(s => s.step === currentStep);
  
  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex items-center">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm transition-all
                  ${index < currentIndex 
                    ? 'bg-green-500 text-white' 
                    : index === currentIndex 
                      ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg' 
                      : 'bg-gray-100 text-gray-400'
                  }
                `}>
                  {index < currentIndex ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    step.id
                  )}
                </div>
                <span className={`ml-3 text-sm font-medium hidden sm:block ${
                  index <= currentIndex ? 'text-gray-900' : 'text-gray-400'
                }`}>
                  {step.name}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-4 transition-all ${
                  index < currentIndex ? 'bg-green-500' : 'bg-gray-200'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};