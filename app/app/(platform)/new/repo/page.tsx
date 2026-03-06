"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { BookMarked, ArrowLeft, Lock, Globe, AlertCircle, Building2, User } from "lucide-react";
import { authEngine } from "@/lib/auth/IndexedDBAuthEngine";
import { getOrganizations } from "@/lib/organizations/LocalOrgEngine";
import { createRepositoryInStorage } from "@/app/(platform)/[owner]/_components/repositories";

interface Owner {
  type: "user" | "organization";
  slug: string;
  name: string;
}

export default function NewRepoPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialOwner = searchParams.get("owner") || "";

  const [currentUser, setCurrentUser] = React.useState<string | null>(null);
  const [organizations, setOrganizations] = React.useState<{ slug: string; name: string }[]>([]);
  const [owners, setOwners] = React.useState<Owner[]>([]);
  const [selectedOwner, setSelectedOwner] = React.useState<string>(initialOwner);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const [formData, setFormData] = React.useState({
    name: "",
    description: "",
    visibility: "public" as "public" | "private",
    isPrivate: false,
    isTemplate: false,
    language: "",
  });

  React.useEffect(() => {
    async function loadData() {
      try {
        const user = await authEngine.getCurrentUser();
        setCurrentUser(user?.username || null);

        const orgs = await getOrganizations();
        setOrganizations(orgs);

        const ownerList: Owner[] = [];
        if (user?.username) {
          ownerList.push({
            type: "user",
            slug: user.username,
            name: user.username,
          });
        }
        orgs.forEach((org) => {
          ownerList.push({
            type: "organization",
            slug: org.slug,
            name: org.name,
          });
        });
        setOwners(ownerList);

        if (initialOwner && ownerList.some((o) => o.slug === initialOwner)) {
          setSelectedOwner(initialOwner);
        } else if (ownerList.length > 0) {
          setSelectedOwner(ownerList[0].slug);
        }
      } catch (err) {
        console.error("Failed to load data:", err);
      }
    }
    loadData();
  }, [initialOwner]);

  const handleNameChange = (name: string) => {
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9._-]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
    setFormData((prev) => ({ ...prev, name }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!selectedOwner || !formData.name.trim()) {
      setError("Repository name is required");
      return;
    }

    const repoName = formData.name.trim().toLowerCase();
    if (!/^[a-z0-9._-]+$/.test(repoName)) {
      setError(
        "Repository name can only contain lowercase letters, numbers, hyphens, underscores, and periods"
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const repo = await createRepositoryInStorage({
        name: repoName,
        fullName: `${selectedOwner}/${repoName}`,
        description: formData.description.trim() || undefined,
        visibility: formData.isPrivate ? "private" : "public",
        language: formData.language || undefined,
        languageColor: undefined,
        owner: selectedOwner,
      });

      router.push(repo.url);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to create repository");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const languageOptions = [
    { value: "typescript", label: "TypeScript" },
    { value: "javascript", label: "JavaScript" },
    { value: "python", label: "Python" },
    { value: "go", label: "Go" },
    { value: "rust", label: "Rust" },
    { value: "java", label: "Java" },
    { value: "csharp", label: "C#" },
    { value: "cpp", label: "C++" },
    { value: "ruby", label: "Ruby" },
    { value: "php", label: "PHP" },
    { value: "swift", label: "Swift" },
    { value: "kotlin", label: "Kotlin" },
  ];

  if (!currentUser) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-background flex items-center justify-center py-12">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="text-center">Sign in required</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-4">
              You need to sign in to create a repository.
            </p>
            <Link href="/login">
              <Button>Sign in</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to home
          </Link>
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
              <BookMarked className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Create a new repository</h1>
              <p className="text-muted-foreground">
                A repository contains all project files, including revision history.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Repository details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {owners.length > 1 && (
                <div className="space-y-2">
                  <Label htmlFor="owner">Owner</Label>
                  <Select value={selectedOwner} onValueChange={setSelectedOwner}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select owner" />
                    </SelectTrigger>
                    <SelectContent>
                      {owners.map((owner) => (
                        <SelectItem key={owner.slug} value={owner.slug}>
                          <div className="flex items-center gap-2">
                            {owner.type === "organization" ? (
                              <Building2 className="w-4 h-4 text-muted-foreground" />
                            ) : (
                              <User className="w-4 h-4 text-muted-foreground" />
                            )}
                            <span>{owner.name}</span>
                            <span className="text-muted-foreground text-sm">({owner.slug})</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="name">Repository name</Label>
                <Input
                  id="name"
                  placeholder="my-awesome-project"
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  required
                />
                <p className="text-sm text-muted-foreground">
                  Great repository names are short and memorable.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (optional)</Label>
                <Textarea
                  id="description"
                  placeholder="A brief description of your project"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, description: e.target.value }))
                  }
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">Primary language (optional)</Label>
                <Select
                  value={formData.language}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, language: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languageOptions.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value}>
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isPrivate"
                    checked={formData.isPrivate}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({
                        ...prev,
                        isPrivate: checked === true,
                        visibility: checked === true ? "private" : "public",
                      }))
                    }
                  />
                  <label
                    htmlFor="isPrivate"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    <div className="flex items-center gap-2">
                      {formData.isPrivate ? (
                        <Lock className="w-4 h-4" />
                      ) : (
                        <Globe className="w-4 h-4" />
                      )}
                      <span>Private</span>
                    </div>
                    <p className="text-muted-foreground font-normal">
                      You choose who can see and commit to this repository.
                    </p>
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isTemplate"
                    checked={formData.isTemplate}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({ ...prev, isTemplate: checked === true }))
                    }
                  />
                  <label
                    htmlFor="isTemplate"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    <span>Template</span>
                    <p className="text-muted-foreground font-normal">
                      Select this to make this repository a template.
                    </p>
                  </label>
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 text-sm text-red-500 bg-red-50 dark:bg-red-900/20 p-3 rounded-md">
                  <AlertCircle className="w-4 h-4" />
                  <span>{error}</span>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting || !selectedOwner || !formData.name}>
                {isSubmitting ? "Creating..." : "Create repository"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  );
}
