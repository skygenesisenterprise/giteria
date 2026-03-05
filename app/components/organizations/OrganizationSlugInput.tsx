"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { checkSlugAvailability } from "@/lib/organizations/api";

interface OrganizationSlugInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  suggestedSlug?: string;
}

export function OrganizationSlugInput({
  value,
  onChange,
  error,
  suggestedSlug,
}: OrganizationSlugInputProps) {
  const [availability, setAvailability] = React.useState<boolean | null>(null);
  const [isChecking, setIsChecking] = React.useState(false);

  React.useEffect(() => {
    if (!value) {
      setAvailability(null);
      return;
    }

    const timer = setTimeout(async () => {
      setIsChecking(true);
      try {
        const isAvailable = await checkSlugAvailability(value);
        setAvailability(isAvailable);
      } catch {
        setAvailability(null);
      } finally {
        setIsChecking(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className="space-y-2">
      <Label htmlFor="slug">
        Organization handle <span className="text-destructive">*</span>
      </Label>
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground text-sm">giteria.com/</span>
        <div className="relative flex-1 max-w-75">
          <Input
            id="slug"
            type="text"
            placeholder="acme"
            value={value}
            onChange={(e) => onChange(e.target.value.toLowerCase())}
            aria-invalid={!!error || availability === false}
            className={cn(
              "pr-10",
              availability === true && "border-green-500 focus-visible:ring-green-500/20",
              availability === false && "border-destructive focus-visible:ring-destructive/20"
            )}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {isChecking ? (
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            ) : availability === true ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : availability === false ? (
              <X className="h-4 w-4 text-destructive" />
            ) : null}
          </div>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">
        Example: <code className="bg-muted px-1 rounded">acme</code>
      </p>
      {error && <p className="text-sm text-destructive">{error}</p>}
      {suggestedSlug && value !== suggestedSlug && !error && (
        <p className="text-sm">
          Suggested:{" "}
          <button
            type="button"
            className="text-primary hover:underline"
            onClick={() => onChange(suggestedSlug)}
          >
            {suggestedSlug}
          </button>
        </p>
      )}
      {availability === true && !error && (
        <p className="text-sm text-green-600 dark:text-green-400">
          <Check className="inline h-3 w-3 mr-1" />
          Available
        </p>
      )}
      {availability === false && (
        <p className="text-sm text-destructive">
          <X className="inline h-3 w-3 mr-1" />
          Already taken
        </p>
      )}
    </div>
  );
}
