import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, MapPin, ChevronDown, Check } from 'lucide-react';
import { locations } from '../../data/locations';
import { getStateName } from '../../utils/states';

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
  const [expandedStates, setExpandedStates] = useState<Set<string>>(new Set());
  const [expandedRegions, setExpandedRegions] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<'browse' | 'search'>('browse');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [regionDropdownOpen, setRegionDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const regionDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
      if (regionDropdownRef.current && !regionDropdownRef.current.contains(event.target as Node)) {
        setRegionDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Group locations by state and region
  const locationHierarchy = useMemo(() => {
    const hierarchy: Record<string, {
      name: string;
      regions: Record<string, {
        name: string;
        cities: typeof locations;
      }>;
      uncategorized: typeof locations;
      totalCount: number;
      selectedCount: number;
    }> = {};

    locations.forEach(location => {
      if (!hierarchy[location.state]) {
        hierarchy[location.state] = {
          name: getStateName(location.state),
          regions: {},
          uncategorized: [],
          totalCount: 0,
          selectedCount: 0
        };
      }

      hierarchy[location.state].totalCount++;
      if (selectedLocations.includes(location.id)) {
        hierarchy[location.state].selectedCount++;
      }

      if (location.region) {
        if (!hierarchy[location.state].regions[location.region]) {
          hierarchy[location.state].regions[location.region] = {
            name: location.region,
            cities: []
          };
        }
        hierarchy[location.state].regions[location.region].cities.push(location);
      } else {
        hierarchy[location.state].uncategorized.push(location);
      }
    });

    return hierarchy;
  }, [selectedLocations]);

  // Get all unique regions across all states
  const allRegions = useMemo(() => {
    const regions = new Map<string, { count: number; selectedCount: number; states: Set<string> }>();
    
    Object.entries(locationHierarchy).forEach(([stateCode, stateData]) => {
      Object.entries(stateData.regions).forEach(([regionName, regionData]) => {
        if (!regions.has(regionName)) {
          regions.set(regionName, { count: 0, selectedCount: 0, states: new Set() });
        }
        const regionInfo = regions.get(regionName)!;
        regionInfo.count += regionData.cities.length;
        regionInfo.selectedCount += regionData.cities.filter(city => 
          selectedLocations.includes(city.id)
        ).length;
        regionInfo.states.add(stateCode);
      });
    });
    
    return regions;
  }, [locationHierarchy, selectedLocations]);

  // Filter locations based on search
  const filteredLocations = useMemo(() => {
    if (!searchTerm) return [];
    const term = searchTerm.toLowerCase();
    return locations.filter(loc => 
      loc.name.toLowerCase().includes(term) ||
      loc.state.toLowerCase().includes(term) ||
      getStateName(loc.state).toLowerCase().includes(term) ||
      loc.region?.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  const toggleState = (stateCode: string) => {
    const newExpanded = new Set(expandedStates);
    if (newExpanded.has(stateCode)) {
      newExpanded.delete(stateCode);
      // Collapse all regions in this state
      const stateRegions = Object.keys(locationHierarchy[stateCode].regions);
      const newExpandedRegions = new Set(expandedRegions);
      stateRegions.forEach(region => newExpandedRegions.delete(`${stateCode}-${region}`));
      setExpandedRegions(newExpandedRegions);
    } else {
      newExpanded.add(stateCode);
    }
    setExpandedStates(newExpanded);
  };


  const selectAllInState = (stateCode: string) => {
    const stateCities = locations.filter(loc => loc.state === stateCode);
    const allSelected = stateCities.every(city => selectedLocations.includes(city.id));
    stateCities.forEach(city => {
      if (allSelected) {
        if (selectedLocations.includes(city.id)) {
          toggleLocation(city.id);
        }
      } else {
        if (!selectedLocations.includes(city.id)) {
          toggleLocation(city.id);
        }
      }
    });
  };

  // Calculate total governing bodies selected
  const totalBodiesSelected = selectedLocations.reduce((total, locId) => {
    const location = locations.find(loc => loc.id === locId);
    return total + (location?.governingBodies.length || 0);
  }, 0);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Enhanced Header with Topics */}
      <div className="mb-8 bg-gradient-to-r from-white to-blue-50 rounded-xl p-6 border border-blue-100">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Select Your Jurisdictions</h2>
              <p className="text-sm text-gray-600 mt-1">Choose regions, states, cities, or counties to monitor</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Monitoring Topics</p>
            <div className="flex gap-2 justify-end">
              <span className="px-3 py-1 bg-white rounded-full text-sm font-medium text-blue-700 border border-blue-200">Industrial</span>
              <span className="px-3 py-1 bg-white rounded-full text-sm font-medium text-blue-700 border border-blue-200">Housing</span>
              <span className="px-3 py-1 bg-white rounded-full text-sm font-medium text-blue-700 border border-blue-200">New Multifamily Housing</span>
              <span className="px-3 py-1 bg-white rounded-full text-sm font-medium text-blue-700 border border-blue-200">Impact Fees</span>
              <span className="px-3 py-1 bg-white rounded-full text-sm font-medium text-blue-700 border border-blue-200">Data Centers</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Left side - Selection area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Search and Filter Bar */}
          <div className="flex flex-wrap items-center gap-3 bg-gradient-to-r from-blue-50 to-white p-4 rounded-xl border border-blue-100">
            {/* Search Bar */}
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-500" />
              <input
                type="text"
                placeholder="Search jurisdictions..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setViewMode(e.target.value ? 'search' : 'browse');
                }}
                className="w-full pl-12 pr-4 py-2.5 bg-white border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
              />
            </div>

            {/* Region Filter Dropdown */}
            <div className="relative" ref={regionDropdownRef}>
              <button
                onClick={() => setRegionDropdownOpen(!regionDropdownOpen)}
                className="px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2 whitespace-nowrap font-medium transition-colors"
              >
                <span>Filter by Region</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${regionDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {regionDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-96 overflow-y-auto" style={{ minWidth: '250px', right: '0' }}>
                  <div className="p-2">
                    {Array.from(allRegions.entries())
                      .sort(([a], [b]) => a.localeCompare(b))
                      .map(([regionName, regionInfo]) => {
                        const isFullySelected = regionInfo.selectedCount === regionInfo.count && regionInfo.count > 0;
                        const isPartiallySelected = regionInfo.selectedCount > 0 && !isFullySelected;
                        
                        return (
                          <button
                            key={regionName}
                            onClick={() => {
                              // Select all cities in this region across all states
                              Object.values(locationHierarchy).forEach(stateData => {
                                if (stateData.regions[regionName]) {
                                  const regionCities = stateData.regions[regionName].cities;
                                  const allSelected = regionCities.every(city => selectedLocations.includes(city.id));
                                  regionCities.forEach(city => {
                                    if (allSelected) {
                                      if (selectedLocations.includes(city.id)) toggleLocation(city.id);
                                    } else {
                                      if (!selectedLocations.includes(city.id)) toggleLocation(city.id);
                                    }
                                  });
                                }
                              });
                            }}
                            className="w-full px-3 py-2 text-left hover:bg-gray-50 rounded flex items-center justify-between"
                          >
                            <span className="flex items-center gap-2">
                              <div className={`w-4 h-4 border rounded flex items-center justify-center ${
                                isFullySelected ? 'bg-blue-600 border-blue-600' : 
                                isPartiallySelected ? 'bg-blue-100 border-blue-600' : 
                                'border-gray-300'
                              }`}>
                                {isFullySelected && <Check className="w-3 h-3 text-white" />}
                                {isPartiallySelected && <div className="w-2 h-2 bg-blue-600 rounded-sm" />}
                              </div>
                              <span className="font-medium">{regionName}</span>
                            </span>
                            <span className="text-xs text-gray-500">
                              {regionInfo.count} jurisdictions
                            </span>
                          </button>
                        );
                      })}
                  </div>
                </div>
              )}
            </div>
            
            {/* State Multi-Select Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2 whitespace-nowrap font-medium transition-colors"
              >
                <span>Quick Select States</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {dropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-96 overflow-y-auto" style={{ minWidth: '500px', left: '0' }}>
                  <button
                    onClick={() => {
                      locations.forEach(loc => {
                        if (!selectedLocations.includes(loc.id)) {
                          toggleLocation(loc.id);
                        }
                      });
                      setDropdownOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-blue-50 text-blue-600 font-medium border-b"
                  >
                    Select All States
                  </button>
                  <div className="grid grid-cols-2 divide-x divide-gray-200">
                    {Object.entries(locationHierarchy)
                      .sort(([a], [b]) => getStateName(a).localeCompare(getStateName(b)))
                      .map(([stateCode, stateData]) => {
                        const isFullySelected = stateData.selectedCount === stateData.totalCount && stateData.totalCount > 0;
                        const isPartiallySelected = stateData.selectedCount > 0 && !isFullySelected;
                        
                        return (
                          <button
                            key={stateCode}
                            onClick={() => {
                              const stateCities = locations.filter(loc => loc.state === stateCode);
                              const allSelected = stateCities.every(city => selectedLocations.includes(city.id));
                              stateCities.forEach(city => {
                                if (allSelected) {
                                  if (selectedLocations.includes(city.id)) toggleLocation(city.id);
                                } else {
                                  if (!selectedLocations.includes(city.id)) toggleLocation(city.id);
                                }
                              });
                            }}
                            className="px-4 py-2 text-left hover:bg-gray-50 flex items-center justify-between"
                          >
                            <span className="flex items-center gap-2">
                              <div className={`w-4 h-4 border rounded flex items-center justify-center ${
                                isFullySelected ? 'bg-blue-600 border-blue-600' : 
                                isPartiallySelected ? 'bg-blue-100 border-blue-600' : 
                                'border-gray-300'
                              }`}>
                                {isFullySelected && <Check className="w-3 h-3 text-white" />}
                                {isPartiallySelected && <div className="w-2 h-2 bg-blue-600 rounded-sm" />}
                              </div>
                              <span className="truncate">{getStateName(stateCode)}</span>
                            </span>
                            <span className="text-xs text-gray-500 ml-2">
                              {stateData.selectedCount}/{stateData.totalCount}
                            </span>
                          </button>
                        );
                      })}
                  </div>
                </div>
              )}
            </div>
            
          </div>

          {/* Browse or Search Results */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 300px)' }}>
            {viewMode === 'search' && searchTerm ? (
              // Search Results
              <div className="p-4">
                {filteredLocations.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No jurisdictions found matching "{searchTerm}"</p>
                ) : (
                  <>
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-sm text-gray-600">
                        Found {filteredLocations.length} {filteredLocations.length === 1 ? 'jurisdiction' : 'jurisdictions'}
                      </p>
                      {filteredLocations.length > 1 && (
                        <button
                          onClick={() => {
                            const allSelected = filteredLocations.every(loc => selectedLocations.includes(loc.id));
                            filteredLocations.forEach(loc => {
                              if (allSelected) {
                                if (selectedLocations.includes(loc.id)) toggleLocation(loc.id);
                              } else {
                                if (!selectedLocations.includes(loc.id)) toggleLocation(loc.id);
                              }
                            });
                          }}
                          className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                            filteredLocations.every(loc => selectedLocations.includes(loc.id))
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {filteredLocations.every(loc => selectedLocations.includes(loc.id))
                            ? 'Deselect all'
                            : 'Select all results'}
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {filteredLocations.map(location => (
                        <label
                          key={location.id}
                          className="flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer border border-gray-100"
                        >
                          <input
                            type="checkbox"
                            checked={selectedLocations.includes(location.id)}
                            onChange={() => toggleLocation(location.id)}
                            className="w-4 h-4 text-blue-600 rounded"
                          />
                          <div className="ml-3 flex-1">
                            <div className="font-medium">{location.name}</div>
                            <div className="text-sm text-gray-500">
                              {getStateName(location.state)}
                              {location.region && ` • ${location.region}`}
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ) : (
              // Card Grid View with Smart Summary
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-4">
                {Object.entries(locationHierarchy)
                  .sort(([a], [b]) => getStateName(a).localeCompare(getStateName(b)))
                  .map(([stateCode, stateData]) => {
                    const allCities = [
                      ...Object.values(stateData.regions).flatMap(region => region.cities),
                      ...stateData.uncategorized
                    ];
                    
                    // Get top cities by region
                    const topCities = [];
                    const regionCounts: Record<string, number> = {};
                    
                    // Count cities by region
                    Object.entries(stateData.regions).forEach(([regionName, regionData]) => {
                      regionCounts[regionName] = regionData.cities.length;
                      // Take first city from each region for preview
                      if (regionData.cities.length > 0 && topCities.length < 3) {
                        topCities.push({ ...regionData.cities[0], regionName });
                      }
                    });
                    
                    // Add uncategorized if we need more
                    if (topCities.length < 3 && stateData.uncategorized.length > 0) {
                      topCities.push(...stateData.uncategorized.slice(0, 3 - topCities.length));
                    }
                    
                    const isExpanded = expandedStates.has(stateCode);
                    
                    return (
                      <div key={stateCode} className={`bg-white border rounded-lg transition-all ${
                        stateData.selectedCount > 0 ? 'border-blue-300 shadow-sm' : 'border-gray-200'
                      }`}>
                        {/* State Header */}
                        <div className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 text-lg">{stateData.name}</h3>
                              <div className="flex items-center gap-3 mt-1">
                                <span className={`text-2xl font-bold ${
                                  stateData.selectedCount > 0 ? 'text-blue-600' : 'text-gray-400'
                                }`}>
                                  {stateData.totalCount}
                                </span>
                                <span className="text-sm text-gray-500">
                                  jurisdictions
                                  {stateData.selectedCount > 0 && (
                                    <span className="text-blue-600 font-medium ml-1">
                                      ({stateData.selectedCount} selected)
                                    </span>
                                  )}
                                </span>
                              </div>
                            </div>
                            <button
                              onClick={() => selectAllInState(stateCode)}
                              className={`px-3 py-1.5 text-xs rounded-full font-medium transition-all ${
                                stateData.selectedCount === stateData.totalCount && stateData.totalCount > 0
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-white text-blue-600 border border-blue-600 hover:bg-blue-50'
                              }`}
                            >
                              {stateData.selectedCount === stateData.totalCount && stateData.totalCount > 0
                                ? '✓ All'
                                : 'Select All'}
                            </button>
                          </div>

                          {/* Region Summary */}
                          {Object.keys(stateData.regions).length > 0 && (
                            <div className="text-xs text-gray-500 mb-3">
                              {Object.entries(regionCounts).slice(0, 3).map(([region, count], idx) => (
                                <span key={region}>
                                  {idx > 0 && ' • '}
                                  {region} ({count})
                                </span>
                              ))}
                              {Object.keys(stateData.regions).length > 3 && (
                                <span> • +{Object.keys(stateData.regions).length - 3} more</span>
                              )}
                            </div>
                          )}

                          {/* Quick Selection Pills */}
                          {!isExpanded && (
                            <div className="flex flex-wrap gap-1.5 mb-3">
                              {topCities.slice(0, 3).map((city) => (
                                <button
                                  key={city.id}
                                  onClick={() => toggleLocation(city.id)}
                                  className={`px-2 py-1 text-xs rounded-full transition-all ${
                                    selectedLocations.includes(city.id)
                                      ? 'bg-blue-100 text-blue-700 border border-blue-300'
                                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                  }`}
                                >
                                  {city.name}
                                </button>
                              ))}
                              {allCities.length > 3 && (
                                <span className="text-xs text-gray-400 py-1">
                                  +{allCities.length - 3} more
                                </span>
                              )}
                            </div>
                          )}

                          {/* Expand/Collapse Button */}
                          <button
                            onClick={() => toggleState(stateCode)}
                            className="w-full py-2 text-sm text-blue-600 hover:text-blue-700 font-medium border-t flex items-center justify-center gap-1 -mx-4 -mb-4 mt-3 hover:bg-gray-50"
                          >
                            {isExpanded ? (
                              <>Hide Details <ChevronDown className="w-4 h-4 rotate-180" /></>
                            ) : (
                              <>View All Jurisdictions <ChevronDown className="w-4 h-4" /></>
                            )}
                          </button>
                        </div>

                        {/* Expanded Cities List */}
                        {isExpanded && (
                          <div className="border-t px-4 py-3 bg-gray-50 max-h-64 overflow-y-auto">
                            <div className="space-y-1">
                              {allCities.map(location => (
                                <label
                                  key={location.id}
                                  className="flex items-center gap-2 p-1.5 hover:bg-white rounded cursor-pointer"
                                >
                                  <input
                                    type="checkbox"
                                    checked={selectedLocations.includes(location.id)}
                                    onChange={() => toggleLocation(location.id)}
                                    className="w-4 h-4 text-blue-600 rounded"
                                  />
                                  <span className="text-sm text-gray-700">
                                    {location.name}
                                    {location.region && (
                                      <span className="text-gray-400 text-xs ml-1">• {location.region}</span>
                                    )}
                                  </span>
                                </label>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        </div>

        {/* Right side - Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-4 space-y-6">
            {/* Simple Selection Summary */}
            {selectedLocations.length > 0 && (
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-bold text-gray-900">{selectedLocations.length}</span>
                  <span className="text-sm text-gray-600">
                    {selectedLocations.length === 1 ? 'jurisdiction selected' : 'jurisdictions selected'}
                  </span>
                </div>
                <div className="text-sm text-gray-500 mb-3">
                  {totalBodiesSelected} total governing bodies
                </div>
                {selectedLocations.length > 10 && (
                  <button
                    onClick={() => {
                      // Clear all selections
                      selectedLocations.forEach(locId => toggleLocation(locId));
                    }}
                    className="w-full text-xs text-red-600 hover:text-red-700 py-2 border-t"
                  >
                    Clear all selections
                  </button>
                )}
              </div>
            )}

            {/* Continue Button */}
            <button
              onClick={onNext}
              disabled={selectedLocations.length === 0}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
                selectedLocations.length > 0
                  ? 'bg-[#002147] text-white hover:bg-[#003a6b]'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              {selectedLocations.length > 0 
                ? `Start 30-Day Free Trial with ${selectedLocations.length} ${selectedLocations.length === 1 ? 'Jurisdiction' : 'Jurisdictions'}`
                : 'Select at least one jurisdiction'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};