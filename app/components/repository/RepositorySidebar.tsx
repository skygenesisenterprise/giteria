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
import { getGitHubToken } from "@/lib/github-token";

interface FundingPlatform {
  name: string;
  url: string;
  label: string;
}

interface GithubFunding {
  patreon?: string;
  open_collective?: string;
  ko_fi?: string;
  tidelift?: string;
  community_bridge?: string;
  liberapay?: string;
  issuehunt?: string;
  otechie?: string;
  lfx_crowdfunding?: string;
  custom?: string[];
}

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

function parseFundingYaml(content: string): FundingPlatform[] {
  const platforms: FundingPlatform[] = [];
  const lines = content.split("\n");
  let currentKey = "";
  let currentValue = "";

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine || trimmedLine.startsWith("#")) continue;

    const colonIndex = trimmedLine.indexOf(":");
    if (colonIndex > -1) {
      if (currentKey) {
        if (currentValue) {
          platforms.push(createFundingPlatform(currentKey.trim(), currentValue.trim()));
        }
      }
      currentKey = trimmedLine.substring(0, colonIndex).trim();
      currentValue = trimmedLine.substring(colonIndex + 1).trim();
    } else if (trimmedLine.startsWith("-") && currentKey === "custom") {
      const value = trimmedLine.substring(1).trim();
      if (value) {
        platforms.push({ name: "custom", url: value, label: value });
      }
    }
  }

  if (currentKey && currentValue) {
    platforms.push(createFundingPlatform(currentKey.trim(), currentValue.trim()));
  }

  return platforms;
}

function createFundingPlatform(key: string, value: string): FundingPlatform {
  const platformConfigs: Record<string, { urlTemplate: (v: string) => string; label: string }> = {
    patreon: { urlTemplate: (v) => `https://www.patreon.com/${v}`, label: "Patreon" },
    open_collective: {
      urlTemplate: (v) => `https://opencollective.com/${v}`,
      label: "Open Collective",
    },
    ko_fi: { urlTemplate: (v) => `https://ko-fi.com/${v}`, label: "Ko-fi" },
    tidelift: { urlTemplate: (v) => `https://tidelift.com/funding/${v}`, label: "Tidelift" },
    community_bridge: {
      urlTemplate: (v) => `https://communitybridge.org/${v}`,
      label: "Community Bridge",
    },
    liberapay: { urlTemplate: (v) => `https://liberapay.com/${v}`, label: "Liberapay" },
    issuehunt: { urlTemplate: (v) => `https://issuehunt.io/${v}`, label: "IssueHunt" },
    otechie: { urlTemplate: (v) => `https://otechie.com/${v}`, label: "Otechie" },
    lfx_crowdfunding: {
      urlTemplate: (v) => `https://crowdfunding.lfx.linuxfoundation.org/${v}`,
      label: "LFX Crowdfunding",
    },
  };

  const config = platformConfigs[key];
  if (config && value) {
    return { name: key, url: config.urlTemplate(value), label: config.label };
  }

  return { name: key, url: value, label: value };
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
  const [githubMeta, setGithubMeta] = React.useState<{
    description?: string;
    topics?: string[];
    stargazers_count?: number;
    forks_count?: number;
    watchers_count?: number;
    license?: { name: string };
    homepage?: string;
    hasWiki?: boolean;
  } | null>(null);
  const [githubFiles, setGithubFiles] = React.useState<string[]>([]);
  const [githubLanguages, setGithubLanguages] = React.useState<Record<string, number>>({});
  const [githubContributors, setGithubContributors] = React.useState<
    { login: string; avatar_url: string; contributions: number }[]
  >([]);
  const [githubReleases, setGithubReleases] = React.useState<
    {
      id: number;
      name: string;
      tag_name: string;
      published_at: string;
      html_url: string;
      author: { login: string; avatar_url: string };
    }[]
  >([]);
  const [githubPackages, setGithubPackages] = React.useState<
    { id: number; name: string; package_type: string; html_url: string; owner: { login: string } }[]
  >([]);
  const [githubFunding, setGithubFunding] = React.useState<FundingPlatform[]>([]);

  React.useEffect(() => {
    async function fetchGithubMeta() {
      if (!repo.mirrorFrom) return;

      const githubMatch = repo.mirrorFrom.match(/github\.com[/:]([^\/]+)\/([^\/]+)/);
      if (!githubMatch) return;

      const [, owner, repoName] = githubMatch;
      const name = repoName.replace(/\.git$/, "");

      try {
        const token = await getGitHubToken();
        const headers: HeadersInit = {
          Accept: "application/vnd.github.v3+json",
        };
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }

        const [
          metaResponse,
          languagesResponse,
          contributorsResponse,
          contentsResponse,
          releasesResponse,
          packagesResponse,
          fundingResponse,
        ] = await Promise.all([
          fetch(`https://api.github.com/repos/${owner}/${name}`, { headers }),
          fetch(`https://api.github.com/repos/${owner}/${name}/languages`, { headers }),
          fetch(`https://api.github.com/repos/${owner}/${name}/contributors?per_page=10`, {
            headers,
          }),
          fetch(`https://api.github.com/repos/${owner}/${name}/contents`, { headers }),
          fetch(`https://api.github.com/repos/${owner}/${name}/releases?per_page=5`, { headers }),
          fetch(`https://api.github.com/users/${owner}/packages?per_page=5`, { headers }),
          fetch(`https://api.github.com/repos/${owner}/${name}/contents/.github/FUNDING.yml`, {
            headers,
          }),
        ]);

        if (metaResponse.ok) {
          const metaData = await metaResponse.json();
          setGithubMeta(metaData);
        }

        if (languagesResponse.ok) {
          const languagesData = await languagesResponse.json();
          setGithubLanguages(languagesData);
        }

        if (contributorsResponse.ok) {
          const contributorsData = await contributorsResponse.json();
          setGithubContributors(contributorsData);
        }

        if (contentsResponse.ok) {
          const contentsData = await contentsResponse.json();
          if (Array.isArray(contentsData)) {
            setGithubFiles(contentsData.map((f: { name: string }) => f.name.toLowerCase()));
          }
        }

        if (releasesResponse.ok) {
          const releasesData = await releasesResponse.json();
          setGithubReleases(releasesData);
        }

        if (packagesResponse.ok) {
          const packagesData = await packagesResponse.json();
          setGithubPackages(packagesData);
        }

        if (fundingResponse.ok) {
          const fundingData = await fundingResponse.json();
          if (fundingData.content) {
            const decodedContent = atob(fundingData.content);
            const funding = parseFundingYaml(decodedContent);
            setGithubFunding(funding);
          }
        }
      } catch (err) {
        console.error("Failed to fetch GitHub data:", err);
      }
    }

    fetchGithubMeta();
  }, [repo.mirrorFrom, includeReleases, includePackages]);

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

  React.useEffect(() => {
    if (githubMeta) {
      if (githubMeta.description && !displayedDescription) {
        setDisplayedDescription(githubMeta.description);
      }
      if (githubMeta.homepage && !displayedWebsite) {
        setDisplayedWebsite(githubMeta.homepage);
      }
      if (githubMeta.topics?.length && displayedTopics.length === 0) {
        setDisplayedTopics(githubMeta.topics);
      }
    }
  }, [githubMeta]);

  const fileNames = files ? files.map((f: FileItem) => f.name) : [];
  const detectedLanguages = fileNames.length > 0 ? detectLanguagesFromFiles(fileNames) : [];

  const languages = React.useMemo(() => {
    if (githubLanguages && Object.keys(githubLanguages).length > 0) {
      const totalBytes = Object.values(githubLanguages).reduce((sum, bytes) => sum + bytes, 0);
      return Object.entries(githubLanguages)
        .map(([langName, bytes]) => {
          const langInfo = LANGUAGE_EXTENSIONS[langName.toLowerCase()];
          return {
            name: langInfo?.name || langName,
            color: langInfo?.color || "#ededed",
            percentage: Math.round((bytes / totalBytes) * 100),
          };
        })
        .sort((a, b) => b.percentage - a.percentage);
    }

    if (repo.languages && repo.languages.length > 0) {
      return repo.languages;
    }

    if (detectedLanguages.length > 0) {
      return detectedLanguages;
    }

    if (repo.language) {
      return [{ name: repo.language, color: repo.languageColor || "#ededed", percentage: 100 }];
    }

    return [];
  }, [githubLanguages, repo.languages, detectedLanguages, repo.language, repo.languageColor]);

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

  const effectiveDescription = githubMeta?.description || displayedDescription;
  const effectiveTopics = githubMeta?.topics?.length ? githubMeta.topics : displayedTopics;
  const effectiveStars =
    githubMeta?.stargazers_count !== undefined ? githubMeta.stargazers_count : stars;
  const effectiveForks = githubMeta?.forks_count !== undefined ? githubMeta.forks_count : forks;
  const effectiveWatchers =
    githubMeta?.watchers_count !== undefined ? githubMeta.watchers_count : watchers;
  const effectiveLicense = githubMeta?.license?.name || repo.license;
  const effectiveWebsite = githubMeta?.homepage || displayedWebsite;
  const hasCodeOfConduct = githubFiles.some(
    (f) => f === "code_of_conduct.md" || f === "code_of_conduct"
  );
  const hasSecurityPolicy = githubFiles.some((f) => f === "security.md" || f === "security");

  return (
    <div
      className="space-y-6"
      style={{
        fontFamily:
          '"Mona Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
      }}
    >
      <div className="border-b border-border pb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-sm">About</h3>
          <Settings
            className="w-4 h-4 text-muted-foreground cursor-pointer hover:text-foreground"
            onClick={() => {
              setDescription(effectiveDescription);
              setWebsite(effectiveWebsite);
              setTopics(effectiveTopics.join(" "));
              setIsSettingsOpen(true);
            }}
          />
        </div>
        {effectiveDescription ? (
          <p className="text-sm text-muted-foreground mb-3">{effectiveDescription}</p>
        ) : (
          <p className="text-sm text-muted-italic mb-3">
            No description, website, or topics provided.
          </p>
        )}
        {effectiveWebsite && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <ExternalLink className="w-4 h-4" />
            <a
              href={normalizeUrl(effectiveWebsite)}
              className="hover:text-foreground hover:underline"
            >
              {effectiveWebsite.replace(/^https?:\/\//, "")}
            </a>
          </div>
        )}
        {effectiveTopics.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {effectiveTopics.map((topic) => (
              <Badge key={topic} variant="outline" className="text-xs">
                {topic}
              </Badge>
            ))}
          </div>
        )}

        <div className="space-y-2 text-sm pt-3">
          {repo.readme !== false && (
            <Link
              href={owner && repoName ? `/${owner}/${repoName}` : "#"}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <FileText className="w-4 h-4" />
              <span>Readme</span>
            </Link>
          )}
          {effectiveLicense && (
            <Link
              href={owner && repoName ? `/${owner}/${repoName}/blob/main/LICENSE` : "#"}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <Scale className="w-4 h-4" />
              <span>{effectiveLicense}</span>
            </Link>
          )}
          {(hasCodeOfConduct || repo.codeOfConduct) && (
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
          {(hasSecurityPolicy || repo.securityPolicy) && (
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
            <span>{effectiveStars} stars</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Eye className="w-4 h-4" />
            <span>{effectiveWatchers} watching</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <GitFork className="w-4 h-4" />
            <span>{effectiveForks} forks</span>
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
          {githubReleases.length > 0 ? (
            <div className="space-y-2">
              {githubReleases.map((release) => (
                <Link
                  key={release.id}
                  href={release.html_url}
                  target="_blank"
                  className="flex items-center gap-2 text-sm hover:text-foreground"
                >
                  <Tags className="w-4 h-4 text-muted-foreground" />
                  <span className="truncate">{release.name || release.tag_name}</span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-2 text-sm">
              <Tags className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">No releases published</span>
            </div>
          )}
          <Button variant="ghost" size="sm" className="mt-2 px-0">
            Create a new release
          </Button>
        </div>
      )}

      {githubFunding.length > 0 ? (
        <div className="border-b border-border pb-4">
          <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
            <Heart className="w-4 h-4 text-red-500" />
            Sponsor this project
          </h3>
          <div className="space-y-2">
            {githubFunding
              .filter((funding) => funding.name === "open_collective")
              .map((funding, index) => (
                <Button key={index} variant="outline" size="sm" className="w-full" asChild>
                  <a href={funding.url} target="_blank" rel="noopener noreferrer">
                    {funding.label}
                  </a>
                </Button>
              ))}
          </div>
        </div>
      ) : (
        <div className="border-b border-border pb-4">
          <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
            <Heart className="w-4 h-4 text-red-500" />
            Sponsor this project
          </h3>
          <Button variant="outline" size="sm" className="w-full" disabled>
            No sponsor links available
          </Button>
        </div>
      )}

      {includePackages && (
        <div className="border-b border-border pb-4">
          <h3 className="font-semibold text-sm mb-3">Packages</h3>
          {githubPackages.length > 0 ? (
            <div className="space-y-2">
              {githubPackages.map((pkg) => (
                <Link
                  key={pkg.id}
                  href={pkg.html_url}
                  target="_blank"
                  className="flex items-center gap-2 text-sm hover:text-foreground"
                >
                  <Package className="w-4 h-4 text-muted-foreground" />
                  <span className="truncate">{pkg.name}</span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-2 text-sm">
              <Package className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">No packages published</span>
            </div>
          )}
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
          {githubContributors.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {githubContributors.map((contributor) => (
                <Link
                  key={contributor.login}
                  href={`/${contributor.login}`}
                  className="flex items-center gap-2 text-sm hover:text-foreground"
                  title={`${contributor.contributions} contributions`}
                >
                  <img
                    src={contributor.avatar_url}
                    alt={contributor.login}
                    className="w-6 h-6 rounded-full"
                  />
                  <span>{contributor.login}</span>
                </Link>
              ))}
            </div>
          ) : repo.contributors && repo.contributors.length > 0 ? (
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
