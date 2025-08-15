import { useState } from 'react';

// Initial form values for testing
const INITIAL_FORM_VALUES = {
  inviteCode: 'DEMO2024',
  company: 'Acme Development Group',
  firstName: 'John',
  lastName: 'Smith',
  email: 'john.smith@acmedev.com',
  password: 'SecurePass123',
  confirmPassword: 'SecurePass123',
} as const;

// Custom hook for invitation form state management
export const useInvitationForm = () => {
  const [inviteCode, setInviteCode] = useState<string>(INITIAL_FORM_VALUES.inviteCode);
  const [company, setCompany] = useState<string>(INITIAL_FORM_VALUES.company);
  const [firstName, setFirstName] = useState<string>(INITIAL_FORM_VALUES.firstName);
  const [lastName, setLastName] = useState<string>(INITIAL_FORM_VALUES.lastName);
  const [email, setEmail] = useState<string>(INITIAL_FORM_VALUES.email);
  const [password, setPassword] = useState<string>(INITIAL_FORM_VALUES.password);
  const [confirmPassword, setConfirmPassword] = useState<string>(INITIAL_FORM_VALUES.confirmPassword);
  
  const resetInvitationForm = () => {
    setInviteCode('');
    setCompany('');
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };
  
  return {
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
    resetInvitationForm,
  };
};