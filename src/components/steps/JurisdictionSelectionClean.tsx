import React, { useState, useMemo } from 'react';
import { Search, MapPin, ChevronDown, Check, X } from 'lucide-react';
import { locations } from '../../data/locations';
import { getStateName } from '../../utils/states';

interface JurisdictionSelectionProps {
  selectedLocations: number[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  toggleLocation: (locationId: number) => void;
  onNext: () => void;
}

const REGIONS = [
  { id: 'bay-area', name: 'San Francisco Bay Area', states: ['CA'] },
  { id: 'socal', name: 'Southern California', states: ['CA'] },
  { id: 'nyc', name: 'New York Metro', states: ['NY', 'NJ', 'CT'] },
  { id: 'dc', name: 'Washington DC Metro', states: ['DC', 'VA', 'MD'] },
  { id: 'chicago', name: 'Chicago Metro', states: ['IL'] },
  { id: 'texas-triangle', name: 'Texas Triangle', states: ['TX'] },
  { id: 'florida', name: 'South Florida', states: ['FL'] },
  { id: 'seattle', name: 'Seattle-Tacoma', states: ['WA'] },
  { id: 'phoenix', name: 'Phoenix Metro', states: ['AZ'] },
  { id: 'denver', name: 'Denver Metro', states: ['CO'] }
];

export const JurisdictionSelectionClean: React.FC<JurisdictionSelectionProps> = ({
  selectedLocations,
  searchTerm,
  setSearchTerm,
  toggleLocation,
  onNext
}) => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [stateDropdownOpen, setStateDropdownOpen] = useState(false);
  const [regionDropdownOpen, setRegionDropdownOpen] = useState(false);

  // Group locations by state
  const stateGroups = useMemo(() => {
    const groups: Record<string, typeof locations> = {};
    locations.forEach(loc => {
      if (!groups[loc.state]) groups[loc.state] = [];
      groups[loc.state].push(loc);
    });
    return groups;
  }, []);

  // Filter locations based on search or active filters
  const filteredLocations = useMemo(() => {
    let filtered = [...locations];
    
    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(loc =>
        loc.name.toLowerCase().includes(term) ||
        getStateName(loc.state).toLowerCase().includes(term) ||
        loc.state.toLowerCase().includes(term)
      );
    }
    
    // State filter
    if (activeFilter && activeFilter.startsWith('state:')) {
      const state = activeFilter.replace('state:', '');
      filtered = filtered.filter(loc => loc.state === state);
    }
    
    // Region filter
    if (activeFilter && activeFilter.startsWith('region:')) {
      const regionId = activeFilter.replace('region:', '');
      const region = REGIONS.find(r => r.id === regionId);
      if (region) {
        filtered = filtered.filter(loc => region.states.includes(loc.state));
      }
    }
    
    return filtered;
  }, [searchTerm, activeFilter]);

  const totalBodies = selectedLocations.reduce((sum, id) => {
    const loc = locations.find(l => l.id === id);
    return sum + (loc?.governingBodies.length || 0);
  }, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Full Width Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <MapPin className="w-6 h-6 text-[#002147]" />
              <h1 className="text-2xl font-semibold text-gray-900">Select Jurisdictions to Monitor</h1>
            </div>
            
            {/* Topics */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Topics:</span>
              <span className="text-sm font-medium">Industrial • Housing • New Multifamily Housing • Impact Fees • Data Centers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="bg-white border-b px-8 py-4">
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setActiveFilter(null);
              }}
              placeholder="Search jurisdictions..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002147]"
            />
          </div>

          {/* Region Filter */}
          <div className="relative">
            <button
              onClick={() => setRegionDropdownOpen(!regionDropdownOpen)}
              className={`px-4 py-2 rounded-lg border flex items-center gap-2 ${
                activeFilter?.startsWith('region:') 
                  ? 'bg-[#002147] text-white border-[#002147]' 
                  : 'bg-white hover:bg-gray-50'
              }`}
            >
              Regions
              <ChevronDown className="w-4 h-4" />
            </button>
            
            {regionDropdownOpen && (
              <div className="absolute top-full mt-2 w-64 bg-white rounded-lg shadow-lg border z-20">
                {REGIONS.map(region => (
                  <button
                    key={region.id}
                    onClick={() => {
                      setActiveFilter(`region:${region.id}`);
                      setRegionDropdownOpen(false);
                      setSearchTerm('');
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                  >
                    {region.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* State Filter */}
          <div className="relative">
            <button
              onClick={() => setStateDropdownOpen(!stateDropdownOpen)}
              className={`px-4 py-2 rounded-lg border flex items-center gap-2 ${
                activeFilter?.startsWith('state:') 
                  ? 'bg-[#002147] text-white border-[#002147]' 
                  : 'bg-white hover:bg-gray-50'
              }`}
            >
              States
              <ChevronDown className="w-4 h-4" />
            </button>
            
            {stateDropdownOpen && (
              <div className="absolute top-full mt-2 w-64 bg-white rounded-lg shadow-lg border max-h-96 overflow-y-auto z-20">
                {Object.keys(stateGroups)
                  .sort((a, b) => getStateName(a).localeCompare(getStateName(b)))
                  .map(state => (
                    <button
                      key={state}
                      onClick={() => {
                        setActiveFilter(`state:${state}`);
                        setStateDropdownOpen(false);
                        setSearchTerm('');
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50"
                    >
                      {getStateName(state)} ({stateGroups[state].length})
                    </button>
                  ))}
              </div>
            )}
          </div>

          {/* Clear Filter */}
          {activeFilter && (
            <button
              onClick={() => setActiveFilter(null)}
              className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <div className="ml-auto flex items-center gap-4">
            {/* Selection Count */}
            {selectedLocations.length > 0 && (
              <>
                <div className="text-sm">
                  <span className="font-bold text-[#002147] text-lg">{selectedLocations.length}</span>
                  <span className="text-gray-600 ml-1">selected ({totalBodies} bodies)</span>
                </div>
                <button
                  onClick={() => selectedLocations.forEach(id => toggleLocation(id))}
                  className="text-sm text-red-600 hover:text-red-700"
                >
                  Clear all
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area - Full Width Grid */}
      <div className="px-8 py-6">
        {activeFilter && (
          <div className="mb-4">
            <span className="text-sm text-gray-500">
              Showing: {activeFilter.startsWith('region:') 
                ? REGIONS.find(r => r.id === activeFilter.replace('region:', ''))?.name
                : getStateName(activeFilter.replace('state:', ''))}
            </span>
          </div>
        )}

        {/* Results Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3">
          {filteredLocations.map(location => {
            const isSelected = selectedLocations.includes(location.id);
            return (
              <button
                key={location.id}
                onClick={() => toggleLocation(location.id)}
                className={`p-4 rounded-lg border-2 text-left transition-all ${
                  isSelected 
                    ? 'border-[#002147] bg-blue-50' 
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{location.name}</h3>
                  {isSelected && <Check className="w-5 h-5 text-[#002147]" />}
                </div>
                <p className="text-sm text-gray-500">{getStateName(location.state)}</p>
                {location.region && (
                  <p className="text-xs text-gray-400 mt-1">{location.region}</p>
                )}
                <p className="text-xs text-gray-400 mt-2">
                  {location.governingBodies.length} governing {location.governingBodies.length === 1 ? 'body' : 'bodies'}
                </p>
              </button>
            );
          })}
        </div>

        {filteredLocations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No jurisdictions found</p>
          </div>
        )}
      </div>

      {/* Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Select the jurisdictions you want to monitor
          </div>
          <button
            onClick={onNext}
            disabled={selectedLocations.length === 0}
            className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
              selectedLocations.length > 0
                ? 'bg-[#002147] text-white hover:bg-[#003a6b]'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            Continue with {selectedLocations.length} jurisdictions
          </button>
        </div>
      </div>
    </div>
  );
};