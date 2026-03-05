"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Users,
  MapPin,
  Link as LinkIcon,
  Twitter,
  Mail,
  CheckCircle,
  Heart,
  X,
} from "lucide-react";

export interface OrganizationProfile {
  name: string;
  slug: string;
  description?: string;
  avatarUrl?: string;
  verified?: boolean;
  verifiedDomain?: string;
  sponsor?: boolean;
  sponsors?: boolean;
  sponsorsCount?: number;
  organizationType?: string;
  affiliation?: string;
  affiliationUrl?: string;
  followers?: number;
  following?: number;
  location?: string;
  website?: string;
  twitter?: string;
  email?: string;
}

interface OrganizationDescriptionProps {
  organization: OrganizationProfile;
}

interface BadgeProps {
  type: "verified" | "sponsor" | "sponsors" | "type";
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

function Badge({ type, label, icon, onClick }: BadgeProps) {
  const styles = {
    verified: "bg-[#1f6feb]/10 text-[#1f6feb] cursor-pointer hover:bg-[#1f6feb]/20",
    sponsor: "bg-[#db61a2]/10 text-[#db61a2]",
    sponsors: "bg-[#e11d48]/10 text-[#e11d48]",
    type: "bg-muted text-muted-foreground cursor-pointer hover:bg-muted/80",
  };

  const isClickable = type === "verified" || type === "type";

  return (
    <span
      onClick={isClickable ? onClick : undefined}
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${styles[type]}`}
    >
      {icon}
      {label}
    </span>
  );
}

function VerifiedDomainTooltip({
  isOpen,
  onClose,
  organizationName,
  domain,
}: {
  isOpen: boolean;
  onClose: () => void;
  organizationName: string;
  domain: string;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute z-50 mt-2 w-80 rounded-md border border-border bg-popover p-4 shadow-lg"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#1f6feb] shrink-0" />
                <p className="text-sm text-foreground">
                  We've verified that the organization <strong>{organizationName}</strong> controls
                  the domain:
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-2 ml-7">
              <code className="text-sm font-mono text-foreground">{domain}</code>
            </div>
            <Link
              href="#"
              className="mt-3 block text-xs text-[#2f81f7] hover:underline"
              onClick={onClose}
            >
              Learn more about verified organizations
            </Link>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function AffiliationTooltip({
  isOpen,
  onClose,
  affiliation,
  affiliationUrl,
  organizationName,
}: {
  isOpen: boolean;
  onClose: () => void;
  affiliation?: string;
  affiliationUrl?: string;
  organizationName: string;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute z-50 mt-2 w-80 rounded-md border border-border bg-popover p-4 shadow-lg"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-muted-foreground shrink-0" />
                <p className="text-sm text-foreground">
                  <strong>{organizationName}</strong> is affiliated with:
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            {affiliation && (
              <div className="mt-2 ml-7">
                {affiliationUrl ? (
                  <Link
                    href={affiliationUrl}
                    className="text-sm font-medium text-[#2f81f7] hover:underline"
                    onClick={onClose}
                  >
                    {affiliation}
                  </Link>
                ) : (
                  <span className="text-sm font-medium text-foreground">{affiliation}</span>
                )}
              </div>
            )}
            <Link
              href="#"
              className="mt-3 block text-xs text-[#2f81f7] hover:underline"
              onClick={onClose}
            >
              Learn more about organization affiliations
            </Link>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function OrganizationDescription({ organization }: OrganizationDescriptionProps) {
  const [showVerifiedTooltip, setShowVerifiedTooltip] = React.useState(false);
  const [showAffiliationTooltip, setShowAffiliationTooltip] = React.useState(false);

  return (
    <div className="pb-6 border-b border-border">
      <div className="flex gap-6 relative">
        {organization.avatarUrl ? (
          <img
            src={organization.avatarUrl}
            alt={organization.name}
            className="w-32 h-32 rounded-full shrink-0"
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <Building2 className="w-16 h-16 text-primary" />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold text-foreground">{organization.name}</h1>

          {organization.description ? (
            <p className="mt-3 text-base text-foreground">{organization.description}</p>
          ) : (
            <p className="mt-3 text-base text-muted-foreground italic">No description</p>
          )}

          <div className="mt-3 flex items-center gap-2 flex-wrap relative">
            {organization.verified && (
              <div className="relative">
                <Badge
                  type="verified"
                  label="Verified"
                  icon={<CheckCircle className="w-3 h-3" />}
                  onClick={() => setShowVerifiedTooltip(!showVerifiedTooltip)}
                />
                <VerifiedDomainTooltip
                  isOpen={showVerifiedTooltip}
                  onClose={() => setShowVerifiedTooltip(false)}
                  organizationName={organization.name}
                  domain={organization.verifiedDomain || organization.website || "domain.com"}
                />
              </div>
            )}
            {organization.sponsor && (
              <Badge type="sponsor" label="Sponsor" icon={<Heart className="w-3 h-3" />} />
            )}
            {organization.sponsors && (
              <Link
                href={`/${organization.slug}/sponsors`}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-[#e11d48]/10 text-[#e11d48] hover:bg-[#e11d48]/20 transition-colors"
              >
                <Heart className="w-3 h-3" />
                Sponsors
              </Link>
            )}
            {(organization.organizationType || organization.affiliation) && (
              <div className="relative">
                <Badge
                  type="type"
                  label={organization.organizationType || "Organization"}
                  onClick={() => setShowAffiliationTooltip(!showAffiliationTooltip)}
                />
                <AffiliationTooltip
                  isOpen={showAffiliationTooltip}
                  onClose={() => setShowAffiliationTooltip(false)}
                  affiliation={organization.affiliation}
                  affiliationUrl={organization.affiliationUrl}
                  organizationName={organization.name}
                />
              </div>
            )}
          </div>

          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            {organization.followers !== undefined && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="w-4 h-4" />
                <span className="font-semibold text-foreground">{organization.followers}</span>
                <span>followers</span>
              </div>
            )}
            {organization.location && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{organization.location}</span>
              </div>
            )}
            {organization.website && (
              <Link
                href={organization.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-[#2f81f7] transition-colors"
              >
                <LinkIcon className="w-4 h-4" />
                <span>{organization.website.replace(/^https?:\/\//, "")}</span>
              </Link>
            )}
            {organization.twitter && (
              <Link
                href={`https://twitter.com/${organization.twitter.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-[#2f81f7] transition-colors"
              >
                <Twitter className="w-4 h-4" />
                <span>{organization.twitter}</span>
              </Link>
            )}
            {organization.email && (
              <Link
                href={`mailto:${organization.email}`}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-[#2f81f7] transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>{organization.email}</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export const mockOrganizationProfile: OrganizationProfile = {
  name: "SkyGenesis Enterprise",
  slug: "skygenesis",
  description: "Building the future of developer infrastructure.",
  verified: true,
  verifiedDomain: "skygenesisenterprise.com",
  sponsor: true,
  sponsors: true,
  sponsorsCount: 12,
  organizationType: "Enterprise",
  affiliation: "SkyGenesis Holdings",
  affiliationUrl: "https://skygenesis.com",
  followers: 4,
  location: "Belgium",
  website: "https://skygenesisenterprise.com",
  twitter: "@SkyGEnterprise",
  email: "github@skygenesisenterprise.com",
};
