"use client";

import * as React from "react";
import { ArrowUpDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type RepositorySortOption = "updated" | "name" | "stars";

interface RepositorySortProps {
  value: RepositorySortOption;
  onChange: (value: RepositorySortOption) => void;
}

const sortOptions: { value: RepositorySortOption; label: string }[] = [
  { value: "updated", label: "Last updated" },
  { value: "name", label: "Name" },
  { value: "stars", label: "Stars" },
];

export function RepositorySort({ value, onChange }: RepositorySortProps) {
  return (
    <div className="flex items-center gap-2">
      <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
      <Select value={value} onValueChange={(v) => onChange(v as RepositorySortOption)}>
        <SelectTrigger className="w-36 border">
          <SelectValue placeholder="Sort" />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
