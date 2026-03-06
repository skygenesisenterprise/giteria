"use client";

import { Search } from "lucide-react";
import * as React from "react";
import { Input } from "@/components/ui/input";

interface RepositorySearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function RepositorySearch({ value, onChange }: RepositorySearchProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search repositories..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-9 w-64 border"
      />
    </div>
  );
}
