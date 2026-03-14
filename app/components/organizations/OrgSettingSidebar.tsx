"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  BadgeCheck,
  BarChart3,
  Bot,
  ClipboardList,
  Clock,
  Code,
  Container,
  CreditCard,
  Database,
  FileText,
  FolderKanban,
  Gavel,
  GitBranch,
  Globe,
  Image,
  Key,
  Layers,
  ListTodo,
  Lock,
  Package,
  Puzzle,
  Rocket,
  Server,
  Settings,
  Settings2,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Tags,
  Trash2,
  UserCheck,
  UserCog,
  Users,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface OrgSettingSidebarProps {
  owner: string;
}

interface SettingItem {
  label: string;
  href: string;
  icon: React.ElementType;
  subItems?: SettingItem[];
}

interface SettingSection {
  title: string;
  href: string;
  icon: React.ElementType;
  items: SettingItem[];
}

const settingsSections: SettingSection[] = [
  {
    title: "Overview",
    href: "overview",
    icon: Settings,
    items: [
      {
        label: "General",
        href: "",
        icon: Settings,
      },
      {
        label: "Policies",
        href: "policies",
        icon: Gavel,
        subItems: [
          { label: "General", href: "policies", icon: Settings },
          { label: "Repositories", href: "policies/repos", icon: GitBranch },
        ],
      },
    ],
  },
  {
    title: "Access",
    href: "access",
    icon: Users,
    items: [
      {
        label: "Billing and licensing",
        href: "billing",
        icon: CreditCard,
        subItems: [
          { label: "Billing", href: "billing", icon: CreditCard },
          { label: "Licensing", href: "billing/licensing", icon: BadgeCheck },
          { label: "Plans", href: "billing/plans", icon: Rocket },
        ],
      },
      {
        label: "Organization roles",
        href: "org-roles",
        icon: UserCog,
        subItems: [
          { label: "Overview", href: "org-roles", icon: UserCog },
          { label: "Custom roles", href: "org-roles/custom", icon: Settings2 },
        ],
      },
      {
        label: "Repository roles",
        href: "repo-roles",
        icon: GitBranch,
        subItems: [
          { label: "Overview", href: "repo-roles", icon: GitBranch },
          { label: "Custom roles", href: "repo-roles/custom", icon: Settings2 },
        ],
      },
      { label: "Member privileges", href: "member_privileges", icon: UserCheck },
      { label: "Roles", href: "roles", icon: UserCog },
      {
        label: "Moderator",
        href: "moderator",
        icon: ShieldCheck,
        subItems: [
          { label: "Blocked users", href: "moderator/blocked_user", icon: ShieldAlert },
          { label: "Code review limits", href: "moderator/code_review_limits", icon: FileText },
          { label: "Interaction limits", href: "moderator/interaction_limits", icon: UserCog },
        ],
      },
    ],
  },
  {
    title: "Code and automation",
    href: "code",
    icon: Code,
    items: [
      {
        label: "Repositories",
        href: "repos",
        icon: GitBranch,
        subItems: [
          { label: "Custom properties", href: "repos/custom-properties", icon: Settings2 },
          { label: "Insights", href: "repos/insights", icon: BarChart3 },
          { label: "Rulesets", href: "repos/rulesets", icon: ShieldCheck },
          { label: "Topics", href: "repos/topics", icon: Tags },
        ],
      },
      {
        label: "Codespaces",
        href: "codespaces",
        icon: Container,
        subItems: [{ label: "General", href: "codespaces", icon: Settings }],
      },
      {
        label: "Planning",
        href: "planning",
        icon: FolderKanban,
        subItems: [
          { label: "Issue types", href: "planning/issue-types", icon: ListTodo },
          { label: "Projects", href: "planning/projects", icon: FolderKanban },
        ],
      },
      {
        label: "Copilot",
        href: "copilot",
        icon: Bot,
        subItems: [
          { label: "Access", href: "copilot/access", icon: UserCheck },
          { label: "Coding agent", href: "copilot/coding_agent", icon: Sparkles },
        ],
      },
      {
        label: "Actions",
        href: "actions",
        icon: Rocket,
        subItems: [
          { label: "Caches", href: "actions/caches", icon: Layers },
          { label: "Custom images", href: "actions/custom-images", icon: Image },
          { label: "OIDC", href: "actions/oidc", icon: Key },
          { label: "Runners", href: "actions/runner", icon: Bot },
          { label: "Runner groups", href: "actions/runner-groups", icon: Users },
        ],
      },
      {
        label: "Models",
        href: "models",
        icon: Database,
        subItems: [
          { label: "Custom", href: "models/custom", icon: Settings2 },
          { label: "Development", href: "models/development", icon: Settings },
        ],
      },
      { label: "Webhooks", href: "webhooks", icon: Puzzle },
      { label: "Discussions", href: "discussions", icon: FileText },
      { label: "Packages", href: "packages", icon: Package },
      { label: "Pages", href: "pages", icon: FileText },
    ],
  },
  {
    title: "Security",
    href: "security",
    icon: Shield,
    items: [
      {
        label: "Authentication Security",
        href: "authentication-security",
        icon: Key,
      },
      {
        label: "Advanced Security",
        href: "advanced-security",
        icon: ShieldCheck,
        subItems: [{ label: "Overview", href: "advanced-security", icon: ShieldCheck }],
      },
      { label: "Deploy Keys", href: "deploy-keys", icon: Key },
      { label: "Compliance", href: "compliance", icon: BadgeCheck },
      { label: "Verified Domains", href: "domains", icon: Globe },
      {
        label: "Secrets and Variables",
        href: "secrets",
        icon: Lock,
        subItems: [
          { label: "Actions", href: "secrets/actions", icon: Bot },
          { label: "Codespaces", href: "secrets/codespaces", icon: Container },
          { label: "Dependabot", href: "secrets/dependabot", icon: ShieldAlert },
          { label: "Private registries", href: "secrets/private_registries", icon: Server },
        ],
      },
    ],
  },
  {
    title: "Third-party Access",
    href: "third-party-access",
    icon: Key,
    items: [
      { label: "Giteria Apps", href: "giteria-apps", icon: Puzzle },
      { label: "OAuth app policy", href: "oauth-policy", icon: ShieldCheck },
      {
        label: "Personal Access Tokens",
        href: "tokens",
        icon: Key,
        subItems: [
          { label: "Settings", href: "tokens/settings", icon: Settings },
          { label: "Active tokens", href: "tokens/active", icon: BadgeCheck },
          { label: "Pending requests", href: "tokens/pending", icon: Clock },
        ],
      },
    ],
  },
  {
    title: "Integrations",
    href: "integrations",
    icon: Puzzle,
    items: [{ label: "Scheduled reminders", href: "reminders", icon: Clock }],
  },
  {
    title: "Archives and logs",
    href: "archives-logs",
    icon: ClipboardList,
    items: [
      {
        label: "Logs",
        href: "logs",
        icon: ClipboardList,
        subItems: [
          { label: "General", href: "policies", icon: Settings },
          { label: "Repositories", href: "policies/repos", icon: GitBranch },
        ],
      },
      { label: "Deleted repositories", href: "deleted_repos", icon: Trash2 },
    ],
  },
  {
    title: "Developer",
    href: "developer",
    icon: Code,
    items: [
      {
        label: "Developer settings",
        href: "developer",
        icon: Settings,
        subItems: [
          { label: "OAuth Apps", href: "developer/oauth", icon: Key },
          { label: "Giteria Apps", href: "developer/apps", icon: Puzzle },
          {
            label: "Publisher Verification",
            href: "developer/publisher",
            icon: BadgeCheck,
          },
        ],
      },
    ],
  },
];

export function OrgSettingSidebar({ owner }: OrgSettingSidebarProps) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = React.useState<Set<string>>(new Set());

  const getCurrentSubItem = () => {
    const segments = pathname.split("/");
    const settingsIndex = segments.indexOf("settings");
    if (settingsIndex !== -1 && segments.length > settingsIndex + 1) {
      return segments.slice(settingsIndex + 1).join("/");
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

  const isSubItemActive = (href: string) => {
    if (href === "") {
      return currentSubItem === null || currentSubItem === "";
    }
    return currentSubItem === href;
  };

  const isParentActive = (href: string) => {
    if (href === "") return false;
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
          {settingsSections.map((section, index) => {
            return (
              <div key={section.href}>
                {index > 0 && <div className="border-t border-border mb-2" />}
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
                            type="button"
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
                            href={`/${owner}/settings/${item.href}`}
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
                                      href={`/${owner}/settings/${subItem.href}`}
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
