import React from 'react';

interface TopNavigationProps {
  step: number;
  resetFlow: () => void;
  setStep: (step: number) => void;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({ step, resetFlow, setStep }) => {
  return (
    <div className="sticky top-0 z-50 bg-white border-b border-gray-200 py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <a 
          href="/"
          onClick={(e) => {
            e.preventDefault();
            window.location.reload();
          }}
          className="block"
        >
          <img 
            src="/Hamlet_logo2x.png" 
            alt="Hamlet" 
            width={116} 
            height="auto"
            className="cursor-pointer"
          />
        </a>

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