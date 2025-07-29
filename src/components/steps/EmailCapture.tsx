import React from 'react';
import { Check, Mail } from 'lucide-react';
import { EmailCaptureProps } from '../../types';

export const EmailCapture: React.FC<EmailCaptureProps> = ({ email, setEmail, onBack, onNext }) => (
  <div className="max-w-6xl mx-auto">
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Left Column - Information */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Account Setup</h2>
          <p className="text-gray-600">Create your account to receive alerts delivered within 24 hours of agenda publication</p>
        </div>
        
        <div className="bg-blue-50 p-4 sm:p-6 rounded-xl">
          <h3 className="font-semibold mb-4 text-gray-900">What you'll receive:</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center">
              <Check className="w-4 h-4 text-blue-600 mr-3 flex-shrink-0" />
              <span>Email alerts within 24 hours of agenda publication</span>
            </li>
            <li className="flex items-center">
              <Check className="w-4 h-4 text-blue-600 mr-3 flex-shrink-0" />
              <span>Full agenda item language with highlighted matches</span>
            </li>
            <li className="flex items-center">
              <Check className="w-4 h-4 text-blue-600 mr-3 flex-shrink-0" />
              <span>Direct links to meeting materials and documents</span>
            </li>
            <li className="flex items-center">
              <Check className="w-4 h-4 text-blue-600 mr-3 flex-shrink-0" />
              <span>Meeting date, time, and location information</span>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Right Column - Form */}
      <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
        <div className="text-center mb-6">
          <Mail className="w-16 h-16 text-[#002147] mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900">Enter Your Email</h3>
        </div>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Work email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002147] focus:border-[#002147]"
          />
          
          <div className="bg-blue-50 p-4 rounded-lg text-sm">
            <p className="font-medium text-blue-900 mb-2">Email Notification Format:</p>
            <p className="text-blue-800">
              Each alert includes the agenda item language, matched topic, and direct link to full agenda materials.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:justify-between mt-6">
            <button
              onClick={onBack}
              className="px-4 sm:px-6 py-2.5 sm:py-2 rounded-lg font-medium transition-colors w-full sm:w-auto text-sm sm:text-base bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              ← Back
            </button>
            <button
              onClick={onNext}
              disabled={!email || !email.includes('@')}
              className={`px-4 sm:px-6 py-2.5 sm:py-2 rounded-lg font-medium transition-colors w-full sm:w-auto text-sm sm:text-base ${
                !email || !email.includes('@')
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-[#002147] text-white hover:bg-[#003a6b]'
              }`}
            >
              Add Billing Info →
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);