import React from 'react';
import { Mail } from 'lucide-react';

interface RequestSubmittedProps {
  onBack: () => void;
}

export const RequestSubmitted: React.FC<RequestSubmittedProps> = ({ onBack }) => (
  <div className="py-12 px-4">
    <div className="max-w-2xl mx-auto text-center">
      <Mail className="w-24 h-24 text-blue-500 mx-auto mb-6" />
      <h2 className="text-3xl font-serif font-bold mb-4 text-gray-900">Request Submitted!</h2>
      <p className="text-lg text-gray-600 mb-8">
        Thank you for your interest in Hamlet Agenda Monitoring. Our team will review your application
        and respond within 2 business days.
      </p>
      <div className="bg-gray-50 p-6 rounded-xl text-left mb-8">
        <h3 className="font-serif font-bold mb-3 text-gray-900">What to expect:</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>✓ Application review within 48 hours</li>
          <li>✓ Invitation code sent if approved</li>
          <li>✓ Optional consultation call to discuss your needs</li>
          <li>✓ Custom pricing for enterprise teams</li>
        </ul>
      </div>
      <button
        onClick={onBack}
        className="bg-[#002147] text-white py-3 px-8 rounded-lg font-medium hover:bg-[#003a6b] transition-colors"
      >
        Return to Home
      </button>
    </div>
  </div>
);