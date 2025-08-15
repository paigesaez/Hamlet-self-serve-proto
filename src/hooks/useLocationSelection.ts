import { useState } from 'react';
import { locations } from '../data/locations';

// Custom hook for location selection state management
export const useLocationSelection = () => {
  const [selectedLocations, setSelectedLocations] = useState<number[]>([]);
  const [selectedBodies, setSelectedBodies] = useState<Record<string, string[]>>({});
  const [searchTerm, setSearchTerm] = useState('');
  
  const toggleLocation = (locationId: number) => {
    if (selectedLocations.includes(locationId)) {
      setSelectedLocations(prev => prev.filter(id => id !== locationId));
      setSelectedBodies(prev => {
        const updated = { ...prev };
        delete updated[locationId];
        return updated;
      });
    } else {
      setSelectedLocations(prev => [...prev, locationId]);
      const location = locations.find(l => l.id === locationId);
      // Automatically select all governing bodies for the location
      setSelectedBodies(prev => ({
        ...prev,
        [locationId]: location?.governingBodies || ['City Council']
      }));
    }
  };
  
  const resetLocationSelection = () => {
    setSelectedLocations([]);
    setSelectedBodies({});
    setSearchTerm('');
  };
  
  return {
    selectedLocations,
    setSelectedLocations,
    selectedBodies,
    setSelectedBodies,
    searchTerm,
    setSearchTerm,
    toggleLocation,
    resetLocationSelection,
  };
};