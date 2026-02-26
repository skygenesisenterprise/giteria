"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Linkedin as LinkedinIcon,
  Twitter as TwitterIcon,
  Github as GithubIcon,
  Mail,
  MessageCircle,
  Camera,
  Globe,
  Youtube,
  Twitch,
  LayoutDashboard,
} from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

export default function Footer() {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    setIsAuthenticated(!!token);
  }, [pathname]);
  const sanitizeText = (text: string): string => {
    return text
      .replace(/[<>'"&]/g, "")
      .trim()
      .substring(0, 100);
  };

  const isValidUrl = (url: string): boolean => {
    try {
      if (url.startsWith("/")) return true;
      if (url.startsWith("http")) {
        const parsed = new URL(url);
        const allowedDomains = [
          "skygenesisenterprise.com",
          "linkedin.com",
          "twitter.com",
          "github.com",
          "youtube.com",
          "twitch.tv",
          "instagram.com",
          "mastodon.social",
        ];
        return allowedDomains.some(
          (domain) => parsed.hostname === domain || parsed.hostname.endsWith(`.${domain}`)
        );
      }
      return false;
    } catch {
      return false;
    }
  };

  const navigationLinks = [
    { name: "Home", href: "/" },
    { name: "Aether Office", href: "/aether-office" },
    { name: "Governance", href: "/governance" },
    { name: "Company", href: "/company" },
    { name: "Vision", href: "/vision" },
    { name: "Blog", href: "/blog" },
    { name: "Careers", href: "/careers" },
  ];

  const resourcesLinks = [
    { name: "Documentation", href: "/docs" },
    { name: "API Reference", href: "/api/docs" },
    { name: "Guides & Tutorials", href: "/guides" },
    { name: "Changelog", href: "/changelog" },
    { name: "Whitepapers", href: "/whitepaper" },
    { name: "Developer Portal", href: "https://developer.skygenesisenterprise.com" },
    { name: "Newsletter", href: "/newsletter" },
    { name: "Certificates", href: "/certificates" },
  ];

  const enterpriseSolutions = [
    {
      name: "Security & Compliance",
      href: "/solutions/security",
      description: "GDPR compliance tools and enterprise security standards",
    },
    {
      name: "Scalable Infrastructure",
      href: "/solutions/infrastructure",
      description: "Cloud-native architecture and high-availability solutions",
    },
    {
      name: "Deployment Options",
      href: "/solutions/deployment",
      description: "SaaS, on-premises, and hybrid cloud integration",
    },
  ];

  const contactSupportLinks = [
    { name: "Support Portal", href: "https://support.skygenesisenterprise.com" },
    { name: "Sales Inquiry", href: "/contact/sales" },
    { name: "Office Locations", href: "/contact/locations" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "/policies/privacy" },
    { name: "Terms of Service", href: "/policies/terms" },
    { name: "Cookie Policy", href: "/policies/cookies" },
    { name: "GDPR Compliance", href: "/policies/gdpr" },
    { name: "Legal Notice", href: "/policies/legal" },
    { name: "License", href: "/license" },
  ];

  const socialLinks = [
    {
      name: "LinkedIn",
      href: "https://linkedin.com/company/skygenesisenterprise",
      icon: <LinkedinIcon className="w-5 h-5" />,
    },
    {
      name: "Twitter",
      href: "https://twitter.com/skyGEnterprise",
      icon: <TwitterIcon className="w-5 h-5" />,
    },
    {
      name: "GitHub",
      href: "https://github.com/skygenesisenterprise",
      icon: <GithubIcon className="w-5 h-5" />,
    },
    {
      name: "YouTube",
      href: "https://youtube.com/@skygenesisenterprise",
      icon: <Youtube className="w-5 h-5" />,
    },
    {
      name: "Twitch",
      href: "https://twitch.tv/skygenesisenterprise",
      icon: <Twitch className="w-5 h-5" />,
    },
    { name: "Discord", href: "/discord", icon: <MessageCircle className="w-5 h-5" /> },
    {
      name: "Instagram",
      href: "https://instagram.com/skygenesisenterprise",
      icon: <Camera className="w-5 h-5" />,
    },
    {
      name: "Mastodon",
      href: "https://mastodon.social/@skygenesisenterprise",
      icon: <Globe className="w-5 h-5" />,
    },
  ];

  return (
    <footer className="relative bg-background overflow-hidden border-t border-border">
      <div className="relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-16 lg:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-20">
              <div className="lg:col-span-1">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-foreground mb-4 tracking-tight">
                    Giteria
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm mb-2">
                    Empowering European digital sovereignty through enterprise-grade solutions
                  </p>
                  <p className="text-muted-foreground/80 leading-relaxed text-xs">
                    Building secure, scalable digital infrastructure for the modern European
                    enterprise
                  </p>
                </div>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center text-muted-foreground hover:text-foreground transition-colors duration-200">
                    <Mail className="w-4 h-4 mr-3 shrink-0" />
                    <span className="text-sm">info@giteria.com</span>
                  </div>
                </div>

                <div className="flex space-x-3 mb-4">
                  {socialLinks.map((social) => (
                    <Button
                      key={social.name}
                      variant="outline"
                      size="icon"
                      asChild
                      className="bg-card border-border text-muted-foreground hover:text-foreground hover:border-foreground hover:bg-secondary"
                    >
                      <a
                        href={isValidUrl(social.href) ? social.href : "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={sanitizeText(social.name)}
                      >
                        {social.icon}
                      </a>
                    </Button>
                  ))}
                </div>

                <div>
                  <a
                    href={
                      isValidUrl("https://giteriastatus.com")
                        ? "https://giteriastatus.com"
                        : "https://giteriastatus.com"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    <span className="text-sm">All services are online</span>
                  </a>
                </div>

                {isAuthenticated && (
                  <div className="mt-6">
                    <Link
                      href="/dashboard"
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-md hover:bg-primary/90 transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </Link>
                  </div>
                )}
              </div>

              <div className="lg:col-span-2">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-6">
                      Navigation
                    </h4>
                    <ul className="space-y-3">
                      {navigationLinks.map((link) => (
                        <li key={sanitizeText(link.name)}>
                          <Link
                            href={isValidUrl(link.href) ? link.href : "/"}
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 group flex items-center"
                          >
                            <span className="group-hover:translate-x-1 inline-block transition-transform duration-200">
                              {sanitizeText(link.name)}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-6">
                      Resources
                    </h4>
                    <ul className="space-y-3">
                      {resourcesLinks.map((link) => (
                        <li key={sanitizeText(link.name)}>
                          <Link
                            href={isValidUrl(link.href) ? link.href : "/docs"}
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 group flex items-center"
                          >
                            <span className="group-hover:translate-x-1 inline-block transition-transform duration-200">
                              {sanitizeText(link.name)}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-6">
                      Enterprise Solutions
                    </h4>
                    <ul className="space-y-3">
                      {enterpriseSolutions.map((solution) => (
                        <li key={sanitizeText(solution.name)}>
                          <Link
                            href={isValidUrl(solution.href) ? solution.href : "/solutions/security"}
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 group flex items-center"
                          >
                            <span className="group-hover:translate-x-1 inline-block transition-transform duration-200">
                              {sanitizeText(solution.name)}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-6">
                      Contact & Support
                    </h4>
                    <ul className="space-y-3">
                      {contactSupportLinks.map((link) => (
                        <li key={sanitizeText(link.name)}>
                          <Link
                            href={isValidUrl(link.href) ? link.href : "/contact/sales"}
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 group flex items-center"
                          >
                            <span className="group-hover:translate-x-1 inline-block transition-transform duration-200">
                              {sanitizeText(link.name)}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-6">
                      Legal & Policies
                    </h4>
                    <ul className="space-y-3">
                      {legalLinks.map((link) => (
                        <li key={sanitizeText(link.name)}>
                          <Link
                            href={isValidUrl(link.href) ? link.href : "/policies/privacy"}
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 group flex items-center"
                          >
                            <span className="group-hover:translate-x-1 inline-block transition-transform duration-200">
                              {sanitizeText(link.name)}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="py-8 border-t border-border">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-sm text-muted-foreground">
                <span>© {currentYear} Giteria. Powered By Sky Genesis Enterprise.</span>
              </div>
              <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-muted-foreground">
                <span>Liège, Belgium (HQ)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
