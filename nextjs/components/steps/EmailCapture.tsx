"use client";

import { Card, CardBody, CardHeader, Input, Button } from "@heroui/react";
import { Check, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { EmailCaptureProps } from "@/types";

export const EmailCapture: React.FC<EmailCaptureProps> = ({ 
  email, 
  setEmail, 
  onBack, 
  onNext 
}) => (
  <div className="max-w-6xl mx-auto">
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Left Column - Information */}
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-2xl font-bold mb-2">Account Setup</h2>
          <p className="text-default-600">
            Create your account to receive alerts delivered within 24 hours of agenda publication
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-primary-50">
            <CardBody className="p-4 sm:p-6">
              <h3 className="font-semibold mb-4">What you'll receive:</h3>
              <ul className="space-y-2 text-sm">
                {[
                  "Email alerts within 24 hours of agenda publication",
                  "Full agenda item language with highlighted matches",
                  "Direct links to meeting materials and documents",
                  "Meeting date, time, and location information"
                ].map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + idx * 0.05 }}
                    className="flex items-center"
                  >
                    <Check className="w-4 h-4 text-primary-600 mr-3 flex-shrink-0" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </CardBody>
          </Card>
        </motion.div>
      </div>
      
      {/* Right Column - Form */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.15 }}
      >
        <Card className="shadow-xl">
          <CardBody className="p-8">
            <div className="text-center mb-6">
              <Mail className="w-16 h-16 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold">Enter Your Email</h3>
            </div>

            <div className="space-y-4">
              <Input
                type="email"
                label="Work email address"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="bordered"
                size="lg"
                classNames={{
                  inputWrapper: "border-default-200",
                }}
              />
              
              <Card className="bg-primary-50">
                <CardBody className="p-4">
                  <p className="font-medium text-primary-900 mb-2">Email Notification Format:</p>
                  <p className="text-sm text-primary-800">
                    Each alert includes the agenda item language, matched topic, and direct link to full agenda materials.
                  </p>
                </CardBody>
              </Card>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:justify-between mt-6">
                <Button
                  onPress={onBack}
                  variant="flat"
                  color="default"
                  className="w-full sm:w-auto"
                  startContent={<span>←</span>}
                >
                  Back
                </Button>
                <Button
                  onPress={onNext}
                  isDisabled={!email || !email.includes('@')}
                  color="primary"
                  className="w-full sm:w-auto"
                  endContent={<span>→</span>}
                >
                  Add Billing Info
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </motion.div>
    </div>
  </div>
);