import React from 'react';
import { Building } from 'lucide-react';

interface TopNavigationProps {
  step: number;
  resetFlow: () => void;
  setStep: (step: number) => void;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({ step, resetFlow, setStep }) => {
  return (
    <div className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <button
          onClick={resetFlow}
          className="flex items-center space-x-2 text-[#002147] hover:text-[#003a6b] font-medium text-sm sm:text-base"
        >
          <Building className="w-5 h-5 flex-shrink-0" />
          <span className="truncate max-w-[180px] sm:max-w-none">Hamlet Agenda Monitoring</span>
        </button>

        {step !== 1 && step !== 6 && step !== 7 && (
          <button
            onClick={() => setStep(1)}
            className="text-gray-600 hover:text-gray-800 text-xs sm:text-sm whitespace-nowrap"
          >
            ← Back to Home
          </button>
        )}
      </div>
    </div>
  );
};