import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, MapPin, Info, ChevronDown, X, Map, Navigation, Zap, Globe2, Activity, Layers } from 'lucide-react';
import { locations } from '../../data/locations';

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
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl mb-4">
          <MapPin className="w-8 h-8 text-blue-700" />
        </div>
        <h2 className="text-3xl font-serif text-gray-900 mb-3">
          Select your jurisdictions
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light">
          Choose the cities and counties where you need to monitor development discussions
        </p>
      </div>

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
                      <span className="font-medium">{selectedState}</span>
                      <span className="text-sm text-gray-500">({stateData.find(s => s.state === selectedState)?.count} cities)</span>
                    </span>
                  ) : (
                    'All States'
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
                        !selectedState ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
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
                          selectedState === state ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
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
                  className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors"
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
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-8 max-w-2xl mx-auto">
        <div className="flex items-start space-x-3">
          <Info className="w-5 h-5 text-blue-600 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-blue-900 mb-2">Coverage Status</p>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-blue-800">Active now</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-blue-800">1 week setup</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-blue-800">On request</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          {filteredLocations.length} Available {filteredLocations.length === 1 ? 'Location' : 'Locations'}
        </h3>
        <p className="text-sm text-gray-500">
          {selectedLocations.length} selected
        </p>
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
                relative flex items-center p-5 rounded-2xl border-2 cursor-pointer transition-all
                ${selectedLocations.includes(location.id)
                  ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100/50 shadow-md'
                  : 'border-gray-200 hover:border-gray-300 bg-white hover:shadow-sm'
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
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-gray-900">
                    {location.name}, {location.state}
                  </h3>
                  <div className={`w-2.5 h-2.5 rounded-full ${
                    location.coverage === 'Active' ? 'bg-green-500' :
                    location.coverage === 'Available' ? 'bg-blue-500' :
                    'bg-orange-500'
                  }`}></div>
                </div>
                <p className="text-sm text-gray-600">
                  {location.governingBodies.join(' • ')}
                </p>
                {location.popular && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700 mt-2">
                    Popular
                  </span>
                )}
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
                : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg'
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