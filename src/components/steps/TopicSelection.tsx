import React from 'react';
import { topicCategories } from '../../data/topics';
import { Filter, ArrowLeft, Sparkles, TrendingUp, Bell, Clock, FileText, Zap } from 'lucide-react';
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
  onBack,
  onNext
}) => {
  
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

      {/* Laptop-optimized split layout */}
      <div className="grid lg:grid-cols-3 gap-8 mb-20">
        {/* Left side - Topic Selection (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Popular Combinations */}
          <div>
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

          {/* Topic Categories - All Expanded */}
          <div className="space-y-6">
            {topicCategories.map(category => {
              const selectedInCategory = category.topics.filter(t => selectedTopics.includes(t.id)).length;
              
              return (
                <div key={category.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  {/* Category Header */}
                  <div className="px-6 py-5 bg-gray-50 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-serif font-bold text-gray-900">{category.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                      </div>
                      {selectedInCategory > 0 && (
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                          {selectedInCategory} selected
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Topics Grid - Always Visible */}
                  <div className="px-6 py-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      {category.topics.map(topic => {
                        const Icon = topic.icon;
                        const isSelected = selectedTopics.includes(topic.id);
                        
                        return (
                          <label
                            key={topic.id}
                            className={`
                              relative rounded-xl border-2 transition-all cursor-pointer
                              ${isSelected
                                ? 'border-[#002147] bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300 bg-white'
                              }
                            `}
                          >
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleTopic(topic.id)}
                              className="sr-only"
                            />
                            <div className="p-5">
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
                                  {topic.examples && (
                                    <div className="mt-3 text-xs text-gray-500">
                                      <span className="font-medium">Examples:</span>
                                      <span className="ml-1">{topic.examples[0]}</span>
                                      {topic.examples.length > 1 && (
                                        <span className="text-blue-600"> +{topic.examples.length - 1} more</span>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right side - Live Preview (1 col) */}
        <div className="lg:col-span-1">
          <div className="sticky top-6 space-y-6">
            {/* Configuration Summary */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Alert configuration</h3>
              
              {selectedTopics.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-8">
                  Select topics to see alert preview
                </p>
              ) : (
                <div className="space-y-4">
                  {/* Selected Topics Summary */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Monitoring {selectedTopics.length} topics</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedTopics.map(topicId => {
                        const topic = topicCategories.flatMap(c => c.topics).find(t => t.id === topicId);
                        if (!topic) return null;
                        return (
                          <span key={topicId} className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                            {topic.name}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                  
                  {/* Alert Frequency */}
                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-[#002147]" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Daily alerts</p>
                        <p className="text-xs text-gray-600">24 hours before meetings</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Example Alert Preview */}
            {selectedTopics.length > 0 && (
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                <div className="flex items-center gap-2 mb-4">
                  <Bell className="w-5 h-5 text-[#002147]" />
                  <h4 className="font-semibold text-gray-900">Example alert preview</h4>
                </div>
                
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-8 h-8 bg-[#002147] rounded-lg flex items-center justify-center flex-shrink-0">
                      <Zap className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h5 className="font-medium text-gray-900 text-sm">3 relevant items for tomorrow's meetings</h5>
                      <p className="text-xs text-gray-600 mt-0.5">Tuesday, January 30, 2025</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {/* Sample agenda items based on selected topics */}
                    {selectedTopics.slice(0, 3).map((topicId, idx) => {
                      const topic = topicCategories.flatMap(c => c.topics).find(t => t.id === topicId);
                      if (!topic || !topic.examples) return null;
                      
                      return (
                        <div key={idx} className="pl-11">
                          <div className="bg-gray-50 rounded-lg p-3">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">
                                  {topic.examples[0].replace('Proposals for', '').replace('Applications for', '')}
                                </p>
                                <p className="text-xs text-gray-600 mt-1">
                                  City Council • Item #{idx + 4}
                                </p>
                              </div>
                              <FileText className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="mt-4 pt-3 border-t border-gray-200">
                    <p className="text-xs text-gray-600">
                      View full agenda and supporting documents →
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* AI Matching Explainer */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-100">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Smart AI matching</h4>
                  <p className="text-sm text-gray-700">
                    Our semantic AI understands context, not just keywords. We'll catch related items even if they use different terminology.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={onNext}
                disabled={selectedTopics.length === 0}
                className={`w-full px-8 py-4 rounded-xl font-semibold transition-all ${
                  selectedTopics.length === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-[#002147] text-white hover:bg-[#003a6b] shadow-md hover:shadow-lg'
                }`}
              >
                Continue to Account
              </button>
              <button
                onClick={onBack}
                className="w-full px-6 py-3 text-gray-700 hover:text-gray-900 font-medium transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Governing Bodies</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};