"use client";

import { Card, CardBody, CardHeader, Checkbox, ScrollShadow, Divider } from "@heroui/react";
import { Building } from "lucide-react";
import { motion } from "framer-motion";
import { locations } from "@/data/locations";
import { NavigationButtons } from "../shared/NavigationButtons";

interface GoverningBodySelectionProps {
  selectedLocations: number[];
  selectedBodies: Record<string, string[]>;
  setSelectedBodies: (bodies: Record<string, string[]>) => void;
  getTotalBodies: () => number;
  calculatePrice: () => number;
  onBack: () => void;
  onNext: () => void;
}

export const GoverningBodySelection: React.FC<GoverningBodySelectionProps> = ({
  selectedLocations,
  selectedBodies,
  setSelectedBodies,
  getTotalBodies,
  calculatePrice,
  onBack,
  onNext,
}) => {
  const toggleBody = (locationId: number, body: string) => {
    setSelectedBodies({
      ...selectedBodies,
      [locationId]: selectedBodies[locationId]?.includes(body)
        ? selectedBodies[locationId].filter(b => b !== body)
        : [...(selectedBodies[locationId] || []), body]
    });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Left Column - Instructions */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-2xl font-bold mb-2">Select Governing Bodies</h2>
            <p className="text-default-600">Choose which governing bodies to monitor in each jurisdiction</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-primary-50">
              <CardBody className="p-4">
                <p className="font-medium text-primary-900 mb-2">Common Governing Bodies:</p>
                <ul className="space-y-1 text-sm text-primary-800">
                  <li>• <strong>City Council:</strong> Primary legislative body for municipal decisions</li>
                  <li>• <strong>Planning Commission:</strong> Reviews development proposals and zoning changes</li>
                  <li>• <strong>Board of Supervisors:</strong> County-level governing body</li>
                  <li>• <strong>Zoning Board:</strong> Handles variances and special permits</li>
                </ul>
              </CardBody>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardBody className="p-6">
                <h3 className="font-semibold mb-4">Pricing Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-default-600">Total Governing Bodies</span>
                    <span className="font-medium">{getTotalBodies()}</span>
                  </div>
                  <Divider />
                  <div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">Monthly Cost</span>
                      <span className="text-lg font-bold text-primary">${calculatePrice().toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-default-500 mt-1">$1,000 per 20 governing bodies</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        </div>

        {/* Right Column - Body Selection */}
        <div className="space-y-4">
          <ScrollShadow className="max-h-[500px]">
            <div className="space-y-4 pr-2">
              {selectedLocations.map((locationId, idx) => {
                const location = locations.find(l => l.id === locationId);
                if (!location) return null;

                return (
                  <motion.div
                    key={locationId}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Card>
                      <CardBody className="p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Building className="w-5 h-5 text-default-600" />
                          <h3 className="font-medium">{location.name}, {location.state}</h3>
                        </div>
                        <div className="space-y-2">
                          {location.governingBodies.map(body => (
                            <Checkbox
                              key={body}
                              isSelected={selectedBodies[locationId]?.includes(body) || false}
                              onValueChange={() => toggleBody(locationId, body)}
                              color="primary"
                              className="w-full"
                            >
                              <span className="text-default-700">{body}</span>
                            </Checkbox>
                          ))}
                        </div>
                      </CardBody>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </ScrollShadow>

          <NavigationButtons
            onBack={onBack}
            onNext={onNext}
            nextDisabled={getTotalBodies() === 0}
            nextText="Select Topics"
          />
        </div>
      </div>
    </div>
  );
};