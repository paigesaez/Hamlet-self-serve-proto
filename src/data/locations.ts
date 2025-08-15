import { Location } from '../types';

export const locations: Location[] = [
  // California
  { 
    id: 1, 
    name: 'San Francisco', 
    state: 'CA', 
    type: 'city', 
    popular: true, 
    coverage: 'Active',
    governingBodies: ['City Council', 'Planning Commission', 'Board of Supervisors', 'Zoning Administrator'], 
    customerDemand: 'High' 
  },
  { 
    id: 2, 
    name: 'Oakland', 
    state: 'CA', 
    type: 'city', 
    popular: true, 
    coverage: 'Active',
    governingBodies: ['City Council', 'Planning Commission', 'Zoning Board'], 
    customerDemand: 'High' 
  },
  { 
    id: 3, 
    name: 'Berkeley', 
    state: 'CA', 
    type: 'city', 
    popular: false, 
    coverage: 'Active',
    governingBodies: ['City Council', 'Planning Commission', 'Zoning Adjustments Board'], 
    customerDemand: 'Medium' 
  },
  { 
    id: 4, 
    name: 'Los Angeles', 
    state: 'CA', 
    type: 'city', 
    popular: true, 
    coverage: 'Active',
    governingBodies: ['City Council', 'Planning Commission', 'Board of Public Works', 'Housing Authority'], 
    customerDemand: 'High' 
  },
  { 
    id: 5, 
    name: 'Sacramento', 
    state: 'CA', 
    type: 'city', 
    popular: false, 
    coverage: 'Active',
    governingBodies: ['City Council', 'Planning Commission', 'Design Commission'], 
    customerDemand: 'Medium' 
  },
  { 
    id: 6, 
    name: 'San Diego', 
    state: 'CA', 
    type: 'city', 
    popular: true, 
    coverage: 'Active',
    governingBodies: ['City Council', 'Planning Commission', 'Development Services', 'Civic San Diego'], 
    customerDemand: 'High' 
  },
  { 
    id: 7, 
    name: 'San Jose', 
    state: 'CA', 
    type: 'city', 
    popular: true, 
    coverage: 'Active',
    governingBodies: ['City Council', 'Planning Commission', 'Airport Commission'], 
    customerDemand: 'High' 
  },
  { 
    id: 8, 
    name: 'Fresno', 
    state: 'CA', 
    type: 'city', 
    popular: false, 
    coverage: 'Active',
    governingBodies: ['City Council', 'Planning Commission'], 
    customerDemand: 'Low' 
  },
  { 
    id: 9, 
    name: 'Long Beach', 
    state: 'CA', 
    type: 'city', 
    popular: false, 
    coverage: 'Active',
    governingBodies: ['City Council', 'Planning Commission', 'Harbor Commission'], 
    customerDemand: 'Medium' 
  },
  { 
    id: 10, 
    name: 'Anaheim', 
    state: 'CA', 
    type: 'city', 
    popular: false, 
    coverage: 'Active',
    governingBodies: ['City Council', 'Planning Commission'], 
    customerDemand: 'Medium' 
  },
  { 
    id: 11, 
    name: 'Santa Monica', 
    state: 'CA', 
    type: 'city', 
    popular: true, 
    coverage: 'Active',
    governingBodies: ['City Council', 'Planning Commission', 'Architectural Review Board'], 
    customerDemand: 'High' 
  },
  { 
    id: 12, 
    name: 'Irvine', 
    state: 'CA', 
    type: 'city', 
    popular: false, 
    coverage: 'Active',
    governingBodies: ['City Council', 'Planning Commission'], 
    customerDemand: 'Medium' 
  },
  
  // Texas
  { 
    id: 13, 
    name: 'Houston', 
    state: 'TX', 
    type: 'city', 
    popular: true, 
    coverage: 'Active',
    governingBodies: ['City Council', 'Planning Commission', 'Super Neighborhoods Council'], 
    customerDemand: 'High' 
  },
  { 
    id: 14, 
    name: 'Austin', 
    state: 'TX', 
    type: 'city', 
    popular: true, 
    coverage: 'Active',
    governingBodies: ['City Council', 'Planning Commission', 'Zoning and Platting Commission', 'Design Commission'], 
    customerDemand: 'High' 
  },
  { 
    id: 15, 
    name: 'Dallas', 
    state: 'TX', 
    type: 'city', 
    popular: true, 
    coverage: 'Active',
    governingBodies: ['City Council', 'City Plan Commission', 'Board of Adjustment'], 
    customerDemand: 'High' 
  },
  { 
    id: 16, 
    name: 'San Antonio', 
    state: 'TX', 
    type: 'city', 
    popular: false, 
    coverage: 'Active',
    governingBodies: ['City Council', 'Planning Commission', 'Historic and Design Review Commission'], 
    customerDemand: 'Medium' 
  },
  { 
    id: 17, 
    name: 'Fort Worth', 
    state: 'TX', 
    type: 'city', 
    popular: false, 
    coverage: 'Active',
    governingBodies: ['City Council', 'Planning Commission', 'Zoning Commission'], 
    customerDemand: 'Medium' 
  },
  { 
    id: 18, 
    name: 'El Paso', 
    state: 'TX', 
    type: 'city', 
    popular: false, 
    coverage: 'Active',
    governingBodies: ['City Council', 'Planning Commission'], 
    customerDemand: 'Low' 
  },
  { 
    id: 19, 
    name: 'Arlington', 
    state: 'TX', 
    type: 'city', 
    popular: false, 
    coverage: 'Active',
    governingBodies: ['City Council', 'Planning and Zoning Commission'], 
    customerDemand: 'Medium' 
  },
  { 
    id: 20, 
    name: 'Plano', 
    state: 'TX', 
    type: 'city', 
    popular: false, 
    coverage: 'Active',
    governingBodies: ['City Council', 'Planning and Zoning Commission'], 
    customerDemand: 'Medium' 
  },
  
  // Florida
  { 
    id: 21, 
    name: 'Miami', 
    state: 'FL', 
    type: 'city', 
    popular: true, 
    coverage: 'Active',
    governingBodies: ['City Commission', 'Planning Advisory Board', 'Urban Development Review Board'], 
    customerDemand: 'High' 
  },
  { 
    id: 22, 
    name: 'Orlando', 
    state: 'FL', 
    type: 'city', 
    popular: true, 
    coverage: 'Active',
    governingBodies: ['City Council', 'Municipal Planning Board', 'Board of Zoning Adjustment'], 
    customerDemand: 'High' 
  },
  { 
    id: 23, 
    name: 'Tampa', 
    state: 'FL', 
    type: 'city', 
    popular: false, 
    coverage: 'Active',
    governingBodies: ['City Council', 'Planning Commission', 'Architectural Review Commission'], 
    customerDemand: 'Medium' 
  },
  { 
    id: 24, 
    name: 'Jacksonville', 
    state: 'FL', 
    type: 'city', 
    popular: false, 
    coverage: 'Active',
    governingBodies: ['City Council', 'Planning Commission'], 
    customerDemand: 'Medium' 
  },
  { 
    id: 25, 
    name: 'Fort Lauderdale', 
    state: 'FL', 
    type: 'city', 
    popular: false, 
    coverage: 'Active',
    governingBodies: ['City Commission', 'Planning and Zoning Board'], 
    customerDemand: 'Medium' 
  },
  { 
    id: 26, 
    name: 'St. Petersburg', 
    state: 'FL', 
    type: 'city', 
    popular: false, 
    coverage: 'Active',
    governingBodies: ['City Council', 'Planning Commission'], 
    customerDemand: 'Low' 
  },
  
  // New York
  { 
    id: 27, 
    name: 'New York City', 
    state: 'NY', 
    type: 'city', 
    popular: true, 
    coverage: 'Active',
    governingBodies: ['City Council', 'City Planning Commission', 'Board of Standards and Appeals', 'Landmarks Preservation Commission'], 
    customerDemand: 'High' 
  },
  { 
    id: 28, 
    name: 'Buffalo', 
    state: 'NY', 
    type: 'city', 
    popular: false, 
    coverage: 'Active',
    governingBodies: ['Common Council', 'Planning Board', 'Zoning Board of Appeals'], 
    customerDemand: 'Low' 
  },
  { 
    id: 29, 
    name: 'Rochester', 
    state: 'NY', 
    type: 'city', 
    popular: false, 
    coverage: 'Active',
    governingBodies: ['City Council', 'Planning Commission'], 
    customerDemand: 'Low' 
  },
  { 
    id: 30, 
    name: 'Albany', 
    state: 'NY', 
    type: 'city', 
    popular: false, 
    coverage: 'Active',
    governingBodies: ['Common Council', 'Planning Board', 'Board of Zoning Appeals'], 
    customerDemand: 'Low' 
  },
  
  // Illinois
  { 
    id: 31, 
    name: 'Chicago', 
    state: 'IL', 
    type: 'city', 
    popular: true, 
    coverage: 'Active',
    governingBodies: ['City Council', 'Plan Commission', 'Zoning Board of Appeals', 'Committee on Zoning'], 
    customerDemand: 'High' 
  },
  { 
    id: 32, 
    name: 'Aurora', 
    state: 'IL', 
    type: 'city', 
    popular: false, 
    coverage: 'Active',
    governingBodies: ['City Council', 'Planning Commission'], 
    customerDemand: 'Low' 
  },
  { 
    id: 33, 
    name: 'Naperville', 
    state: 'IL', 
    type: 'city', 
    popular: false, 
    coverage: 'Active',
    governingBodies: ['City Council', 'Planning and Zoning Commission'], 
    customerDemand: 'Medium' 
  },
  
  // Arizona
  { 
    id: 34, 
    name: 'Phoenix', 
    state: 'AZ', 
    type: 'city', 
    popular: true, 
    coverage: 'Active',
    governingBodies: ['City Council', 'Planning Commission', 'Board of Adjustment', 'Village Planning Committees'], 
    customerDemand: 'High' 
  },
  { 
    id: 35, 
    name: 'Tucson', 
    state: 'AZ', 
    type: 'city', 
    popular: false, 
    coverage: 'Active',
    governingBodies: ['Mayor and Council', 'Planning Commission', 'Board of Adjustment'], 
    customerDemand: 'Medium' 
  },
  { 
    id: 36, 
    name: 'Scottsdale', 
    state: 'AZ', 
    type: 'city', 
    popular: false, 
    coverage: 'Active',
    governingBodies: ['City Council', 'Planning Commission', 'Development Review Board'], 
    customerDemand: 'Medium' 
  },
  { 
    id: 37, 
    name: 'Mesa', 
    state: 'AZ', 
    type: 'city', 
    popular: false, 
    coverage: 'Active',
    governingBodies: ['City Council', 'Planning and Zoning Board'], 
    customerDemand: 'Medium' 
  },
  
  // Colorado
  { 
    id: 38, 
    name: 'Denver', 
    state: 'CO', 
    type: 'city', 
    popular: true, 
    coverage: 'Active',
    governingBodies: ['City Council', 'Planning Board', 'Board of Adjustment', 'Landmark Preservation Commission'], 
    customerDemand: 'High' 
  },
  { 
    id: 39, 
    name: 'Boulder', 
    state: 'CO', 
    type: 'city', 
    popular: false, 
    coverage: 'Active',
    governingBodies: ['City Council', 'Planning Board'], 
    customerDemand: 'Medium' 
  },
  { 
    id: 40, 
    name: 'Colorado Springs', 
    state: 'CO', 
    type: 'city', 
    popular: false, 
    coverage: 'Active',
    governingBodies: ['City Council', 'Planning Commission'], 
    customerDemand: 'Medium' 
  },
  { 
    id: 41, 
    name: 'Fort Collins', 
    state: 'CO', 
    type: 'city', 
    popular: false, 
    coverage: 'Active',
    governingBodies: ['City Council', 'Planning and Zoning Board'], 
    customerDemand: 'Medium' 
  },
  
  // Washington
  { 
    id: 42, 
    name: 'Seattle', 
    state: 'WA', 
    type: 'city', 
    popular: true, 
    coverage: 'Active',
    governingBodies: ['City Council', 'Planning Commission', 'Design Review Board', 'Hearing Examiner'], 
    customerDemand: 'High' 
  },
  { 
    id: 43, 
    name: 'Bellevue', 
    state: 'WA', 
    type: 'city', 
    popular: false, 
    coverage: 'Active',
    governingBodies: ['City Council', 'Planning Commission'], 
    customerDemand: 'High' 
  },
  { 
    id: 44, 
    name: 'Tacoma', 
    state: 'WA', 
    type: 'city', 
    popular: false, 
    coverage: 'Active',
    governingBodies: ['City Council', 'Planning Commission'], 
    customerDemand: 'Medium' 
  },
  { 
    id: 45, 
    name: 'Spokane', 
    state: 'WA', 
    type: 'city', 
    popular: false, 
    coverage: 'Active',
    governingBodies: ['City Council', 'Plan Commission'], 
    customerDemand: 'Low' 
  },
  
  // Georgia
  { 
    id: 46, 
    name: 'Atlanta', 
    state: 'GA', 
    type: 'city', 
    popular: true, 
    coverage: 'Active',
    governingBodies: ['City Council', 'Planning Commission', 'Board of Zoning Adjustment', 'Urban Design Commission'], 
    customerDemand: 'High' 
  },
  { 
    id: 47, 
    name: 'Savannah', 
    state: 'GA', 
    type: 'city', 
    popular: false, 
    coverage: 'Active',
    governingBodies: ['City Council', 'Planning Commission'], 
    customerDemand: 'Low' 
  },
  { 
    id: 48, 
    name: 'Augusta', 
    state: 'GA', 
    type: 'city', 
    popular: false, 
    coverage: 'Active',
    governingBodies: ['Commission', 'Planning Commission'], 
    customerDemand: 'Low' 
  },
  
  // North Carolina
  { 
    id: 49, 
    name: 'Charlotte', 
    state: 'NC', 
    type: 'city', 
    popular: true, 
    coverage: 'Active',
    governingBodies: ['City Council', 'Planning Commission', 'Zoning Board of Adjustment'], 
    customerDemand: 'High' 
  },
  { 
    id: 50, 
    name: 'Raleigh', 
    state: 'NC', 
    type: 'city', 
    popular: false, 
    coverage: 'Active',
    governingBodies: ['City Council', 'Planning Commission'], 
    customerDemand: 'Medium' 
  },
  { 
    id: 51, 
    name: 'Durham', 
    state: 'NC', 
    type: 'city', 
    popular: false, 
    coverage: 'Active',
    governingBodies: ['City Council', 'Planning Commission', 'Board of Adjustment'], 
    customerDemand: 'Medium' 
  },
  { 
    id: 52, 
    name: 'Greensboro', 
    state: 'NC', 
    type: 'city', 
    popular: false, 
    coverage: 'Active',
    governingBodies: ['City Council', 'Planning Board'], 
    customerDemand: 'Low' 
  },
  
  // Tennessee
  { 
    id: 53, 
    name: 'Nashville', 
    state: 'TN', 
    type: 'city', 
    popular: true, 
    coverage: 'Active',
    governingBodies: ['Metro Council', 'Planning Commission', 'Board of Zoning Appeals'], 
    customerDemand: 'High' 
  },
  { 
    id: 54, 
    name: 'Memphis', 
    state: 'TN', 
    type: 'city', 
    popular: false, 
    coverage: 'Active',
    governingBodies: ['City Council', 'Planning Commission'], 
    customerDemand: 'Medium' 
  },
  { 
    id: 55, 
    name: 'Knoxville', 
    state: 'TN', 
    type: 'city', 
    popular: false, 
    coverage: 'Active',
    governingBodies: ['City Council', 'Planning Commission'], 
    customerDemand: 'Low' 
  },
  
  // Massachusetts
  { 
    id: 56, 
    name: 'Boston', 
    state: 'MA', 
    type: 'city', 
    popular: true, 
    coverage: 'Active',
    governingBodies: ['City Council', 'Planning Board', 'Zoning Board of Appeal', 'Boston Planning & Development Agency'], 
    customerDemand: 'High' 
  },
  { 
    id: 57, 
    name: 'Cambridge', 
    state: 'MA', 
    type: 'city', 
    popular: false, 
    coverage: 'Active',
    governingBodies: ['City Council', 'Planning Board', 'Board of Zoning Appeal'], 
    customerDemand: 'High' 
  },
  { 
    id: 58, 
    name: 'Worcester', 
    state: 'MA', 
    type: 'city', 
    popular: false, 
    coverage: 'Active',
    governingBodies: ['City Council', 'Planning Board'], 
    customerDemand: 'Low' 
  },
  
  // Pennsylvania
  { 
    id: 59, 
    name: 'Philadelphia', 
    state: 'PA', 
    type: 'city', 
    popular: true, 
    coverage: 'Active',
    governingBodies: ['City Council', 'City Planning Commission', 'Zoning Board of Adjustment', 'Historical Commission'], 
    customerDemand: 'High' 
  },
  { 
    id: 60, 
    name: 'Pittsburgh', 
    state: 'PA', 
    type: 'city', 
    popular: false, 
    coverage: 'Active',
    governingBodies: ['City Council', 'Planning Commission', 'Zoning Board of Adjustment'], 
    customerDemand: 'Medium' 
  },
  { 
    id: 61, 
    name: 'Allentown', 
    state: 'PA', 
    type: 'city', 
    popular: false, 
    coverage: 'Active',
    governingBodies: ['City Council', 'Planning Commission'], 
    customerDemand: 'Low' 
  },
  
  // Ohio
  { 
    id: 62, 
    name: 'Columbus', 
    state: 'OH', 
    type: 'city', 
    popular: false, 
    coverage: 'Active',
    governingBodies: ['City Council', 'Planning Commission', 'Board of Zoning Adjustment'], 
    customerDemand: 'Medium' 
  },
  { 
    id: 63, 
    name: 'Cleveland', 
    state: 'OH', 
    type: 'city', 
    popular: false, 
    coverage: 'Active',
    governingBodies: ['City Council', 'City Planning Commission'], 
    customerDemand: 'Medium' 
  },
  { 
    id: 64, 
    name: 'Cincinnati', 
    state: 'OH', 
    type: 'city', 
    popular: false, 
    coverage: 'Active',
    governingBodies: ['City Council', 'Planning Commission'], 
    customerDemand: 'Medium' 
  },
  
  // Michigan
  { 
    id: 65, 
    name: 'Detroit', 
    state: 'MI', 
    type: 'city', 
    popular: false, 
    coverage: 'Active',
    governingBodies: ['City Council', 'Planning Commission', 'Board of Zoning Appeals'], 
    customerDemand: 'Medium' 
  },
  { 
    id: 66, 
    name: 'Grand Rapids', 
    state: 'MI', 
    type: 'city', 
    popular: false, 
    coverage: 'Active',
    governingBodies: ['City Commission', 'Planning Commission'], 
    customerDemand: 'Low' 
  },
  { 
    id: 67, 
    name: 'Ann Arbor', 
    state: 'MI', 
    type: 'city', 
    popular: false, 
    coverage: 'Active',
    governingBodies: ['City Council', 'Planning Commission'], 
    customerDemand: 'Medium' 
  },
  
  // Virginia
  { 
    id: 68, 
    name: 'Virginia Beach', 
    state: 'VA', 
    type: 'city', 
    popular: false, 
    coverage: 'Active',
    governingBodies: ['City Council', 'Planning Commission'], 
    customerDemand: 'Medium' 
  },
  { 
    id: 69, 
    name: 'Arlington', 
    state: 'VA', 
    type: 'county', 
    popular: true, 
    coverage: 'Active',
    governingBodies: ['County Board', 'Planning Commission', 'Board of Zoning Appeals'], 
    customerDemand: 'High' 
  },
  { 
    id: 70, 
    name: 'Richmond', 
    state: 'VA', 
    type: 'city', 
    popular: false, 
    coverage: 'Active',
    governingBodies: ['City Council', 'Planning Commission', 'Board of Zoning Appeals'], 
    customerDemand: 'Medium' 
  },
  { 
    id: 71, 
    name: 'Alexandria', 
    state: 'VA', 
    type: 'city', 
    popular: false, 
    coverage: 'Active',
    governingBodies: ['City Council', 'Planning Commission', 'Board of Architectural Review'], 
    customerDemand: 'High' 
  },
  
  // Oregon
  { 
    id: 72, 
    name: 'Portland', 
    state: 'OR', 
    type: 'city', 
    popular: true, 
    coverage: 'Active',
    governingBodies: ['City Council', 'Planning Commission', 'Design Commission', 'Historic Landmarks Commission'], 
    customerDemand: 'High' 
  },
  { 
    id: 73, 
    name: 'Eugene', 
    state: 'OR', 
    type: 'city', 
    popular: false, 
    coverage: 'Active',
    governingBodies: ['City Council', 'Planning Commission'], 
    customerDemand: 'Low' 
  },
  { 
    id: 74, 
    name: 'Salem', 
    state: 'OR', 
    type: 'city', 
    popular: false, 
    coverage: 'Active',
    governingBodies: ['City Council', 'Planning Commission'], 
    customerDemand: 'Low' 
  },
  
  // Nevada
  { 
    id: 75, 
    name: 'Las Vegas', 
    state: 'NV', 
    type: 'city', 
    popular: true, 
    coverage: 'Active',
    governingBodies: ['City Council', 'Planning Commission', 'Historic Preservation Commission'], 
    customerDemand: 'High' 
  },
  { 
    id: 76, 
    name: 'Henderson', 
    state: 'NV', 
    type: 'city', 
    popular: false, 
    coverage: 'Active',
    governingBodies: ['City Council', 'Planning Commission'], 
    customerDemand: 'Medium' 
  },
  { 
    id: 77, 
    name: 'Reno', 
    state: 'NV', 
    type: 'city', 
    popular: false, 
    coverage: 'Active',
    governingBodies: ['City Council', 'Planning Commission'], 
    customerDemand: 'Medium' 
  },
  
  // Utah
  { 
    id: 78, 
    name: 'Salt Lake City', 
    state: 'UT', 
    type: 'city', 
    popular: true, 
    coverage: 'Active',
    governingBodies: ['City Council', 'Planning Commission', 'Historic Landmark Commission'], 
    customerDemand: 'High' 
  },
  { 
    id: 79, 
    name: 'Provo', 
    state: 'UT', 
    type: 'city', 
    popular: false, 
    coverage: 'Active',
    governingBodies: ['City Council', 'Planning Commission'], 
    customerDemand: 'Low' 
  },
  { 
    id: 80, 
    name: 'Park City', 
    state: 'UT', 
    type: 'city', 
    popular: false, 
    coverage: 'Active',
    governingBodies: ['City Council', 'Planning Commission'], 
    customerDemand: 'Medium' 
  },
  
  // Minnesota
  { 
    id: 81, 
    name: 'Minneapolis', 
    state: 'MN', 
    type: 'city', 
    popular: false, 
    coverage: 'Active',
    governingBodies: ['City Council', 'Planning Commission', 'Board of Adjustment'], 
    customerDemand: 'Medium' 
  },
  { 
    id: 82, 
    name: 'St. Paul', 
    state: 'MN', 
    type: 'city', 
    popular: false, 
    coverage: 'Active',
    governingBodies: ['City Council', 'Planning Commission', 'Board of Zoning Appeals'], 
    customerDemand: 'Medium' 
  },
  
  // Missouri
  { 
    id: 83, 
    name: 'Kansas City', 
    state: 'MO', 
    type: 'city', 
    popular: false, 
    coverage: 'Active',
    governingBodies: ['City Council', 'City Plan Commission', 'Board of Zoning Adjustment'], 
    customerDemand: 'Medium' 
  },
  { 
    id: 84, 
    name: 'St. Louis', 
    state: 'MO', 
    type: 'city', 
    popular: false, 
    coverage: 'Active',
    governingBodies: ['Board of Aldermen', 'Planning Commission', 'Board of Adjustment'], 
    customerDemand: 'Medium' 
  },
  
  // Maryland
  { 
    id: 85, 
    name: 'Baltimore', 
    state: 'MD', 
    type: 'city', 
    popular: false, 
    coverage: 'Active',
    governingBodies: ['City Council', 'Planning Commission', 'Board of Municipal Zoning Appeals'], 
    customerDemand: 'Medium' 
  },
  { 
    id: 86, 
    name: 'Montgomery County', 
    state: 'MD', 
    type: 'county', 
    popular: true, 
    coverage: 'Active',
    governingBodies: ['County Council', 'Planning Board', 'Board of Appeals'], 
    customerDemand: 'High' 
  },
  
  // Wisconsin
  { 
    id: 87, 
    name: 'Milwaukee', 
    state: 'WI', 
    type: 'city', 
    popular: false, 
    coverage: 'Active',
    governingBodies: ['Common Council', 'City Plan Commission', 'Board of Zoning Appeals'], 
    customerDemand: 'Medium' 
  },
  { 
    id: 88, 
    name: 'Madison', 
    state: 'WI', 
    type: 'city', 
    popular: false, 
    coverage: 'Active',
    governingBodies: ['Common Council', 'Plan Commission', 'Urban Design Commission'], 
    customerDemand: 'Medium' 
  },
  
  // Indiana
  { 
    id: 89, 
    name: 'Indianapolis', 
    state: 'IN', 
    type: 'city', 
    popular: false, 
    coverage: 'Active',
    governingBodies: ['City-County Council', 'Metropolitan Development Commission', 'Board of Zoning Appeals'], 
    customerDemand: 'Medium' 
  },
  
  // Connecticut
  { 
    id: 90, 
    name: 'Hartford', 
    state: 'CT', 
    type: 'city', 
    popular: false, 
    coverage: 'Active',
    governingBodies: ['City Council', 'Planning and Zoning Commission'], 
    customerDemand: 'Low' 
  },
  { 
    id: 91, 
    name: 'Stamford', 
    state: 'CT', 
    type: 'city', 
    popular: false, 
    coverage: 'Active',
    governingBodies: ['Board of Representatives', 'Planning Board', 'Zoning Board'], 
    customerDemand: 'Medium' 
  },
  
  // New Jersey
  { 
    id: 92, 
    name: 'Newark', 
    state: 'NJ', 
    type: 'city', 
    popular: false, 
    coverage: 'Active',
    governingBodies: ['Municipal Council', 'Planning Board', 'Zoning Board of Adjustment'], 
    customerDemand: 'Medium' 
  },
  { 
    id: 93, 
    name: 'Jersey City', 
    state: 'NJ', 
    type: 'city', 
    popular: false, 
    coverage: 'Active',
    governingBodies: ['City Council', 'Planning Board', 'Zoning Board'], 
    customerDemand: 'High' 
  },
  
  // Hawaii
  { 
    id: 94, 
    name: 'Honolulu', 
    state: 'HI', 
    type: 'city', 
    popular: false, 
    coverage: 'Active',
    governingBodies: ['City Council', 'Planning Commission', 'Zoning Board of Appeals'], 
    customerDemand: 'Medium' 
  },
  
  // Alaska
  { 
    id: 95, 
    name: 'Anchorage', 
    state: 'AK', 
    type: 'city', 
    popular: false, 
    coverage: 'Active',
    governingBodies: ['Assembly', 'Planning and Zoning Commission'], 
    customerDemand: 'Low' 
  },
  
  // Louisiana
  { 
    id: 96, 
    name: 'New Orleans', 
    state: 'LA', 
    type: 'city', 
    popular: false, 
    coverage: 'Active',
    governingBodies: ['City Council', 'City Planning Commission', 'Board of Zoning Adjustments'], 
    customerDemand: 'Medium' 
  },
  
  // Kentucky
  { 
    id: 97, 
    name: 'Louisville', 
    state: 'KY', 
    type: 'city', 
    popular: false, 
    coverage: 'Active',
    governingBodies: ['Metro Council', 'Planning Commission', 'Board of Zoning Adjustment'], 
    customerDemand: 'Medium' 
  },
  
  // Oklahoma
  { 
    id: 98, 
    name: 'Oklahoma City', 
    state: 'OK', 
    type: 'city', 
    popular: false, 
    coverage: 'Active',
    governingBodies: ['City Council', 'Planning Commission'], 
    customerDemand: 'Low' 
  },
  { 
    id: 99, 
    name: 'Tulsa', 
    state: 'OK', 
    type: 'city', 
    popular: false, 
    coverage: 'Active',
    governingBodies: ['City Council', 'Planning Commission', 'Board of Adjustment'], 
    customerDemand: 'Medium' 
  },
  
  // South Carolina
  { 
    id: 100, 
    name: 'Charleston', 
    state: 'SC', 
    type: 'city', 
    popular: false, 
    coverage: 'Active',
    governingBodies: ['City Council', 'Planning Commission', 'Board of Architectural Review'], 
    customerDemand: 'Medium' 
  }
];