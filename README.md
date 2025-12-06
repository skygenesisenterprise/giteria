<div align="center">

# 🚀 Giteria

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Based on Gitea](https://img.shields.io/badge/Based_on-Gitea-609926?logo=gitea)](https://github.com/go-gitea/gitea)
[![Go](https://img.shields.io/badge/Go-1.25.0-00ADD8?logo=go)](https://golang.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Vue.js](https://img.shields.io/badge/Vue.js-3.5.25-4FC08D?logo=vue.js)](https://vuejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Webpack](https://img.shields.io/badge/Webpack-5.103.0-8DD6F9?logo=webpack)](https://webpack.js.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Supported-4169E1?logo=postgresql)](https://www.postgresql.org/)

**The open-source Git platform enhanced with modern web technologies**

Built on the robust foundation of **[Gitea](https://github.com/go-gitea/gitea)** with enhanced frontend capabilities and AI integration potential.

[Quick Start](#-quick-start) • [Documentation](#-documentation) • [Contributing](#-contributing)

</div>

---

## 📖 Overview

**Giteria** is a comprehensive, self-hostable Git platform that combines the proven reliability of **[Gitea](https://github.com/go-gitea/gitea)** (MIT license) with modern web enhancements. Built for developers who value privacy, control, and extensibility, Giteria offers a GitHub-like experience with enhanced frontend capabilities and AI integration potential.

### 🎯 Current Status

This is an **active evolution** of Gitea with modern frontend enhancements. The backend maintains full compatibility with Gitea's robust Go-based engine, while introducing Next.js configuration for future frontend modernization and AI-powered features.

---

## ✨ Features

### 🔄 Core Git Operations (✅ Fully Functional)
- **Repository Management**: Complete Git repository hosting and management
- **Branching & Merging**: Advanced branch management with pull requests
- **Code Review**: Comprehensive PR workflow with comments and approvals
- **Issue Tracking**: Full issue management with labels, milestones, and assignments
- **Wiki & Documentation**: Built-in documentation system for every repository
- **Git Operations**: Clone, push, pull, fetch with full protocol support

### 👥 Collaboration & Teams (✅ Fully Functional)
- **Organizations**: Multi-tenant organization support with role-based access
- **Team Management**: Create teams with granular permissions
- **User Profiles**: Rich user profiles with contributions and activity tracking
- **Discussions**: Community discussions and Q&A sections
- **Access Control**: Fine-grained permissions and repository access rules

### ⚡ DevOps & Automation (✅ Fully Functional)
- **CI/CD Pipelines**: Built-in Gitea Actions compatible with GitHub Actions
- **Package Registry**: Private package hosting for npm, Docker, Maven, and more
- **Webhooks**: Extensive webhook system for integrations
- **API**: Complete REST API for automation and third-party integrations
- **SSH/HTTP**: Multiple Git protocol support

### 🤖 AI-Ready Foundation (🚧 In Development)
- **Modern Frontend Stack**: Next.js configuration ready for AI integration
- **Component Architecture**: Vue.js + TypeScript foundation for AI-powered UI components
- **API-First Design**: RESTful architecture perfect for AI service integration
- **Extensible Plugin System**: Foundation for custom AI model integration

---

## 🛠️ Technology Stack

### Backend Core (✅ Gitea Foundation)
| Technology | Version | Purpose |
|------------|---------|---------|
| **Go** | 1.25.0 | Core backend runtime |
| **Chi Router** | Latest | HTTP routing and middleware |
| **GORM** | Latest | Database ORM |
| **PostgreSQL** | Supported | Primary database |
| **MySQL/SQLite** | Supported | Alternative databases |
| **Redis** | Supported | Caching and sessions |

### Frontend Enhancement (🚧 Modernization)
| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | Configured | Modern framework foundation |
| **TypeScript** | 5.9.3 | Type-safe development |
| **Vue.js** | 3.5.25 | Reactive UI components |
| **Tailwind CSS** | 3.4.17 | Utility-first CSS framework |
| **Webpack** | 5.103.0 | Asset bundling and build |
| **HTMX** | 2.0.8 | Dynamic content loading |
| **Monaco Editor** | 0.55.1 | Code editing experience |

### Integration & Extensions
| Technology | Purpose |
|------------|---------|
| **OAuth2** | Third-party authentication |
| **LDAP/SSO** | Enterprise authentication |
| **Webhooks** | Event-driven integrations |
| **API v1** | RESTful API access |
| **Git LFS** | Large file storage |
| **SSH/HTTP** | Git protocol support |

---

## 🚀 Quick Start

### Prerequisites

- **Go** 1.25+ 
- **Node.js** 22+ (for frontend development)
- **PostgreSQL** 14+ (recommended) or MySQL/SQLite
- **Git** 2.30+
- **Redis** (optional, for caching)

### Installation

```bash
# Clone the repository
git clone https://github.com/go-giteria/giteria.git
cd giteria

# Build the backend
go build -o giteria cmd/main.go

# Install frontend dependencies (for development)
pnpm install

# Set up configuration
cp custom/conf/app.example.ini custom/conf/app.ini
# Edit custom/conf/app.ini with your settings

# Initialize the database
./giteria web --install

# Start the server
./giteria web
```

The application will be available at `http://localhost:3000`.

### Development Commands

```bash
# Backend development
go run cmd/main.go web              # Start development server
go run cmd/main.go migrate up       # Run database migrations
go run cmd/main.go admin create-user # Create admin user

# Frontend development (when working on UI)
pnpm install                       # Install frontend dependencies
pnpm run dev                       # Start frontend dev server (if configured)
pnpm run build                      # Build frontend assets
pnpm run lint                       # Run linting

# Database management
go run cmd/main.go migrate up        # Run migrations
go run cmd/main.go migrate down      # Rollback migrations
go run cmd/main.go dump             # Backup database
go run cmd/main.go restore          # Restore database
```

---

## 🏗️ Project Structure

```
giteria/
├── cmd/                        # Command-line interface and server entry points
│   ├── main.go                 # Main application entry point
│   ├── web.go                  # Web server command
│   ├── admin.go                # Administration commands
│   └── migrate.go              # Database migration commands
├── routers/                    # HTTP routing and handlers
│   ├── web/                    # Web interface routes
│   ├── api/v1/                 # REST API routes
│   └── private/                # Internal API routes
├── models/                     # Database models and business logic
│   ├── user/                   # User management
│   ├── repo/                   # Repository management
│   ├── org/                    # Organization management
│   └── ...                    # Other domain models
├── modules/                    # Core application modules
│   ├── setting/                # Configuration management
│   ├── auth/                   # Authentication and authorization
│   ├── git/                    # Git operations
│   └── ...                     # Other core modules
├── templates/                  # HTML templates for web interface
│   ├── base/                   # Base templates and layouts
│   ├── repo/                   # Repository-related templates
│   ├── user/                   # User-related templates
│   ├── admin/                  # Administration interface
│   └── custom/                 # Customization templates
├── web_src/                    # Frontend source code
│   ├── js/                     # JavaScript/TypeScript source
│   ├── css/                    # CSS source files
│   └── fomantic/               # Fomantic UI framework
├── public/                     # Static assets
├── custom/                     # Custom configuration and overrides
├── tests/                      # Test files
├── docs/                       # Documentation
├── scripts/                    # Build and utility scripts
├── docker/                     # Docker configuration
├── go.mod                      # Go module definition
├── package.json                # Frontend dependencies
├── next.config.ts              # Next.js configuration
└── tsconfig.json               # TypeScript configuration
```

---

## 🎨 Frontend Architecture

### Current Stack
The frontend uses Gitea's proven architecture with modern enhancements:

#### Template System
- **Go Templates**: Server-side rendering with Go's template engine
- **Fomantic UI**: CSS framework based on Semantic UI
- **HTMX Integration**: Dynamic content loading without full page refreshes
- **Vue.js Components**: Reactive components for interactive features

#### Asset Pipeline
- **Webpack**: Modern JavaScript bundling and optimization
- **TypeScript**: Type-safe JavaScript development
- **Tailwind CSS**: Utility-first CSS framework integration
- **PostCSS**: CSS processing and optimization

#### Component Structure
```html
<!-- Example: Repository page template -->
{{template "base/head" .}}
<div class="repository">
    {{template "repo/header" .}}
    <div class="ui container">
        <!-- Dynamic content with HTMX -->
        <div hx-get="/api/v1/repos/{{.Repository.Name}}" 
             hx-trigger="load" 
             hx-target="#repo-content">
            Loading...
        </div>
    </div>
</div>
{{template "base/footer" .}}
```

---

## 🔄 API & Integration

### REST API
Complete REST API compatible with Gitea:

#### Authentication
```bash
# Personal Access Token
curl -H "Authorization: token YOUR_TOKEN" \
     https://your-giteria.com/api/v1/user

# OAuth2 Flow
curl -X POST -d "client_id=ID&client_secret=SECRET" \
     https://your-giteria.com/login/oauth/access_token
```

#### Repository Operations
```bash
# List repositories
curl https://your-giteria.com/api/v1/user/repos

# Create repository
curl -X POST -H "Content-Type: application/json" \
     -d '{"name":"new-repo","private":true}' \
     https://your-giteria.com/api/v1/user/repos
```

### Webhook System
Configure webhooks for real-time integrations:

```json
{
  "type": "push",
  "url": "https://your-ci-server.com/webhook",
  "content_type": "json",
  "events": ["push", "pull_request", "issues"]
}
```

---

## 🔒 Security Features

### Authentication & Authorization (✅ Production Ready)
- **Multi-provider Auth**: GitHub, GitLab, Google OAuth, LDAP
- **Enterprise SSO**: SAML and LDAP integration
- **Session Management**: Secure token handling with Redis
- **Role-based Access**: Granular permissions system
- **Two-Factor Auth**: TOTP and WebAuthn support

### Security Best Practices
- **Type Safety**: TypeScript strict mode for frontend
- **Input Validation**: Comprehensive input sanitization
- **CSRF Protection**: Built-in CSRF token validation
- **Secure Headers**: HTTP security headers configuration
- **Rate Limiting**: API rate limiting and DDoS protection

---

## 📱 Responsive Design

### Mobile-First Approach
- **Progressive Enhancement**: Core functionality works everywhere
- **Touch Interactions**: Optimized for mobile devices
- **Responsive Layouts**: Fomantic UI responsive grid system
- **Performance**: Optimized for mobile networks

### Supported Devices
- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px  
- **Mobile**: 320px - 767px

---

## 🌐 Accessibility

### WCAG 2.1 Compliance (✅ Implemented)
- **Semantic HTML**: Proper use of HTML5 elements
- **ARIA Labels**: Screen reader support
- **Keyboard Navigation**: Full keyboard accessibility
- **Focus Management**: Logical tab order and focus indicators
- **Color Contrast**: AA compliant color schemes

---

## 🔧 Development Guidelines

### Backend Development (Go)
- **Go Modules**: Proper module organization and dependencies
- **Error Handling**: Comprehensive error handling and logging
- **Testing**: Unit tests with Go's testing package
- **Documentation**: Go doc comments for all public functions

### Frontend Development
- **TypeScript Strict**: All files must pass strict type checking
- **Component Naming**: PascalCase for components, camelCase for utilities
- **Import Organization**: React → Third-party → Internal imports
- **Performance**: Optimized for first contentful paint

### Best Practices
- **Server-Side Rendering**: Use Go templates by default
- **Progressive Enhancement**: Enhance with JavaScript/Vue.js
- **Error Boundaries**: Implement proper error handling
- **Loading States**: Provide feedback during data fetching

---

## 🧪 Testing Strategy

### Current Status
Comprehensive testing suite inherited from Gitea:

### Backend Testing
- **Unit Tests**: Go's built-in testing framework
- **Integration Tests**: API endpoint testing
- **E2E Tests**: Playwright for full application testing
- **Performance Tests**: Load testing for API endpoints

### Frontend Testing
- **JavaScript Tests**: Vitest for unit testing
- **Component Tests**: Vue Test Utils for component testing
- **Visual Regression**: Screenshot comparison testing
- **Accessibility Tests**: Automated accessibility testing

---

## 🚀 Deployment

### Production Environment

#### Binary Deployment
```bash
# Build for production
go build -ldflags="-s -w" -o giteria cmd/main.go

# Set up production configuration
cp custom/conf/app.example.ini custom/conf/app.ini
# Edit with production settings

# Run with systemd or supervisor
./giteria web
```

#### Docker Deployment
```bash
# Build Docker image
docker build -t giteria:latest .

# Run with Docker Compose
docker-compose up -d

# Environment variables
- GITEA__database__DB_TYPE=postgres
- GITEA__database__HOST=db:5432
- GITEA__server__ROOT_URL=https://giteria.example.com
```

#### Kubernetes Deployment
```yaml
# Kubernetes deployment example
apiVersion: apps/v1
kind: Deployment
metadata:
  name: giteria
spec:
  replicas: 3
  selector:
    matchLabels:
      app: giteria
  template:
    metadata:
      labels:
        app: giteria
    spec:
      containers:
      - name: giteria
        image: giteria:latest
        ports:
        - containerPort: 3000
```

### Environment Configuration
```bash
# Database Configuration
GITEA__database__DB_TYPE=postgres
GITEA__database__HOST=localhost:5432
GITEA__database__NAME=giteria
GITEA__database__USER=gitea
GITEA__database__PASSWORD=secure_password

# Server Configuration  
GITEA__server__ROOT_URL=https://your-giteria.com
GITEA__server__DOMAIN=your-giteria.com
GITEA__server__HTTP_PORT=3000

# Security Configuration
GITEA__security__INSTALL_LOCK=true
GITEA__security__SECRET_KEY=your-secret-key
GITEA__security__INTERNAL_TOKEN=your-internal-token
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
- **🌐 Translation**: Help translate Giteria to your language

### 🛠️ Development Setup
```bash
# Fork and clone the repository
git clone https://github.com/go-giteria/giteria.git
cd giteria

# Set up Go development environment
go mod download
go mod tidy

# Install frontend dependencies (if working on UI)
pnpm install

# Set up development configuration
cp custom/conf/app.example.ini custom/conf/app.ini

# Run database migrations
go run cmd/main.go migrate up

# Start development server
go run cmd/main.go web
```

### 📋 Pull Request Process
1. **Create a feature branch**: `git checkout -b feature/amazing-feature`
2. **Make your changes** and ensure they follow code style
3. **Run tests**: `go test ./...` and `pnpm test` (if applicable)
4. **Test thoroughly**: Manual testing of all affected areas
5. **Commit your changes**: `git commit -m "feat: add amazing feature"`
6. **Push to your fork**: `git push origin feature/amazing-feature`
7. **Open a Pull Request** with a detailed description

### 📜 Code of Conduct
Please read our [Code of Conduct](CODE_OF_CONDUCT.md) to ensure a welcoming and inclusive environment for all contributors.

---

## 🆘 Support

### 📞 Getting Help
- **📖 Documentation**: Check [docs/README.md](docs/README.md) for detailed documentation
- **💬 Discussions**: [GitHub Discussions](https://github.com/go-giteria/giteria/discussions)
- **🐛 Issues**: [GitHub Issues](https://github.com/go-giteria/giteria/issues)
- **📧 Email**: [support@giteria.com](mailto:support@giteria.com)

### 📚 Resources
- **[Gitea Documentation](https://docs.gitea.com/)**: Core functionality documentation
- **[API Documentation](https://try.gitea.com/api/swagger)**: Interactive API docs
- **[Configuration Guide](https://docs.gitea.com/administration/config-cheat-sheet)**: Configuration options
- **[Migration Guide](https://docs.gitea.com/administration/upgrade)**: Upgrade instructions

---

## 🗺️ Roadmap

### Current Development (v0.1.0)
- ✅ Gitea core functionality fully operational
- ✅ Next.js configuration for frontend modernization
- ✅ Enhanced TypeScript support
- ✅ Modern build pipeline with Webpack
- 🔄 AI integration foundation
- 🔄 Enhanced UI components with Vue.js

### Near-term (v0.2.0)
- 🔄 AI-powered code completion
- 🔄 Enhanced repository analytics
- 🔄 Modern dashboard with real-time updates
- 🔄 Improved mobile experience
- 🔄 Advanced search capabilities

### Medium-term (v0.3.0)
- 🔄 Custom AI model integration
- 🔄 Advanced CI/CD features
- 🔄 Enhanced security features
- 🔄 Plugin system for extensions
- 🔄 Performance optimizations

### Long-term (v1.0.0)
- 📋 Production-ready AI features
- 📋 Enterprise-grade analytics
- 📋 Advanced collaboration tools
- 📋 Multi-region deployment support
- 📋 Comprehensive plugin ecosystem

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

**Underlying Engine**: Giteria is based on [Gitea](https://github.com/go-gitea/gitea), which is also licensed under MIT. We thank the Gitea community for their excellent work and solid foundation.

---

## 🙏 Acknowledgments

Built with ❤️ by [Sky Genesis Enterprise](https://skygenesisenterprise.com) and the open-source community.

**Special thanks**: This project is based on the remarkable work of the [Gitea](https://github.com/go-gitea/gitea) community, without whom this project would not be possible. Their dedication to creating a robust, feature-rich Git hosting platform has made this evolution possible.

**Additional thanks** to:
- The [Gogs](https://github.com/gogits/gogs) project for the initial inspiration
- All [Gitea contributors](https://github.com/go-gitea/gitea/graphs/contributors) for their continuous improvements
- The [Go](https://golang.org/) community for the amazing language and ecosystem
- The [Vue.js](https://vuejs.org/) and [Next.js](https://nextjs.org/) teams for modern frontend tools

---

<div align="center">

**[⭐ Star this repo](https://github.com/go-giteria/giteria) • [🐛 Report issues](https://github.com/go-giteria/giteria/issues) • [💬 Join discussions](https://github.com/go-giteria/giteria/discussions)**

Made with ☕ and 🎧 by the Giteria team

</div>