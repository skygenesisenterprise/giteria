"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
  Bug,
  Search,
  Eye,
  FileText,
  ChevronDown,
  ChevronRight,
  FolderSearch,
  Lock,
  AlertTriangle,
} from "lucide-react";

interface SecuritySidebarProps {
  owner: string;
  repo: string;
}

interface SecurityItem {
  label: string;
  href: string;
  icon: React.ElementType;
  subItems?: SecurityItem[];
}

const securitySections: {
  title: string;
  href: string;
  icon: React.ElementType;
  items: SecurityItem[];
}[] = [
  {
    title: "Vulnerability alerts",
    href: "vulnerability-alerts",
    icon: Bug,
    items: [
      { label: "Code quality", href: "quality", icon: ShieldCheck },
      { label: "Dependabot", href: "dependabot", icon: FolderSearch },
      { label: "Code scanning", href: "code-scanning", icon: Search },
      { label: "Secret scanning", href: "secret-scanning", icon: Lock },
    ],
  },
  {
    title: "Reporting",
    href: "reporting",
    icon: AlertTriangle,
    items: [
      { label: "Policy", href: "policy", icon: FileText },
      { label: "Advisories", href: "advisories", icon: ShieldQuestion },
    ],
  },
];

export function SecuritySidebar({ owner, repo }: SecuritySidebarProps) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = React.useState<Set<string>>(new Set());

  const getCurrentSubItem = () => {
    const segments = pathname.split("/");
    const securityIndex = segments.indexOf("security");
    if (securityIndex !== -1 && segments.length > securityIndex + 1) {
      return segments.slice(securityIndex + 1).join("/");
    }
    return null;
  };

  const currentSubItem = getCurrentSubItem();

  const toggleExpanded = (href: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      if (next.has(href)) {
        next.delete(href);
      } else {
        next.add(href);
      }
      return next;
    });
  };

  const isGeneralActive = () => {
    const segments = pathname.split("/");
    const securityIndex = segments.indexOf("security");
    return securityIndex !== -1 && segments.length === securityIndex + 1;
  };

  const isSubItemActive = (href: string) => {
    return currentSubItem === href;
  };

  const isParentActive = (href: string) => {
    return currentSubItem?.startsWith(href);
  };

  const isExpanded = (href: string) => {
    return expandedItems.has(href) || isParentActive(href);
  };

  return (
    <div
      className="w-64 shrink-0"
      style={{
        fontFamily:
          '"Mona Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
      }}
    >
      <div className="sticky top-0">
        <nav className="space-y-6">
          <Link
            href={`/${owner}/${repo}/security`}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors",
              isGeneralActive()
                ? "bg-primary/10 text-primary font-medium"
                : "hover:bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            <Shield className="w-4 h-4" />
            Overview
          </Link>

          {securitySections.map((section) => {
            return (
              <div key={section.href}>
                <div className="border-t border-border mb-2" />
                <div className="px-3 py-2 rounded-lg text-sm font-medium text-foreground">
                  {section.title}
                </div>

                <div className="ml-4 mt-1 space-y-1">
                  {section.items.map((item) => {
                    const ItemIcon = item.icon;
                    const hasSubItems = item.subItems && item.subItems.length > 0;
                    const isItemExpanded = isExpanded(item.href);
                    const isItemActive = isSubItemActive(item.href);
                    const isParentItemActive = isParentActive(item.href);

                    return (
                      <div key={item.href}>
                        {hasSubItems ? (
                          <button
                            onClick={() => toggleExpanded(item.href)}
                            className={cn(
                              "w-full flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors",
                              isParentItemActive
                                ? "text-primary font-medium"
                                : "text-muted-foreground hover:text-foreground"
                            )}
                          >
                            <span className="flex items-center gap-2">
                              <ItemIcon className="w-4 h-4" />
                              {item.label}
                            </span>
                            {isItemExpanded ? (
                              <ChevronDown className="w-4 h-4" />
                            ) : (
                              <ChevronRight className="w-4 h-4" />
                            )}
                          </button>
                        ) : (
                          <Link
                            href={`/${owner}/${repo}/security/${item.href}`}
                            className={cn(
                              "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors",
                              isItemActive
                                ? "bg-primary/10 text-primary font-medium"
                                : "hover:bg-muted text-muted-foreground hover:text-foreground"
                            )}
                          >
                            <ItemIcon className="w-4 h-4" />
                            {item.label}
                          </Link>
                        )}

                        <AnimatePresence>
                          {hasSubItems && isItemExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <div className="ml-6 mt-1 space-y-1">
                                {item.subItems!.map((subItem) => {
                                  const SubItemIcon = subItem.icon;
                                  const isActive = isSubItemActive(subItem.href);

                                  return (
                                    <Link
                                      key={subItem.href}
                                      href={`/${owner}/${repo}/security/${subItem.href}`}
                                      className={cn(
                                        "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors",
                                        isActive
                                          ? "bg-primary/10 text-primary font-medium"
                                          : "hover:bg-muted text-muted-foreground hover:text-foreground"
                                      )}
                                    >
                                      <SubItemIcon className="w-4 h-4" />
                                      {subItem.label}
                                    </Link>
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
