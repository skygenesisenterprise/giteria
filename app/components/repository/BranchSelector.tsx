"use client";

import * as React from "react";
import { ChevronDown, GitBranch } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Branch {
  name: string;
  commit: {
    sha: string;
  };
}

interface BranchSelectorProps {
  branches: Branch[];
  currentBranch: string;
  onBranchChange: (branch: string) => void;
  isLoading: boolean;
  owner: string;
  repo: string;
}

export function BranchSelector({
  branches,
  currentBranch,
  onBranchChange,
  isLoading,
  owner,
  repo,
}: BranchSelectorProps) {
  const [open, setOpen] = React.useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <GitBranch className="w-4 h-4" />
        <span>Loading branches...</span>
      </div>
    );
  }

  if (branches.length === 0) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <GitBranch className="w-4 h-4" />
        <span>main</span>
      </div>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-1 h-8 px-2 font-normal">
          <GitBranch className="w-4 h-4" />
          <span className="max-w-[120px] truncate">{currentBranch}</span>
          <ChevronDown className="w-3 h-3 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-1 w-[200px]" align="start">
        <div className="flex flex-col py-1">
          {branches.map((branch) => (
            <button
              key={branch.name}
              onClick={() => {
                onBranchChange(branch.name);
                setOpen(false);
              }}
              className={cn(
                "flex items-center gap-2 px-2 py-1.5 text-sm rounded-sm text-left hover:bg-muted",
                branch.name === currentBranch && "bg-muted font-medium"
              )}
            >
              <GitBranch className="w-4 h-4 text-muted-foreground" />
              <span className="truncate">{branch.name}</span>
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
