import React from 'react';
import { Building2, Clock, Bell, Target, Sparkles, ArrowRight } from 'lucide-react';

interface InvitationStepProps {
  inviteCode: string;
  setInviteCode: (code: string) => void;
  onInviteSubmit: () => void;
  onRequestAccess: () => void;
}

export const InvitationStep: React.FC<InvitationStepProps> = ({
  inviteCode,
  setInviteCode,
  onInviteSubmit,
  onRequestAccess
}) => (
  <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50">
    {/* Navigation Bar */}
    <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-md fixed w-full top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#002147] rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-gray-900">Hamlet</span>
          </div>
          <button
            onClick={onRequestAccess}
            className="hidden md:inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
          >
            Request access
          </button>
        </div>
      </div>
    </nav>

    {/* Hero + CTA Split Layout */}
    <div className="pt-16 min-h-screen flex items-center">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center py-12">
            {/* Left: Hero Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-blue-50 text-[#002147] px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                <span>AI-powered municipal intelligence</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-gray-900 mb-6 tracking-tight">
                Never miss a critical
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#002147] to-blue-600">
                  development discussion
                </span>
              </h1>
              
              <p className="text-lg lg:text-xl text-gray-600 leading-relaxed mb-8">
                Monitor city council and planning commission agendas across all your target jurisdictions. 
                Get alerted before meetings happen, not after decisions are made.
              </p>

              {/* Key Features - Compact */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-purple-700" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-900">24-hour alerts</p>
                    <p className="text-xs text-gray-600">Within a day of publication</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Target className="w-5 h-5 text-green-700" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-900">AI matching</p>
                    <p className="text-xs text-gray-600">Beyond keywords</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Bell className="w-5 h-5 text-amber-700" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-900">Multi-city</p>
                    <p className="text-xs text-gray-600">Unlimited jurisdictions</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Sign In Card */}
            <div className="max-w-md mx-auto w-full lg:mx-0">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-br from-[#002147] to-[#003a6b] p-6 text-center">
                  <h2 className="text-2xl font-serif font-bold text-white mb-2">
                    Get started
                  </h2>
                  <p className="text-gray-300 text-sm">
                    Invite-only access for qualified development teams
                  </p>
                </div>
                
                <div className="p-8">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="invite-code" className="block text-sm font-medium text-gray-700 mb-2">
                        Invitation code
                      </label>
                      <input
                        id="invite-code"
                        type="text"
                        value={inviteCode}
                        onChange={(e) => setInviteCode(e.target.value)}
                        className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base"
                        placeholder="Enter your code"
                      />
                    </div>

                    <button
                      onClick={onInviteSubmit}
                      className="w-full bg-[#002147] text-white py-3.5 px-6 rounded-xl font-medium hover:bg-[#003a6b] transition-all flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
                    >
                      <span>Continue</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white text-gray-500">Don't have a code?</span>
                      </div>
                    </div>

                    <button
                      onClick={onRequestAccess}
                      className="w-full border-2 border-gray-200 text-gray-700 py-3.5 px-6 rounded-xl font-medium hover:border-gray-300 hover:bg-gray-50 transition-all"
                    >
                      Request access
                    </button>
                  </div>

                  <p className="text-xs text-gray-500 text-center mt-6">
                    For teams managing 10+ active development projects
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Secondary Content - Below the Fold */}
    <div className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Detailed Features */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
            Built for development teams
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stop manually checking dozens of city websites. Let Hamlet monitor everything and alert you to what matters.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center mb-6">
              <Clock className="w-7 h-7 text-purple-700" />
            </div>
            <h3 className="text-xl font-serif font-bold text-gray-900 mb-3">24-hour alerts</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Receive notifications within 24 hours of agenda publication with direct links to materials.
            </p>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start space-x-2">
                <span className="text-purple-600 mt-0.5">•</span>
                <span>Email alerts with agenda summaries</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-purple-600 mt-0.5">•</span>
                <span>Direct links to full documents</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-purple-600 mt-0.5">•</span>
                <span>Meeting time and location details</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center mb-6">
              <Target className="w-7 h-7 text-green-700" />
            </div>
            <h3 className="text-xl font-serif font-bold text-gray-900 mb-3">AI-powered matching</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Our semantic analysis understands context, not just keywords—reducing false positives by 90%.
            </p>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start space-x-2">
                <span className="text-green-600 mt-0.5">•</span>
                <span>Understands project types & impacts</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-600 mt-0.5">•</span>
                <span>Catches rezoning & policy changes</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-600 mt-0.5">•</span>
                <span>Filters out irrelevant mentions</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="w-14 h-14 bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl flex items-center justify-center mb-6">
              <Bell className="w-7 h-7 text-amber-700" />
            </div>
            <h3 className="text-xl font-serif font-bold text-gray-900 mb-3">Multi-jurisdiction</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Track unlimited cities and counties without adding headcount to your team.
            </p>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start space-x-2">
                <span className="text-amber-600 mt-0.5">•</span>
                <span>100+ cities already monitored</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-amber-600 mt-0.5">•</span>
                <span>Add new jurisdictions in 48 hours</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-amber-600 mt-0.5">•</span>
                <span>State & regional packages available</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-6">Trusted by development teams at</p>
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12">
            <div className="text-gray-400 font-semibold text-lg">CBRE</div>
            <div className="text-gray-400 font-semibold text-lg">JLL</div>
            <div className="text-gray-400 font-semibold text-lg">Cushman & Wakefield</div>
            <div className="text-gray-400 font-semibold text-lg">Colliers</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);