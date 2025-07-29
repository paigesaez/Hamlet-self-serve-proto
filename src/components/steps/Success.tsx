import React from 'react';
import { CheckCircle, Mail, Calendar, Headphones, FileText } from 'lucide-react';

export const Success: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
    <div className="max-w-2xl w-full">
      {/* Success Icon */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full mb-4">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-4xl font-serif text-gray-900 mb-3">
          Welcome to Hamlet!
        </h1>
        <p className="text-xl text-gray-600">
          Your monitoring is now active across {localStorage.getItem('totalBodies') || '0'} governing bodies
        </p>
      </div>

      {/* What Happens Next */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">What happens next</h2>
        
        <div className="space-y-4">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Check your email</h3>
              <p className="text-sm text-gray-600 mt-1">
                You'll receive a welcome email with your account details and quick start guide
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">First alert within 24 hours</h3>
              <p className="text-sm text-gray-600 mt-1">
                As soon as relevant agendas are published, we'll send you detailed alerts
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Calendar className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Setup consultation</h3>
              <p className="text-sm text-gray-600 mt-1">
                Our team will reach out within 2 business days to optimize your monitoring setup
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Headphones className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Dedicated support</h3>
              <p className="text-sm text-gray-600 mt-1">
                Reach out anytime at support@hamlet.ai or through your account dashboard
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="text-center space-y-3">
        <button className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg transition-all">
          Go to Dashboard
        </button>
        <p className="text-sm text-gray-500">
          We'll also send you a link via email
        </p>
      </div>
    </div>
  </div>
);