"use client";

import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button } from "@heroui/react";
import { Building } from "lucide-react";

interface TopNavigationProps {
  step: number;
  resetFlow: () => void;
  setStep: (step: number) => void;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({ step, resetFlow, setStep }) => {
  return (
    <Navbar isBordered className="bg-background">
      <NavbarContent className="max-w-7xl mx-auto w-full">
        <NavbarBrand>
          <Button
            onPress={resetFlow}
            variant="light"
            className="text-primary hover:text-primary-600 font-medium"
            startContent={<Building className="w-5 h-5" />}
          >
            <span className="truncate max-w-[180px] sm:max-w-none">Hamlet Agenda Monitoring</span>
          </Button>
        </NavbarBrand>

        {step !== 1 && step !== 6 && step !== 7 && (
          <NavbarItem>
            <Button
              onPress={() => setStep(1)}
              variant="light"
              size="sm"
              className="text-default-600 hover:text-default-800"
            >
              ← Back to Home
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>
    </Navbar>
  );
};