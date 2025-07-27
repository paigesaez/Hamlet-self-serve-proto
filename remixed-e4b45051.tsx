import { Building, Check, CheckCircle, CreditCard, Factory, Home, Mail, Search, User, Zap } from 'lucide-react';
import React, { useState } from 'react';

// Mock data - real estate focused
const locations = [
  { id: 1, name: 'San Francisco', state: 'CA', type: 'city', popular: true, coverage: 'Active',
    governingBodies: ['City Council', 'Planning Commission'], customerDemand: 'High' },
  { id: 2, name: 'Oakland', state: 'CA', type: 'city', popular: true, coverage: 'Active',
    governingBodies: ['City Council', 'Planning Commission'], customerDemand: 'High' },
  { id: 3, name: 'Berkeley', state: 'CA', type: 'city', popular: false, coverage: 'Active',
    governingBodies: ['City Council', 'Planning Commission'], customerDemand: 'Medium' },
  { id: 4, name: 'Los Angeles', state: 'CA', type: 'city', popular: true, coverage: 'Active',
    governingBodies: ['City Council', 'Planning Commission'], customerDemand: 'High' },
  { id: 5, name: 'Sacramento', state: 'CA', type: 'city', popular: false, coverage: 'Available',
    governingBodies: ['City Council', 'Planning Commission'], customerDemand: 'Medium' },
  { id: 6, name: 'Fresno', state: 'CA', type: 'city', popular: false, coverage: 'On Request',
    governingBodies: ['City Council', 'Planning Commission'], customerDemand: 'Low' }
];

const topics = [
  { id: 'housing', name: 'New Multifamily Housing', icon: Home, description: 'Multifamily projects, zoning changes, housing initiatives' },
  { id: 'impact-fees', name: 'Impact Fees', icon: CreditCard, description: 'Development impact fees, fee schedules, fee studies' },
  { id: 'industrial', name: 'Industrial Real Estate', icon: Factory, description: 'Industrial zoning, logistics facilities, manufacturing' },
  { id: 'data-center', name: 'Data Center', icon: Zap, description: 'Data center development, tech infrastructure projects' }
];

// Email Capture Component - moved outside to prevent recreation on each render
interface EmailCaptureProps {
  email: string;
  setEmail: (email: string) => void;
  onBack: () => void;
  onNext: () => void;
}

const EmailCapture: React.FC<EmailCaptureProps> = ({ email, setEmail, onBack, onNext }) => (
  <div className="max-w-6xl mx-auto">
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Left Column - Information */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Account Setup</h2>
          <p className="text-gray-600">Create your account to receive alerts delivered within 24 hours of agenda publication</p>
        </div>
        
        <div className="bg-blue-50 p-4 sm:p-6 rounded-xl">
          <h3 className="font-semibold mb-4 text-gray-900">What you'll receive:</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center">
              <Check className="w-4 h-4 text-blue-600 mr-3 flex-shrink-0" />
              <span>Email alerts within 24 hours of agenda publication</span>
            </li>
            <li className="flex items-center">
              <Check className="w-4 h-4 text-blue-600 mr-3 flex-shrink-0" />
              <span>Full agenda item language with highlighted matches</span>
            </li>
            <li className="flex items-center">
              <Check className="w-4 h-4 text-blue-600 mr-3 flex-shrink-0" />
              <span>Direct links to meeting materials and documents</span>
            </li>
            <li className="flex items-center">
              <Check className="w-4 h-4 text-blue-600 mr-3 flex-shrink-0" />
              <span>Meeting date, time, and location information</span>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Right Column - Form */}
      <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
        <div className="text-center mb-6">
          <Mail className="w-16 h-16 text-[#002147] mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900">Enter Your Email</h3>
        </div>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Work email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002147] focus:border-[#002147]"
          />
          
          <div className="bg-blue-50 p-4 rounded-lg text-sm">
            <p className="font-medium text-blue-900 mb-2">Email Notification Format:</p>
            <p className="text-blue-800">
              Each alert includes the agenda item language, matched topic, and direct link to full agenda materials.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:justify-between mt-6">
            <button
              onClick={onBack}
              className="px-4 sm:px-6 py-2.5 sm:py-2 rounded-lg font-medium transition-colors w-full sm:w-auto text-sm sm:text-base bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              ← Back
            </button>
            <button
              onClick={onNext}
              disabled={!email || !email.includes('@')}
              className={`px-4 sm:px-6 py-2.5 sm:py-2 rounded-lg font-medium transition-colors w-full sm:w-auto text-sm sm:text-base ${
                !email || !email.includes('@')
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-[#002147] text-white hover:bg-[#003a6b]'
              }`}
            >
              Add Billing Info →
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Billing Info Component - moved outside to prevent recreation on each render
interface BillingInfoData {
  company: string;
  firstName: string;
  lastName: string;
  phone: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

interface BillingInfoProps {
  billingInfo: BillingInfoData;
  setBillingInfo: React.Dispatch<React.SetStateAction<BillingInfoData>>;
  selectedLocations: number[];
  selectedTopics: string[];
  selectedBodies: Record<string, string[]>;
  getTotalBodies: () => number;
  calculatePrice: () => number;
  onBack: () => void;
  onNext: () => void;
}

const BillingInfo: React.FC<BillingInfoProps> = ({ 
  billingInfo, 
  setBillingInfo, 
  selectedLocations, 
  selectedTopics,
  selectedBodies,
  getTotalBodies,
  calculatePrice,
  onBack,
  onNext 
}) => (
  <div className="max-w-6xl mx-auto">
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Left Column - Pricing Summary */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Billing Information</h2>
          <p className="text-gray-600">Complete setup to begin tracking development opportunities</p>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="font-semibold mb-4 text-gray-900">Your Subscription Summary</h3>
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
              <span className="text-gray-600">Topics Monitored</span>
              <span className="font-medium">{selectedTopics.length}</span>
            </div>
            <div className="border-t pt-3 mt-3">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Monthly Total</span>
                <span className="text-lg font-bold text-[#002147]">${calculatePrice().toLocaleString()}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Volume pricing: $1,000 per 20 governing bodies</p>
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg text-sm">
          <p className="font-medium text-green-900 mb-2">Built for Scale:</p>
          <p className="text-green-800">
            Track multiple cities without adding headcount. Volume discounts available as coverage scales.
          </p>
        </div>
      </div>
      
      {/* Right Column - Form */}
      <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
        <div className="text-center mb-6">
          <CreditCard className="w-16 h-16 text-[#002147] mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900">Payment Details</h3>
        </div>

        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First name"
              value={billingInfo.firstName}
              onChange={(e) => setBillingInfo(prev => ({ ...prev, firstName: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002147]"
            />
            <input
              type="text"
              placeholder="Last name"
              value={billingInfo.lastName}
              onChange={(e) => setBillingInfo(prev => ({ ...prev, lastName: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002147]"
            />
          </div>

          <input
            type="text"
            placeholder="Company name"
            value={billingInfo.company}
            onChange={(e) => setBillingInfo(prev => ({ ...prev, company: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002147]"
          />

          <input
            type="tel"
            placeholder="Phone number"
            value={billingInfo.phone}
            onChange={(e) => setBillingInfo(prev => ({ ...prev, phone: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002147]"
          />

          <div className="border-t pt-6">
            <h3 className="font-semibold mb-4">Payment Information</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Card number"
                value={billingInfo.cardNumber}
                onChange={(e) => setBillingInfo(prev => ({ ...prev, cardNumber: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002147]"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={billingInfo.expiryDate}
                  onChange={(e) => setBillingInfo(prev => ({ ...prev, expiryDate: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002147]"
                />
                <input
                  type="text"
                  placeholder="CVV"
                  value={billingInfo.cvv}
                  onChange={(e) => setBillingInfo(prev => ({ ...prev, cvv: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002147]"
                />
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:justify-between mt-6">
            <button
              onClick={onBack}
              className="px-4 sm:px-6 py-2.5 sm:py-2 rounded-lg font-medium transition-colors w-full sm:w-auto text-sm sm:text-base bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              ← Back
            </button>
            <button
              onClick={onNext}
              disabled={!billingInfo.firstName || !billingInfo.lastName || !billingInfo.company || !billingInfo.cardNumber}
              className={`px-4 sm:px-6 py-2.5 sm:py-2 rounded-lg font-medium transition-colors w-full sm:w-auto text-sm sm:text-base ${
                !billingInfo.firstName || !billingInfo.lastName || !billingInfo.company || !billingInfo.cardNumber
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-[#002147] text-white hover:bg-[#003a6b]'
              }`}
            >
              Complete Setup →
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default function InviteBasedFlow() {
  const [step, setStep] = useState(1);
  const [selectedLocations, setSelectedLocations] = useState<number[]>([]);
  const [selectedBodies, setSelectedBodies] = useState<Record<string, string[]>>({});
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [email, setEmail] = useState('');
  
  // Log initial state
  React.useEffect(() => {
    console.log('=== HAMLET FLOW INITIALIZED ===');
    console.log('Initial Step:', step);
  }, []);
  
  // Log step changes
  React.useEffect(() => {
    console.log('🔄 Step changed to:', step);
    const stepNames: Record<number, string> = {
      1: 'Home/Invite Code',
      3: 'Invalid Code',
      4: 'Request Access',
      6: 'Setup Complete',
      7: 'Access Request Submitted',
      10: 'Select Jurisdictions',
      11: 'Select Governing Bodies',
      12: 'Select Topics',
      13: 'Email Capture',
      14: 'Billing Information'
    };
    console.log('Step Name:', stepNames[step] || 'Unknown');
  }, [step]);
  
  // Log selection changes
  React.useEffect(() => {
    if (selectedLocations.length > 0) {
      console.log('📍 Selected Locations:', selectedLocations);
      console.log('Location Names:', selectedLocations.map(id => 
        locations.find(l => l.id === id)?.name
      ).join(', '));
    }
  }, [selectedLocations]);
  
  React.useEffect(() => {
    if (Object.keys(selectedBodies).length > 0) {
      console.log('🏛️ Selected Bodies:', selectedBodies);
      console.log('Total Bodies Count:', getTotalBodies());
    }
  }, [selectedBodies]);
  
  React.useEffect(() => {
    if (selectedTopics.length > 0) {
      console.log('📋 Selected Topics:', selectedTopics);
      console.log('Topic Names:', selectedTopics.map(id => 
        topics.find(t => t.id === id)?.name
      ).join(', '));
    }
  }, [selectedTopics]);
  
  React.useEffect(() => {
    if (email) {
      console.log('📧 Email entered:', email);
    }
  }, [email]);
  
  React.useEffect(() => {
    if (inviteCode) {
      console.log('🎫 Invite code entered:', inviteCode);
    }
  }, [inviteCode]);
  
  React.useEffect(() => {
    const hasData = billingInfo.firstName || billingInfo.lastName || billingInfo.company || billingInfo.cardNumber;
    if (hasData) {
      console.log('💳 Billing info updated:', billingInfo);
      console.log('Price calculation:', `$${calculatePrice().toLocaleString()}/month`);
    }
  }, [billingInfo]);
  
  const [billingInfo, setBillingInfo] = useState({
    company: '',
    firstName: '',
    lastName: '',
    phone: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const getTotalBodies = () => {
    return Object.values(selectedBodies).reduce((total: number, bodies: string[]) => total + (bodies?.length || 0), 0);
  };

  const calculatePrice = () => {
    const totalBodies = getTotalBodies();
    return Math.ceil(totalBodies / 20) * 1000; // $1,000 per 20 governing bodies
  };

  const resetFlow = () => {
    setStep(1);
    setSelectedLocations([]);
    setSelectedBodies({});
    setSelectedTopics([]);
    setEmail('');
    setInviteCode('');
    setBillingInfo({
      company: '',
      firstName: '',
      lastName: '',
      phone: '',
      cardNumber: '',
      expiryDate: '',
      cvv: ''
    });
  };

  const TopNavigation = () => (
    <div className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <button
          onClick={resetFlow}
          className="flex items-center space-x-2 text-[#002147] hover:text-[#003a6b] font-medium text-sm sm:text-base"
        >
          <Building className="w-5 h-5 flex-shrink-0" />
          <span className="truncate max-w-[180px] sm:max-w-none">Hamlet Agenda Monitoring</span>
        </button>

        {step !== 1 && step !== 6 && step !== 7 && (
          <button
            onClick={() => setStep(1)}
            className="text-gray-600 hover:text-gray-800 text-xs sm:text-sm whitespace-nowrap"
          >
            ← Back to Home
          </button>
        )}
      </div>
    </div>
  );

  const getStepInfo = (currentStep: number) => {
    const steps = [
      { number: 1, title: 'Invitation', active: currentStep === 1 },
      { number: 2, title: 'Coverage', active: currentStep >= 10 && currentStep <= 12 },
      { number: 3, title: 'Account', active: currentStep === 13 },
      { number: 4, title: 'Billing', active: currentStep === 14 },
      { number: 5, title: 'Complete', active: currentStep === 6 }
    ];
    return steps;
  };

  const StepIndicator = ({ currentStep }: { currentStep: number }) => {
    const steps = getStepInfo(currentStep);
    return (
      <div className="flex justify-center mb-6 sm:mb-8 px-4">
        <div className="flex items-center space-x-2 sm:space-x-4">
          {steps.map((stepInfo, index) => (
            <div key={stepInfo.number} className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full text-xs sm:text-sm font-medium ${
                stepInfo.active
                  ? 'bg-[#002147] text-white'
                  : index < steps.findIndex(s => s.active)
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-600'
              }`}>
                {index < steps.findIndex(s => s.active) ? (
                  <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                ) : (
                  stepInfo.number
                )}
              </div>
              <span className={`ml-2 text-xs sm:text-sm hidden sm:inline ${
                stepInfo.active ? 'text-[#002147] font-medium' : 'text-gray-500'
              }`}>
                {stepInfo.title}
              </span>
              {index < steps.length - 1 && (
                <div className={`w-3 sm:w-8 h-0.5 ml-1 sm:ml-4 ${
                  index < steps.findIndex(s => s.active) ? 'bg-green-500' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const NavigationButtons = ({
    onBack,
    onNext,
    backDisabled = false,
    nextDisabled = false,
    nextText = "Continue"
  }: {
    onBack: () => void;
    onNext: () => void;
    backDisabled?: boolean;
    nextDisabled?: boolean;
    nextText?: string;
  }) => (
    <div className="flex flex-col sm:flex-row gap-3 sm:justify-between mt-6">
      <button
        onClick={onBack}
        disabled={backDisabled}
        className={`px-4 sm:px-6 py-2.5 sm:py-2 rounded-lg font-medium transition-colors w-full sm:w-auto text-sm sm:text-base ${
          backDisabled
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        ← Back
      </button>
      <button
        onClick={onNext}
        disabled={nextDisabled}
        className={`px-4 sm:px-6 py-2.5 sm:py-2 rounded-lg font-medium transition-colors w-full sm:w-auto text-sm sm:text-base ${
          nextDisabled
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-[#002147] text-white hover:bg-[#003a6b]'
        }`}
      >
        {nextText} →
      </button>
    </div>
  );

  // Coverage Builder Component
  const CoverageBuilder = () => {
    const toggleLocation = (locationId: number) => {
      if (selectedLocations.includes(locationId)) {
        setSelectedLocations(prev => prev.filter(id => id !== locationId));
        setSelectedBodies(prev => ({ ...prev, [locationId]: undefined }));
      } else {
        setSelectedLocations(prev => [...prev, locationId]);
        const location = locations.find(l => l.id === locationId);
        setSelectedBodies(prev => ({
          ...prev,
          [locationId]: location?.governingBodies || ['City Council']
        }));
      }
    };

    const toggleBody = (locationId: number, body: string) => {
      setSelectedBodies(prev => {
        const current = prev[locationId] || [];
        const updated = current.includes(body)
          ? current.filter(b => b !== body)
          : [...current, body];
        return { ...prev, [locationId]: updated };
      });
    };

    const getTotalBodies = () => {
      return Object.values(selectedBodies).reduce((total: number, bodies: string[]) => total + (bodies?.length || 0), 0);
    };

    const calculatePrice = () => {
      const totalBodies = getTotalBodies();
      return Math.ceil(totalBodies / 20) * 1000; // $1,000 per 20 governing bodies
    };

    // Step 1: Select Jurisdictions
    if (step === 10) {
      return (
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left Column - Instructions and Search */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Your Jurisdictions</h2>
              <p className="text-gray-600">Choose the cities and counties where you need agenda monitoring</p>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search cities, counties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002147] focus:border-[#002147]"
              />
            </div>

            <div className="bg-blue-50 p-4 rounded-lg text-sm">
              <p className="font-medium text-blue-900 mb-2">Coverage Status:</p>
              <div className="space-y-1 text-blue-800">
                <p><span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span><strong>Active:</strong> Currently available across all jurisdictions where meeting agendas are posted publicly</p>
                <p><span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2"></span><strong>Available:</strong> Can activate within 1 week</p>
                <p><span className="inline-block w-2 h-2 bg-orange-500 rounded-full mr-2"></span><strong>On Request:</strong> Expansion based on customer demand and agenda availability</p>
              </div>
            </div>
          </div>

          {/* Right Column - Location List */}
          <div className="space-y-4">
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
              {locations
                .filter(loc => loc.name.toLowerCase().includes(searchTerm.toLowerCase()))
                .map(location => (
                  <div
                    key={location.id}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedLocations.includes(location.id)
                        ? 'border-[#002147] bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => toggleLocation(location.id)}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-medium">{location.name}, {location.state}</h3>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            location.coverage === 'Active' ? 'bg-green-100 text-green-800' :
                            location.coverage === 'Available' ? 'bg-blue-100 text-blue-800' :
                            'bg-orange-100 text-orange-800'
                          }`}>
                            {location.coverage}
                          </span>
                          {location.popular && (
                            <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                              Popular
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 capitalize">
                          {location.type} • {location.customerDemand} demand • {location.governingBodies.length} governing bodies
                        </p>
                      </div>
                      <div className="flex items-center ml-4">
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                          selectedLocations.includes(location.id)
                            ? 'border-[#002147] bg-[#002147]'
                            : 'border-gray-300'
                        }`}>
                          {selectedLocations.includes(location.id) && (
                            <Check className="w-3 h-3 text-white" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>

            {selectedLocations.length > 0 && (
              <div className="bg-white border border-gray-200 p-6 rounded-lg">
                <h3 className="font-semibold mb-4">Selected Jurisdictions ({selectedLocations.length})</h3>
                <div className="space-y-3 mb-4">
                  {selectedLocations.map(locId => {
                    const location = locations.find(l => l.id === locId);
                    return (
                      <div key={locId} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                        <div>
                          <span className="font-medium">{location?.name}</span>
                          <span className="text-sm text-gray-500 ml-2">({location?.governingBodies.length} bodies)</span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleLocation(locId);
                          }}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    );
                  })}
                </div>
                <NavigationButtons
                  onBack={() => setStep(1)}
                  onNext={() => setStep(11)}
                  nextText="Select Governing Bodies"
                  nextDisabled={selectedLocations.length === 0}
                />
              </div>
            )}
          </div>
        </div>
      );
    }

    // Step 2: Select Governing Bodies
    if (step === 11) {
      return (
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left Column - Instructions */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Governing Bodies</h2>
              <p className="text-gray-600">Select which governing bodies to monitor (City Council and Planning Commission recommended)</p>
            </div>

            <div className="bg-[#002147] bg-opacity-5 p-6 rounded-lg">
              <h3 className="font-semibold mb-3">Coverage Summary</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>{selectedLocations.length}</strong> jurisdictions
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>{getTotalBodies()}</strong> governing bodies
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 mb-2">Volume pricing:</p>
                  <p className="text-lg font-bold text-[#002147]">
                    ${calculatePrice().toLocaleString()}/month
                  </p>
                  <p className="text-xs text-gray-500">
                    $1,000 per 20 governing bodies
                  </p>
                </div>
              </div>

              <NavigationButtons
                onBack={() => setStep(10)}
                onNext={() => setStep(12)}
                nextText="Select Topics"
                nextDisabled={getTotalBodies() === 0}
              />
            </div>
          </div>

          {/* Right Column - Governing Bodies Selection */}
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
            {selectedLocations.map(locId => {
              const location = locations.find(l => l.id === locId);
              return (
                <div key={locId} className="bg-white border border-gray-200 p-6 rounded-lg">
                  <h3 className="font-semibold mb-4">{location?.name}, {location?.state}</h3>
                  <div className="grid gap-3">
                    {location?.governingBodies.map(body => (
                      <label key={body} className="flex items-center space-x-3 cursor-pointer p-2 rounded hover:bg-gray-50">
                        <input
                          type="checkbox"
                          checked={selectedBodies[locId]?.includes(body) || false}
                          onChange={() => toggleBody(locId, body)}
                          className="w-4 h-4 text-[#002147] rounded focus:ring-[#002147] border-gray-300"
                        />
                        <span className="text-sm">{body}</span>
                      </label>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    // Step 3: Select Topics
    if (step === 12) {
      return (
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left Column - Instructions and Summary */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Topics</h2>
              <p className="text-gray-600">Select the development topics you want to monitor (cross-topic tracking available)</p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg text-sm">
              <p className="font-medium text-blue-900 mb-2">AI-Powered Topic Matching:</p>
              <p className="text-blue-800">
                Our model interprets meaning from full agenda items, not just keywords—ensuring more accurate matches
                and reducing false positives.
              </p>
            </div>

            {selectedTopics.length > 0 && (
              <div className="bg-white border border-gray-200 p-6 rounded-lg">
                <h3 className="font-semibold mb-4">Selected Topics ({selectedTopics.length})</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedTopics.map(topicId => {
                    const topic = topics.find(t => t.id === topicId);
                    return (
                      <span key={topicId} className="bg-[#002147] bg-opacity-10 text-[#002147] px-3 py-1 rounded-full text-sm">
                        {topic?.name}
                      </span>
                    );
                  })}
                </div>

                <NavigationButtons
                  onBack={() => setStep(11)}
                  onNext={() => setStep(13)}
                  nextText="Create Account"
                  nextDisabled={selectedTopics.length === 0}
                />
              </div>
            )}
          </div>

          {/* Right Column - Topic Selection */}
          <div className="grid gap-4">
            {topics.map(topic => {
              const Icon = topic.icon;
              const isSelected = selectedTopics.includes(topic.id);
              return (
                <div
                  key={topic.id}
                  className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
                    isSelected
                      ? 'border-[#002147] bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => {
                    if (isSelected) {
                      setSelectedTopics(prev => prev.filter(id => id !== topic.id));
                    } else {
                      setSelectedTopics(prev => [...prev, topic.id]);
                    }
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg ${
                      isSelected ? 'bg-[#002147] bg-opacity-10' : 'bg-gray-100'
                    }`}>
                      <Icon className={`w-6 h-6 ${
                        isSelected ? 'text-[#002147]' : 'text-gray-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">{topic.name}</h3>
                      <p className="text-sm text-gray-600">{topic.description}</p>
                    </div>
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                      isSelected
                        ? 'border-[#002147] bg-[#002147]'
                        : 'border-gray-300'
                    }`}>
                      {isSelected && (
                        <Check className="w-3 h-3 text-white" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    return null;
  };


  // Billing Information Step
  const BillingInfo = () => (
    <div className="max-w-6xl mx-auto">
      <div className="grid gap-8 lg:grid-cols-2">
      {/* Left Column - Pricing Summary */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Billing Information</h2>
          <p className="text-gray-600">Complete setup to begin tracking development opportunities</p>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="font-semibold mb-4 text-gray-900">Your Subscription Summary</h3>
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
              <span className="text-gray-600">Topics Monitored</span>
              <span className="font-medium">{selectedTopics.length}</span>
            </div>
            <div className="border-t pt-3 mt-3">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Monthly Total</span>
                <span className="text-lg font-bold text-[#002147]">${calculatePrice().toLocaleString()}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Volume pricing: $1,000 per 20 governing bodies</p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg text-sm">
          <p className="font-medium text-green-900 mb-2">Built for Scale:</p>
          <p className="text-green-800">
            Track multiple cities without adding headcount. Volume discounts available as coverage scales.
          </p>
        </div>
      </div>

      {/* Right Column - Form */}
      <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
        <div className="text-center mb-6">
          <CreditCard className="w-16 h-16 text-[#002147] mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900">Payment Details</h3>
        </div>

        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First name"
              value={billingInfo.firstName}
              onChange={(e) => setBillingInfo(prev => ({ ...prev, firstName: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002147]"
            />
            <input
              type="text"
              placeholder="Last name"
              value={billingInfo.lastName}
              onChange={(e) => setBillingInfo(prev => ({ ...prev, lastName: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002147]"
            />
          </div>

          <input
            type="text"
            placeholder="Company name"
            value={billingInfo.company}
            onChange={(e) => setBillingInfo(prev => ({ ...prev, company: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002147]"
          />

          <input
            type="tel"
            placeholder="Phone number"
            value={billingInfo.phone}
            onChange={(e) => setBillingInfo(prev => ({ ...prev, phone: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002147]"
          />

          <div className="border-t pt-6">
            <h3 className="font-semibold mb-4">Payment Information</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Card number"
                value={billingInfo.cardNumber}
                onChange={(e) => setBillingInfo(prev => ({ ...prev, cardNumber: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002147]"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={billingInfo.expiryDate}
                  onChange={(e) => setBillingInfo(prev => ({ ...prev, expiryDate: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002147]"
                />
                <input
                  type="text"
                  placeholder="CVV"
                  value={billingInfo.cvv}
                  onChange={(e) => setBillingInfo(prev => ({ ...prev, cvv: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002147]"
                />
              </div>
            </div>
          </div>

          <NavigationButtons
            onBack={() => setStep(13)}
            onNext={() => setStep(6)}
            nextText="Complete Setup"
            nextDisabled={!billingInfo.firstName || !billingInfo.lastName || !billingInfo.company || !billingInfo.cardNumber}
          />
        </div>
      </div>
    </div>
    </div>
  );

  // Coverage builder integration
  if (step >= 10 && step <= 12) {
    return (
      <div className="min-h-screen bg-gray-50">
        <TopNavigation />
        <div className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <StepIndicator currentStep={step} />
            <CoverageBuilder />
          </div>
        </div>
      </div>
    );
  }

  // Email capture
  if (step === 13) {
    return (
      <div className="min-h-screen bg-gray-50">
        <TopNavigation />
        <div className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <StepIndicator currentStep={step} />
            <EmailCapture 
              email={email}
              setEmail={setEmail}
              onBack={() => setStep(12)}
              onNext={() => setStep(14)}
            />
          </div>
        </div>
      </div>
    );
  }

  // Billing info
  if (step === 14) {
    return (
      <div className="min-h-screen bg-gray-50">
        <TopNavigation />
        <div className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <StepIndicator currentStep={step} />
            <BillingInfo />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <TopNavigation />

      {step === 1 && (
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
                    onClick={() => {
                      if (inviteCode.toLowerCase().includes('demo') || inviteCode.toLowerCase().includes('trial')) {
                        setStep(10);
                      } else {
                        setStep(3);
                      }
                    }}
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
                    onClick={() => setStep(4)}
                    className="w-full bg-white text-purple-600 py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg border border-purple-600 hover:bg-purple-50 transition-colors font-medium text-sm sm:text-base"
                  >
                    Request Invitation
                  </button>
                </div>
              </div>
            </div> {/* Close grid */}

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
      )}

      {step === 3 && (
        <div className="py-12 px-4">
          <div className="max-w-md mx-auto">
            <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-red-800 mb-2">Invalid Invitation Code</h2>
                <p className="text-red-700">The invitation code you entered is not valid or has expired</p>
              </div>

              <div className="bg-red-50 p-4 rounded-lg mb-6 border border-red-200">
                <h3 className="font-semibold mb-3 text-red-800">Common Issues:</h3>
                <ul className="text-sm space-y-2 text-red-700">
                  <li>• Code may have been mistyped</li>
                  <li>• Invitation may have expired</li>
                  <li>• Code may have already been used</li>
                </ul>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => setStep(1)}
                  className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-red-700 transition-colors"
                >
                  Try Different Code
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="w-full bg-white text-red-600 py-3 px-6 rounded-lg border border-red-600 hover:bg-red-50 transition-colors font-medium"
                >
                  Request New Invitation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Left Column - Information */}
              <div>
                <div className="text-center md:text-left mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-3">Request Platform Access</h2>
                  <p className="text-lg text-gray-600">Tell us about your development team's monitoring needs</p>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="font-semibold mb-4 text-gray-900">Who Qualifies for Access:</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <Check className="w-4 h-4 text-blue-600 mr-3 flex-shrink-0" />
                      <span>Entitlement teams managing multiple jurisdictions</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 text-blue-600 mr-3 flex-shrink-0" />
                      <span>Land acquisition teams tracking development opportunities</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 text-blue-600 mr-3 flex-shrink-0" />
                      <span>Regional development leads overseeing market intelligence</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 text-blue-600 mr-3 flex-shrink-0" />
                      <span>Development consultants serving multiple clients</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Right Column - Form */}
              <div className="bg-white shadow-lg rounded-2xl p-8">
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Company name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002147] focus:border-[#002147] transition-colors"
                  />
                  <input
                    type="email"
                    placeholder="Work email address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002147] focus:border-[#002147] transition-colors"
                  />
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002147] focus:border-[#002147] transition-colors">
                    <option value="">Select your team type</option>
                    <option value="entitlements">Entitlements Team</option>
                    <option value="acquisition">Land Acquisition Team</option>
                    <option value="development">Regional Development</option>
                    <option value="consulting">Development Consulting</option>
                    <option value="other">Other</option>
                  </select>
                  <textarea
                    placeholder="Describe your development monitoring needs: How many jurisdictions do you currently track? What topics are most important to your projects?"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002147] focus:border-[#002147] transition-colors resize-none"
                  />

                  <button
                    onClick={() => setStep(7)}
                    className="w-full bg-[#002147] text-white py-4 px-6 rounded-lg font-medium hover:bg-[#003a6b] transition-colors text-lg shadow-md"
                  >
                    Submit Access Request
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {step === 6 && (
        <div className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl mx-auto">
              <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
                <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-green-800 mb-3">Setup Complete!</h2>
                <p className="text-green-700 mb-6 leading-relaxed">
                  Your development intelligence monitoring is now active. You'll receive your first alerts within 24 hours.
                </p>

                <div className="bg-gray-50 p-6 rounded-xl mb-6">
                  <h3 className="font-semibold mb-4 text-gray-900">What happens next:</h3>
                  <div className="space-y-3 text-sm text-left">
                    <div className="flex items-center gap-3">
                      <span className="bg-[#002147] text-white w-6 h-6 rounded-full text-xs flex items-center justify-center flex-shrink-0">1</span>
                      <span>AI begins monitoring your selected jurisdictions and topics</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="bg-[#002147] text-white w-6 h-6 rounded-full text-xs flex items-center justify-center flex-shrink-0">2</span>
                      <span>Receive email alerts when relevant agenda items are published</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="bg-[#002147] text-white w-6 h-6 rounded-full text-xs flex items-center justify-center flex-shrink-0">3</span>
                      <span>Customer success team will schedule onboarding call</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="bg-[#002147] text-white w-6 h-6 rounded-full text-xs flex items-center justify-center flex-shrink-0">4</span>
                      <span>Fine-tune topic filters based on initial results</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800 leading-relaxed">
                    <strong>Pro tip:</strong> Your first week includes complimentary consultation to optimize topic filtering for your specific development focus.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}

      {step === 7 && (
        <div className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl mx-auto">
              <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
                <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-10 h-10 text-[#002147]" />
                </div>
                <h2 className="text-2xl font-bold text-[#002147] mb-3">Access Request Submitted</h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Thank you for your interest in our development intelligence platform.
                </p>

                <div className="bg-gray-50 p-6 rounded-xl mb-6">
                  <h3 className="font-semibold mb-4 text-gray-900">What happens next:</h3>
                  <div className="space-y-3 text-sm text-left">
                    <div className="flex items-center gap-3">
                      <span className="bg-[#002147] text-white w-6 h-6 rounded-full text-xs flex items-center justify-center flex-shrink-0">1</span>
                      <span>We'll review your development team's needs within 24 hours</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="bg-[#002147] text-white w-6 h-6 rounded-full text-xs flex items-center justify-center flex-shrink-0">2</span>
                      <span>Qualified development teams receive an invitation code</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="bg-[#002147] text-white w-6 h-6 rounded-full text-xs flex items-center justify-center flex-shrink-0">3</span>
                      <span>Use your code to configure monitoring for your projects</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-sm text-[#002147] leading-relaxed">
                    <strong>Note:</strong> Platform access is limited to ensure quality service for each development team.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}
