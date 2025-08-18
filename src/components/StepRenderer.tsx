import React from 'react';

// Import all step components
import { InvitationStep } from './steps/InvitationStep';
import { InvalidCode } from './steps/InvalidCode';
import { RequestAccess } from './steps/RequestAccess';
import { Success } from './steps/Success';
import { RequestSubmitted } from './steps/RequestSubmitted';
import { StateSelection } from './steps/StateSelection';

// Flow step constants - should match the ones in InviteBasedFlow
const FLOW_STEPS = {
  INVITATION: 1,
  INVALID_CODE: 3,
  REQUEST_ACCESS: 4,
  SUCCESS: 6,
  REQUEST_SUBMITTED: 7,
  JURISDICTION_SELECTION: 10,
} as const;

interface StepRendererProps {
  step: number;
  setStep: (step: number) => void;
  inviteCode: string;
  setInviteCode: (value: string) => void;
  company: string;
  setCompany: (value: string) => void;
  firstName: string;
  setFirstName: (value: string) => void;
  lastName: string;
  setLastName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  confirmPassword: string;
  setConfirmPassword: (value: string) => void;
  handleInviteSubmit: () => void;
  selectedLocations: number[];
  selectedStates: string[];
  toggleState: (state: string) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  toggleLocation: (locationId: number) => void;
}

export const StepRenderer: React.FC<StepRendererProps> = ({
  step,
  setStep,
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
  handleInviteSubmit,
  selectedLocations,
  selectedStates,
  toggleState,
  searchTerm,
  setSearchTerm,
  toggleLocation,
}) => {
  switch (step) {
    case FLOW_STEPS.INVITATION:
      return (
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
      );
      
    case FLOW_STEPS.INVALID_CODE:
      return (
        <InvalidCode
          onBack={() => setStep(FLOW_STEPS.INVITATION)}
          onRequestAccess={() => setStep(FLOW_STEPS.REQUEST_ACCESS)}
        />
      );
      
    case FLOW_STEPS.REQUEST_ACCESS:
      return (
        <RequestAccess
          onBack={() => setStep(FLOW_STEPS.INVITATION)}
          onSubmit={() => setStep(FLOW_STEPS.REQUEST_SUBMITTED)}
        />
      );
      
    case FLOW_STEPS.SUCCESS:
      return <Success selectedStates={selectedStates} />;
      
    case FLOW_STEPS.REQUEST_SUBMITTED:
      return (
        <RequestSubmitted
          onBack={() => setStep(FLOW_STEPS.INVITATION)}
        />
      );
      
    case FLOW_STEPS.JURISDICTION_SELECTION:
      return (
        <div className="min-h-screen flex flex-col">
          <div className="flex-1 px-6 lg:px-12 xl:px-20 pt-8 pb-32">
            <StateSelection
              selectedStates={selectedStates}
              toggleState={toggleState}
              onNext={() => {
                setStep(FLOW_STEPS.SUCCESS);
              }}
            />
          </div>
        </div>
      );
      
    default:
      return null;
  }
};