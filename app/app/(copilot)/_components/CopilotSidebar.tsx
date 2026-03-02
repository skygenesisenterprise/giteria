"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  ChevronLeft,
  ChevronRight,
  Plus,
  MessageSquare,
  Trash2,
  Folder,
  GitBranch,
  Settings,
} from "lucide-react";

interface CopilotSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onNewConversation?: () => void;
  sessions?: CopilotSession[];
  activeSessionId?: string | null;
  onSessionSelect?: (sessionId: string) => void;
  onSessionDelete?: (sessionId: string) => void;
}

export interface CopilotSession {
  id: string;
  title: string;
  preview: string;
  date: string;
  messages?: Message[];
}

export interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp?: Date;
  isLoading?: boolean;
  error?: string;
}

const defaultSessions: CopilotSession[] = [
  {
    id: "1",
    title: "Analyze repository structure",
    preview: "Help me understand the codebase...",
    date: "2h ago",
  },
  {
    id: "2",
    title: "Debug authentication issue",
    preview: "Getting 401 errors on...",
    date: "1d ago",
  },
  {
    id: "3",
    title: "Generate API documentation",
    preview: "Create OpenAPI spec for...",
    date: "3d ago",
  },
];

export function CopilotSidebar({
  isOpen,
  onToggle,
  onNewConversation,
  sessions: propSessions,
  activeSessionId,
  onSessionSelect,
  onSessionDelete,
}: CopilotSidebarProps) {
  const sessions = propSessions || defaultSessions;
  return (
    <aside className={cn("flex flex-col border-r border-border bg-card", isOpen ? "w-64" : "w-14")}>
      <div className="flex items-center justify-between h-14 px-3 border-b border-border">
        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-2"
            >
              <Bot className="w-5 h-5 text-primary" />
              <span className="font-semibold text-card-foreground text-sm">Copilot</span>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={onToggle}
          className={cn(
            "p-1.5 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors",
            !isOpen && "mx-auto"
          )}
        >
          {isOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="open"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="flex-1 overflow-y-auto"
          >
            <div className="p-3">
              <button
                onClick={onNewConversation}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium"
              >
                <Plus className="w-4 h-4" />
                New conversation
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-3 py-2">
              <div className="space-y-1">
                <div className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  <MessageSquare className="w-3.5 h-3.5" />
                  Recent conversations
                </div>
                {sessions.map((session) => (
                  <div
                    key={session.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => onSessionSelect?.(session.id)}
                    className={cn(
                      "w-full flex items-start gap-2 px-3 py-2 rounded-lg text-left transition-colors group cursor-pointer",
                      activeSessionId === session.id
                        ? "bg-secondary text-card-foreground"
                        : "text-muted-foreground hover:bg-secondary hover:text-card-foreground"
                    )}
                  >
                    <MessageSquare className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{session.title}</p>
                      <p className="text-xs text-muted-foreground truncate">{session.preview}</p>
                    </div>
                    <button
                      className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSessionDelete?.(session.id);
                      }}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 border-t border-border space-y-1">
              <div className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                <Folder className="w-3.5 h-3.5" />
                Context
              </div>
              <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-muted-foreground hover:bg-secondary hover:text-card-foreground transition-colors text-sm">
                <GitBranch className="w-4 h-4" />
                <span className="flex-1 text-left truncate">giteria/frontend</span>
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="closed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex-1 flex flex-col items-center py-4 gap-2"
          >
            <button className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
              <Plus className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
              <MessageSquare className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
              <GitBranch className="w-4 h-4" />
            </button>
            <div className="flex-1" />
            <button className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
              <Settings className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
}
