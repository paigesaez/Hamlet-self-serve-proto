import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, MapPin, X, Check, Filter } from 'lucide-react';
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
  const [viewMode, setViewMode] = useState<'cities' | 'packages' | 'regions'>('packages');
  const [stateFilter, setStateFilter] = useState<string[]>([]);
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
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
        setFilterDropdownOpen(false);
      }
    };
    
    if (filterDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [filterDropdownOpen]);
  
  // Get unique states with city counts
  const stateData = useMemo(() => {
    const states = locations.reduce((acc, location) => {
      if (!acc[location.state]) {
        acc[location.state] = {
          count: 0,
          selectedCount: 0
        };
      }
      acc[location.state].count++;
      if (selectedLocations.includes(location.id)) {
        acc[location.state].selectedCount++;
      }
      return acc;
    }, {} as Record<string, { count: number; selectedCount: number }>);
    
    return Object.entries(states)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([state, data]) => ({ state, ...data }));
  }, [selectedLocations]);
  
  // Filter locations based on search
  const filteredLocations = useMemo(() => {
    return locations.filter(loc => {
      return loc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
             loc.state.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [searchTerm]);
  
  // Get selected locations data
  const selectedLocationData = locations.filter(loc => selectedLocations.includes(loc.id));
  
  // Get selected packages info
  const getSelectedPackagesInfo = () => {
    const info = {
      fullStates: [] as string[],
      partialStates: [] as { state: string; selected: number; total: number }[],
      regions: [] as { name: string; selected: number; total: number }[]
    };
    
    // Check state packages
    stateData.forEach(({ state, count, selectedCount }) => {
      if (selectedCount === count && selectedCount > 0) {
        info.fullStates.push(state);
      } else if (selectedCount > 0) {
        info.partialStates.push({ state, selected: selectedCount, total: count });
      }
    });
    
    // Check regional packages
    const regions = [
      { name: 'West Coast', states: ['CA', 'OR', 'WA'] },
      { name: 'Southwest', states: ['AZ', 'NM', 'TX', 'NV'] },
      { name: 'Northeast', states: ['NY', 'NJ', 'CT', 'MA', 'PA'] },
      { name: 'Southeast', states: ['FL', 'GA', 'NC', 'SC', 'VA'] },
      { name: 'Great Lakes', states: ['IL', 'MI', 'OH', 'WI', 'IN'] },
      { name: 'Mountain West', states: ['CO', 'UT', 'ID', 'MT', 'WY'] }
    ];
    
    regions.forEach(region => {
      const regionLocs = locations.filter(loc => region.states.includes(loc.state));
      const selectedInRegion = regionLocs.filter(loc => selectedLocations.includes(loc.id));
      if (selectedInRegion.length === regionLocs.length && regionLocs.length > 0) {
        info.regions.push({ name: region.name, selected: selectedInRegion.length, total: regionLocs.length });
      }
    });
    
    return info;
  };
  
  const packageInfo = getSelectedPackagesInfo();
  
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
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              
              {/* State Filter Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
                  className="w-full sm:w-auto px-4 py-3 bg-white border border-gray-300 rounded-lg hover:border-gray-400 transition-all flex items-center justify-between gap-3 min-w-[160px]"
                >
                  <span className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700">
                      {stateFilter.length === 0 
                        ? 'All states'
                        : stateFilter.length === 1
                        ? stateFilter[0]
                        : `${stateFilter.length} states`}
                    </span>
                  </span>
                  {stateFilter.length > 0 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setStateFilter([]);
                      }}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </button>
                
                {filterDropdownOpen && (
                  <div className="absolute z-20 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden">
                    <div className="p-2 border-b border-gray-100">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setStateFilter(stateData.map(s => s.state))}
                          className="flex-1 px-2 py-1 text-xs text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        >
                          Select All
                        </button>
                        <button
                          onClick={() => setStateFilter([])}
                          className="flex-1 px-2 py-1 text-xs text-gray-600 hover:bg-gray-50 rounded transition-colors"
                        >
                          Clear
                        </button>
                      </div>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {stateData.map(({ state, count }) => (
                        <label
                          key={state}
                          className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={stateFilter.includes(state)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setStateFilter([...stateFilter, state]);
                              } else {
                                setStateFilter(stateFilter.filter(s => s !== state));
                              }
                            }}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="ml-2 flex-1 text-sm">{getStateName(state)}</span>
                          <span className="text-xs text-gray-500">{count}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* View Mode Tabs */}
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('packages')}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                viewMode === 'packages'
                  ? 'bg-gray-100 text-gray-900 border border-gray-300'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-transparent'
              }`}
            >
              By State
            </button>
            <button
              onClick={() => setViewMode('regions')}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                viewMode === 'regions'
                  ? 'bg-gray-100 text-gray-900 border border-gray-300'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-transparent'
              }`}
            >
              By Region
            </button>
            <button
              onClick={() => setViewMode('cities')}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                viewMode === 'cities'
                  ? 'bg-gray-100 text-gray-900 border border-gray-300'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-transparent'
              }`}
            >
              By City
            </button>
          </div>

          {/* Content based on view mode */}
          <div className="bg-white rounded-lg border border-gray-100 p-8 max-h-[600px] overflow-y-auto">
            {viewMode === 'packages' ? (
              <div>
                {/* Quick actions bar */}
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-gray-500">Click states to select all their cities</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        // Select all states
                        locations.forEach(loc => {
                          if (!selectedLocations.includes(loc.id)) {
                            toggleLocation(loc.id);
                          }
                        });
                      }}
                      className="px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      Select All States
                    </button>
                    <button
                      onClick={() => {
                        // Clear all
                        selectedLocations.forEach(id => toggleLocation(id));
                      }}
                      disabled={selectedLocations.length === 0}
                      className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Clear All
                    </button>
                  </div>
                </div>
                {/* State Grid - 2 columns for better space usage */}
                <div className="grid md:grid-cols-2 gap-3">
                {stateData
                  .filter(({ state }) => stateFilter.length === 0 || stateFilter.includes(state))
                  .map(({ state, count, selectedCount }) => {
                  const stateLocations = locations.filter(loc => loc.state === state);
                  const allSelected = stateLocations.every(loc => selectedLocations.includes(loc.id));
                  const someSelected = selectedCount > 0 && !allSelected;
                  
                  return (
                    <div
                      key={state}
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
                      className={`
                        p-4 rounded-lg border transition-all cursor-pointer
                        ${allSelected 
                          ? 'border-blue-500 bg-blue-50' 
                          : someSelected
                          ? 'border-blue-300 bg-blue-50/50'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <div className="min-w-0 flex-1">
                          <h3 className="font-medium text-gray-900 truncate">
                            {getStateName(state)}
                          </h3>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {count} {count === 1 ? 'city' : 'cities'}
                          </p>
                        </div>
                        <div className={`text-xs font-medium ml-2 ${
                          allSelected
                            ? 'text-blue-600'
                            : someSelected 
                            ? 'text-blue-600'
                            : 'text-gray-400'
                        }`}>
                          {allSelected ? '✓' : someSelected ? `${selectedCount}/${count}` : ''}
                        </div>
                      </div>
                    </div>
                  );
                })}
                </div>
              </div>
            ) : viewMode === 'regions' ? (
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
                  
                  // Skip regions with no monitored cities
                  if (regionLocations.length === 0) return null;
                  
                  return (
                    <div
                      key={region.name}
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
                      className={`
                        p-6 rounded-lg border transition-all cursor-pointer
                        ${allSelected 
                          ? 'border-blue-500 bg-blue-50' 
                          : someSelected
                          ? 'border-blue-300 bg-blue-50/50'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {region.name}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {/* Only show states we actually monitor */}
                            {region.states.filter(s => locations.some(loc => loc.state === s))
                              .map(s => getStateName(s)).join(', ')}
                          </p>
                          <p className="text-sm text-gray-500 mt-0.5">
                            {regionLocations.length} {regionLocations.length === 1 ? 'city' : 'cities'} • City Council, Planning Commission
                          </p>
                        </div>
                        <div className={`text-sm font-medium ${
                          allSelected
                            ? 'text-blue-600'
                            : someSelected 
                            ? 'text-blue-600'
                            : 'text-gray-500'
                        }`}>
                          {allSelected ? '✓ Selected' : someSelected ? `${selectedInRegion.length}/${regionLocations.length} selected` : 'Select all'}
                        </div>
                      </div>
                    </div>
                  );
                }).filter(Boolean)}
              </div>
            ) : (
              // Individual Cities View
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
                    <div
                      key={location.id}
                      onClick={() => toggleLocation(location.id)}
                      className={`
                        block p-4 rounded-lg cursor-pointer transition-all border
                        ${selectedLocations.includes(location.id)
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">
                            {location.name}, {location.state}
                          </h4>
                          <p className="text-xs text-gray-600 mt-0.5">
                            City Council, Planning Commission
                          </p>
                        </div>
                        <div className={`text-xs font-medium ${
                          selectedLocations.includes(location.id)
                            ? 'text-blue-600'
                            : 'text-gray-500'
                        }`}>
                          {selectedLocations.includes(location.id) ? '✓ Selected' : 'Select'}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right side - Live summary (1 col) */}
        <div className="lg:col-span-1">
          <div className="sticky top-6 space-y-6">
            {/* Selection Summary */}
            <div className="bg-white rounded-lg border border-gray-200 p-5">
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
                      <p className="text-2xl font-bold text-blue-600">{selectedLocations.length}</p>
                      <p className="text-xs text-gray-600">Cities</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">
                        {Object.keys(selectedLocationData.reduce((acc, loc) => {
                          acc[loc.state] = true;
                          return acc;
                        }, {} as Record<string, boolean>)).length}
                      </p>
                      <p className="text-xs text-gray-600">States</p>
                    </div>
                  </div>
                  
                  {/* Package Summary */}
                  <div className="space-y-2">
                    {/* Full states */}
                    {packageInfo.fullStates.length > 0 && (
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Complete States</p>
                        {packageInfo.fullStates.map(state => (
                          <div key={state} className="flex items-center justify-between p-2 bg-blue-50 rounded-md border border-blue-200">
                            <span className="text-sm font-medium text-gray-900">
                              {getStateName(state)} (Complete)
                            </span>
                            <span className="text-xs text-gray-500">
                              {stateData.find(s => s.state === state)?.count} cities
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* Complete regions */}
                    {packageInfo.regions.length > 0 && (
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Complete Regions</p>
                        {packageInfo.regions.map(region => (
                          <div key={region.name} className="flex items-center justify-between p-2 bg-purple-50 rounded-md border border-purple-200">
                            <span className="text-sm font-medium text-gray-900">
                              {region.name}
                            </span>
                            <span className="text-xs text-gray-500">
                              {region.total} cities
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* Partial states */}
                    {packageInfo.partialStates.length > 0 && (
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Partial Selections</p>
                        {packageInfo.partialStates.map(({ state, selected, total }) => (
                          <div key={state} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                            <span className="text-sm text-gray-700">
                              {getStateName(state)}
                            </span>
                            <span className="text-xs text-gray-500">
                              {selected} of {total}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* Individual cities (only show if not part of packages) */}
                    {viewMode === 'cities' && (
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Individual Cities</p>
                        <div className="max-h-[150px] overflow-y-auto space-y-1">
                          {selectedLocationData
                            .filter(loc => {
                              const stateInfo = stateData.find(s => s.state === loc.state);
                              return stateInfo && stateInfo.selectedCount < stateInfo.count;
                            })
                            .map(location => (
                              <div key={location.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                                <span className="text-sm text-gray-700">
                                  {location.name}, {location.state}
                                </span>
                                <button
                                  onClick={() => toggleLocation(location.id)}
                                  className="text-gray-400 hover:text-gray-600"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* What's included */}
            <div className="bg-white rounded-lg border border-gray-100 p-6">
              <h4 className="font-semibold text-gray-900 mb-3">What's included</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-xs">✓</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">City Council & Planning Commission</p>
                    <p className="text-gray-600 text-xs mt-0.5">Both bodies monitored for every city</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-xs">✓</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">All development topics</p>
                    <p className="text-gray-600 text-xs mt-0.5">Housing, commercial, industrial & more</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-xs">✓</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Instant activation</p>
                    <p className="text-gray-600 text-xs mt-0.5">Start receiving alerts within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Action Button */}
            <div className="pt-6">
              <button
                onClick={onNext}
                disabled={selectedLocations.length === 0}
                className={`w-full py-3.5 px-6 rounded-lg font-medium transition-all flex items-center justify-center ${
                  selectedLocations.length === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-[#002147] text-white hover:bg-[#003a6b]'
                }`}
              >
                Complete Setup
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};