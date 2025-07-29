import React from 'react';
import { Building, Check } from 'lucide-react';

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
  <div className="py-8 sm:py-12 px-4">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3">Development Intelligence Platform</h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-600">Invitation-only access for real estate development teams</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Left Column - Information */}
        <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 border border-gray-200">
          <div className="text-center mb-6">
            <Building className="w-14 h-14 sm:w-16 sm:h-16 text-purple-600 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-3 text-gray-900">Invite-Only Platform</h3>
            <p className="text-gray-600 leading-relaxed">
              Hamlet's Agenda Monitoring helps acquisition and entitlement teams stay ahead of critical local developments
              by flagging relevant topics in upcoming meetings—before they happen.
            </p>
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 border border-gray-200">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Invitation Code</label>
              <input
                type="text"
                placeholder="Enter your invitation code"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
              />
            </div>

            <button
              onClick={onInviteSubmit}
              className="w-full bg-purple-600 text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg font-medium hover:bg-purple-700 transition-colors text-sm sm:text-base shadow-md"
            >
              Access Platform
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <h4 className="font-medium mb-2 text-gray-900">Need an invitation?</h4>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              Request access for your development team. We'll review your application and provide an invitation
              if you qualify for our professional monitoring platform.
            </p>
            <button
              onClick={onRequestAccess}
              className="w-full bg-white text-purple-600 py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg border border-purple-600 hover:bg-purple-50 transition-colors font-medium text-sm sm:text-base"
            >
              Request Invitation
            </button>
          </div>
        </div>
      </div>

      {/* Benefits section */}
      <div className="mt-8">
        <div className="bg-gray-50 p-6 rounded-xl">
          <h4 className="font-semibold mb-4 text-gray-900">Avoid last-minute surprises with:</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center">
              <Check className="w-4 h-4 text-green-600 mr-3 flex-shrink-0" />
              <span>Proactive visibility into discussions before they happen</span>
            </li>
            <li className="flex items-center">
              <Check className="w-4 h-4 text-green-600 mr-3 flex-shrink-0" />
              <span>Time saved by eliminating manual website monitoring</span>
            </li>
            <li className="flex items-center">
              <Check className="w-4 h-4 text-green-600 mr-3 flex-shrink-0" />
              <span>Custom alerts for topics and jurisdictions that matter most</span>
            </li>
            <li className="flex items-center">
              <Check className="w-4 h-4 text-green-600 mr-3 flex-shrink-0" />
              <span>Confidence in coverage without missing relevant updates</span>
            </li>
            <li className="flex items-center">
              <Check className="w-4 h-4 text-green-600 mr-3 flex-shrink-0" />
              <span>No more hunting through PDFs—just open your inbox</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);