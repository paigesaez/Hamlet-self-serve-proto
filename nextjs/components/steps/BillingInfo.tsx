"use client";

import { Card, CardBody, CardHeader, Input, Button, Divider } from "@heroui/react";
import { CreditCard } from "lucide-react";
import { motion } from "framer-motion";
import { BillingInfoProps } from "@/types";

export const BillingInfo: React.FC<BillingInfoProps> = ({ 
  billingInfo, 
  setBillingInfo, 
  selectedLocations, 
  selectedTopics,
  selectedBodies,
  getTotalBodies,
  calculatePrice,
  onBack,
  onNext 
}) => (
  <div className="max-w-6xl mx-auto">
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Left Column - Pricing Summary */}
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-2xl font-bold mb-2">Billing Information</h2>
          <p className="text-default-600">Complete setup to begin tracking development opportunities</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardBody className="p-6">
              <h3 className="font-semibold mb-4">Your Subscription Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-default-600">Jurisdictions</span>
                  <span className="font-medium">{selectedLocations.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-default-600">Governing Bodies</span>
                  <span className="font-medium">{getTotalBodies()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-default-600">Topics Monitored</span>
                  <span className="font-medium">{selectedTopics.length}</span>
                </div>
                <Divider className="my-3" />
                <div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Monthly Total</span>
                    <span className="text-lg font-bold text-primary">${calculatePrice().toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-default-500 mt-1">Volume pricing: $1,000 per 20 governing bodies</p>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-success-50">
            <CardBody className="p-4">
              <p className="font-medium text-success-900 mb-2">Built for Scale:</p>
              <p className="text-sm text-success-800">
                Track multiple cities without adding headcount. Volume discounts available as coverage scales.
              </p>
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
              <CreditCard className="w-16 h-16 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold">Payment Details</h3>
            </div>

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  label="First name"
                  value={billingInfo.firstName}
                  onChange={(e) => setBillingInfo({ ...billingInfo, firstName: e.target.value })}
                  variant="bordered"
                  size="lg"
                  isRequired
                  classNames={{
                    inputWrapper: "border-default-200",
                  }}
                />
                <Input
                  label="Last name"
                  value={billingInfo.lastName}
                  onChange={(e) => setBillingInfo({ ...billingInfo, lastName: e.target.value })}
                  variant="bordered"
                  size="lg"
                  isRequired
                  classNames={{
                    inputWrapper: "border-default-200",
                  }}
                />
              </div>

              <Input
                label="Company name"
                value={billingInfo.company}
                onChange={(e) => setBillingInfo({ ...billingInfo, company: e.target.value })}
                variant="bordered"
                size="lg"
                isRequired
                classNames={{
                  inputWrapper: "border-default-200",
                }}
              />

              <Input
                type="tel"
                label="Phone number"
                value={billingInfo.phone}
                onChange={(e) => setBillingInfo({ ...billingInfo, phone: e.target.value })}
                variant="bordered"
                size="lg"
                classNames={{
                  inputWrapper: "border-default-200",
                }}
              />

              <Divider />

              <div>
                <h3 className="font-semibold mb-4">Payment Information</h3>
                <div className="space-y-4">
                  <Input
                    label="Card number"
                    value={billingInfo.cardNumber}
                    onChange={(e) => setBillingInfo({ ...billingInfo, cardNumber: e.target.value })}
                    variant="bordered"
                    size="lg"
                    isRequired
                    classNames={{
                      inputWrapper: "border-default-200",
                    }}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="MM/YY"
                      value={billingInfo.expiryDate}
                      onChange={(e) => setBillingInfo({ ...billingInfo, expiryDate: e.target.value })}
                      variant="bordered"
                      size="lg"
                      isRequired
                      classNames={{
                        inputWrapper: "border-default-200",
                      }}
                    />
                    <Input
                      label="CVV"
                      value={billingInfo.cvv}
                      onChange={(e) => setBillingInfo({ ...billingInfo, cvv: e.target.value })}
                      variant="bordered"
                      size="lg"
                      isRequired
                      classNames={{
                        inputWrapper: "border-default-200",
                      }}
                    />
                  </div>
                </div>
              </div>
              
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
                  isDisabled={!billingInfo.firstName || !billingInfo.lastName || !billingInfo.company || !billingInfo.cardNumber}
                  color="primary"
                  className="w-full sm:w-auto"
                  endContent={<span>→</span>}
                >
                  Complete Setup
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </motion.div>
    </div>
  </div>
);