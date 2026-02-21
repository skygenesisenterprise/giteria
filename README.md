<div align="center">

# 🚀 Giteria

[![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](https://github.com/skygenesisenterprise/giteria/blob/main/LICENSE) [![Go](https://img.shields.io/badge/Go-1.21+-blue?style=for-the-badge&logo=go)](https://golang.org/) [![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/) [![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/) [![React](https://img.shields.io/badge/React-19.2.1-blue?style=for-the-badge&logo=react)](https://react.dev/)

**Painless self-hosted all-in-one software development service, including Git hosting, code review, team collaboration, package registry and CI/CD**

[🚀 Quick Start](#-quick-start) • [📋 What's New](#-whats-new) • [📊 Current Status](#-current-status) • [🛠️ Tech Stack](#️-tech-stack) • [📁 Architecture](#-architecture) • [🤝 Contributing](#-contributing)

[![GitHub stars](https://img.shields.io/github/stars/skygenesisenterprise/giteria?style=social)](https://github.com/skygenesisenterprise/giteria/stargazers) [![GitHub forks](https://img.shields.io/github/forks/skygenesisenterprise/giteria?style=social)](https://github.com/skygenesisenterprise/giteria/network) [![GitHub issues](https://img.shields.io/github/issues/github/skygenesisenterprise/giteria)](https://github.com/skygenesisenterprise/giteria/issues)

</div>

---

## 🌟 What is Giteria?

**Giteria** is a comprehensive, self-hosted all-in-one software development platform that provides **Git hosting**, **code review**, **team collaboration**, **package registry**, and **CI/CD** capabilities. Built as a modern alternative to existing solutions, Giteria offers a seamless experience for development teams seeking full control over their infrastructure.

### 🎯 Our Vision

- **🚀 Modern Architecture** - Go 1.21+ backend + TypeScript 5 frontend
- **📦 Complete Git Hosting** - Full-featured Git server with SSH/HTTPS support
- **🔐 Complete Authentication System** - JWT-based system with login/register forms and context
- **⚡ High-Performance Backend** - Go-based server with **GORM + PostgreSQL** integration
- **🎨 Modern Frontend** - **Next.js 16 + React 19.2.1 + shadcn/ui** component library
- **🏗️ Enterprise-Ready Design** - Scalable, secure, and maintainable architecture
- **📚 Comprehensive Documentation** - Complete docs and API references
- **🛠️ Developer-Friendly** - Make commands, hot reload, TypeScript strict mode
- **📋 Issue Tracking** - Full-featured issue management with labels, milestones
- **🔀 Pull Requests** - Code review, merge requests, and collaboration
- **📦 Package Registry** - Host your own packages (npm, Go, etc.)
- **⚙️ CI/CD** - Integrated continuous integration and deployment pipelines

---

## 🆕 What's New

### 🎯 **Major Additions in v1.0+**

#### 🏗️ **Core Infrastructure** (NEW)

- ✅ **Hybrid Monorepo Architecture** - Go backend + TypeScript frontend workspaces
- ✅ **Complete Authentication System** - JWT with login/register forms and React context
- ✅ **Go Backend Server** - High-performance Gin API with **GORM + PostgreSQL**
- ✅ **Next.js 16 Frontend** - Modern React 19.2.1 with **shadcn/ui + Tailwind CSS v4**

#### 📝 **Code Collaboration** (NEW)

- ✅ **Issue Tracking System** - Full issue management with labels, milestones, and assignees
- ✅ **Pull Request/Merge Requests** - Code review, inline comments, and approvals
- ✅ **Repository Management** - Create, fork, and manage repositories
- ✅ **Access Control** - Organization and team permissions

#### 🔧 **Developer Tools** (NEW)

- ✅ **Wiki System** - Documentation and knowledge base for each repository
- ✅ **Activity Feed** - Track all project activities and notifications
- ✅ **SSH Key Management** - Secure Git access with deploy keys
- ✅ **Webhooks** - Integration with external services

#### 📦 **Package Ecosystem** (PLANNED)

- ✅ **Package Registry** - Host npm, Go, and other package types
- ✅ **CI/CD Pipelines** - Integrated continuous integration
- ✅ **Container Registry** - Docker container hosting (Future)

---

## 📊 Current Status

> **✅ In Development**: Building a comprehensive self-hosted Git platform with modern architecture.

### ✅ **Currently Implemented**

#### 🏗️ **Core Foundation**

- ✅ **Hybrid Monorepo Architecture** - Go backend + TypeScript frontend workspaces
- ✅ **Complete Authentication System** - JWT with login/register forms and React context
- ✅ **Go Backend Server** - High-performance Gin API with **GORM + PostgreSQL**
- ✅ **Next.js 16 Frontend** - Modern React 19.2.1 with **shadcn/ui + Tailwind CSS v4**
- ✅ **Database Layer** - **GORM with PostgreSQL** and comprehensive data models
- ✅ **Git Operations** - Git service layer with proper handling

#### 🔧 **Repository Management**

- ✅ **Repository Creation** - Create and manage Git repositories
- ✅ **Repository Browsing** - File browser with syntax highlighting
- ✅ **Branch Management** - Create, delete, and manage branches
- ✅ **Tag Management** - Release tagging support

#### 📝 **Collaboration Features**

- ✅ **Issue System** - Create, track, and manage issues
- ✅ **Issue Labels** - Categorize issues with labels
- ✅ **Milestones** - Track progress with milestones
- ✅ **Comments** - Discussion and comments on issues/PRs

#### 🛠️ **Development Infrastructure**

- ✅ **Development Environment** - Hot reload, TypeScript strict mode, Go modules
- ✅ **Docker Deployment** - Production-ready containers
- ✅ **Security Implementation** - Rate limiting, validation, security headers
- ✅ **Structured Logging** - Pino-based logging with correlation

### 🔄 **In Development**

- **Pull Request System** - Code review and merge requests
- **Organization Management** - Teams and organization settings
- **Wiki System** - Repository documentation
- **Activity Stream** - User and repository activities
- **API Documentation** - Comprehensive API documentation and testing

### 📋 **Planned Features**

- **Package Registry** - npm, Go, Maven repositories
- **CI/CD System** - Integrated pipelines
- **Container Registry** - Docker image hosting
- **Advanced Security** - 2FA, SSO, LDAP integration
- **Migration Tools** - Import from GitHub, GitLab, Gitea

---

## 🚀 Quick Start

### 📋 Prerequisites

- **Go** 1.21.0 or higher (for backend)
- **Node.js** 18.0.0 or higher (for frontend)
- **pnpm** 9.0.0 or higher (recommended package manager)
- **PostgreSQL** 14.0 or higher (for database)
- **Docker** (optional, for container deployment)
- **Make** (for command shortcuts - included with most systems)

### 🔧 Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/skygenesisenterprise/giteria.git
   cd giteria
   ```

2. **Quick start (recommended)**

   ```bash
   # One-command setup and start
   make quick-start
   ```

3. **Manual setup**

   ```bash
   # Install Go dependencies
   cd server && go mod download && cd ..

   # Install Node.js dependencies
   make install

   # Environment setup
   make env-dev

   # Database initialization
   make db-migrate

   # Start development servers
   make dev
   ```

### 🌐 Access Points

Once running, you can access:

- **Frontend**: [http://localhost:3001](http://localhost:3001)
- **API Server**: [http://localhost:8080](http://localhost:8080)
- **Health Check**: [http://localhost:8080/health](http://localhost:8080/health)

### 🎯 **Make Commands**

```bash
# 🚀 Quick Start & Development
make quick-start          # Install, migrate, and start dev servers
make dev                 # Start all services (frontend + backend)
make dev-frontend        # Frontend only (port 3001)
make dev-backend         # Backend only (port 8080)

# 🏗️ Building & Production
make build               # Build all packages
make start               # Start production servers

# 🗄️ Database
make db-studio           # Open Prisma Studio
make db-migrate          # Run migrations
make db-seed             # Seed development data

# 🔧 Code Quality & Testing
make lint                # Lint all packages
make typecheck           # Type check all packages
make format              # Format code with Prettier

# 🛠️ Utilities
make help                # Show all available commands
make status              # Show project status
make health              # Check service health
```

> 💡 **Tip**: Run `make help` to see all available commands organized by category.

---

## 🛠️ Tech Stack

### 🎨 **Frontend Layer**

```
Next.js 16 + React 19.2.1 + TypeScript 5
├── 🎨 Tailwind CSS v4 + shadcn/ui (Styling & Components)
├── 🔐 JWT Authentication (Complete Implementation)
├── 🛣️ Next.js App Router (Routing)
├── 📝 TypeScript Strict Mode (Type Safety)
├── 🔄 React Context (State Management)
└── 🔧 ESLint + Prettier (Code Quality)
```

### ⚙️ **Backend Layer**

```
Go 1.21+ + Gin Framework
├── 🗄️ GORM + PostgreSQL (Database Layer)
├── 🔐 JWT Authentication (Complete Implementation)
├── 🛡️ Middleware (Security, CORS, Logging)
├── 🌐 HTTP Router (Gin Router)
├── 📦 JSON Serialization (Native Go)
└── 📊 Structured Logging (Zerolog/Pino)
```

### 🗄️ **Data Layer**

```
PostgreSQL + GORM
├── 🏗️ Schema Management (Auto-migration)
├── 🔍 Query Builder (Type-Safe Queries)
├── 🔄 Connection Pooling (Performance)
├── 👤 User Models (Complete Implementation)
├── 📚 Repository Models
├── 📝 Issue & PR Models
└── 📈 Seed Scripts (Development Data)
```

### 🏗️ **Monorepo Infrastructure**

```
Make + pnpm Workspaces + Go Modules
├── 📦 app/ (Next.js Frontend - TypeScript)
├── ⚙️ server/ (Gin API - Go)
├── 🛠️ tools/ (Development Utilities - TypeScript)
├── 📚 services/ (Core Services - Go)
├── 🗂️ routers/ (API Routing - Go)
├── 📦 models/ (Data Models - Go)
└── 🐳 docker/ (Container Configuration)
```

---

## 📁 Architecture

### 🏗️ **Monorepo Structure**

```
giteria/
├── app/                     # Next.js 16 Frontend Application (TypeScript)
│   ├── components/         # React components with shadcn/ui
│   │   ├── ui/            # UI component library
│   │   └── ...
│   ├── context/           # React contexts
│   │   └── AuthContext.tsx # Authentication state
│   ├── lib/               # Utility functions
│   ├── styles/            # Tailwind CSS styling
│   └── ...
├── server/                 # Go Backend Server
│   ├── cmd/
│   │   └── server/
│   │       └── main.go    # CLI entry point
│   ├── src/
│   │   ├── config/        # Database and server configuration
│   │   ├── controllers/   # HTTP request handlers
│   │   ├── middleware/    # Gin middleware (auth, validation)
│   │   ├── models/         # Data models and structs
│   │   ├── routes/        # API route definitions
│   │   ├── services/      # Business logic
│   │   └── tests/         # Unit and integration tests
│   ├── main.go            # Main server entry point
│   ├── go.mod             # Go modules file
│   └── go.sum             # Go modules checksum
├── models/                 # Core Data Models (Go)
│   ├── user/              # User models
│   ├── repo/              # Repository models
│   ├── issues/            # Issue tracking models
│   ├── pull/              # Pull request models
│   └── ...
├── services/               # Core Services (Go)
│   ├── auth/              # Authentication service
│   ├── git/               # Git operations service
│   ├── repo/              # Repository management
│   └── ...
├── modules/                # Reusable Modules (Go)
├── routers/                # API Routing (Go)
│   ├── api/               # API v1 routes
│   ├── web/               # Web UI routes
│   └── ...
├── prisma/                 # Database Schema & Migrations
│   ├── schema.prisma      # Database schema definition
│   └── ...
├── docker/                 # Docker Configuration
├── docs/                   # Documentation
└── ...
```

### 🔄 **Data Flow Architecture**

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Next.js App   │    │   Gin API        │    │   PostgreSQL    │
│   (Frontend)    │◄──►│   (Backend)      │◄──►│   (Database)    │
│  Port 3001      │    │  Port 8080       │    │  Port 5432      │
│  TypeScript     │    │  Go              │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
   JWT Tokens            API Endpoints         User/Repo/Issue Data
   React Context        Authentication         GORM ORM
   shadcn/ui Components  Business Logic        Auto-migrations
```

---

## 💻 Development

### 🎯 **Development Workflow**

```bash
# New developer setup
make quick-start

# Daily development
make dev                 # Start working (Go + TypeScript)
make lint-fix           # Fix code issues
make typecheck          # Verify types
make test               # Run tests

# Go-specific development
cd server
go run main.go          # Start Go server
go test ./...           # Run Go tests
go fmt ./...            # Format Go code
go mod tidy             # Clean dependencies

# TypeScript-specific development
make dev-frontend       # Frontend only
make lint               # Check code quality
make typecheck          # Verify types

# Before committing
make format             # Format code
make lint               # Check code quality
make typecheck          # Verify types

# Database changes
make db-migrate         # Apply migrations
make db-studio          # Browse database

# Production deployment
make build              # Build everything
make docker-build       # Create Docker image
make docker-run         # Deploy
```

### 📋 **Development Guidelines**

- **Make-First Workflow** - Use `make` commands for all operations
- **Go Best Practices** - Follow Go conventions for backend code
- **TypeScript Strict Mode** - All frontend code must pass strict type checking
- **Conventional Commits** - Use standardized commit messages
- **Component Structure** - Follow established patterns for React components
- **API Design** - RESTful endpoints with proper HTTP methods
- **Error Handling** - Comprehensive error handling and logging
- **Security First** - Validate all inputs and implement proper authentication

---

## 🔐 Authentication System

### 🎯 **Complete Implementation**

The authentication system is fully implemented with Go backend and TypeScript frontend:

- **JWT Tokens** - Secure token-based authentication with refresh mechanism
- **Login/Register Forms** - Complete user authentication flow with validation
- **Auth Context** - Global authentication state management in React
- **Protected Routes** - Route-based authentication guards
- **Go API Endpoints** - Complete authentication API with Gin framework
- **Password Security** - bcrypt hashing for secure password storage
- **Session Management** - LocalStorage-based session persistence

---

## 🤝 Contributing

We're looking for contributors to help build this comprehensive self-hosted Git platform! Whether you're experienced with Go, TypeScript, web development, or DevOps, there's a place for you.

### 🎯 **How to Get Started**

1. **Fork the repository** and create a feature branch
2. **Check the issues** for tasks that need help
3. **Join discussions** about architecture and features
4. **Start small** - Documentation, tests, or minor features
5. **Follow our code standards** and commit guidelines

### 🏗️ **Areas Needing Help**

- **Go Backend Development** - API endpoints, business logic, Git operations
- **TypeScript Frontend Development** - React components, UI/UX design
- **Database Design** - Schema development, migrations, optimization
- **DevOps Engineers** - Docker, deployment, CI/CD
- **Security Specialists** - Authentication, encryption
- **Documentation** - API docs, user guides, tutorials

---

## 📞 Support & Community

### 💬 **Get Help**

- 📖 **[Documentation](docs/)** - Comprehensive guides and API docs
- 🐛 **[GitHub Issues](https://github.com/skygenesisenterprise/giteria/issues)** - Bug reports and feature requests
- 💡 **[GitHub Discussions](https://github.com/skygenesisenterprise/giteria/discussions)** - General questions and ideas
- 📧 **Email** - developer@skygenesisenterprise.com

### 🐛 **Reporting Issues**

When reporting bugs, please include:

- Clear description of the problem
- Steps to reproduce
- Environment information (Go version, Node.js version, OS, etc.)
- Error logs or screenshots
- Expected vs actual behavior

---

## 📊 Project Status

| Component                 | Status         | Technology                | Notes                             |
| ------------------------- | -------------- | ------------------------- | --------------------------------- |
| **Hybrid Architecture**   | ✅ Working     | Go + TypeScript           | Monorepo design                   |
| **Authentication System** | ✅ Working     | JWT (Go/TS)              | Full implementation with forms    |
| **Go Backend API**        | ✅ Working     | Gin + GORM               | High-performance with PostgreSQL  |
| **Frontend Framework**    | ✅ Working     | Next.js 16 + React 19.2.1| shadcn/ui + Tailwind CSS v4       |
| **Repository Management**| ✅ Working     | Go/TS                    | Create, browse, manage repos      |
| **Issue Tracking**        | ✅ Working     | Go/TS                    | Full issue system with labels    |
| **UI Component Library**  | ✅ Working     | shadcn/ui + Tailwind CSS | Complete component set            |
| **Database Layer**        | ✅ Working     | GORM + PostgreSQL        | Auto-migrations + models          |
| **Docker Deployment**     | ✅ Working     | Multi-Stage              | Containerized deployment         |
| **Pull Requests**         | 🔄 In Progress | Go/TS                    | Code review system                |
| **Organization Mgmt**     | 🔄 In Progress | Go/TS                    | Teams and org settings            |
| **Wiki System**           | 📋 Planned    | Go/TS                    | Repository documentation         |
| **Package Registry**      | 📋 Planned    | Go/TS                    | npm, Go, Maven repos              |
| **CI/CD**                 | 📋 Planned    | Go/TS                    | Integrated pipelines              |

---

## 🏆 Sponsors & Partners

**Development led by [Sky Genesis Enterprise](https://skygenesisenterprise.com)**

We're looking for sponsors and partners to help accelerate development of this open-source Git hosting platform.

[🤝 Become a Sponsor](https://github.com/sponsors/skygenesisenterprise)

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
