import React from 'react';
import { NavigationButtonsProps } from '../../types';

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  onBack,
  onNext,
  backDisabled = false,
  nextDisabled = false,
  nextText = "Continue"
}) => (
  <div className="flex items-center justify-between mt-8">
    <button
      onClick={onBack}
      disabled={backDisabled}
      className={`px-4 py-2.5 rounded-lg font-medium transition-colors ${
        backDisabled
          ? 'text-gray-400 cursor-not-allowed'
          : 'text-gray-700 hover:text-gray-900'
      }`}
    >
      Back
    </button>
    <button
      onClick={onNext}
      disabled={nextDisabled}
      className={`px-6 py-2.5 rounded-lg font-medium transition-colors ${
        nextDisabled
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
          : 'bg-gray-900 text-white hover:bg-gray-800'
      }`}
    >
      {nextText}
    </button>
  </div>
);