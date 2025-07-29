import React, { useState } from 'react';
import { Building, ChevronDown, ChevronUp, Info, Check, Sparkles, Users, Briefcase, TrendingUp, ChevronRight, Plus } from 'lucide-react';
import { locations } from '../../data/locations';
import { StepHeader } from '../shared/StepHeader';

interface GoverningBodySelectionProps {
  selectedLocations: number[];
  selectedPackages?: { type: 'state' | 'region', name: string }[];
  selectedBodies: Record<string, string[]>;
  toggleBody: (locationId: number, body: string) => void;
  getTotalBodies: () => number;
  calculatePrice: () => number;
  onBack: () => void;
  onNext: () => void;
}

export const GoverningBodySelection: React.FC<GoverningBodySelectionProps> = ({
  selectedLocations,
  selectedBodies,
  toggleBody,
  getTotalBodies,
  calculatePrice,
  onBack,
  onNext
}) => {
  const selectedLocationData = locations.filter(loc => selectedLocations.includes(loc.id));
  const [expandedLocations, setExpandedLocations] = useState<number[]>([]);
  const [addPlanningCommission, setAddPlanningCommission] = useState(false);
  
  // Group locations by state to detect package selections
  const locationsByState = selectedLocationData.reduce((acc, loc) => {
    if (!acc[loc.state]) acc[loc.state] = [];
    acc[loc.state].push(loc);
    return acc;
  }, {} as Record<string, typeof selectedLocationData>);
  
  // If more than 5 cities from same state, likely a package selection
  const useStateView = Object.values(locationsByState).some(locs => locs.length > 5);
  
  // State name mapping
  const getStateName = (stateCode: string): string => {
    const stateNames: Record<string, string> = {
      'AL': 'Alabama', 'AK': 'Alaska', 'AZ': 'Arizona', 'AR': 'Arkansas',
      'CA': 'California', 'CO': 'Colorado', 'CT': 'Connecticut', 'DE': 'Delaware',
      'FL': 'Florida', 'GA': 'Georgia', 'HI': 'Hawaii', 'ID': 'Idaho',
      'IL': 'Illinois', 'IN': 'Indiana', 'IA': 'Iowa', 'KS': 'Kansas',
      'KY': 'Kentucky', 'LA': 'Louisiana', 'ME': 'Maine', 'MD': 'Maryland',
      'MA': 'Massachusetts', 'MI': 'Michigan', 'MN': 'Minnesota', 'MS': 'Mississippi',
      'MO': 'Missouri', 'MT': 'Montana', 'NE': 'Nebraska', 'NV': 'Nevada',
      'NH': 'New Hampshire', 'NJ': 'New Jersey', 'NM': 'New Mexico', 'NY': 'New York',
      'NC': 'North Carolina', 'ND': 'North Dakota', 'OH': 'Ohio', 'OK': 'Oklahoma',
      'OR': 'Oregon', 'PA': 'Pennsylvania', 'RI': 'Rhode Island', 'SC': 'South Carolina',
      'SD': 'South Dakota', 'TN': 'Tennessee', 'TX': 'Texas', 'UT': 'Utah',
      'VT': 'Vermont', 'VA': 'Virginia', 'WA': 'Washington', 'WV': 'West Virginia',
      'WI': 'Wisconsin', 'WY': 'Wyoming'
    };
    return stateNames[stateCode] || stateCode;
  };
  
  // Handle Planning Commission toggle
  const handlePlanningCommissionToggle = () => {
    const newValue = !addPlanningCommission;
    setAddPlanningCommission(newValue);
    
    // Toggle Planning Commission for all locations
    selectedLocationData.forEach(loc => {
      const hasPlanningCommission = selectedBodies[loc.id]?.includes('Planning Commission');
      if (newValue && !hasPlanningCommission && loc.governingBodies.includes('Planning Commission')) {
        toggleBody(loc.id, 'Planning Commission');
      } else if (!newValue && hasPlanningCommission) {
        toggleBody(loc.id, 'Planning Commission');
      }
    });
  };
  
  // Ensure all locations have City Council selected by default
  React.useEffect(() => {
    selectedLocationData.forEach(loc => {
      if (!selectedBodies[loc.id]?.includes('City Council')) {
        toggleBody(loc.id, 'City Council');
      }
    });
  }, [selectedLocations]);
  
  // Calculate pricing
  const basePrice = selectedLocationData.length * 50; // $50 per city for City Council
  const planningCommissionPrice = addPlanningCommission ? selectedLocationData.length * 25 : 0; // +$25 per city for Planning Commission
  const totalPrice = basePrice + planningCommissionPrice;

  return (
    <>
      <StepHeader 
        icon={Building} 
        title="Configure monitoring scope" 
        subtitle="City Council monitoring is included for all jurisdictions"
      />

      {/* Main Monitoring Configuration */}
      <div className="space-y-6 mb-20">
        {/* Base Package */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#002147] to-[#003a6b] rounded-xl flex items-center justify-center shadow-sm">
                  <Building className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-serif font-bold text-gray-900">City Council Monitoring</h3>
                  <p className="text-sm text-gray-600 mt-1">Primary legislative body agenda monitoring</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">${basePrice}/mo</p>
                <p className="text-sm text-gray-500">Included</p>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-xl p-4">
              <h4 className="font-semibold text-gray-900 mb-2">What's included:</h4>
              <ul className="text-sm text-gray-700 space-y-1.5">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 mt-0.5" />
                  <span>All city council meeting agendas for {selectedLocationData.length} {selectedLocationData.length === 1 ? 'jurisdiction' : 'jurisdictions'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 mt-0.5" />
                  <span>24-hour alerts when new agendas are published</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 mt-0.5" />
                  <span>AI-powered matching for your selected topics</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 mt-0.5" />
                  <span>Direct links to agenda items and supporting documents</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Optional Add-on */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm transition-all ${
                  addPlanningCommission 
                    ? 'bg-gradient-to-br from-purple-500 to-purple-600' 
                    : 'bg-gray-100'
                }`}>
                  <Plus className={`w-6 h-6 ${addPlanningCommission ? 'text-white' : 'text-gray-600'}`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-serif font-bold text-gray-900">Planning Commission Add-on</h3>
                  <p className="text-sm text-gray-600 mt-1">Also monitor planning commission meetings for development proposals</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">+${selectedLocationData.length * 25}/mo</p>
                <p className="text-sm text-gray-500">Optional</p>
              </div>
            </div>
            
            <button
              onClick={handlePlanningCommissionToggle}
              className={`w-full p-4 rounded-xl border-2 transition-all flex items-center justify-between group ${
                addPlanningCommission
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                  addPlanningCommission
                    ? 'bg-purple-600 border-purple-600'
                    : 'bg-white border-gray-300 group-hover:border-gray-400'
                }`}>
                  {addPlanningCommission && <Check className="w-3 h-3 text-white" />}
                </div>
                <span className={`font-medium ${addPlanningCommission ? 'text-gray-900' : 'text-gray-700'}`}>
                  Add Planning Commission monitoring
                </span>
              </div>
              <span className={`text-sm font-medium ${
                addPlanningCommission ? 'text-purple-600' : 'text-gray-500'
              }`}>
                {addPlanningCommission ? 'Added' : 'Add'}
              </span>
            </button>
            
            {addPlanningCommission && (
              <div className="mt-4 bg-purple-50 rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Planning Commission includes:</h4>
                <ul className="text-sm text-gray-700 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-purple-600 mt-0.5" />
                    <span>All planning commission meeting agendas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-purple-600 mt-0.5" />
                    <span>Development proposals and site plans</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-purple-600 mt-0.5" />
                    <span>Zoning changes and variances</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-purple-600 mt-0.5" />
                    <span>Environmental impact reviews</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Jurisdiction Summary */}
        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
          <h4 className="font-semibold text-gray-900 mb-4">Selected jurisdictions</h4>
          {useStateView ? (
            // State-grouped view
            <div className="space-y-3">
              {Object.entries(locationsByState).map(([state, stateLocations]) => (
                <div key={state} className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <div>
                    <span className="font-medium text-gray-900">{getStateName(state)}</span>
                    <span className="text-sm text-gray-600 ml-2">({stateLocations.length} cities)</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    ${(addPlanningCommission ? 75 : 50) * stateLocations.length}/mo
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Individual city view
            <div className="grid md:grid-cols-2 gap-3">
              {selectedLocationData.map(location => (
                <div key={location.id} className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <span className="text-sm font-medium text-gray-900">
                    {location.name}, {location.state}
                  </span>
                  <span className="text-sm text-gray-500">
                    ${addPlanningCommission ? 75 : 50}/mo
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Why Planning Commission? */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-amber-900 mb-2">Why add Planning Commission?</h4>
              <p className="text-sm text-amber-800 mb-3">
                Planning commissions review development proposals 30-60 days before they reach city council. 
                This gives you crucial lead time to:
              </p>
              <ul className="text-sm text-amber-700 space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600">•</span>
                  <span>Identify competing projects early</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600">•</span>
                  <span>Prepare for public hearings</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600">•</span>
                  <span>Track zoning changes that affect your projects</span>
                </li>
              </ul>
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
            <ChevronDown className="w-4 h-4 rotate-90" />
            <span>Back</span>
          </button>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-600">
                ${totalPrice}/mo
              </p>
              <p className="text-xs text-gray-500">
                {selectedLocationData.length} {selectedLocationData.length === 1 ? 'city' : 'cities'} • 
                {addPlanningCommission ? ' City Council + Planning' : ' City Council only'}
              </p>
            </div>
            <button
              onClick={onNext}
              className="px-8 py-3 rounded-xl font-semibold bg-[#002147] text-white hover:bg-[#003a6b] shadow-md hover:shadow-lg transition-all"
            >
              Continue to Topics
            </button>
          </div>
        </div>
      </div>
    </>
  );
};