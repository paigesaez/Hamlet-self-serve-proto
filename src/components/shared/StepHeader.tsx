import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StepHeaderProps {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
}

export const StepHeader: React.FC<StepHeaderProps> = ({ icon: Icon, title, subtitle }) => (
  <div className="mb-6 pb-6 border-b border-gray-100">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-[#002147] rounded-xl flex items-center justify-center shadow-sm">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className="text-left">
        <h2 className="text-2xl font-serif font-bold text-gray-900">{title}</h2>
        {subtitle && (
          <p className="text-sm text-gray-600 mt-0.5">{subtitle}</p>
        )}
      </div>
    </div>
  </div>
);