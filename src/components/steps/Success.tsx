import React, { useMemo } from 'react';
import { CheckCircle, Mail, Calendar, Bell, ArrowRight, MapPin, Target, Clock } from 'lucide-react';
import { locations } from '../../data/locations';
import { stateJurisdictions } from '../../data/stateJurisdictions';
import { getStateName } from '../../utils/states';

interface SuccessProps {
  selectedStates?: string[];
  selectedLocations?: number[]; // For backward compatibility
}

export const Success: React.FC<SuccessProps> = ({ selectedStates = [], selectedLocations }) => {
  // Calculate subscription summary based on states
  const subscriptionSummary = useMemo(() => {
    // Use states if provided, otherwise fall back to locations for backward compatibility
    if (selectedStates.length > 0) {
      const summary = {
        totalStates: selectedStates.length,
        totalJurisdictions: 0,
        totalBodies: 0,
        stateDetails: {} as Record<string, { 
          name: string; 
          jurisdictionCount: number; 
          bodiesCount: number;
        }>
      };

      selectedStates.forEach(state => {
        const stateData = stateJurisdictions[state];
        if (stateData) {
          summary.totalJurisdictions += stateData.jurisdictionCount;
          summary.totalBodies += stateData.governingBodiesCount;
          summary.stateDetails[state] = {
            name: getStateName(state),
            jurisdictionCount: stateData.jurisdictionCount,
            bodiesCount: stateData.governingBodiesCount
          };
        }
      });

      return summary;
    } 
    
    // Fallback for backward compatibility with location-based selection
    if (selectedLocations && selectedLocations.length > 0) {
      const summary = {
        totalStates: 0,
        totalJurisdictions: selectedLocations.length,
        totalBodies: 0,
        stateDetails: {} as Record<string, { 
          name: string; 
          jurisdictionCount: number; 
          bodiesCount: number;
        }>
      };

      const stateSet = new Set<string>();
      selectedLocations.forEach(locId => {
        const location = locations.find(loc => loc.id === locId);
        if (location) {
          stateSet.add(location.state);
          summary.totalBodies += location.governingBodies.length;
        }
      });
      summary.totalStates = stateSet.size;

      return summary;
    }

    return {
      totalStates: 0,
      totalJurisdictions: 0,
      totalBodies: 0,
      stateDetails: {}
    };
  }, [selectedStates, selectedLocations]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-12">
        
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-green-100 rounded-full mb-3">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            Welcome to Hamlet!
          </h1>
          <p className="text-lg text-gray-600">
            Your free trial is now active and monitoring has begun
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Left Column - Your Subscription */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Monitoring Setup</h2>
              
              {/* Coverage Stats */}
              <div className="bg-white rounded-lg border border-gray-200 p-5 mb-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <MapPin className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="text-2xl font-bold text-[#002147]">
                      {subscriptionSummary.totalJurisdictions}
                    </div>
                    <div className="text-xs text-gray-600">Jurisdictions</div>
                  </div>
                  <div className="text-center">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Target className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="text-2xl font-bold text-[#002147]">
                      5
                    </div>
                    <div className="text-xs text-gray-600">Topics</div>
                  </div>
                  <div className="text-center">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Clock className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="text-2xl font-bold text-[#002147]">
                      24hr
                    </div>
                    <div className="text-xs text-gray-600">Alerts</div>
                  </div>
                </div>
              </div>

              {/* State Details */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Monitoring Coverage by State</h3>
                <div className="space-y-2">
                  {Object.entries(subscriptionSummary.stateDetails).map(([state, data]) => (
                    <div key={state} className="flex items-start justify-between">
                      <div>
                        <span className="text-sm font-medium text-gray-900">{data.name}</span>
                        <div className="text-xs text-gray-500 mt-0.5">
                          {data.jurisdictionCount} jurisdictions • {data.bodiesCount} governing bodies
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 pt-3 border-t border-gray-200">
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Total States:</span>
                      <span className="font-semibold text-gray-900">{subscriptionSummary.totalStates}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Total Governing Bodies:</span>
                      <span className="font-semibold text-gray-900">{subscriptionSummary.totalBodies}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Topics Being Monitored */}
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Topics We're Tracking</h3>
                <p className="text-xs text-gray-500 mb-3">All development-related topics are automatically included</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2.5 py-1 bg-blue-50 rounded-full text-xs font-medium text-blue-700">Industrial Development</span>
                  <span className="px-2.5 py-1 bg-blue-50 rounded-full text-xs font-medium text-blue-700">Housing Policy</span>
                  <span className="px-2.5 py-1 bg-blue-50 rounded-full text-xs font-medium text-blue-700">Multifamily Projects</span>
                  <span className="px-2.5 py-1 bg-blue-50 rounded-full text-xs font-medium text-blue-700">Impact Fees</span>
                  <span className="px-2.5 py-1 bg-blue-50 rounded-full text-xs font-medium text-blue-700">Data Centers</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Next Steps */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Getting Started</h2>
              
              {/* Next Steps */}
              <div className="bg-white rounded-lg border border-gray-200 p-5 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">Check your inbox</h4>
                    <p className="text-sm text-gray-600">
                      We've sent your login credentials and a welcome guide to get you started.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Bell className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">Your first alert</h4>
                    <p className="text-sm text-gray-600">
                      You'll receive alerts within 24 hours of relevant agenda publications.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">Optimization call</h4>
                    <p className="text-sm text-gray-600">
                      Our team will reach out within 24 hours to help optimize your monitoring setup.
                    </p>
                  </div>
                </div>
              </div>

              {/* What's Included */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Your subscription includes</h3>
                <ul className="text-sm text-gray-700 space-y-1.5">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>All cities and counties in your selected states</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>City councils, planning commissions, and boards</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>AI-powered relevance filtering for all topics</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>Daily email alerts with direct agenda links</span>
                  </li>
                </ul>
              </div>

              {/* Primary Actions */}
              <div className="bg-white rounded-lg border border-gray-200 p-5">
                <button className="w-full px-6 py-2.5 bg-[#002147] text-white rounded-lg font-medium hover:bg-[#003a6b] transition-all flex items-center justify-center gap-2 mb-3">
                  Go to Dashboard
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-center text-sm text-gray-500">
                  Need help? Contact <a href="mailto:support@myhamlet.com" className="text-blue-600 hover:underline">support@myhamlet.com</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};