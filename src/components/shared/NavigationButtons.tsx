import React from 'react';
import { NavigationButtonsProps } from '../../types';

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  onBack,
  onNext,
  backDisabled = false,
  nextDisabled = false,
  nextText = "Continue"
}) => (
  <div className="flex flex-col sm:flex-row gap-3 sm:justify-between mt-6">
    <button
      onClick={onBack}
      disabled={backDisabled}
      className={`px-4 sm:px-6 py-2.5 sm:py-2 rounded-lg font-medium transition-colors w-full sm:w-auto text-sm sm:text-base ${
        backDisabled
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      }`}
    >
      ← Back
    </button>
    <button
      onClick={onNext}
      disabled={nextDisabled}
      className={`px-4 sm:px-6 py-2.5 sm:py-2 rounded-lg font-medium transition-colors w-full sm:w-auto text-sm sm:text-base ${
        nextDisabled
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
          : 'bg-[#002147] text-white hover:bg-[#003a6b]'
      }`}
    >
      {nextText} →
    </button>
  </div>
);