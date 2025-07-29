"use client";

import { Card, CardBody, CardHeader, Button, Input, Divider } from "@heroui/react";
import { Building, Check } from "lucide-react";
import { motion } from "framer-motion";

interface InvitationStepProps {
  inviteCode: string;
  setInviteCode: (code: string) => void;
  onInviteSubmit: () => void;
  onRequestAccess: () => void;
}

export const InvitationStep: React.FC<InvitationStepProps> = ({
  inviteCode,
  setInviteCode,
  onInviteSubmit,
  onRequestAccess,
}) => (
  <div className="py-8 sm:py-12 px-4">
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 sm:mb-12"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3">
          Development Intelligence Platform
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-default-600">
          Invitation-only access for real estate development teams
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Column - Platform Overview */}
        <Card className="shadow-xl">
          <CardBody className="p-6 sm:p-8">
            <div className="text-center mb-8">
              <Building className="w-14 h-14 sm:w-16 sm:h-16 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-3">Invite-Only Platform</h3>
              <p className="text-default-600 leading-relaxed">
                Hamlet's Agenda Monitoring helps acquisition and entitlement teams stay ahead of critical local developments
                by flagging relevant topics in upcoming meetings—before they happen.
              </p>
            </div>

            <Divider className="my-6" />

            <div>
              <h4 className="font-semibold mb-4">Avoid last-minute surprises with:</h4>
              <ul className="space-y-3 text-sm">
                {[
                  "Proactive visibility into discussions before they happen",
                  "Time saved by eliminating manual website monitoring",
                  "Custom alerts for topics and jurisdictions that matter most",
                  "Confidence in coverage without missing relevant updates",
                  "No more hunting through PDFs—just open your inbox",
                ].map((feature, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center"
                  >
                    <Check className="w-4 h-4 text-success mr-3 flex-shrink-0" />
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </CardBody>
        </Card>

        {/* Right Column - Form */}
        <Card className="shadow-xl">
          <CardBody className="p-6 sm:p-8">
            <div className="space-y-6">
              <div>
                <Input
                  label="Invitation Code"
                  placeholder="Enter your invitation code"
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value)}
                  size="lg"
                  variant="bordered"
                  classNames={{
                    input: "text-base",
                    inputWrapper: "border-default-200",
                  }}
                />
              </div>

              <Button
                color="primary"
                size="lg"
                className="w-full"
                onPress={onInviteSubmit}
              >
                Access Platform
              </Button>
            </div>

            <Divider className="my-8" />

            <div>
              <h4 className="font-medium mb-2">Need an invitation?</h4>
              <p className="text-sm text-default-600 mb-4 leading-relaxed">
                Request access for your development team. We'll review your application and provide an invitation
                if you qualify for our professional monitoring platform.
              </p>
              <Button
                variant="bordered"
                color="primary"
                size="lg"
                className="w-full"
                onPress={onRequestAccess}
              >
                Request Invitation
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  </div>
);