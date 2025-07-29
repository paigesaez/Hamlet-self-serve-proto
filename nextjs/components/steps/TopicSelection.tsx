"use client";

import { Card, CardBody, Checkbox, Divider } from "@heroui/react";
import { motion } from "framer-motion";
import { topics } from "@/data/topics";
import { NavigationButtons } from "../shared/NavigationButtons";

interface TopicSelectionProps {
  selectedTopics: string[];
  setSelectedTopics: (topics: string[]) => void;
  selectedLocations: number[];
  getTotalBodies: () => number;
  calculatePrice: () => number;
  onBack: () => void;
  onNext: () => void;
}

export const TopicSelection: React.FC<TopicSelectionProps> = ({
  selectedTopics,
  setSelectedTopics,
  selectedLocations,
  getTotalBodies,
  calculatePrice,
  onBack,
  onNext,
}) => {
  const toggleTopic = (topicId: string) => {
    setSelectedTopics(
      selectedTopics.includes(topicId)
        ? selectedTopics.filter(id => id !== topicId)
        : [...selectedTopics, topicId]
    );
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
            <h2 className="text-2xl font-bold mb-2">Select Topics to Monitor</h2>
            <p className="text-default-600">Choose development topics you want to track across your jurisdictions</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-primary-50">
              <CardBody className="p-4">
                <p className="font-medium text-primary-900 mb-2">AI-Powered Topic Matching:</p>
                <p className="text-sm text-primary-800">
                  Our system uses semantic analysis to identify relevant agenda items, not just keyword matching.
                  This reduces false positives and ensures you don't miss important discussions.
                </p>
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
                <h3 className="font-semibold mb-4">Your Configuration</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-default-600">Jurisdictions</span>
                    <span className="font-medium">{selectedLocations.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-default-600">Governing Bodies</span>
                    <span className="font-medium">{getTotalBodies()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-default-600">Topics</span>
                    <span className="font-medium">{selectedTopics.length}</span>
                  </div>
                  <Divider className="my-3" />
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Monthly Total</span>
                    <span className="text-lg font-bold text-primary">${calculatePrice().toLocaleString()}</span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        </div>

        {/* Right Column - Topic Selection */}
        <div className="space-y-4">
          <div className="space-y-3">
            {topics.map((topic, idx) => {
              const Icon = topic.icon;
              return (
                <motion.div
                  key={topic.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Card
                    isPressable
                    isHoverable
                    className={`transition-all ${
                      selectedTopics.includes(topic.id)
                        ? 'border-primary border-2'
                        : 'border-transparent border-2'
                    }`}
                    onClick={() => toggleTopic(topic.id)}
                  >
                    <CardBody className="p-4">
                      <div className="flex items-start space-x-3">
                        <Icon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <h3 className="font-medium">{topic.name}</h3>
                          <p className="text-sm text-default-600 mt-1">{topic.description}</p>
                        </div>
                        <Checkbox
                          isSelected={selectedTopics.includes(topic.id)}
                          color="primary"
                          size="lg"
                        />
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: topics.length * 0.05 + 0.1 }}
          >
            <Card className="bg-success-50">
              <CardBody className="p-4">
                <p className="font-medium text-success-900 mb-1">Need custom topics?</p>
                <p className="text-sm text-success-800">
                  Our team can configure additional topics during your onboarding consultation.
                </p>
              </CardBody>
            </Card>
          </motion.div>

          <NavigationButtons
            onBack={onBack}
            onNext={onNext}
            nextDisabled={selectedTopics.length === 0}
            nextText="Create Account"
          />
        </div>
      </div>
    </div>
  );
};