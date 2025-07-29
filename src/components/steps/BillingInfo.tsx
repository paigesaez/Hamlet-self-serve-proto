import React from 'react';
import { CreditCard } from 'lucide-react';
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
  <div className="max-w-6xl mx-auto">
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Left Column - Pricing Summary */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Billing Information</h2>
          <p className="text-gray-600">Complete setup to begin tracking development opportunities</p>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="font-semibold mb-4 text-gray-900">Your Subscription Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Jurisdictions</span>
              <span className="font-medium">{selectedLocations.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Governing Bodies</span>
              <span className="font-medium">{getTotalBodies()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Topics Monitored</span>
              <span className="font-medium">{selectedTopics.length}</span>
            </div>
            <div className="border-t pt-3 mt-3">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Monthly Total</span>
                <span className="text-lg font-bold text-[#002147]">${calculatePrice().toLocaleString()}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Volume pricing: $1,000 per 20 governing bodies</p>
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg text-sm">
          <p className="font-medium text-green-900 mb-2">Built for Scale:</p>
          <p className="text-green-800">
            Track multiple cities without adding headcount. Volume discounts available as coverage scales.
          </p>
        </div>
      </div>
      
      {/* Right Column - Form */}
      <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
        <div className="text-center mb-6">
          <CreditCard className="w-16 h-16 text-[#002147] mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900">Payment Details</h3>
        </div>

        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First name"
              value={billingInfo.firstName}
              onChange={(e) => setBillingInfo(prev => ({ ...prev, firstName: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002147]"
            />
            <input
              type="text"
              placeholder="Last name"
              value={billingInfo.lastName}
              onChange={(e) => setBillingInfo(prev => ({ ...prev, lastName: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002147]"
            />
          </div>

          <input
            type="text"
            placeholder="Company name"
            value={billingInfo.company}
            onChange={(e) => setBillingInfo(prev => ({ ...prev, company: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002147]"
          />

          <input
            type="tel"
            placeholder="Phone number"
            value={billingInfo.phone}
            onChange={(e) => setBillingInfo(prev => ({ ...prev, phone: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002147]"
          />

          <div className="border-t pt-6">
            <h3 className="font-semibold mb-4">Payment Information</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Card number"
                value={billingInfo.cardNumber}
                onChange={(e) => setBillingInfo(prev => ({ ...prev, cardNumber: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002147]"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={billingInfo.expiryDate}
                  onChange={(e) => setBillingInfo(prev => ({ ...prev, expiryDate: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002147]"
                />
                <input
                  type="text"
                  placeholder="CVV"
                  value={billingInfo.cvv}
                  onChange={(e) => setBillingInfo(prev => ({ ...prev, cvv: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002147]"
                />
              </div>
            </div>
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
              disabled={!billingInfo.firstName || !billingInfo.lastName || !billingInfo.company || !billingInfo.cardNumber}
              className={`px-4 sm:px-6 py-2.5 sm:py-2 rounded-lg font-medium transition-colors w-full sm:w-auto text-sm sm:text-base ${
                !billingInfo.firstName || !billingInfo.lastName || !billingInfo.company || !billingInfo.cardNumber
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-[#002147] text-white hover:bg-[#003a6b]'
              }`}
            >
              Complete Setup →
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);