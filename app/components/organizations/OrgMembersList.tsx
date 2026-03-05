"use client";

import * as React from "react";
import Link from "next/link";
import { Calendar } from "lucide-react";

interface OrgMember {
  id: string;
  username: string;
  avatarUrl: string;
  role: "owner" | "admin" | "member";
  joinedAt: Date;
}

interface OrgMembersListProps {
  members: OrgMember[];
}

function RoleBadge({ role }: { role: OrgMember["role"] }) {
  const colors = {
    owner: "bg-[#1f6feb] text-white",
    admin: "bg-[#1f6feb]/10 text-[#1f6feb]",
    member: "bg-muted text-muted-foreground",
  };

  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${colors[role]}`}>{role}</span>
  );
}

export function OrgMembersList({ members }: OrgMembersListProps) {
  return (
    <div className="rounded-md border border-border">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">User</th>
            <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Role</th>
            <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">
              Joined
            </th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id} className="border-b border-border last:border-0">
              <td className="px-4 py-3">
                <Link
                  href={`/${member.username}`}
                  className="flex items-center gap-3 hover:text-[#2f81f7]"
                >
                  <img
                    src={member.avatarUrl}
                    alt={member.username}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="font-medium">{member.username}</span>
                </Link>
              </td>
              <td className="px-4 py-3">
                <RoleBadge role={member.role} />
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  {member.joinedAt.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
