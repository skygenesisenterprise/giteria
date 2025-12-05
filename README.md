<div align="center">

# 🚀 Giteria

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.14-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.6.0-2D3748?logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?logo=postgresql)](https://www.postgresql.org/)

**The open-source Git platform with AI-powered development tools**

[Quick Start](#-quick-start) • [Documentation](#-documentation) • [Contributing](#-contributing)

</div>

---

## 📖 Overview

**Giteria** is a comprehensive, self-hostable Git platform that combines the power of modern version control with cutting-edge AI assistance. Built for developers who value privacy, control, and intelligent workflows, Giteria offers a GitHub-like experience with enhanced AI capabilities and enterprise-grade features.

### 🎯 Current Status

This is an **active development** version of Giteria. The frontend is built with Next.js 15 and React 19, featuring a modern component library and comprehensive routing structure. The backend API and database schema are being implemented in parallel.

---

## ✨ Features

### 🔄 Core Git Operations (Planned)
- **Repository Management**: Create, clone, fork, and manage Git repositories
- **Branching & Merging**: Advanced branch management with pull requests
- **Code Review**: Comprehensive PR workflow with comments and approvals
- **Issue Tracking**: Full issue management with labels, milestones, and assignments
- **Wiki & Documentation**: Built-in documentation system for every repository

### 👥 Collaboration & Teams (In Development)
- **Organizations**: Multi-tenant organization support with role-based access
- **Team Management**: Create teams with granular permissions
- **User Profiles**: Rich user profiles with contributions and activity
- **Discussions**: Community discussions and Q&A sections

### 🤖 AI-Powered Development (Planned)
- **Code Copilot**: AI-powered code completion and suggestions
- **RAG Integration**: Repository-aware AI assistance
- **Custom Models**: Deploy and manage custom AI models
- **Smart Code Review**: AI-assisted code review and analysis

### ⚡ DevOps & Automation (Planned)
- **CI/CD Pipelines**: Built-in continuous integration and deployment
- **Package Registry**: Private package hosting for npm, Docker, and more
- **Webhooks**: Extensive webhook system for integrations
- **Actions**: Custom automation workflows

---

## 🛠️ Technology Stack

### Frontend (Current)
| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 15.5.4 | React framework with App Router |
| **React** | 19.1.0 | UI library with Server Components |
| **TypeScript** | 5.9.3 | Type-safe development |
| **Tailwind CSS** | 4.1.14 | Utility-first CSS framework |
| **Prisma Client** | 7.1.0 | Database ORM and type generation |
| **React Hook Form** | 7.47.0 | Form management with validation |
| **Zod** | 3.22.0 | Schema validation |

### Backend (Planned)
| Technology | Purpose |
|------------|---------|
| **Node.js** | Runtime environment |
| **Express.js** | REST API framework |
| **Prisma** | Database ORM |
| **PostgreSQL** | Primary database |
| **Redis** | Caching and sessions |

### Database Schema (Implemented)
- **Users & Authentication**: Complete user management with OAuth support
- **Organizations & Teams**: Multi-tenant organization structure
- **Repositories**: Full Git repository management
- **Issues & Pull Requests**: Comprehensive issue tracking and PR workflow
- **AI Models**: Support for custom AI model management
- **CI/CD**: Pipeline and job management
- **Security**: Secrets, environments, and access control

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ 
- **pnpm** 8+ (recommended) or npm/yarn
- **PostgreSQL** 14+ (for local development)
- **Git** 2.30+

### Installation

```bash
# Clone the repository
git clone https://github.com/go-giteria/giteria.git
cd giteria

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Set up the database
pnpm run db:generate  # Generate Prisma client
pnpm run db:push      # Push schema to database
pnpm run db:seed      # Seed database (optional)

# Start the development server
pnpm run dev
```

The application will be available at `http://localhost:3000`.

### Development Commands

```bash
# Development
pnpm run dev          # Start development server with Turbopack
pnpm run build        # Build for production with Turbopack
pnpm run start        # Start production server
pnpm run lint         # Run ESLint

# Database
pnpm run db:generate  # Generate Prisma client
pnpm run db:push      # Push schema changes to database
pnpm run db:migrate   # Run database migrations
pnpm run db:studio    # Open Prisma Studio
pnpm run db:seed      # Seed database with sample data
pnpm run db:reset     # Reset database
```

---

## 🏗️ Project Structure

```
giteria/
├── app/                    # Next.js App Router application
│   ├── components/         # Reusable UI components
│   │   ├── ui/            # Base UI components (Button, Card, Input, etc.)
│   │   ├── [org]/         # Organization-specific components
│   │   ├── [user]/        # User-specific components
│   │   ├── Header.tsx     # Main navigation header
│   │   └── Footer.tsx     # Footer component
│   ├── contexts/           # React contexts (Auth, Theme)
│   ├── lib/               # Utilities and types
│   ├── styles/            # Global styles and Tailwind CSS
│   ├── [org]/             # Organization routes
│   │   ├── [repo]/        # Repository routes
│   │   │   ├── code/      # Code browser
│   │   │   ├── issues/    # Issue tracking
│   │   │   ├── pulls/     # Pull requests
│   │   │   ├── projects/  # Project management
│   │   │   ├── wiki/      # Documentation wiki
│   │   │   └── settings/  # Repository settings
│   │   ├── discussions/   # Community discussions
│   │   ├── packages/      # Package registry
│   │   ├── people/        # User management
│   │   ├── projects/       # Project management
│   │   ├── repos/         # Repository listing
│   │   ├── settings/      # Organization settings
│   │   └── teams/         # Team management
│   ├── [user]/            # User profile routes
│   ├── login/             # Authentication pages
│   ├── register/          # User registration
│   ├── organization/      # Organization management
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Dashboard/home page
├── api/                  # Backend API (planned)
│   └── src/
│       └── server.ts      # API server entry point
├── prisma/               # Database schema and migrations
│   └── schema.prisma     # Prisma database schema
├── public/               # Static assets
├── docs/                 # Documentation
├── .github/              # GitHub templates and configuration
└── docker-compose.yml     # Docker configuration (planned)
```

---

## 🎨 Component Architecture

### UI Component Library

The frontend includes a comprehensive component library built with Tailwind CSS and TypeScript:

#### Available Components
- **Button**: Versatile button with multiple variants and sizes
- **Card**: Flexible card container for content grouping
- **Input**: Form input with validation support
- **Alert**: Notification and alert components
- **Header**: Main navigation with user menu
- **Footer**: Application footer

#### Component Pattern
```typescript
// Example: Button Component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant = "default", size = "default", ...props }) => {
  // Component implementation
};
```

---

## 🔄 Route Structure

### App Router Architecture

Using Next.js 13+ App Router with dynamic routing:

#### Authentication Routes
- `/login` - User login page
- `/register` - User registration page

#### Dashboard & Overview
- `/` - Main dashboard

#### Organization Routes
- `/[org]` - Organization dashboard
- `/[org]/[repo]` - Repository overview
- `/[org]/[repo]/code` - Code browser
- `/[org]/[repo]/issues` - Issue tracking
- `/[org]/[repo]/pulls` - Pull requests
- `/[org]/[repo]/wiki` - Documentation wiki
- `/[org]/[repo]/settings` - Repository settings

#### User Routes
- `/[user]` - User profile
- `/[user]/[repo]` - User repository

#### Management Routes
- `/organization/new` - Create new organization
- `/repos` - Repository listing
- `/teams` - Team management

---

## 🗄️ Database Schema

### Core Entities

The Prisma schema includes comprehensive models for:

#### User Management
- **User**: User accounts with authentication
- **UserSession**: Session management
- **PersonalAccessToken**: API access tokens
- **OAuthAccount**: Third-party authentication

#### Organization & Teams
- **Organization**: Multi-tenant organizations
- **OrganizationMember**: Organization memberships
- **Team**: Team management
- **TeamMember**: Team memberships
- **TeamRepository**: Team repository permissions

#### Repository Management
- **Repository**: Git repositories
- **RepositoryMember**: Repository access control
- **Commit**: Git commits
- **Branch**: Repository branches
- **Tag**: Repository tags

#### Collaboration
- **Issue**: Issue tracking
- **PullRequest**: Pull request management
- **PullRequestReview**: Code reviews
- **Comment**: Comments and discussions
- **Milestone**: Project milestones

#### AI & Automation
- **Model**: AI model management
- **Pipeline**: CI/CD pipelines
- **PipelineJob**: Pipeline jobs
- **Webhook**: Webhook management

#### Security & Configuration
- **RepositorySecret**: Encrypted secrets
- **Environment**: Environment variables
- **ActivityLog**: Audit trail

---

## 🔒 Security Features

### Authentication & Authorization (Planned)
- **Multi-provider Auth**: GitHub, GitLab, Google OAuth
- **Enterprise SSO**: SAML and LDAP support
- **Session Management**: Secure token handling
- **Role-based Access**: Granular permissions system

### Security Best Practices
- **Type Safety**: TypeScript strict mode
- **Input Validation**: Zod schema validation
- **CSRF Protection**: Built-in CSRF token validation
- **Secure Headers**: HTTP security headers configuration

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

### WCAG 2.1 Compliance (Planned)
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

---

## 🧪 Testing Strategy

### Current Status
Tests are not yet configured but are planned for implementation.

### Planned Testing Framework
- **Unit Tests**: Component testing with React Testing Library
- **Integration Tests**: API integration testing
- **E2E Tests**: Playwright for end-to-end testing
- **Visual Regression**: Chromatic for UI testing

---

## 🚀 Deployment

### Development Environment
```bash
# Start development server
pnpm run dev
```

### Production Build
```bash
# Build optimized for production
pnpm run build

# Start production server
pnpm run start
```

### Environment Configuration
```bash
# Required environment variables
DATABASE_URL=postgresql://user:password@localhost:5432/giteria
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```

### Docker Deployment (Planned)
```bash
# Build and run with Docker
docker-compose up -d
```

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### 🎯 Ways to Contribute
- **🐛 Report Bugs**: Found an issue? [Open a bug report](https://github.com/go-giteria/giteria/issues/new?template=bug_report.yml)
- **💡 Feature Requests**: Have an idea? [Suggest a feature](https://github.com/go-giteria/giteria/issues/new?template=feature_request.yml)
- **📝 Documentation**: Help improve our documentation
- **🔧 Code Contributions**: Fix bugs or implement features
- **🎨 Design**: Improve UI/UX design
- **🧪 Testing**: Write tests and improve test coverage

### 🛠️ Development Setup
```bash
# Fork and clone the repository
git clone https://github.com/go-giteria/giteria.git
cd giteria

# Install dependencies
pnpm install

# Set up development environment
cp .env.example .env.local
pnpm run db:generate

# Start development server
pnpm run dev
```

### 📋 Pull Request Process
1. **Create a feature branch**: `git checkout -b feature/amazing-feature`
2. **Make your changes** and ensure they follow the code style
3. **Run linting**: `pnpm run lint`
4. **Test thoroughly**: Manual testing of all affected areas
5. **Commit your changes**: `git commit -m "feat: add amazing feature"`
6. **Push to your fork**: `git push origin feature/amazing-feature`
7. **Open a Pull Request** with a detailed description

### 📜 Code of Conduct
Please read our [Code of Conduct](CODE_OF_CONDUCT.md) to ensure a welcoming and inclusive environment for all contributors.

---

## 🆘 Support

### 📞 Getting Help
- **📖 Documentation**: Check the [app/README.md](app/README.md) for frontend-specific documentation
- **💬 Discussions**: [GitHub Discussions](https://github.com/go-giteria/giteria/discussions)
- **🐛 Issues**: [GitHub Issues](https://github.com/go-giteria/giteria/issues)
- **📧 Email**: [support@giteria.com](mailto:support@giteria.com)

---

## 🗺️ Roadmap

### Current Development (v0.1.0)
- ✅ Frontend foundation with Next.js 15 and React 19
- ✅ Comprehensive database schema with Prisma
- ✅ Component library with Tailwind CSS
- ✅ Routing structure for organizations and repositories
- 🔄 Authentication system implementation
- 🔄 Backend API development
- 🔄 Git integration

### Near-term (v0.2.0)
- 🔄 Complete authentication flow
- 🔄 Repository creation and management
- 🔄 Basic issue tracking
- 🔄 Pull request workflow
- 🔄 User profiles and organizations

### Medium-term (v0.3.0)
- 🔄 Advanced AI features
- 🔄 CI/CD pipeline integration
- 🔄 Enhanced security features
- 🔄 Mobile responsiveness improvements

### Long-term (v1.0.0)
- 📋 Production-ready deployment
- 📋 Advanced analytics
- 📋 Enterprise features
- 📋 Plugin system

---

## 📊 Project Statistics

![GitHub stars](https://img.shields.io/github/stars/go-giteria/giteria?style=social)
![GitHub forks](https://img.shields.io/github/forks/go-giteria/giteria?style=social)
![GitHub issues](https://img.shields.io/github/issues/go-giteria/giteria)
![GitHub pull requests](https://img.shields.io/github/issues-pr/go-giteria/giteria)
![GitHub contributors](https://img.shields.io/github/contributors/go-giteria/giteria)

---

## 📄 License

This project is licensed under **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

Built with ❤️ by [Sky Genesis Enterprise](https://skygenesisenterprise.com) and the open-source community.

---

<div align="center">

**[⭐ Star this repo](https://github.com/go-giteria/giteria) • [🐛 Report issues](https://github.com/go-giteria/giteria/issues) • [💬 Join discussions](https://github.com/go-giteria/giteria/discussions)**

Made with ☕ and 🎧 by the Giteria team

</div>