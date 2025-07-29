import React from 'react';
import { CheckCircle } from 'lucide-react';

export const Success: React.FC = () => (
  <div className="py-12 px-4">
    <div className="max-w-2xl mx-auto text-center">
      <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
      <h2 className="text-3xl font-bold mb-4 text-gray-900">Account Setup Complete!</h2>
      <p className="text-lg text-gray-600 mb-8">
        You'll receive your first monitoring report within 24 hours. Our team will reach out within one business day
        to help optimize your alert configuration for maximum value.
      </p>
      <div className="bg-gray-50 p-6 rounded-xl text-left">
        <h3 className="font-semibold mb-3 text-gray-900">What happens next:</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>✓ Receive welcome email with account details</li>
          <li>✓ First monitoring report delivered within 24 hours</li>
          <li>✓ Consultation call scheduled to optimize your alerts</li>
          <li>✓ Monthly invoice sent to your billing email</li>
        </ul>
      </div>
    </div>
  </div>
);