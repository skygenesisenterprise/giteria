export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  name?: string;
  bio?: string;
  location?: string;
  website?: string;
  createdAt: string;
  updatedAt: string;
  isAdmin: boolean;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  description?: string;
  avatar?: string;
  website?: string;
  location?: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  ownerId: string;
  members: OrganizationMember[];
}

export interface OrganizationMember {
  id: string;
  userId: string;
  organizationId: string;
  role: 'owner' | 'admin' | 'member' | 'readonly';
  user: User;
}

export interface Repository {
  id: string;
  name: string;
  slug: string;
  description?: string;
  isPublic: boolean;
  isArchived: boolean;
  defaultBranch: string;
  createdAt: string;
  updatedAt: string;
  ownerId: string;
  organizationId?: string;
  owner: User | Organization;
  language?: string;
  size: number;
  stars: number;
  forks: number;
  issues: number;
  pullRequests: number;
  isMirror: boolean;
  mirrorUrl?: string;
  lastSyncAt?: string;
}

export interface Commit {
  sha: string;
  message: string;
  author: {
    name: string;
    email: string;
    date: string;
  };
  committer: {
    name: string;
    email: string;
    date: string;
  };
  url: string;
}

export interface Branch {
  name: string;
  commit: Commit;
  protected: boolean;
  default: boolean;
}

export interface Tag {
  name: string;
  commit: Commit;
  message?: string;
  createdAt: string;
}

export interface Issue {
  id: string;
  number: number;
  title: string;
  body?: string;
  state: 'open' | 'closed';
  author: User;
  assignees: User[];
  labels: Label[];
  milestone?: Milestone;
  createdAt: string;
  updatedAt: string;
  closedAt?: string;
  repositoryId: string;
}

export interface PullRequest {
  id: string;
  number: number;
  title: string;
  body?: string;
  state: 'open' | 'closed' | 'merged';
  author: User;
  assignees: User[];
  reviewers: User[];
  labels: Label[];
  milestone?: Milestone;
  headBranch: string;
  baseBranch: string;
  headRepository: Repository;
  baseRepository: Repository;
  mergeable?: boolean;
  mergedAt?: string;
  createdAt: string;
  updatedAt: string;
  closedAt?: string;
}

export interface Label {
  id: string;
  name: string;
  color: string;
  description?: string;
}

export interface Milestone {
  id: string;
  title: string;
  description?: string;
  state: 'open' | 'closed';
  dueOn?: string;
  createdAt: string;
  updatedAt: string;
  closedAt?: string;
}

export interface Pipeline {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'success' | 'failure' | 'cancelled';
  branch: string;
  commit: Commit;
  createdAt: string;
  startedAt?: string;
  finishedAt?: string;
  repositoryId: string;
  jobs: PipelineJob[];
}

export interface PipelineJob {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'success' | 'failure' | 'cancelled';
  exitCode?: number;
  startedAt?: string;
  finishedAt?: string;
  logs?: string;
  pipelineId: string;
}

export interface Package {
  id: string;
  name: string;
  version: string;
  description?: string;
  repositoryId: string;
  createdAt: string;
  updatedAt: string;
  downloads: number;
  size: number;
}

export interface Model {
  id: string;
  name: string;
  slug: string;
  description?: string;
  isPublic: boolean;
  type: 'copilot' | 'rag' | 'custom';
  provider: string;
  model: string;
  parameters: Record<string, any>;
  createdAt: string;
  updatedAt: string;
  ownerId: string;
  owner: User | Organization;
  downloads: number;
  rating: number;
  tags: string[];
}

export interface APIResponse<T> {
  data: T;
  message?: string;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface AuthUser {
  user: User;
  token: string;
  refreshToken: string;
}

export interface OAuthProvider {
  id: string;
  name: string;
  displayName: string;
  clientId: string;
  redirectUri: string;
  scopes: string[];
}