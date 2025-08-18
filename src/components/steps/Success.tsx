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
    <div className="min-h-screen bg-gray-50 px-8 py-16">
      <div className="max-w-4xl mx-auto">
        
        <div className="flex items-center gap-3 mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
          <h1 className="text-3xl font-semibold text-gray-900">You're all set!</h1>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left side - What you're monitoring */}
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-3">Your monitoring coverage</h3>
              
              <div className="mb-4">
                <p className="text-2xl font-bold text-[#002147]">
                  {subscriptionSummary.totalJurisdictions} cities and counties
                </p>
                <p className="text-base text-gray-600">
                  across {subscriptionSummary.totalStates} {subscriptionSummary.totalStates === 1 ? 'state' : 'states'}
                </p>
              </div>

              <p className="text-sm text-gray-500">States:</p>
              <p className="text-base font-medium text-gray-900">
                {subscriptionSummary.stateNames.join(', ')}
              </p>
            </div>

            {/* Right side - Topics */}
            <div className="lg:border-l lg:pl-8">
              <h3 className="text-lg font-medium text-gray-700 mb-3">Topics you're tracking</h3>
              <p className="text-sm text-gray-500 mb-3">All development-related topics are included:</p>
              <div className="flex gap-1 flex-wrap">
                <span className="px-2 py-0.5 bg-blue-50 rounded text-sm font-medium text-blue-700">Industrial</span>
                <span className="px-2 py-0.5 bg-blue-50 rounded text-sm font-medium text-blue-700">Housing</span>
                <span className="px-2 py-0.5 bg-blue-50 rounded text-sm font-medium text-blue-700">Multifamily</span>
                <span className="px-2 py-0.5 bg-blue-50 rounded text-sm font-medium text-blue-700">Impact Fees</span>
                <span className="px-2 py-0.5 bg-blue-50 rounded text-sm font-medium text-blue-700">Data Centers</span>
              </div>
            </div>
          </div>

          <div className="border-t mt-6 pt-6 flex items-center justify-between">
            <p className="text-base text-gray-500">
              Check your email for login details
            </p>
            <button className="px-6 py-2.5 bg-[#002147] text-white rounded-lg font-medium hover:bg-[#003a6b] transition-colors inline-flex items-center gap-2">
              Go to Dashboard
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};