import { useState } from 'react';
import { locations } from './data/locations';

// Import all step components
import { InvitationStep } from './components/steps/InvitationStep';
import { InvalidCode } from './components/steps/InvalidCode';
import { RequestAccess } from './components/steps/RequestAccess';
import { Success } from './components/steps/Success';
import { RequestSubmitted } from './components/steps/RequestSubmitted';
import { JurisdictionSelection } from './components/steps/JurisdictionSelection';

// Import shared components
import { TopNavigation } from './components/shared/TopNavigation';

export default function InviteBasedFlow() {
  const [step, setStep] = useState(1);
  const [selectedLocations, setSelectedLocations] = useState<number[]>([]);
  // selectedPackages removed - not used in simplified flow
  const [selectedBodies, setSelectedBodies] = useState<Record<string, string[]>>({});
  // selectedTopics state removed - all topics are automatically included
  const [searchTerm, setSearchTerm] = useState('');
  const [inviteCode, setInviteCode] = useState('DEMO2024');
  const [company, setCompany] = useState('Acme Development Group');
  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('Smith');
  const [email, setEmail] = useState('john.smith@acmedev.com');
  const [password, setPassword] = useState('SecurePass123');
  const [confirmPassword, setConfirmPassword] = useState('SecurePass123');

  const resetFlow = () => {
    setStep(1);
    setSelectedLocations([]);
    // selectedPackages reset removed
    setSelectedBodies({});
    // selectedTopics reset removed
    setSearchTerm('');
    setInviteCode('');
    setCompany('');
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const toggleLocation = (locationId: number) => {
    if (selectedLocations.includes(locationId)) {
      setSelectedLocations(prev => prev.filter(id => id !== locationId));
      setSelectedBodies(prev => {
        const updated = { ...prev };
        delete updated[locationId];
        return updated;
      });
    } else {
      setSelectedLocations(prev => [...prev, locationId]);
      const location = locations.find(l => l.id === locationId);
      // Automatically select all governing bodies for the location
      setSelectedBodies(prev => ({
        ...prev,
        [locationId]: location?.governingBodies || ['City Council']
      }));
    }
  };

  // Package selection functionality removed - not used in current flow

  // toggleBody and toggleTopic removed - all bodies and topics are automatically included

  const handleInviteSubmit = () => {
    if (inviteCode.toLowerCase().includes('demo') || inviteCode.toLowerCase().includes('trial')) {
      setStep(10);
    } else {
      setStep(3);
    }
  };


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
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
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
                  onNext={() => {
                    // All topics are automatically included - no need to track separately
                    setStep(6);  // Go directly to success
                  }}
                />
              )}

              {/* Steps 11 and 12 are now obsolete - users automatically get all governing bodies and topics */}

              {/* Email Capture and Billing Info steps removed - now handled in InvitationStep */}
          </div>
        </div>
      )}
    </div>
  );
}