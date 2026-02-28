import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  const currentYear = new Date().getFullYear();

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
    <footer className={cn("bg-background border-t border-border py-6 px-4", className)}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Giteria. Powered By Sky Genesis Enterprise.
          </p>

          <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors"
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
