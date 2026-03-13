"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  AppWindow,
  ArrowLeftRight,
  BadgeCheck,
  BarChart3,
  Bell,
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
  Heart,
  Image,
  KanbanSquare,
  Key,
  Layers,
  ListTodo,
  Lock,
  Megaphone,
  Package,
  Puzzle,
  Receipt,
  Rocket,
  Search,
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
    title: "Access",
    href: "access",
    icon: Users,
    items: [
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
      {
        label: "Policies",
        href: "policies",
        icon: Gavel,
        subItems: [{ label: "Repositories", href: "policies/repos", icon: GitBranch }],
      },
    ],
  },
  {
    title: "Code and automation",
    href: "code",
    icon: Code,
    items: [
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
      { label: "Codespaces", href: "codespaces", icon: Container },
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
        label: "Models",
        href: "models",
        icon: Database,
        subItems: [
          { label: "Custom", href: "models/custom", icon: Settings2 },
          { label: "Development", href: "models/development", icon: Settings },
        ],
      },
      { label: "Packages", href: "packages", icon: Package },
      { label: "Pages", href: "pages", icon: FileText },
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
      { label: "Webhooks", href: "webhooks", icon: Puzzle },
      { label: "Import/export", href: "import-export", icon: ArrowLeftRight },
      {
        label: "Developer",
        href: "developer",
        icon: AppWindow,
        subItems: [
          { label: "Apps", href: "developer/apps", icon: AppWindow },
          { label: "OAuth Apps", href: "developer/oauth", icon: Key },
          { label: "Publisher", href: "developer/publisher", icon: Megaphone },
        ],
      },
    ],
  },
  {
    title: "Planning and community",
    href: "planning",
    icon: KanbanSquare,
    items: [
      {
        label: "Planning",
        href: "planning",
        icon: FolderKanban,
        subItems: [
          { label: "Issue types", href: "planning/issue-types", icon: ListTodo },
          { label: "Projects", href: "planning/projects", icon: FolderKanban },
        ],
      },
      { label: "Discussions", href: "discussions", icon: FileText },
      { label: "Reminders", href: "reminders", icon: Bell },
    ],
  },
  {
    title: "Security",
    href: "security",
    icon: Shield,
    items: [
      {
        label: "Security overview",
        href: "security",
        icon: Shield,
        subItems: [
          { label: "Analysis", href: "security/analysis", icon: ShieldCheck },
          { label: "Compliance", href: "security/compliance", icon: BadgeCheck },
          { label: "Configuration", href: "security/configuration", icon: Settings },
          { label: "Deploy keys", href: "security/deploy_keys", icon: Key },
          { label: "Domains", href: "security/domains", icon: Globe },
        ],
      },
      {
        label: "Secrets",
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
    title: "Billing",
    href: "billing",
    icon: CreditCard,
    items: [
      {
        label: "Billing",
        href: "billing",
        icon: CreditCard,
        subItems: [
          { label: "Budgets", href: "billing/budgets", icon: Receipt },
          { label: "History", href: "billing/history", icon: Clock },
          { label: "Licensing", href: "billing/licensing", icon: BadgeCheck },
          { label: "Payment information", href: "billing/payment_information", icon: CreditCard },
          { label: "Subscription", href: "billing/subscription", icon: Receipt },
          { label: "Usage", href: "billing/usage", icon: BarChart3 },
        ],
      },
    ],
  },
  {
    title: "Activity",
    href: "activity",
    icon: ClipboardList,
    items: [
      {
        label: "Logs",
        href: "logs",
        icon: ClipboardList,
        subItems: [
          { label: "Audit log", href: "logs/audit", icon: Search },
          { label: "Sponsor log", href: "logs/sponsor", icon: Heart },
        ],
      },
      { label: "Deleted repositories", href: "deleted_repos", icon: Trash2 },
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

  const isGeneralActive = () => {
    const segments = pathname.split("/");
    const settingsIndex = segments.indexOf("settings");
    return settingsIndex !== -1 && segments.length === settingsIndex + 1;
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
            href={`/${owner}/settings`}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors",
              isGeneralActive()
                ? "bg-primary/10 text-primary font-medium"
                : "hover:bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            <Settings className="w-4 h-4" />
            General
          </Link>

          {settingsSections.map((section) => {
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
