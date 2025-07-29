import React from 'react';
import { topics } from '../../data/topics';
import { Filter, ArrowLeft } from 'lucide-react';

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
  <>
    <div className="max-w-5xl mx-auto">
    {/* Header */}
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl mb-4">
        <Filter className="w-8 h-8 text-green-700" />
      </div>
      <h2 className="text-3xl font-serif text-gray-900 mb-3">
        Select monitoring topics
      </h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Choose development topics you want to track across your jurisdictions
      </p>
    </div>

    {/* AI Info */}
    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-5 mb-8 max-w-3xl mx-auto">
      <div className="flex items-center justify-center space-x-3">
        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
          <span className="text-2xl">🤖</span>
        </div>
        <div>
          <p className="text-sm font-semibold text-emerald-900">AI-Powered Matching</p>
          <p className="text-sm text-emerald-800 mt-0.5">
            Our semantic analysis understands context, not just keywords—reducing false positives by 90%
          </p>
        </div>
      </div>
    </div>

    {/* Topic Grid */}
    <div className="grid md:grid-cols-2 gap-4 mb-8">
      {topics.map(topic => {
        const Icon = topic.icon;
        const isSelected = selectedTopics.includes(topic.id);
        
        return (
          <label
            key={topic.id}
            className={`
              relative flex items-start p-6 rounded-2xl border-2 cursor-pointer transition-all
              ${isSelected
                ? 'border-green-500 bg-gradient-to-br from-green-50 to-green-100/50 shadow-md'
                : 'border-gray-200 hover:border-gray-300 bg-white hover:shadow-sm'
              }
            `}
          >
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => toggleTopic(topic.id)}
              className="w-5 h-5 text-green-600 border-2 border-gray-300 rounded focus:ring-2 focus:ring-green-500 mt-1"
            />
            <div className="ml-4 flex-1">
              <div className="flex items-start space-x-3">
                <div className={`
                  w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0
                  ${isSelected 
                    ? 'bg-gradient-to-br from-green-400 to-green-500' 
                    : 'bg-gradient-to-br from-gray-100 to-gray-200'
                  }
                `}>
                  <Icon className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-gray-600'}`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-lg">{topic.name}</h3>
                  <p className="text-sm text-gray-600 mt-1 leading-relaxed">{topic.description}</p>
                </div>
              </div>
            </div>
          </label>
        );
      })}
    </div>

    {/* Summary Card */}
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 mb-8 border border-gray-200">
      <h3 className="font-semibold text-gray-900 mb-4">Your monitoring configuration</h3>
      <div className="grid grid-cols-4 gap-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">{selectedLocations.length}</p>
          <p className="text-xs text-gray-600 mt-1">Jurisdictions</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">{getTotalBodies()}</p>
          <p className="text-xs text-gray-600 mt-1">Gov Bodies</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">{selectedTopics.length}</p>
          <p className="text-xs text-gray-600 mt-1">Topics</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-blue-600">${calculatePrice()}/mo</p>
          <p className="text-xs text-gray-600 mt-1">Total Cost</p>
        </div>
      </div>
    </div>

    </div>
    
    {/* Sticky Footer */}
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 px-6 py-3 text-gray-700 hover:text-gray-900 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          
          <div className="flex items-center space-x-6">
            <div className="text-right">
              <p className="text-2xl font-semibold text-gray-900">
                ${calculatePrice()}/mo
              </p>
              <p className="text-sm text-gray-600">
                {selectedTopics.length} topics • {getTotalBodies()} bodies
              </p>
            </div>
            <button
              onClick={onNext}
              disabled={selectedTopics.length === 0}
              className={`px-8 py-3 rounded-xl font-semibold transition-all ${
                selectedTopics.length === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg'
              }`}
            >
              Continue to Account
            </button>
          </div>
        </div>
      </div>
    </div>
  </>
);