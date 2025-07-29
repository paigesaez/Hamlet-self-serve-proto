import React from 'react';
import { Building } from 'lucide-react';
import { locations } from '../../data/locations';
import { NavigationButtons } from '../shared/NavigationButtons';

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
}) => (
  <div className="max-w-6xl mx-auto">
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Left Column - Instructions */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Governing Bodies</h2>
          <p className="text-gray-600">Choose which governing bodies to monitor in each jurisdiction</p>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg text-sm">
          <p className="font-medium text-blue-900 mb-2">Common Governing Bodies:</p>
          <ul className="space-y-1 text-blue-800">
            <li>• <strong>City Council:</strong> Primary legislative body for municipal decisions</li>
            <li>• <strong>Planning Commission:</strong> Reviews development proposals and zoning changes</li>
            <li>• <strong>Board of Supervisors:</strong> County-level governing body</li>
            <li>• <strong>Zoning Board:</strong> Handles variances and special permits</li>
          </ul>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="font-semibold mb-4 text-gray-900">Pricing Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Governing Bodies</span>
              <span className="font-medium">{getTotalBodies()}</span>
            </div>
            <div className="border-t pt-3">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Monthly Cost</span>
                <span className="text-lg font-bold text-[#002147]">${calculatePrice().toLocaleString()}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">$1,000 per 20 governing bodies</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Body Selection */}
      <div className="space-y-4">
        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
          {selectedLocations.map(locationId => {
            const location = locations.find(l => l.id === locationId);
            if (!location) return null;

            return (
              <div key={locationId} className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Building className="w-5 h-5 text-gray-600" />
                  <h3 className="font-medium text-gray-900">{location.name}, {location.state}</h3>
                </div>
                <div className="space-y-2">
                  {location.governingBodies.map(body => (
                    <label
                      key={body}
                      className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded"
                    >
                      <input
                        type="checkbox"
                        checked={selectedBodies[locationId]?.includes(body) || false}
                        onChange={() => toggleBody(locationId, body)}
                        className="w-4 h-4 text-[#002147] rounded border-gray-300 focus:ring-[#002147]"
                      />
                      <span className="text-gray-700">{body}</span>
                    </label>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <NavigationButtons
          onBack={onBack}
          onNext={onNext}
          nextDisabled={getTotalBodies() === 0}
          nextText="Select Topics"
        />
      </div>
    </div>
  </div>
);