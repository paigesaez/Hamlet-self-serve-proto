"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BillingInfoData } from "@/types";
import { getTotalBodies, calculatePrice } from "@/utils/pricing";

// Components
import { InvitationStep } from "@/components/steps/InvitationStep";
import { JurisdictionSelection } from "@/components/steps/JurisdictionSelection";
import { GoverningBodySelection } from "@/components/steps/GoverningBodySelection";
import { TopicSelection } from "@/components/steps/TopicSelection";
import { EmailCapture } from "@/components/steps/EmailCapture";
import { BillingInfo } from "@/components/steps/BillingInfo";
import { Success } from "@/components/steps/Success";
import { InvalidCode } from "@/components/steps/InvalidCode";
import { RequestAccess } from "@/components/steps/RequestAccess";
import { RequestSubmitted } from "@/components/steps/RequestSubmitted";

// Shared components
import { TopNavigation } from "@/components/shared/TopNavigation";
import { StepIndicator } from "@/components/shared/StepIndicator";

export default function Home() {
  const [step, setStep] = useState(1);
  const [selectedLocations, setSelectedLocations] = useState<number[]>([]);
  const [selectedBodies, setSelectedBodies] = useState<Record<string, string[]>>({});
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [email, setEmail] = useState("");
  const [billingInfo, setBillingInfo] = useState<BillingInfoData>({
    company: "",
    firstName: "",
    lastName: "",
    phone: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const resetFlow = () => {
    setStep(1);
    setSelectedLocations([]);
    setSelectedBodies({});
    setSelectedTopics([]);
    setSearchTerm("");
    setInviteCode("");
    setEmail("");
    setBillingInfo({
      company: "",
      firstName: "",
      lastName: "",
      phone: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    });
  };

  const handleInviteSubmit = () => {
    if (inviteCode.toLowerCase().includes("demo") || inviteCode.toLowerCase().includes("trial")) {
      setStep(10);
    } else {
      setStep(3);
    }
  };

  const getTotalBodiesWrapper = () => getTotalBodies(selectedBodies);
  const calculatePriceWrapper = () => calculatePrice(getTotalBodiesWrapper());

  const pageVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <TopNavigation step={step} resetFlow={resetFlow} setStep={setStep} />

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          transition={{ duration: 0.3 }}
        >
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
            <InvalidCode onBack={() => setStep(1)} onRequestAccess={() => setStep(4)} />
          )}

          {/* Step 4: Request Access */}
          {step === 4 && (
            <RequestAccess onBack={() => setStep(1)} onSubmit={() => setStep(7)} />
          )}

          {/* Step 6: Success */}
          {step === 6 && <Success />}

          {/* Step 7: Request Submitted */}
          {step === 7 && <RequestSubmitted onBack={() => setStep(1)} />}

          {/* Coverage Flow Steps (10-14) */}
          {step >= 10 && step <= 14 && (
            <>
              <StepIndicator currentStep={step} />
              <div className="py-8 px-4">
                <div className="max-w-7xl mx-auto">
                  {/* Step 10: Jurisdiction Selection */}
                  {step === 10 && (
                    <JurisdictionSelection
                      selectedLocations={selectedLocations}
                      setSelectedLocations={setSelectedLocations}
                      selectedBodies={selectedBodies}
                      setSelectedBodies={setSelectedBodies}
                      searchTerm={searchTerm}
                      setSearchTerm={setSearchTerm}
                      onNext={() => setStep(11)}
                    />
                  )}

                  {/* Step 11: Governing Body Selection */}
                  {step === 11 && (
                    <GoverningBodySelection
                      selectedLocations={selectedLocations}
                      selectedBodies={selectedBodies}
                      setSelectedBodies={setSelectedBodies}
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
                      setSelectedTopics={setSelectedTopics}
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
        </motion.div>
      </AnimatePresence>
    </div>
  );
}