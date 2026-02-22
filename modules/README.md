<div align="center">

# 🚀 Giteria Modules

[![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](https://github.com/luw2007/giteria/blob/main/LICENSE) [![Go](https://img.shields.io/badge/Go-1.21+-blue?style=for-the-badge&logo=go)](https://golang.org/)

**Comprehensive Go Module Library for Giteria - Self-Hosted Git Service**

A rich collection of reusable Go modules providing core functionality for the Giteria platform, including authentication, storage, templating, markup processing, and more.

[🚀 Overview](#-overview) • [📦 Core Modules](#-core-modules) • [🛠️ Utility Modules](#-utility-modules) • [🔗 Integration Modules](#-integration-modules) • [📁 Architecture](#-architecture)

</div>

---

## 🌟 What are Giteria Modules?

The **Giteria Modules** are a comprehensive set of Go packages that power the Giteria self-hosted Git service. These modules provide essential functionality for building modern Git platforms, including user authentication, file storage, content rendering, and more.

### 🎯 Key Features

- **🔐 Authentication** - Multiple auth methods (OAuth, LDAP, PAM, WebAuthn, OpenID)
- **💾 Storage** - Multi-backend storage (Local, MinIO, Azure Blob, S3)
- **📝 Templating** - Dynamic template engine with helper functions
- **🎨 Markup** - Markdown and other markup rendering
- **🖼️ Avatar** - Avatar generation with identicons
- **📊 Logging** - Structured logging with multiple output formats
- **🔧 Utilities** - JSON, validation, caching, and more

---

## 📦 Core Modules

### 🔐 Authentication (`auth/`)

Comprehensive authentication system supporting multiple providers and security methods.

**Key Features**:

- OAuth2 integration
- LDAP authentication
- PAM (Pluggable Authentication Modules)
- WebAuthn/FIDO2 support
- OpenID Connect
- Password hashing with bcrypt
- Group-team mapping

**Submodules**:

- `auth/` - Common authentication utilities
- `auth/httpauth/` - HTTP Basic/Digest authentication
- `auth/openid/` - OpenID authentication
- `auth/pam/` - PAM integration
- `auth/password/` - Password handling
- `auth/webauthn/` - WebAuthn support

### 💾 Storage (`storage/`)

Unified object storage interface supporting multiple backends.

**Key Features**:

- Multiple storage backends (Local, MinIO, Azure Blob, S3)
- Unified ObjectStorage interface
- Storage type registration system
- Path handling and URL support

**Submodules**:

- `storage/` - Main storage interface
- `storage/local/` - Local filesystem storage
- `storage/minio/` - MinIO/S3-compatible storage
- `storage/azureblob/` - Azure Blob Storage

### 📝 Templating (`templates/`)

Powerful template rendering engine for HTML emails and pages.

**Key Features**:

- Dynamic template loading
- Built-in asset management
- Template helper functions
- JSON/date/string utilities
- Scoped templates
- Variable system
- HTML rendering

**Submodules**:

- `templates/` - Main template engine
- `templates/vars/` - Template variable handling
- `templates/scopedtmpl/` - Scoped template support
- `templates/eval/` - Template evaluation

### 🎨 Markup (`markup/`)

Content rendering for markdown, HTML, and various markup formats.

**Key Features**:

- Markdown rendering
- HTML sanitization
- Issue/PR reference linking
- Commit SHA linking
- Code syntax highlighting
- Math rendering (LaTeX)
- Asciicast support
- External link handling

**Submodules**:

- `markup/` - Main markup rendering
- `markup/markdown/` - Markdown support
- `markup/mdstripper/` - Markdown stripping
- `markup/asciicast/` - Asciicast rendering
- `markup/external/` - External content

---

## 🛠️ Utility Modules

### 🖼️ Avatar (`avatar/`)

Avatar generation and management with identicon support.

**Key Features**:

- Random avatar generation
- Identicon creation
- Hash-based avatar lookup
- Multiple image format support (PNG, JPEG, GIF, WebP)

### 📊 JSON (`json/`)

JSON processing with multiple JSON library support.

**Key Features**:

- Multiple JSON implementations
- JSON v1/v2 compatibility
- Go-json integration
- Legacy JSON support

### 📅 Time Utilities (`timeutil/`)

Time manipulation and formatting utilities.

**Key Features**:

- Timestamp conversion
- Relative time formatting
- Time constants

### 📦 Container (`container/`)

Container data structure utilities.

**Key Features**:

- Set implementation
- Filter utilities

### 🔍 Validation (`validation/`)

Input validation utilities.

### 🏷️ Labels (`label/`)

Label management and processing.

### 📛 User (`user/`)

User-related utilities and models.

### 🔒 Secret (`secret/`)

Secret management and encryption.

### 🌍 URI (`uri/`)

URI parsing and manipulation.

### 📑 Sitemap (`sitemap/`)

Sitemap generation.

---

## 🔗 Integration Modules

### 🐙 Git (`git/`)

Comprehensive Git operations library.

**Key Features**:

- Repository operations
- Commit handling
- Branch management
- Tag operations
- Blob/Tree operations
- Diff generation
- Blame functionality
- Submodule support
- Hook management
- Multiple Git implementations (gogit/nogogit)

### 🌐 HTTP (`http/`)

HTTP utilities and middleware.

**Submodules**:

- `httplib/` - HTTP client/server utilities
- `httpcache/` - HTTP caching
- `proxy/` - Proxy support
- `proxyprotocol/` - PROXY protocol
- `web/` - Web utilities

### 📡 Events (`eventsource/`)

Server-Sent Events (SSE) support.

### 📬 Webhook (`webhook/`)

Webhook handling and processing.

### 🔄 Queue (`queue/`)

Async job queue implementation.

---

## 🔧 Additional Modules

### 📁 File & Assets

- `assetfs/` - Embedded asset filesystem
- `fileicon/` - File type icons
- `typesniffer/` - File type detection

### ⚙️ System

- `system/` - System information
- `process/` - Process management
- `tempdir/` - Temporary directory handling

### 🌍 Network

- `hostmatcher/` - Host matching
- `uri/` - URI utilities

### 📝 Data

- `charset/` - Character set handling
- `csv/` - CSV processing
- `dump/` - Data dumping

### 🎭 Security

- `captcha/` - CAPTCHA support
- `hcaptcha/` - hCaptcha integration
- `mcaptcha/` - mCaptcha integration
- `recaptcha/` - reCAPTCHA integration
- `turnstile/` - Cloudflare Turnstile

### 🧩 Other

- `emoji/` - Emoji support
- `highlight/` - Syntax highlighting
- `badge/` - Badge generation
- `svg/` - SVG utilities
- `paginator/` - Pagination
- `translation/` - i18n support
- `setting/` - Configuration management

---

## 📁 Architecture

```
modules/
├── auth/                   # Authentication (OAuth, LDAP, PAM, WebAuthn, OpenID)
│   ├── httpauth/         # HTTP Basic/Digest
│   ├── openid/          # OpenID Connect
│   ├── pam/             # PAM integration
│   ├── password/        # Password handling
│   └── webauthn/        # WebAuthn/FIDO2
├── storage/              # Object Storage
│   ├── local/           # Local filesystem
│   ├── minio/           # MinIO/S3
│   └── azureblob/       # Azure Blob
├── templates/           # Template Engine
│   ├── vars/            # Template variables
│   ├── scopedtmpl/      # Scoped templates
│   └── eval/            # Template evaluation
├── markup/              # Markup Rendering
│   ├── markdown/        # Markdown
│   ├── mdstripper/      # Markdown stripper
│   └── asciicast/       # Asciicast
├── avatar/              # Avatar Generation
├── git/                 # Git Operations
├── log/                 # Logging
├── json/                # JSON Processing
├── storage/             # Storage Backends
├── queue/               # Async Queue
├── webhook/             # Webhook Handling
├── eventsource/         # Server-Sent Events
├── setting/             # Configuration
├── user/                # User Management
├── util/                # General Utilities
├── validate/            # Validation
└── ...                  # 70+ additional modules
```

---

## 🚀 Usage Examples

### Storage

```go
import (
    "code.gitera.io/giteria/modules/storage"
    "code.gitea.io/giteria/modules/setting"
)

func init() {
    storage.RegisterStorageType(setting.StorageTypeLocal, local.NewStorage)
    storage.RegisterStorageType(setting.StorageTypeMinIO, minio.NewStorage)
}
```

### Authentication

```go
import "code.gitea.io/giteria/modules/auth"

func handleLogin(username, password string) error {
    // Use auth module for authentication
    return auth.Authenticate(username, password)
}
```

### Templates

```go
import "code.gitea.io/giteria/modules/templates"

func renderTemplate() string {
    return templates.Render("email/welcome", map[string]any{
        "Username": "john",
    })
}
```

---

## 📋 Module Index

| Module        | Description                | Status |
| ------------- | -------------------------- | ------ |
| `actions`     | GitHub Actions integration | ✅     |
| `activitypub` | ActivityPub protocol       | ✅     |
| `analyze`     | Code analysis              | ✅     |
| `assetfs`     | Asset filesystem           | ✅     |
| `auth`        | Authentication             | ✅     |
| `avatar`      | Avatar generation          | ✅     |
| `badge`       | Badge generation           | ✅     |
| `base`        | Base utilities             | ✅     |
| `cache`       | Caching                    | ✅     |
| `container`   | Container utilities        | ✅     |
| `git`         | Git operations             | ✅     |
| `json`        | JSON processing            | ✅     |
| `log`         | Logging                    | ✅     |
| `markup`      | Markup rendering           | ✅     |
| `queue`       | Async queue                | ✅     |
| `setting`     | Configuration              | ✅     |
| `storage`     | Storage backends           | ✅     |
| `templates`   | Template engine            | ✅     |
| `user`        | User management            | ✅     |
| `util`        | Utilities                  | ✅     |
| `webhook`     | Webhooks                   | ✅     |

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