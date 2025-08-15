import React, { useMemo } from 'react';
import { CheckCircle, Mail, Calendar, Bell, MapPin, Building2, ArrowRight } from 'lucide-react';
import { locations } from '../../data/locations';
import { getStateName } from '../../utils/states';

interface SuccessProps {
  selectedLocations?: number[];
}

export const Success: React.FC<SuccessProps> = ({ selectedLocations = [] }) => {
  // Calculate subscription summary
  const subscriptionSummary = useMemo(() => {
    const summary: {
      totalCities: number;
      totalBodies: number;
      byState: Record<string, {
        name: string;
        cities: Array<{ name: string; region?: string; bodies: string[] }>;
      }>;
    } = {
      totalCities: selectedLocations.length,
      totalBodies: 0,
      byState: {}
    };

    selectedLocations.forEach(locId => {
      const location = locations.find(loc => loc.id === locId);
      if (location) {
        summary.totalBodies += location.governingBodies.length;
        
        if (!summary.byState[location.state]) {
          summary.byState[location.state] = {
            name: location.state,
            cities: []
          };
        }
        
        summary.byState[location.state].cities.push({
          name: location.name,
          region: location.region,
          bodies: location.governingBodies
        });
      }
    });

    return summary;
  }, [selectedLocations]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-lg mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-3">
            Welcome to Hamlet
          </h1>
          <p className="text-xl text-gray-600">
            Your monitoring is now active
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left side - Subscription Details */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Subscription Summary */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-serif font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                Your Active Subscriptions
              </h2>
              
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-3xl font-bold text-gray-900">{subscriptionSummary.totalCities}</div>
                  <div className="text-sm text-gray-600">Jurisdictions</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-3xl font-bold text-gray-900">{subscriptionSummary.totalBodies}</div>
                  <div className="text-sm text-gray-600">Governing Bodies</div>
                </div>
              </div>

              {/* Detailed breakdown by state */}
              <div className="space-y-4">
                {Object.entries(subscriptionSummary.byState).map(([state, data]) => (
                  <div key={state} className="border-t pt-4">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {getStateName(state)}
                    </h3>
                    <div className="space-y-2">
                      {data.cities.map((city, idx) => (
                        <div key={idx} className="flex items-start gap-3 text-sm">
                          <Building2 className="w-4 h-4 text-gray-400 mt-0.5" />
                          <div className="flex-1">
                            <span className="font-medium text-gray-900">{city.name}</span>
                            {city.region && (
                              <span className="text-gray-500"> • {city.region}</span>
                            )}
                            <div className="text-xs text-gray-500 mt-1">
                              {city.bodies.join(', ')}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* What Happens Next */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-serif font-bold text-gray-900 mb-4">
                What happens next
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Confirmation email sent</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Check your inbox for login credentials and a detailed summary of your subscriptions
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Bell className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Alerts begin immediately</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      You'll receive email alerts as soon as relevant agenda items are published
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Onboarding consultation</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Our team will contact you within 24 hours to schedule your setup call
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Quick Actions */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-6">
              
              {/* Primary Action */}
              <button className="w-full py-4 px-6 bg-[#002147] text-white rounded-lg font-medium hover:bg-[#003a6b] transition-all flex items-center justify-center gap-2">
                Go to Dashboard
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* What's Included */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">What's included</h3>
                <ul className="space-y-2 text-sm text-blue-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>All agenda items for selected jurisdictions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>24-hour advance notifications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Direct links to full agendas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>AI-powered relevance matching</span>
                  </li>
                </ul>
              </div>

              {/* Support Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Need help?</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Our team is here to ensure you get maximum value from Hamlet
                </p>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-500">Email:</span>
                    <span className="text-gray-900 ml-1">support@hamlet.ai</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Response time:</span>
                    <span className="text-gray-900 ml-1">Within 2 hours</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};