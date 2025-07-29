import React, { useState } from 'react';
import { Building, ChevronDown, ChevronUp, Info, Check } from 'lucide-react';
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
  const [expandedLocations, setExpandedLocations] = useState<number[]>(selectedLocations);
  
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
  
  // Quick select presets
  const handleSelectAllForLocation = (locationId: number, bodies: string[]) => {
    const currentBodies = selectedBodies[locationId] || [];
    if (currentBodies.length === bodies.length) {
      // Deselect all
      bodies.forEach(body => {
        if (currentBodies.includes(body)) {
          toggleBody(locationId, body);
        }
      });
    } else {
      // Select all
      bodies.forEach(body => {
        if (!currentBodies.includes(body)) {
          toggleBody(locationId, body);
        }
      });
    }
  };

  const toggleExpanded = (locationId: number) => {
    setExpandedLocations(prev => 
      prev.includes(locationId) 
        ? prev.filter(id => id !== locationId)
        : [...prev, locationId]
    );
  };

  return (
    <>
      <StepHeader 
        icon={Building} 
        title="Configure monitoring scope" 
        subtitle="Select the specific governing bodies you want to monitor in each jurisdiction"
      />

      {/* Jurisdictions List */}
      {selectedLocationData.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">No jurisdictions selected</p>
          <button
            onClick={onBack}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Go back to select jurisdictions
          </button>
        </div>
      ) : useStateView ? (
        // State-grouped view for package selections
        <div className="space-y-6 mb-6">
          {Object.entries(locationsByState).map(([state, stateLocations]) => (
            <div key={state} className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-gray-50 to-gray-100">
                <h3 className="text-xl font-serif font-bold text-gray-900">
                  {getStateName(state)} Package Configuration
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Configure governing bodies for all {stateLocations.length} cities in {getStateName(state)}
                </p>
              </div>
              
              <div className="p-6">
                <p className="text-sm font-medium text-gray-700 mb-4">
                  Select governing bodies to monitor across all {getStateName(state)} cities:
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {['City Council', 'Planning Commission', 'Board of Supervisors', 'Zoning Board'].map(body => {
                    // Check if all cities in state have this body selected
                    const allSelected = stateLocations.every(loc => 
                      selectedBodies[loc.id]?.includes(body)
                    );
                    const someSelected = stateLocations.some(loc => 
                      selectedBodies[loc.id]?.includes(body)
                    ) && !allSelected;
                    
                    return (
                      <label
                        key={body}
                        className={`
                          relative flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all
                          ${allSelected 
                            ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-indigo-50 shadow-sm' 
                            : someSelected
                            ? 'border-purple-300 bg-purple-50'
                            : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50'
                          }
                        `}
                      >
                        <input
                          type="checkbox"
                          checked={allSelected}
                          onChange={() => {
                            if (allSelected) {
                              // Deselect from all cities in state
                              stateLocations.forEach(loc => {
                                if (selectedBodies[loc.id]?.includes(body)) {
                                  toggleBody(loc.id, body);
                                }
                              });
                            } else {
                              // Select for all cities in state
                              stateLocations.forEach(loc => {
                                if (!selectedBodies[loc.id]?.includes(body)) {
                                  toggleBody(loc.id, body);
                                }
                              });
                            }
                          }}
                          className="sr-only"
                        />
                        <div className={`
                          w-5 h-5 rounded border-2 flex items-center justify-center mr-3 transition-colors
                          ${allSelected 
                            ? 'bg-purple-600 border-purple-600' 
                            : someSelected
                            ? 'bg-purple-300 border-purple-300'
                            : 'bg-white border-gray-300'
                          }
                        `}>
                          {(allSelected || someSelected) && <Check className="w-3 h-3 text-white" />}
                        </div>
                        <div className="flex-1">
                          <span className={`text-sm font-medium ${
                            allSelected ? 'text-gray-900' : 'text-gray-700'
                          }`}>
                            {body}
                          </span>
                          {/* Add descriptions for common bodies */}
                          {body === 'City Council' && (
                            <p className="text-xs text-gray-500 mt-0.5">Primary legislative body</p>
                          )}
                          {body === 'Planning Commission' && (
                            <p className="text-xs text-gray-500 mt-0.5">Reviews development proposals</p>
                          )}
                          {body === 'Board of Supervisors' && (
                            <p className="text-xs text-gray-500 mt-0.5">County governance</p>
                          )}
                          {body === 'Zoning Board' && (
                            <p className="text-xs text-gray-500 mt-0.5">Handles variances & permits</p>
                          )}
                        </div>
                        <span className="text-sm font-medium text-purple-600">
                          ${50 * stateLocations.length}/mo
                        </span>
                      </label>
                    );
                  })}
                </div>
                
                {someSelected && (
                  <p className="text-xs text-amber-600 mt-4">
                    ⚠️ Some cities have different selections. Check marks indicate partial selection.
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-4 mb-6">
          {selectedLocationData.map(location => {
            const isExpanded = expandedLocations.includes(location.id);
            const selectedCount = selectedBodies[location.id]?.length || 0;
            const allSelected = selectedCount === location.governingBodies.length;
            
            return (
              <div key={location.id} className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
                {/* Location Header */}
                <div 
                  className="p-6 cursor-pointer"
                  onClick={() => toggleExpanded(location.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
                        <span className="text-lg font-semibold text-gray-700">
                          {location.name.substring(0, 2).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-xl font-serif font-bold text-gray-900">
                          {location.name}, {location.state}
                        </h3>
                        <p className="text-sm text-gray-600 mt-0.5">
                          {selectedCount} of {location.governingBodies.length} bodies selected
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${
                        location.coverage === 'Active' 
                          ? 'bg-green-100 text-green-700' 
                          : location.coverage === 'Available'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-orange-100 text-orange-700'
                      }`}>
                        {location.coverage}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Expanded Body Selection */}
                {isExpanded && (
                  <div className="px-6 pb-6 border-t border-gray-100">
                    <div className="pt-4 mb-4 flex items-center justify-between">
                      <p className="text-sm text-gray-600">Select governing bodies to monitor:</p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectAllForLocation(location.id, location.governingBodies);
                        }}
                        className="text-sm font-medium text-purple-600 hover:text-purple-700"
                      >
                        {allSelected ? 'Deselect all' : 'Select all'}
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-3">
                      {location.governingBodies.map(body => {
                        const isSelected = selectedBodies[location.id]?.includes(body);
                        return (
                          <label
                            key={body}
                            className={`
                              relative flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all
                              ${isSelected 
                                ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-indigo-50 shadow-sm' 
                                : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50'
                              }
                            `}
                          >
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleBody(location.id, body)}
                              className="sr-only"
                            />
                            <div className={`
                              w-5 h-5 rounded border-2 flex items-center justify-center mr-3 transition-colors
                              ${isSelected 
                                ? 'bg-purple-600 border-purple-600' 
                                : 'bg-white border-gray-300'
                              }
                            `}>
                              {isSelected && <Check className="w-3 h-3 text-white" />}
                            </div>
                            <div className="flex-1">
                              <span className={`text-sm font-medium ${
                                isSelected ? 'text-gray-900' : 'text-gray-700'
                              }`}>
                                {body}
                              </span>
                              {/* Add descriptions for common bodies */}
                              {body === 'City Council' && (
                                <p className="text-xs text-gray-500 mt-0.5">Primary legislative body</p>
                              )}
                              {body === 'Planning Commission' && (
                                <p className="text-xs text-gray-500 mt-0.5">Reviews development proposals</p>
                              )}
                              {body === 'Board of Supervisors' && (
                                <p className="text-xs text-gray-500 mt-0.5">County governance</p>
                              )}
                              {body === 'Zoning Board' && (
                                <p className="text-xs text-gray-500 mt-0.5">Handles variances & permits</p>
                              )}
                            </div>
                            {isSelected && (
                              <span className="text-sm font-medium text-purple-600">$50/mo</span>
                            )}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Help Section */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100">
          <div className="flex items-start space-x-3">
            <Info className="w-5 h-5 text-amber-600 mt-0.5" />
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-amber-900 mb-2">Need guidance?</h4>
              <p className="text-sm text-amber-800 mb-3">
                Not sure which bodies to monitor? Here's what similar teams typically choose:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div>
                  <strong className="text-amber-900">Residential developers:</strong>
                  <p className="text-amber-700">City Council, Planning Commission, Zoning Board</p>
                </div>
                <div>
                  <strong className="text-amber-900">Commercial developers:</strong>
                  <p className="text-amber-700">All bodies + Economic Development</p>
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
            <ChevronDown className="w-4 h-4 rotate-90" />
            <span>Back</span>
          </button>
          
          <div className="flex items-center gap-4">
            <p className="text-sm text-gray-600">
              ${calculatePrice()}/mo • {getTotalBodies()} {getTotalBodies() === 1 ? 'body' : 'bodies'}
            </p>
            <button
              onClick={onNext}
              disabled={getTotalBodies() === 0}
              className={`px-8 py-3 rounded-xl font-semibold transition-all ${
                getTotalBodies() === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-[#002147] text-white hover:bg-[#003a6b] shadow-md hover:shadow-lg'
              }`}
            >
              Continue to Topics
            </button>
          </div>
        </div>
      </div>
    </>
  );
};