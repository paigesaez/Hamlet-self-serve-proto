import React from 'react';
import { Check } from 'lucide-react';
import { getStateName } from '../../utils/states';

interface JurisdictionCardProps {
  location: {
    id: number;
    name: string;
    state: string;
    region?: string;
  };
  isSelected: boolean;
  onClick: () => void;
  showCheck?: boolean;
}

export const JurisdictionCard: React.FC<JurisdictionCardProps> = ({
  location,
  isSelected,
  onClick,
  showCheck = true
}) => {
  return (
    <button
      onClick={onClick}
      className={`p-3 rounded-lg border text-left transition-all ${
        isSelected
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="font-medium text-base">{location.name}</div>
          <div className="text-sm text-gray-500">
            {getStateName(location.state)} {location.region && `• ${location.region}`}
          </div>
        </div>
        {showCheck && isSelected && (
          <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
        )}
      </div>
    </button>
  );
};