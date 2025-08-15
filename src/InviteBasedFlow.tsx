import { useState } from 'react';

// Import shared components
import { TopNavigation } from './components/shared/TopNavigation';
import { StepRenderer } from './components/StepRenderer';

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
      
      {/* Render the current step */}
      <StepRenderer
        step={step}
        setStep={setStep}
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
        handleInviteSubmit={handleInviteSubmit}
        selectedLocations={selectedLocations}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        toggleLocation={toggleLocation}
      />
    </div>
  );
}