import { Home, CreditCard, Factory, Zap } from 'lucide-react';
import { Topic } from '../types';

export const topics: Topic[] = [
  { 
    id: 'housing', 
    name: 'New Multifamily Housing', 
    icon: Home, 
    description: 'Multifamily projects, zoning changes, housing initiatives' 
  },
  { 
    id: 'impact-fees', 
    name: 'Impact Fees', 
    icon: CreditCard, 
    description: 'Development impact fees, fee schedules, fee studies' 
  },
  { 
    id: 'industrial', 
    name: 'Industrial Real Estate', 
    icon: Factory, 
    description: 'Industrial zoning, logistics facilities, manufacturing' 
  },
  { 
    id: 'data-center', 
    name: 'Data Center', 
    icon: Zap, 
    description: 'Data center development, tech infrastructure projects' 
  }
];