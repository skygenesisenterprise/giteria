"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Search,
  GitBranch,
  Menu,
  Plus,
  Bell,
  ChevronDown,
  GitPullRequest,
  CircleDot,
  Command,
} from "lucide-react";

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);

  const navLinks = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Issues", href: "/issues", icon: CircleDot },
    { label: "Pull requests", href: "/pulls", icon: GitPullRequest },
    { label: "Repositories", href: "/repositories" },
  ];

  const userMenuItems = [
    { label: "Your profile", href: "/profile" },
    { label: "Your repositories", href: "/repositories" },
    { label: "Your organizations", href: "/organizations" },
    { label: "Your projects", href: "/projects" },
    { label: "Your settings", href: "/settings" },
  ];

  return (
    <header className={cn("bg-[#0d1117] border-b border-[#30363d]", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-[#8b949e] hover:text-white hover:bg-[#21262d] rounded-md transition-colors"
              aria-label="Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-[#238636] rounded-lg flex items-center justify-center">
                <GitBranch className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-lg text-white hidden sm:block">Giteria</span>
            </Link>

            <nav className="hidden lg:flex items-center gap-1 ml-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-1.5 px-3 py-2 text-sm text-[#8b949e] hover:text-white hover:bg-[#21262d] rounded-md transition-colors"
                >
                  {link.icon && <link.icon className="w-4 h-4" />}
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden md:block relative">
              <div className="flex items-center">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8b949e]" />
                <input
                  type="text"
                  placeholder="Type / to search"
                  className="w-56 lg:w-72 bg-[#0d1117] border border-[#30363d] rounded-md py-1.5 pl-9 pr-16 text-sm text-white placeholder-[#8b949e] focus:outline-none focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff]"
                />
                <kbd className="absolute right-2 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-xs text-[#8b949e] bg-[#21262d] border border-[#30363d] rounded">
                  <Command className="w-3 h-3" />K
                </kbd>
              </div>
            </div>

            <button className="md:hidden p-2 text-[#8b949e] hover:text-white hover:bg-[#21262d] rounded-md transition-colors">
              <Search className="w-5 h-5" />
            </button>

            <button className="p-2 text-[#8b949e] hover:text-white hover:bg-[#21262d] rounded-md transition-colors">
              <Plus className="w-5 h-5" />
            </button>

            <button className="p-2 text-[#8b949e] hover:text-white hover:bg-[#21262d] rounded-md transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#58a6ff] rounded-full" />
            </button>

            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-1 p-1 text-[#8b949e] hover:text-white hover:bg-[#21262d] rounded-md transition-colors"
              >
                <div className="w-6 h-6 bg-[#238636] rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-medium">U</span>
                </div>
                <ChevronDown className="w-4 h-4" />
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 top-full mt-1 w-56 bg-[#161b22] border border-[#30363d] rounded-md shadow-lg py-1 z-50">
                  <div className="px-3 py-2 border-b border-[#30363d]">
                    <p className="text-sm text-white font-medium">Signed in as</p>
                    <p className="text-xs text-[#8b949e]">user@example.com</p>
                  </div>
                  {userMenuItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-3 py-2 text-sm text-[#c9d1d9] hover:bg-[#21262d] hover:text-white transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <div className="border-t border-[#30363d] mt-1 pt-1">
                    <button
                      className="block w-full text-left px-3 py-2 text-sm text-[#c9d1d9] hover:bg-[#21262d] hover:text-white transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-[#30363d]">
          <div className="p-4">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8b949e]" />
              <input
                type="text"
                placeholder="Search"
                className="w-full bg-[#0d1117] border border-[#30363d] rounded-md py-2 pl-9 pr-4 text-sm text-white placeholder-[#8b949e] focus:outline-none focus:border-[#58a6ff]"
              />
            </div>
          </div>
          <nav className="px-4 pb-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 block px-4 py-2 text-base text-[#c9d1d9] hover:bg-[#21262d] rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.icon && <link.icon className="w-4 h-4" />}
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
