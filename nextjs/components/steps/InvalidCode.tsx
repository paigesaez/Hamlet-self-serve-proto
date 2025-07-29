"use client";

import { Button } from "@heroui/react";
import { motion } from "framer-motion";

interface InvalidCodeProps {
  onBack: () => void;
  onRequestAccess: () => void;
}

export const InvalidCode: React.FC<InvalidCodeProps> = ({ onBack, onRequestAccess }) => (
  <div className="py-12 px-4">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-lg mx-auto text-center"
    >
      <h2 className="text-2xl font-bold mb-4">Invalid Invitation Code</h2>
      <p className="text-default-600 mb-8">
        The code you entered isn't recognized. Please check your invitation email or request access.
      </p>
      <div className="space-y-4">
        <Button
          onPress={onBack}
          variant="flat"
          color="default"
          className="w-full"
          size="lg"
        >
          Try Again
        </Button>
        <Button
          onPress={onRequestAccess}
          color="primary"
          className="w-full"
          size="lg"
        >
          Request Access
        </Button>
      </div>
    </motion.div>
  </div>
);