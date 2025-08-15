import React from 'react';
import { Building, ChevronDown, Info, Check, Plus, ArrowRight } from 'lucide-react';
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
  onBack,
  onNext
}) => {
  const selectedLocationData = locations.filter(loc => selectedLocations.includes(loc.id));
  const [addPlanningCommission, setAddPlanningCommission] = React.useState(false);
  
  // Group locations by state to detect package selections
  const locationsByState = selectedLocationData.reduce((acc, loc) => {
    if (!acc[loc.state]) acc[loc.state] = [];
    acc[loc.state].push(loc);
    return acc;
  }, {} as Record<string, typeof selectedLocationData>);
  
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

  return (
    <>
      <StepHeader 
        icon={Building} 
        title="Configure monitoring scope" 
        subtitle="City Council monitoring is included for all jurisdictions"
      />

      {/* Laptop-optimized split layout */}
      <div className="grid lg:grid-cols-3 gap-8 mb-20">
        {/* Left side - Configuration (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Visual representation of the choice */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-8">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Base Package */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#002147] to-[#003a6b] rounded-lg flex items-center justify-center shadow-sm">
                    <Building className="w-7 h-7 text-white" />
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    Included
                  </span>
                </div>
                <h3 className="text-lg font-serif font-bold text-gray-900 mb-2">City Council</h3>
                <p className="text-sm text-gray-600 mb-4">Primary legislative body for all jurisdictions</p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Agenda items 24 hours before meetings</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Supporting documents & staff reports</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Public hearing notices</span>
                  </div>
                </div>
              </div>

              {/* Optional Add-on */}
              <div className={`rounded-lg p-6 shadow-sm border-2 transition-all ${
                addPlanningCommission 
                  ? 'bg-purple-50 border-purple-500' 
                  : 'bg-white border-gray-200'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 rounded-lg flex items-center justify-center shadow-sm transition-all ${
                    addPlanningCommission 
                      ? 'bg-gradient-to-br from-purple-500 to-purple-600' 
                      : 'bg-gray-100'
                  }`}>
                    <Plus className={`w-7 h-7 ${addPlanningCommission ? 'text-white' : 'text-gray-600'}`} />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    addPlanningCommission 
                      ? 'bg-purple-100 text-purple-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    Optional
                  </span>
                </div>
                <h3 className="text-lg font-serif font-bold text-gray-900 mb-2">Planning Commission</h3>
                <p className="text-sm text-gray-600 mb-4">Get 30-60 days advance notice on development</p>
                
                <button
                  onClick={handlePlanningCommissionToggle}
                  className={`w-full p-3 rounded-lg border-2 transition-all flex items-center justify-center gap-2 ${
                    addPlanningCommission
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-300 hover:border-gray-400 bg-white text-gray-700'
                  }`}
                >
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                    addPlanningCommission
                      ? 'bg-purple-600 border-purple-600'
                      : 'bg-white border-gray-300'
                  }`}>
                    {addPlanningCommission && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <span className="font-medium">
                    {addPlanningCommission ? 'Added to all jurisdictions' : 'Add to all jurisdictions'}
                  </span>
                </button>
                
                {addPlanningCommission && (
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Development proposals & site plans</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Zoning changes & variances</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Environmental reviews</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Visual flow diagram */}
          <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-6">How the approval process works</h3>
            <div className="relative">
              <div className="absolute top-8 left-8 right-8 h-0.5 bg-gray-200"></div>
              <div className="grid grid-cols-3 gap-4 relative">
                <div className="text-center">
                  <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center relative z-10 ${
                    addPlanningCommission ? 'bg-purple-100 border-2 border-purple-500' : 'bg-gray-100 border-2 border-gray-300'
                  }`}>
                    <Plus className={`w-8 h-8 ${addPlanningCommission ? 'text-purple-600' : 'text-gray-400'}`} />
                  </div>
                  <h4 className="font-medium text-gray-900 mt-3">Planning Commission</h4>
                  <p className="text-xs text-gray-600 mt-1">Reviews first</p>
                  <p className={`text-xs mt-1 font-medium ${
                    addPlanningCommission ? 'text-purple-600' : 'text-gray-400'
                  }`}>
                    {addPlanningCommission ? '30-60 days early' : 'Not monitoring'}
                  </p>
                </div>
                
                <div className="flex items-center justify-center">
                  <ArrowRight className="w-6 h-6 text-gray-400" />
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto bg-blue-100 border-2 border-[#002147] rounded-full flex items-center justify-center relative z-10">
                    <Building className="w-8 h-8 text-[#002147]" />
                  </div>
                  <h4 className="font-medium text-gray-900 mt-3">City Council</h4>
                  <p className="text-xs text-gray-600 mt-1">Final approval</p>
                  <p className="text-xs text-[#002147] mt-1 font-medium">Always monitoring</p>
                </div>
              </div>
            </div>
            
            {!addPlanningCommission && (
              <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-sm text-amber-800">
                  <strong>Without Planning Commission monitoring</strong>, you'll only learn about projects when they reach City Council for final approval.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right side - Summary (1 col) */}
        <div className="lg:col-span-1">
          <div className="sticky top-6 space-y-6">
            {/* Configuration Summary */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Your configuration</h3>
              
              <div className="space-y-4">
                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 pb-4 border-b border-gray-100">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-[#002147]">{selectedLocationData.length}</p>
                    <p className="text-xs text-gray-600">Jurisdictions</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-[#002147]">
                      {addPlanningCommission ? '2' : '1'}
                    </p>
                    <p className="text-xs text-gray-600">Bodies per city</p>
                  </div>
                </div>
                
                {/* What you're monitoring */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Monitoring scope</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <Building className="w-5 h-5 text-[#002147]" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">City Council</p>
                        <p className="text-xs text-gray-600">All {selectedLocationData.length} jurisdictions</p>
                      </div>
                      <Check className="w-5 h-5 text-green-600" />
                    </div>
                    
                    {addPlanningCommission && (
                      <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                        <Plus className="w-5 h-5 text-purple-600" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">Planning Commission</p>
                          <p className="text-xs text-gray-600">All {selectedLocationData.length} jurisdictions</p>
                        </div>
                        <Check className="w-5 h-5 text-purple-600" />
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Selected jurisdictions preview */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Selected jurisdictions</h4>
                  <div className="max-h-40 overflow-y-auto space-y-1">
                    {Object.entries(locationsByState).map(([state, stateLocations]) => (
                      <div key={state} className="text-sm text-gray-600">
                        <span className="font-medium">{getStateName(state)}</span>
                        <span className="text-gray-500"> ({stateLocations.length})</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Why Planning Commission? */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-6 border border-amber-100">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-amber-900 mb-2">Why add Planning Commission?</h4>
                  <ul className="text-sm text-amber-700 space-y-1">
                    <li>• See projects 30-60 days earlier</li>
                    <li>• Prepare for public hearings</li>
                    <li>• Track competing developments</li>
                    <li>• Influence project outcomes</li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={onNext}
                className="w-full px-8 py-4 rounded-lg font-semibold bg-[#002147] text-white hover:bg-[#003a6b] shadow-md hover:shadow-lg transition-all"
              >
                Continue to Topics
              </button>
              <button
                onClick={onBack}
                className="w-full px-6 py-3 text-gray-700 hover:text-gray-900 font-medium transition-colors flex items-center justify-center gap-2"
              >
                <ChevronDown className="w-4 h-4 rotate-90" />
                <span>Back to Jurisdictions</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};