<div align="center">

# 🚀 Giteria Routers

[![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](https://github.com/skygenesisenterprise/giteria/blob/main/LICENSE) [![Go](https://img.shields.io/badge/Go-1.21+-blue?style=for-the-badge&logo=go)](https://golang.org/) [![Gin](https://img.shields.io/badge/Gin-1.9+-lightgrey?style=for-the-badge&logo=go)](https://gin-gonic.com/)

**Comprehensive Routing Layer for Giteria - Git Self-Hosting Platform**

Giteria routers provide a complete routing layer for the Giteria platform, handling API endpoints, web UI routes, installation, and internal communications.

[📋 Overview](#-overview) • [🗂️ Directory Structure](#-directory-structure) • [🛠️ Components](#-components) • [🌐 Routing Architecture](#-routing-architecture)

---

</div>

## 📋 Overview

The **routers** package is the central routing layer of Giteria, a Git self-hosting platform. It manages all HTTP routing logic, including:

- **REST API Endpoints** - Complete CRUD operations for repositories, users, organizations
- **Web UI Routes** - User-facing web interface for repository management
- **Installation Routes** - First-time setup and configuration
- **Internal Routes** - Inter-service communication and Git protocol handling
- **Authentication** - OAuth2, session-based, and token authentication

---

## 🗂️ Directory Structure

```
routers/
├── api/                       # REST API Routes
│   ├── actions/              # GitHub Actions compatible API
│   ├── packages/             # Package registry API (Maven, npm, Docker, etc.)
│   └── v1/                   # Main API v1 endpoints
│       ├── admin/            # Admin operations
│       ├── misc/             # Miscellaneous endpoints
│       ├── org/              # Organization management
│       ├── repo/             # Repository operations
│       └── swagger/          # OpenAPI/Swagger definitions
├── common/                    # Shared middleware and utilities
├── install/                   # Installation & setup routes
├── private/                   # Internal routes (hooks, SSH)
├── utils/                     # Utility functions
├── web/                       # Web UI routes
│   ├── admin/                # Admin dashboard
│   ├── auth/                 # Authentication pages
│   ├── devtest/              # Development/testing routes
│   ├── events/               # Event streams
│   ├── explore/              # Explore/discover pages
│   ├── feed/                 # Activity feeds
│   ├── healthcheck/           # Health check endpoints
│   ├── misc/                 # Miscellaneous web routes
│   ├── org/                  # Organization pages
│   ├── repo/                 # Repository UI pages
│   ├── shared/               # Shared web components
│   └── user/                 # User profile pages
├── init.go                    # Router initialization
└── README.md                  # This file
```

---

## 🛠️ Components

### 📦 API Layer (`routers/api/`)

The API layer provides RESTful endpoints for programmatic access to Giteria.

#### 🔧 API v1 (`routers/api/v1/`)

```
v1/
├── api.go                    # Main API router setup
├── admin/                    # Admin endpoints
│   ├── user.go              # User management
│   ├── repo.go              # Repository management
│   ├── org.go               # Organization management
│   ├── hooks.go             # Webhook management
│   ├── runners.go           # Actions runners
│   └── ...
├── misc/                     # Miscellaneous
│   ├── version.go           # API version info
│   ├── nodeinfo.go          # NodeInfo protocol
│   ├── markup.go           # Markdown rendering
│   ├── licenses.go          # License information
│   └── ...
├── org/                      # Organization API
│   ├── org.go               # Organization CRUD
│   ├── member.go            # Member management
│   ├── team.go              # Team management
│   ├── hook.go              # Webhooks
│   └── ...
├── repo/                     # Repository API (40+ endpoints)
│   ├── repo.go              # Repository CRUD
│   ├── file.go              # File operations
│   ├── commit.go            # Commit history
│   ├── branch.go            # Branch management
│   ├── pull.go              # Pull request handling
│   ├── issue.go             # Issue tracking
│   ├── release.go           # Release management
│   ├── hook.go              # Webhooks
│   ├── mirror.go            # Mirror repos
│   ├── migrate.go           # Migration support
│   └── ...
└── swagger/                  # OpenAPI definitions
    ├── user.go
    ├── repo.go
    ├── org.go
    └── ...
```

#### 🚀 Actions (`routers/api/actions/`)

GitHub Actions-compatible CI/CD system:

- Workflow runs management
- Artifact storage and retrieval
- Log streaming
- Runner registration

#### 📦 Packages (`routers/api/packages/`)

Multi-format package registry:

- Maven (Java)
- npm (Node.js)
- Docker/OCI
- NuGet (.NET)
- PyPI (Python)
- RubyGems
- Go modules
- Container registry (`/v2`)

---

### 🌐 Web UI Layer (`routers/web/`)

User-facing web interface routes.

#### 🏠 Main Web Routes

```
web/
├── web.go                    # Main web router (73KB+)
├── base.go                   # Base handlers
├── home.go                   # Home/dashboard
├── githttp.go               # Git HTTP protocol
├── goget.go                 # Go get support
├── metrics.go               # Prometheus metrics
├── nodeinfo.go              # Fediverse node info
├── webfinger.go             # WebFinger protocol
├── passkey.go               # Passkey authentication
└── swagger_json.go          # Swagger UI
```

#### 👤 User Routes (`routers/web/user/`)

- User profile pages
- Settings management
- SSH keys
- Access tokens
- Followers/following

#### 🏢 Organization Routes (`routers/web/org/`)

- Organization dashboard
- Team management
- Member invitations
- Organization settings

#### 📂 Repository Routes (`routers/web/repo/`)

```
repo/
├── view.go                  # Repository viewing
├── view_home.go             # Repo home page
├── view_file.go             # File browser
├── commit.go                # Commit viewing
├── issue.go                 # Issue tracker
├── pull.go                  # Pull requests
├── release.go               # Releases
├── wiki.go                  # Wiki pages
├── migration.go             # Repo migration
├── editor.go                # Web-based editor
├── compare.go               # Compare branches
├── setting/                 # Repo settings
│   ├── settings.go
│   ├── protected_branch.go
│   ├── webhook.go
│   ├── actions.go
│   └── ...
└── actions/                 # Actions UI
```

#### ⚙️ Admin Routes (`routers/web/admin/`)

```
admin/
├── admin.go                 # Admin dashboard
├── users.go                 # User management
├── repos.go                 # Repository management
├── orgs.go                  # Organization management
├── auths.go                 # Authentication sources
├── hooks.go                 # System webhooks
├── packages.go              # Package management
├── config.go                # Configuration viewer
├── queue.go                 # Task queue monitoring
└── diagnosis.go             # Diagnostic tools
```

#### 🔐 Auth Routes (`routers/web/auth/`)

- Login/logout
- Registration
- Password reset
- OAuth2 providers
- Two-factor authentication

---

### 🔒 Common Layer (`routers/common/`)

Shared middleware and utilities used across all routes.

```
common/
├── actions.go               # Common action handlers
├── auth.go                  # Authentication helpers
├── blockexpensive.go        # Rate limiting middleware
├── codesearch.go            # Code search utilities
├── compare.go               # Comparison helpers
├── db.go                    # Database utilities
├── deadline.go              # Request deadline handling
├── errpage.go               # Error page rendering
├── lfs.go                   # Git LFS support
├── markup.go                # Markup rendering
├── middleware.go            # Shared middleware
├── pagetmpl.go              # Page templates
├── qos.go                   # QoS/bandwidth management
├── redirect.go              # Redirect utilities
└── serve.go                 # Static file serving
```

**Key Middleware:**

- Authentication middleware
- CORS handling
- Rate limiting
- Request logging
- Session management
- Security headers
- QoS/bandwidth throttling

---

### ⚙️ Installation Layer (`routers/install/`)

First-time installation and setup.

```
install/
├── install.go               # Installation handler (23KB+)
├── routes.go                # Installation routes
└── routes_test.go
```

Features:

- Database configuration
- Admin account creation
- SMTP setup
- Initial settings
- System requirements check

---

### 🔐 Private Routes (`routers/private/`)

Internal routes for inter-service communication.

```
private/
├── serv.go                  # Main internal service router
├── actions.go               # Internal actions handlers
├── hook_post_receive.go    # Git post-receive hook
├── hook_pre_receive.go     # Git pre-receive hook
├── hook_proc_receive.go    # Git proc-receive hook
├── hook_verification.go     # Hook verification
├── manager.go               # Service manager
├── manager_process.go      # Process management
├── key.go                  # SSH key handling
├── mail.go                 # Internal mail
├── restore_repo.go         # Repository restoration
├── ssh_log.go              # SSH access logs
├── internal.go              # Internal utilities
└── internal_repo.go        # Internal repo operations
```

**Purpose:**

- Git hook processing (pre-receive, post-receive)
- SSH authentication
- Internal service communication
- Background task triggering
- Repository operations

---

### 🛠️ Utils Layer (`routers/utils/`)

Utility functions specific to routing.

```
utils/
├── utils.go                 # Router utilities
└── utils_test.go
```

---

## 🌐 Routing Architecture

### 🚦 Main Route Registration

From `routers/init.go`:

```go
func NormalRoutes() *web.Router {
    r := web.NewRouter()

    // Web UI
    r.Mount("/", web_routers.Routes())

    // API v1
    r.Mount("/api/v1", apiv1.Routes())

    // Internal API
    r.Mount("/api/internal", private.Routes())

    // Package registry
    if setting.Packages.Enabled {
        r.Mount("/api/packages", packages_router.CommonRoutes())
        r.Mount("/v2", packages_router.ContainerRoutes())  // OCI
    }

    // GitHub Actions
    if setting.Actions.Enabled {
        r.Mount("/api/actions", actions_router.Routes(prefix))
    }

    return r
}
```

### 🔄 Request Flow

```
┌─────────────────┐
│   HTTP Request  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Middleware     │  ◄── common/middleware.go
│  - Auth         │
│  - CORS         │
│  - Rate Limit   │
│  - Logging      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Router Match   │
│  /api/v1/repo   │  ◄── routers/api/v1/
│  /repo/         │  ◄── routers/web/repo/
│  /install       │  ◄── routers/install/
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Controller     │
│  - Validation   │
│  - Business     │
│    Logic        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Service Layer  │
│  - repo_service │
│  - user_service │
│  - auth_service │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Model/DB       │
│  - GORM         │
│  - Cache        │
└─────────────────┘
```

### 🌐 Route Categories

| Category     | Path Prefix            | Description          |
| ------------ | ---------------------- | -------------------- |
| **Web UI**   | `/`                    | User interface pages |
| **API v1**   | `/api/v1`              | REST API             |
| **Internal** | `/api/internal`        | Service-to-service   |
| **Packages** | `/api/packages`, `/v2` | Package registry     |
| **Actions**  | `/api/actions`         | CI/CD workflows      |
| **Install**  | `/install`             | Setup wizard         |

---

## 🔧 Key Features

### ✅ Implemented

- ✅ Complete REST API (v1)
- ✅ Web UI routing (50+ pages)
- ✅ Git HTTP/HTTPS protocol
- ✅ Git LFS support
- ✅ Package registry (multiple formats)
- ✅ GitHub Actions compatibility
- ✅ OAuth2 authentication
- ✅ Webhook system
- ✅ Internal service routes
- ✅ Installation wizard
- ✅ Admin dashboard
- ✅ Rate limiting & QoS
- ✅ Request middleware
- ✅ Error handling

### 📋 Planned

- 📋 Enhanced API documentation
- 📋 GraphQL API
- 📋 Plugin system routes

---

## 📁 File Statistics

| Directory    | Files    | Purpose              |
| ------------ | -------- | -------------------- |
| `api/v1/`    | 100+     | REST API endpoints   |
| `web/repo/`  | 60+      | Repository UI        |
| `web/admin/` | 15+      | Admin panel          |
| `web/`       | 80+      | Web interface        |
| `common/`    | 18       | Shared utilities     |
| `private/`   | 20+      | Internal routes      |
| `install/`   | 3        | Installation         |
| **Total**    | **250+** | **Complete routing** |

---

## 🔐 Authentication Flow

```
User Login Request
        │
        ▼
┌─────────────────┐
│ routers/web/   │
│ auth/login.go   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Middleware      │
│ (common/auth)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Service Layer   │
│ auth.Service    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Models          │
│ user.User       │
│ auth.Source     │
└─────────────────┘
```

---

## 🏗️ Development

### Adding New Routes

1. **Web Routes**: Add to `routers/web/<module>/`
2. **API Routes**: Add to `routers/api/v1/<module>/`
3. **Register in router**: Update `init.go` or module's `routes.go`

Example for new API endpoint:

```go
// routers/api/v1/repo/newfeature.go
func NewFeature(ctx *context.APIContext) {
    // Implementation
}

// routers/api/v1/repo/repo.go - Register route
m.Group("/repos", func() {
    m.Group("/:username/:reponame", func() {
        m.Get("/newfeature", repo.NewFeature)
    })
})
```

---

## 📊 Project Status

| Component      | Status      | Technology          | Notes              |
| -------------- | ----------- | ------------------- | ------------------ |
| **API v1**     | ✅ Complete | Go/Gin              | 100+ endpoints     |
| **Web UI**     | ✅ Complete | Go/Go-HTML-Template | 80+ pages          |
| **Packages**   | ✅ Complete | Go                  | 8 formats          |
| **Actions**    | ✅ Complete | Go                  | GitHub compatible  |
| **Install**    | ✅ Complete | Go                  | Full setup wizard  |
| **Private**    | ✅ Complete | Go                  | Hooks, SSH         |
| **Middleware** | ✅ Complete | Go                  | Auth, QoS, CORS    |
| **GraphQL**    | 📋 Planned  | -                   | Future enhancement |

---

## 🤝 Contributing

Contributions to the routers package are welcome! Please follow these guidelines:

1. **Route Organization** - Place routes in appropriate directories
2. **API Conventions** - Follow RESTful principles
3. **Error Handling** - Use centralized error handling
4. **Testing** - Include unit tests for route handlers
5. **Documentation** - Add Swagger annotations for API routes

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](./LICENSE) file for details.

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
