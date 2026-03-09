"use client";

import * as React from "react";
import { FileText, Shield, HandHeart, Scale, Lock, Pencil, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getGitHubToken } from "@/lib/github-token";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

export interface DocFile {
  name: string;
  path: string;
  type: "readme" | "code_of_conduct" | "contributing" | "license" | "security";
  content?: string;
}

interface RepoDocsCodeProps {
  owner: string;
  repo: string;
  branch?: string;
  mirrorFrom?: string;
}

const DOC_CONFIG: Array<{
  type: DocFile["type"];
  label: string;
  icon: React.ElementType;
}> = [
  { type: "readme", label: "README", icon: FileText },
  { type: "code_of_conduct", label: "Code of Conduct", icon: Shield },
  { type: "contributing", label: "Contributing", icon: HandHeart },
  { type: "license", label: "License", icon: Scale },
  { type: "security", label: "Security", icon: Lock },
];

const DOC_FILE_PATHS: Record<DocFile["type"], string[]> = {
  readme: ["README.md", "readme.md", "Readme.md"],
  code_of_conduct: [
    "CODE_OF_CONDUCT.md",
    "CODE_OF_CONDUCT.md",
    "code_of_conduct.md",
    ".github/CODE_OF_CONDUCT.md",
  ],
  contributing: [
    "CONTRIBUTING.md",
    "contributing.md",
    "Contributing.md",
    "CONTRIBUTING",
    "contributing",
    ".github/CONTRIBUTING.md",
  ],
  license: ["LICENSE", "LICENSE.md", "license.md", "License", ".github/LICENSE"],
  security: ["SECURITY.md", "security.md", "Security.md", ".github/SECURITY.md"],
};

export function RepoDocsCode({ owner, repo, branch = "main", mirrorFrom }: RepoDocsCodeProps) {
  const [selectedDoc, setSelectedDoc] = React.useState<DocFile["type"]>("readme");
  const [files, setFiles] = React.useState<DocFile[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    async function fetchDocs() {
      if (!mirrorFrom) return;

      setIsLoading(true);
      try {
        const githubMatch = mirrorFrom.match(/github\.com[/:]([^\/]+)\/([^\/]+)/);
        if (!githubMatch) return;

        const [, mirrorOwner, mirrorRepo] = githubMatch;
        const repoName = mirrorRepo.replace(/\.git$/, "");

        const token = await getGitHubToken();
        const headers: HeadersInit = {
          Accept: "application/vnd.github.v3+json",
        };
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }

        const docs: DocFile[] = [];

        for (const docType of DOC_CONFIG) {
          const filePaths = DOC_FILE_PATHS[docType.type];
          let foundDoc: { name: string; path: string; content?: string } | null = null;

          for (const filePath of filePaths) {
            try {
              const response = await fetch(
                `https://api.github.com/repos/${mirrorOwner}/${repoName}/contents/${filePath}`,
                { headers }
              );

              if (response.ok) {
                const data = await response.json();
                const decodedContent = data.content
                  ? new TextDecoder().decode(
                      Uint8Array.from(atob(data.content), (c) => c.charCodeAt(0))
                    )
                  : undefined;
                foundDoc = {
                  name: data.name,
                  path: data.path,
                  content: decodedContent,
                };
                break;
              }
            } catch {
              continue;
            }
          }

          if (foundDoc) {
            docs.push({
              name: foundDoc.name,
              path: foundDoc.path,
              type: docType.type,
              content: foundDoc.content,
            });
          } else {
            docs.push({
              name: filePaths[0],
              path: filePaths[0],
              type: docType.type,
            });
          }
        }

        setFiles(docs);
      } catch (err) {
        console.error("Failed to fetch docs:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchDocs();
  }, [mirrorFrom]);

  const selectedFile = files.find((f) => f.type === selectedDoc);

  return (
    <div
      className="border border-border rounded-lg overflow-hidden bg-card"
      style={{
        fontFamily:
          '"Mona Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
      }}
    >
      <div className="border-b border-border bg-muted/20">
        <div className="flex items-center justify-between gap-1 px-3 py-2">
          <div className="flex items-center gap-1 overflow-x-auto">
            {DOC_CONFIG.map((doc) => {
              const Icon = doc.icon;
              const isSelected = selectedDoc === doc.type;
              return (
                <button
                  key={doc.type}
                  onClick={() => setSelectedDoc(doc.type)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 text-sm rounded-md transition-colors whitespace-nowrap",
                    isSelected
                      ? "bg-background shadow-sm text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {doc.label}
                </button>
              );
            })}
          </div>
          <Button variant="ghost" size="sm" className="shrink-0" title="Edit">
            <Pencil className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="p-4">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-foreground" />
            <span className="ml-3 text-muted-foreground">Loading documentation...</span>
          </div>
        ) : files.length === 0 && !mirrorFrom ? (
          <div className="text-center py-12">
            <p className="text-sm text-muted-foreground mb-4">No documentation available.</p>
            <Button variant="outline" size="sm">
              <FileText className="w-4 h-4 mr-2" />
              Add a README
            </Button>
          </div>
        ) : files.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-sm">No documentation available.</p>
          </div>
        ) : selectedFile?.content ? (
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} skipHtml={false}>
              {selectedFile.content}
            </ReactMarkdown>
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-sm">This file is empty or not available.</p>
          </div>
        )}
      </div>
    </div>
  );
}
