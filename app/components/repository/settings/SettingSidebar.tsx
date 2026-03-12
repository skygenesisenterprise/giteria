"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Code,
  Puzzle,
  Shield,
  Settings,
  UserCheck,
  UserCog,
  GitBranch,
  Bot,
  Settings2,
  Rocket,
  Database,
  FileText,
  ShieldCheck,
  Tags,
  Webhook,
  AppWindow,
  Bell,
  Lock,
  Key,
  ShieldAlert,
  ChevronDown,
  ChevronRight,
  Container,
  FolderSearch,
  Search,
  Sparkles,
} from "lucide-react";

interface SettingSidebarProps {
  owner: string;
  repo: string;
}

interface SettingItem {
  label: string;
  href: string;
  icon: React.ElementType;
  subItems?: SettingItem[];
}

const settingsSections: {
  title: string;
  href: string;
  icon: React.ElementType;
  items: SettingItem[];
}[] = [
  {
    title: "Access",
    href: "access",
    icon: Users,
    items: [
      { label: "Teams", href: "access/teams", icon: Users },
      {
        label: "Moderator",
        href: "access/moderator",
        icon: UserCheck,
        subItems: [
          { label: "Code review", href: "access/moderator/code_review", icon: ShieldCheck },
          {
            label: "Interaction limits",
            href: "access/moderator/interaction_limits",
            icon: UserCog,
          },
          { label: "Reported content", href: "access/moderator/reported_content", icon: FileText },
        ],
      },
    ],
  },
  {
    title: "Code and automation",
    href: "code",
    icon: Code,
    items: [
      { label: "Branches", href: "code/branches", icon: GitBranch },
      { label: "Tags", href: "code/tags", icon: Tags },
      {
        label: "Rules",
        href: "code/rules",
        icon: ShieldCheck,
        subItems: [
          { label: "Rulesets", href: "code/rules/rulesets", icon: ShieldCheck },
          { label: "Insights", href: "code/rules/insights", icon: FileText },
        ],
      },
      {
        label: "Actions",
        href: "code/actions",
        icon: Rocket,
        subItems: [
          { label: "General", href: "code/actions/general", icon: Settings },
          { label: "Runners", href: "code/actions/runners", icon: Bot },
        ],
      },
      { label: "Models", href: "code/models", icon: Database },
      { label: "Webhooks", href: "code/webhooks", icon: Webhook },
      {
        label: "Copilot",
        href: "code/copilot",
        icon: Bot,
        subItems: [
          { label: "Code review", href: "code/copilot/code_review", icon: Search },
          { label: "Coding agent", href: "code/copilot/coding_agent", icon: Sparkles },
        ],
      },
      { label: "Environments", href: "code/environments", icon: Rocket },
      { label: "Pages", href: "code/pages", icon: FileText },
      { label: "Custom properties", href: "code/custom-propreties", icon: Settings2 },
    ],
  },
  {
    title: "Integrations",
    href: "integrations",
    icon: Puzzle,
    items: [
      { label: "Giteria Apps", href: "integrations/apps", icon: AppWindow },
      { label: "Scheduled reminders", href: "integrations/notifications", icon: Bell },
    ],
  },
  {
    title: "Security",
    href: "security",
    icon: Shield,
    items: [
      { label: "Advanced security", href: "security/advanced_security", icon: ShieldAlert },
      { label: "Code scanning", href: "security/code_quality", icon: ShieldCheck },
      { label: "Deploy keys", href: "security/deploy_keys", icon: Key },
      {
        label: "Secrets",
        href: "security/secrets",
        icon: Lock,
        subItems: [
          { label: "Actions", href: "security/secrets/actions", icon: Bot },
          { label: "Codespaces", href: "security/secrets/codespaces", icon: Container },
          { label: "Dependabot", href: "security/secrets/dependabot", icon: FolderSearch },
        ],
      },
    ],
  },
];

export function SettingSidebar({ owner, repo }: SettingSidebarProps) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = React.useState<Set<string>>(new Set());

  const getCurrentSubItem = () => {
    const segments = pathname.split("/");
    const settingsIndex = segments.indexOf("settings");
    if (settingsIndex !== -1 && segments.length > settingsIndex + 2) {
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
            href={`/${owner}/${repo}/settings`}
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
                            href={`/${owner}/${repo}/settings/${item.href}`}
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
                                      href={`/${owner}/${repo}/settings/${subItem.href}`}
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
