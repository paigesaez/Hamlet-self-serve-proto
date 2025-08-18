import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, MapPin, Check, X } from 'lucide-react';
import { locations } from '../../data/locations';
import { getStateName } from '../../utils/states';
import { DropdownButton } from '../ui/DropdownButton';
import { JurisdictionCard } from '../ui/JurisdictionCard';

interface JurisdictionSelectionProps {
  selectedLocations: number[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  toggleLocation: (locationId: number) => void;
  onNext: () => void;
}

// Define top 10 US regions with their states and key cities
const TOP_REGIONS = [
  { 
    id: 'bay-area',
    name: 'San Francisco Bay Area', 
    states: ['CA'],
    description: 'Includes SF, Oakland, San Jose, Berkeley'
  },
  { 
    id: 'socal',
    name: 'Southern California', 
    states: ['CA'],
    description: 'Includes LA, San Diego, Long Beach, Irvine'
  },
  { 
    id: 'nyc-metro',
    name: 'NYC Metro Area', 
    states: ['NY', 'NJ', 'CT'],
    description: 'Includes NYC, Newark, Jersey City'
  },
  { 
    id: 'dc-metro',
    name: 'Washington DC Metro', 
    states: ['DC', 'VA', 'MD'],
    description: 'Includes Arlington, Alexandria, Montgomery Co'
  },
  { 
    id: 'chicago-metro',
    name: 'Chicago Metro', 
    states: ['IL'],
    description: 'Includes Chicago, Aurora, Naperville'
  },
  { 
    id: 'dfw',
    name: 'Dallas-Fort Worth', 
    states: ['TX'],
    description: 'Includes Dallas, Fort Worth, Arlington, Plano'
  },
  { 
    id: 'houston-metro',
    name: 'Greater Houston', 
    states: ['TX'],
    description: 'Includes Houston'
  },
  { 
    id: 'miami-metro',
    name: 'South Florida', 
    states: ['FL'],
    description: 'Includes Miami, Fort Lauderdale'
  },
  { 
    id: 'seattle-metro',
    name: 'Seattle Metro', 
    states: ['WA'],
    description: 'Includes Seattle, Bellevue, Tacoma'
  },
  { 
    id: 'phoenix-metro',
    name: 'Phoenix Metro', 
    states: ['AZ'],
    description: 'Includes Phoenix, Scottsdale, Mesa'
  }
];

export const JurisdictionSelectionV2: React.FC<JurisdictionSelectionProps> = ({
  selectedLocations,
  searchTerm,
  setSearchTerm,
  toggleLocation,
  onNext
}) => {
  const [stateDropdownOpen, setStateDropdownOpen] = useState(false);
  const [regionDropdownOpen, setRegionDropdownOpen] = useState(false);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const stateDropdownRef = useRef<HTMLDivElement>(null);
  const regionDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (stateDropdownRef.current && !stateDropdownRef.current.contains(event.target as Node)) {
        setStateDropdownOpen(false);
      }
      if (regionDropdownRef.current && !regionDropdownRef.current.contains(event.target as Node)) {
        setRegionDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Group locations by state
  const locationsByState = useMemo(() => {
    const grouped: Record<string, typeof locations> = {};
    locations.forEach(location => {
      if (!grouped[location.state]) {
        grouped[location.state] = [];
      }
      grouped[location.state].push(location);
    });
    return grouped;
  }, []);

  // Get locations for a region
  const getRegionLocations = (regionId: string) => {
    const region = TOP_REGIONS.find(r => r.id === regionId);
    if (!region) return [];
    
    return locations.filter(loc => {
      // Map regions based on city names or actual region field
      if (regionId === 'bay-area') {
        return loc.state === 'CA' && (
          loc.region === 'Bay Area' ||
          ['San Francisco', 'Oakland', 'San Jose', 'Berkeley'].includes(loc.name)
        );
      }
      if (regionId === 'socal') {
        return loc.state === 'CA' && (
          loc.region?.includes('SoCal') ||
          ['Los Angeles', 'San Diego', 'Long Beach', 'Anaheim', 'Santa Monica', 'Irvine'].includes(loc.name)
        );
      }
      if (regionId === 'nyc-metro') {
        return (loc.state === 'NY' && loc.name === 'New York City') ||
               (loc.state === 'NJ' && ['Newark', 'Jersey City'].includes(loc.name));
      }
      if (regionId === 'dc-metro') {
        return (loc.state === 'VA' && ['Arlington', 'Alexandria'].includes(loc.name)) ||
               (loc.state === 'MD' && ['Montgomery County'].includes(loc.name));
      }
      if (regionId === 'chicago-metro') {
        return loc.state === 'IL' && ['Chicago', 'Aurora', 'Naperville'].includes(loc.name);
      }
      if (regionId === 'dfw') {
        return loc.state === 'TX' && ['Dallas', 'Fort Worth', 'Arlington', 'Plano'].includes(loc.name);
      }
      if (regionId === 'houston-metro') {
        return loc.state === 'TX' && ['Houston'].includes(loc.name);
      }
      if (regionId === 'miami-metro') {
        return loc.state === 'FL' && ['Miami', 'Fort Lauderdale'].includes(loc.name);
      }
      if (regionId === 'seattle-metro') {
        return loc.state === 'WA' && ['Seattle', 'Bellevue', 'Tacoma'].includes(loc.name);
      }
      if (regionId === 'phoenix-metro') {
        return loc.state === 'AZ' && ['Phoenix', 'Scottsdale', 'Mesa'].includes(loc.name);
      }
      return false;
    });
  };

  // Search functionality
  const searchResults = useMemo(() => {
    if (!searchTerm || searchTerm.length < 2) return [];
    const term = searchTerm.toLowerCase();
    return locations.filter(loc => 
      loc.name.toLowerCase().includes(term) ||
      getStateName(loc.state).toLowerCase().includes(term) ||
      loc.state.toLowerCase().includes(term) ||
      loc.region?.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  // Calculate stats
  const stats = useMemo(() => {
    const totalBodies = selectedLocations.reduce((sum, locId) => {
      const location = locations.find(l => l.id === locId);
      return sum + (location?.governingBodies.length || 0);
    }, 0);
    return {
      jurisdictions: selectedLocations.length,
      governingBodies: totalBodies
    };
  }, [selectedLocations]);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header with Topics */}
      <div className="mb-4 bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Select Your Jurisdictions</h2>
              <p className="text-xs text-gray-600">Choose regions, states, or specific jurisdictions to monitor</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Monitoring Topics</p>
            <div className="flex gap-1 justify-end">
              <span className="px-2 py-0.5 bg-blue-50 rounded text-xs font-medium text-blue-700">Industrial</span>
              <span className="px-2 py-0.5 bg-blue-50 rounded text-xs font-medium text-blue-700">Housing</span>
              <span className="px-2 py-0.5 bg-blue-50 rounded text-xs font-medium text-blue-700">Multifamily</span>
              <span className="px-2 py-0.5 bg-blue-50 rounded text-xs font-medium text-blue-700">Impact Fees</span>
              <span className="px-2 py-0.5 bg-blue-50 rounded text-xs font-medium text-blue-700">Data Centers</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-4">
        {/* Main Content Area */}
        <div className="lg:col-span-3 space-y-4">
          {/* Search and Filter Bar */}
          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
            {/* Selection Count and Clear */}
            {selectedLocations.length > 0 && (
              <div className="flex items-center justify-between mb-3 pb-3 border-b">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">
                    <strong className="text-lg text-blue-600">{selectedLocations.length}</strong> jurisdictions selected
                  </span>
                  <span className="text-sm text-gray-500">
                    ({stats.governingBodies} governing bodies)
                  </span>
                </div>
                <button
                  onClick={() => {
                    selectedLocations.forEach(id => toggleLocation(id));
                  }}
                  className="px-3 py-1 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1"
                >
                  <X className="w-4 h-4" />
                  Clear all
                </button>
              </div>
            )}
            
            <div className="flex flex-wrap gap-3">
              {/* Search */}
              <div className="flex-1 min-w-[300px] relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by state, region, city, or county..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                  }}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Region Multi-Select */}
              <div className="relative" ref={regionDropdownRef}>
                <DropdownButton
                  label="Select by Region"
                  isOpen={regionDropdownOpen}
                  onClick={() => setRegionDropdownOpen(!regionDropdownOpen)}
                  variant="purple"
                />

                {regionDropdownOpen && (
                  <div className="absolute z-10 mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto">
                    <div className="p-2 space-y-1">
                      {TOP_REGIONS.map(region => {
                        const regionLocs = getRegionLocations(region.id);
                        const selectedCount = regionLocs.filter(l => selectedLocations.includes(l.id)).length;
                        const isFullySelected = selectedCount === regionLocs.length && regionLocs.length > 0;
                        const isPartiallySelected = selectedCount > 0 && !isFullySelected;

                        return (
                          <button
                            key={region.id}
                            onClick={() => {
                              // Toggle region selection
                              if (selectedRegions.includes(region.id)) {
                                setSelectedRegions(selectedRegions.filter(r => r !== region.id));
                                // Deselect all locations in this region
                                regionLocs.forEach(loc => {
                                  if (selectedLocations.includes(loc.id)) {
                                    toggleLocation(loc.id);
                                  }
                                });
                              } else {
                                setSelectedRegions([...selectedRegions, region.id]);
                                // Select all locations in this region
                                regionLocs.forEach(loc => {
                                  if (!selectedLocations.includes(loc.id)) {
                                    toggleLocation(loc.id);
                                  }
                                });
                              }
                            }}
                            className="w-full flex items-center justify-between p-2 hover:bg-gray-50 rounded text-left"
                          >
                            <span className="flex items-center gap-2">
                              <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                                isFullySelected ? 'bg-purple-600 border-purple-600' :
                                isPartiallySelected ? 'bg-purple-100 border-purple-600' :
                                'border-gray-300'
                              }`}>
                                {isFullySelected && <Check className="w-3 h-3 text-white" />}
                                {isPartiallySelected && <div className="w-2 h-2 bg-purple-600 rounded-sm" />}
                              </div>
                              <div>
                                <div className="text-base font-medium">{region.name}</div>
                                <div className="text-sm text-gray-500">
                                  {region.description} • {regionLocs.length} total
                                </div>
                              </div>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* State Multi-Select */}
              <div className="relative" ref={stateDropdownRef}>
                <DropdownButton
                  label="Select by State"
                  isOpen={stateDropdownOpen}
                  onClick={() => setStateDropdownOpen(!stateDropdownOpen)}
                  variant="blue"
                />

                {stateDropdownOpen && (
                  <div className="absolute z-10 mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto">
                    <div className="p-2 grid grid-cols-2 gap-1">
                      {Object.entries(locationsByState)
                        .sort(([a], [b]) => getStateName(a).localeCompare(getStateName(b)))
                        .map(([state, locs]) => {
                          const selectedCount = locs.filter(l => selectedLocations.includes(l.id)).length;
                          const isFullySelected = selectedCount === locs.length;
                          const isPartiallySelected = selectedCount > 0 && !isFullySelected;

                          return (
                            <button
                              key={state}
                              onClick={() => {
                                // Toggle state selection
                                if (selectedStates.includes(state)) {
                                  setSelectedStates(selectedStates.filter(s => s !== state));
                                  // Deselect all locations in this state
                                  locs.forEach(loc => {
                                    if (selectedLocations.includes(loc.id)) {
                                      toggleLocation(loc.id);
                                    }
                                  });
                                } else {
                                  setSelectedStates([...selectedStates, state]);
                                  // Select all locations in this state
                                  locs.forEach(loc => {
                                    if (!selectedLocations.includes(loc.id)) {
                                      toggleLocation(loc.id);
                                    }
                                  });
                                }
                              }}
                              className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
                            >
                              <span className="flex items-center gap-2">
                                <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                                  isFullySelected ? 'bg-blue-600 border-blue-600' :
                                  isPartiallySelected ? 'bg-blue-100 border-blue-600' :
                                  'border-gray-300'
                                }`}>
                                  {isFullySelected && <Check className="w-3 h-3 text-white" />}
                                  {isPartiallySelected && <div className="w-2 h-2 bg-blue-600 rounded-sm" />}
                                </div>
                                <span className="text-base font-medium">{getStateName(state)}</span>
                              </span>
                              <span className="text-sm text-gray-500">{locs.length}</span>
                            </button>
                          );
                        })}
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* Content Area */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
            {/* Show selected jurisdictions if any regions/states are selected */}
            {(selectedRegions.length > 0 || selectedStates.length > 0) ? (
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">
                  Selected Jurisdictions
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                  {locations.filter(loc => {
                    // Show locations that match selected regions or states
                    const inSelectedRegion = selectedRegions.some(regionId => {
                      const regionLocs = getRegionLocations(regionId);
                      return regionLocs.some(rl => rl.id === loc.id);
                    });
                    const inSelectedState = selectedStates.includes(loc.state);
                    return inSelectedRegion || inSelectedState;
                  }).map(location => (
                    <JurisdictionCard
                      key={location.id}
                      location={location}
                      isSelected={selectedLocations.includes(location.id)}
                      onClick={() => toggleLocation(location.id)}
                    />
                  ))}
                </div>
              </div>
            ) : (
            /* Search Results */
            searchTerm ? (
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">
                  Search Results ({searchResults.length})
                </h3>
                {searchResults.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No jurisdictions found matching "{searchTerm}"</p>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {searchResults.map(location => (
                      <JurisdictionCard
                        key={location.id}
                        location={location}
                        isSelected={selectedLocations.includes(location.id)}
                        onClick={() => toggleLocation(location.id)}
                        showCheck={false}
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">
                  Top US Regions
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {TOP_REGIONS.map(region => {
                    const regionLocs = getRegionLocations(region.id);
                    const selectedCount = regionLocs.filter(l => selectedLocations.includes(l.id)).length;
                    const isPartiallySelected = selectedCount > 0 && selectedCount < regionLocs.length;
                    const isFullySelected = selectedCount === regionLocs.length && regionLocs.length > 0;

                    return (
                      <div
                        key={region.id}
                        className={`border rounded-lg p-3 transition-all ${
                          isFullySelected ? 'border-blue-500 bg-blue-50' :
                          isPartiallySelected ? 'border-blue-300 bg-blue-50/50' :
                          'border-gray-200 bg-white'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-base text-gray-900">{region.name}</h4>
                            <p className="text-xs text-gray-500 mt-0.5">{region.description}</p>
                          </div>
                          <button
                            onClick={() => {
                              if (isFullySelected) {
                                regionLocs.forEach(loc => {
                                  if (selectedLocations.includes(loc.id)) {
                                    toggleLocation(loc.id);
                                  }
                                });
                              } else {
                                regionLocs.forEach(loc => {
                                  if (!selectedLocations.includes(loc.id)) {
                                    toggleLocation(loc.id);
                                  }
                                });
                              }
                            }}
                            className={`px-2.5 py-1 text-xs rounded-full font-medium ${
                              isFullySelected 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-white text-blue-600 border border-blue-600 hover:bg-blue-50'
                            }`}
                          >
                            {isFullySelected ? '✓ Selected' : 'Select All'}
                          </button>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-gray-600">
                            <span className="font-semibold text-gray-900">{regionLocs.length}</span> jurisdictions
                          </span>
                          {selectedCount > 0 && (
                            <span className="text-blue-600 font-medium">
                              {selectedCount} selected
                            </span>
                          )}
                        </div>

                        {/* Quick selection for individual cities */}
                        <div className="mt-2 flex flex-wrap gap-1">
                          {regionLocs.slice(0, 5).map(loc => (
                            <button
                              key={loc.id}
                              onClick={() => toggleLocation(loc.id)}
                              className={`px-2 py-0.5 text-xs rounded-full ${
                                selectedLocations.includes(loc.id)
                                  ? 'bg-blue-100 text-blue-700'
                                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              }`}
                            >
                              {loc.name}
                            </button>
                          ))}
                          {regionLocs.length > 5 && (
                            <span className="px-2 py-0.5 text-xs text-gray-400">
                              +{regionLocs.length - 5} more
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Other Regions Link */}
                <div className="mt-4 p-3 bg-gray-50 rounded-lg text-center">
                  <p className="text-xs text-gray-600">
                    Looking for other regions? Use the search bar above or select by state
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar - Simple Action */}
        <div className="lg:col-span-1">
          <div className="sticky top-4 space-y-4">
            {/* Primary Action */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
              <div className="text-center mb-3">
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  {stats.jurisdictions}
                </div>
                <div className="text-sm text-gray-500">
                  jurisdictions selected
                </div>
                <div className="text-sm text-gray-400 mt-1">
                  {stats.governingBodies} governing bodies
                </div>
              </div>

              {/* Subscribe Button */}
              <button
                onClick={onNext}
                disabled={selectedLocations.length === 0}
                className={`w-full py-2.5 px-4 rounded-lg font-medium transition-all ${
                  selectedLocations.length > 0
                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                {selectedLocations.length > 0 
                  ? `Start Free Trial with ${selectedLocations.length} ${selectedLocations.length === 1 ? 'jurisdiction' : 'jurisdictions'}`
                  : 'Select jurisdictions to continue'
                }
              </button>
            </div>

            {/* Quick Tips */}
            <div className="bg-gray-50 rounded-lg p-3">
              <h4 className="text-xs font-semibold text-gray-700 mb-1.5">Quick Tips</h4>
              <ul className="text-xs text-gray-600 space-y-0.5">
                <li>• Use region filter for metro areas</li>
                <li>• Select entire states at once</li>
                <li>• Search for specific cities</li>
                <li>• Click region cards below to browse</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};