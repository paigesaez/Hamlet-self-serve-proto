import React from 'react';
import { CreditCard, ArrowLeft, Shield, DollarSign } from 'lucide-react';
import { BillingInfoProps } from '../../types';

export const BillingInfo: React.FC<BillingInfoProps> = ({ 
  billingInfo, 
  setBillingInfo, 
  selectedLocations, 
  selectedTopics,
  getTotalBodies,
  calculatePrice,
  onBack,
  onNext 
}) => (
  <div className="max-w-4xl mx-auto">
    {/* Header */}
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-2xl mb-4">
        <CreditCard className="w-8 h-8 text-indigo-700" />
      </div>
      <h2 className="text-3xl font-bold text-gray-900 mb-3">
        Complete your setup
      </h2>
      <p className="text-lg text-gray-600">
        Start monitoring {getTotalBodies()} governing bodies today
      </p>
    </div>

    <div className="grid lg:grid-cols-5 gap-8">
      {/* Left: Form */}
      <div className="lg:col-span-3">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <h3 className="font-semibold text-gray-900 mb-6">Billing information</h3>
          
          <div className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First name
                </label>
                <input
                  type="text"
                  value={billingInfo.firstName}
                  onChange={(e) => setBillingInfo(prev => ({ ...prev, firstName: e.target.value }))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last name
                </label>
                <input
                  type="text"
                  value={billingInfo.lastName}
                  onChange={(e) => setBillingInfo(prev => ({ ...prev, lastName: e.target.value }))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Company */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company name
              </label>
              <input
                type="text"
                value={billingInfo.company}
                onChange={(e) => setBillingInfo(prev => ({ ...prev, company: e.target.value }))}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone number
              </label>
              <input
                type="tel"
                value={billingInfo.phone}
                onChange={(e) => setBillingInfo(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="(555) 000-0000"
              />
            </div>

            <div className="border-t pt-6">
              <h4 className="font-semibold text-gray-900 mb-4">Payment method</h4>
              
              {/* Card Number */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Card number
                </label>
                <input
                  type="text"
                  value={billingInfo.cardNumber}
                  onChange={(e) => setBillingInfo(prev => ({ ...prev, cardNumber: e.target.value }))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="1234 5678 9012 3456"
                />
              </div>

              {/* Expiry and CVV */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expiry date
                  </label>
                  <input
                    type="text"
                    value={billingInfo.expiryDate}
                    onChange={(e) => setBillingInfo(prev => ({ ...prev, expiryDate: e.target.value }))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="MM/YY"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CVV
                  </label>
                  <input
                    type="text"
                    value={billingInfo.cvv}
                    onChange={(e) => setBillingInfo(prev => ({ ...prev, cvv: e.target.value }))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="123"
                  />
                </div>
              </div>
            </div>

            {/* Security Badge */}
            <div className="bg-gray-50 rounded-xl p-4 flex items-center space-x-3">
              <Shield className="w-5 h-5 text-gray-400" />
              <p className="text-sm text-gray-600">
                Your payment info is encrypted and secure. We never store card details.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Summary */}
      <div className="lg:col-span-2">
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100 sticky top-24">
          <h3 className="font-semibold text-gray-900 mb-4">Order summary</h3>
          
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Jurisdictions</span>
              <span className="font-medium">{selectedLocations.length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Governing bodies</span>
              <span className="font-medium">{getTotalBodies()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Topics monitored</span>
              <span className="font-medium">{selectedTopics.length}</span>
            </div>
            <div className="border-t pt-3 flex justify-between">
              <span className="text-gray-900 font-semibold">Monthly total</span>
              <span className="text-2xl font-bold text-indigo-600">${calculatePrice()}</span>
            </div>
          </div>

          <div className="bg-white/80 rounded-xl p-4 space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <DollarSign className="w-4 h-4 text-green-600" />
              <span className="text-gray-700">Cancel anytime</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <DollarSign className="w-4 h-4 text-green-600" />
              <span className="text-gray-700">First week includes setup consultation</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <DollarSign className="w-4 h-4 text-green-600" />
              <span className="text-gray-700">Volume discounts available</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Footer */}
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-8">
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
          disabled={!billingInfo.firstName || !billingInfo.lastName || !billingInfo.company || !billingInfo.cardNumber}
          className={`px-8 py-3 rounded-xl font-semibold transition-all ${
            !billingInfo.firstName || !billingInfo.lastName || !billingInfo.company || !billingInfo.cardNumber
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg'
          }`}
        >
          Start Monitoring
        </button>
      </div>
    </div>
  </div>
);