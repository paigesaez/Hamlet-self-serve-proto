import React from 'react';
import { Search, MapPin, Info } from 'lucide-react';
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
}) => (
  <div className="max-w-5xl mx-auto">
    {/* Header */}
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl mb-4">
        <MapPin className="w-8 h-8 text-blue-700" />
      </div>
      <h2 className="text-3xl font-bold text-gray-900 mb-3">
        Select your jurisdictions
      </h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Choose the cities and counties where you need to monitor development discussions
      </p>
    </div>

    {/* Search Bar */}
    <div className="mb-6">
      <div className="relative max-w-xl mx-auto">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search cities, counties..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
        />
      </div>
    </div>

    {/* Coverage Legend */}
    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-8 max-w-2xl mx-auto">
      <div className="flex items-start space-x-3">
        <Info className="w-5 h-5 text-blue-600 mt-0.5" />
        <div className="flex-1">
          <p className="text-sm font-medium text-blue-900 mb-2">Coverage Status</p>
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

    {/* Location Grid */}
    <div className="grid md:grid-cols-2 gap-4 mb-8 max-h-[450px] overflow-y-auto px-1">
      {locations
        .filter(loc => loc.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .map(location => (
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
        ))}
    </div>

    {/* Footer */}
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-2xl font-bold text-gray-900">
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
);