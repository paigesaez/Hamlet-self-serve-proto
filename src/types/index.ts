export interface Location {
  id: number;
  name: string;
  state: string;
  type: string;
  popular: boolean;
  coverage: 'Active' | 'Available' | 'On Request';
  governingBodies: string[];
  customerDemand: 'High' | 'Medium' | 'Low';
}

export interface Topic {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  description: string;
}

export interface BillingInfoData {
  company: string;
  firstName: string;
  lastName: string;
  phone: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

export interface EmailCaptureProps {
  email: string;
  setEmail: (email: string) => void;
  onBack: () => void;
  onNext: () => void;
}

export interface BillingInfoProps {
  billingInfo: BillingInfoData;
  setBillingInfo: React.Dispatch<React.SetStateAction<BillingInfoData>>;
  selectedLocations: number[];
  selectedTopics: string[];
  selectedBodies: Record<string, string[]>;
  getTotalBodies: () => number;
  calculatePrice: () => number;
  onBack: () => void;
  onNext: () => void;
}

export interface NavigationButtonsProps {
  onBack: () => void;
  onNext: () => void;
  backDisabled?: boolean;
  nextDisabled?: boolean;
  nextText?: string;
}

export interface StepInfo {
  number: number;
  title: string;
  active: boolean;
}