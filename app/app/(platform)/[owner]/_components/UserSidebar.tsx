"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Link as LinkIcon,
  Calendar,
  Users,
  Mail,
  Twitter,
  Briefcase,
  Heart,
  Star,
  Shield,
  Code2,
  Zap,
  Target,
  Sword,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { User } from "@/lib/auth/types";

interface UserSidebarProps {
  user: User;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

interface SocialLink {
  platform: string;
  url: string;
  icon: LucideIcon;
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: "yolo",
    name: "YOLO",
    description: "Merged a pull request without code review",
    icon: Zap,
    color: "#3fb950",
  },
  {
    id: "pull-shark",
    name: "Pull Shark",
    description: "Merged 2 pull requests",
    icon: Sword,
    color: "#a371f7",
  },
  {
    id: "pair-extraordinaire",
    name: "Pair Extraordinaire",
    description: "Accepted 3 pull request reviews",
    icon: Users,
    color: "#1f6feb",
  },
  {
    id: "quickdraw",
    name: "Quickdraw",
    description: "Opened a pull request within 5min of last push",
    icon: Target,
    color: "#f0883e",
  },
  {
    id: "star",
    name: "Starstruck",
    description: "Earned 16+ stars in a single repo",
    icon: Star,
    color: "#ffbd2e",
  },
  {
    id: " protector",
    name: "Protector",
    description: "Reported a security vulnerability",
    icon: Shield,
    color: "#238636",
  },
];

const HIGHLIGHTS = [
  { id: "dev-program", name: "Developer Program Member", icon: Code2 },
  { id: "pro", name: "Pro", icon: Zap },
  { id: "sponsor", name: "Sponsor", icon: Heart },
];

export function UserSidebar({ user }: UserSidebarProps) {
  const { profile, username } = user;

  const safeProfile = profile || {
    avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${username}&backgroundColor=0ea5e9`,
    bio: "",
    location: "",
    website: "",
    twitter: "",
    company: "",
    followers: 0,
    following: 0,
    publicRepos: 0,
    publicGists: 0,
    hireable: false,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const socialLinks: SocialLink[] = [];
  if (safeProfile.twitter) {
    socialLinks.push({
      platform: "Twitter",
      url: `https://twitter.com/${safeProfile.twitter}`,
      icon: Twitter,
    });
  }
  if (safeProfile.website) {
    socialLinks.push({
      platform: safeProfile.website.replace(/^https?:\/\//, ""),
      url: safeProfile.website,
      icon: LinkIcon,
    });
  }

  const organizations = [
    "skygenesisenterprise",
    "sciencesproject",
    "astoria-gouv",
    "kronyxgames",
    "finafoundation",
    "guilderia",
    "vaelixbank",
  ];

  return (
    <div className="flex flex-col gap-6 w-full lg:w-72">
      <div className="overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-primary/20 via-[#a371f7]/20 to-primary/20" />

        <div className="px-4 pb-4">
          <div className="relative -mt-12 mb-3">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-background border-4 border-background">
              <Image
                src={safeProfile.avatarUrl}
                alt={username}
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <h1 className="text-xl font-bold text-foreground">{safeProfile.company || username}</h1>
          <p className="text-muted-foreground">{username}</p>

          <div className="mt-3">
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-md">
              Follow
            </Button>
          </div>

          <div className="mt-4 flex items-center gap-2 text-sm">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="font-semibold text-foreground">{safeProfile.followers}</span>
            <span className="text-muted-foreground">followers</span>
            <span className="text-muted-foreground">·</span>
            <span className="font-semibold text-foreground">{safeProfile.following}</span>
            <span className="text-muted-foreground">following</span>
          </div>

          {safeProfile.bio && (
            <p className="mt-4 text-sm text-foreground whitespace-pre-line">{safeProfile.bio}</p>
          )}

          <div className="mt-4 space-y-2 text-sm">
            {safeProfile.company && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Briefcase className="w-4 h-4 shrink-0" />
                <span className="truncate">{safeProfile.company}</span>
              </div>
            )}

            {safeProfile.location && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 shrink-0" />
                <span>{safeProfile.location}</span>
              </div>
            )}

            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="w-4 h-4 shrink-0" />
              <a href={`mailto:${user.email}`} className="text-[#2f81f7] hover:underline truncate">
                {user.email}
              </a>
            </div>

            {safeProfile.website && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <LinkIcon className="w-4 h-4 shrink-0" />
                <a
                  href={safeProfile.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#2f81f7] hover:underline truncate"
                >
                  {safeProfile.website.replace(/^https?:\/\//, "")}
                </a>
              </div>
            )}

            {safeProfile.twitter && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Twitter className="w-4 h-4 shrink-0" />
                <a
                  href={`https://twitter.com/${safeProfile.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#2f81f7] hover:underline"
                >
                  @{safeProfile.twitter}
                </a>
              </div>
            )}

            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4 shrink-0" />
              <span>{formatDate(safeProfile.createdAt)}</span>
            </div>
          </div>

          <div className="mt-4 pt-4">
            <h3 className="text-sm font-semibold text-foreground mb-2">Social Links</h3>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-2 py-1 text-xs rounded-md bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
                >
                  <link.icon className="w-3.5 h-3.5" />
                  {link.platform}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-base font-semibold text-foreground mb-3">Achievements</h3>
        <div className="flex flex-wrap gap-2">
          {ACHIEVEMENTS.slice(0, 6).map((achievement) => (
            <div
              key={achievement.id}
              className="group relative flex items-center gap-2 px-2 py-1.5 rounded-md bg-muted/30 hover:bg-muted/50 transition-colors cursor-help"
            >
              <achievement.icon className="w-4 h-4" style={{ color: achievement.color }} />
              <span className="text-xs font-medium text-foreground">{achievement.name}</span>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-foreground text-background text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                {achievement.description}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-foreground" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-base font-semibold text-foreground mb-3">Highlights</h3>
        <div className="space-y-2">
          {HIGHLIGHTS.map((highlight) => (
            <div
              key={highlight.id}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <highlight.icon className="w-4 h-4 text-primary" />
              <span className="text-foreground">{highlight.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-base font-semibold text-foreground mb-3">Organizations</h3>
        <div className="flex flex-wrap gap-2">
          {organizations.map((org) => (
            <Link
              key={org}
              href={`/${org}`}
              className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-[10px] font-bold text-primary">
                  {org.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="text-sm text-foreground">{org}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-base font-semibold text-foreground mb-3">Sponsors</h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Heart className="w-4 h-4 text-primary" />
          <span>
            <a href={`/${username}/sponsors`} className="text-[#2f81f7] hover:underline">
              Be a sponsor
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
