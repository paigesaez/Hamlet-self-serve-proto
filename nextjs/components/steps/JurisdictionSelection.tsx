"use client";

import { Card, CardBody, CardHeader, Input, Checkbox, Button, Chip, ScrollShadow } from "@heroui/react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { locations } from "@/data/locations";

interface JurisdictionSelectionProps {
  selectedLocations: number[];
  setSelectedLocations: (locations: number[]) => void;
  selectedBodies: Record<string, string[]>;
  setSelectedBodies: (bodies: Record<string, string[]>) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onNext: () => void;
}

export const JurisdictionSelection: React.FC<JurisdictionSelectionProps> = ({
  selectedLocations,
  setSelectedLocations,
  selectedBodies,
  setSelectedBodies,
  searchTerm,
  setSearchTerm,
  onNext,
}) => {
  const toggleLocation = (locationId: number) => {
    if (selectedLocations.includes(locationId)) {
      setSelectedLocations(selectedLocations.filter(id => id !== locationId));
      const newBodies = { ...selectedBodies };
      delete newBodies[locationId];
      setSelectedBodies(newBodies);
    } else {
      setSelectedLocations([...selectedLocations, locationId]);
      const location = locations.find(l => l.id === locationId);
      setSelectedBodies({
        ...selectedBodies,
        [locationId]: location?.governingBodies || ['City Council']
      });
    }
  };

  const filteredLocations = locations.filter(loc => 
    loc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Left Column - Instructions and Search */}
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-2xl font-bold mb-2">Select Your Jurisdictions</h2>
          <p className="text-default-600">Choose the cities and counties where you need agenda monitoring</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search cities, counties..."
            startContent={<Search className="h-4 w-4 text-default-400" />}
            variant="bordered"
            size="lg"
            classNames={{
              inputWrapper: "border-default-200",
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-primary-50">
            <CardBody className="p-4">
              <p className="font-medium text-primary-900 mb-2">Coverage Status:</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <span className="inline-block w-2 h-2 bg-success-500 rounded-full mt-1.5 flex-shrink-0" />
                  <div>
                    <strong>Active:</strong> Currently available across all jurisdictions where meeting agendas are posted publicly
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="inline-block w-2 h-2 bg-primary-500 rounded-full mt-1.5 flex-shrink-0" />
                  <div>
                    <strong>Available:</strong> Can activate within 1 week
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="inline-block w-2 h-2 bg-warning-500 rounded-full mt-1.5 flex-shrink-0" />
                  <div>
                    <strong>On Request:</strong> Expansion based on customer demand and agenda availability
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      </div>

      {/* Right Column - Location List */}
      <div className="space-y-4">
        <ScrollShadow className="max-h-[500px]">
          <div className="space-y-3 pr-2">
            {filteredLocations.map((location, idx) => (
              <motion.div
                key={location.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card 
                  isPressable
                  isHoverable
                  className={`transition-all ${
                    selectedLocations.includes(location.id)
                      ? 'border-primary border-2'
                      : 'border-transparent border-2'
                  }`}
                  onClick={() => toggleLocation(location.id)}
                >
                  <CardBody className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-medium">{location.name}, {location.state}</h3>
                          <Chip
                            size="sm"
                            variant="flat"
                            color={
                              location.coverage === 'Active' ? 'success' :
                              location.coverage === 'Available' ? 'primary' :
                              'warning'
                            }
                          >
                            {location.coverage}
                          </Chip>
                          {location.popular && (
                            <Chip size="sm" variant="flat" color="secondary">
                              Popular
                            </Chip>
                          )}
                        </div>
                        <p className="text-sm text-default-600">
                          {location.governingBodies.join(', ')}
                        </p>
                        <p className="text-xs text-default-500 mt-1">
                          Customer demand: {location.customerDemand}
                        </p>
                      </div>
                      <Checkbox
                        isSelected={selectedLocations.includes(location.id)}
                        color="primary"
                        size="lg"
                      />
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </ScrollShadow>

        <div className="flex justify-between items-center pt-4">
          <p className="text-sm text-default-600">
            {selectedLocations.length} jurisdiction{selectedLocations.length !== 1 ? 's' : ''} selected
          </p>
          <Button
            color="primary"
            onPress={onNext}
            isDisabled={selectedLocations.length === 0}
            endContent={<span>→</span>}
          >
            Select Governing Bodies
          </Button>
        </div>
      </div>
    </div>
  );
};