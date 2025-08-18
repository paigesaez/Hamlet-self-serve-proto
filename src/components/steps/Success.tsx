import React, { useMemo } from 'react';
import { CheckCircle, Mail, Calendar, Bell, ArrowRight } from 'lucide-react';
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-8 py-12">
        
        {/* Success Message */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            Your free trial is active!
          </h1>
          <p className="text-lg text-gray-600">
            You're now monitoring {subscriptionSummary.totalCities} jurisdictions across {subscriptionSummary.totalBodies} governing bodies
          </p>
        </div>

        {/* Key Information Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          
          {/* Jurisdictions */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
            <div className="text-3xl font-bold text-[#002147] mb-2">
              {subscriptionSummary.totalCities}
            </div>
            <div className="text-sm text-gray-600 mb-3">Jurisdictions</div>
            <div className="text-xs text-gray-500 space-y-1">
              {Object.entries(subscriptionSummary.byState).map(([state]) => (
                <div key={state}>{getStateName(state)}</div>
              ))}
            </div>
          </div>

          {/* Topics */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
            <div className="text-3xl font-bold text-[#002147] mb-2">
              5
            </div>
            <div className="text-sm text-gray-600 mb-3">Topics Monitored</div>
            <div className="text-xs text-gray-500 space-y-1">
              <div>Industrial</div>
              <div>Housing</div>
              <div>Multifamily</div>
              <div>Impact Fees</div>
              <div>Data Centers</div>
            </div>
          </div>

          {/* Alerts */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
            <div className="text-3xl font-bold text-[#002147] mb-2">
              24hr
            </div>
            <div className="text-sm text-gray-600 mb-3">Alert Speed</div>
            <div className="text-xs text-gray-500 space-y-1">
              <div>Email notifications</div>
              <div>Direct agenda links</div>
              <div>AI-powered matching</div>
            </div>
          </div>
        </div>

        {/* What Happens Next */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-10">
          <h3 className="font-semibold text-gray-900 mb-4 text-center">
            What happens next
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-1">Check your email</h4>
              <p className="text-sm text-gray-600">
                Login credentials sent
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Bell className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-1">Alerts active</h4>
              <p className="text-sm text-gray-600">
                Monitoring has begun
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-1">Setup call</h4>
              <p className="text-sm text-gray-600">
                We'll reach out in 24hrs
              </p>
            </div>
          </div>
        </div>

        {/* Primary Action */}
        <div className="text-center">
          <button className="px-8 py-3 bg-[#002147] text-white rounded-lg font-medium hover:bg-[#003a6b] transition-all">
            Go to Dashboard
            <ArrowRight className="w-4 h-4 inline ml-2" />
          </button>
          <p className="text-sm text-gray-500 mt-4">
            Questions? Contact support@myhamlet.com
          </p>
        </div>
      </div>
    </div>
  );
};