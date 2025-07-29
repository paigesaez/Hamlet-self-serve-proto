import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, MapPin, ChevronDown, X, Map, Navigation, Check, TrendingUp, Building2 } from 'lucide-react';
import { locations } from '../../data/locations';
import { StepHeader } from '../shared/StepHeader';

interface JurisdictionSelectionProps {
  selectedLocations: number[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  toggleLocation: (locationId: number) => void;
  onNext: () => void;
}

export const JurisdictionSelection: React.FC<JurisdictionSelectionProps> = ({
  selectedLocations,
  searchTerm,
  setSearchTerm,
  toggleLocation,
  onNext
}) => {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [stateDropdownOpen, setStateDropdownOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'cities' | 'packages' | 'regions'>('cities');
  const dropdownRef = useRef<HTMLDivElement>(null);
  
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
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setStateDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  // Get unique states with city counts
  const stateData = useMemo(() => {
    const states = locations.reduce((acc, location) => {
      if (!acc[location.state]) {
        acc[location.state] = {
          count: 0,
          activeCount: 0,
          selectedCount: 0
        };
      }
      acc[location.state].count++;
      if (location.coverage === 'Active') {
        acc[location.state].activeCount++;
      }
      if (selectedLocations.includes(location.id)) {
        acc[location.state].selectedCount++;
      }
      return acc;
    }, {} as Record<string, { count: number; activeCount: number; selectedCount: number }>);
    
    return Object.entries(states)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([state, data]) => ({ state, ...data }));
  }, [selectedLocations]);
  
  // Filter locations based on search and selected state
  const filteredLocations = useMemo(() => {
    return locations.filter(loc => {
      const matchesSearch = loc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          loc.state.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesState = !selectedState || loc.state === selectedState;
      return matchesSearch && matchesState;
    });
  }, [searchTerm, selectedState]);
  
  // Get selected locations data
  const selectedLocationData = locations.filter(loc => selectedLocations.includes(loc.id));
  
  return (
    <>
      <StepHeader 
        icon={MapPin} 
        title="Select your jurisdictions" 
        subtitle={`Choose from ${locations.length} cities across ${stateData.length} states`}
      />

      {/* Laptop-optimized split layout */}
      <div className="grid lg:grid-cols-3 gap-8 mb-20">
        {/* Left side - Selection area (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Search and State Filter Bar */}
          <div>
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search Input */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search cities, counties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                />
              </div>
              
              {/* State Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setStateDropdownOpen(!stateDropdownOpen)}
                  className="w-full sm:w-auto px-6 py-3.5 bg-white border border-gray-200 rounded-2xl hover:border-gray-300 transition-colors flex items-center justify-between gap-3 shadow-sm"
                >
                  <span className="text-gray-700">
                    {selectedState ? (
                      <span className="flex items-center gap-2">
                        <Navigation className="w-4 h-4 text-[#002147]" />
                        <span className="font-medium">{selectedState}</span>
                        <span className="text-sm text-gray-500">({stateData.find(s => s.state === selectedState)?.count} cities)</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Map className="w-4 h-4 text-gray-400" />
                        <span>All States</span>
                      </span>
                    )}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${stateDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Dropdown Menu */}
                {stateDropdownOpen && (
                  <div className="absolute z-20 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="max-h-96 overflow-y-auto">
                      {/* All States Option */}
                      <button
                        onClick={() => {
                          setSelectedState(null);
                          setStateDropdownOpen(false);
                        }}
                        className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center justify-between ${
                          !selectedState ? 'bg-blue-50 text-[#002147]' : 'text-gray-700'
                        }`}
                      >
                        <span className="font-medium">All States</span>
                        <span className="text-sm text-gray-500">{locations.length} total</span>
                      </button>
                      
                      <div className="border-t border-gray-100" />
                      
                      {/* State Options */}
                      {stateData.map(({ state, count, activeCount, selectedCount }) => (
                        <button
                          key={state}
                          onClick={() => {
                            setSelectedState(state);
                            setStateDropdownOpen(false);
                          }}
                          className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center justify-between ${
                            selectedState === state ? 'bg-blue-50 text-[#002147]' : 'text-gray-700'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="font-medium">{getStateName(state)}</span>
                            {selectedCount > 0 && (
                              <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                                {selectedCount} selected
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">{count} cities</span>
                            {activeCount === count && (
                              <div className="w-2 h-2 bg-green-500 rounded-full" title="All active" />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Active Filters */}
            {(selectedState || searchTerm) && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Active filters:</span>
                {selectedState && (
                  <button
                    onClick={() => setSelectedState(null)}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-[#002147] rounded-full text-sm font-medium hover:bg-blue-200 transition-colors"
                  >
                    {selectedState}
                    <X className="w-3 h-3" />
                  </button>
                )}
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
                  >
                    "{searchTerm}"
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            )}
          </div>

          {/* View Mode Tabs */}
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('cities')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                viewMode === 'cities'
                  ? 'bg-[#002147] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Individual Cities
            </button>
            <button
              onClick={() => setViewMode('packages')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                viewMode === 'packages'
                  ? 'bg-[#002147] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              State Packages
            </button>
            <button
              onClick={() => setViewMode('regions')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                viewMode === 'regions'
                  ? 'bg-[#002147] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Regional Packages
            </button>
          </div>

          {/* Content based on view mode */}
          <div className="bg-gray-50 rounded-2xl p-6 max-h-[600px] overflow-y-auto">
            {viewMode === 'cities' ? (
              <div className="grid md:grid-cols-2 gap-3">
                {filteredLocations.length === 0 ? (
                  <div className="col-span-2 text-center py-12">
                    <p className="text-gray-500">No locations found matching your criteria</p>
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedState(null);
                      }}
                      className="mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Clear filters
                    </button>
                  </div>
                ) : (
                  filteredLocations.map(location => (
                    <label
                      key={location.id}
                      className={`
                        relative block p-4 rounded-xl cursor-pointer transition-all
                        ${selectedLocations.includes(location.id)
                          ? 'bg-blue-50 border-2 border-[#002147] shadow-sm'
                          : 'bg-white border border-gray-200 hover:border-gray-300 hover:shadow-sm'
                        }
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedLocations.includes(location.id)}
                          onChange={() => toggleLocation(location.id)}
                          className="w-5 h-5 text-[#002147] border-2 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">
                            {location.name}, {location.state}
                          </h4>
                          <p className="text-xs text-gray-600 mt-0.5">
                            {location.governingBodies.length} governing {location.governingBodies.length === 1 ? 'body' : 'bodies'}
                          </p>
                        </div>
                        <span className={`
                          inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                          ${location.coverage === 'Active' 
                            ? 'bg-green-100 text-green-700'
                            : location.coverage === 'Available'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-orange-100 text-orange-700'
                          }
                        `}>
                          {location.coverage}
                        </span>
                      </div>
                    </label>
                  ))
                )}
              </div>
            ) : viewMode === 'packages' ? (
              <div className="grid gap-4">
                {stateData.map(({ state, count, activeCount, selectedCount }) => {
                  const stateLocations = locations.filter(loc => loc.state === state);
                  const allSelected = stateLocations.every(loc => selectedLocations.includes(loc.id));
                  const someSelected = selectedCount > 0 && !allSelected;
                  
                  return (
                    <div
                      key={state}
                      className={`
                        p-5 rounded-xl border-2 transition-all
                        ${allSelected 
                          ? 'bg-blue-50 border-[#002147]' 
                          : someSelected
                          ? 'bg-gray-50 border-gray-300'
                          : 'bg-white border-gray-200 hover:border-gray-300'
                        }
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {getStateName(state)} Package
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {count} cities • {activeCount} actively monitored
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            if (allSelected) {
                              // Deselect all
                              stateLocations.forEach(loc => {
                                if (selectedLocations.includes(loc.id)) {
                                  toggleLocation(loc.id);
                                }
                              });
                            } else {
                              // Select all
                              stateLocations.forEach(loc => {
                                if (!selectedLocations.includes(loc.id)) {
                                  toggleLocation(loc.id);
                                }
                              });
                            }
                          }}
                          className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                            allSelected
                              ? 'bg-[#002147] text-white hover:bg-[#003a6b]'
                              : 'bg-white text-[#002147] border border-[#002147] hover:bg-blue-50'
                          }`}
                        >
                          {allSelected ? 'Selected' : someSelected ? `Select All (${selectedCount}/${count})` : 'Select Package'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              // Regional Packages View
              <div className="grid gap-4">
                {[
                  {
                    name: 'West Coast',
                    states: ['CA', 'OR', 'WA'],
                    description: 'California, Oregon, Washington'
                  },
                  {
                    name: 'Southwest',
                    states: ['AZ', 'NM', 'TX', 'NV'],
                    description: 'Arizona, New Mexico, Texas, Nevada'
                  },
                  {
                    name: 'Northeast Corridor',
                    states: ['NY', 'NJ', 'CT', 'MA', 'PA'],
                    description: 'New York, New Jersey, Connecticut, Massachusetts, Pennsylvania'
                  },
                  {
                    name: 'Southeast',
                    states: ['FL', 'GA', 'NC', 'SC', 'VA'],
                    description: 'Florida, Georgia, North Carolina, South Carolina, Virginia'
                  },
                  {
                    name: 'Great Lakes',
                    states: ['IL', 'MI', 'OH', 'WI', 'IN'],
                    description: 'Illinois, Michigan, Ohio, Wisconsin, Indiana'
                  },
                  {
                    name: 'Mountain West',
                    states: ['CO', 'UT', 'ID', 'MT', 'WY'],
                    description: 'Colorado, Utah, Idaho, Montana, Wyoming'
                  }
                ].map(region => {
                  const regionLocations = locations.filter(loc => region.states.includes(loc.state));
                  const selectedInRegion = regionLocations.filter(loc => selectedLocations.includes(loc.id));
                  const allSelected = regionLocations.length > 0 && regionLocations.every(loc => selectedLocations.includes(loc.id));
                  const someSelected = selectedInRegion.length > 0 && !allSelected;
                  
                  return (
                    <div
                      key={region.name}
                      className={`
                        p-5 rounded-xl border-2 transition-all
                        ${allSelected 
                          ? 'bg-blue-50 border-[#002147]' 
                          : someSelected
                          ? 'bg-gray-50 border-gray-300'
                          : 'bg-white border-gray-200 hover:border-gray-300'
                        }
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {region.name}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {region.description}
                          </p>
                          <p className="text-sm text-gray-500 mt-0.5">
                            {regionLocations.length} cities total
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            if (allSelected) {
                              // Deselect all
                              regionLocations.forEach(loc => {
                                if (selectedLocations.includes(loc.id)) {
                                  toggleLocation(loc.id);
                                }
                              });
                            } else {
                              // Select all
                              regionLocations.forEach(loc => {
                                if (!selectedLocations.includes(loc.id)) {
                                  toggleLocation(loc.id);
                                }
                              });
                            }
                          }}
                          className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                            allSelected
                              ? 'bg-[#002147] text-white hover:bg-[#003a6b]'
                              : 'bg-white text-[#002147] border border-[#002147] hover:bg-blue-50'
                          }`}
                        >
                          {allSelected ? 'Selected' : someSelected ? `Partial (${selectedInRegion.length}/${regionLocations.length})` : 'Select Region'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right side - Live summary (1 col) */}
        <div className="lg:col-span-1">
          <div className="sticky top-6 space-y-6">
            {/* Selection Summary */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Your selection</h3>
                {selectedLocations.length > 0 && (
                  <button
                    onClick={() => {
                      selectedLocations.forEach(id => toggleLocation(id));
                    }}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Clear all
                  </button>
                )}
              </div>
              
              {selectedLocations.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-8">
                  No jurisdictions selected yet
                </p>
              ) : (
                <div className="space-y-3">
                  {/* Summary stats */}
                  <div className="grid grid-cols-2 gap-3 pb-3 border-b border-gray-100">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-[#002147]">{selectedLocations.length}</p>
                      <p className="text-xs text-gray-600">Cities</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-[#002147]">
                        {Object.keys(selectedLocationData.reduce((acc, loc) => {
                          acc[loc.state] = true;
                          return acc;
                        }, {} as Record<string, boolean>)).length}
                      </p>
                      <p className="text-xs text-gray-600">States</p>
                    </div>
                  </div>
                  
                  {/* Selected locations list */}
                  <div className="max-h-[300px] overflow-y-auto space-y-2">
                    {selectedLocationData.map(location => (
                      <div key={location.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-700">
                          {location.name}, {location.state}
                        </span>
                        <button
                          onClick={() => toggleLocation(location.id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* What's next */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
              <h4 className="font-semibold text-gray-900 mb-3">What happens next?</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-[#002147]">1</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Configure monitoring</p>
                    <p className="text-gray-600 text-xs mt-0.5">City Council + optional Planning Commission</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-[#002147]">2</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Select topics</p>
                    <p className="text-gray-600 text-xs mt-0.5">Choose development types to track</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-[#002147]">3</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Start monitoring</p>
                    <p className="text-gray-600 text-xs mt-0.5">Receive alerts within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Action Button */}
            <div className="pt-6">
              <button
                onClick={onNext}
                disabled={selectedLocations.length === 0}
                className={`w-full px-8 py-4 rounded-xl font-semibold transition-all ${
                  selectedLocations.length === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-[#002147] text-white hover:bg-[#003a6b] shadow-md hover:shadow-lg'
                }`}
              >
                Continue to Governing Bodies
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};