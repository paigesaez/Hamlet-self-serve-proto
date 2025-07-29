import React from 'react';

interface InvalidCodeProps {
  onBack: () => void;
  onRequestAccess: () => void;
}

export const InvalidCode: React.FC<InvalidCodeProps> = ({ onBack, onRequestAccess }) => (
  <div className="py-12 px-4">
    <div className="max-w-lg mx-auto text-center">
      <h2 className="text-2xl font-serif font-bold mb-4 text-gray-900">Invalid Invitation Code</h2>
      <p className="text-gray-600 mb-8">
        The code you entered isn't recognized. Please check your invitation email or request access.
      </p>
      <div className="space-y-4">
        <button
          onClick={onBack}
          className="w-full bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-300 transition-colors"
        >
          Try Again
        </button>
        <button
          onClick={onRequestAccess}
          className="w-full bg-[#002147] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#003a6b] transition-colors"
        >
          Request Access
        </button>
      </div>
    </div>
  </div>
);