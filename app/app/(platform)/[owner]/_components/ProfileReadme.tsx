"use client";

import * as React from "react";
import Link from "next/link";
import { Edit3 } from "lucide-react";

interface ProfileReadmeProps {
  username: string;
}

const DEMO_README = `
### 👋 Hello, I'm **Liam Von Astoria**

🎓 **Founder & CEO** at **Sky Genesis Enterprise**

---

### 🛠️ What I Do

- Building **enterprise-grade software solutions**
- Passionate about **cybersecurity & innovation**
- Creating **disruptive digital products**

---

### 🏢 Organizations

- [@skygenesisenterprise](https://github.com/skygenesisenterprise)
- [@sciencesproject](https://github.com/sciencesproject)

---

### 📫 Connect With Me

- 🌐 Website: [liamvonastoria.net](https://liamvonastoria.net)
- 📧 Email: [hello@liamvonastoria.net](mailto:hello@liamvonastoria.net)
- 🐦 Twitter: [@liamvonastoria](https://twitter.com/liamvonastoria)

---

### 🛠️ Tech Stack

\`\`\`typescript
const tech = {
  languages: ["TypeScript", "Go", "Rust", "Python"],
  frameworks: ["Next.js", "React", "Vue"],
  tools: ["Docker", "Kubernetes", "Git"]
};
\`\`\`

---

### 📊 GitHub Stats

![GitHub Stats](https://github-readme-stats.vercel.app/api?username=liamvonastoria&show_icons=true&theme=transparent&hide_border=true)

---

*Last updated: ${new Date().toLocaleDateString()}*
`;

function parseMarkdown(text: string): React.ReactNode[] {
  const lines = text.trim().split("\n");
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeContent: string[] = [];
  let codeLanguage = "";
  let inList = false;
  let listItems: string[] = [];
  let listType: "ul" | "ol" = "ul";

  const processInline = (content: string): React.ReactNode => {
    let result = content;

    result = result.replace(
      /\*\*(.+?)\*\*/g,
      (_, text) => `<strong class="font-semibold text-foreground">${text}</strong>`
    );
    result = result.replace(/\*(.+?)\*/g, (_, text) => `<em class="italic">${text}</em>`);
    result = result.replace(/~~(.+?)~~/g, (_, text) => `<del class="line-through">${text}</del>`);
    result = result.replace(
      /`([^`]+)`/g,
      (_, code) =>
        `<code class="px-1.5 py-0.5 bg-muted/50 rounded text-xs font-mono text-primary">${code}</code>`
    );
    result = result.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, text, url) => {
      if (url.startsWith("mailto:")) {
        return `<a href="${url}" class="text-[#2f81f7] hover:underline">${text}</a>`;
      }
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-[#2f81f7] hover:underline">${text}</a>`;
    });
    result = result.replace(
      /@(\w+)/g,
      (_, username) =>
        `<a href="/${username}" class="text-[#2f81f7] hover:underline">@${username}</a>`
    );

    return <span dangerouslySetInnerHTML={{ __html: result }} />;
  };

  const flushList = () => {
    if (listItems.length > 0) {
      if (listType === "ul") {
        elements.push(
          <ul key={`ul-${elements.length}`} className="list-disc list-inside space-y-1 ml-4">
            {listItems.map((item, i) => (
              <li key={i} className="text-muted-foreground">
                {processInline(item)}
              </li>
            ))}
          </ul>
        );
      } else {
        elements.push(
          <ol key={`ol-${elements.length}`} className="list-decimal list-inside space-y-1 ml-4">
            {listItems.map((item, i) => (
              <li key={i} className="text-muted-foreground">
                {processInline(item)}
              </li>
            ))}
          </ol>
        );
      }
      listItems = [];
      inList = false;
    }
  };

  lines.forEach((line, index) => {
    if (line.startsWith("```")) {
      if (!inCodeBlock) {
        flushList();
        inCodeBlock = true;
        codeLanguage = line.replace("```", "").trim();
        codeContent = [];
      } else {
        elements.push(
          <pre
            key={`code-${elements.length}`}
            className="p-3 bg-muted/30 rounded-lg overflow-x-auto my-3"
          >
            <code className="text-xs font-mono text-foreground">{codeContent.join("\n")}</code>
          </pre>
        );
        inCodeBlock = false;
      }
      return;
    }

    if (inCodeBlock) {
      codeContent.push(line);
      return;
    }

    if (line.startsWith("### ")) {
      flushList();
      elements.push(
        <h3 key={index} className="text-base font-semibold text-foreground mt-5 mb-2">
          {processInline(line.replace("### ", ""))}
        </h3>
      );
      return;
    }

    if (line.startsWith("## ")) {
      flushList();
      elements.push(
        <h2 key={index} className="text-lg font-semibold text-foreground mt-6 mb-3">
          {processInline(line.replace("## ", ""))}
        </h2>
      );
      return;
    }

    if (line.startsWith("# ")) {
      flushList();
      elements.push(
        <h1 key={index} className="text-xl font-bold text-foreground mt-6 mb-3">
          {processInline(line.replace("# ", ""))}
        </h1>
      );
      return;
    }

    if (line.trim() === "---") {
      flushList();
      elements.push(<hr key={index} className="border-border my-5" />);
      return;
    }

    if (line.startsWith("- ") || line.startsWith("* ")) {
      if (!inList || listType !== "ul") {
        flushList();
        inList = true;
        listType = "ul";
      }
      listItems.push(line.replace(/^[*-] /, ""));
      return;
    }

    if (/^\d+\.\s/.test(line)) {
      if (!inList || listType !== "ol") {
        flushList();
        inList = true;
        listType = "ol";
      }
      listItems.push(line.replace(/^\d+\.\s/, ""));
      return;
    }

    if (line.trim() === "") {
      flushList();
      return;
    }

    flushList();
    elements.push(
      <p key={index} className="text-sm text-muted-foreground leading-relaxed my-2">
        {processInline(line)}
      </p>
    );
  });

  flushList();
  return elements;
}

export function ProfileReadme({ username }: ProfileReadmeProps) {
  const isOwnProfile = false;

  return (
    <div className="p-4 rounded-lg border border-border bg-card/50">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-semibold text-foreground">{username}</h2>
        {isOwnProfile && (
          <button className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors">
            <Edit3 className="w-4 h-4" />
          </button>
        )}
      </div>
      <div className="text-sm">{parseMarkdown(DEMO_README)}</div>
    </div>
  );
}
