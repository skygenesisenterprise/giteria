"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { CopilotMessage } from "./CopilotMessage";
import { Bot, Sparkles, ArrowDown, BarChart3, Search, FileText, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type QuickActionHandler = (prompt: string) => void;

interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp?: Date;
  isLoading?: boolean;
  error?: string;
}

interface CopilotMessageListProps {
  messages: Message[];
  isLoading?: boolean;
  onQuickAction?: QuickActionHandler;
}

const quickActions: { icon: LucideIcon; label: string; prompt: string }[] = [
  {
    icon: BarChart3,
    label: "Analyze codebase",
    prompt: "Analyze the codebase structure and provide insights",
  },
  { icon: Search, label: "Find bugs", prompt: "Search for potential bugs in the code" },
  { icon: FileText, label: "Write tests", prompt: "Generate unit tests for the selected code" },
  { icon: Wrench, label: "Refactor code", prompt: "Suggest improvements for the selected code" },
];

function EmptyState({ onQuickAction }: { onQuickAction?: QuickActionHandler }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-6">
        <Bot className="w-8 h-8 text-primary" />
      </div>

      <h2 className="text-xl font-semibold text-card-foreground mb-2">
        Welcome to Giteria Copilot
      </h2>
      <p className="text-muted-foreground text-center max-w-md mb-8">
        Your AI-powered developer assistant. Ask questions, get code suggestions, and accelerate
        your development workflow.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
        {quickActions.map((action) => (
          <button
            key={action.label}
            onClick={() => onQuickAction?.(action.prompt)}
            className="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-primary/50 hover:bg-secondary/50 transition-all text-left group cursor-pointer"
          >
            <action.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            <span className="text-sm font-medium text-card-foreground group-hover:text-primary transition-colors">
              {action.label}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-8 flex items-center gap-2 text-xs text-muted-foreground">
        <Sparkles className="w-3.5 h-3.5" />
        <span>Press Enter to send • Shift + Enter for new line</span>
      </div>
    </div>
  );
}

export function CopilotMessageList({
  messages,
  isLoading,
  onQuickAction,
}: CopilotMessageListProps) {
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = React.useState(false);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const isAtBottom = target.scrollHeight - target.scrollTop <= target.clientHeight + 100;
    setShowScrollButton(!isAtBottom);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (messages.length === 0) {
    return <EmptyState onQuickAction={onQuickAction} />;
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6" onScroll={handleScroll}>
      <div className="max-w-3xl mx-auto space-y-6">
        {messages.map((message) => (
          <CopilotMessage key={message.id} message={message} />
        ))}

        {isLoading && (
          <CopilotMessage
            message={{
              id: "loading",
              role: "assistant",
              content: "",
              isLoading: true,
            }}
          />
        )}

        <div ref={messagesEndRef} />
      </div>

      {showScrollButton && (
        <button
          onClick={scrollToBottom}
          className="fixed bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-2 rounded-full bg-card border border-border shadow-lg hover:bg-secondary transition-colors text-sm text-muted-foreground"
        >
          <ArrowDown className="w-4 h-4" />
          <span>Scroll to bottom</span>
        </button>
      )}
    </div>
  );
}
