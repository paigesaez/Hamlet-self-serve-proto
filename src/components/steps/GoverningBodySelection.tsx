import React, { useState } from 'react';
import { Building, Users, ChevronDown, ChevronUp, Info, Check } from 'lucide-react';
import { locations } from '../../data/locations';
import { StepHeader } from '../shared/StepHeader';

interface GoverningBodySelectionProps {
  selectedLocations: number[];
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
      <div className="max-w-6xl mx-auto">
        <StepHeader 
          icon={Building} 
          title="Configure monitoring scope" 
          subtitle="Select the specific governing bodies you want to monitor in each jurisdiction"
        />

        {/* Quick Actions */}
        <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif font-bold text-gray-900">Quick selection</h3>
            <div className="flex gap-3">
              <button 
                onClick={() => {
                  selectedLocationData.forEach(loc => {
                    handleSelectAllForLocation(loc.id, ['City Council', 'Planning Commission']);
                  });
                }}
                className="px-4 py-2 bg-white rounded-lg text-sm font-medium text-[#002147] hover:bg-blue-50 transition-colors border border-gray-200"
              >
                Essential bodies only
              </button>
              <button
                onClick={() => {
                  selectedLocationData.forEach(loc => {
                    handleSelectAllForLocation(loc.id, loc.governingBodies);
                  });
                }}
                className="px-4 py-2 bg-white rounded-lg text-sm font-medium text-purple-700 hover:bg-purple-50 transition-colors border border-purple-200"
              >
                Select all bodies
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            <strong>Tip:</strong> Most teams monitor City Council and Planning Commission as they handle 90% of development decisions
          </p>
        </div>

        {/* Jurisdictions List */}
        <div className="space-y-4 mb-8">
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
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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

        {/* Help Section */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 mb-8 border border-amber-100">
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
      </div>
      
      {/* Sticky Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 px-6 py-3 text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              <ChevronDown className="w-4 h-4 rotate-90" />
              <span>Back</span>
            </button>
            
            <div className="flex items-center space-x-6">
              <div className="text-right">
                <p className="text-2xl font-semibold text-gray-900">
                  ${calculatePrice()}/mo
                </p>
                <p className="text-sm text-gray-600">
                  {getTotalBodies()} governing {getTotalBodies() === 1 ? 'body' : 'bodies'}
                </p>
              </div>
              <button
                onClick={onNext}
                disabled={getTotalBodies() === 0}
                className={`px-8 py-3 rounded-xl font-semibold transition-all ${
                  getTotalBodies() === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg'
                }`}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};