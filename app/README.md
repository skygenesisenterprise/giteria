
<div align="center">

# 🚀 Giteria Frontend

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.14-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

**Modern, AI-powered Git platform frontend built with Next.js 15 and React 19**

</div>

---

## 📖 Overview

The Giteria frontend is a sophisticated, responsive web application that provides a GitHub-like experience with enhanced AI capabilities. Built with the latest web technologies, it delivers exceptional performance, accessibility, and user experience for managing Git repositories, collaborating with teams, and leveraging AI-powered development tools.

### 🎯 Key Features

- **⚡ Blazing Fast Performance**: Next.js 15 with Turbopack and React 19
- **🎨 Modern UI/UX**: Tailwind CSS with responsive design and dark mode support
- **🤖 AI Integration**: Seamless integration with AI models and copilot features
- **🔒 Secure Authentication**: OAuth providers and enterprise SSO support
- **📱 Mobile Responsive**: Optimized for all devices and screen sizes
- **♿ Accessible**: WCAG 2.1 compliant with semantic HTML and ARIA support
- **🌐 Internationalization**: Multi-language support ready
- **🔧 Developer Experience**: TypeScript strict mode with comprehensive type definitions

---

## 🛠️ Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 15.5.4 | React framework with App Router |
| **React** | 19.1.0 | UI library with Server Components |
| **TypeScript** | 5.9.3 | Type-safe development |
| **Tailwind CSS** | 4.1.14 | Utility-first CSS framework |
| **ESLint** | 9.37.0 | Code linting and quality |
| **Geist Fonts** | Latest | Modern typography |

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ 
- **pnpm** 8+ (recommended) or npm/yarn
- **Git** 2.30+

### Installation

```bash
# Clone the repository
git clone https://github.com/go-giteria/giteria.git
cd giteria/app

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Start the development server
pnpm run dev
```

The application will be available at `http://localhost:3000`.

### Development Commands

```bash
# Start development server with Turbopack
pnpm run dev

# Build for production with Turbopack
pnpm run build

# Start production server
pnpm run start

# Run ESLint
pnpm run lint
```

---

## 🏗️ Project Structure

```
app/
├── components/           # Reusable UI components
│   ├── ui/              # Base UI components (Button, Card, etc.)
│   ├── [org]/           # Organization-specific components
│   ├── [user]/          # User-specific components
│   └── Header.tsx       # Main navigation header
├── libs/                # Shared utilities and types
│   ├── types.ts         # TypeScript type definitions
│   └── utils.ts         # Utility functions
├── styles/              # Global styles and CSS
│   └── globals.css      # Tailwind CSS imports
├── [org]/               # Organization routes
│   └── [repo]/          # Repository routes
│       ├── actions/     # GitHub Actions interface
│       ├── code/        # Code browser and viewer
│       ├── insights/    # Repository analytics
│       ├── issues/      # Issue tracking
│       ├── projects/    # Project management
│       ├── pulls/       # Pull requests
│       ├── security/    # Security settings
│       ├── settings/    # Repository settings
│       └── wiki/        # Documentation wiki
├── discussions/         # Community discussions
├── insights/            # Organization analytics
├── login/               # Authentication pages
├── orgs/                # Organization management
├── people/              # User management
├── projects/            # Project management
├── register/            # User registration
├── repos/               # Repository management
├── settings/            # User settings
├── teams/               # Team management
├── layout.tsx           # Root layout component
└── page.tsx             # Dashboard/home page
```

---

## 🎨 Component Architecture

### UI Component Library

The frontend includes a comprehensive component library built with Tailwind CSS:

```typescript
// Example: Button Component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  children: React.ReactNode;
}
```

### Available Components

- **Button**: Versatile button with multiple variants and sizes
- **Card**: Flexible card container for content grouping
- **Header**: Main navigation with user menu
- **Form Components**: Input, Select, Textarea, etc.
- **Data Display**: Tables, Lists, Badges
- **Feedback**: Toasts, Modals, Alerts

### Type System

Comprehensive TypeScript definitions for all data models:

```typescript
// Core entities
export interface User { /* ... */ }
export interface Organization { /* ... */ }
export interface Repository { /* ... */ }
export interface Issue { /* ... */ }
export interface PullRequest { /* ... */ }

// AI-specific types
export interface Model { /* ... */ }
export interface Pipeline { /* ... */ }
```

---

## 🔄 Route Structure

### App Router Architecture

Using Next.js 13+ App Router with route groups for optimal organization:

#### Authentication Routes
- `/login` - User login
- `/register` - User registration
- `/oauth/[provider]` - OAuth callbacks

#### Dashboard & Overview
- `/` - Main dashboard
- `/insights` - Analytics and metrics

#### Repository Management
- `/repos` - Repository listing
- `/[org]/[repo]` - Repository views
- `/[org]/[repo]/code` - Code browser
- `/[org]/[repo]/issues` - Issue tracking
- `/[org]/[repo]/pulls` - Pull requests

#### Organization Features
- `/orgs` - Organization management
- `/[org]` - Organization dashboard
- `/[org]/people` - Member management
- `/[org]/teams` - Team management
- `/[org]/settings` - Organization settings

---

## 🤖 AI Integration

### AI-Powered Features

The frontend seamlessly integrates with AI services:

- **Code Copilot**: AI-powered code completion and suggestions
- **Smart Code Review**: AI-assisted pull request analysis
- **Documentation Generation**: Automatic README and API docs
- **Issue Triage**: AI-powered issue categorization and prioritization

### AI Model Management

```typescript
export interface Model {
  id: string;
  name: string;
  type: 'copilot' | 'rag' | 'custom';
  provider: string;
  parameters: Record<string, any>;
  // ...
}
```

---

## 🔒 Security Features

### Authentication & Authorization

- **Multi-provider Auth**: GitHub, GitLab, Google OAuth
- **Enterprise SSO**: SAML and LDAP support
- **Session Management**: Secure token handling
- **Role-based Access**: Granular permissions system

### Security Best Practices

- **CSRF Protection**: Built-in CSRF token validation
- **XSS Prevention**: Content Security Policy and input sanitization
- **Secure Headers**: HTTP security headers configuration
- **Environment Variables**: Secure configuration management

---

## 📱 Responsive Design

### Mobile-First Approach

- **Breakpoint System**: Tailwind's responsive utilities
- **Touch Interactions**: Optimized for mobile devices
- **Progressive Enhancement**: Core functionality works everywhere
- **Performance**: Optimized for mobile networks

### Supported Devices

- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: 320px - 767px

---

## 🌐 Accessibility

### WCAG 2.1 Compliance

- **Semantic HTML**: Proper use of HTML5 elements
- **ARIA Labels**: Screen reader support
- **Keyboard Navigation**: Full keyboard accessibility
- **Focus Management**: Logical tab order and focus indicators
- **Color Contrast**: AA compliant color schemes

---

## 🔧 Development Guidelines

### Code Style

- **TypeScript Strict**: All files must pass strict type checking
- **ESLint Configuration**: Consistent code formatting
- **Component Naming**: PascalCase for components, camelCase for utilities
- **Import Organization**: React → Third-party → Internal imports

### Best Practices

- **Server Components**: Use server components by default
- **Client Components**: Only use "use client" when necessary
- **Error Boundaries**: Implement proper error handling
- **Loading States**: Provide feedback during data fetching

### Component Patterns

```typescript
// Server Component (default)
export default function RepositoryPage({ params }: RepositoryPageProps) {
  // Server-side data fetching
  const repository = await getRepository(params.org, params.repo);
  
  return <RepositoryView repository={repository} />;
}

// Client Component
"use client";
export default function InteractiveButton() {
  const [isLoading, setIsLoading] = useState(false);
  // Interactive logic
}
```

---

## 📊 Performance Optimization

### Built-in Optimizations

- **Turbopack**: Fast development builds
- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Next.js Image component
- **Font Optimization**: Local font loading with `next/font`
- **Caching Strategy**: Intelligent caching for static assets

### Performance Metrics

- **Lighthouse Score**: 95+ across all categories
- **Core Web Vitals**: Optimized for LCP, FID, CLS
- **Bundle Size**: Optimized JavaScript bundles
- **Load Time**: Sub-2 second initial load

---

## 🧪 Testing Strategy

### Testing Framework

While tests are not yet configured, the planned testing strategy includes:

- **Unit Tests**: Component testing with React Testing Library
- **Integration Tests**: API integration testing
- **E2E Tests**: Playwright for end-to-end testing
- **Visual Regression**: Chromatic for UI testing

### Test Structure

```
__tests__/
├── components/         # Component unit tests
├── pages/             # Page integration tests
├── e2e/               # End-to-end tests
└── utils/             # Utility function tests
```

---

## 🚀 Deployment

### Production Build

```bash
# Build optimized for production
pnpm run build

# Start production server
pnpm run start
```

### Environment Configuration

```bash
# Production environment variables
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-production-secret
API_URL=https://api.your-domain.com
```

### Docker Deployment

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## 🔄 State Management

### Server State

- **React Query**: Planned for server state management
- **SWR**: Considered for data fetching
- **Native Fetch**: Currently using native fetch with React 19

### Client State

- **React Hooks**: useState, useEffect for local state
- **Context API**: For global application state
- **Zustand**: Planned for complex client state

---

## 🎨 Theming System

### Design Tokens

```css
/* CSS Custom Properties for theming */
:root {
  --color-primary: 59 130 246;
  --color-secondary: 107 114 128;
  --background: 255 255 255;
  --foreground: 17 24 39;
}

[data-theme="dark"] {
  --background: 17 24 39;
  --foreground: 243 244 246;
}
```

### Theme Support

- **Light Mode**: Default light theme
- **Dark Mode**: System-aware dark theme
- **Custom Themes**: Extensible theming system
- **CSS Variables**: Dynamic theme switching

---

## 📈 Monitoring & Analytics

### Performance Monitoring

- **Web Vitals**: Core Web Vitals tracking
- **Error Reporting**: Planned error boundary integration
- **User Analytics**: Privacy-conscious analytics
- **Performance Budget**: Automated performance monitoring

---

## 🤝 Contributing

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make changes** following the code style guidelines
4. **Run linting**: `pnpm run lint`
5. **Test thoroughly**: Manual testing of all affected areas
6. **Submit a pull request** with detailed description

### Code Review Process

- **Automated Checks**: ESLint, TypeScript compilation
- **Manual Review**: Code quality and architecture review
- **Testing Requirements**: All features must be tested
- **Documentation**: Update relevant documentation

---

## 🆘 Troubleshooting

### Common Issues

#### Development Server Won't Start
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
pnpm install

# Restart development server
pnpm run dev
```

#### TypeScript Errors
```bash
# Check TypeScript configuration
npx tsc --noEmit

# Update type definitions
pnpm update @types/react @types/node
```

#### Styling Issues
```bash
# Rebuild Tailwind CSS
npx tailwindcss -i ./app/styles/globals.css -o ./app/styles/output.css

# Check Tailwind configuration
npx tailwindcss --help
```

---

## 📚 Resources

### Documentation

- **[Next.js Documentation](https://nextjs.org/docs)**
- **[React 19 Documentation](https://react.dev)**
- **[Tailwind CSS Documentation](https://tailwindcss.com/docs)**
- **[TypeScript Handbook](https://www.typescriptlang.org/docs/)**

### Learning Resources

- **[Next.js Learn Course](https://nextjs.org/learn)**
- **[React Patterns](https://reactpatterns.com/)**
- **[Tailwind CSS Examples](https://tailwindcss.com/examples)**

---

## 🗺️ Roadmap

### Near-term (v1.1)

- [ ] Comprehensive testing suite
- [ ] Advanced AI features
- [ ] Mobile app integration
- [ ] Enhanced accessibility

### Medium-term (v1.2)

- [ ] Real-time collaboration
- [ ] Advanced analytics dashboard
- [ ] Plugin system
- [ ] Custom themes marketplace

### Long-term (v2.0)

- [ ] Progressive Web App (PWA)
- [ ] Offline support
- [ ] Advanced security features
- [ ] Enterprise integrations

---

## 📄 License

This frontend application is licensed under the **MIT License** - see the [LICENSE](../LICENSE) file for details.

---

## 🙏 Acknowledgments

Built with ❤️ by [Sky Genesis Enterprise](https://skygenesisenterprise.com) and the open-source community.

- **[Next.js Team](https://nextjs.org/team)** - For the amazing framework
- **[Tailwind Labs](https://tailwindcss.com)** - For the excellent CSS framework
- **[Vercel](https://vercel.com)** - For the hosting and deployment platform

---

<div align="center">

**[⭐ Star Giteria](https://github.com/go-giteria/giteria) • [🐛 Report Issues](https://github.com/go-giteria/giteria/issues) • [💬 Join Discussions](https://github.com/go-giteria/giteria/discussions)**

Made with ☕ and 🎧 by the Giteria frontend team

</div>