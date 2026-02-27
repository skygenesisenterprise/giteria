import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  const footerLinks = [
    { label: "Terms", href: "/terms" },
    { label: "Privacy", href: "/privacy" },
    { label: "Security", href: "/security" },
    { label: "Status", href: "/status" },
    { label: "Community", href: "/community" },
    { label: "Docs", href: "/docs" },
    { label: "Contact", href: "/contact" },
    { label: "Manage cookies", href: "/cookies" },
    { label: "Do not share my personal information", href: "/privacy#do-not-share" },
  ];

  return (
    <footer className={cn("bg-[#010409] border-t border-[#30363d] py-6 px-4", className)}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <p className="text-sm text-[#8b949e]">© 2026 Giteria, Inc.</p>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-[#8b949e] hover:text-white hover:underline transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
