import React from 'react';
import { ChevronDown } from 'lucide-react';

interface DropdownButtonProps {
  label: string;
  isOpen: boolean;
  onClick: () => void;
  variant?: 'purple' | 'blue';
}

export const DropdownButton: React.FC<DropdownButtonProps> = ({
  label,
  isOpen,
  onClick,
  variant = 'blue'
}) => {
  const baseClasses = "px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors";
  const variantClasses = variant === 'purple' 
    ? "bg-purple-600 text-white hover:bg-purple-700"
    : "bg-blue-600 text-white hover:bg-blue-700";
  
  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses}`}
    >
      {label}
      <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
    </button>
  );
};