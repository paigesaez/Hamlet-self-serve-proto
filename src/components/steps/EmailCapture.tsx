import React from 'react';
import { Mail, ArrowLeft, Bell, FileText, Calendar } from 'lucide-react';
import { EmailCaptureProps } from '../../types';
import { StepHeader } from '../shared/StepHeader';

export const EmailCapture: React.FC<EmailCaptureProps> = ({ email, setEmail, onBack, onNext }) => (
  <>
    <StepHeader 
      icon={Mail} 
      title="Create your account" 
      subtitle="Enter your email to receive monitoring alerts"
    />

    {/* Main Card */}
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
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
            className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
          />
          <p className="text-sm text-gray-500 mt-2">
            We'll use this for alert delivery and account access
          </p>
        </div>

        {/* What You'll Receive */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 space-y-4">
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
      </div>
    </div>
    
    {/* Sticky Footer */}
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 lg:px-12 xl:px-20 py-4">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 px-6 py-3 text-gray-700 hover:text-gray-900 font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        
        <button
          onClick={onNext}
          disabled={!email || !email.includes('@')}
          className={`px-8 py-3 rounded-xl font-semibold transition-all ${
            !email || !email.includes('@')
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-[#002147] text-white hover:bg-[#003a6b] shadow-md hover:shadow-lg'
          }`}
        >
          Continue to Payment
        </button>
      </div>
    </div>
  </>
);