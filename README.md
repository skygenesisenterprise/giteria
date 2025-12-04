<div align="center">

# 🚀 Giteria

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.14-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?logo=postgresql)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker)](https://www.docker.com/)

**The open-source Git platform with AI-powered development tools**

[Quick Start](#-quick-start) • [Documentation](#-documentation) • [Demo](#-live-demo) • [Contributing](#-contributing)

</div>

---

## 📖 Overview

**Giteria** is a comprehensive, self-hostable Git platform that combines the power of modern version control with cutting-edge AI assistance. Built for developers who value privacy, control, and intelligent workflows, Giteria offers a GitHub-like experience with enhanced AI capabilities and enterprise-grade features.

### 🎯 Why Giteria?

- **🔒 Self-Hosted & Private**: Complete control over your code and data
- **🤖 AI-Powered Development**: Integrated Copilot, RAG, and custom AI models
- **⚡ Modern Tech Stack**: Built with Next.js 15, React 19, and TypeScript
- **🔄 Full Git Compatibility**: Works with existing Git workflows and tools
- **🏢 Enterprise Ready**: Organizations, teams, and advanced access control
- **📦 Integrated CI/CD**: Built-in pipelines and automation
- **🌐 Open Source**: MIT licensed with community-driven development

---

## ✨ Features

### 🔄 Core Git Operations
- **Repository Management**: Create, clone, fork, and manage Git repositories
- **Branching & Merging**: Advanced branch management with pull requests
- **Code Review**: Comprehensive PR workflow with comments and approvals
- **Issue Tracking**: Full issue management with labels, milestones, and assignments
- **Wiki & Documentation**: Built-in documentation system for every repository
- **Release Management**: Tagged releases with changelogs and assets

### 👥 Collaboration & Teams
- **Organizations**: Multi-tenant organization support with role-based access
- **Team Management**: Create teams with granular permissions
- **User Profiles**: Rich user profiles with contributions and activity
- **Notifications**: Real-time notifications for all repository activities
- **Discussions**: Community discussions and Q&A sections

### 🤖 AI-Powered Development
- **Code Copilot**: AI-powered code completion and suggestions
- **RAG Integration**: Repository-aware AI assistance
- **Custom Models**: Deploy and manage custom AI models
- **Smart Code Review**: AI-assisted code review and analysis
- **Documentation Generation**: Automatic README and API documentation generation

### ⚡ DevOps & Automation
- **CI/CD Pipelines**: Built-in continuous integration and deployment
- **Package Registry**: Private package hosting for npm, Docker, and more
- **Webhooks**: Extensive webhook system for integrations
- **Actions**: Custom automation workflows
- **Environment Management**: Secure environment variable handling

### 🔒 Security & Compliance
- **Two-Factor Authentication**: Enhanced security with 2FA support
- **Audit Logs**: Comprehensive audit trail for all activities
- **Access Control**: Granular permissions and role management
- **Security Scanning**: Automated vulnerability scanning
- **Compliance**: GDPR and SOC2 compliance features

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ and **pnpm** 8+
- **PostgreSQL** 14+ or **Docker** & **Docker Compose**
- **Git** 2.30+

### Option 1: Docker (Recommended)

```bash
# Clone the repository
git clone https://github.com/go-giteria/giteria.git
cd giteria

# Start with Docker Compose
docker-compose up -d

# Access Giteria at http://localhost:3000
```

### Option 2: Manual Installation

```bash
# Clone the repository
git clone https://github.com/go-giteria/giteria.git
cd giteria

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Set up the database
pnpm run db:setup

# Start the development server
pnpm run dev
```

### Initial Setup

1. **Create an admin account** by visiting `http://localhost:3000/register`
2. **Configure SMTP** settings in the admin panel for email notifications
3. **Set up AI providers** (OpenAI, Anthropic, etc.) in the AI settings
4. **Create your first organization** and invite team members

---

## 🏗️ Architecture

### System Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend     │    │    Backend      │    │   Database     │
│   (Next.js)    │◄──►│   (Node.js)    │◄──►│  (PostgreSQL)  │
│                │    │                │    │                │
│ • React 19     │    │ • REST API     │    │ • Users        │
│ • TypeScript   │    │ • WebSocket    │    │ • Repositories │
│ • Tailwind CSS │    │ • Auth         │    │ • Issues       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │              ┌─────────────────┐              │
         │              │   AI Services   │              │
         └──────────────►│  (External)    │◄─────────────┘
                        │ • OpenAI       │
                        │ • Anthropic    │
                        │ • Custom Models│
                        └─────────────────┘
```

### Technology Stack

| Component | Technology | Version |
|-----------|------------|---------|
| **Frontend** | Next.js | 15.5.4 |
| | React | 19.1.0 |
| | TypeScript | 5.9.3 |
| | Tailwind CSS | 4.1.14 |
| **Backend** | Node.js | 20+ |
| | Express.js | 4.x |
| | TypeScript | 5.9.3 |
| **Database** | PostgreSQL | 14+ |
| | Prisma ORM | 5.x |
| **Infrastructure** | Docker | 24+ |
| | Redis | 7+ |
| | Nginx | 1.24+ |

---

## 📚 Documentation

### User Guides
- [📖 Getting Started](docs/getting-started.md)
- [👥 Organizations & Teams](docs/organizations.md)
- [🔄 Repository Management](docs/repositories.md)
- [🤖 AI Features](docs/ai-features.md)
- [⚡ CI/CD Pipelines](docs/cicd.md)

### Developer Resources
- [🏗️ Architecture Overview](docs/architecture.md)
- [🔧 API Documentation](docs/api.md)
- [🛠️ Development Setup](docs/development.md)
- [🔌 Plugin Development](docs/plugins.md)
- [🐳 Deployment Guide](docs/deployment.md)

### Administrator Guide
- [⚙️ Configuration](docs/configuration.md)
- [🔒 Security Setup](docs/security.md)
- [📊 Monitoring & Logging](docs/monitoring.md)
- [🔄 Backup & Recovery](docs/backup.md)

---

## 🌐 Deployment

### Production Deployment

#### Docker Compose (Production)

```yaml
# docker-compose.prod.yml
version: '3.8'
services:
  app:
    image: giteria/giteria:latest
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:pass@db:5432/giteria
    depends_on:
      - db
      - redis

  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=giteria
      - POSTGRES_USER=giteria
      - POSTGRES_PASSWORD=${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

#### Kubernetes

```bash
# Deploy to Kubernetes
kubectl apply -f k8s/
```

#### Cloud Platforms

- [AWS ECS](docs/deployment/aws.md)
- [Google Cloud Run](docs/deployment/gcp.md)
- [Azure Container Instances](docs/deployment/azure.md)
- [DigitalOcean App Platform](docs/deployment/digitalocean.md)

---

## 🔧 Configuration

### Environment Variables

```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/giteria

# Application
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# AI Providers
OPENAI_API_KEY=your-openai-key
ANTHROPIC_API_KEY=your-anthropic-key

# Storage
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
AWS_S3_BUCKET=your-s3-bucket
```

### Authentication Providers

Giteria supports multiple authentication methods:

- **GitHub OAuth** - One-click GitHub login
- **GitLab OAuth** - GitLab integration
- **Google OAuth** - Google account login
- **Email/Password** - Traditional authentication
- **SAML SSO** - Enterprise single sign-on
- **LDAP** - Directory service integration

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
cp .env.example .env.development
pnpm run db:setup:dev

# Start development servers
pnpm run dev          # Frontend (http://localhost:3000)
pnpm run dev:api      # Backend API (http://localhost:3001)

# Run tests
pnpm run test
pnpm run test:watch
pnpm run test:coverage
```

### 📋 Pull Request Process

1. **Create a feature branch**: `git checkout -b feature/amazing-feature`
2. **Make your changes** and ensure tests pass
3. **Follow the code style** (ESLint + Prettier)
4. **Commit your changes**: `git commit -m "feat: add amazing feature"`
5. **Push to your fork**: `git push origin feature/amazing-feature`
6. **Open a Pull Request** with a detailed description

### 📜 Code of Conduct

Please read our [Code of Conduct](CODE_OF_CONDUCT.md) to ensure a welcoming and inclusive environment for all contributors.

---

## 🆘 Support

### 📞 Getting Help

- **📖 Documentation**: [wiki.giteria.dev](https://wiki.giteria.com)
- **💬 Discussions**: [GitHub Discussions](https://github.com/go-giteria/giteria/discussions)
- **🐛 Issues**: [GitHub Issues](https://github.com/go-giteria/giteria/issues)
- **📧 Email**: [support@giteria.dev](mailto:support@giteria.com)
- **💬 Discord**: [Join our Discord](https://discord.gg/giteria)

### 🏢 Commercial Support

For enterprise customers, we offer:

- **🚀 Priority Support**: 24/7 technical assistance
- **🔧 Custom Development**: Tailored features and integrations
- **🎓 Training**: On-site and remote training sessions
- **🛡️ SLA Guarantee**: Service level agreements for critical deployments

Contact us at [enterprise@giteria.dev](mailto:enterprise@giteria.dev) for more information.

---

## 🗺️ Roadmap

### Version 1.0 (Current)
- ✅ Core Git operations
- ✅ User authentication
- ✅ Repository management
- ✅ Basic CI/CD
- ✅ Organizations & teams

### Version 1.1 (Q2 2025)
- 🔄 Advanced AI features
- 🔄 Enhanced security scanning
- 🔄 Mobile app (React Native)
- 🔄 Advanced analytics

### Version 2.0 (Q3 2025)
- 📋 Project management tools
- 📋 Advanced CI/CD features
- 📋 Enterprise SSO
- 📋 Multi-region deployment

### Version 2.1 (Q4 2025)
- 🎯 AI-powered code review
- 🎯 Advanced monitoring
- 🎯 Custom themes
- 🎯 Plugin marketplace

View our full [project roadmap](https://github.com/go-giteria/giteria/projects) for detailed timelines and feature planning.

---

## 📊 Statistics

![GitHub stars](https://img.shields.io/github/stars/go-giteria/giteria?style=social)
![GitHub forks](https://img.shields.io/github/forks/go-giteria/giteria?style=social)
![GitHub issues](https://img.shields.io/github/issues/go-giteria/giteria)
![GitHub pull requests](https://img.shields.io/github/issues-pr/go-giteria/giteria)
![GitHub contributors](https://img.shields.io/github/contributors/go-giteria/giteria)

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### 🤝 Attribution

Built with ❤️ by [Sky Genesis Enterprise](https://skygenesisenterprise.com) and the open-source community.

---

<div align="center">

**[⭐ Star this repo](https://github.com/go-giteria/giteria) • [🐛 Report issues](https://github.com/go-giteria/giteria/issues) • [💬 Join discussions](https://github.com/go-giteria/giteria/discussions)**

Made with ☕ and 🎧 by the Giteria team

</div>