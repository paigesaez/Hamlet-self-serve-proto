import { useState } from 'react';

// Import all step components
import { InvitationStep } from './components/steps/InvitationStep';
import { InvalidCode } from './components/steps/InvalidCode';
import { RequestAccess } from './components/steps/RequestAccess';
import { Success } from './components/steps/Success';
import { RequestSubmitted } from './components/steps/RequestSubmitted';
import { JurisdictionSelection } from './components/steps/JurisdictionSelection';

// Import shared components
import { TopNavigation } from './components/shared/TopNavigation';

// Import custom hooks
import { useInvitationForm } from './hooks/useInvitationForm';
import { useLocationSelection } from './hooks/useLocationSelection';

// Flow step constants for better readability and maintenance
const FLOW_STEPS = {
  INVITATION: 1,
  INVALID_CODE: 3,
  REQUEST_ACCESS: 4,
  SUCCESS: 6,
  REQUEST_SUBMITTED: 7,
  JURISDICTION_SELECTION: 10,
} as const;

export default function InviteBasedFlow() {
  const [step, setStep] = useState(FLOW_STEPS.INVITATION);
  
  // Use the custom hook for location selection
  const {
    selectedLocations,
    selectedBodies,
    searchTerm,
    setSearchTerm,
    toggleLocation,
    resetLocationSelection,
  } = useLocationSelection();
  
  // Use the custom hook for invitation form state
  const {
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
    resetInvitationForm,
  } = useInvitationForm();

  const resetFlow = () => {
    setStep(FLOW_STEPS.INVITATION);
    resetLocationSelection(); // Use the hook's reset function
    resetInvitationForm(); // Use the hook's reset function
  };

  const handleInviteSubmit = () => {
    if (inviteCode.toLowerCase().includes('demo') || inviteCode.toLowerCase().includes('trial')) {
      setStep(FLOW_STEPS.JURISDICTION_SELECTION);
    } else {
      setStep(FLOW_STEPS.INVALID_CODE);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Only show TopNavigation when not on landing page */}
      {step !== FLOW_STEPS.INVITATION && <TopNavigation step={step} resetFlow={resetFlow} setStep={setStep} />}

      {/* Step 1: Invitation */}
      {step === FLOW_STEPS.INVITATION && (
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
          onRequestAccess={() => setStep(FLOW_STEPS.REQUEST_ACCESS)}
        />
      )}

      {/* Step 3: Invalid Code */}
      {step === FLOW_STEPS.INVALID_CODE && (
        <InvalidCode
          onBack={() => setStep(FLOW_STEPS.INVITATION)}
          onRequestAccess={() => setStep(FLOW_STEPS.REQUEST_ACCESS)}
        />
      )}

      {/* Step 4: Request Access */}
      {step === FLOW_STEPS.REQUEST_ACCESS && (
        <RequestAccess
          onBack={() => setStep(FLOW_STEPS.INVITATION)}
          onSubmit={() => setStep(FLOW_STEPS.REQUEST_SUBMITTED)}
        />
      )}

      {/* Step 6: Success */}
      {step === FLOW_STEPS.SUCCESS && <Success />}

      {/* Step 7: Request Submitted */}
      {step === FLOW_STEPS.REQUEST_SUBMITTED && (
        <RequestSubmitted
          onBack={() => setStep(FLOW_STEPS.INVITATION)}
        />
      )}

      {/* Coverage Flow Steps (10-12) */}
      {(step >= 10 && step <= 12) && (
        <div className="min-h-screen flex flex-col">
          <div className="flex-1 px-6 lg:px-12 xl:px-20 pt-8 pb-32">
              {/* Step 10: Jurisdiction Selection */}
              {step === FLOW_STEPS.JURISDICTION_SELECTION && (
                <JurisdictionSelection
                  selectedLocations={selectedLocations}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  toggleLocation={toggleLocation}
                  onNext={() => {
                    // All topics are automatically included - no need to track separately
                    setStep(FLOW_STEPS.SUCCESS);  // Go directly to success
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