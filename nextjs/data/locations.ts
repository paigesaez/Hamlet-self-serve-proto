import { Location } from '../types';

export const locations: Location[] = [
  { 
    id: 1, 
    name: 'San Francisco', 
    state: 'CA', 
    type: 'city', 
    popular: true, 
    coverage: 'Active',
    governingBodies: ['City Council', 'Planning Commission'], 
    customerDemand: 'High' 
  },
  { 
    id: 2, 
    name: 'Oakland', 
    state: 'CA', 
    type: 'city', 
    popular: true, 
    coverage: 'Active',
    governingBodies: ['City Council', 'Planning Commission'], 
    customerDemand: 'High' 
  },
  { 
    id: 3, 
    name: 'Berkeley', 
    state: 'CA', 
    type: 'city', 
    popular: false, 
    coverage: 'Active',
    governingBodies: ['City Council', 'Planning Commission'], 
    customerDemand: 'Medium' 
  },
  { 
    id: 4, 
    name: 'Los Angeles', 
    state: 'CA', 
    type: 'city', 
    popular: true, 
    coverage: 'Active',
    governingBodies: ['City Council', 'Planning Commission'], 
    customerDemand: 'High' 
  },
  { 
    id: 5, 
    name: 'Sacramento', 
    state: 'CA', 
    type: 'city', 
    popular: false, 
    coverage: 'Available',
    governingBodies: ['City Council', 'Planning Commission'], 
    customerDemand: 'Medium' 
  },
  { 
    id: 6, 
    name: 'Fresno', 
    state: 'CA', 
    type: 'city', 
    popular: false, 
    coverage: 'On Request',
    governingBodies: ['City Council', 'Planning Commission'], 
    customerDemand: 'Low' 
  }
];