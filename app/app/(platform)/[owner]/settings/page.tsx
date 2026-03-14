"use client";

import * as React from "react";
import { use } from "react";
import { OrgSettingSidebar } from "@/components/organizations/OrgSettingSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Shield, Archive, Trash2, Globe, MapPin, Building2 } from "lucide-react";
import { getOrganizationBySlug } from "@/lib/organizations/LocalOrgEngine";
import type { Organization } from "@/lib/organizations/api";
import {
  getOrganizationSettings,
  saveOrganizationSettings,
  type OrganizationSettings,
} from "@/lib/organizations/OrgSettingsEngine";

interface OrgSettingsPageProps {
  params: Promise<{ owner: string }>;
}

export default function OrgSettingsPage({ params }: OrgSettingsPageProps) {
  const resolvedParams = use(params);
  const { owner } = resolvedParams;

  const [org, setOrg] = React.useState<Organization | null>(null);
  const [settings, setSettings] = React.useState<OrganizationSettings | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSaving, setIsSaving] = React.useState(false);

  const [formData, setFormData] = React.useState({
    displayName: "",
    email: "",
    description: "",
    url: "",
    social1: "",
    social2: "",
    social3: "",
    social4: "",
    location: "",
    billingEmail: "",
    gravatarEmail: "",
    sponsorsEmail: "",
    profilePicture: "",
    supportEmail: "",
    productWebsite: "",
    orgType: "corporate" as "corporate" | "individual",
    affiliation: "",
    affiliationUrl: "",
  });

  React.useEffect(() => {
    async function loadData() {
      if (!owner) return;

      setIsLoading(true);
      try {
        const orgData = await getOrganizationBySlug(owner);
        setOrg(orgData);

        const orgSettings = await getOrganizationSettings(owner);
        if (orgSettings) {
          setSettings(orgSettings);
          setFormData({
            displayName: orgSettings.displayName,
            email: orgSettings.email,
            description: orgSettings.description,
            url: orgSettings.url,
            social1: orgSettings.social1,
            social2: orgSettings.social2,
            social3: orgSettings.social3,
            social4: orgSettings.social4,
            location: orgSettings.location,
            billingEmail: orgSettings.billingEmail,
            gravatarEmail: orgSettings.gravatarEmail,
            sponsorsEmail: orgSettings.sponsorsEmail,
            profilePicture: orgSettings.profilePicture,
            supportEmail: orgSettings.supportEmail,
            productWebsite: orgSettings.productWebsite,
            orgType: orgSettings.orgType,
            affiliation: orgSettings.affiliation,
            affiliationUrl: orgSettings.affiliationUrl,
          });
        } else if (orgData) {
          setFormData({
            displayName: orgData.name,
            email: `giteria@${orgData.slug}.com`,
            description: orgData.description || "",
            url: `https://${orgData.slug}.com`,
            social1: "",
            social2: "",
            social3: "",
            social4: "",
            location: "Belgium",
            billingEmail: `billing@${orgData.slug}.com`,
            gravatarEmail: "",
            sponsorsEmail: `sponsors@${orgData.slug}.com`,
            profilePicture: `@${orgData.slug}`,
            supportEmail: `support@${orgData.slug}.com`,
            productWebsite: `https://${orgData.slug}.com`,
            orgType: "corporate",
            affiliation: "",
            affiliationUrl: "",
          });
        }
      } catch (error) {
        console.error("Failed to load organization settings:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [owner]);

  const handleSave = async () => {
    if (!owner) return;

    setIsSaving(true);
    try {
      const savedSettings = await saveOrganizationSettings(owner, formData);
      setSettings(savedSettings);
    } catch (error) {
      console.error("Failed to save settings:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, profilePicture: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-background min-h-screen">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="flex gap-8">
            <div className="w-64 shrink-0">
              <OrgSettingSidebar owner={owner} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-center py-12">
                <div className="text-muted-foreground">Loading settings...</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex gap-8">
          <div className="w-64 shrink-0">
            <OrgSettingSidebar owner={owner} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-semibold">Settings</h1>
                <p className="text-muted-foreground mt-1">Manage your organization settings</p>
              </div>

              <Tabs defaultValue="general" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="general">General</TabsTrigger>
                  <TabsTrigger value="danger">Danger zone</TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="space-y-6 mt-6">
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-xl font-semibold">General</h2>
                      <p className="text-sm text-muted-foreground mt-1">
                        Manage your organization profile and settings.
                      </p>
                    </div>
                    <Separator />

                    <div className="grid grid-cols-1 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="display-name">Organization display name</Label>
                        <Input
                          id="display-name"
                          value={formData.displayName}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, displayName: e.target.value }))
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">
                          Email{" "}
                          <span className="text-muted-foreground font-normal">
                            (will be public)
                          </span>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, email: e.target.value }))
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={formData.description}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, description: e.target.value }))
                          }
                          placeholder="A brief description of your organization"
                          rows={3}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="url">URL</Label>
                        <Input
                          id="url"
                          type="url"
                          value={formData.url}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, url: e.target.value }))
                          }
                          placeholder="https://example.com"
                        />
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">Social accounts</h3>
                        <div className="grid grid-cols-1 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="social1">Link to social profile</Label>
                            <Input
                              id="social1"
                              value={formData.social1}
                              onChange={(e) =>
                                setFormData((prev) => ({ ...prev, social1: e.target.value }))
                              }
                              onKeyDown={(e) => {
                                if (e.key === "/") {
                                  e.stopPropagation();
                                }
                              }}
                              placeholder="https://x.com/@yourorg"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="social2">Link to social profile 2</Label>
                            <Input
                              id="social2"
                              value={formData.social2}
                              onChange={(e) =>
                                setFormData((prev) => ({ ...prev, social2: e.target.value }))
                              }
                              onKeyDown={(e) => {
                                if (e.key === "/") {
                                  e.stopPropagation();
                                }
                              }}
                              placeholder="Link to social profile 2"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="social3">Link to social profile 3</Label>
                            <Input
                              id="social3"
                              value={formData.social3}
                              onChange={(e) =>
                                setFormData((prev) => ({ ...prev, social3: e.target.value }))
                              }
                              onKeyDown={(e) => {
                                if (e.key === "/") {
                                  e.stopPropagation();
                                }
                              }}
                              placeholder="Link to social profile 3"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="social4">Link to social profile 4</Label>
                            <Input
                              id="social4"
                              value={formData.social4}
                              onChange={(e) =>
                                setFormData((prev) => ({ ...prev, social4: e.target.value }))
                              }
                              onKeyDown={(e) => {
                                if (e.key === "/") {
                                  e.stopPropagation();
                                }
                              }}
                              placeholder="Link to social profile 4"
                            />
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <Label htmlFor="location">
                          <MapPin className="w-4 h-4 inline mr-1" />
                          Location
                        </Label>
                        <Input
                          id="location"
                          value={formData.location}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, location: e.target.value }))
                          }
                          placeholder="Location"
                        />
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Billing email</h3>
                        <div className="space-y-2">
                          <Label htmlFor="billing-email">
                            Billing email{" "}
                            <span className="text-muted-foreground font-normal">(Private)</span>
                          </Label>
                          <Input
                            id="billing-email"
                            type="email"
                            value={formData.billingEmail}
                            onChange={(e) =>
                              setFormData((prev) => ({ ...prev, billingEmail: e.target.value }))
                            }
                          />
                          <p className="text-xs text-muted-foreground">
                            Add more billing email recipients in the billing page.
                          </p>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="gravatar-email">
                            Gravatar email{" "}
                            <span className="text-muted-foreground font-normal">(Private)</span>
                          </Label>
                          <Input
                            id="gravatar-email"
                            type="email"
                            value={formData.gravatarEmail}
                            onChange={(e) =>
                              setFormData((prev) => ({ ...prev, gravatarEmail: e.target.value }))
                            }
                          />
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Sponsors update email</h3>
                        <div className="space-y-2">
                          <Label htmlFor="sponsors-email">
                            <span className="text-muted-foreground font-normal">(Private)</span>
                          </Label>
                          <Input
                            id="sponsors-email"
                            type="email"
                            value={formData.sponsorsEmail}
                            onChange={(e) =>
                              setFormData((prev) => ({ ...prev, sponsorsEmail: e.target.value }))
                            }
                          />
                          <p className="text-xs text-muted-foreground">
                            The developers and organizations that your organization sponsors can
                            send you updates to this email.
                          </p>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Profile picture</h3>
                        <div className="border rounded-lg p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center overflow-hidden">
                              {formData.profilePicture &&
                              formData.profilePicture.startsWith("data:image") ? (
                                <img
                                  src={formData.profilePicture}
                                  alt="Profile"
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <span className="text-2xl font-bold text-muted-foreground">
                                  {formData.profilePicture
                                    ? formData.profilePicture.charAt(1).toUpperCase()
                                    : "?"}
                                </span>
                              )}
                            </div>
                            <div className="flex-1">
                              {!formData.profilePicture.startsWith("data:image") && (
                                <p className="text-sm font-medium mb-1">
                                  {formData.profilePicture}
                                </p>
                              )}
                              <input
                                type="file"
                                id="profile-picture-upload"
                                accept="image/*"
                                className="hidden"
                                onChange={handleProfilePictureChange}
                              />
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  document.getElementById("profile-picture-upload")?.click()
                                }
                              >
                                <Upload className="w-4 h-4 mr-2" />
                                Upload image
                              </Button>
                              <p className="text-xs text-muted-foreground mt-2">
                                Note: To apply for a publisher verification your organization&apos;s
                                profile picture should not be irrelevant, abusive or vulgar. It
                                should not be a default image provided by Giteria.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/30">
                          <div className="flex items-center gap-3">
                            <div className="text-sm">
                              <p className="font-medium">Patreon account</p>
                              <p className="text-muted-foreground text-xs">
                                Disconnect the Patreon account liam.dispa@skygenesisenterprise.com
                                for @skygenesisenterprise to sponsor maintainers with. Any
                                sponsorships made on Patreon will no longer receive recognition on
                                Giteria.
                              </p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Unlink Patreon account
                          </Button>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Giteria Developer Program</h3>
                        <p className="text-sm text-muted-foreground">
                          Giteria Docs has guides, API and webhook references, information about
                          creating Giteria Apps and other resources for building applications that
                          integrate with Giteria. Make sure your contact information is up-to-date
                          below. Thanks for being a member!
                        </p>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="support-email">Support email address</Label>
                            <Input
                              id="support-email"
                              type="email"
                              value={formData.supportEmail}
                              onChange={(e) =>
                                setFormData((prev) => ({ ...prev, supportEmail: e.target.value }))
                              }
                            />
                            <p className="text-xs text-muted-foreground">
                              An email address where Giteria users can contact you for support.
                            </p>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="product-website">Product or company website</Label>
                            <Input
                              id="product-website"
                              type="url"
                              value={formData.productWebsite}
                              onChange={(e) =>
                                setFormData((prev) => ({ ...prev, productWebsite: e.target.value }))
                              }
                            />
                            <p className="text-xs text-muted-foreground">
                              The URL for the product, company, or service that integrates with
                              Giteria.
                            </p>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Terms of Service</h3>
                        <div className="space-y-2">
                          <Label>Select an organization type</Label>
                          <div className="space-y-2">
                            <div className="flex items-center gap-3">
                              <input
                                type="radio"
                                id="corporate"
                                name="org-type"
                                className="w-4 h-4"
                                checked={formData.orgType === "corporate"}
                                onChange={() =>
                                  setFormData((prev) => ({ ...prev, orgType: "corporate" }))
                                }
                              />
                              <Label htmlFor="corporate" className="font-normal cursor-pointer">
                                Corporate
                              </Label>
                            </div>
                            <p className="text-sm text-muted-foreground ml-7">
                              Best for businesses that need to protect their intellectual property
                              and secure visibility into their data.
                            </p>
                            <div className="flex items-center gap-3 ml-7 mt-2">
                              <input
                                type="radio"
                                id="individual"
                                name="org-type"
                                className="w-4 h-4"
                                checked={formData.orgType === "individual"}
                                onChange={() =>
                                  setFormData((prev) => ({ ...prev, orgType: "individual" }))
                                }
                              />
                              <Label htmlFor="individual" className="font-normal cursor-pointer">
                                Individual
                              </Label>
                            </div>
                            <p className="text-sm text-muted-foreground ml-7">
                              Best for individuals who want to sponsor open source and may need to
                              sponsor in the future.
                            </p>
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">
                            Read the Giteria customer agreement
                          </p>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">
                          <Building2 className="w-5 h-5 inline mr-2" />
                          Link this organization
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Connect your organization to a parent company or organization. This will
                          display an affiliation badge on your profile.
                        </p>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="affiliation">Name of the parent organization</Label>
                            <Input
                              id="affiliation"
                              value={formData.affiliation}
                              onChange={(e) =>
                                setFormData((prev) => ({ ...prev, affiliation: e.target.value }))
                              }
                              placeholder="Parent Company Inc."
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="affiliation-url">URL of the parent organization</Label>
                            <Input
                              id="affiliation-url"
                              type="url"
                              value={formData.affiliationUrl}
                              onChange={(e) =>
                                setFormData((prev) => ({ ...prev, affiliationUrl: e.target.value }))
                              }
                              placeholder="https://parentcompany.com"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button onClick={handleSave} disabled={isSaving}>
                          {isSaving ? "Saving..." : "Save changes"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="danger" className="space-y-6 mt-6">
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-xl font-semibold text-red-600">Danger zone</h2>
                      <p className="text-sm text-muted-foreground mt-1">
                        Irreversible and destructive actions for this organization.
                      </p>
                    </div>
                    <Separator />

                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50 dark:bg-red-950/20">
                        <div className="flex items-center gap-3">
                          <Globe className="w-5 h-5 text-red-600" />
                          <div className="text-sm">
                            <p className="font-medium">Rename organization</p>
                            <p className="text-muted-foreground text-xs">
                              Renaming your organization can have unintended side effects.
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          className="border-red-300 text-red-600 hover:bg-red-100"
                        >
                          Rename
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50 dark:bg-red-950/20">
                        <div className="flex items-center gap-3">
                          <Archive className="w-5 h-5 text-red-600" />
                          <div className="text-sm">
                            <p className="font-medium">Archive this organization</p>
                            <p className="text-muted-foreground text-xs">
                              Mark this organization and all its repositories as archived and
                              read-only.
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          className="border-red-300 text-red-600 hover:bg-red-100"
                        >
                          Archive
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-4 border-2 border-red-400 rounded-lg bg-red-50 dark:bg-red-950/20">
                        <div className="flex items-center gap-3">
                          <Trash2 className="w-5 h-5 text-red-600" />
                          <div className="text-sm">
                            <p className="font-medium">Delete this organization</p>
                            <p className="text-muted-foreground text-xs">
                              Once deleted, it will be gone forever. Please be certain.
                            </p>
                          </div>
                        </div>
                        <Button variant="destructive">Delete this organization</Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
