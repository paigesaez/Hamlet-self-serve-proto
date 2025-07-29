"use client";

import { Card, CardBody, Button } from "@heroui/react";
import { Mail } from "lucide-react";
import { motion } from "framer-motion";

interface RequestSubmittedProps {
  onBack: () => void;
}

export const RequestSubmitted: React.FC<RequestSubmittedProps> = ({ onBack }) => (
  <div className="py-12 px-4">
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-2xl mx-auto text-center"
    >
      <Mail className="w-24 h-24 text-primary-500 mx-auto mb-6" />
      <h2 className="text-3xl font-bold mb-4">Request Submitted!</h2>
      <p className="text-lg text-default-600 mb-8">
        Thank you for your interest in Hamlet Agenda Monitoring. Our team will review your application
        and respond within 2 business days.
      </p>
      <Card>
        <CardBody className="p-6 text-left">
          <h3 className="font-semibold mb-3">What to expect:</h3>
          <ul className="space-y-2 text-sm text-default-700">
            <li>✓ Application review within 48 hours</li>
            <li>✓ Invitation code sent if approved</li>
            <li>✓ Optional consultation call to discuss your needs</li>
            <li>✓ Custom pricing for enterprise teams</li>
          </ul>
        </CardBody>
      </Card>
      <Button
        onPress={onBack}
        color="primary"
        size="lg"
        className="mt-8"
      >
        Return to Home
      </Button>
    </motion.div>
  </div>
);