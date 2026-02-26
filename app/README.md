<div align="center">

# 🚀 Giteria App

[![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](https://github.com/skygenesisenterprise/giteria/blob/main/LICENSE) [![TypeScript](https://img.shields.io/badge/TypeScript-5.9+-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/) [![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/) [![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/) [![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

**🔐 Modern GitHub-Like Platform Frontend - Enterprise-Ready Authentication & Collaboration**

A comprehensive Next.js frontend application providing a complete GitHub-like platform experience with **enterprise authentication**, **organization management**, **repository hosting**, **collaboration tools**, and **marketplace integration**.

[🚀 Quick Start](#-quick-start) • [📋 What's New](#-whats-new) • [🛠️ Tech Stack](#️-tech-stack) • [📁 Architecture](#-architecture) • [🔐 Authentication](#-authentication-system) • [🤝 Contributing](#-contributing)

[![GitHub stars](https://img.shields.io/github/stars/skygenesisenterprise/giteria?style=social)](https://github.com/skygenesisenterprise/giteria/stargazers) [![GitHub forks](https://img.shields.io/github/forks/skygenesisenterprise/giteria?style=social)](https://github.com/skygenesisenterprise/giteria/network)

</div>

---

## 🌟 What is Giteria App?

**Giteria App** is a modern, enterprise-ready frontend application that powers a comprehensive GitHub-like platform. Built with **Next.js 16** and **React 19**, it delivers a seamless experience for developers and organizations to manage code, collaborate on projects, and build communities.

### 🎯 Our Vision

- **🚀 Modern Frontend Architecture** - Next.js 16 + React 19 + TypeScript 5.9
- **🔐 Enterprise Authentication** - JWT, TOTP, OAuth, and multi-factor authentication
- **🏢 Organization Management** - Complete org dashboard, teams, and members
- **📦 Repository Hosting** - Full Git repository management interface
- **🤝 Collaboration Tools** - Issues, pull requests, discussions, milestones
- **🛒 Marketplace** - App marketplace with actions and integrations
- **📊 Analytics & Insights** - Usage metrics and performance tracking
- **🔒 Security Features** - Secret scanning, dependabot, code scanning

---

## - Recent Updates 🆕 What's New

### 🎯 **Major Features Added**

#### 🔐 **Enhanced Authentication System** (NEW)

- ✅ **TOTP Support** - Time-based one-time password authentication
- ✅ **OAuth Integration** - GitHub OAuth and external identity providers
- ✅ **Multi-Factor Authentication** - Complete MFA flow with QR codes
- ✅ **Organization-Level Auth** - Organization-specific login policies
- ✅ **Password Recovery** - Complete forgot/reset password flow

#### 🏢 **Organization Management** (NEW)

- ✅ **Organization Dashboard** - Complete org overview and management
- ✅ **Team Management** - Create and manage teams with permissions
- ✅ **Member Management** - Invite and manage organization members
- ✅ **Organization Settings** - Configure org preferences and security

#### 🛒 **Marketplace Integration** (NEW)

- ✅ **App Marketplace** - Browse and install marketplace applications
- ✅ **GitHub Actions** - Workflow automation and CI/CD integration
- ✅ **App Configuration** - Per-repository and org-level app settings

---

## 🚀 Quick Start

### 📋 Prerequisites

- **Node.js** 18.0.0 or higher
- **pnpm** 9.0.0 or higher (recommended package manager)
- **TypeScript** 5.9+ (strict mode)

### 🔧 Installation & Setup

1. **Install dependencies**

   ```bash
   pnpm install
   ```

2. **Environment setup**

   ```bash
   cp .env.example .env.local
   ```

3. **Start development server**

   ```bash
   pnpm dev
   ```

4. **Build for production**

   ```bash
   pnpm build
   pnpm start
   ```

### 🌐 Access Points

Once running, you can access:

- **Frontend**: [http://localhost:3001](http://localhost:3001)
- **Public Home**: [http://localhost:3001/home](http://localhost:3001/home)
- **Dashboard**: [http://localhost:3001/dashboard](http://localhost:3001/dashboard)
- **Marketplace**: [http://localhost:3001/marketplace](http://localhost:3001/marketplace)

---

## 🛠️ Tech Stack

### 🎨 **Frontend Layer**

```
Next.js 16 + React 19 + TypeScript 5.9
├── 🎨 Tailwind CSS v4 + Radix UI (Styling & Components)
├── 🔐 JWT Authentication (Complete Implementation)
├── 🛣️ Next.js App Router (Routing)
├── 📝 TypeScript Strict Mode (Type Safety)
├── 🔄 React Context (State Management)
├── 📊 Recharts (Data Visualization)
├── 🎬 Framer Motion (Animations)
└── 🔧 ESLint + Prettier (Code Quality)
```

### 📦 **Key Dependencies**

```
Core Framework
├── next: 16.1.6          # React framework with App Router
├── react: ^19            # UI library
└── typescript: 5.9.3     # Type safety

UI Components
├── @radix-ui/*           # Accessible UI primitives
├── tailwindcss: ^4.2.0   # Utility-first CSS
├── lucide-react: ^0.575  # Icon library
└── shadcn/ui             # Component library

State & Forms
├── react-hook-form: ^7.54 # Form handling
├── zod: ^4.3.6            # Schema validation
└── @hookform/resolvers    # Form resolvers

Authentication
├── aether-identity       # Identity management
└── jwt-auth-context      # JWT state management

Utilities
├── date-fns: 4.1         # Date formatting
├── pino: ^10.3           # Logging
└── loglayer: ^9.1        # Structured logging
```

---

## 📁 Architecture

### 🏗️ Application Structure

```
app/
├── app/                        # Next.js App Router
│   ├── (public)/              # Public pages
│   │   ├── home/              # Landing page
│   │   └── layout.tsx         # Public layout
│   ├── (auth)/                # Authentication pages
│   │   ├── login/             # Login flow
│   │   ├── register/          # Registration
│   │   ├── forgot/           # Password recovery
│   │   ├── totp/             # TOTP authentication
│   │   └── oauth/             # OAuth integration
│   ├── (platform)/            # Platform pages
│   │   ├── dashboard/         # User dashboard
│   │   ├── marketplace/       # App marketplace
│   │   ├── [owner]/           # Org/USER pages
│   │   └── layout.tsx         # Platform layout
│   ├── (admin)/               # Admin pages
│   └── page.tsx               # Root redirect
├── components/                 # React components
│   ├── ui/                   # Base UI components
│   ├── login-form.tsx        # Authentication forms
│   ├── DashboardLayout.tsx   # Dashboard layout
│   └── Footer.tsx            # Footer component
├── context/                    # React contexts
│   ├── AuthContext.tsx       # Authentication state
│   ├── JwtAuthContext.tsx    # JWT token management
│   └── LicenseContext.tsx    # License management
├── config/                     # Configuration
│   └── navigation.ts         # Navigation config
├── lib/                        # Utility functions
│   ├── utils.ts              # General utilities
│   ├── logger.ts             # Logging utilities
│   └── navigation-config.ts  # Nav configuration
├── styles/                     # Styles
│   └── globals.css           # Global styles
├── infra/                      # Infrastructure
│   ├── Dockerfile            # Docker configuration
│   ├── Dockerfile.dev        # Dev Docker config
│   └── docker-compose*.yml   # Docker Compose
├── public/                    # Static assets
├── config/                    # Environment config
└── package.json              # Dependencies
```

### 🔄 **Route Structure**

````
Routes
├── /                         # Root → redirects to /home or /dashboard
├── /home                     # Public landing page
├── /login                    # Login page
│   ├── /options             # Login method selection
│   ├── /organization        # Organization login
│   ├── /pin-method          # PIN login
│   └── /github              # GitHub OAuth
├── /register                # Registration
│   ├── /confirmed           # Registration success
│   └── /forgot              # Password recovery
├── /forgot                  # Forgot password
│   └── /confirmed           # Reset email sent
├── /totp                    # TOTP authentication
│   ├── /register           # TOTP setup
│   └── /confirmed          # TOTP success
├── /oauth/authorize         # OAuth authorization
├── /dashboard               # User dashboard
├── /marketplace             # App marketplace
│   ├── /app/[id]           # App details
│   └── /actions            # GitHub Actions
├── /[owner]                 # Organization/User page
│   ├── /repos              # Repository list
│   ├── /teams              # Team management
│   ├── /people             # Member management
│   ├── /projects           # Projects
│   ├── /discussions        # Discussions
│   ├── /settings           # Org settings
│   └── /[repo]             # Repository
│       ├── /issues        # Issues
│       ├── /pulls         # Pull requests
│       ├── /actions       # Actions
│       ├── /releases       # Releases
│       ├── /security       # Security features
│       ├── /insights       # Analytics
│       └── /settings       # Repo settings
└── /account # Create organization
/org/new       ```

---

## 🔐 Authentication System

### 🎯 **Complete Implementation**

The authentication system is fully implemented with multiple authentication methods:

- **JWT Tokens** - Secure token-based authentication with refresh
- **TOTP** - Time-based one-time password with QR code setup
- **OAuth** - GitHub OAuth and external provider integration
- **Password Recovery** - Complete forgot/reset password flow
- **Organization Auth** - Organization-specific login policies
- **Protected Routes** - Route-based authentication guards

### 🔄 **Authentication Flow**

```typescript
// Authentication Methods
1. Email/Password Login → JWT token generation
2. TOTP Setup → QR code → Verification
3. OAuth → Provider callback → JWT token
4. Password Reset → Email verification → New password
````

---

## 📊 Features

### 🏢 **Organization Management**

- Organization dashboard and overview
- Team creation and management
- Member invitation and management
- Organization settings and preferences
- Billing and license management

### 📦 **Repository Features**

- Repository listing and creation
- Code browsing with syntax highlighting
- Issue tracking and management
- Pull request workflow
- Release management
- Wiki and documentation
- Security features (secret scanning, dependabot)
- Actions and CI/CD workflows

### 🤝 **Collaboration**

- Issue creation and assignment
- Pull request reviews
- Discussion forums
- Milestone tracking
- Project boards

### 🛒 **Marketplace**

- Application discovery
- GitHub Actions integration
- App installation and configuration
- Workflow automation

### 📈 **Analytics**

- Repository insights
- Usage metrics
- Performance tracking

---

## 💻 Development

### 📝 **Available Scripts**

```bash
# Development
pnpm dev              # Start development server (port 3001)
pnpm dev:local        # Start with local environment
pnpm dev:debug        # Start with debug logging

# Building
pnpm build            # Build for production
pnpm start            # Start production server

# Code Quality
pnpm lint             # Run ESLint
pnpm typecheck        # Type check with TypeScript

# Utilities
pnpm clean            # Clean build artifacts
```

### 🎯 **Development Guidelines**

- **TypeScript Strict Mode** - All code must pass strict type checking
- **React 19** - Use latest React features and patterns
- **Next.js App Router** - Follow App Router conventions
- **Tailwind CSS v4** - Use utility-first styling
- **Radix UI** - Build accessible components
- **Conventional Commits** - Use standardized commit messages

---

## 🐳 Docker

### 🚀 **Quick Start with Docker**

```bash
# Development
docker-compose -f infra/docker-compose.dev.yml up

# Production
docker-compose -f infra/docker-compose.yml up -d
```

### 📦 **Docker Files**

- `infra/Dockerfile` - Production container
- `infra/Dockerfile.dev` - Development container
- `infra/docker-compose.yml` - Production compose
- `infra/docker-compose.dev.yml` - Development compose

---

## 🔗 Related Packages

This is part of the Giteria monorepo:

- **@giteria/server** - Backend API (Go + Gin)
- **@giteria/cli** - Command-line tools
- **@giteria/services** - Core services
- **@giteria/package** - SDK packages

---

## 🤝 Contributing

We're looking for contributors to help build this comprehensive GitHub-like platform!

### 🎯 **How to Get Started**

1. **Fork the repository** and create a feature branch
2. **Check the issues** for tasks that need help
3. **Join discussions** about architecture and features
4. **Start small** - Documentation, tests, or minor features
5. **Follow our code standards** and commit guidelines

### 🏗️ **Areas Needing Help**

- **Frontend Development** - React components, UI/UX design
- **Authentication** - Security, OAuth, MFA
- **State Management** - Context optimization
- **Performance** - Optimization and caching
- **Testing** - Unit and integration tests
- **Documentation** - API docs, guides, tutorials

---

## 📞 Support & Community

### 💬 **Get Help**

- 📖 **Documentation** - Comprehensive guides
- 🐛 **[GitHub Issues](https://github.com/skygenesisenterprise/giteria/issues)** - Bug reports
- 💡 **[GitHub Discussions](https://github.com/skygenesisenterprise/giteria/discussions)** - Questions

---

## 📊 Project Status

| Component                   | Status     | Technology              | Notes                       |
| --------------------------- | ---------- | ----------------------- | --------------------------- |
| **Frontend Framework**      | ✅ Working | Next.js 16 + React 19   | App Router                  |
| **Authentication System**   | ✅ Working | JWT + TOTP + OAuth      | Complete implementation     |
| **UI Component Library**    | ✅ Working | Radix + Tailwind CSS v4 | shadcn/ui inspired          |
| **Organization Management** | ✅ Working | React + TypeScript      | Full org dashboard          |
| **Repository Interface**    | ✅ Working | Next.js + React         | Code browsing, issues, PRs  |
| **Marketplace**             | ✅ Working | React + TypeScript      | App discovery               |
| **Docker Deployment**       | ✅ Working | Multi-Stage             | Production-ready containers |
| **Admin Dashboard**         | ✅ Working | React + TypeScript      | Admin interface             |

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 Sky Genesis Enterprise

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 🙏 Acknowledgments

- **Sky Genesis Enterprise** - Project leadership and development
- **Go Community** - High-performance programming language and ecosystem
- **Gin Framework** - Lightweight HTTP web framework
- **GORM Team** - Modern Go database library
- **Next.js Team** - Excellent React framework
- **React Team** - Modern UI library
- **shadcn/ui** - Beautiful component library
- **pnpm** - Fast, disk space efficient package manager
- **Make** - Universal build automation and command interface
- **Docker Team** - Container platform and tools
- **Open Source Community** - Tools, libraries, and inspiration

---

<div align="center">

### 🚀 **Join Us in Building the Future of Self-Hosted Git!**

[⭐ Star This Repo](https://github.com/skygenesisenterprise/giteria) • [🐛 Report Issues](https://github.com/skygenesisenterprise/giteria/issues) • [💡 Start a Discussion](https://github.com/skygenesisenterprise/giteria/discussions)

---

**🔧 Building the next generation of self-hosted software development platform**

**Made with ❤️ by the [Sky Genesis Enterprise](https://skygenesisenterprise.com) team**

</div>
