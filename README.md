# Hamlet Self-Serve Prototype

A React-based frontend prototype for an invitation-only development intelligence platform. This is a UI/UX prototype with mock data for design and development purposes.

## Overview

**This is a frontend prototype** demonstrating the user experience and interface design for a development intelligence platform. The prototype showcases the complete onboarding flow and user journey without any backend services or payment processing.

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

### 💳 Billing Flow (UI Only)
- Mock billing interface for prototype demonstration
- Example pricing display ($50 per governing body)
- Form validation UI without actual payment processing

## Technologies Used

- **React 19** - Modern UI library with latest features
- **TypeScript** - Type-safe JavaScript for robust development
- **Vite** - Lightning-fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework (via CDN)
- **Lucide React** - Comprehensive icon library

## User Flow

1. **Invitation Entry** - Enter mock invitation code to test the UI flow
2. **Coverage Selection** - Choose jurisdictions and governing bodies to monitor
3. **Topic Configuration** - Select development topics relevant to your projects
4. **Account Setup** - Create account with email for alert delivery
5. **Billing Information** - Mock billing form (UI only, no actual payment)
6. **Activation** - Begin receiving proactive agenda alerts

## Target Users

The platform is designed for:
- Entitlement teams managing multiple jurisdictions
- Land acquisition teams tracking development opportunities
- Regional development leads overseeing market intelligence
- Development consultants serving multiple clients

## Prerequisites

- **Node.js**: Version 18.0.0 or higher (recommended: 18.x LTS)
- **npm**: Version 8.0.0 or higher (comes with Node.js)
- **Git**: For cloning the repository

## Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/paigesaez/Hamlet-self-serve-protos.git
cd Hamlet-self-serve-protos
```

### 2. Install Node Version (if using nvm)
```bash
nvm install  # This will use the .nvmrc file
nvm use      # Switch to the correct Node version
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Start Development Server
```bash
npm run dev
```

The application will open at `http://localhost:5173`

## Available Scripts

### Development
```bash
npm run dev          # Start development server (kills any process on port 5173 first)
npm run dev:force    # Same as above, force kills port 5173
npm run dev:original # Start Vite without port cleanup
```

### Production
```bash
npm run build        # Build for production (TypeScript check + Vite build)
npm run preview      # Preview production build locally
```

### Code Quality
```bash
npm run lint         # Run ESLint
npm run typecheck    # Run TypeScript type checking
```

## Deployment

### Production Build
```bash
npm run build
```

This will:
1. Run TypeScript compiler to check for type errors
2. Build optimized production bundle in `dist/` directory
3. Generate minified CSS and JavaScript files

### Deployment Platforms
- **Vercel**: Automatically deploys from main branch
- **Static Hosting**: Upload contents of `dist/` folder to any static host
- **Preview URL**: https://hamlet-self-serve-protos.vercel.app/

## Project Structure

```
Hamlet-self-serve-protos/
├── src/
│   ├── InviteBasedFlow.tsx        # Main application component
│   ├── components/
│   │   ├── StepRenderer.tsx       # Step routing logic
│   │   ├── shared/                # Shared UI components
│   │   │   ├── NavigationButtons.tsx
│   │   │   ├── StepHeader.tsx
│   │   │   └── TopNavigation.tsx
│   │   └── steps/                 # Individual flow steps
│   │       ├── StateSelection.tsx # State-based jurisdiction selection
│   │       ├── InvitationStep.tsx # Invite code entry
│   │       ├── Success.tsx        # Completion screen
│   │       └── ... (other steps)
│   ├── data/
│   │   ├── stateJurisdictions.ts  # Production jurisdiction data
│   │   └── locations.ts           # Mock location data
│   ├── hooks/                     # Custom React hooks
│   ├── styles/
│   │   └── globals.css            # Global styles and Tailwind imports
│   └── utils/                     # Utility functions
├── public/
│   ├── prod_juris_by_state.csv   # Production data source
│   └── fonts/                    # Custom Cambon fonts
├── index.html                     # HTML entry point
├── main.tsx                       # React app mount point
├── package.json                   # Dependencies and scripts
├── tsconfig.json                  # TypeScript configuration
├── vite.config.ts                 # Vite build configuration
└── .nvmrc                        # Node version specification
```

## Key Components

### InviteBasedFlow (`src/InviteBasedFlow.tsx`)
Main application orchestrator handling:
- Multi-step wizard flow state management
- User input validation and persistence
- Navigation between steps
- Data flow between components

### StateSelection (`src/components/steps/StateSelection.tsx`)
- State-based jurisdiction selection
- Real production data (214 jurisdictions across 21 states)
- Filter states dropdown for quick selection
- Real-time count updates

### Success (`src/components/steps/Success.tsx`)
- Subscription summary display
- Selected states and jurisdiction counts
- Topic badges (Industrial, Housing, New Multifamily Housing, Impact Fees, Data Centers)
- Call-to-action for dashboard access

## Testing the Prototype

### Demo Access
To explore the prototype flow:
- Enter any code containing "demo" or "trial" (e.g., "DEMO123", "trial-test")
- This will allow you to navigate through all UI screens

### Mock Data
- Jurisdiction counts are based on production data for realistic UI
- 21 US states with mock coverage
- 214 total jurisdictions (for UI display)
- 244 total governing bodies (for UI display)
- **No actual data processing or API calls**

## Environment Variables

No environment variables are required. This prototype:
- Uses Tailwind CSS via CDN
- Contains only mock data and UI components
- Has no backend connections
- Has no payment processing
- Has no external API dependencies

## Troubleshooting

### Port 5173 Already in Use
The dev script automatically kills any process on port 5173. If issues persist:
```bash
lsof -ti:5173 | xargs kill -9  # Manually kill the port
npm run dev:force               # Force start
```

### Build Errors
```bash
npm run typecheck  # Check for TypeScript errors
npm run lint       # Check for linting issues
```

### Node Version Issues
Ensure you're using Node 18+:
```bash
node --version  # Should be v18.0.0 or higher
```

## Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Run `npm run typecheck` and `npm run lint`
4. Commit with descriptive messages
5. Push and create a pull request

## Data Sources

The prototype uses static data from `public/prod_juris_by_state.csv` for realistic UI display:
- Mock jurisdiction counts for UI testing
- Static state and city data
- No live data connections
- Used solely for frontend development

## Support

For questions or issues:
- Create an issue in the GitHub repository
- Contact the development team

## License

ISC
