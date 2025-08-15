import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StepHeaderProps {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
}

export const StepHeader: React.FC<StepHeaderProps> = ({ icon: Icon, title, subtitle }) => (
  <div className="mb-8">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
        <Icon className="w-6 h-6 text-gray-700" />
      </div>
      <div className="text-left">
        <h2 className="text-2xl font-medium text-gray-900">{title}</h2>
        {subtitle && (
          <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
        )}
      </div>
    </div>
  </div>
);