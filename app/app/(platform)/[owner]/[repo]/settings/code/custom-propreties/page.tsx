"use client";

import * as React from "react";
import { use } from "react";
import { SettingSidebar } from "@/components/repository/settings/SettingSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Settings2,
  Plus,
  Trash2,
  Edit,
  Loader2,
  Info,
  ExternalLink,
  Type,
  Hash,
  Calendar,
  List,
  ToggleLeft,
} from "lucide-react";

interface CustomProperty {
  id: string;
  name: string;
  type: "string" | "number" | "date" | "boolean" | "single_select" | "multi_select";
  required: boolean;
  defaultValue?: string;
  description?: string;
  options?: string[];
}

interface CustomPropertyValue {
  propertyId: string;
  value: string | string[] | number | boolean;
}

interface SettingsCustomPropertiesPageProps {
  params: Promise<{ owner: string; repo: string }>;
}

export default function SettingsCustomPropertiesPage({
  params,
}: SettingsCustomPropertiesPageProps) {
  const resolvedParams = use(params);
  const { owner, repo } = resolvedParams;

  const [properties, setProperties] = React.useState<CustomProperty[]>([
    {
      id: "1",
      name: "Team",
      type: "single_select",
      required: false,
      description: "Team responsible for this repository",
      options: ["Frontend", "Backend", "DevOps", "Mobile", "Data"],
    },
    {
      id: "2",
      name: "Tier",
      type: "single_select",
      required: true,
      description: "Service tier level",
      options: ["Tier 1 - Critical", "Tier 2 - Important", "Tier 3 - Standard"],
      defaultValue: "Tier 3 - Standard",
    },
    {
      id: "3",
      name: "Legacy",
      type: "boolean",
      required: false,
      description: "Whether this is a legacy codebase",
    },
    {
      id: "4",
      name: "API Version",
      type: "string",
      required: false,
      description: "Current API version",
    },
  ]);

  const [repositoryValues, setRepositoryValues] = React.useState<CustomPropertyValue[]>([
    { propertyId: "1", value: "Backend" },
    { propertyId: "2", value: "Tier 2 - Important" },
    { propertyId: "3", value: false },
    { propertyId: "4", value: "v2.0" },
  ]);

  const [selectedProperty, setSelectedProperty] = React.useState<CustomProperty | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);

  const [newProperty, setNewProperty] = React.useState({
    name: "",
    type: "string" as CustomProperty["type"],
    required: false,
    description: "",
    defaultValue: "",
    options: "",
  });

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsSaving(false);
  };

  const handleAddProperty = () => {
    if (!newProperty.name.trim()) return;
    const property: CustomProperty = {
      id: Date.now().toString(),
      name: newProperty.name,
      type: newProperty.type,
      required: newProperty.required,
      description: newProperty.description,
      defaultValue: newProperty.defaultValue || undefined,
      options:
        newProperty.type === "single_select" || newProperty.type === "multi_select"
          ? newProperty.options
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          : undefined,
    };
    setProperties((prev) => [...prev, property]);
    setNewProperty({
      name: "",
      type: "string",
      required: false,
      description: "",
      defaultValue: "",
      options: "",
    });
    setIsAddDialogOpen(false);
  };

  const handleEditProperty = (property: CustomProperty) => {
    setSelectedProperty({ ...property });
    setIsEditDialogOpen(true);
  };

  const handleUpdateProperty = () => {
    if (!selectedProperty) return;
    setProperties((prev) => prev.map((p) => (p.id === selectedProperty.id ? selectedProperty : p)));
    setIsEditDialogOpen(false);
  };

  const handleDeleteProperty = (propertyId: string) => {
    setProperties((prev) => prev.filter((p) => p.id !== propertyId));
    setRepositoryValues((prev) => prev.filter((v) => v.propertyId !== propertyId));
  };

  const getPropertyIcon = (type: CustomProperty["type"]) => {
    switch (type) {
      case "string":
        return <Type className="w-4 h-4" />;
      case "number":
        return <Hash className="w-4 h-4" />;
      case "date":
        return <Calendar className="w-4 h-4" />;
      case "boolean":
        return <ToggleLeft className="w-4 h-4" />;
      case "single_select":
        return <List className="w-4 h-4" />;
      case "multi_select":
        return <List className="w-4 h-4" />;
    }
  };

  const getTypeLabel = (type: CustomProperty["type"]) => {
    switch (type) {
      case "string":
        return "Text";
      case "number":
        return "Number";
      case "date":
        return "Date";
      case "boolean":
        return "True/false";
      case "single_select":
        return "Single select";
      case "multi_select":
        return "Multi select";
    }
  };

  const getValueForProperty = (propertyId: string) => {
    const value = repositoryValues.find((v) => v.propertyId === propertyId);
    if (!value) {
      const property = properties.find((p) => p.id === propertyId);
      return property?.defaultValue || "-";
    }
    return String(value.value);
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex gap-8">
          <div className="w-64 shrink-0">
            <SettingSidebar owner={owner} repo={repo} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-semibold">Custom properties</h1>
                <p className="text-muted-foreground mt-1">
                  Define and manage custom properties for this repository
                </p>
              </div>

              <Separator />

              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h2 className="text-xl font-semibold">Properties</h2>
                      <p className="text-sm text-muted-foreground">
                        Define custom properties that can be assigned to repositories.
                      </p>
                    </div>
                    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="w-4 h-4 mr-2" />
                          Add property
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add custom property</DialogTitle>
                          <DialogDescription>
                            Create a new custom property for repositories.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="prop-name">Property name</Label>
                            <Input
                              id="prop-name"
                              placeholder="e.g., Team, Project, Tier"
                              value={newProperty.name}
                              onChange={(e) =>
                                setNewProperty((prev) => ({ ...prev, name: e.target.value }))
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Property type</Label>
                            <Select
                              value={newProperty.type}
                              onValueChange={(value) =>
                                setNewProperty((prev) => ({
                                  ...prev,
                                  type: value as CustomProperty["type"],
                                }))
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="string">Text</SelectItem>
                                <SelectItem value="number">Number</SelectItem>
                                <SelectItem value="date">Date</SelectItem>
                                <SelectItem value="boolean">True/false</SelectItem>
                                <SelectItem value="single_select">Single select</SelectItem>
                                <SelectItem value="multi_select">Multi select</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="prop-desc">Description</Label>
                            <Input
                              id="prop-desc"
                              placeholder="Brief description of this property"
                              value={newProperty.description}
                              onChange={(e) =>
                                setNewProperty((prev) => ({ ...prev, description: e.target.value }))
                              }
                            />
                          </div>
                          {(newProperty.type === "single_select" ||
                            newProperty.type === "multi_select") && (
                            <div className="space-y-2">
                              <Label htmlFor="prop-options">Options (comma-separated)</Label>
                              <Input
                                id="prop-options"
                                placeholder="Option 1, Option 2, Option 3"
                                value={newProperty.options}
                                onChange={(e) =>
                                  setNewProperty((prev) => ({ ...prev, options: e.target.value }))
                                }
                              />
                            </div>
                          )}
                          <div className="space-y-2">
                            <Label htmlFor="prop-default">Default value</Label>
                            <Input
                              id="prop-default"
                              placeholder="Default value (optional)"
                              value={newProperty.defaultValue}
                              onChange={(e) =>
                                setNewProperty((prev) => ({
                                  ...prev,
                                  defaultValue: e.target.value,
                                }))
                              }
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={newProperty.required}
                              onCheckedChange={(checked) =>
                                setNewProperty((prev) => ({ ...prev, required: checked }))
                              }
                            />
                            <Label>Required property</Label>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleAddProperty} disabled={!newProperty.name.trim()}>
                            Add property
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <div className="border rounded-lg">
                    {properties.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <Settings2 className="w-12 h-12 text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">No custom properties defined</p>
                        <Button
                          variant="link"
                          className="mt-2"
                          onClick={() => setIsAddDialogOpen(true)}
                        >
                          Add your first property
                        </Button>
                      </div>
                    ) : (
                      <div className="divide-y">
                        {properties.map((property) => (
                          <div key={property.id} className="flex items-center justify-between p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                                {getPropertyIcon(property.type)}
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <p className="font-medium">{property.name}</p>
                                  {property.required && (
                                    <Badge className="bg-red-100 text-red-800">Required</Badge>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {getTypeLabel(property.type)}
                                  {property.options && property.options.length > 0
                                    ? ` (${property.options.join(", ")})`
                                    : ""}
                                </p>
                                {property.description && (
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {property.description}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="text-right mr-4">
                                <p className="text-sm text-muted-foreground">Current value</p>
                                <p className="text-sm font-medium">
                                  {getValueForProperty(property.id)}
                                </p>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditProperty(property)}
                              >
                                <Edit className="w-4 h-4 mr-1" />
                                Edit
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeleteProperty(property.id)}
                              >
                                <Trash2 className="w-4 h-4 text-muted-foreground hover:text-red-600" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="space-y-1">
                    <h2 className="text-xl font-semibold">About custom properties</h2>
                    <p className="text-sm text-muted-foreground">
                      Learn more about custom properties.
                    </p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-muted-foreground mt-0.5" />
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p>
                          Custom properties allow you to add metadata to repositories for better
                          organization and filtering.
                        </p>
                        <p>
                          You can define properties like team ownership, project tier, compliance
                          status, and more.
                        </p>
                        <p>
                          These properties can then be used in rulesets, queries, and dashboards.
                        </p>
                        <Button variant="link" className="p-0 h-auto" asChild>
                          <a
                            href="https://docs.giteria.com/custom-properties"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1"
                          >
                            Learn more about custom properties
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-end">
                  <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    Save changes
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit property: {selectedProperty?.name}</DialogTitle>
            <DialogDescription>Configure the custom property.</DialogDescription>
          </DialogHeader>
          {selectedProperty && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Property name</Label>
                <Input
                  value={selectedProperty.name}
                  onChange={(e) =>
                    setSelectedProperty((prev) => (prev ? { ...prev, name: e.target.value } : null))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Input
                  value={selectedProperty.description || ""}
                  onChange={(e) =>
                    setSelectedProperty((prev) =>
                      prev ? { ...prev, description: e.target.value } : null
                    )
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Default value</Label>
                <Input
                  value={selectedProperty.defaultValue || ""}
                  onChange={(e) =>
                    setSelectedProperty((prev) =>
                      prev ? { ...prev, defaultValue: e.target.value } : null
                    )
                  }
                />
              </div>
              {(selectedProperty.type === "single_select" ||
                selectedProperty.type === "multi_select") && (
                <div className="space-y-2">
                  <Label>Options (comma-separated)</Label>
                  <Input
                    value={selectedProperty.options?.join(", ") || ""}
                    onChange={(e) =>
                      setSelectedProperty((prev) =>
                        prev
                          ? {
                              ...prev,
                              options: e.target.value
                                .split(",")
                                .map((s) => s.trim())
                                .filter(Boolean),
                            }
                          : null
                      )
                    }
                  />
                </div>
              )}
              <div className="flex items-center gap-2">
                <Switch
                  checked={selectedProperty.required}
                  onCheckedChange={(checked) =>
                    setSelectedProperty((prev) => (prev ? { ...prev, required: checked } : null))
                  }
                />
                <Label>Required property</Label>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateProperty}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
