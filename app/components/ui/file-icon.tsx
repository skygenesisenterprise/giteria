"use client";

import * as React from "react";

const iconSvgs = require("@/options/fileicon/material-icon-svgs.json") as Record<string, string>;

interface FileIconProps {
  iconName: string;
  className?: string;
}

export function FileIcon({ iconName, className }: FileIconProps) {
  const svgString = iconSvgs[iconName];

  if (!svgString) {
    return null;
  }

  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: svgString }}
      style={{ display: "inline-flex", alignItems: "center", width: "1em", height: "1em" }}
    />
  );
}
