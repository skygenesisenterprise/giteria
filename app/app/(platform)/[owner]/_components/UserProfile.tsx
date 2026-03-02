"use client";

import * as React from "react";
import Image from "next/image";
import { MapPin, Link as LinkIcon, Calendar, Users, User as UserIcon } from "lucide-react";
import type { User } from "@/lib/auth/types";

interface UserProfileProps {
  user: User;
}

export function UserProfile({ user }: UserProfileProps) {
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
    return `Joined ${date.toLocaleDateString("en-US", { month: "long", year: "numeric" })}`;
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start gap-4">
        <div className="w-20 h-20 sm:w-32 sm:h-32 rounded-full overflow-hidden bg-muted flex-shrink-0">
          <Image
            src={safeProfile.avatarUrl}
            alt={username}
            width={128}
            height={128}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-foreground">{username}</h1>
            <p className="text-muted-foreground text-lg">{username}</p>
          </div>

          {safeProfile.bio && (
            <p className="mt-3 text-foreground whitespace-pre-line">{safeProfile.bio}</p>
          )}

          <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
            {safeProfile.company && (
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{safeProfile.company}</span>
              </div>
            )}

            {safeProfile.location && (
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{safeProfile.location}</span>
              </div>
            )}

            {safeProfile.website && (
              <div className="flex items-center gap-1">
                <LinkIcon className="w-4 h-4" />
                <a
                  href={safeProfile.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#2f81f7] hover:underline"
                >
                  {safeProfile.website.replace(/^https?:\/\//, "")}
                </a>
              </div>
            )}

            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(safeProfile.createdAt)}</span>
            </div>
          </div>

          <div className="flex gap-6 mt-4">
            <div className="flex items-center gap-1 text-sm">
              <UserIcon className="w-4 h-4 text-muted-foreground" />
              <span className="font-semibold text-foreground">{safeProfile.followers}</span>
              <span className="text-muted-foreground">followers</span>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <span className="font-semibold text-foreground">{safeProfile.following}</span>
              <span className="text-muted-foreground">following</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
