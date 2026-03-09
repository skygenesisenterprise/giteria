"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Home,
  BookMarked,
  PanelsTopLeft,
  MessageSquare,
  Package,
  Users,
  HeartHandshake,
  BarChart3,
  Heart,
  Settings,
} from "lucide-react";

export type OwnerType = "user" | "organization";

export interface OwnerCapability {
  teams?: boolean;
  people?: boolean;
  insights?: boolean;
  sponsoring?: boolean;
}

export interface Owner {
  type: OwnerType;
  username: string;
  name?: string;
  avatarUrl?: string;
  capabilities?: OwnerCapability;
}

interface NavTab {
  id: string;
  label: string;
  href: string;
  icon: React.ElementType;
  visibleFor: OwnerType[];
  requiredCapability?: keyof OwnerCapability;
}

const navTabs: NavTab[] = [
  { id: "overview", label: "Overview", href: "", icon: Home, visibleFor: ["user", "organization"] },
  {
    id: "repositories",
    label: "Repositories",
    href: "/repos",
    icon: BookMarked,
    visibleFor: ["user", "organization"],
  },
  {
    id: "discussions",
    label: "Discussions",
    href: "/discussions",
    icon: MessageSquare,
    visibleFor: ["user", "organization"],
  },
  {
    id: "projects",
    label: "Projects",
    href: "/projects",
    icon: PanelsTopLeft,
    visibleFor: ["user", "organization"],
  },
  {
    id: "packages",
    label: "Packages",
    href: "/package",
    icon: Package,
    visibleFor: ["user", "organization"],
  },
  {
    id: "teams",
    label: "Teams",
    href: "/teams",
    icon: HeartHandshake,
    visibleFor: ["organization"],
    requiredCapability: "teams",
  },
  {
    id: "people",
    label: "People",
    href: "/people",
    icon: Users,
    visibleFor: ["organization"],
  },
  {
    id: "insights",
    label: "Insights",
    href: "/insights",
    icon: BarChart3,
    visibleFor: ["user", "organization"],
    requiredCapability: "insights",
  },
  {
    id: "sponsors",
    label: "Sponsors",
    href: "/sponsors",
    icon: Heart,
    visibleFor: ["user", "organization"],
  },
  {
    id: "settings",
    label: "Settings",
    href: "/settings",
    icon: Settings,
    visibleFor: ["user", "organization"],
  },
];

function getVisibleTabs(owner: Owner): NavTab[] {
  return navTabs.filter((tab) => {
    if (tab.id === "teams" || tab.id === "people") {
      return owner.type === "organization";
    }
    if (!tab.visibleFor.includes(owner.type)) {
      return false;
    }
    if (tab.requiredCapability && owner.capabilities) {
      return owner.capabilities[tab.requiredCapability] === true;
    }
    return true;
  });
}

interface OwnerIdentityProps {
  owner: Owner;
}

function OwnerIdentity({ owner }: OwnerIdentityProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        {owner.avatarUrl ? (
          <img src={owner.avatarUrl} alt={owner.username} className="w-7 h-7 rounded-full" />
        ) : (
          <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center">
            <span className="text-xs font-semibold text-muted-foreground">
              {owner.username.slice(0, 2).toUpperCase()}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

interface OwnerNavigationProps {
  owner: Owner;
}

function OwnerNavigation({ owner }: OwnerNavigationProps) {
  const pathname = usePathname();

  const visibleTabs = getVisibleTabs(owner);
  const activeTabId = React.useMemo(() => {
    const basePath = `/${owner.username}`;
    const currentPath = pathname.slice(basePath.length).split("?")[0];

    if (currentPath === "" || currentPath === "/") {
      return "overview";
    }

    const matchedTab = visibleTabs.find((tab) => {
      if (tab.id === "overview") return false;
      return currentPath === tab.href || currentPath.startsWith(tab.href + "/");
    });

    return matchedTab?.id || "overview";
  }, [pathname, owner.username, visibleTabs]);

  return (
    <div className="flex items-center gap-1 overflow-x-auto">
      {visibleTabs.map((tab) => {
        const isActive = activeTabId === tab.id;
        const href = `/${owner.username}${tab.href}`;

        return (
          <Link
            key={tab.id}
            href={href}
            className={cn(
              "flex items-center gap-2 px-3 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors",
              isActive
                ? "border-[#fd8c73] text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            )}
            style={isActive ? { borderColor: "#fd8c73" } : undefined}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}

export interface HeaderOwnerProps {
  owner: Owner;
  className?: string;
}

export function HeaderOwner({ owner, className }: HeaderOwnerProps) {
  return (
    <div
      className={cn("-mt-2.5 bg-background/95 backdrop-blur-sm", className)}
      style={{
        fontFamily:
          '"Mona Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
      }}
    >
      <div className="flex items-center justify-between h-14 px-4 max-w-450 mx-auto gap-6">
        <div className="flex items-center gap-3 pl-0.5">
          <OwnerNavigation owner={owner} />
        </div>
      </div>
    </div>
  );
}

export default HeaderOwner;
