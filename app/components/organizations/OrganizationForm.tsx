"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { OrganizationNameInput } from "./OrganizationNameInput";
import { OrganizationSlugInput } from "./OrganizationSlugInput";
import { OrganizationVisibilitySelect } from "./OrganizationVisibilitySelect";
import { generateSlug, isValidSlug } from "@/lib/organizations/slug";
import { createOrganization, type CreateOrganizationInput } from "@/lib/organizations/api";

interface FormData {
  name: string;
  slug: string;
  description: string;
  visibility: "public" | "private";
}

interface FormErrors {
  name?: string;
  slug?: string;
}

export function OrganizationForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [formData, setFormData] = React.useState<FormData>({
    name: "",
    slug: "",
    description: "",
    visibility: "public",
  });

  const suggestedSlug = React.useMemo(() => {
    if (formData.name && !formData.slug) {
      return generateSlug(formData.name);
    }
    return "";
  }, [formData.name, formData.slug]);

  const handleNameChange = (name: string) => {
    setFormData((prev) => ({ ...prev, name }));
    if (errors.name) {
      setErrors((prev) => ({ ...prev, name: undefined }));
    }
  };

  const handleSlugChange = (slug: string) => {
    setFormData((prev) => ({ ...prev, slug }));
    if (errors.slug) {
      setErrors((prev) => ({ ...prev, slug: undefined }));
    }
  };

  const handleDescriptionChange = (description: string) => {
    setFormData((prev) => ({ ...prev, description }));
  };

  const handleVisibilityChange = (visibility: "public" | "private") => {
    setFormData((prev) => ({ ...prev, visibility }));
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Organization name is required";
    }

    if (!formData.slug.trim()) {
      newErrors.slug = "Organization handle is required";
    } else if (!isValidSlug(formData.slug)) {
      newErrors.slug = "Handle can only contain lowercase letters, numbers, and hyphens";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const input: CreateOrganizationInput = {
        name: formData.name.trim(),
        slug: formData.slug.trim(),
        description: formData.description.trim() || undefined,
        visibility: formData.visibility,
      };

      const org = await createOrganization(input);
      router.push(`/${org.slug}`);
    } catch (error) {
      if (error instanceof Error) {
        setErrors({ slug: error.message });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Create a new organization</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <OrganizationNameInput
            value={formData.name}
            onChange={handleNameChange}
            error={errors.name}
          />

          <OrganizationSlugInput
            value={formData.slug}
            onChange={handleSlugChange}
            error={errors.slug}
            suggestedSlug={suggestedSlug}
          />

          <div className="space-y-2">
            <Label htmlFor="description">Description (optional)</Label>
            <Textarea
              id="description"
              placeholder="A brief description of your organization"
              value={formData.description}
              onChange={(e) => handleDescriptionChange(e.target.value)}
              rows={3}
              className="max-w-md"
            />
          </div>

          <OrganizationVisibilitySelect
            value={formData.visibility}
            onChange={handleVisibilityChange}
          />
        </CardContent>
        <CardFooter className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create organization"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
