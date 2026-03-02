"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Paperclip,
  Zap,
  Loader2,
  X,
  FileText,
  Image,
  Code,
  BugPlay,
  Sparkles,
  FileCode,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface CopilotInputProps {
  onSend?: (message: string, files?: File[]) => void;
  isLoading?: boolean;
  placeholder?: string;
}

interface SelectedFile {
  file: File;
  preview?: string;
}

interface QuickAction {
  icon: React.ElementType;
  label: string;
  prompt: string;
}

const quickActions: QuickAction[] = [
  { icon: Code, label: "Write code", prompt: "Write code for: " },
  { icon: BugPlay, label: "Debug", prompt: "Help me debug this error: " },
  { icon: Sparkles, label: "Explain", prompt: "Explain this code: " },
  { icon: FileCode, label: "Refactor", prompt: "Refactor this code: " },
];

const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp", "svg"];

function getFileIcon(file: File) {
  const ext = file.name.split(".").pop()?.toLowerCase() || "";
  if (imageExtensions.includes(ext)) {
    return <Image className="w-4 h-4" />;
  }
  return <FileText className="w-4 h-4" />;
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

export function CopilotInput({
  onSend,
  isLoading = false,
  placeholder = "Ask anything about your code...",
}: CopilotInputProps) {
  const [value, setValue] = React.useState("");
  const [selectedFiles, setSelectedFiles] = React.useState<SelectedFile[]>([]);
  const [showQuickActions, setShowQuickActions] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const quickActionsRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (quickActionsRef.current && !quickActionsRef.current.contains(event.target as Node)) {
        setShowQuickActions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleQuickAction = (action: QuickAction) => {
    setValue((prev) => prev + action.prompt);
    setShowQuickActions(false);
    textareaRef.current?.focus();
  };

  const handleSubmit = () => {
    if ((value.trim() || selectedFiles.length > 0) && !isLoading) {
      const files = selectedFiles.map((f) => f.file);
      onSend?.(value.trim(), files.length > 0 ? files : undefined);
      setValue("");
      setSelectedFiles([]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newFiles: SelectedFile[] = files.map((file) => {
      const selected: SelectedFile = { file };
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setSelectedFiles((prev) =>
            prev.map((f) => (f.file === file ? { ...f, preview: e.target?.result as string } : f))
          );
        };
        reader.readAsDataURL(file);
      }
      return selected;
    });
    setSelectedFiles((prev) => [...prev, ...newFiles]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  React.useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [value]);

  const canSubmit = value.trim() || selectedFiles.length > 0;

  return (
    <div className="sticky bottom-0 bg-background/95 backdrop-blur-sm border-t border-border">
      <div className="max-w-3xl mx-auto px-4 py-4">
        {selectedFiles.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {selectedFiles.map((selected, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-1.5 bg-secondary rounded-lg border border-border"
              >
                {selected.preview ? (
                  <img
                    src={selected.preview}
                    alt={selected.file.name}
                    className="w-6 h-6 rounded object-cover"
                  />
                ) : (
                  <span className="text-muted-foreground">{getFileIcon(selected.file)}</span>
                )}
                <span className="text-xs text-foreground max-w-[120px] truncate">
                  {selected.file.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {formatFileSize(selected.file.size)}
                </span>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="p-0.5 hover:bg-destructive/10 rounded text-muted-foreground hover:text-destructive transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="relative bg-card border border-border rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 transition-all">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            rows={1}
            className="w-full bg-transparent px-4 py-3 pr-24 text-sm text-card-foreground placeholder:text-muted-foreground resize-none outline-none max-h-[200px]"
            disabled={isLoading}
          />

          <div className="absolute right-2 bottom-2 flex items-center gap-1">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileSelect}
              className="hidden"
              id="copilot-file-input"
            />

            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="text-muted-foreground hover:text-foreground"
              disabled={isLoading}
              onClick={() => fileInputRef.current?.click()}
            >
              <Paperclip className="w-4 h-4" />
            </Button>

            <div className="relative" ref={quickActionsRef}>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className={cn(
                  "text-muted-foreground hover:text-foreground",
                  showQuickActions && "bg-secondary"
                )}
                disabled={isLoading}
                onClick={() => setShowQuickActions(!showQuickActions)}
              >
                <Zap className="w-4 h-4" />
              </Button>

              <AnimatePresence>
                {showQuickActions && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-xl overflow-hidden"
                  >
                    <div className="px-3 py-2 text-xs font-medium text-muted-foreground border-b border-border">
                      Quick actions
                    </div>
                    {quickActions.map((action, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleQuickAction(action)}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-foreground hover:bg-secondary transition-colors"
                      >
                        <action.icon className="w-4 h-4 text-primary" />
                        {action.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Button
              type="button"
              size="icon-sm"
              className={cn(
                "rounded-lg",
                canSubmit
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "bg-secondary text-muted-foreground"
              )}
              onClick={handleSubmit}
              disabled={!canSubmit || isLoading}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 mt-3 text-xs text-muted-foreground">
          <span>Copilot can make mistakes. Review carefully.</span>
        </div>
      </div>
    </div>
  );
}
