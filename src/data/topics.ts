import { Home, CreditCard, Factory, Zap, Building, Trees, Truck, Store, Map, School, Car, Briefcase } from 'lucide-react';
import { Topic } from '../types';

export const topicCategories = [
  {
    id: 'residential',
    name: 'Residential Development',
    description: 'Housing and mixed-use projects',
    topics: [
      { 
        id: 'housing', 
        name: 'Multifamily Housing', 
        icon: Home, 
        description: 'Apartment complexes, condos, townhomes',
        examples: ['New 200-unit apartment complex', 'Affordable housing projects', 'Senior living facilities']
      },
      { 
        id: 'mixed-use', 
        name: 'Mixed-Use Development', 
        icon: Building, 
        description: 'Combined residential and commercial',
        examples: ['Live-work spaces', 'Retail with apartments above', 'Transit-oriented development']
      },
      { 
        id: 'affordable', 
        name: 'Affordable Housing', 
        icon: Home, 
        description: 'Below-market rate housing initiatives',
        examples: ['Inclusionary zoning changes', 'Housing trust fund allocations', 'Density bonus programs']
      }
    ]
  },
  {
    id: 'commercial',
    name: 'Commercial & Retail',
    description: 'Business and retail developments',
    topics: [
      { 
        id: 'retail', 
        name: 'Retail Centers', 
        icon: Store, 
        description: 'Shopping centers, big box stores',
        examples: ['New shopping plaza proposals', 'Big box retailer applications', 'Restaurant developments']
      },
      { 
        id: 'office', 
        name: 'Office Development', 
        icon: Briefcase, 
        description: 'Office buildings and business parks',
        examples: ['Corporate campus expansions', 'Medical office buildings', 'Co-working spaces']
      },
      { 
        id: 'hospitality', 
        name: 'Hotels & Hospitality', 
        icon: Building, 
        description: 'Hotels, motels, event venues',
        examples: ['Hotel construction permits', 'Conference center proposals', 'Tourism development']
      }
    ]
  },
  {
    id: 'industrial',
    name: 'Industrial & Infrastructure',
    description: 'Industrial and tech infrastructure',
    topics: [
      { 
        id: 'industrial', 
        name: 'Industrial Real Estate', 
        icon: Factory, 
        description: 'Warehouses, manufacturing, logistics',
        examples: ['Distribution center approvals', 'Manufacturing facility permits', 'Industrial park rezoning']
      },
      { 
        id: 'data-center', 
        name: 'Data Centers', 
        icon: Zap, 
        description: 'Tech infrastructure and data centers',
        examples: ['Data center power allocations', 'Cooling system permits', 'Fiber optic installations']
      },
      { 
        id: 'logistics', 
        name: 'Logistics & Distribution', 
        icon: Truck, 
        description: 'Fulfillment centers, last-mile delivery',
        examples: ['Amazon facility proposals', 'Cold storage warehouses', 'Truck terminal permits']
      }
    ]
  },
  {
    id: 'policy',
    name: 'Policy & Regulations',
    description: 'Development policies and fees',
    topics: [
      { 
        id: 'impact-fees', 
        name: 'Impact Fees', 
        icon: CreditCard, 
        description: 'Development fees and assessments',
        examples: ['Fee schedule updates', 'New impact fee studies', 'Infrastructure cost allocations']
      },
      { 
        id: 'zoning', 
        name: 'Zoning Changes', 
        icon: Map, 
        description: 'Rezoning and land use updates',
        examples: ['General plan amendments', 'Zoning code updates', 'Overlay district creation']
      },
      { 
        id: 'environmental', 
        name: 'Environmental Reviews', 
        icon: Trees, 
        description: 'CEQA, NEPA, and sustainability',
        examples: ['EIR certifications', 'Mitigation measures', 'Climate action plans']
      }
    ]
  },
  {
    id: 'infrastructure',
    name: 'Public Infrastructure',
    description: 'Transportation and utilities',
    topics: [
      { 
        id: 'transportation', 
        name: 'Transportation Projects', 
        icon: Car, 
        description: 'Roads, transit, parking',
        examples: ['Traffic impact studies', 'Parking requirement changes', 'Transit expansion plans']
      },
      { 
        id: 'utilities', 
        name: 'Utility Infrastructure', 
        icon: Zap, 
        description: 'Water, sewer, power capacity',
        examples: ['Utility capacity assessments', 'Infrastructure upgrade plans', 'Service area expansions']
      },
      { 
        id: 'schools', 
        name: 'School & Public Facilities', 
        icon: School, 
        description: 'Schools, parks, civic buildings',
        examples: ['School site acquisitions', 'Park dedications', 'Community center proposals']
      }
    ]
  }
];

// Flatten topics for backward compatibility
export const topics: Topic[] = topicCategories.flatMap(category => 
  category.topics.map(topic => ({
    ...topic,
    categoryId: category.id,
    categoryName: category.name
  }))
);