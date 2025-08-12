import { useState } from 'react';
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

// Import shared components
import { TopNavigation } from './components/shared/TopNavigation';

export default function InviteBasedFlow() {
  const [step, setStep] = useState(1);
  const [selectedLocations, setSelectedLocations] = useState<number[]>([]);
  const [selectedPackages, setSelectedPackages] = useState<{ type: 'state' | 'region', name: string }[]>([]);
  const [selectedBodies, setSelectedBodies] = useState<Record<string, string[]>>({});
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [inviteCode, setInviteCode] = useState('DEMO2024');
  const [company, setCompany] = useState('Acme Development Group');
  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('Smith');
  const [email, setEmail] = useState('john.smith@acmedev.com');
  const [password, setPassword] = useState('SecurePass123');

  const resetFlow = () => {
    setStep(1);
    setSelectedLocations([]);
    setSelectedPackages([]);
    setSelectedBodies({});
    setSelectedTopics([]);
    setSearchTerm('');
    setInviteCode('');
    setCompany('');
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
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

  // Package selection functionality removed - not used in current flow

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Only show TopNavigation when not on landing page */}
      {step !== 1 && <TopNavigation step={step} resetFlow={resetFlow} setStep={setStep} />}

      {/* Step 1: Invitation */}
      {step === 1 && (
        <InvitationStep
          inviteCode={inviteCode}
          setInviteCode={setInviteCode}
          company={company}
          setCompany={setCompany}
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
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

      {/* Coverage Flow Steps (10-12) */}
      {(step >= 10 && step <= 12) && (
        <div className="min-h-screen flex flex-col">
          <div className="flex-1 px-6 lg:px-12 xl:px-20 pt-8 pb-32">
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
                  selectedPackages={selectedPackages}
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
                  onNext={() => setStep(6)}  // Skip to success page
                />
              )}

              {/* Email Capture and Billing Info steps removed - now handled in InvitationStep */}
          </div>
        </div>
      )}
    </div>
  );
}