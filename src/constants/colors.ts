// Brand color constants
export const colors = {
  primary: {
    main: '#002147',
    hover: '#003a6b',
    light: '#e0e7ff',
  },
  success: '#16a34a',
  warning: '#ea580c',
  info: '#2563eb',
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  }
} as const;

// Tailwind class utilities for primary color
export const primaryClasses = {
  bg: 'bg-primary',
  bgHover: 'hover:bg-primary-hover',
  text: 'text-primary',
  border: 'border-primary',
  ring: 'ring-primary',
  focusRing: 'focus:ring-primary',
  focusBorder: 'focus:border-primary',
  button: 'btn-primary',
  buttonSecondary: 'btn-secondary',
} as const;