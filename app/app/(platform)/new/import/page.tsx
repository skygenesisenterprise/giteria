"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  BookMarked,
  ArrowLeft,
  Lock,
  Globe,
  AlertCircle,
  Building2,
  User,
  GitBranch,
  ExternalLink,
  Import,
  RefreshCw,
  Check,
  X,
} from "lucide-react";
import { authEngine } from "@/lib/auth/IndexedDBAuthEngine";
import { getOrganizations } from "@/lib/organizations/LocalOrgEngine";
import {
  createRepositoryInStorage,
  getAllRepositories,
} from "@/app/(platform)/[owner]/_components/repositories";
import { getGitHubToken, setGitHubToken } from "@/lib/github-token";

interface Owner {
  type: "user" | "organization";
  slug: string;
  name: string;
}

interface Platform {
  id: string;
  name: string;
  icon: string;
}

interface ExternalRepo {
  name: string;
  fullName: string;
  description: string | null;
  url: string;
  selected: boolean;
  exists: boolean;
}

const PLATFORMS: Platform[] = [
  { id: "github", name: "GitHub", icon: "github" },
  { id: "gitlab", name: "GitLab", icon: "gitlab" },
  { id: "bitbucket", name: "Bitbucket", icon: "bitbucket" },
  { id: "gitea", name: "Gitea", icon: "gitea" },
];

export default function ImportRepoPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialOwner = searchParams.get("owner") || "";

  const [currentUser, setCurrentUser] = React.useState<string | null>(null);
  const [organizations, setOrganizations] = React.useState<{ slug: string; name: string }[]>([]);
  const [owners, setOwners] = React.useState<Owner[]>([]);
  const [selectedOwner, setSelectedOwner] = React.useState<string>(initialOwner);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);
  const [isImporting, setIsImporting] = React.useState(false);
  const [importProgress, setImportProgress] = React.useState("");

  const [importMode, setImportMode] = React.useState<"single" | "organization">("single");

  const [formData, setFormData] = React.useState({
    platform: "",
    cloneUrl: "",
    orgName: "",
    repoName: "",
    description: "",
    visibility: "public" as "public" | "private",
    isPrivate: false,
    includeReadme: true,
    includeIssues: true,
    includeWiki: true,
    includeStars: true,
  });

  const [externalRepos, setExternalRepos] = React.useState<ExternalRepo[]>([]);
  const [isLoadingRepos, setIsLoadingRepos] = React.useState(false);
  const [importedCount, setImportedCount] = React.useState(0);
  const [failedRepos, setFailedRepos] = React.useState<string[]>([]);
  const [githubToken, setGithubToken] = React.useState("");
  const [hasImported, setHasImported] = React.useState(false);
  const existingRepoUrlsRef = React.useRef<Set<string>>(new Set());

  React.useEffect(() => {
    async function loadExistingRepos() {
      const repos = await getAllRepositories();
      const urls = new Set(repos.map((r) => r.mirrorFrom || r.url));
      existingRepoUrlsRef.current = urls;
    }
    loadExistingRepos();
  }, []);

  React.useEffect(() => {
    async function loadToken() {
      const token = await getGitHubToken();
      if (token) {
        setGithubToken(token);
      }
    }
    loadToken();
  }, []);

  const refreshExistingRepos = async () => {
    const repos = await getAllRepositories();
    existingRepoUrlsRef.current = new Set(repos.map((r) => r.mirrorFrom || r.url));
  };

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

  const handleCloneUrlChange = (url: string) => {
    setFormData((prev) => ({ ...prev, cloneUrl: url }));

    const match = url.match(/[:/]([^\/]+)\/([^\/]+?)(?:\.git)?$/);
    if (match) {
      const repoName = match[2]
        .toLowerCase()
        .replace(/[^a-z0-9._-]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
      setFormData((prev) => ({ ...prev, repoName }));
    }
  };

  const fetchOrganizationRepos = async () => {
    if (!formData.orgName.trim()) {
      setError("Organization name is required");
      return;
    }

    setError(null);
    setIsLoadingRepos(true);
    setExternalRepos([]);

    try {
      const githubMatch = formData.orgName.match(/github\.com[/:]?([^\/]+)/);
      let orgName = formData.orgName;

      if (githubMatch) {
        orgName = githubMatch[1];
      }

      const headers: HeadersInit = {
        Accept: "application/vnd.github.v3+json",
      };
      if (githubToken) {
        headers.Authorization = `Bearer ${githubToken}`;
      }

      const allRepos: ExternalRepo[] = [];
      let page = 1;
      const maxPages = 10;

      while (page <= maxPages) {
        const response = await fetch(
          `https://api.github.com/orgs/${orgName}/repos?per_page=100&page=${page}&sort=full_name&type=all`,
          { headers }
        );

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Organization not found");
          }
          if (response.status === 403) {
            throw new Error("API rate limit exceeded. Please try again later.");
          }
          throw new Error("Failed to fetch repositories");
        }

        const data = await response.json();

        if (data.length === 0) {
          break;
        } else {
          const currentExistingUrls = existingRepoUrlsRef.current;
          const repos: ExternalRepo[] = data.map(
            (repo: {
              name: string;
              full_name: string;
              description: string | null;
              html_url: string;
            }) => {
              const repoUrl = repo.html_url;
              const exists = currentExistingUrls.has(repoUrl);
              return {
                name: repo.name,
                fullName: repo.full_name,
                description: repo.description,
                url: repoUrl,
                selected: !exists,
                exists,
              };
            }
          );
          allRepos.push(...repos);

          if (data.length < 100) {
            break;
          }
          page++;
        }
      }

      setExternalRepos(allRepos);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch repositories");
    } finally {
      setIsLoadingRepos(false);
    }
  };

  const toggleRepoSelection = (fullName: string) => {
    setExternalRepos((prev) =>
      prev.map((repo) =>
        repo.fullName === fullName ? { ...repo, selected: !repo.selected } : repo
      )
    );
  };

  const toggleAllRepos = (selected: boolean) => {
    setExternalRepos((prev) =>
      prev.map((repo) => ({ ...repo, selected: repo.exists ? false : selected }))
    );
  };

  const handleImportOrganization = async () => {
    await refreshExistingRepos();

    const selectedRepos = externalRepos.filter((repo) => repo.selected && !repo.exists);

    if (selectedRepos.length === 0) {
      setError("No new repositories to import. All selected repositories already exist.");
      return;
    }

    setIsSubmitting(true);
    setIsImporting(true);
    setError(null);
    setSuccess(null);
    setImportedCount(0);
    setFailedRepos([]);

    let imported = 0;
    const failed: string[] = [];
    const errorDetails: { repo: string; error: string }[] = [];

    for (const repo of selectedRepos) {
      setImportProgress(`Importing ${imported + 1}/${selectedRepos.length}: ${repo.name}...`);

      try {
        const repoName = repo.name
          .toLowerCase()
          .replace(/[^a-z0-9._-]/g, "-")
          .replace(/-+/g, "-")
          .replace(/^-|-$/g, "");

        if (!repoName) {
          throw new Error("Invalid repository name after normalization");
        }

        await createRepositoryInStorage({
          name: repoName,
          fullName: `${selectedOwner}/${repoName}`,
          description: repo.description || undefined,
          visibility: formData.isPrivate ? "private" : "public",
          language: undefined,
          languageColor: undefined,
          owner: selectedOwner,
          readme: formData.includeReadme,
          isMirror: true,
          mirrorFrom: repo.url,
        });

        imported++;
        setImportedCount(imported);
        existingRepoUrlsRef.current.add(repo.url);

        setExternalRepos((prev) =>
          prev.map((r) =>
            r.fullName === repo.fullName ? { ...r, exists: true, selected: false } : r
          )
        );
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : "Unknown error";
        errorDetails.push({ repo: repo.name, error: errorMsg });
        failed.push(repo.name);
        setFailedRepos([...failed]);
        console.error(`Failed to import ${repo.name}:`, err);
      }
    }

    setImportProgress("");
    setSuccess(`Successfully imported ${imported} repository(ies)!`);
    setIsSubmitting(false);
    setIsImporting(false);
    setHasImported(true);

    if (failed.length > 0) {
      const uniqueErrors = [...new Set(errorDetails.map((e) => e.error))];
      setError(
        `Failed to import ${failed.length} repository(ies). Errors: ${uniqueErrors.join(", ")}`
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!selectedOwner || !formData.repoName.trim()) {
      setError("Repository name is required");
      return;
    }

    if (!formData.cloneUrl.trim()) {
      setError("Clone URL is required");
      return;
    }

    const repoName = formData.repoName.trim().toLowerCase();
    if (!/^[a-z0-9._-]+$/.test(repoName)) {
      setError(
        "Repository name can only contain lowercase letters, numbers, hyphens, underscores, and periods"
      );
      return;
    }

    setIsSubmitting(true);
    setIsImporting(true);
    setImportProgress("Connecting to external repository...");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setImportProgress("Fetching repository metadata...");

      const normalizedCloneUrl = formData.cloneUrl.startsWith("http")
        ? formData.cloneUrl
        : `https://${formData.cloneUrl}`;

      await new Promise((resolve) => setTimeout(resolve, 1000));
      setImportProgress("Importing repository data...");

      const repo = await createRepositoryInStorage({
        name: repoName,
        fullName: `${selectedOwner}/${repoName}`,
        description: formData.description.trim() || undefined,
        visibility: formData.isPrivate ? "private" : "public",
        language: undefined,
        languageColor: undefined,
        owner: selectedOwner,
        readme: formData.includeReadme,
        isMirror: true,
        mirrorFrom: normalizedCloneUrl,
        files: formData.cloneUrl.includes("github.com") ? undefined : [],
      });

      setSuccess("Repository imported successfully!");
      setImportProgress("");

      setTimeout(() => {
        router.push(repo.url);
      }, 1500);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to import repository");
      }
    } finally {
      setIsSubmitting(false);
      setIsImporting(false);
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-background flex items-center justify-center py-12">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="text-center">Sign in required</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-4">
              You need to sign in to import a repository.
            </p>
            <Link href="/login">
              <Button>Sign in</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const selectedCount = externalRepos.filter((r) => r.selected).length;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background py-12">
      <div className="max-w-4xl mx-auto px-4">
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
              <Import className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Import a repository</h1>
              <p className="text-muted-foreground">
                Import your existing repository from another platform.
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          <Button
            variant={importMode === "single" ? "default" : "outline"}
            onClick={() => setImportMode("single")}
          >
            Single Repository
          </Button>
          <Button
            variant={importMode === "organization" ? "default" : "outline"}
            onClick={() => setImportMode("organization")}
          >
            Import from Organization
          </Button>
        </div>

        <Card className="mb-6">
          <CardHeader className="py-3">
            <CardTitle className="text-sm">GitHub Settings (optional)</CardTitle>
          </CardHeader>
          <CardContent className="py-3">
            <div className="space-y-2">
              <Label htmlFor="githubToken">Personal Access Token</Label>
              <Input
                id="githubToken"
                type="password"
                placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                value={githubToken}
                onChange={(e) => setGithubToken(e.target.value)}
                onBlur={async () => {
                  if (githubToken) {
                    await setGitHubToken(githubToken);
                  }
                }}
              />
              <p className="text-sm text-muted-foreground">
                Enter a GitHub token to avoid API rate limits
              </p>
            </div>
          </CardContent>
        </Card>

        {importMode === "single" ? (
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Source repository</CardTitle>
                <CardDescription>
                  Enter the URL of the repository you want to import
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="platform">Platform</Label>
                  <Select
                    value={formData.platform}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, platform: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      {PLATFORMS.map((platform) => (
                        <SelectItem key={platform.id} value={platform.id}>
                          <div className="flex items-center gap-2">
                            <span>{platform.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cloneUrl">Clone URL</Label>
                  <Input
                    id="cloneUrl"
                    placeholder="https://github.com/username/repository.git"
                    value={formData.cloneUrl}
                    onChange={(e) => handleCloneUrlChange(e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground">
                    The URL of the external repository to import
                  </p>
                </div>

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
                  <Label htmlFor="repoName">Repository name</Label>
                  <Input
                    id="repoName"
                    placeholder="my-awesome-project"
                    value={formData.repoName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, repoName: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description (optional)</Label>
                  <Input
                    id="description"
                    placeholder="A brief description of your project"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, description: e.target.value }))
                    }
                  />
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
                    </label>
                  </div>
                </div>

                {isImporting && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary" />
                      <span>{importProgress}</span>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="flex items-center gap-2 text-sm text-red-500 bg-red-50 dark:bg-red-900/20 p-3 rounded-md">
                    <AlertCircle className="w-4 h-4" />
                    <span>{error}</span>
                  </div>
                )}

                {success && (
                  <div className="flex items-center gap-2 text-sm text-green-500 bg-green-50 dark:bg-green-900/20 p-3 rounded-md">
                    <BookMarked className="w-4 h-4" />
                    <span>{success}</span>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={
                    isSubmitting || !selectedOwner || !formData.repoName || !formData.cloneUrl
                  }
                >
                  {isSubmitting ? "Importing..." : "Import repository"}
                </Button>
              </CardFooter>
            </Card>
          </form>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Import from Organization</CardTitle>
              <CardDescription>
                Import all repositories from a GitHub organization at once
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
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
                <p className="text-sm text-muted-foreground">
                  Select where to import the repositories
                </p>
              </div>

              {hasImported && (
                <div className="flex justify-end">
                  <Link href={`/${selectedOwner}`}>
                    <Button variant="outline">
                      <Building2 className="w-4 h-4 mr-2" />
                      Go to {selectedOwner}
                    </Button>
                  </Link>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="orgName">Organization name or URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="orgName"
                    placeholder="my-organization or https://github.com/my-organization"
                    value={formData.orgName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, orgName: e.target.value }))}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        fetchOrganizationRepos();
                      }
                    }}
                  />
                  <Button type="button" onClick={fetchOrganizationRepos} disabled={isLoadingRepos}>
                    {isLoadingRepos ? <RefreshCw className="w-4 h-4 animate-spin" /> : "Fetch"}
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Enter a GitHub organization name or URL to fetch all their repositories
                </p>
              </div>

              {externalRepos.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>
                      {selectedCount} of {externalRepos.filter((r) => !r.exists).length} new
                      repositories selected ({externalRepos.filter((r) => r.exists).length} already
                      imported)
                    </Label>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => toggleAllRepos(true)}>
                        Select All
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => toggleAllRepos(false)}>
                        Deselect All
                      </Button>
                    </div>
                  </div>

                  <div className="border border-border rounded-md max-h-80 overflow-y-auto">
                    <table className="w-full">
                      <tbody>
                        {externalRepos.map((repo) => (
                          <tr key={repo.fullName} className="border-b border-border last:border-0">
                            <td className="py-2 px-3">
                              <Checkbox
                                checked={repo.selected}
                                disabled={repo.exists}
                                onCheckedChange={() => toggleRepoSelection(repo.fullName)}
                              />
                            </td>
                            <td className="py-2 px-3">
                              <div className="flex items-center gap-2">
                                <GitBranch className="w-4 h-4 text-muted-foreground" />
                                <span className="font-medium">{repo.name}</span>
                                {repo.exists && (
                                  <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                                    Already imported
                                  </span>
                                )}
                              </div>
                              {repo.description && (
                                <p className="text-sm text-muted-foreground truncate">
                                  {repo.description}
                                </p>
                              )}
                            </td>
                            <td className="py-2 px-3 text-right">
                              <a
                                href={repo.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-foreground"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              <div className="space-y-4 pt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="orgIsPrivate"
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
                    htmlFor="orgIsPrivate"
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
                      All imported repositories will be private
                    </p>
                  </label>
                </div>
              </div>

              {isImporting && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary" />
                    <span>{importProgress}</span>
                  </div>
                  {importedCount > 0 && (
                    <div className="text-sm text-green-500">
                      Imported: {importedCount} / {externalRepos.filter((r) => r.selected).length}
                    </div>
                  )}
                </div>
              )}

              {error && (
                <div className="flex items-center gap-2 text-sm text-red-500 bg-red-50 dark:bg-red-900/20 p-3 rounded-md">
                  <AlertCircle className="w-4 h-4" />
                  <span>{error}</span>
                </div>
              )}

              {success && (
                <div className="flex items-center gap-2 text-sm text-green-500 bg-green-50 dark:bg-green-900/20 p-3 rounded-md">
                  <Check className="w-4 h-4" />
                  <span>{success}</span>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button
                onClick={handleImportOrganization}
                disabled={isSubmitting || externalRepos.length === 0 || selectedCount === 0}
              >
                {isSubmitting ? "Importing..." : `Import ${selectedCount} Repository(ies)`}
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}
