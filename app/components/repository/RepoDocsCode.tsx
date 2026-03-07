"use client";

import * as React from "react";
import { FileText, Shield, HandHeart, Scale, Lock, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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

const DOC_FILE_PATHS: Record<DocFile["type"], string> = {
  readme: "README.md",
  code_of_conduct: "CODE_OF_CONDUCT.md",
  contributing: "CONTRIBUTING.md",
  license: "LICENSE",
  security: "SECURITY.md",
};

export function RepoDocsCode({ owner, repo, branch = "main" }: RepoDocsCodeProps) {
  const [selectedDoc, setSelectedDoc] = React.useState<DocFile["type"]>("readme");
  const [files] = React.useState<DocFile[]>([
    {
      name: "README.md",
      path: "README.md",
      type: "readme",
      content:
        "# Welcome to the project\n\nThis is a sample README file content.\n\n## Installation\n\n```bash\nnpm install\n```\n\n## Usage\n\n```bash\nnpm run dev\n```",
    },
    { name: "CODE_OF_CONDUCT.md", path: "CODE_OF_CONDUCT.md", type: "code_of_conduct" },
    { name: "CONTRIBUTING.md", path: "CONTRIBUTING.md", type: "contributing" },
    { name: "LICENSE", path: "LICENSE", type: "license" },
    { name: "SECURITY.md", path: "SECURITY.md", type: "security" },
  ]);

  const selectedFile = files.find((f) => f.type === selectedDoc);

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-card">
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
        {selectedFile?.content ? (
          <pre className="whitespace-pre-wrap font-mono text-sm bg-muted p-4 rounded-lg overflow-auto">
            {selectedFile.content}
          </pre>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-sm">This file is empty or not available.</p>
          </div>
        )}
      </div>
    </div>
  );
}
