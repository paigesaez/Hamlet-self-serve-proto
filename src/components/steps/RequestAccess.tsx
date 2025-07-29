import React, { useState } from 'react';
import { User } from 'lucide-react';

interface RequestAccessProps {
  onBack: () => void;
  onSubmit: () => void;
}

export const RequestAccess: React.FC<RequestAccessProps> = ({ onBack, onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    role: '',
    markets: ''
  });

  const isFormValid = formData.firstName && formData.lastName && formData.email && 
                     formData.company && formData.role;

  return (
    <div className="py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <User className="w-16 h-16 text-[#002147] mx-auto mb-4" />
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">Request Platform Access</h2>
          <p className="text-gray-600">Tell us about your development team to qualify for access</p>
        </div>

        <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First name"
                value={formData.firstName}
                onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002147]"
              />
              <input
                type="text"
                placeholder="Last name"
                value={formData.lastName}
                onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002147]"
              />
            </div>

            <input
              type="email"
              placeholder="Work email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002147]"
            />

            <input
              type="text"
              placeholder="Company name"
              value={formData.company}
              onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002147]"
            />

            <select
              value={formData.role}
              onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002147] text-gray-900"
            >
              <option value="">Select your role</option>
              <option value="development">Development Lead</option>
              <option value="acquisition">Acquisition Manager</option>
              <option value="entitlement">Entitlement Manager</option>
              <option value="consultant">Development Consultant</option>
              <option value="other">Other</option>
            </select>

            <textarea
              placeholder="Target markets/cities of interest (optional)"
              value={formData.markets}
              onChange={(e) => setFormData(prev => ({ ...prev, markets: e.target.value }))}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002147] resize-none"
            />

            <div className="flex flex-col sm:flex-row gap-3 sm:justify-between">
              <button
                onClick={onBack}
                className="px-6 py-3 rounded-lg font-medium transition-colors bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                ← Back
              </button>
              <button
                onClick={onSubmit}
                disabled={!isFormValid}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  !isFormValid
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-[#002147] text-white hover:bg-[#003a6b]'
                }`}
              >
                Submit Request →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};