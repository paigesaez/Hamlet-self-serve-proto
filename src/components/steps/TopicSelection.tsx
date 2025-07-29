import React from 'react';
import { topics } from '../../data/topics';
import { NavigationButtons } from '../shared/NavigationButtons';

interface TopicSelectionProps {
  selectedTopics: string[];
  toggleTopic: (topicId: string) => void;
  selectedLocations: number[];
  getTotalBodies: () => number;
  calculatePrice: () => number;
  onBack: () => void;
  onNext: () => void;
}

export const TopicSelection: React.FC<TopicSelectionProps> = ({
  selectedTopics,
  toggleTopic,
  selectedLocations,
  getTotalBodies,
  calculatePrice,
  onBack,
  onNext
}) => (
  <div className="max-w-6xl mx-auto">
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Left Column - Instructions */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Topics to Monitor</h2>
          <p className="text-gray-600">Choose development topics you want to track across your jurisdictions</p>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg text-sm">
          <p className="font-medium text-blue-900 mb-2">AI-Powered Topic Matching:</p>
          <p className="text-blue-800">
            Our system uses semantic analysis to identify relevant agenda items, not just keyword matching.
            This reduces false positives and ensures you don't miss important discussions.
          </p>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="font-semibold mb-4 text-gray-900">Your Configuration</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Jurisdictions</span>
              <span className="font-medium">{selectedLocations.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Governing Bodies</span>
              <span className="font-medium">{getTotalBodies()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Topics</span>
              <span className="font-medium">{selectedTopics.length}</span>
            </div>
            <div className="border-t pt-3">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Monthly Total</span>
                <span className="text-lg font-bold text-[#002147]">${calculatePrice().toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Topic Selection */}
      <div className="space-y-4">
        <div className="space-y-3">
          {topics.map(topic => {
            const Icon = topic.icon;
            return (
              <div
                key={topic.id}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedTopics.includes(topic.id)
                    ? 'border-[#002147] bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => toggleTopic(topic.id)}
              >
                <div className="flex items-start space-x-3">
                  <Icon className="w-5 h-5 text-[#002147] mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{topic.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{topic.description}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={selectedTopics.includes(topic.id)}
                    onChange={() => {}}
                    className="w-5 h-5 text-[#002147] rounded border-gray-300 focus:ring-[#002147]"
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-green-50 p-4 rounded-lg text-sm">
          <p className="font-medium text-green-900 mb-1">Need custom topics?</p>
          <p className="text-green-800">
            Our team can configure additional topics during your onboarding consultation.
          </p>
        </div>

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