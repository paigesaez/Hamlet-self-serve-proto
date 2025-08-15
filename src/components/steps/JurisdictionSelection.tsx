import React, { useState, useMemo } from 'react';
import { Search, MapPin, ChevronRight, ChevronDown, Building2 } from 'lucide-react';
import { locations } from '../../data/locations';
import { StepHeader } from '../shared/StepHeader';
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

  // Filter locations based on search
  const filteredLocations = useMemo(() => {
    if (!searchTerm) return [];
    const term = searchTerm.toLowerCase();
    return locations.filter(loc => 
      loc.name.toLowerCase().includes(term) ||
      loc.state.toLowerCase().includes(term) ||
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

  const toggleRegion = (stateCode: string, regionName: string) => {
    const key = `${stateCode}-${regionName}`;
    const newExpanded = new Set(expandedRegions);
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    setExpandedRegions(newExpanded);
  };

  const selectAllInRegion = (cities: typeof locations) => {
    const allSelected = cities.every(city => selectedLocations.includes(city.id));
    cities.forEach(city => {
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
    <div className="max-w-6xl mx-auto">
      <StepHeader 
        icon={MapPin} 
        title="Select Your Jurisdictions" 
        subtitle="Choose regions, states, or specific cities to monitor"
      />

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left side - Selection area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search cities, regions, or states..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setViewMode(e.target.value ? 'search' : 'browse');
              }}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Browse or Search Results */}
          <div className="bg-white rounded-lg border border-gray-200 max-h-[600px] overflow-y-auto">
            {viewMode === 'search' && searchTerm ? (
              // Search Results
              <div className="p-4 space-y-2">
                {filteredLocations.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No cities found matching "{searchTerm}"</p>
                ) : (
                  <>
                    <p className="text-sm text-gray-600 mb-3">
                      Found {filteredLocations.length} {filteredLocations.length === 1 ? 'city' : 'cities'}
                    </p>
                    {filteredLocations.map(location => (
                      <label
                        key={location.id}
                        className="flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedLocations.includes(location.id)}
                          onChange={() => toggleLocation(location.id)}
                          className="w-4 h-4 text-blue-600 rounded"
                        />
                        <div className="ml-3 flex-1">
                          <div className="font-medium">{location.name}, {getStateName(location.state)}</div>
                          <div className="text-sm text-gray-500">
                            {location.region && `${location.region} • `}
                            {location.governingBodies.length} governing {location.governingBodies.length === 1 ? 'body' : 'bodies'}
                          </div>
                        </div>
                      </label>
                    ))}
                  </>
                )}
              </div>
            ) : (
              // Hierarchical Browse View
              <div className="divide-y divide-gray-200">
                {Object.entries(locationHierarchy)
                  .sort(([a], [b]) => getStateName(a).localeCompare(getStateName(b)))
                  .map(([stateCode, stateData]) => (
                    <div key={stateCode}>
                      {/* State Header */}
                      <div className="p-4 hover:bg-gray-50">
                        <div className="flex items-center justify-between">
                          <button
                            onClick={() => toggleState(stateCode)}
                            className="flex-1 flex items-center gap-3 text-left"
                          >
                            {expandedStates.has(stateCode) ? (
                              <ChevronDown className="w-5 h-5 text-gray-400" />
                            ) : (
                              <ChevronRight className="w-5 h-5 text-gray-400" />
                            )}
                            <div className="flex-1">
                              <div className="font-semibold text-gray-900">
                                {stateData.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {stateData.selectedCount}/{stateData.totalCount} cities selected
                              </div>
                            </div>
                          </button>
                          <button
                            onClick={() => selectAllInState(stateCode)}
                            className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                              stateData.selectedCount === stateData.totalCount && stateData.totalCount > 0
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {stateData.selectedCount === stateData.totalCount && stateData.totalCount > 0
                              ? 'Selected'
                              : 'Select all'}
                          </button>
                        </div>
                      </div>

                      {/* Expanded State Content */}
                      {expandedStates.has(stateCode) && (
                        <div className="bg-gray-50 border-t border-gray-200">
                          {/* Regions */}
                          {Object.entries(stateData.regions).map(([regionName, regionData]) => {
                            const regionKey = `${stateCode}-${regionName}`;
                            const allSelected = regionData.cities.every(city => 
                              selectedLocations.includes(city.id)
                            );
                            const someSelected = regionData.cities.some(city => 
                              selectedLocations.includes(city.id)
                            ) && !allSelected;

                            return (
                              <div key={regionKey} className="border-b border-gray-200 last:border-b-0">
                                {/* Region Header */}
                                <div className="px-8 py-3 hover:bg-gray-100">
                                  <div className="flex items-center justify-between">
                                    <button
                                      onClick={() => toggleRegion(stateCode, regionName)}
                                      className="flex-1 flex items-center gap-2 text-left"
                                    >
                                      {expandedRegions.has(regionKey) ? (
                                        <ChevronDown className="w-4 h-4 text-gray-400" />
                                      ) : (
                                        <ChevronRight className="w-4 h-4 text-gray-400" />
                                      )}
                                      <div className="flex-1">
                                        <div className="font-medium text-gray-800">
                                          {regionName}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                          {regionData.cities.length} {regionData.cities.length === 1 ? 'city' : 'cities'}
                                        </div>
                                      </div>
                                    </button>
                                    <button
                                      onClick={() => selectAllInRegion(regionData.cities)}
                                      className={`px-2 py-1 text-xs rounded transition-colors ${
                                        allSelected
                                          ? 'bg-blue-100 text-blue-700'
                                          : someSelected
                                          ? 'bg-blue-50 text-blue-600'
                                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                      }`}
                                    >
                                      {allSelected ? '✓ All' : someSelected ? 'Some' : 'Select'}
                                    </button>
                                  </div>
                                </div>

                                {/* Cities in Region */}
                                {expandedRegions.has(regionKey) && (
                                  <div className="px-12 py-2 space-y-1 bg-white">
                                    {regionData.cities.map(city => (
                                      <label
                                        key={city.id}
                                        className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer"
                                      >
                                        <input
                                          type="checkbox"
                                          checked={selectedLocations.includes(city.id)}
                                          onChange={() => toggleLocation(city.id)}
                                          className="w-4 h-4 text-blue-600 rounded"
                                        />
                                        <div className="ml-3">
                                          <div className="text-sm font-medium">{city.name}</div>
                                          <div className="text-xs text-gray-500">
                                            {city.governingBodies.join(', ')}
                                          </div>
                                        </div>
                                      </label>
                                    ))}
                                  </div>
                                )}
                              </div>
                            );
                          })}

                          {/* Uncategorized cities */}
                          {stateData.uncategorized.length > 0 && (
                            <div className="px-12 py-2 space-y-1 bg-white">
                              {stateData.uncategorized.map(city => (
                                <label
                                  key={city.id}
                                  className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer"
                                >
                                  <input
                                    type="checkbox"
                                    checked={selectedLocations.includes(city.id)}
                                    onChange={() => toggleLocation(city.id)}
                                    className="w-4 h-4 text-blue-600 rounded"
                                  />
                                  <div className="ml-3">
                                    <div className="text-sm font-medium">{city.name}</div>
                                    <div className="text-xs text-gray-500">
                                      {city.governingBodies.join(', ')}
                                    </div>
                                  </div>
                                </label>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
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
                    {selectedLocations.length === 1 ? 'city selected' : 'cities selected'}
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

            {/* What's Included */}
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Building2 className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-900">All Topics Included</p>
                  <p className="text-sm text-blue-700 mt-1">
                    Monitor all relevant agenda items and discussions in your selected jurisdictions
                  </p>
                </div>
              </div>
            </div>

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
                ? `Subscribe to ${selectedLocations.length} ${selectedLocations.length === 1 ? 'City' : 'Cities'}`
                : 'Select at least one city'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};