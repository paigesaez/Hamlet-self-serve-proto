"use client";

import { useState } from "react";
import { Card, CardBody, Input, Button, Select, SelectItem, Textarea } from "@heroui/react";
import { User } from "lucide-react";
import { motion } from "framer-motion";

interface RequestAccessProps {
  onBack: () => void;
  onSubmit: () => void;
}

export const RequestAccess: React.FC<RequestAccessProps> = ({ onBack, onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    role: '',
    markets: ''
  });

  const isFormValid = formData.firstName && formData.lastName && formData.email && 
                     formData.company && formData.role;

  const roles = [
    { key: "development", label: "Development Lead" },
    { key: "acquisition", label: "Acquisition Manager" },
    { key: "entitlement", label: "Entitlement Manager" },
    { key: "consultant", label: "Development Consultant" },
    { key: "other", label: "Other" }
  ];

  return (
    <div className="py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <User className="w-16 h-16 text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-2">Request Platform Access</h2>
          <p className="text-default-600">Tell us about your development team to qualify for access</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="shadow-xl">
            <CardBody className="p-8">
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="First name"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    variant="bordered"
                    size="lg"
                    isRequired
                    classNames={{
                      inputWrapper: "border-default-200",
                    }}
                  />
                  <Input
                    label="Last name"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    variant="bordered"
                    size="lg"
                    isRequired
                    classNames={{
                      inputWrapper: "border-default-200",
                    }}
                  />
                </div>

                <Input
                  type="email"
                  label="Work email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  variant="bordered"
                  size="lg"
                  isRequired
                  classNames={{
                    inputWrapper: "border-default-200",
                  }}
                />

                <Input
                  label="Company name"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  variant="bordered"
                  size="lg"
                  isRequired
                  classNames={{
                    inputWrapper: "border-default-200",
                  }}
                />

                <Select
                  label="Select your role"
                  selectedKeys={formData.role ? [formData.role] : []}
                  onSelectionChange={(keys) => setFormData({ ...formData, role: Array.from(keys)[0] as string })}
                  variant="bordered"
                  size="lg"
                  isRequired
                  classNames={{
                    trigger: "border-default-200",
                  }}
                >
                  {roles.map((role) => (
                    <SelectItem key={role.key} value={role.key}>
                      {role.label}
                    </SelectItem>
                  ))}
                </Select>

                <Textarea
                  label="Target markets/cities of interest (optional)"
                  value={formData.markets}
                  onChange={(e) => setFormData({ ...formData, markets: e.target.value })}
                  variant="bordered"
                  size="lg"
                  minRows={3}
                  classNames={{
                    inputWrapper: "border-default-200",
                  }}
                />

                <div className="flex flex-col sm:flex-row gap-3 sm:justify-between">
                  <Button
                    onPress={onBack}
                    variant="flat"
                    color="default"
                    size="lg"
                    startContent={<span>←</span>}
                  >
                    Back
                  </Button>
                  <Button
                    onPress={onSubmit}
                    isDisabled={!isFormValid}
                    color="primary"
                    size="lg"
                    endContent={<span>→</span>}
                  >
                    Submit Request
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};