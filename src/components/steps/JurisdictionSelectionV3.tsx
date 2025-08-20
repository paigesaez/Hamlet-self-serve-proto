import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, MapPin, ChevronDown, Check, X, Building2, ArrowRight } from 'lucide-react';
import { locations } from '../../data/locations';
import { getStateName } from '../../utils/states';

interface JurisdictionSelectionProps {
  selectedLocations: number[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  toggleLocation: (locationId: number) => void;
  onNext: () => void;
}

// Define top 10 US regions
const TOP_REGIONS = [
  { id: 'bay-area', name: 'Bay Area', states: ['CA'], key: ['San Francisco', 'Oakland', 'San Jose'] },
  { id: 'socal', name: 'Southern California', states: ['CA'], key: ['Los Angeles', 'San Diego'] },
  { id: 'nyc-metro', name: 'NYC Metro', states: ['NY', 'NJ'], key: ['New York City', 'Newark'] },
  { id: 'dc-metro', name: 'Washington DC', states: ['DC', 'VA', 'MD'], key: ['Arlington', 'Alexandria'] },
  { id: 'chicago', name: 'Chicago Metro', states: ['IL'], key: ['Chicago', 'Aurora'] },
  { id: 'dfw', name: 'Dallas-Fort Worth', states: ['TX'], key: ['Dallas', 'Fort Worth'] },
  { id: 'houston', name: 'Greater Houston', states: ['TX'], key: ['Houston'] },
  { id: 'miami', name: 'South Florida', states: ['FL'], key: ['Miami', 'Fort Lauderdale'] },
  { id: 'seattle', name: 'Seattle Metro', states: ['WA'], key: ['Seattle', 'Bellevue'] },
  { id: 'phoenix', name: 'Phoenix Metro', states: ['AZ'], key: ['Phoenix', 'Scottsdale'] }
];

export const JurisdictionSelectionV3: React.FC<JurisdictionSelectionProps> = ({
  selectedLocations,
  searchTerm,
  setSearchTerm,
  toggleLocation,
  onNext
}) => {
  const [stateDropdownOpen, setStateDropdownOpen] = useState(false);
  const [regionDropdownOpen, setRegionDropdownOpen] = useState(false);
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
  const getRegionLocations = (region: typeof TOP_REGIONS[0]) => {
    return locations.filter(loc => 
      region.states.includes(loc.state) && 
      region.key.some(city => loc.name === city)
    );
  };

  // Search results
  const searchResults = useMemo(() => {
    if (!searchTerm || searchTerm.length < 2) return [];
    const term = searchTerm.toLowerCase();
    return locations.filter(loc => 
      loc.name.toLowerCase().includes(term) ||
      getStateName(loc.state).toLowerCase().includes(term) ||
      loc.region?.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  // Calculate stats
  const totalBodies = selectedLocations.reduce((sum, locId) => {
    const location = locations.find(l => l.id === locId);
    return sum + (location?.governingBodies.length || 0);
  }, 0);

  const canContinue = selectedLocations.length > 0;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content */}
      <div className="flex-1 px-6 lg:px-12 xl:px-20 pt-8 pb-32">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl mb-4">
              <MapPin className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">
              Select Your Jurisdictions
            </h1>
            <p className="text-gray-600">
              Choose the cities, counties, and regions you want to monitor
            </p>
          </div>

          {/* Topics Bar */}
          <div className="bg-blue-50 rounded-xl p-4 mb-8 border border-blue-100">
            <div className="flex items-center justify-center gap-3">
              <Building2 className="w-5 h-5 text-blue-600" />
              <div className="flex items-center gap-2 text-sm">
                <span className="text-blue-900 font-medium">Monitoring topics:</span>
                <div className="flex gap-2">
                  <span className="px-2 py-0.5 bg-white rounded text-xs font-medium text-blue-700">Industrial</span>
                  <span className="px-2 py-0.5 bg-white rounded text-xs font-medium text-blue-700">Housing</span>
                  <span className="px-2 py-0.5 bg-white rounded text-xs font-medium text-blue-700">New Multifamily Housing</span>
                  <span className="px-2 py-0.5 bg-white rounded text-xs font-medium text-blue-700">Impact Fees</span>
                  <span className="px-2 py-0.5 bg-white rounded text-xs font-medium text-blue-700">Data Centers</span>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            {/* Selection Status */}
            {selectedLocations.length > 0 && (
              <div className="flex items-center justify-between mb-4 pb-4 border-b">
                <div>
                  <span className="text-2xl font-bold text-[#002147]">{selectedLocations.length}</span>
                  <span className="text-gray-600 ml-2">jurisdictions selected</span>
                  <span className="text-sm text-gray-500 ml-3">({totalBodies} governing bodies)</span>
                </div>
                <button
                  onClick={() => selectedLocations.forEach(id => toggleLocation(id))}
                  className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center gap-1"
                >
                  <X className="w-4 h-4" />
                  Clear all
                </button>
              </div>
            )}

            {/* Search Bar */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search cities, counties, states, or regions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-3">
              {/* Region Dropdown */}
              <div className="relative" ref={regionDropdownRef}>
                <button
                  onClick={() => setRegionDropdownOpen(!regionDropdownOpen)}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 font-medium text-gray-700"
                >
                  <MapPin className="w-4 h-4" />
                  Select by Region
                  <ChevronDown className={`w-4 h-4 transition-transform ${regionDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {regionDropdownOpen && (
                  <div className="absolute z-10 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200">
                    <div className="p-2">
                      {TOP_REGIONS.map(region => {
                        const regionLocs = getRegionLocations(region);
                        const selectedCount = regionLocs.filter(l => selectedLocations.includes(l.id)).length;
                        const isFullySelected = selectedCount === regionLocs.length && regionLocs.length > 0;

                        return (
                          <button
                            key={region.id}
                            onClick={() => {
                              if (isFullySelected) {
                                regionLocs.forEach(loc => {
                                  if (selectedLocations.includes(loc.id)) toggleLocation(loc.id);
                                });
                              } else {
                                regionLocs.forEach(loc => {
                                  if (!selectedLocations.includes(loc.id)) toggleLocation(loc.id);
                                });
                              }
                            }}
                            className="w-full flex items-center justify-between p-2 hover:bg-gray-50 rounded"
                          >
                            <span className="flex items-center gap-2">
                              <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                                isFullySelected ? 'bg-[#002147] border-[#002147]' : 'border-gray-300'
                              }`}>
                                {isFullySelected && <Check className="w-3 h-3 text-white" />}
                              </div>
                              <span className="text-sm">{region.name}</span>
                            </span>
                            <span className="text-xs text-gray-500">{regionLocs.length} locations</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* State Dropdown */}
              <div className="relative" ref={stateDropdownRef}>
                <button
                  onClick={() => setStateDropdownOpen(!stateDropdownOpen)}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 font-medium text-gray-700"
                >
                  Select by State
                  <ChevronDown className={`w-4 h-4 transition-transform ${stateDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {stateDropdownOpen && (
                  <div className="absolute z-10 mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 max-h-80 overflow-y-auto">
                    <div className="p-2 grid grid-cols-2 gap-1">
                      {Object.entries(locationsByState)
                        .sort(([a], [b]) => getStateName(a).localeCompare(getStateName(b)))
                        .map(([state, locs]) => {
                          const selectedCount = locs.filter(l => selectedLocations.includes(l.id)).length;
                          const isFullySelected = selectedCount === locs.length;

                          return (
                            <button
                              key={state}
                              onClick={() => {
                                if (isFullySelected) {
                                  locs.forEach(loc => {
                                    if (selectedLocations.includes(loc.id)) toggleLocation(loc.id);
                                  });
                                } else {
                                  locs.forEach(loc => {
                                    if (!selectedLocations.includes(loc.id)) toggleLocation(loc.id);
                                  });
                                }
                              }}
                              className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
                            >
                              <span className="flex items-center gap-2">
                                <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                                  isFullySelected ? 'bg-[#002147] border-[#002147]' : 'border-gray-300'
                                }`}>
                                  {isFullySelected && <Check className="w-3 h-3 text-white" />}
                                </div>
                                <span className="text-sm">{getStateName(state)}</span>
                              </span>
                              <span className="text-xs text-gray-500">{locs.length}</span>
                            </button>
                          );
                        })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Results Area */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            {searchTerm ? (
              // Search Results
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">
                  Search Results ({searchResults.length})
                </h3>
                {searchResults.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No jurisdictions found</p>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                    {searchResults.map(location => (
                      <button
                        key={location.id}
                        onClick={() => toggleLocation(location.id)}
                        className={`p-3 rounded-lg border text-left transition-all ${
                          selectedLocations.includes(location.id)
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="font-medium text-sm">{location.name}</div>
                        <div className="text-xs text-gray-500">{getStateName(location.state)}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              // Region Cards
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Popular Regions</h3>
                <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {TOP_REGIONS.map(region => {
                    const regionLocs = getRegionLocations(region);
                    const selectedCount = regionLocs.filter(l => selectedLocations.includes(l.id)).length;

                    return (
                      <div key={region.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-gray-900">{region.name}</h4>
                          <button
                            onClick={() => {
                              regionLocs.forEach(loc => {
                                if (!selectedLocations.includes(loc.id)) toggleLocation(loc.id);
                              });
                            }}
                            className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                          >
                            Select all
                          </button>
                        </div>
                        <p className="text-sm text-gray-500 mb-3">
                          {regionLocs.length} jurisdictions • {selectedCount} selected
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {regionLocs.slice(0, 4).map(loc => (
                            <button
                              key={loc.id}
                              onClick={() => toggleLocation(loc.id)}
                              className={`px-2 py-1 text-xs rounded-full ${
                                selectedLocations.includes(loc.id)
                                  ? 'bg-blue-100 text-blue-700'
                                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              }`}
                            >
                              {loc.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="px-6 lg:px-12 xl:px-20 py-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Step 2 of 3
            </div>
            <button
              onClick={onNext}
              disabled={!canContinue}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                canContinue
                  ? 'bg-[#002147] text-white hover:bg-[#003a6b]'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};