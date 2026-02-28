"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Search,
  GitBranch,
  Menu,
  Plus,
  Bell,
  Command,
  X,
  Settings,
  HelpCircle,
  BookOpen,
  CircleUser,
  Bot,
  FileText,
  GitPullRequest,
  FolderGit2,
  Code,
  Users,
  BookMarked,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  className?: string;
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
        "flex items-center bg-background border border-border rounded-md px-2 py-1.5 w-64",
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

function CreateDropdown() {
  const items = [
    { icon: FileText, label: "New Issue" },
    { icon: FolderGit2, label: "New Repository" },
    { icon: Code, label: "New Codespace" },
    { icon: BookMarked, label: "New gist" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <IconButton>
          <Plus className="w-4 h-4" />
        </IconButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-card border-border w-48">
        {items.map((item) => (
          <DropdownMenuItem key={item.label} className="cursor-pointer flex items-center gap-2">
            <item.icon className="w-4 h-4" />
            {item.label}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer flex items-center gap-2">
          <Users className="w-4 h-4" />
          New organization
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">New project</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function CopilotDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <IconButton>
          <Bot className="w-4 h-4" />
        </IconButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-card border-border w-64">
        <DropdownMenuLabel className="text-sm font-medium">New conversation in</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">Current workspace</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function NotificationButton() {
  return (
    <IconButton className="relative">
      <Bell className="w-5 h-5" />
      <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
    </IconButton>
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
            <X className="w-5 h-5" />
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

export function Header({ className }: HeaderProps) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const pathname = usePathname();

  const getPageTitle = () => {
    const path = pathname === "/" ? "Home" : pathname;
    const segments = path.split("/").filter(Boolean);

    if (segments.length >= 2 && segments[0] !== "dashboard" && segments[0] !== "settings") {
      return `${segments[0]} / ${segments[1]}`;
    }

    if (segments.length === 1) {
      return segments[0].charAt(0).toUpperCase() + segments[0].slice(1);
    }

    return "Home";
  };

  const currentPage = getPageTitle();

  return (
    <header className={cn("sticky top-0 z-50 bg-background border-b border-border", className)}>
      <div className="flex items-center justify-between h-16 px-4 max-w-[1800px] mx-auto gap-8">
        {/* Left Group */}
        <div className="flex items-center gap-3">
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <Menu className="w-5 h-5" />
          </IconButton>

          <Link href="/dashboard" className="flex items-center gap-2">
            <GitBranch className="w-8 h-8 text-foreground" />
            <span className="hidden lg:inline text-foreground font-bold text-sm">
              {currentPage}
            </span>
          </Link>
        </div>

        {/* Right Group */}
        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <SearchBar />
          </div>

          <IconButton className="md:hidden">
            <Search className="w-5 h-5" />
          </IconButton>

          <div className="flex items-center border border-border rounded-md p-1">
            <CopilotDropdown />
            <div className="w-px h-4 bg-border mx-1" />
            <CreateDropdown />
          </div>

          <IconButton>
            <FileText className="w-5 h-5" />
          </IconButton>

          <IconButton>
            <GitPullRequest className="w-5 h-5" />
          </IconButton>

          <IconButton>
            <FolderGit2 className="w-5 h-5" />
          </IconButton>

          <NotificationButton />

          <IconButton>
            <Settings className="w-5 h-5" />
          </IconButton>

          <IconButton>
            <HelpCircle className="w-5 h-5" />
          </IconButton>

          <IconButton>
            <BookOpen className="w-5 h-5" />
          </IconButton>

          <IconButton>
            <CircleUser className="w-[22px] h-[22px]" />
          </IconButton>
        </div>
      </div>

      <MobileSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </header>
  );
}

export default Header;
