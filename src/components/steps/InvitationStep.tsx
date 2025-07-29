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
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    {/* Navigation Bar */}
    <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-md fixed w-full top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-gray-900">Hamlet</span>
          </div>
        </div>
      </div>
    </nav>

    {/* Main Content */}
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>AI-powered municipal intelligence</span>
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-serif text-gray-900 mb-6 tracking-tight">
            Never miss a critical
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
              development discussion
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Monitor city council and planning commission agendas across all your target jurisdictions. 
            Get alerted before meetings happen, not after decisions are made.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-purple-700" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">24-hour alerts</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Receive notifications within 24 hours of agenda publication with direct links to materials
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-green-700" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">AI-powered matching</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Semantic understanding catches relevant items that keyword searches miss
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl flex items-center justify-center mb-4">
              <Bell className="w-6 h-6 text-amber-700" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Multi-jurisdiction</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Track unlimited cities and counties without adding headcount to your team
            </p>
          </div>
        </div>

        {/* Sign In Card */}
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 text-center">
              <h2 className="text-2xl font-semibold text-white mb-2">
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter your code"
                  />
                </div>

                <button
                  onClick={onInviteSubmit}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
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
                  className="w-full border-2 border-gray-200 text-gray-700 py-3 px-6 rounded-xl font-medium hover:border-gray-300 hover:bg-gray-50 transition-all"
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

        {/* Trust Indicators */}
        <div className="text-center mt-12">
          <p className="text-sm text-gray-500 mb-4">Trusted by development teams at</p>
          <div className="flex items-center justify-center space-x-8 opacity-60">
            <div className="text-gray-400 font-semibold">CBRE</div>
            <div className="text-gray-400 font-semibold">JLL</div>
            <div className="text-gray-400 font-semibold">Cushman & Wakefield</div>
            <div className="text-gray-400 font-semibold">Colliers</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);