"use client";

import * as React from "react";
import { Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type RepositoryType = "all" | "public" | "private";
export type RepositoryLanguage = "all" | "TypeScript" | "Rust" | "Go" | "Python";

interface RepositoryFiltersProps {
  type: RepositoryType;
  language: RepositoryLanguage;
  onTypeChange: (type: RepositoryType) => void;
  onLanguageChange: (language: RepositoryLanguage) => void;
}

const languageOptions: { value: RepositoryLanguage; label: string }[] = [
  { value: "all", label: "Any" },
  { value: "TypeScript", label: "TypeScript" },
  { value: "Rust", label: "Rust" },
  { value: "Go", label: "Go" },
  { value: "Python", label: "Python" },
];

const typeOptions: { value: RepositoryType; label: string }[] = [
  { value: "all", label: "All" },
  { value: "public", label: "Public" },
  { value: "private", label: "Private" },
];

export function RepositoryFilters({
  type,
  language,
  onTypeChange,
  onLanguageChange,
}: RepositoryFiltersProps) {
  return (
    <div className="flex items-center gap-2">
      <Filter className="h-4 w-4 text-muted-foreground" />
      <Select value={type} onValueChange={(v) => onTypeChange(v as RepositoryType)}>
        <SelectTrigger className="w-32 border">
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
          {typeOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={language} onValueChange={(v) => onLanguageChange(v as RepositoryLanguage)}>
        <SelectTrigger className="w-36 border">
          <SelectValue placeholder="Language" />
        </SelectTrigger>
        <SelectContent>
          {languageOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
