import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes publiques qui ne nécessitent pas d'authentification
const publicRoutes = [
  "/login", 
  "/register", 
  "/",
  "/about",
  "/pricing",
  "/docs",
  "/status",
  "/api/v1/auth",
  "/api/v1/detect-owner"
];

// Routes statiques et assets
const staticRoutes = [
  "/favicon.ico",
  "/robots.txt",
  "/sitemap.xml",
  "/manifest.json",
  "/_next",
  "/api"
];

// Fonction pour déterminer si une route est publique
function isPublicRoute(pathname: string): boolean {
  // Vérifier les routes publiques exactes
  if (publicRoutes.some(route => pathname === route || pathname.startsWith(route))) {
    return true;
  }
  
  // Vérifier les routes statiques
  if (staticRoutes.some(route => pathname.startsWith(route))) {
    return true;
  }
  
  return false;
}

// Fonction pour déterminer si une route nécessite une authentification
function requiresAuth(pathname: string): boolean {
  // Patterns de routes qui nécessitent une authentification
  const authRequiredPatterns = [
    /^\/dashboard/,           // Dashboard et sous-routes
    /^\/settings/,           // Paramètres utilisateur
    /^\/repos\/new/,        // Création de repository
    /^\/orgs\/new/,         // Création d'organisation
    /^\/notifications/,      // Notifications
    /^\/billing/,           // Facturation
  ];
  
  // Patterns de repositories (user/org + repo)
  const repoPatterns = [
    /^\/[^\/]+\/[^\/]+\/settings/,    // /user/repo/settings ou /org/repo/settings
    /^\/[^\/]+\/[^\/]+\/actions/,     // /user/repo/actions ou /org/repo/actions
    /^\/[^\/]+\/[^\/]+\/issues\/new/, // /user/repo/issues/new ou /org/repo/issues/new
    /^\/[^\/]+\/[^\/]+\/pulls\/new/,  // /user/repo/pulls/new ou /org/repo/pulls/new
  ];
  
  // Vérifier si c'est une route qui nécessite une authentification
  return authRequiredPatterns.some(pattern => pattern.test(pathname)) ||
         repoPatterns.some(pattern => pattern.test(pathname));
}

// Fonction pour extraire les informations d'une route de repository
function parseRepositoryRoute(pathname: string) {
  // Pattern: /username/repo ou /orgname/repo
  const repoMatch = pathname.match(/^\/([^\/]+)\/([^\/]+)(\/.*)?$/);
  
  if (repoMatch) {
    const [_, owner, repo, rest = ''] = repoMatch;
    return { owner, repo, rest: rest.replace(/^\//, '') };
  }
  
  return null;
}

// Fonction pour vérifier si un utilisateur est authentifié
function isAuthenticated(request: NextRequest): boolean {
  // Vérifier le cookie d'authentification
  const authToken = request.cookies.get("auth-token")?.value;
  const isAuthenticated = request.cookies.get("isAuthenticated")?.value;
  
  // En développement, on peut être plus permissif
  if (process.env.NODE_ENV === "development") {
    return true;
  }
  
  return !!(authToken || isAuthenticated === "true");
}

// Fonction pour gérer les redirections
function handleRedirect(request: NextRequest, pathname: string): NextResponse {
  const loginUrl = new URL("/login", request.url);
  
  // Ajouter l'URL de redirection
  loginUrl.searchParams.set("redirect", pathname);
  
  // Ajouter des informations contextuelles si c'est une route de repository
  const repoInfo = parseRepositoryRoute(pathname);
  if (repoInfo) {
    loginUrl.searchParams.set("repo", repoInfo.repo);
    loginUrl.searchParams.set("owner", repoInfo.owner);
  }
  
  return NextResponse.redirect(loginUrl);
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Routes publiques - laisser passer sans authentification
  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  // 2. Routes statiques et assets - laisser passer
  if (staticRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // 3. Vérifier l'authentification pour les routes protégées
  const userIsAuthenticated = isAuthenticated(request);
  
  if (!userIsAuthenticated) {
    // Routes qui nécessitent absolument une authentification
    if (requiresAuth(pathname)) {
      return handleRedirect(request, pathname);
    }
    
    // Routes de repository - vérifier si c'est une action protégée
    const repoInfo = parseRepositoryRoute(pathname);
    if (repoInfo) {
      // Actions protégées sur les repositories
      const protectedActions = ['settings', 'actions', 'issues/new', 'pulls/new'];
      const isProtectedAction = protectedActions.some(action => 
        repoInfo.rest.startsWith(action)
      );
      
      if (isProtectedAction) {
        return handleRedirect(request, pathname);
      }
    }
  }

  // 4. Ajouter des headers pour le debugging et le contexte
  const response = NextResponse.next();
  
  // Headers pour le contexte utilisateur
  if (userIsAuthenticated) {
    response.headers.set('x-user-authenticated', 'true');
  }
  
  // Headers pour le contexte de repository
  const repoInfo = parseRepositoryRoute(pathname);
  if (repoInfo) {
    response.headers.set('x-repo-owner', repoInfo.owner);
    response.headers.set('x-repo-name', repoInfo.repo);
    response.headers.set('x-repo-path', repoInfo.rest);
  }

  // Headers pour le debugging
  if (process.env.NODE_ENV === "development") {
    response.headers.set('x-debug-pathname', pathname);
    response.headers.set('x-debug-auth', userIsAuthenticated.toString());
    response.headers.set('x-debug-public', isPublicRoute(pathname).toString());
  }

  return response;
}

// Configuration du matcher pour optimiser les performances
export const config = {
  matcher: [
    /*
     * Match all request paths except for ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder (public assets)
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
};