<div align="center">

# 🚀 Giteria Models

[![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](https://github.com/skygenesisenterprise/giteria/blob/main/models/LICENSE) [![Go](https://img.shields.io/badge/Go-1.21+-blue?style=for-the-badge&logo=go)](https://golang.org/) [![xorm](https://img.shields.io/badge/xorm-1.3+-orange?style=for-the-badge)](https://xorm.io/) [![Gitea](https://img.shields.io/badge/Base-Gitea-blue?style=for-the-badge)](https://gitea.io/)

**📊 Comprehensive Database Models & Business Logic Layer for Giteria**

A comprehensive models layer for **Giteria**, a self-hosted Git service platform. This package provides all database models, business logic, and utilities for repository management, user authentication, issues, pull requests, and more.

[🚀 Quick Start](#-quick-start) • [📋 What's New](#-whats-new) • [🛠️ Tech Stack](#️-tech-stack) • [📁 Architecture](#-architecture) • [🤝 Contributing](#-contributing)

[![GitHub stars](https://img.shields.io/github/stars/skygenesisenterprise/giteria?style=social)](https://github.com/skygenesisenterprise/giteria/stargazers) [![GitHub forks](https://img.shields.io/github/forks/skygenesisenterprise/giteria?style=social)](https://github.com/skygenesisenterprise/giteria/network)

</div>

---

## 🌟 What is Giteria Models?

**Giteria Models** is the core data layer and business logic package for **Giteria**, a modern self-hosted Git service platform. Built on the solid foundation of Gitea, it provides a comprehensive set of database models and utilities for managing Git repositories, users, organizations, issues, pull requests, and more.

### 🎯 Our Vision

- **🏗️ Comprehensive Data Layer** - Complete database models with xorm ORM
- **🔐 Authentication System** - Full user and team authentication with various providers
- **📦 Repository Management** - Complete repository, fork, star, and watch functionality
- **🐛 Issue Tracking** - Full-featured issue system with labels, milestones, and comments
- **🔀 Pull Request Engine** - Complete PR workflow with reviews and merges
- **🔑 Security Keys** - SSH and GPG key management for secure Git operations
- **🏢 Organization Support** - Team-based access control and organization management
- **🗄️ Migration System** - Database migration framework with version control
- **🧪 Testing Infrastructure** - Comprehensive unit and integration test utilities

---

## 🆕 What's New - Recent Evolution

### 🎯 **Major Additions in v1.0+**

#### 📦 **Complete Model Ecosystem** (NEW)

- ✅ **Repository Models** - Complete repository management with forks, stars, watches
- ✅ **User & Organization Models** - Full user and team management
- ✅ **Issue & PR Models** - Complete issue tracking and pull request system
- ✅ **Authentication Models** - Multiple auth provider support
- ✅ **Security Models** - SSH keys, GPG keys, deploy keys

#### 🔗 **Enhanced Integrations** (NEW)

- ✅ **Webhook System** - Comprehensive webhook event handling
- ✅ **Actions System** - GitHub Actions compatibility
- ✅ **Activity Tracking** - Full activity log and notification system
- ✅ **Avatar System** - User and repository avatar management

#### 🏗️ **Enhanced Architecture** (IMPROVED)

- ✅ **Database Layer** - xorm ORM with PostgreSQL, MySQL, SQLite support
- ✅ **Migration Framework** - Version-controlled database migrations
- ✅ **Unit Testing** - Comprehensive test utilities and fixtures
- ✅ **Fixtures System** - Test data management and loading

---

## 📊 Current Status

> **✅ Production Ready**: Comprehensive model layer for self-hosted Git services.

### ✅ **Currently Implemented**

#### 🏗️ **Core Models**

- ✅ **Repository Models** - Complete repo, fork, star, watch, mirror functionality
- ✅ **User Models** - Full user management with avatars and sessions
- ✅ **Organization Models** - Teams, members, and org-level permissions
- ✅ **Issue Models** - Issues, labels, milestones, comments
- ✅ **Pull Request Models** - PRs, reviews, merge functionality
- ✅ **Wiki Models** - Repository wiki support

#### 🔐 **Security & Authentication**

- ✅ **SSH Keys** - User and deploy key management
- ✅ **GPG Keys** - GPG key verification and commit signing
- ✅ **Access Tokens** - API access token management
- ✅ **Two-Factor Authentication** - TOTP-based 2FA support
- ✅ **Web Authentication** - OAuth2, LDAP, PAM support

#### 🛠️ **Infrastructure Models**

- ✅ **Webhook System** - Event-driven webhook notifications
- ✅ **Actions System** - CI/CD workflow execution
- ✅ **Activity Models** - User and repository activities
- ✅ **Notification System** - Real-time notifications
- ✅ **System Settings** - Configuration and admin settings

### 🔄 **In Development**

- **Enhanced Search** - Full-text search across repositories
- **Advanced Permissions** - Granular access control
- **Audit Logging** - Comprehensive audit trails
- **API v2** - RESTful API improvements

### 📋 **Planned Features**

- **GraphQL API** - GraphQL support for complex queries
- **Advanced Analytics** - Repository analytics and insights
- **Webhook Filters** - Advanced webhook filtering
- **Integration Plugins** - Plugin system for extensions

---

## 🚀 Quick Start

### 📋 Prerequisites

- **Go** 1.21.0 or higher
- **Database** - PostgreSQL 14+, MySQL 8+, or SQLite3
- **xorm** - Latest version for ORM operations

### 📥 **Installation**

```bash
# Clone the repository
git clone https://github.com/skygenesisenterprise/giteria.git
cd giteria/models

# Run tests
go test ./...

# Build
go build ./...
```

### 🎯 **Usage Example**

```go
package main

import (
    "context"
    "github.com/skygenesisenterprise/giteria/models/db"
    user_model "github.com/skygenesisenterprise/giteria/models/user"
    "xorm.io/engine"
)

func main() {
    // Initialize database
    ctx := context.Background()

    // Create user
    user := &user_model.User{
        Name:     "testuser",
        Email:    "test@example.com",
        PassHash: "hashed_password",
    }

    _, err := db.GetEngine(ctx).Insert(user)
    if err != nil {
        panic(err)
    }
}
```

---

## 🛠️ Tech Stack

### ⚙️ **Core Layer**

```
Go 1.21+ + xorm ORM
├── 🗄️ xorm (Database ORM)
├── 🏗️ Database Engines (PostgreSQL, MySQL, SQLite)
├── 📦 Go Modules (Dependency Management)
└── 🧪 Testing (go test, assertions)
```

### 📦 **Model Categories**

```
Giteria Models
├── 👤 User Models (Users, sessions, avatars)
├── 🏢 Organization Models (Teams, members)
├── 📦 Repository Models (Repos, forks, stars)
├── 🐛 Issue Models (Issues, labels, milestones)
├── 🔀 Pull Request Models (PRs, reviews, merges)
├── 🔐 Security Models (SSH, GPG, tokens)
├── 🪝 Webhook Models (Events, payloads)
├── ⚡ Actions Models (Workflows, runs)
└── 📊 System Models (Settings, logs)
```

### 🗄️ **Supported Databases**

```
Database Support
├── 🐘 PostgreSQL 14+ (Recommended)
├── 🐬 MySQL 8+ (Supported)
└── 📄 SQLite3 (Development)
```

---

## 📁 Architecture

### 🏗️ **Model Package Structure**

```
models/
├── 👤 user/                  # User models and management
│   ├── user.go              # User entity and CRUD
│   ├── avatar.go            # Avatar handling
│   └── ...
├── 🏢 organization/         # Organization & team models
│   ├── org.go               # Organization entity
│   ├── team.go              # Team management
│   └── ...
├── 📦 repo/                 # Repository models
│   ├── repo.go              # Repository entity
│   ├── fork.go              # Fork functionality
│   ├── star.go              # Star/watch system
│   ├── release.go           # Release management
│   ├── issue.go             # Issue tracking
│   └── ...
├── 🐛 issues/               # Issue & PR models
│   ├── issue.go             # Issue entity
│   ├── label.go             # Labels
│   ├── milestone.go         # Milestones
│   ├── comment.go           # Comments
│   └── pull.go              # Pull requests
├── 🔐 asymkey/              # SSH & GPG keys
│   ├── ssh_key.go           # SSH key management
│   └── gpg_key.go           # GPG key handling
├── 🪝 webhook/              # Webhook system
│   ├── webhook.go           # Webhook entity
│   └── hooktask.go          # Webhook tasks
├── ⚡ actions/              # GitHub Actions
│   └── ...
├── 📊 activities/          # Activity tracking
│   └── ...
├── 🗄️ db/                   # Database utilities
│   └── ...
├── 🗺️ migrations/          # Database migrations
│   ├── v1_8/               # Version 1.8 migrations
│   ├── v1_19/              # Version 1.19 migrations
│   └── ...
├── 🔒 secret/               # Secrets management
├── 🗄️ dbfs/                 # Database filesystem
├── 🧪 unittest/             # Testing utilities
│   ├── fixtures.go         # Test fixtures
│   ├── fixtures_loader.go  # Fixture loading
│   └── ...
└── 📦 packages/            # Package registry models
```

### 🔄 **Data Flow Architecture**

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Application  │    │   Models Layer   │    │   Database     │
│     Layer      │◄──►│   (Business      │◄──►│   (xorm)       │
│                │    │    Logic)       │    │                │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
   HTTP Handlers          Model Services           SQL Queries
   API Endpoints          Data Validation          Migrations
   Controllers            Business Rules           Transactions
```

---

## 🗺️ Development Roadmap

### 🎯 **Phase 1: Foundation (✅ Complete - Q1 2025)**

- ✅ **Base Model Architecture** - Complete xorm integration
- ✅ **Repository Models** - Full repo management
- ✅ **User & Auth Models** - Complete authentication system
- ✅ **Issue & PR Models** - Issue tracking and PR workflow
- ✅ **Security Models** - SSH and GPG key support
- ✅ **Migration Framework** - Database version control

### 🚀 **Phase 2: Ecosystem Evolution (✅ Complete - Q1 2025)**

- ✅ **Webhook System** - Comprehensive webhook support
- ✅ **Actions System** - GitHub Actions compatibility
- ✅ **Activity Tracking** - Full activity log
- ✅ **Organization Teams** - Team-based access control
- ✅ **Notification System** - Real-time notifications
- ✅ **Testing Infrastructure** - Comprehensive test utilities

### ⚙️ **Phase 3: Enhancements (🔄 In Progress - Q2 2025)**

- 🔄 **Enhanced Search** - Full-text search capabilities
- 🔄 **Advanced Permissions** - Granular access control
- 📋 **Audit Logging** - Comprehensive audit trails
- 📋 **API Improvements** - RESTful API enhancements

### 🌟 **Phase 4: Advanced Features (Q3-Q4 2025)**

- 📋 **GraphQL API** - GraphQL support
- 📋 **Advanced Analytics** - Repository insights
- 📋 **Plugin System** - Extension framework
- 📋 **Enhanced Integrations** - Third-party integrations

---

## 💻 Development

### 📋 **Development Commands**

```bash
# Run all tests
go test ./...

# Run tests with coverage
go test -cover ./...

# Run specific package tests
go test ./user/...
go test ./repo/...
go test ./issues/...

# Run benchmarks
go test -bench ./...

# Format code
go fmt ./...

# Lint code
go vet ./...

# Run integration tests
go test -tags=integration ./...
```

### 📋 **Development Guidelines**

- **Go Best Practices** - Follow Go conventions and idioms
- **xorm Patterns** - Use xorm best practices for database operations
- **Testing** - All new models require unit tests
- **Migrations** - Database changes require migrations
- **Code Review** - All changes require review
- **Documentation** - Public APIs require documentation

---

## 🤝 Contributing

We're looking for contributors to help build this comprehensive Git hosting platform! Whether you're experienced with Go, databases, Git internals, or web development, there's a place for you.

### 🎯 **How to Get Started**

1. **Fork the repository** and create a feature branch
2. **Check the issues** for tasks that need help
3. **Join discussions** about architecture and features
4. **Start small** - Documentation, tests, or minor features
5. **Follow our code standards** and commit guidelines

### 🏗️ **Areas Needing Help**

- **Go Development** - Core model logic, business rules
- **Database Design** - Schema optimization, migrations
- **Security Models** - Authentication, encryption
- **Testing** - Unit tests, integration tests
- **Documentation** - API docs, user guides

### 📝 **Contribution Process**

1. **Choose an area** - Core models, specific feature, or documentation
2. **Understand the architecture** - Read existing code and patterns
3. **Create a branch** with a descriptive name
4. **Implement your changes** following our guidelines
5. **Test thoroughly** - Run tests and verify coverage
6. **Submit a pull request** with clear description
7. **Address feedback** from maintainers

---

## 📞 Support & Community

### 💬 **Get Help**

- 📖 **[Documentation](docs/)** - Comprehensive guides
- 🐛 **[GitHub Issues](https://github.com/skygenesisenterprise/giteria/issues)** - Bug reports
- 💡 **[GitHub Discussions](https://github.com/skygenesisenterprise/giteria/discussions)** - Questions
- 📧 **Email** - support@skygenesisenterprise.com

### 🐛 **Reporting Issues**

When reporting bugs, please include:

- Clear description of the problem
- Steps to reproduce
- Environment information (Go version, database, OS)
- Error logs or stack traces
- Expected vs actual behavior

---

## 📊 Project Status

| Component                  | Status         | Technology       | Notes                         |
| -------------------------- | -------------- | ---------------- | ----------------------------- |
| **Repository Models**      | ✅ Working     | xorm + Go        | Complete repo management      |
| **User Models**            | ✅ Working     | xorm + Go        | Full user system              |
| **Organization Models**    | ✅ Working     | xorm + Go        | Teams & orgs                  |
| **Issue & PR Models**      | ✅ Working     | xorm + Go        | Complete tracking             |
| **Security Models**        | ✅ Working     | xorm + Go        | SSH & GPG support             |
| **Webhook System**         | ✅ Working     | xorm + Go        | Event-driven webhooks         |
| **Actions System**         | ✅ Working     | xorm + Go        | CI/CD workflow support        |
| **Migration Framework**    | ✅ Working     | xorm + Go        | Version-controlled migrations |
| **Testing Infrastructure** | ✅ Working     | Go + xorm        | Comprehensive test utilities  |
| **Database Support**       | ✅ Working     | PostgreSQL/MySQL | Multi-database support        |
| **Search Functionality**   | 🔄 In Progress | xorm + Go        | Full-text search              |
| **Audit Logging**          | 📋 Planned     | xorm + Go        | Comprehensive audit trails    |
| **GraphQL API**            | 📋 Planned     | GraphQL          | GraphQL support               |

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

- **Sky Genesis Enterprise** - Project leadership
- **Gitea Project** - Foundation and inspiration
- **Go Community** - Programming language and ecosystem
- **xorm Team** - Excellent Go ORM library
- **The Linux Foundation** - Open source foundation
- **Open Source Community** - Tools, libraries, and inspiration

---

<div align="center">

### 🚀 **Join Us in Building the Future of Self-Hosted Git Services!**

[⭐ Star This Repo](https://github.com/skygenesisenterprise/giteria) • [🐛 Report Issues](https://github.com/skygenesisenterprise/giteria/issues) • [💡 Start a Discussion](https://github.com/skygenesisenterprise/giteria/discussions)

---

**🔧 Comprehensive Model Layer for Modern Git Hosting!**

**Made with ❤️ by the [Sky Genesis Enterprise](https://skygenesisenterprise.com) team**

_Building a powerful self-hosted Git service with comprehensive database models_

</div>
