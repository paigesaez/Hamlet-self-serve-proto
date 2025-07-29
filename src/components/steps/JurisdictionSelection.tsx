import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, MapPin, Info, ChevronDown, X, Map, Navigation } from 'lucide-react';
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
  const dropdownRef = useRef<HTMLDivElement>(null);
  
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
  
  return (
  <>
    <div className="max-w-5xl mx-auto">
      <StepHeader 
        icon={MapPin} 
        title="Select your jurisdictions" 
        subtitle={`Choose from ${locations.length} cities across ${stateData.length} states where you need to monitor development discussions`}
      />

      {/* Search and State Filter Bar */}
      <div className="mb-8">
        <div className="max-w-3xl mx-auto">
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
                          <span className="font-medium">{state}</span>
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
            <div className="mt-3 flex items-center gap-2">
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
      </div>


      {/* Coverage Legend */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-2xl p-5 mb-8 max-w-2xl mx-auto">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-white rounded-xl shadow-sm">
            <Info className="w-5 h-5 text-gray-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900 mb-3">Coverage Status</p>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-700 font-medium">Active now</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-gray-700 font-medium">Available</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-gray-700 font-medium">On request</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Summary with Map Metaphor */}
      <div className="mb-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-xl shadow-sm">
              <Globe2 className="w-5 h-5 text-[#002147]" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {filteredLocations.length} {filteredLocations.length === 1 ? 'Jurisdiction' : 'Jurisdictions'} Available
              </h3>
              <p className="text-sm text-gray-600">
                {selectedState ? `Viewing ${selectedState}` : 'Nationwide coverage'}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-[#002147]">
              {selectedLocations.length}
            </p>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Selected</p>
          </div>
        </div>
      </div>

      {/* Location Grid */}
      <div className="grid md:grid-cols-2 gap-4 mb-8 max-h-[500px] overflow-y-auto px-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
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
                relative flex items-center p-5 rounded-2xl border-2 cursor-pointer transition-all group
                ${selectedLocations.includes(location.id)
                  ? 'border-[#002147] bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg transform scale-[1.02]'
                  : 'border-gray-200 hover:border-gray-300 bg-white hover:shadow-md hover:scale-[1.01]'
                }
              `}
            >
              <input
                type="checkbox"
                checked={selectedLocations.includes(location.id)}
                onChange={() => toggleLocation(location.id)}
                className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
              <div className="ml-4 flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <MapPin className={`w-4 h-4 ${selectedLocations.includes(location.id) ? 'text-[#002147]' : 'text-gray-400'} group-hover:text-[#003a6b] transition-colors`} />
                    {location.name}, {location.state}
                  </h3>
                  <div className={`w-3 h-3 rounded-full ${
                    location.coverage === 'Active' ? 'bg-green-500' :
                    location.coverage === 'Available' ? 'bg-blue-500' :
                    'bg-orange-500'
                  }`}></div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">
                    City Council • Planning Commission
                  </p>
                  {location.popular && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                      Most requested
                    </span>
                  )}
                </div>
              </div>
            </label>
          ))
        )}
      </div>
    </div>

    {/* Sticky Footer */}
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-semibold text-gray-900">
              {selectedLocations.length} {selectedLocations.length === 1 ? 'jurisdiction' : 'jurisdictions'}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Ready to configure governing bodies
            </p>
          </div>
          <button
            onClick={onNext}
            disabled={selectedLocations.length === 0}
            className={`px-8 py-3 rounded-xl font-semibold transition-all ${
              selectedLocations.length === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-[#002147] text-white hover:bg-[#003a6b] shadow-md hover:shadow-lg transition-all'
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  </>
  );
};