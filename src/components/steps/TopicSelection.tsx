import React, { useState } from 'react';
import { topicCategories } from '../../data/topics';
import { Filter, ArrowLeft, ChevronRight, Sparkles, TrendingUp, AlertCircle } from 'lucide-react';
import { StepHeader } from '../shared/StepHeader';

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
}) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>('residential');
  const [showExamples, setShowExamples] = useState<string | null>(null);
  
  // Popular combinations
  const popularCombos = [
    {
      id: 'residential-dev',
      name: 'Residential Developer',
      topics: ['housing', 'mixed-use', 'affordable', 'impact-fees', 'zoning'],
      description: 'Track housing projects and related policies'
    },
    {
      id: 'commercial-dev',
      name: 'Commercial Developer',
      topics: ['retail', 'office', 'hospitality', 'impact-fees', 'transportation'],
      description: 'Monitor retail and office developments'
    },
    {
      id: 'industrial-focus',
      name: 'Industrial & Logistics',
      topics: ['industrial', 'logistics', 'data-center', 'utilities', 'transportation'],
      description: 'Focus on warehouses and infrastructure'
    }
  ];
  
  const applyCombo = (topics: string[]) => {
    // Clear all first
    selectedTopics.forEach(topic => toggleTopic(topic));
    // Then apply new selection
    topics.forEach(topic => toggleTopic(topic));
  };
  
  return (
    <>
      <StepHeader 
        icon={Filter} 
        title="Select monitoring topics" 
        subtitle="Choose what types of development activities you want to track"
      />

      {/* Popular Combinations */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 text-purple-600" />
          <h3 className="text-sm font-semibold text-gray-900">Popular combinations</h3>
        </div>
        <div className="grid lg:grid-cols-3 gap-4">
          {popularCombos.map(combo => {
            const isActive = combo.topics.every(t => selectedTopics.includes(t));
            return (
              <button
                key={combo.id}
                onClick={() => applyCombo(combo.topics)}
                className={`p-5 rounded-xl border-2 text-left transition-all ${
                  isActive 
                    ? 'border-purple-500 bg-purple-50' 
                    : 'border-gray-200 hover:border-gray-300 bg-white hover:shadow-sm'
                }`}
              >
                <h4 className="font-semibold text-gray-900 mb-1">{combo.name}</h4>
                <p className="text-sm text-gray-600 mb-3">{combo.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{combo.topics.length} topics</span>
                  {isActive && (
                    <span className="text-xs font-medium text-purple-600">Active</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Topic Categories */}
      <div className="space-y-4 mb-20">
        {topicCategories.map(category => {
          const isExpanded = expandedCategory === category.id;
          const selectedInCategory = category.topics.filter(t => selectedTopics.includes(t.id)).length;
          
          return (
            <div key={category.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Category Header */}
              <button
                onClick={() => setExpandedCategory(isExpanded ? null : category.id)}
                className="w-full px-6 py-5 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-serif font-bold text-gray-900">{category.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {selectedInCategory > 0 && (
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        {selectedInCategory} selected
                      </span>
                    )}
                    <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${
                      isExpanded ? 'rotate-90' : ''
                    }`} />
                  </div>
                </div>
              </button>
              
              {/* Expanded Topics */}
              {isExpanded && (
                <div className="px-6 pb-6 border-t border-gray-100">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 pt-6">
                    {category.topics.map(topic => {
                      const Icon = topic.icon;
                      const isSelected = selectedTopics.includes(topic.id);
                      const isShowingExamples = showExamples === topic.id;
                      
                      return (
                        <div
                          key={topic.id}
                          className={`
                            relative rounded-xl border-2 transition-all
                            ${isSelected
                              ? 'border-[#002147] bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300 bg-white'
                            }
                          `}
                        >
                          <label className="block p-5 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleTopic(topic.id)}
                              className="sr-only"
                            />
                            <div className="flex items-start gap-3">
                              <div className={`
                                w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0
                                ${isSelected 
                                  ? 'bg-gradient-to-br from-[#002147] to-[#003a6b]' 
                                  : 'bg-gray-100'
                                }
                              `}>
                                <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-gray-600'}`} />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-900">{topic.name}</h4>
                                <p className="text-sm text-gray-600 mt-1">{topic.description}</p>
                              </div>
                            </div>
                          </label>
                          
                          {/* Examples Button */}
                          {topic.examples && (
                            <button
                              onClick={() => setShowExamples(isShowingExamples ? null : topic.id)}
                              className="w-full px-5 pb-5 text-left"
                            >
                              <div className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium">
                                <AlertCircle className="w-3 h-3" />
                                <span>See examples</span>
                                <ChevronRight className={`w-3 h-3 transition-transform ${
                                  isShowingExamples ? 'rotate-90' : ''
                                }`} />
                              </div>
                            </button>
                          )}
                          
                          {/* Examples Dropdown */}
                          {isShowingExamples && topic.examples && (
                            <div className="px-5 pb-5">
                              <div className="bg-gray-50 rounded-lg p-3 space-y-1">
                                <p className="text-xs font-medium text-gray-700 mb-2">You'll be alerted to:</p>
                                {topic.examples.map((example, idx) => (
                                  <p key={idx} className="text-xs text-gray-600 flex items-start gap-1">
                                    <span className="text-gray-400 mt-0.5">•</span>
                                    {example}
                                  </p>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* AI Matching Explainer */}
      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-100 mb-20">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">How our AI matching works</h4>
            <p className="text-sm text-gray-700 mb-3">
              Unlike keyword searches, our semantic AI understands context and relationships. 
              For example, selecting "Multifamily Housing" will catch:
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-0.5">✓</span>
                <span>Apartment complex proposals even if they don't use the word "multifamily"</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-0.5">✓</span>
                <span>Density bonus discussions that impact housing development</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-0.5">✓</span>
                <span>Related parking requirement changes for residential projects</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Sticky Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 lg:px-12 xl:px-20 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 px-6 py-3 text-gray-700 hover:text-gray-900 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          
          <div className="flex items-center gap-4">
            <p className="text-sm text-gray-600">
              ${calculatePrice()}/mo • {selectedTopics.length} topics
            </p>
            <button
              onClick={onNext}
              disabled={selectedTopics.length === 0}
              className={`px-8 py-3 rounded-xl font-semibold transition-all ${
                selectedTopics.length === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-[#002147] text-white hover:bg-[#003a6b] shadow-md hover:shadow-lg'
              }`}
            >
              Continue to Account
            </button>
          </div>
        </div>
      </div>
    </>
  );
};