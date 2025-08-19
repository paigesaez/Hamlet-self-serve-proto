import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { stateJurisdictions } from '../../data/stateJurisdictions';
import { getStateName } from '../../utils/states';

interface StateSelectionProps {
  selectedStates: string[];
  toggleState: (state: string) => void;
  onNext: () => void;
}

export const StateSelection: React.FC<StateSelectionProps> = ({
  selectedStates,
  toggleState,
  onNext
}) => {
  const [stateDropdownOpen, setStateDropdownOpen] = useState(false);
  const stateDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (stateDropdownRef.current && !stateDropdownRef.current.contains(event.target as Node)) {
        setStateDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Use actual production jurisdiction counts
  const stateStats = useMemo(() => {
    const stats: Record<string, {
      name: string;
      jurisdictionCount: number;
      governingBodiesCount: number;
    }> = {};

    Object.entries(stateJurisdictions).forEach(([state, data]) => {
      stats[state] = {
        name: getStateName(state),
        jurisdictionCount: data.jurisdictionCount,
        governingBodiesCount: data.governingBodiesCount
      };
    });

    return stats;
  }, []);

  // Calculate total selections
  const totalStats = useMemo(() => {
    let jurisdictions = 0;
    let governingBodies = 0;

    selectedStates.forEach(state => {
      if (stateStats[state]) {
        jurisdictions += stateStats[state].jurisdictionCount;
        governingBodies += stateStats[state].governingBodiesCount;
      }
    });

    return { jurisdictions, governingBodies };
  }, [selectedStates, stateStats]);

  const selectAllStates = () => {
    const allStates = Object.keys(stateStats);
    allStates.forEach(state => {
      if (!selectedStates.includes(state)) {
        toggleState(state);
      }
    });
    setStateDropdownOpen(false);
  };

  const clearAllStates = () => {
    selectedStates.forEach(state => {
      toggleState(state);
    });
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-4 bg-white rounded-lg p-4 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Select States to Monitor</h2>
            <p className="text-sm text-gray-600 mt-1">Choose states and we'll monitor all cities and counties within them</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-500">Topics:</p>
            <div className="flex gap-1">
              <span className="px-2 py-0.5 bg-blue-50 rounded text-sm font-medium text-blue-700">Industrial</span>
              <span className="px-2 py-0.5 bg-blue-50 rounded text-sm font-medium text-blue-700">Housing</span>
              <span className="px-2 py-0.5 bg-blue-50 rounded text-sm font-medium text-blue-700">Multifamily</span>
              <span className="px-2 py-0.5 bg-blue-50 rounded text-sm font-medium text-blue-700">Impact Fees</span>
              <span className="px-2 py-0.5 bg-blue-50 rounded text-sm font-medium text-blue-700">Data Centers</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-4">
        {/* Main Content Area */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white rounded-lg p-4 border border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* State Multi-Select Dropdown */}
              <div className="relative" ref={stateDropdownRef}>
                <button
                  onClick={() => setStateDropdownOpen(!stateDropdownOpen)}
                  className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 font-medium transition-colors"
                >
                  <span>Filter States</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${stateDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {stateDropdownOpen && (
                  <div className="absolute z-10 mt-2 w-[500px] bg-white border border-gray-300 rounded-lg shadow-lg max-h-96 overflow-y-auto">
                    <button
                      onClick={selectAllStates}
                      className="w-full px-4 py-2 text-left hover:bg-blue-50 text-blue-600 font-medium border-b text-sm"
                    >
                      Select All States
                    </button>
                    <div className="grid grid-cols-2 divide-x divide-gray-200">
                      {Object.entries(stateStats)
                        .sort(([, a], [, b]) => a.name.localeCompare(b.name))
                        .map(([stateCode, data]) => {
                          const isSelected = selectedStates.includes(stateCode);
                          
                          return (
                            <button
                              key={stateCode}
                              onClick={() => toggleState(stateCode)}
                              className="px-4 py-2 text-left hover:bg-gray-50 flex items-center justify-between text-sm"
                            >
                              <span className="flex items-center gap-2">
                                <div className={`w-4 h-4 border rounded flex items-center justify-center ${
                                  isSelected ? 'bg-blue-600 border-blue-600' : 'border-gray-300'
                                }`}>
                                  {isSelected && <Check className="w-3 h-3 text-white" />}
                                </div>
                                <span>{data.name}</span>
                              </span>
                              <span className="text-sm text-gray-500 ml-2">
                                {data.jurisdictionCount}
                              </span>
                            </button>
                          );
                        })}
                    </div>
                  </div>
                )}
              </div>

              {selectedStates.length > 0 && (
                <button
                  onClick={clearAllStates}
                  className="text-sm text-red-600 hover:text-red-700"
                >
                  Clear all
                </button>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3">
              {Object.entries(stateStats)
                .sort(([, a], [, b]) => a.name.localeCompare(b.name))
                .map(([stateCode, data]) => {
                  const isSelected = selectedStates.includes(stateCode);
                  return (
                    <button
                      key={stateCode}
                      onClick={() => toggleState(stateCode)}
                      className={`p-4 rounded-lg border-2 text-left transition-colors ${
                        isSelected 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{data.name}</h3>
                        {isSelected && <Check className="w-5 h-5 text-blue-600" />}
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">{data.jurisdictionCount}</span> cities/counties • <span className="font-medium">{data.governingBodiesCount}</span> governing bodies
                        </p>
                      </div>
                    </button>
                  );
                })}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-4 space-y-4">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="text-center mb-3">
                <div className="text-base font-medium text-gray-700">
                  {selectedStates.length} {selectedStates.length === 1 ? 'state' : 'states'} selected
                </div>
              </div>

              {selectedStates.length > 0 && (
                <div className="space-y-2 py-3 border-t border-b border-gray-100">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Cities/Counties:</span>
                    <span className="font-semibold">{totalStats.jurisdictions}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Governing Bodies:</span>
                    <span className="font-semibold">{totalStats.governingBodies}</span>
                  </div>
                </div>
              )}

              {/* Subscribe Button */}
              <button
                onClick={onNext}
                disabled={selectedStates.length === 0}
                className={`w-full py-2.5 px-4 rounded-lg font-medium transition-colors mt-4 ${
                  selectedStates.length > 0
                    ? 'bg-[#002147] text-white hover:bg-[#003a6b]'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                {selectedStates.length > 0 
                  ? `Start Free Trial`
                  : 'Select states to continue'
                }
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};