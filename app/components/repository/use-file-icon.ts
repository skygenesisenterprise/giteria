"use client";

import * as React from "react";
import { getFileIcon, getFolderIcon, getSpecialFileIcon } from "@/lib/fileIcons";

export interface FileIconResult {
  iconName: string;
  color?: string;
}

interface FileItem {
  name: string;
  path: string;
  type: "file" | "folder";
  size?: number;
  modifiedAt?: number;
}

export function useFileIcon() {
  const getIcon = React.useCallback((file: FileItem): FileIconResult => {
    if (file.type === "folder") {
      const { iconName, color } = getFolderIcon(file.name);
      return { iconName, color: color || "text-blue-500" };
    }

    const specialIcon = getSpecialFileIcon(file.name);
    if (specialIcon) {
      return specialIcon;
    }

    const { iconName, color } = getFileIcon(file.name);
    return { iconName, color: color || "text-muted-foreground" };
  }, []);

  return { getIcon };
}
