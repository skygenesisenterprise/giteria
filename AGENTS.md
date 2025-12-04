# Giteria Frontend - Agent Guidelines

## Commands
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production with Turbopack  
- `npm run start` - Start production server
- `npm run lint` - Run ESLint (no test framework configured yet)

## Code Style Guidelines

### Imports & Formatting
- Use absolute imports with `@/` prefix for internal modules
- Group imports: React/Next.js → third-party → internal types → internal components
- Use TypeScript strict mode (already configured)
- Follow Next.js App Router conventions

### Naming Conventions
- Components: PascalCase (e.g., `RepoCard`, `UserBadge`)
- Files: PascalCase for components, camelCase for utilities
- Interfaces: PascalCase with descriptive names (e.g., `Repository`, `User`)
- Constants: UPPER_SNAKE_CASE

### Component Structure
- Use server components by default, client components with `"use client"`
- Prefer composition over inheritance
- Use Tailwind CSS classes for styling (configured)
- Implement proper TypeScript types for all props

### Error Handling
- Use try-catch blocks for async operations
- Implement proper error boundaries
- Return meaningful error messages from API calls

### Architecture Notes
- App Router structure with route groups
- Component library in `app/components/ui/`
- Types defined in `app/lib/types.ts`

## Project Context
Giteria is an open-source, self-hostable Git platform with AI integration. Focus on clean, scalable architecture for future AI features (Copilot, RAG).