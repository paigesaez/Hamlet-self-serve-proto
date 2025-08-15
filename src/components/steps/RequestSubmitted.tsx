import React from 'react';
import { Mail } from 'lucide-react';

interface RequestSubmittedProps {
  onBack: () => void;
}

export const RequestSubmitted: React.FC<RequestSubmittedProps> = ({ onBack }) => (
  <div className="min-h-screen flex items-center justify-center px-4">
    <div className="max-w-2xl mx-auto w-full">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center mx-auto mb-6">
          <Mail className="w-10 h-10 text-[#002147]" />
        </div>
        <h2 className="text-3xl font-serif font-bold mb-4 text-gray-900">Request Submitted!</h2>
        <p className="text-lg text-gray-600">
          Thank you for your interest in Hamlet Agenda Monitoring. Our team will review your application
          and respond within 2 business days.
        </p>
      </div>
      
      <div className="bg-white rounded-lg border border-gray-100 p-8 mb-8">
        <h3 className="font-serif font-bold mb-4 text-gray-900">What to expect:</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-green-100 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs">✓</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Application review within 48 hours</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-green-100 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs">✓</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Invitation code sent if approved</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-green-100 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs">✓</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Optional consultation call to discuss your needs</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-green-100 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs">✓</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Custom pricing for enterprise teams</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <button
          onClick={onBack}
          className="px-8 py-3.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-all"
        >
          Return to Home
        </button>
      </div>
    </div>
  </div>
);