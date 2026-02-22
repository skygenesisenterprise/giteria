# Server Development TODO

## Phase 1: Core Infrastructure

- [ ] Setup database connection using xorm (from models/)
- [ ] Implement configuration system (from modules/setting)
- [ ] Add logging infrastructure (from modules/log)
- [ ] Create graceful server shutdown (from modules/graceful)

## Phase 2: Models Migration

- [ ] Migrate user models (from models/user/)
- [ ] Migrate organization models (from models/organization/)
- [ ] Migrate repository models (from models/repo/)
- [ ] Migrate auth models (from models/auth/)
- [ ] Migrate asymkey models (from models/asymkey/)
- [ ] Migrate permission models (from models/perm/)
- [ ] Migrate issue/pull models (from models/issues/, models/pull/)
- [ ] Migrate webhook models (from models/webhook/)

## Phase 3: Services Migration

- [ ] Migrate user service (from services/user/)
- [ ] Migrate auth service (from services/auth/)
- [ ] Migrate repository service (from services/repository/)
- [ ] Migrate organization service (from services/org/)
- [ ] Migrate git service (from services/git/)
- [ ] Migrate mailer service (from services/mailer/)
- [ ] Migrate webhook service (from services/webhook/)
- [ ] Migrate oauth2 service (from services/oauth2_provider/)
- [ ] Migrate migrations service (from services/migrations/)
- [ ] Migrate indexer service (from services/indexer/)
- [ ] Migrate actions service (from services/actions/)

## Phase 4: Modules Migration

- [ ] Migrate git module (from modules/git/)
- [ ] Migrate setting module (from modules/setting/)
- [ ] Migrate session module (from modules/session/)
- [ ] Migrate auth module (from modules/auth/)
- [ ] Migrate storage module (from modules/storage/)
- [ ] Migrate avatar module (from modules/avatar/)
- [ ] Migrate markup module (from modules/markup/)
- [ ] Migrate lfs module (from modules/lfs/)
- [ ] Migrate webhook module (from modules/webhook/)
- [ ] Migrate cache module (from modules/cache/)
- [ ] Migrate queue module (from modules/queue/)

## Phase 5: Options Migration

- [ ] Setup gitignore templates (from options/gitignore/)
- [ ] Setup license templates (from options/license/)
- [ ] Setup locale files (from options/locale/)
- [ ] Setup readme templates (from options/readme/)
- [ ] Setup label templates (from options/label/)

## Phase 6: Routers Migration

- [ ] Implement API v1 routes (from routers/api/v1/)
- [ ] Implement web routes (from routers/web/)
- [ ] Implement private routes (from routers/private/)
- [ ] Implement common middleware (from routers/common/)
- [ ] Setup OAuth2 endpoints
- [ ] Setup SSH/HTTP git endpoints

## Phase 7: Features

- [ ] Implement user registration/login
- [ ] Implement repository CRUD
- [ ] Implement organization management
- [ ] Implement git operations (clone, push, pull)
- [ ] Implement issue tracking
- [ ] Implement pull request workflow
- [ ] Implement wiki
- [ ] Implement actions/CI
- [ ] Implement LFS support
- [ ] Implement webhooks
- [ ] Implement ActivityPub

## Phase 8: Security

- [ ] Implement 2FA authentication
- [ ] Implement SSH key management
- [ ] Implement OAuth2 providers
- [ ] Implement rate limiting
- [ ] Implement CSRF protection

## Phase 9: Testing & Documentation

- [ ] Write unit tests for core services
- [ ] Write integration tests for API
- [ ] Generate API documentation (Swagger)
- [ ] Create deployment documentation
