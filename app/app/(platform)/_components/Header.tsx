"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useOwnerHeader } from "@/components/DashboardLayout";
import {
  Search,
  GitBranch,
  Menu,
  Plus,
  Bot,
  CircleUser,
  GitPullRequest,
  FolderGit2,
  Inbox,
  Download,
  Target,
  User,
  Star,
  FileCode,
  Building2,
  Heart,
  Sparkles,
  Palette,
  Eye,
  LogOut,
  Settings,
  Home,
  MessageSquare,
  Grid3X3,
  Users,
  BarChart3,
  Package,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

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
    icon: FolderGit2,
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
    icon: Grid3X3,
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
    icon: Users,
    visibleFor: ["organization"],
    requiredCapability: "teams",
  },
  {
    id: "insights",
    label: "Insights",
    href: "/insights",
    icon: BarChart3,
    visibleFor: ["organization"],
    requiredCapability: "insights",
  },
  {
    id: "sponsoring",
    label: "Sponsoring",
    href: "/sponsors",
    icon: Heart,
    visibleFor: ["user"],
    requiredCapability: "sponsoring",
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
    if (!tab.visibleFor.includes(owner.type)) {
      return false;
    }
    if (tab.requiredCapability && owner.capabilities) {
      return owner.capabilities[tab.requiredCapability] === true;
    }
    return true;
  });
}

function OwnerNavigation({ owner }: { owner: Owner }) {
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

function IconButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-md transition-colors",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

function SearchBar({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex items-center bg-background border border-border rounded-md px-2 py-1.5 w-96",
        className
      )}
    >
      <Search className="w-4 h-4 text-muted-foreground mr-2" />
      <input
        type="text"
        placeholder="Search or jump to..."
        className="bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground w-full"
      />
      <span className="text-xs text-muted-foreground border border-border rounded px-1">/</span>
    </div>
  );
}

function PlusDropdown({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const items = [
    { icon: Target, label: "New Issue", href: "/new/issue" },
    { icon: FolderGit2, label: "New Repository", href: "/new/repo" },
    { icon: Download, label: "Import Repository", href: "/import" },
    { icon: FolderGit2, label: "New Codespace", href: "/new/codespace" },
    { icon: FolderGit2, label: "New gist", href: "/new/gist" },
  ];

  return (
    <DropdownMenu open={isOpen} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>
        <IconButton>
          <Plus className="w-4 h-4" />
        </IconButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-card border-border w-52" sideOffset={4}>
        {items.map((item) => (
          <DropdownMenuItem
            key={item.label}
            className="cursor-pointer flex items-center gap-2"
            asChild
          >
            <Link href={item.href}>
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer flex items-center gap-2">
          <FolderGit2 className="w-4 h-4" />
          New organization
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer flex items-center gap-2">
          <FolderGit2 className="w-4 h-4" />
          New project
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function CopilotButton() {
  return (
    <Link href="/copilot">
      <IconButton>
        <Bot className="w-4 h-4" />
      </IconButton>
    </Link>
  );
}

function AccountDropdown({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <DropdownMenu open={isOpen} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>
        <IconButton>
          <CircleUser className="w-4 h-4" />
        </IconButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-card border-border w-56" align="end" sideOffset={4}>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium text-foreground">username</p>
            <p className="text-xs text-muted-foreground">Activity</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer flex items-center gap-2" asChild>
          <Link href="/profile">
            <User className="w-4 h-4" />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer flex items-center gap-2" asChild>
          <Link href="/profile?tab=repositories">
            <FolderGit2 className="w-4 h-4" />
            Repositories
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer flex items-center gap-2" asChild>
          <Link href="/profile?tab=stars">
            <Star className="w-4 h-4" />
            Stars
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer flex items-center gap-2" asChild>
          <Link href="/profile?tab=gists">
            <FileCode className="w-4 h-4" />
            Gists
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer flex items-center gap-2" asChild>
          <Link href="/profile?tab=organizations">
            <FolderGit2 className="w-4 h-4" />
            Organizations
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer flex items-center gap-2" asChild>
          <Link href="/profile?tab=enterprises">
            <Building2 className="w-4 h-4" />
            Enterprises
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer flex items-center gap-2" asChild>
          <Link href="/profile?tab=sponsors">
            <Heart className="w-4 h-4" />
            Sponsors
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer flex items-center gap-2" asChild>
          <Link href="/settings">
            <Settings className="w-4 h-4" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer flex items-center gap-2">
          <Bot className="w-4 h-4" />
          Copilot Settings
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          Features preview
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer flex items-center gap-2">
          <Palette className="w-4 h-4" />
          Appearance
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer flex items-center gap-2">
          <Eye className="w-4 h-4" />
          Accessibility
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer flex items-center gap-2">
          <Building2 className="w-4 h-4" />
          Try Enterprise
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer flex items-center gap-2 text-red-500 focus:text-red-500">
          <LogOut className="w-4 h-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function MobileSidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      <div className="fixed left-0 top-0 h-full w-64 bg-background border-r border-border z-50">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <GitBranch className="w-6 h-6 text-foreground" />
            <span className="font-semibold text-foreground">Giteria</span>
          </div>
          <IconButton onClick={onClose}>
            <Menu className="w-5 h-5 rotate-90" />
          </IconButton>
        </div>
        <div className="p-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-background border border-border rounded-md py-2 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export function Header({ className }: { className?: string }) {
  const { owner } = useOwnerHeader();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);

  return (
    <header className={cn("relative bg-background", className)}>
      <div className="border-b border-border">
        <div className="flex items-center justify-between h-16 px-4 max-w-450 mx-auto gap-6">
          <div className="flex items-center gap-3">
            <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <Menu className="w-5 h-5" />
            </IconButton>

            <Link href="/dashboard" className="flex items-center gap-2">
              <GitBranch className="w-8 h-8 text-foreground" />
            </Link>
          </div>

          <div className="flex-1 flex justify-center items-center">
            <SearchBar />

            <IconButton className="md:hidden absolute right-16">
              <Search className="w-5 h-5" />
            </IconButton>
          </div>

          <div className="flex items-center gap-1">
            <div className="border border-border rounded-md p-px">
              <CopilotButton />
            </div>

            <div
              className="border border-border rounded-md p-px"
              onMouseEnter={() => setOpenDropdown("plus")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <PlusDropdown
                isOpen={openDropdown === "plus"}
                onOpenChange={(open) => setOpenDropdown(open ? "plus" : null)}
              />
            </div>

            <span className="text-border mx-1">|</span>

            <div className="flex items-center gap-2">
              <div className="border border-border rounded-md p-px">
                <Link href="/issues">
                  <IconButton>
                    <Target className="w-4 h-4" />
                  </IconButton>
                </Link>
              </div>

              <div className="border border-border rounded-md p-px">
                <Link href="/pulls">
                  <IconButton>
                    <GitPullRequest className="w-4 h-4" />
                  </IconButton>
                </Link>
              </div>

              <div className="border border-border rounded-md p-px">
                <Link href="/repositories">
                  <IconButton>
                    <FolderGit2 className="w-4 h-4" />
                  </IconButton>
                </Link>
              </div>

              <div className="border border-border rounded-md p-px">
                <Link href="/notifications">
                  <IconButton>
                    <Inbox className="w-4 h-4" />
                  </IconButton>
                </Link>
              </div>

              <div
                className="border border-border rounded-md p-px"
                onMouseEnter={() => setOpenDropdown("account")}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <AccountDropdown
                  isOpen={openDropdown === "account"}
                  onOpenChange={(open) => setOpenDropdown(open ? "account" : null)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {owner && (
        <div className="sticky top-16 z-40 border-t border-border bg-background/95 backdrop-blur-sm">
          <div className="flex items-center justify-between h-14 px-4 max-w-450 mx-auto gap-6">
            <OwnerNavigation owner={owner} />
          </div>
        </div>
      )}

      <MobileSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </header>
  );
}

export default Header;
