import React from 'react';

interface InvalidCodeProps {
  onBack: () => void;
  onRequestAccess: () => void;
}

export const InvalidCode: React.FC<InvalidCodeProps> = ({ onBack, onRequestAccess }) => (
  <div className="min-h-screen flex items-center justify-center px-4">
    <div className="max-w-lg mx-auto">
      <div className="bg-white rounded-lg border border-gray-100 p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-6">
          <span className="text-2xl">⚠️</span>
        </div>
        <h2 className="text-2xl font-serif font-bold mb-4 text-gray-900">Invalid Invitation Code</h2>
        <p className="text-gray-600 mb-8">
          The code you entered isn't recognized. Please check your invitation email or request access.
        </p>
        <div className="space-y-4">
          <button
            onClick={onBack}
            className="w-full bg-gray-100 text-gray-700 py-3.5 px-6 rounded-lg font-medium hover:bg-gray-200 transition-all"
          >
            Try Again
          </button>
          <button
            onClick={onRequestAccess}
            className="w-full bg-indigo-600 text-white py-3.5 px-6 rounded-lg font-medium hover:bg-indigo-700 transition-all"
          >
            Request Access
          </button>
        </div>
      </div>
    </div>
  </div>
);