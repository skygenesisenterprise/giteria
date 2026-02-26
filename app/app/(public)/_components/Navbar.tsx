"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, GitBranch, Menu, ChevronDown, LayoutDashboard } from "lucide-react";

const menuItems = [
  {
    name: "Platform",
    hasDropdown: true,
    categories: [
      {
        title: "AI CODE CREATION",
        items: [
          { name: "Copilot", desc: "Write better code with AI", href: "/features/copilot" },
          { name: "Spark", desc: "Build and deploy intelligent apps", href: "/features/spark" },
          { name: "Models", desc: "Manage and compare prompts", href: "/features/models" },
          { name: "MCP Registry", desc: "Integrate external tools", href: "/mcp" },
        ],
      },
      {
        title: "DEVELOPER WORKFLOWS",
        items: [
          { name: "Actions", desc: "Automate any workflow", href: "/features/actions" },
          { name: "Codespaces", desc: "Instant dev environments", href: "/features/codespaces" },
          { name: "Issues", desc: "Plan and track work", href: "/features/issues" },
          { name: "Code Review", desc: "Manage code changes", href: "/features/code-review" },
        ],
      },
      {
        title: "APPLICATION SECURITY",
        items: [
          {
            name: "Advanced Security",
            desc: "Find and fix vulnerabilities",
            href: "/security/advanced-security",
          },
          {
            name: "Code security",
            desc: "Secure your code as you build",
            href: "/security/advanced-security/code-security",
          },
          {
            name: "Secret protection",
            desc: "Stop leaks before they start",
            href: "/security/advanced-security/secret-protection",
          },
        ],
      },
      {
        title: "EXPLORE",
        items: [
          { name: "Why Giteria", desc: "The platform for developers", href: "/why-giteria" },
          { name: "Documentation", desc: "Learn how to build", href: "/docs" },
          { name: "Blog", desc: "News and updates", href: "/blog" },
          { name: "Changelog", desc: "Latest features", href: "/changelog" },
        ],
      },
    ],
  },
  {
    name: "Solutions",
    hasDropdown: true,
    categories: [
      {
        title: "BY COMPANY SIZE",
        items: [
          { name: "Enterprises", desc: "For large organizations", href: "/enterprise" },
          { name: "Small teams", desc: "For growing teams", href: "/team" },
          { name: "Startups", desc: "For new businesses", href: "/enterprise/startups" },
          {
            name: "Nonprofits",
            desc: "For charitable organizations",
            href: "/solutions/industry/nonprofits",
          },
        ],
      },
      {
        title: "BY USE CASE",
        items: [
          {
            name: "App Modernization",
            desc: "Update legacy systems",
            href: "/solutions/use-case/app-modernization",
          },
          { name: "DevSecOps", desc: "Security in DevOps", href: "/solutions/use-case/devsecops" },
          { name: "DevOps", desc: "Streamline delivery", href: "/solutions/use-case/devops" },
          { name: "CI/CD", desc: "Continuous integration", href: "/solutions/use-case/ci-cd" },
        ],
      },
      {
        title: "BY INDUSTRY",
        items: [
          {
            name: "Healthcare",
            desc: "Healthcare solutions",
            href: "/solutions/industry/healthcare",
          },
          {
            name: "Financial services",
            desc: "FinTech solutions",
            href: "/solutions/industry/financial-services",
          },
          {
            name: "Manufacturing",
            desc: "Industry solutions",
            href: "/solutions/industry/manufacturing",
          },
          { name: "Government", desc: "Public sector", href: "/solutions/industry/government" },
        ],
      },
    ],
  },
  {
    name: "Resources",
    hasDropdown: true,
    categories: [
      {
        title: "EXPLORE BY TOPIC",
        items: [
          { name: "AI", desc: "Artificial intelligence", href: "/resources/articles?topic=ai" },
          {
            name: "Software Development",
            desc: "Coding best practices",
            href: "/resources/articles?topic=software-development",
          },
          {
            name: "DevOps",
            desc: "Operations & delivery",
            href: "/resources/articles?topic=devops",
          },
          {
            name: "Security",
            desc: "AppSec & compliance",
            href: "/resources/articles?topic=security",
          },
        ],
      },
      {
        title: "EXPLORE BY TYPE",
        items: [
          { name: "Customer stories", desc: "Success stories", href: "/customer-stories" },
          { name: "Events", desc: "Webinars & conferences", href: "/resources/events" },
          { name: "Ebooks & reports", desc: "In-depth guides", href: "/resources/whitepapers" },
          { name: "Giteria Skills", desc: "Learn by doing", href: "/skills" },
        ],
      },
      {
        title: "SUPPORT",
        items: [
          { name: "Documentation", desc: "API & setup guides", href: "/docs" },
          { name: "Support", desc: "Get help", href: "/support" },
          { name: "Community", desc: "Join discussions", href: "/community" },
          { name: "Partners", desc: "Developer program", href: "/partners" },
        ],
      },
    ],
  },
  {
    name: "Open Source",
    hasDropdown: true,
    categories: [
      {
        title: "COMMUNITY",
        items: [{ name: "Sponsors", desc: "Fund open source developers", href: "/sponsors" }],
      },
      {
        title: "PROGRAMS",
        items: [
          { name: "Security Lab", desc: "Find vulnerabilities", href: "/security-lab" },
          { name: "Maintainers", desc: "Build your community", href: "/maintainers" },
          { name: "Accelerator", desc: "Scale your project", href: "/accelerator" },
          { name: "Archive", desc: "Preserve open source", href: "/archive" },
        ],
      },
      {
        title: "REPOSITORIES",
        items: [
          { name: "Topics", desc: "Explore by topic", href: "/topics" },
          { name: "Trending", desc: "Popular repos", href: "/trending" },
          { name: "Collections", desc: "Curated lists", href: "/collections" },
        ],
      },
    ],
  },
  {
    name: "Enterprise",
    hasDropdown: true,
    categories: [
      {
        title: "ENTERPRISE",
        items: [
          { name: "Enterprise platform", desc: "AI-powered dev platform", href: "/enterprise" },
        ],
      },
      {
        title: "ADD-ONS",
        items: [
          {
            name: "Advanced Security",
            desc: "Enterprise-grade security",
            href: "/security/advanced-security",
          },
          {
            name: "Copilot for Business",
            desc: "AI features at scale",
            href: "/features/copilot/business",
          },
          {
            name: "Premium Support",
            desc: "24/7 dedicated support",
            href: "/enterprise/premium-support",
          },
        ],
      },
    ],
  },
  {
    name: "Pricing",
    href: "/pricing",
    hasDropdown: false,
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(() => {
    const token = localStorage.getItem("auth_token");
    setIsAuthenticated(!!token);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="flex items-center justify-between px-4 h-16 max-w-[1800px] mx-auto">
        <div className="flex items-center gap-4">
          <button
            className="lg:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link href="/" className="flex items-center gap-2">
            <GitBranch className="w-8 h-8 text-foreground" />
          </Link>

          <nav className="hidden lg:flex items-center">
            {menuItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.hasDropdown && setOpenDropdown(item.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button className="flex items-center gap-1 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {item.name}
                  {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
                </button>

                {item.hasDropdown && openDropdown === item.name && (
                  <div className="absolute top-full left-0 pt-2">
                    <div className="bg-card border border-border rounded-lg shadow-xl w-[600px] p-4">
                      <div className="grid grid-cols-3 gap-4">
                        {item.categories?.map((category, catIdx) => (
                          <div key={catIdx}>
                            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                              {category.title}
                            </h3>
                            <ul className="space-y-1">
                              {category.items.map((subItem, idx) => (
                                <li key={idx}>
                                  <Link
                                    href={subItem.href}
                                    className="block px-2 py-1.5 rounded hover:bg-secondary group"
                                  >
                                    <span className="text-sm text-foreground group-hover:text-primary block">
                                      {subItem.name}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                      {subItem.desc}
                                    </span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center bg-background border border-border rounded-md px-2 py-1.5 w-64">
            <Search className="w-4 h-4 text-muted-foreground mr-2" />
            <input
              type="text"
              placeholder="Search or jump to..."
              className="bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground w-full"
            />
            <span className="text-xs text-muted-foreground border border-border rounded px-1">
              /
            </span>
          </div>

          <button className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors">
            <Search className="w-5 h-5" />
          </button>

          {isAuthenticated ? (
            <Link
              href="/dashboard"
              className="px-3 py-1.5 text-sm font-medium text-primary-foreground bg-primary border border-primary rounded-md hover:bg-primary/90 transition-colors"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="px-3 py-1.5 text-sm font-medium text-foreground bg-transparent border border-border rounded-md hover:bg-secondary transition-colors"
              >
                Sign in
              </Link>

              <Link
                href="/register"
                className="hidden sm:block px-3 py-1.5 text-sm font-medium text-primary-foreground bg-primary border border-primary rounded-md hover:bg-primary/90 transition-colors"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden border-t border-border px-4 py-4 bg-background">
          <div className="mb-4 md:hidden">
            <div className="flex items-center bg-background border border-border rounded-md px-2 py-1.5">
              <Search className="w-4 h-4 text-muted-foreground mr-2" />
              <input
                type="text"
                placeholder="Search or jump to..."
                className="bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground w-full"
              />
            </div>
          </div>

          <nav className="flex flex-col gap-1">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href || "#"}
                className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary rounded-md transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="mt-4 flex flex-col gap-2">
            {isAuthenticated ? (
              <Link
                href="/dashboard"
                className="px-3 py-2 text-center text-sm font-medium text-primary-foreground bg-primary border border-primary rounded-md hover:bg-primary/90 transition-colors"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-3 py-2 text-center text-sm font-medium text-foreground bg-transparent border border-border rounded-md hover:bg-secondary transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  className="px-3 py-2 text-center text-sm font-medium text-primary-foreground bg-primary border border-primary rounded-md hover:bg-primary/90 transition-colors"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
