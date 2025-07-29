# Hamlet Agenda Monitoring Platform - Prototype Summary

## 🎯 **Product Overview**
**Hamlet Agenda Monitoring** is an invite-only development intelligence platform that helps real estate development teams stay ahead of critical local government discussions by monitoring municipal agenda items before meetings happen.

## 👥 **Target Users & User Story**
**Primary Users:**
- Entitlement teams managing multiple jurisdictions
- Land acquisition teams tracking development opportunities  
- Regional development leads overseeing market intelligence
- Development consultants serving multiple clients

**User Story:** "As a development team member, I want to receive proactive alerts about relevant agenda items in my target jurisdictions so I can prepare for or influence discussions before they happen, rather than discovering them after the fact."

## 🏗️ **Current Implementation**

### **User Flow:**
1. **Invitation Gate** - Users enter invite codes or request access
2. **Jurisdiction Selection** - Choose cities/counties to monitor with coverage status
3. **Governing Body Selection** - Pick specific bodies (City Council, Planning Commission, etc.)
4. **Topic Configuration** - Select development topics (Housing, Impact Fees, Industrial, Data Centers)
5. **Account Setup** - Email capture for alert delivery
6. **Billing & Completion** - Payment info and service activation

### **Key Features:**
- **Coverage Status System:** Active, Available, or On-Request jurisdictions
- **Simple Pricing:** $50 per governing body per month
- **AI Topic Matching:** Semantic understanding vs. keyword matching
- **24-Hour Alert Delivery:** Email notifications with agenda links
- **Request Access Flow:** Non-invited users can apply for platform access

## 💼 **Value Proposition**
- **Proactive Intelligence:** Visibility into discussions before they happen
- **Time Savings:** Eliminates manual website monitoring across jurisdictions
- **Strategic Advantage:** Early awareness enables preparation and influence
- **Comprehensive Coverage:** Monitor multiple jurisdictions without adding headcount
- **Accuracy:** AI reduces false positives vs. keyword-based systems

## 🛠️ **Technical Requirements**
- **Responsive Design:** 2-column layout at 768px+ breakpoint, single column mobile
- **Brand Colors:** Navy blue primary (#002147) with hover states (#003a6b)
- **React Architecture:** Multi-step wizard with state management
- **Form Validation:** Email validation, required fields, progressive disclosure
- **Mobile-First:** Touch-friendly interfaces, proper spacing

## 📊 **Business Model**
- **Invite-Only Access:** Maintains exclusivity and service quality
- **Simple Pricing:** $50 per governing body per month (City Council or Planning Commission)
- **Professional Market:** Targets established development teams with budget authority
- **Consultation Included:** First week includes optimization support
- **Pricing Strategy:** Costs are hidden during configuration steps, revealed only at billing

## 🎨 **Design System**
- **Color Palette:** Navy blue (#002147), whites, grays, status colors (green/blue/orange)
- **Typography:** Clean, professional hierarchy
- **Components:** Cards, forms, progress indicators, navigation buttons
- **Icons:** Lucide React icon library
- **Responsive Grid:** Tailwind CSS with mobile-first approach

## 🚀 **Next Development Opportunities**
- Dashboard/monitoring interface post-signup
- Admin panel for managing coverage areas
- Advanced filtering and alert customization
- Integration with calendar/project management tools
- Analytics and reporting features
- API for enterprise integrations

This prototype establishes the core onboarding experience and value communication for a B2B SaaS platform targeting the real estate development industry's need for municipal intelligence.

## 📝 **Project Instructions**

### General Guidelines
- Always read through the entire file when told to read through the entire file, so you get full context and make less mistakes
- Always keep tabs and update docs
- Always verify your work: You are my lead engineer. Assume the following mindset for a production SaaS: fix root causes, test after each fix, but also ensure the whole pipeline is robust and not just "patched" in one spot. This is a holistic, lead-engineer-level approach.
- Always use descriptive variable names
- Always verify and unit test your work to ensure code quality, reliability, and catch potential issues early in the development process

### Important Instruction Reminders
- Do what has been asked; nothing more, nothing less.
- NEVER create files unless they're absolutely necessary for achieving your goal.
- ALWAYS prefer editing an existing file to creating a new one.
- NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.

## 🔍 **Application Audit Findings**

### **Architecture & Code Quality**
✅ **Strengths:**
- Single-file React component with clean functional architecture
- Well-structured step-based flow with clear state management
- Modular component design (CoverageBuilder, EmailCapture, BillingInfo)
- Consistent naming conventions and code organization
- Good separation of concerns between UI and logic

⚠️ **Areas for Improvement:**
- Component is 958 lines - could benefit from splitting into separate files
- Mock data is hardcoded - should move to API/external data source
- No TypeScript interfaces for complex objects (locations, topics, billingInfo)
- Missing custom hooks for form state management

### **State Management**
✅ **Current Implementation:**
- Uses React useState hooks effectively
- State is properly scoped to components
- Clean state reset functionality
- Proper state updates with immutability

⚠️ **Improvements Needed:**
- Consider useReducer for complex multi-step form state
- No persistence layer - form progress is lost on refresh
- Could benefit from context API for deeply nested state passing

### **UI/UX & Accessibility**
✅ **Well Implemented:**
- Clear visual hierarchy and professional design
- Consistent color scheme using brand colors (#002147)
- Good use of icons (Lucide React) for visual clarity
- Progress indicators for multi-step flow
- Clear CTAs and navigation

⚠️ **Accessibility Gaps:**
- Missing ARIA labels on interactive elements
- No keyboard navigation testing evident
- Form inputs lack proper error announcement
- Missing focus management between steps
- No skip navigation links

### **Form Validation & Error Handling**
✅ **Current Validation:**
- Basic email validation (checks for @ symbol)
- Required field validation on critical inputs
- Disabled state management on navigation buttons

❌ **Missing:**
- No comprehensive email regex validation
- No phone number format validation
- No credit card validation (Luhn algorithm)
- No error messages displayed to users
- No field-level validation feedback
- No network error handling

### **Responsive Design**
✅ **Implemented Well:**
- Grid layouts with responsive breakpoints (lg:grid-cols-2)
- Mobile-first approach evident
- Proper spacing and padding adjustments
- Overflow handling for long lists

⚠️ **Could Improve:**
- Some text sizes might be small on mobile
- Complex forms could benefit from mobile-specific layouts
- Navigation could be sticky on mobile

### **Security Considerations**
❌ **Critical Issues:**
- Credit card data handled in plain text state
- No input sanitization
- No HTTPS enforcement mentioned
- No rate limiting on form submissions
- Missing CSRF protection

### **Performance Optimizations**
⚠️ **Opportunities:**
- Large component could benefit from code splitting
- No memoization of expensive calculations
- All location data loaded at once (could paginate)
- Missing React.memo for pure components

### **Missing Features & Improvements**
1. **Authentication & Session Management**
   - No JWT/session handling
   - No logout functionality
   - No session timeout

2. **Data Persistence**
   - No draft saving
   - No progress recovery
   - No local storage usage

3. **Enhanced UX Features**
   - No loading states
   - No success/error toasts
   - No confirmation dialogs
   - No help tooltips
   - No breadcrumb navigation

4. **Integration Readiness**
   - No API integration structure
   - No environment configuration
   - No feature flags
   - No analytics tracking

5. **Testing Infrastructure**
   - No unit tests visible
   - No integration test setup
   - No accessibility testing
   - No E2E test scenarios

### **Recommended Next Steps**
1. **High Priority:**
   - Implement proper form validation with user feedback
   - Add accessibility improvements (ARIA, focus management)
   - Secure credit card handling (tokenization/PCI compliance)
   - Split into smaller, testable components

2. **Medium Priority:**
   - Add loading and error states
   - Implement data persistence
   - Create reusable form components
   - Add comprehensive testing

3. **Future Enhancements:**
   - API integration layer
   - Advanced filtering/search
   - Real-time validation
   - Progressive enhancement

## 🖥️ **Claude CLI Local Installation Setup**

### **Overview**
This project is configured to use a local Claude CLI installation to avoid conflicts with global installations and ensure consistent behavior across different environments.

### **Installation Structure**
The local Claude installation is located at:
- **Installation Path:** `~/.claude/local/`
- **Executable:** `~/.claude/local/claude`
- **Node Modules:** `~/.claude/local/node_modules/@anthropic-ai/claude-code/`

### **Shell Configuration Files**
The following shell configuration files have been created to ensure the local Claude installation is always used:

1. **`.zshrc`** (Primary shell - macOS default)
   ```bash
   # Claude local installation configuration
   export PATH="$HOME/.claude/local:$PATH"
   alias claude="$HOME/.claude/local/claude"
   
   # Source .zprofile if it exists (for brew and other configs)
   [ -f ~/.zprofile ] && source ~/.zprofile
   ```

2. **`.bash_profile`** (Bash compatibility)
   ```bash
   # Claude local installation configuration for bash
   export PATH="$HOME/.claude/local:$PATH"
   alias claude="$HOME/.claude/local/claude"
   
   # Source .bashrc if it exists
   [ -f ~/.bashrc ] && source ~/.bashrc
   ```

3. **`.profile`** (POSIX shell compatibility)
   ```bash
   # Claude local installation configuration for POSIX shells
   export PATH="$HOME/.claude/local:$PATH"
   alias claude="$HOME/.claude/local/claude"
   ```

### **Settings Configuration**
The project includes a `.claude/settings.local.json` file with:
- IDE auto-connect configuration
- Permission settings for allowed bash commands
- MCP server configuration

### **Troubleshooting**

#### **Verify Installation**
To verify the local installation is being used:
```bash
which claude  # Should show: /Users/[username]/.claude/local/claude
claude --version
```

#### **Common Issues**

1. **Command not found after setup**
   - Solution: Source your shell configuration or open a new terminal
   ```bash
   source ~/.zshrc  # For zsh
   source ~/.bash_profile  # For bash
   ```

2. **Permission denied errors**
   - Solution: Ensure the claude executable has proper permissions
   ```bash
   chmod +x ~/.claude/local/claude
   ```

3. **Multiple installations conflict**
   - Check for multiple installations: `claude doctor`
   - The local installation should take precedence due to PATH ordering

4. **IDE not auto-connecting**
   - Ensure `.claude/settings.local.json` contains:
   ```json
   "mcp": {
     "servers": {
       "ide": {
         "command": "auto-connect"
       }
     }
   }
   ```

### **Maintenance**
- The local installation is self-contained in `~/.claude/local/`
- Updates can be managed via npm: `cd ~/.claude/local && npm update`
- Shell configurations ensure persistence across system restarts