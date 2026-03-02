"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Bot, User, Copy, Check, ThumbsUp, ThumbsDown, AlertCircle } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp?: Date;
  isLoading?: boolean;
  error?: string;
  codeBlocks?: { language: string; code: string }[];
}

interface CopilotMessageProps {
  message: Message;
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      <div className="flex gap-1">
        <span
          className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"
          style={{ animationDelay: "0ms" }}
        />
        <span
          className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"
          style={{ animationDelay: "150ms" }}
        />
        <span
          className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"
          style={{ animationDelay: "300ms" }}
        />
      </div>
    </div>
  );
}

function CodeBlock({ language, code }: { language: string; code: string }) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-3 rounded-lg border border-border overflow-hidden">
      <div className="flex items-center justify-between px-3 py-1.5 bg-secondary text-xs">
        <span className="text-muted-foreground font-mono">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-3 bg-[#0d1117] overflow-x-auto">
        <code className="text-sm font-mono text-card-foreground whitespace-pre">{code}</code>
      </pre>
    </div>
  );
}

export function CopilotMessage({ message }: CopilotMessageProps) {
  const isUser = message.role === "user";
  const isSystem = message.role === "system";

  if (message.isLoading) {
    return (
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Bot className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-medium text-sm text-card-foreground">Giteria Copilot</span>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <TypingIndicator />
          </div>
        </div>
      </div>
    );
  }

  if (message.error) {
    return (
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
          <AlertCircle className="w-5 h-5 text-destructive" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-medium text-sm text-card-foreground">Error</span>
          </div>
          <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-4">
            <p className="text-sm text-destructive">{message.error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (isSystem) {
    return (
      <div className="flex justify-center py-2">
        <div className="bg-secondary rounded-full px-4 py-1.5">
          <p className="text-xs text-muted-foreground">{message.content}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex items-start gap-3", isUser && "flex-row-reverse")}>
      <div
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
          isUser ? "bg-secondary" : "bg-primary/10"
        )}
      >
        {isUser ? (
          <User className="w-5 h-5 text-muted-foreground" />
        ) : (
          <Bot className="w-5 h-5 text-primary" />
        )}
      </div>

      <div className={cn("flex-1 max-w-[85%]", isUser && "flex flex-col items-end")}>
        {!isUser && (
          <div className="flex items-center gap-2 mb-2">
            <span className="font-medium text-sm text-card-foreground">
              {isUser ? "You" : "Giteria Copilot"}
            </span>
            {message.timestamp && (
              <span className="text-xs text-muted-foreground">
                {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            )}
          </div>
        )}

        <div
          className={cn(
            "rounded-xl px-4 py-3",
            isUser ? "bg-primary text-primary-foreground" : "bg-card border border-border"
          )}
        >
          <p
            className={cn(
              "text-sm whitespace-pre-wrap",
              isUser ? "text-primary-foreground" : "text-card-foreground"
            )}
          >
            {message.content}
          </p>
        </div>

        {!isUser && (
          <div className="flex items-center gap-2 mt-2">
            <button className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors text-xs">
              <ThumbsUp className="w-3.5 h-3.5" />
              <span>Helpful</span>
            </button>
            <button className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors text-xs">
              <ThumbsDown className="w-3.5 h-3.5" />
              <span>Not helpful</span>
            </button>
            <button className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors text-xs">
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
