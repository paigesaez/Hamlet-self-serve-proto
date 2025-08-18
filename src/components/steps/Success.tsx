import React, { useMemo } from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { stateJurisdictions } from '../../data/stateJurisdictions';
import { getStateName } from '../../utils/states';

interface SuccessProps {
  selectedStates?: string[];
}

export const Success: React.FC<SuccessProps> = ({ selectedStates = [] }) => {
  // Calculate subscription summary based on states
  const subscriptionSummary = useMemo(() => {
    const summary = {
      totalStates: selectedStates.length,
      totalJurisdictions: 0,
      totalBodies: 0,
      stateNames: [] as string[]
    };

    selectedStates.forEach(state => {
      const stateData = stateJurisdictions[state];
      if (stateData) {
        summary.totalJurisdictions += stateData.jurisdictionCount;
        summary.totalBodies += stateData.governingBodiesCount;
        summary.stateNames.push(getStateName(state));
      }
    });

    return summary;
  }, [selectedStates]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50 flex items-center justify-center">
      <div className="max-w-xl mx-auto px-6 py-12 text-center">
        
        {/* Success Icon and Message */}
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        
        <h1 className="text-4xl font-semibold text-gray-900 mb-3">
          You're all set!
        </h1>
        
        <p className="text-xl text-gray-600 mb-6">
          Monitoring {subscriptionSummary.totalJurisdictions} cities and counties across {subscriptionSummary.totalStates} {subscriptionSummary.totalStates === 1 ? 'state' : 'states'}
        </p>

        {/* States */}
        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-2">States you're monitoring:</p>
          <p className="text-base text-gray-800 font-medium">
            {subscriptionSummary.stateNames.join(', ')}
          </p>
        </div>

        {/* Topics */}
        <div className="mb-8">
          <p className="text-sm text-gray-500 mb-2">Topics you're tracking:</p>
          <div className="flex gap-2 justify-center flex-wrap">
            <span className="px-3 py-1 bg-blue-50 rounded-full text-sm font-medium text-blue-700">Industrial</span>
            <span className="px-3 py-1 bg-blue-50 rounded-full text-sm font-medium text-blue-700">Housing</span>
            <span className="px-3 py-1 bg-blue-50 rounded-full text-sm font-medium text-blue-700">Multifamily</span>
            <span className="px-3 py-1 bg-blue-50 rounded-full text-sm font-medium text-blue-700">Impact Fees</span>
            <span className="px-3 py-1 bg-blue-50 rounded-full text-sm font-medium text-blue-700">Data Centers</span>
          </div>
        </div>

        <p className="text-base text-gray-600 mb-8">
          Check your email for login details.
        </p>

        {/* Primary Action */}
        <button className="px-8 py-3 bg-[#002147] text-white rounded-lg font-medium hover:bg-[#003a6b] transition-all inline-flex items-center gap-2">
          Go to Dashboard
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};