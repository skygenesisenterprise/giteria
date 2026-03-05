"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface OrganizationNameInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function OrganizationNameInput({ value, onChange, error }: OrganizationNameInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="name">
        Organization name <span className="text-destructive">*</span>
      </Label>
      <Input
        id="name"
        type="text"
        placeholder="Acme Corporation"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        className="max-w-md"
      />
      <p className="text-sm text-muted-foreground">Example: &quot;Acme&quot;</p>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
