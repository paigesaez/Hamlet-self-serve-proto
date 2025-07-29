"use client";

import { Button, ButtonGroup } from "@heroui/react";
import { NavigationButtonsProps } from "@/types";

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  onBack,
  onNext,
  backDisabled = false,
  nextDisabled = false,
  nextText = "Continue"
}) => (
  <div className="flex flex-col sm:flex-row gap-3 sm:justify-between mt-6">
    <Button
      onPress={onBack}
      isDisabled={backDisabled}
      variant="flat"
      color="default"
      className="w-full sm:w-auto"
      startContent={<span>←</span>}
    >
      Back
    </Button>
    <Button
      onPress={onNext}
      isDisabled={nextDisabled}
      color="primary"
      className="w-full sm:w-auto"
      endContent={<span>→</span>}
    >
      {nextText}
    </Button>
  </div>
);