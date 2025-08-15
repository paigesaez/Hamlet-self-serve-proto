import React from 'react';
import { Mail, ArrowLeft, Bell, FileText, Calendar, Check } from 'lucide-react';
import { EmailCaptureProps } from '../../types';
import { StepHeader } from '../shared/StepHeader';

export const EmailCapture: React.FC<EmailCaptureProps> = ({ email, setEmail, onBack, onNext }) => (
  <>
    <StepHeader 
      icon={Mail} 
      title="Create your account" 
      subtitle="Enter your email to receive monitoring alerts"
    />

    {/* Laptop-optimized layout */}
    <div className="grid lg:grid-cols-3 gap-8 mb-20">
      {/* Left side - Email form (2 cols) */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-8">
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Work email address
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
              />
              <p className="text-sm text-gray-500 mt-2">
                We'll use this for alert delivery and account access
              </p>
            </div>

            {/* What You'll Receive */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 space-y-4">
              <h3 className="font-serif font-bold text-gray-900">What you'll receive</h3>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Bell className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">24-hour alerts</p>
                    <p className="text-sm text-gray-600">Notifications within a day of agenda publication</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                    <FileText className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Direct links</p>
                    <p className="text-sm text-gray-600">One-click access to full agenda materials</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Calendar className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Meeting details</p>
                    <p className="text-sm text-gray-600">Date, time, location, and virtual access info</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Terms notice */}
            <p className="text-xs text-gray-500">
              By continuing, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Next steps & actions (1 col) */}
      <div className="lg:col-span-1">
        <div className="sticky top-6 space-y-6">
          {/* Account Benefits */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Account benefits</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                <p className="text-sm text-gray-700">No password required</p>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                <p className="text-sm text-gray-700">Cancel anytime online</p>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                <p className="text-sm text-gray-700">Update preferences anytime</p>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                <p className="text-sm text-gray-700">Add team members later</p>
              </div>
            </div>
          </div>

          {/* Next Step */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-6 border border-amber-100">
            <h4 className="font-semibold text-gray-900 mb-2">Next: Payment setup</h4>
            <p className="text-sm text-gray-700 mb-4">
              Complete your subscription to start receiving alerts within 24 hours.
            </p>
            <p className="text-xs text-gray-600">
              Secure payment processing • Cancel anytime
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={onNext}
              disabled={!email || !email.includes('@')}
              className={`w-full px-8 py-4 rounded-lg font-semibold transition-all ${
                !email || !email.includes('@')
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-[#002147] text-white hover:bg-[#003a6b] shadow-md hover:shadow-lg'
              }`}
            >
              Continue to Payment
            </button>
            <button
              onClick={onBack}
              className="w-full px-6 py-3 text-gray-700 hover:text-gray-900 font-medium transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Topics</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </>
);