import React from 'react';
import { Search } from 'lucide-react';
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
  <div className="grid gap-8 lg:grid-cols-2">
    {/* Left Column - Instructions and Search */}
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Your Jurisdictions</h2>
        <p className="text-gray-600">Choose the cities and counties where you need agenda monitoring</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search cities, counties..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002147] focus:border-[#002147]"
        />
      </div>

      <div className="bg-blue-50 p-4 rounded-lg text-sm">
        <p className="font-medium text-blue-900 mb-2">Coverage Status:</p>
        <div className="space-y-1 text-blue-800">
          <p><span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span><strong>Active:</strong> Currently available across all jurisdictions where meeting agendas are posted publicly</p>
          <p><span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2"></span><strong>Available:</strong> Can activate within 1 week</p>
          <p><span className="inline-block w-2 h-2 bg-orange-500 rounded-full mr-2"></span><strong>On Request:</strong> Expansion based on customer demand and agenda availability</p>
        </div>
      </div>
    </div>

    {/* Right Column - Location List */}
    <div className="space-y-4">
      <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
        {locations
          .filter(loc => loc.name.toLowerCase().includes(searchTerm.toLowerCase()))
          .map(location => (
            <div
              key={location.id}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                selectedLocations.includes(location.id)
                  ? 'border-[#002147] bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => toggleLocation(location.id)}
            >
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-medium">{location.name}, {location.state}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      location.coverage === 'Active' ? 'bg-green-100 text-green-800' :
                      location.coverage === 'Available' ? 'bg-blue-100 text-blue-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {location.coverage}
                    </span>
                    {location.popular && (
                      <span className="text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded-full">
                        Popular
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">
                    {location.governingBodies.join(', ')}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Customer demand: {location.customerDemand}
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={selectedLocations.includes(location.id)}
                  onChange={() => {}}
                  className="w-5 h-5 text-[#002147] rounded border-gray-300 focus:ring-[#002147]"
                />
              </div>
            </div>
          ))}
      </div>

      <div className="flex justify-between items-center pt-4">
        <p className="text-sm text-gray-600">
          {selectedLocations.length} jurisdiction{selectedLocations.length !== 1 ? 's' : ''} selected
        </p>
        <button
          onClick={onNext}
          disabled={selectedLocations.length === 0}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            selectedLocations.length === 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-[#002147] text-white hover:bg-[#003a6b]'
          }`}
        >
          Select Governing Bodies →
        </button>
      </div>
    </div>
  </div>
);