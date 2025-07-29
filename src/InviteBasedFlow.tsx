import { useState } from 'react';
import { BillingInfoData } from './types';
import { locations } from './data/locations';
import { getTotalBodies, calculatePrice } from './utils/pricing';

// Import all step components
import { InvitationStep } from './components/steps/InvitationStep';
import { InvalidCode } from './components/steps/InvalidCode';
import { RequestAccess } from './components/steps/RequestAccess';
import { Success } from './components/steps/Success';
import { RequestSubmitted } from './components/steps/RequestSubmitted';
import { JurisdictionSelection } from './components/steps/JurisdictionSelection';
import { GoverningBodySelection } from './components/steps/GoverningBodySelection';
import { TopicSelection } from './components/steps/TopicSelection';
import { EmailCapture } from './components/steps/EmailCapture';
import { BillingInfo } from './components/steps/BillingInfo';

// Import shared components
import { TopNavigation } from './components/shared/TopNavigation';
import { StepIndicator } from './components/shared/StepIndicator';

export default function InviteBasedFlow() {
  const [step, setStep] = useState(1);
  const [selectedLocations, setSelectedLocations] = useState<number[]>([]);
  const [selectedBodies, setSelectedBodies] = useState<Record<string, string[]>>({});
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [email, setEmail] = useState('');
  const [billingInfo, setBillingInfo] = useState<BillingInfoData>({
    company: '',
    firstName: '',
    lastName: '',
    phone: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const resetFlow = () => {
    setStep(1);
    setSelectedLocations([]);
    setSelectedBodies({});
    setSelectedTopics([]);
    setSearchTerm('');
    setInviteCode('');
    setEmail('');
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

  const toggleTopic = (topicId: string) => {
    setSelectedTopics(prev =>
      prev.includes(topicId)
        ? prev.filter(id => id !== topicId)
        : [...prev, topicId]
    );
  };

  const handleInviteSubmit = () => {
    if (inviteCode.toLowerCase().includes('demo') || inviteCode.toLowerCase().includes('trial')) {
      setStep(10);
    } else {
      setStep(3);
    }
  };

  const getTotalBodiesWrapper = () => getTotalBodies(selectedBodies);
  const calculatePriceWrapper = () => calculatePrice(getTotalBodiesWrapper());

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavigation step={step} resetFlow={resetFlow} setStep={setStep} />

      {/* Step 1: Invitation */}
      {step === 1 && (
        <InvitationStep
          inviteCode={inviteCode}
          setInviteCode={setInviteCode}
          onInviteSubmit={handleInviteSubmit}
          onRequestAccess={() => setStep(4)}
        />
      )}

      {/* Step 3: Invalid Code */}
      {step === 3 && (
        <InvalidCode
          onBack={() => setStep(1)}
          onRequestAccess={() => setStep(4)}
        />
      )}

      {/* Step 4: Request Access */}
      {step === 4 && (
        <RequestAccess
          onBack={() => setStep(1)}
          onSubmit={() => setStep(7)}
        />
      )}

      {/* Step 6: Success */}
      {step === 6 && <Success />}

      {/* Step 7: Request Submitted */}
      {step === 7 && (
        <RequestSubmitted
          onBack={() => setStep(1)}
        />
      )}

      {/* Coverage Flow Steps (10-14) */}
      {(step >= 10 && step <= 14) && (
        <>
          <StepIndicator currentStep={step} />
          <div className="py-8 px-4">
            <div className="max-w-7xl mx-auto">
              {/* Step 10: Jurisdiction Selection */}
              {step === 10 && (
                <JurisdictionSelection
                  selectedLocations={selectedLocations}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  toggleLocation={toggleLocation}
                  onNext={() => setStep(11)}
                />
              )}

              {/* Step 11: Governing Body Selection */}
              {step === 11 && (
                <GoverningBodySelection
                  selectedLocations={selectedLocations}
                  selectedBodies={selectedBodies}
                  toggleBody={toggleBody}
                  getTotalBodies={getTotalBodiesWrapper}
                  calculatePrice={calculatePriceWrapper}
                  onBack={() => setStep(10)}
                  onNext={() => setStep(12)}
                />
              )}

              {/* Step 12: Topic Selection */}
              {step === 12 && (
                <TopicSelection
                  selectedTopics={selectedTopics}
                  toggleTopic={toggleTopic}
                  selectedLocations={selectedLocations}
                  getTotalBodies={getTotalBodiesWrapper}
                  calculatePrice={calculatePriceWrapper}
                  onBack={() => setStep(11)}
                  onNext={() => setStep(13)}
                />
              )}

              {/* Step 13: Email Capture */}
              {step === 13 && (
                <EmailCapture
                  email={email}
                  setEmail={setEmail}
                  onBack={() => setStep(12)}
                  onNext={() => setStep(14)}
                />
              )}

              {/* Step 14: Billing Info */}
              {step === 14 && (
                <BillingInfo
                  billingInfo={billingInfo}
                  setBillingInfo={setBillingInfo}
                  selectedLocations={selectedLocations}
                  selectedTopics={selectedTopics}
                  selectedBodies={selectedBodies}
                  getTotalBodies={getTotalBodiesWrapper}
                  calculatePrice={calculatePriceWrapper}
                  onBack={() => setStep(13)}
                  onNext={() => setStep(6)}
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}