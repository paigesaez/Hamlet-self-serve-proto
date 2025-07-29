import React from 'react';
import { Building, Users, DollarSign, ArrowLeft } from 'lucide-react';
import { locations } from '../../data/locations';

interface GoverningBodySelectionProps {
  selectedLocations: number[];
  selectedBodies: Record<string, string[]>;
  toggleBody: (locationId: number, body: string) => void;
  getTotalBodies: () => number;
  calculatePrice: () => number;
  onBack: () => void;
  onNext: () => void;
}

export const GoverningBodySelection: React.FC<GoverningBodySelectionProps> = ({
  selectedLocations,
  selectedBodies,
  toggleBody,
  getTotalBodies,
  calculatePrice,
  onBack,
  onNext
}) => {
  const selectedLocationData = locations.filter(loc => selectedLocations.includes(loc.id));

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl mb-4">
          <Building className="w-8 h-8 text-purple-700" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Select governing bodies
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Choose which governing bodies to monitor in each jurisdiction
        </p>
      </div>

      {/* Pricing Summary Card */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 mb-8 border border-indigo-100">
        <div className="grid grid-cols-3 gap-6 text-center">
          <div>
            <p className="text-3xl font-bold text-gray-900">{selectedLocations.length}</p>
            <p className="text-sm text-gray-600 mt-1">Jurisdictions</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-900">{getTotalBodies()}</p>
            <p className="text-sm text-gray-600 mt-1">Governing Bodies</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-900">${calculatePrice()}</p>
            <p className="text-sm text-gray-600 mt-1">Per Month</p>
          </div>
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm text-indigo-700 font-medium">
            Volume pricing: $50 per governing body
          </p>
        </div>
      </div>

      {/* Jurisdictions List */}
      <div className="space-y-4 mb-8 max-h-[400px] overflow-y-auto px-1">
        {selectedLocationData.map(location => (
          <div key={location.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {location.name}, {location.state}
              </h3>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                location.coverage === 'Active' 
                  ? 'bg-green-100 text-green-700' 
                  : location.coverage === 'Available'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-orange-100 text-orange-700'
              }`}>
                {location.coverage}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {location.governingBodies.map(body => {
                const isSelected = selectedBodies[location.id]?.includes(body);
                return (
                  <label
                    key={body}
                    className={`
                      flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all
                      ${isSelected 
                        ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-purple-100/50' 
                        : 'border-gray-200 hover:border-gray-300 bg-gray-50'
                      }
                    `}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleBody(location.id, body)}
                      className="w-4 h-4 text-purple-600 border-2 border-gray-300 rounded focus:ring-2 focus:ring-purple-500"
                    />
                    <span className={`ml-3 text-sm font-medium ${
                      isSelected ? 'text-gray-900' : 'text-gray-700'
                    }`}>
                      {body}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Info Box */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-8">
        <div className="flex items-start space-x-3">
          <Users className="w-5 h-5 text-amber-600 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-amber-900 mb-1">Common governing bodies</p>
            <p className="text-sm text-amber-800">
              City Council handles general policy • Planning Commission reviews development proposals • 
              Board of Supervisors governs counties • Zoning Board manages variances
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 px-6 py-3 text-gray-700 hover:text-gray-900 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          
          <button
            onClick={onNext}
            disabled={getTotalBodies() === 0}
            className={`px-8 py-3 rounded-xl font-semibold transition-all ${
              getTotalBodies() === 0
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
};