# Migration Guide: routers/ to server/

## Overview

This document outlines the migration process from the legacy `routers/` directory to the new `server/` structure.

## Current Structure

### Legacy: `routers/`

```
routers/
├── api/
│   ├── v1/
│   │   ├── api.go
│   │   ├── admin/
│   │   ├── misc/
│   │   ├── org/
│   │   ├── repo/
│   │   └── swagger/
│   ├── actions/
│   └── packages/
├── common/
│   ├── auth.go
│   ├── middleware.go
│   ├── db.go
│   └── ...
├── install/
│   ├── routes.go
│   └── install.go
├── private/
│   ├── internal.go
│   ├── hook_pre_receive.go
│   └── ...
├── utils/
│   └── utils.go
├── web/
│   ├── web.go
│   ├── admin/
│   ├── repo/
│   └── ...
└── init.go
```

### Target: `server/`

```
server/
├── index.go              # Main entry point (routes registration)
├── src/
│   ├── config/           # Configuration files
│   ├── controllers/      # Controller layer
│   ├── interfaces/       # Interface definitions
│   ├── middleware/       # Custom middleware
│   ├── models/           # Data models
│   ├── routes/           # Route handlers (target for migration)
│   │   └── routes.go     # Route handlers to be migrated
│   └── services/         # Business logic services
├── tests/                # Server tests
└── utils/                # Utility functions
```

## Migration Steps

### 1. Route Handlers Migration

#### API Routes (`routers/api/`)

| Original Path                 | Target Path                                  | Description             |
| ----------------------------- | -------------------------------------------- | ----------------------- |
| `routers/api/v1/api.go`       | `server/src/controllers/api/v1/api.go`       | Main API router         |
| `routers/api/v1/admin/*.go`   | `server/src/controllers/api/v1/admin/*.go`   | Admin endpoints         |
| `routers/api/v1/misc/*.go`    | `server/src/controllers/api/v1/misc/*.go`    | Miscellaneous endpoints |
| `routers/api/v1/org/*.go`     | `server/src/controllers/api/v1/org/*.go`     | Organization endpoints  |
| `routers/api/v1/repo/*.go`    | `server/src/controllers/api/v1/repo/*.go`    | Repository endpoints    |
| `routers/api/v1/swagger/*.go` | `server/src/controllers/api/v1/swagger/*.go` | Swagger documentation   |
| `routers/api/actions/*.go`    | `server/src/controllers/api/actions/*.go`    | Actions API endpoints   |
| `routers/api/packages/*.go`   | `server/src/controllers/api/packages/*.go`   | Packages API endpoints  |

#### Web Routes (`routers/web/`)

| Original Path                   | Target Path                                    | Description          |
| ------------------------------- | ---------------------------------------------- | -------------------- |
| `routers/web/web.go`            | `server/src/controllers/web/web.go`            | Main web router      |
| `routers/web/admin/*.go`        | `server/src/controllers/web/admin/*.go`        | Admin UI routes      |
| `routers/web/repo/*.go`         | `server/src/controllers/web/repo/*.go`         | Repository UI routes |
| `routers/web/repo/setting/*.go` | `server/src/controllers/web/repo/setting/*.go` | Repository settings  |
| `routers/web/repo/actions/*.go` | `server/src/controllers/web/repo/actions/*.go` | Actions UI routes    |
| `routers/web/devtest/*.go`      | `server/src/controllers/web/devtest/*.go`      | Dev test routes      |
| `routers/web/metrics.go`        | `server/src/controllers/web/metrics.go`        | Metrics endpoint     |

#### Private Routes (`routers/private/`)

| Original Path          | Target Path                           | Description         |
| ---------------------- | ------------------------------------- | ------------------- |
| `routers/private/*.go` | `server/src/controllers/private/*.go` | Internal API routes |

#### Common Middleware (`routers/common/`)

| Original Path         | Target Path                  | Description                     |
| --------------------- | ---------------------------- | ------------------------------- |
| `routers/common/*.go` | `server/src/middleware/*.go` | Shared middleware and utilities |

#### Install Routes (`routers/install/`)

| Original Path          | Target Path                           | Description                |
| ---------------------- | ------------------------------------- | -------------------------- |
| `routers/install/*.go` | `server/src/controllers/install/*.go` | Installation wizard routes |

### 2. Import Path Updates

After migration, update import paths:

```go
// Before
import (
    apiv1 "github.com/skygenesisenterprise/giteria/routers/api/v1"
    "github.com/skygenesisenterprise/giteria/routers/common"
    web_routers "github.com/skygenesisenterprise/giteria/routers/web"
)

// After
import (
    apiv1 "github.com/skygenesisenterprise/giteria/server/src/controllers/api/v1"
    "github.com/skygenesisenterprise/giteria/server/src/middleware"
    web_routers "github.com/skygenesisenterprise/giteria/server/src/controllers/web"
)
```

### 3. Update Route Registration

In `server/index.go`, update the route mounting to use the new paths:

```go
func NormalRoutes() *web.Router {
    r := web.NewRouter()
    r.Use(common.ProtocolMiddlewares()...)

    r.Mount("/", web_routers.Routes())
    r.Mount("/api/v1", apiv1.Routes())
    r.Mount("/api/internal", private.Routes())
    // ... rest of routes
}
```

### 4. Migration Commands

```bash
# Create directory structure
mkdir -p server/src/controllers/{api/{v1/{admin,misc,org,repo,swagger},actions,packages},web/{admin,repo/{actions,setting},devtest},private,install}
mkdir -p server/src/middleware

# Move commands (run from project root)
cp -r routers/api/v1/* server/src/controllers/api/v1/
cp -r routers/api/actions/ server/src/controllers/api/
cp -r routers/api/packages/ server/src/controllers/api/
cp -r routers/web/* server/src/controllers/web/
cp -r routers/private/* server/src/controllers/private/
cp -r routers/common/* server/src/middleware/
cp -r routers/install/* server/src/controllers/install/
```

### 5. Package Renaming

After moving files, update package declarations:

```go
// Before (routers/api/v1/repo/repo.go)
package repo

// After (server/src/routes/api/v1/repo/repo.go)
package repo
```

## Progress Tracking

- [x] Create directory structure in `server/src/`
- [x] Migrate API v1 routes
- [x] Migrate API actions routes
- [x] Migrate API packages routes
- [x] Migrate web routes
- [x] Migrate private routes
- [x] Migrate common middleware
- [x] Migrate install routes
- [x] Update all import paths
- [x] Update `server/index.go` route registration
- [ ] Run tests to verify functionality
- [ ] Remove legacy `routers/` directory

## Notes

- Keep the `routers/` directory until migration is complete and tested
- Update any references in `routers/init.go` to point to new locations
- Ensure all tests are updated with new import paths
- Run `go mod tidy` after migration to clean up dependencies
