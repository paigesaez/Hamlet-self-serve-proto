import React from 'react';
import { Clock, Bell, Target, Sparkles, ArrowRight } from 'lucide-react';

interface InvitationStepProps {
  inviteCode: string;
  setInviteCode: (code: string) => void;
  company: string;
  setCompany: (company: string) => void;
  firstName: string;
  setFirstName: (name: string) => void;
  lastName: string;
  setLastName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (password: string) => void;
  onInviteSubmit: () => void;
  onRequestAccess: () => void;
}

export const InvitationStep: React.FC<InvitationStepProps> = ({
  inviteCode,
  setInviteCode,
  company,
  setCompany,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  onInviteSubmit,
  onRequestAccess
}) => (
  <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50">
    {/* Navigation Bar */}
    <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-md fixed w-full top-0 z-10">
      <div className="container-padding">
        <div className="flex justify-between items-center h-16">
          <a 
            href="/" 
            onClick={(e) => {
              e.preventDefault();
              window.location.reload();
            }}
            className="block"
          >
            <img 
              src="/Hamlet_logo2x.png" 
              alt="Hamlet" 
              width={116} 
              height="auto"
              className="cursor-pointer"
            />
          </a>
          <button
            onClick={onRequestAccess}
            className="hidden"
          >
            Request access
          </button>
        </div>
      </div>
    </nav>

    {/* Hero + CTA Split Layout */}
    <div className="pt-16 min-h-screen flex items-center">
      <div className="w-full">
        <div className="container-padding">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center py-12">
            {/* Left: Hero Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-blue-50 text-[#002147] px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                <span>AI-powered municipal intelligence</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-gray-900 mb-6 tracking-tight leading-[1.2]">
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
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-purple-700" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-900 whitespace-nowrap">24-hour alerts</p>
                    <p className="text-sm text-gray-600">Daily agenda updates</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Target className="w-5 h-5 text-green-700" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-900 whitespace-nowrap">AI matching</p>
                    <p className="text-sm text-gray-600">Smart relevance filtering</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Bell className="w-5 h-5 text-amber-700" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-900 whitespace-nowrap">Multi-jurisdiction</p>
                    <p className="text-sm text-gray-600">Monitor multiple areas</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Sign In Card */}
            <div className="max-w-md mx-auto w-full lg:mx-0">
              <div className="bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-br from-[#002147] to-[#003a6b] p-6 text-center">
                  <h2 className="text-2xl font-serif font-bold text-white mb-2">
                    Create your account
                  </h2>
                  <p className="text-gray-300 text-sm">
                    Invite-only access for qualified professionals
                  </p>
                </div>
                
                <div className="p-8">
                  <div className="space-y-4">
                    {/* Invitation Code */}
                    <div>
                      <label htmlFor="invite-code" className="block text-sm font-medium text-gray-700 mb-2">
                        Invitation code
                      </label>
                      <input
                        id="invite-code"
                        type="text"
                        value={inviteCode}
                        onChange={(e) => setInviteCode(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base"
                        placeholder="Enter your code"
                      />
                    </div>

                    {/* Company */}
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                        Company name
                      </label>
                      <input
                        id="company"
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base"
                        placeholder="Your company"
                      />
                    </div>

                    {/* Name Fields */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-2">
                          First name
                        </label>
                        <input
                          id="first-name"
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base"
                          placeholder="First"
                        />
                      </div>
                      <div>
                        <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 mb-2">
                          Last name
                        </label>
                        <input
                          id="last-name"
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base"
                          placeholder="Last"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Work email
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base"
                        placeholder="you@company.com"
                      />
                    </div>

                    {/* Password */}
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                        Password
                      </label>
                      <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base"
                        placeholder="Create a strong password"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Must be at least 8 characters
                      </p>
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm Password
                      </label>
                      <input
                        id="confirm-password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base"
                        placeholder="Re-enter your password"
                      />
                      {password && confirmPassword && password !== confirmPassword && (
                        <p className="text-xs text-red-600 mt-1">
                          Passwords do not match
                        </p>
                      )}
                    </div>

                    <button
                      onClick={onInviteSubmit}
                      disabled={!inviteCode || !company || !firstName || !lastName || !email || !password || password.length < 8 || password !== confirmPassword}
                      className={`w-full py-3.5 px-6 rounded-lg font-medium transition-all flex items-center justify-center space-x-2 shadow-md ${
                        !inviteCode || !company || !firstName || !lastName || !email || !password || password.length < 8 || password !== confirmPassword
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-[#002147] text-white hover:bg-[#003a6b] hover:shadow-lg'
                      }`}
                    >
                      <span>Create Account</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Secondary Content - Below the Fold */}
    <div className="bg-gray-50 py-20">
      <div className="container-padding">
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
          <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center mb-6">
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

          <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
            <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center mb-6">
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

          <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
            <div className="w-14 h-14 bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg flex items-center justify-center mb-6">
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