"use client";

import * as React from "react";
import Link from "next/link";
import {
  ExternalLink,
  GitFork,
  Star,
  Eye,
  CircleDot,
  GitPullRequest,
  Tags,
  FileText,
  Shield,
  Users,
  Heart,
  Package,
  Activity,
  History,
  AlertTriangle,
  Settings,
  Rocket,
  Scale,
  HandHeart,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { Repository } from "@/lib/repo/RepositoryData";
import { updateRepositoryDetails } from "@/lib/repo/RepositoryData";
import { detectLanguagesFromFiles, LANGUAGE_EXTENSIONS } from "@/lib/languages";

interface FileItem {
  name: string;
  path: string;
  type: "file" | "folder";
  size?: number;
  modifiedAt?: number;
}

interface RepositorySidebarProps {
  repo: Repository;
  owner?: string;
  repoName?: string;
  files?: FileItem[];
}

export function RepositorySidebar({ repo, owner, repoName, files }: RepositorySidebarProps) {
  const [isStarred, setIsStarred] = React.useState(false);
  const [stars, setStars] = React.useState(repo.stars);
  const [forks, setForks] = React.useState(repo.forks);
  const [watchers, setWatchers] = React.useState(repo.watchers);
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);

  const [displayedDescription, setDisplayedDescription] = React.useState(repo.description || "");
  const [displayedWebsite, setDisplayedWebsite] = React.useState(repo.website || "");
  const [displayedTopics, setDisplayedTopics] = React.useState<string[]>(repo.topics || []);

  const [description, setDescription] = React.useState(repo.description || "");
  const [website, setWebsite] = React.useState(repo.website || "");
  const [topics, setTopics] = React.useState(repo.topics?.join(" ") || "");
  const [includeReleases, setIncludeReleases] = React.useState(repo.includeReleases !== false);
  const [includeDeployments, setIncludeDeployments] = React.useState(
    repo.includeDeployments !== false
  );
  const [includePackages, setIncludePackages] = React.useState(repo.includePackages !== false);

  const handleSave = async () => {
    const normalizedWebsite = normalizeUrl(website);
    const topicsArray = topics.split(" ").filter((t) => t.trim() !== "");

    setDisplayedDescription(description);
    setDisplayedWebsite(normalizedWebsite);
    setDisplayedTopics(topicsArray);

    await updateRepositoryDetails(repo.id, {
      description,
      website: normalizedWebsite,
      topics: topicsArray,
      includeReleases,
      includeDeployments,
      includePackages,
    });

    setIsSettingsOpen(false);
  };

  React.useEffect(() => {
    setDisplayedDescription(repo.description || "");
    setDisplayedWebsite(repo.website || "");
    setDisplayedTopics(repo.topics || []);
    setIncludeReleases(repo.includeReleases !== false);
    setIncludeDeployments(repo.includeDeployments !== false);
    setIncludePackages(repo.includePackages !== false);
  }, [repo]);

  const fileNames = files ? files.map((f: FileItem) => f.name) : [];
  const detectedLanguages = fileNames.length > 0 ? detectLanguagesFromFiles(fileNames) : [];

  const languages =
    repo.languages && repo.languages.length > 0
      ? repo.languages
      : detectedLanguages.length > 0
        ? detectedLanguages
        : repo.language
          ? [{ name: repo.language, color: repo.languageColor || "#ededed", percentage: 100 }]
          : [];

  const handleStar = () => {
    setIsStarred(!isStarred);
    setStars(isStarred ? stars - 1 : stars + 1);
  };

  const normalizeUrl = (url: string) => {
    if (!url) return "";
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }
    return `https://${url}`;
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-sm">About</h3>
          <Settings
            className="w-4 h-4 text-muted-foreground cursor-pointer hover:text-foreground"
            onClick={() => {
              setDescription(displayedDescription);
              setWebsite(displayedWebsite);
              setTopics(displayedTopics.join(" "));
              setIsSettingsOpen(true);
            }}
          />
        </div>
        {displayedDescription ? (
          <p className="text-sm text-muted-foreground mb-3">{displayedDescription}</p>
        ) : (
          <p className="text-sm text-muted-italic mb-3">
            No description, website, or topics provided.
          </p>
        )}
        {displayedWebsite && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <ExternalLink className="w-4 h-4" />
            <a href={displayedWebsite} className="hover:text-foreground hover:underline">
              {displayedWebsite.replace(/^https?:\/\//, "")}
            </a>
          </div>
        )}
        {displayedTopics.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {displayedTopics.map((topic) => (
              <Badge key={topic} variant="outline" className="text-xs">
                {topic}
              </Badge>
            ))}
          </div>
        )}
      </div>

      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit repository details</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                placeholder="A brief description of your project"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Website</label>
              <Input
                placeholder="https://giteria.com"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Topics (separate with spaces)</label>
              <Input
                placeholder="git ci-cd devops"
                value={topics}
                onChange={(e) => setTopics(e.target.value)}
              />
            </div>
            <div className="space-y-3 pt-2">
              <label className="text-sm font-medium">Include in the home page</label>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="releases"
                    checked={includeReleases}
                    onCheckedChange={(checked) => setIncludeReleases(checked as boolean)}
                  />
                  <label htmlFor="releases" className="text-sm cursor-pointer">
                    Releases
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="deployments"
                    checked={includeDeployments}
                    onCheckedChange={(checked) => setIncludeDeployments(checked as boolean)}
                  />
                  <label htmlFor="deployments" className="text-sm cursor-pointer">
                    Deployments
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="packages"
                    checked={includePackages}
                    onCheckedChange={(checked) => setIncludePackages(checked as boolean)}
                  />
                  <label htmlFor="packages" className="text-sm cursor-pointer">
                    Packages
                  </label>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setIsSettingsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Save changes</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="border-b border-border pb-4">
        <h3 className="font-semibold text-sm mb-3">Activity</h3>
        <div className="space-y-2 text-sm">
          {repo.readme !== false && (
            <Link
              href={owner && repoName ? `/${owner}/${repoName}` : "#"}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <FileText className="w-4 h-4" />
              <span>Readme</span>
            </Link>
          )}
          {repo.license && (
            <Link
              href={owner && repoName ? `/${owner}/${repoName}/blob/main/LICENSE` : "#"}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <Scale className="w-4 h-4" />
              <span>{repo.license} license</span>
            </Link>
          )}
          {repo.codeOfConduct && (
            <Link
              href={owner && repoName ? `/${owner}/${repoName}/blob/main/CODE_OF_CONDUCT.md` : "#"}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <Shield className="w-4 h-4" />
              <span>Code of conduct</span>
            </Link>
          )}
          {repo.contributing !== false && (
            <Link
              href={owner && repoName ? `/${owner}/${repoName}/blob/main/CONTRIBUTING.md` : "#"}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <HandHeart className="w-4 h-4" />
              <span>Contributing</span>
            </Link>
          )}
          {repo.securityPolicy && (
            <Link
              href={owner && repoName ? `/${owner}/${repoName}/blob/main/SECURITY.md` : "#"}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <Lock className="w-4 h-4" />
              <span>Security policy</span>
            </Link>
          )}
          <div className="flex items-center gap-2 text-muted-foreground">
            <Activity className="w-4 h-4" />
            <span className="hover:text-foreground hover:underline cursor-pointer">Activity</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <CircleDot className="w-4 h-4" />
            <span className="hover:text-foreground hover:underline cursor-pointer">
              Custom properties
            </span>
          </div>
          <div
            className="flex items-center gap-2 text-muted-foreground cursor-pointer hover:text-foreground"
            onClick={handleStar}
          >
            <Star className={`w-4 h-4 ${isStarred ? "fill-yellow-500 text-yellow-500" : ""}`} />
            <span>{stars} stars</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Eye className="w-4 h-4" />
            <span>{watchers} watching</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <GitFork className="w-4 h-4" />
            <span>{forks} forks</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <History className="w-4 h-4" />
            <span className="hover:text-foreground hover:underline cursor-pointer">Audit log</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <AlertTriangle className="w-4 h-4" />
            <span className="hover:text-foreground hover:underline cursor-pointer">
              Report repository
            </span>
          </div>
        </div>
      </div>

      {includeReleases && (
        <div className="border-b border-border pb-4">
          <h3 className="font-semibold text-sm mb-3">Releases</h3>
          <div className="flex items-center gap-2 text-sm">
            <Tags className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">No releases published</span>
          </div>
          <Button variant="ghost" size="sm" className="mt-2 px-0">
            Create a new release
          </Button>
        </div>
      )}

      <div className="border-b border-border pb-4">
        <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
          <Heart className="w-4 h-4 text-red-500" />
          Sponsor this project
        </h3>
        <Button variant="outline" size="sm" className="w-full">
          open_collective.com/skygenesisenterprise
        </Button>
      </div>

      {includePackages && (
        <div className="border-b border-border pb-4">
          <h3 className="font-semibold text-sm mb-3">Packages</h3>
          <div className="flex items-center gap-2 text-sm">
            <Package className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">No packages published</span>
          </div>
          <Button variant="ghost" size="sm" className="mt-2 px-0">
            Publish your first package
          </Button>
        </div>
      )}

      {includeDeployments && (
        <div className="border-b border-border pb-4">
          <h3 className="font-semibold text-sm mb-3">Deployments</h3>
          <div className="flex items-center gap-2 text-sm">
            <Rocket className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">No deployments</span>
          </div>
          <Button variant="ghost" size="sm" className="mt-2 px-0">
            Create a new deployment
          </Button>
        </div>
      )}

      <div className="border-b border-border pb-4">
        <h3 className="font-semibold text-sm mb-3">Contributors</h3>
        <div className="space-y-2">
          {repo.contributors && repo.contributors.length > 0 ? (
            repo.contributors.map((contributor) => (
              <Link
                key={contributor}
                href={`/${contributor}`}
                className="flex items-center gap-2 text-sm hover:text-foreground"
              >
                <Users className="w-4 h-4 text-muted-foreground" />
                <span>{contributor}</span>
              </Link>
            ))
          ) : (
            <div className="flex items-center gap-2 text-sm">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">No contributors</span>
            </div>
          )}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-sm mb-3">Languages</h3>
        <div className="space-y-2">
          {languages.length > 0 ? (
            languages.map((lang) => (
              <div key={lang.name} className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: lang.color }}
                />
                <span className="text-sm flex-1">{lang.name}</span>
                <span className="text-sm text-muted-foreground">{lang.percentage}%</span>
              </div>
            ))
          ) : (
            <span className="text-sm text-muted-foreground">No languages</span>
          )}
        </div>
      </div>
    </div>
  );
}
