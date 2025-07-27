# Hamlet Self-Serve Protos

A React-based invitation-only development intelligence platform for real estate teams to monitor local government agendas and track development opportunities.

## Overview

Hamlet Agenda Monitoring is a sophisticated SaaS application that helps acquisition and entitlement teams stay ahead of critical local developments by flagging relevant topics in upcoming government meetings before they happen. The platform provides proactive visibility into city council and planning commission agendas across multiple jurisdictions.

## Key Features

### 🏛️ Invitation-Based Access System
- Secure invite-only platform access
- Multi-step onboarding flow with validation
- Professional access request system for qualified teams

### 📍 Jurisdiction Coverage Builder
- Select multiple cities and counties for monitoring
- Real-time coverage status indicators (Active, Available, On Request)
- Support for governing body selection (City Council, Planning Commission)
- Volume-based pricing ($1,000 per 20 governing bodies)

### 🎯 AI-Powered Topic Matching
- Advanced semantic topic detection beyond simple keywords
- Pre-configured topics for real estate development:
  - New Multifamily Housing
  - Impact Fees
  - Industrial Real Estate
  - Data Centers
- Cross-topic tracking capabilities

### 📧 Automated Alert System
- Email notifications within 24 hours of agenda publication
- Direct links to full agenda materials
- Formatted alerts with matched topics and agenda item language

### 💳 Professional Billing Integration
- Secure payment processing
- Company and individual billing information
- Volume discounts for scaling coverage

## Technologies Used

- **React 19** - Modern UI library with latest features
- **TypeScript** - Type-safe JavaScript for robust development
- **Vite** - Lightning-fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework (via CDN)
- **Lucide React** - Comprehensive icon library

## User Flow

1. **Invitation Entry** - Users enter their invitation code to access the platform
2. **Coverage Selection** - Choose jurisdictions and governing bodies to monitor
3. **Topic Configuration** - Select development topics relevant to your projects
4. **Account Setup** - Create account with email for alert delivery
5. **Billing Information** - Complete payment setup for monitoring service
6. **Activation** - Begin receiving proactive agenda alerts

## Target Users

The platform is designed for:
- Entitlement teams managing multiple jurisdictions
- Land acquisition teams tracking development opportunities
- Regional development leads overseeing market intelligence
- Development consultants serving multiple clients

## Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd hamlet-self-serve-protos
```

2. Install dependencies:
```bash
npm install
```

## Development

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (default Vite port).

## Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

## Project Structure

```
hamlet-self-serve-protos/
├── index.html              # Main HTML entry point with Tailwind CDN
├── main.tsx               # React application entry point
├── package.json           # Project dependencies and scripts
├── package-lock.json      # Locked dependency versions
└── remixed-e4b45051.tsx   # Main InviteBasedFlow component
```

## Component Architecture

### InviteBasedFlow Component
The main component (`remixed-e4b45051.tsx`) implements a sophisticated multi-step wizard flow:

- **State Management**: Uses React hooks for complex state handling
- **Navigation**: Top navigation bar with contextual back buttons
- **Step Indicator**: Visual progress tracking through the onboarding process
- **Responsive Design**: Full mobile and desktop support
- **Form Validation**: Input validation at each step
- **Mock Data**: Sample jurisdictions and topics for demonstration

## Demo Access

To explore the full coverage builder flow, use invitation codes containing "demo" or "trial".

## Security Considerations

- Invitation-only access control
- Professional billing information handling
- Secure form validation
- Protected routes based on invitation status

## License

ISC