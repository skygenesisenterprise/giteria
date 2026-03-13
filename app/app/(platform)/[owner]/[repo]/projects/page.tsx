"use client";

import * as React from "react";
import { use } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { db, STORES } from "@/lib/db";

interface ProjectsPageProps {
  params: Promise<{ owner: string; repo: string }>;
}

interface ProjectMetrics {
  openItems: number;
  mergedPulls: number;
  closedIssues: number;
  activeMilestones: number;
}

interface ProjectColumn {
  id: string;
  name: string;
  items: number;
  emphasis?: "default" | "highlight";
}

interface ProjectRoadmapItem {
  id: string;
  title: string;
  target: string;
  status: "planning" | "building" | "shipped";
  progress: number;
  category: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  status: "active" | "paused" | "completed";
  visibility: "public" | "private";
  lead: string;
  progress: number;
  updatedAt: string;
  columns: ProjectColumn[];
  roadmap: ProjectRoadmapItem[];
}

interface LinkedItem {
  id: string;
  number: number;
  title: string;
  state: "open" | "closed" | "merged";
  type: "issue" | "pull";
  updatedAt: number;
  author: string;
}

interface LocalIssue {
  id: string;
  number: number;
  title: string;
  state: "open" | "closed";
  repoFullName: string;
  author: string;
  updatedAt: number;
}

interface LocalPullRequest {
  id: string;
  number: number;
  title: string;
  state: "open" | "closed" | "merged";
  repoFullName: string;
  author: string;
  updatedAt: number;
}

const initialProjects: Project[] = [
  {
    id: "roadmap",
    name: "Giteria Roadmap",
    description: "Piloter les grandes sorties, aligner les maintainers et la communauté.",
    status: "active",
    visibility: "public",
    lead: "Core Maintainers",
    progress: 62,
    updatedAt: "2026-03-04",
    columns: [
      { id: "backlog", name: "Backlog", items: 18 },
      { id: "building", name: "En cours", items: 7, emphasis: "highlight" },
      { id: "review", name: "En revue", items: 4 },
      { id: "done", name: "Livré", items: 26 },
    ],
    roadmap: [
      {
        id: "r1",
        title: "Vue projet unifiée",
        target: "Avril 2026",
        status: "building",
        progress: 68,
        category: "Expérience dev",
      },
      {
        id: "r2",
        title: "Automatisation des workflows",
        target: "Mai 2026",
        status: "planning",
        progress: 34,
        category: "Ops",
      },
      {
        id: "r3",
        title: "Relance de la version mobile",
        target: "Juin 2026",
        status: "planning",
        progress: 18,
        category: "Produit",
      },
    ],
  },
  {
    id: "contributors",
    name: "Contributions & Quality",
    description: "Suivre la dette technique, les revues et les contributions externes.",
    status: "active",
    visibility: "private",
    lead: "Release Captain",
    progress: 41,
    updatedAt: "2026-03-02",
    columns: [
      { id: "triage", name: "Triage", items: 12, emphasis: "highlight" },
      { id: "in-progress", name: "En cours", items: 9 },
      { id: "review", name: "Validation", items: 6 },
      { id: "done", name: "Clôturé", items: 19 },
    ],
    roadmap: [
      {
        id: "r4",
        title: "Process de review rapide",
        target: "Avril 2026",
        status: "building",
        progress: 55,
        category: "Qualité",
      },
      {
        id: "r5",
        title: "Guide contributeur v2",
        target: "Mai 2026",
        status: "planning",
        progress: 22,
        category: "Communauté",
      },
    ],
  },
  {
    id: "launch",
    name: "Release 1.8",
    description: "Gérer le lancement, le monitoring et le support post-release.",
    status: "paused",
    visibility: "private",
    lead: "Product Ops",
    progress: 74,
    updatedAt: "2026-02-22",
    columns: [
      { id: "scope", name: "Scope", items: 6 },
      { id: "delivery", name: "Delivery", items: 3 },
      { id: "qa", name: "QA", items: 2, emphasis: "highlight" },
      { id: "done", name: "Ready", items: 11 },
    ],
    roadmap: [
      {
        id: "r6",
        title: "Checklist lancement",
        target: "Mars 2026",
        status: "building",
        progress: 82,
        category: "Release",
      },
      {
        id: "r7",
        title: "Suivi support post-release",
        target: "Avril 2026",
        status: "planning",
        progress: 40,
        category: "Support",
      },
    ],
  },
];

const templates = [
  {
    id: "template-1",
    title: "Roadmap produit",
    description: "Priorise les features avec un backlog et une timeline.",
  },
  {
    id: "template-2",
    title: "Suivi de livraison",
    description: "Conçu pour les releases, QA et go-live.",
  },
  {
    id: "template-3",
    title: "Qualité & contributions",
    description: "Centralise les PR, issues et revues communautaires.",
  },
];

const automations = [
  {
    id: "auto-1",
    title: "Tri automatique",
    detail: "Classe les issues par labels et priorité.",
    status: "active",
  },
  {
    id: "auto-2",
    title: "Sync PR",
    detail: "Ajoute chaque PR ouverte dans le projet actif.",
    status: "active",
  },
  {
    id: "auto-3",
    title: "Rappels review",
    detail: "Relance les reviewers après 48h.",
    status: "paused",
  },
];

const viewLabels: Record<"board" | "roadmap" | "table", string> = {
  board: "Board",
  roadmap: "Roadmap",
  table: "Tableau",
};

export default function ProjectsPage({ params }: ProjectsPageProps) {
  const resolvedParams = use(params);
  const [projects, setProjects] = React.useState<Project[]>(initialProjects);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<"all" | Project["status"]>("all");
  const [activeView, setActiveView] = React.useState<"board" | "roadmap" | "table">("board");
  const [selectedProjectId, setSelectedProjectId] = React.useState(initialProjects[0]?.id ?? "");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = React.useState(false);
  const [newProject, setNewProject] = React.useState({
    name: "",
    description: "",
    visibility: "private" as Project["visibility"],
  });
  const [linkedItems, setLinkedItems] = React.useState<LinkedItem[]>([]);
  const [metrics, setMetrics] = React.useState<ProjectMetrics>({
    openItems: 0,
    mergedPulls: 0,
    closedIssues: 0,
    activeMilestones: 0,
  });
  const [isLoadingItems, setIsLoadingItems] = React.useState(true);
  const [itemsError, setItemsError] = React.useState<string | null>(null);

  const repoFullName = `${resolvedParams.owner}/${resolvedParams.repo}`;

  const activeProject = React.useMemo(
    () => projects.find((project) => project.id === selectedProjectId) ?? projects[0],
    [projects, selectedProjectId]
  );
  const activeProjectKey = activeProject
    ? `${activeProject.id}:${activeProject.roadmap.length}`
    : "none";

  const filteredProjects = React.useMemo(() => {
    return projects.filter((project) => {
      const matchesQuery =
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "all" ? true : project.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [projects, searchQuery, statusFilter]);

  React.useEffect(() => {
    let isMounted = true;

    async function loadLinkedItems() {
      try {
        setIsLoadingItems(true);
        setItemsError(null);
        const [issues, pulls] = await Promise.all([
          db.getAllByIndex<LocalIssue>(STORES.ISSUES, "repoFullName", repoFullName),
          db.getAllByIndex<LocalPullRequest>(STORES.PULLS, "repoFullName", repoFullName),
        ]);

        if (!isMounted) return;

        const issueItems: LinkedItem[] = issues.map((issue) => ({
          id: issue.id,
          number: issue.number,
          title: issue.title,
          state: issue.state,
          type: "issue",
          updatedAt: issue.updatedAt,
          author: issue.author || "anonymous",
        }));

        const pullItems: LinkedItem[] = pulls.map((pull) => ({
          id: pull.id,
          number: pull.number,
          title: pull.title,
          state: pull.state,
          type: "pull",
          updatedAt: pull.updatedAt,
          author: pull.author || "anonymous",
        }));

        const allItems = [...issueItems, ...pullItems].sort((a, b) => b.updatedAt - a.updatedAt);

        const openItems = allItems.filter((item) => item.state === "open").length;
        const mergedPulls = pullItems.filter((pull) => pull.state === "merged").length;
        const closedIssues = issueItems.filter((issue) => issue.state === "closed").length;

        setLinkedItems(allItems.slice(0, 6));
        setMetrics({
          openItems,
          mergedPulls,
          closedIssues,
          activeMilestones: activeProject?.roadmap.length ?? 0,
        });
      } catch (error) {
        console.error("Failed to load project items:", error);
        if (isMounted) {
          setItemsError("Impossible de charger les issues et PR associées.");
        }
      } finally {
        if (isMounted) {
          setIsLoadingItems(false);
        }
      }
    }

    loadLinkedItems();

    return () => {
      isMounted = false;
    };
  }, [repoFullName, activeProjectKey]);

  const handleCreateProject = () => {
    if (!newProject.name.trim()) return;

    const created: Project = {
      id: `custom-${Date.now()}`,
      name: newProject.name.trim(),
      description: newProject.description.trim() || "Nouveau projet Giteria.",
      status: "active",
      visibility: newProject.visibility,
      lead: "Vous",
      progress: 0,
      updatedAt: new Date().toISOString().slice(0, 10),
      columns: [
        { id: "ideas", name: "Idées", items: 0 },
        { id: "in-progress", name: "En cours", items: 0, emphasis: "highlight" },
        { id: "review", name: "En revue", items: 0 },
        { id: "done", name: "Terminé", items: 0 },
      ],
      roadmap: [
        {
          id: `r-${Date.now()}`,
          title: "Phase d'initialisation",
          target: "Mai 2026",
          status: "planning",
          progress: 10,
          category: "Setup",
        },
      ],
    };

    setProjects((prev) => [created, ...prev]);
    setSelectedProjectId(created.id);
    setIsCreateDialogOpen(false);
    setNewProject({ name: "", description: "", visibility: "private" });
  };

  const statusBadge = (status: Project["status"]) => {
    const label = status === "active" ? "Actif" : status === "paused" ? "En pause" : "Terminé";

    return (
      <Badge
        variant={status === "active" ? "default" : "secondary"}
        className={cn(
          "uppercase tracking-wide",
          status === "paused" && "bg-muted text-muted-foreground",
          status === "completed" &&
            "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
        )}
      >
        {label}
      </Badge>
    );
  };

  const renderLinkedItem = (item: LinkedItem) => {
    const badgeLabel = item.type === "issue" ? "Issue" : "PR";
    const stateLabel =
      item.state === "open" ? "Ouvert" : item.state === "merged" ? "Merged" : "Fermé";

    return (
      <div key={item.id} className="flex items-start gap-3 rounded-lg border px-3 py-2">
        <div
          className={cn(
            "mt-1 h-2.5 w-2.5 rounded-full",
            item.state === "open" && "bg-blue-500",
            item.state === "merged" && "bg-emerald-500",
            item.state === "closed" && "bg-muted-foreground"
          )}
        />
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {badgeLabel} #{item.number}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {stateLabel}
            </Badge>
          </div>
          <p className="text-sm font-medium">{item.title}</p>
          <p className="text-xs text-muted-foreground">par {item.author}</p>
        </div>
      </div>
    );
  };

  if (!activeProject) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <h2 className="text-xl font-semibold">Aucun projet disponible</h2>
        <p className="text-muted-foreground mt-2">
          Créez votre premier projet pour commencer à organiser les issues et PR.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6">
        <header className="rounded-2xl border bg-muted/20 px-4 py-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {repoFullName}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border bg-background text-sm font-semibold">
                  GP
                </div>
                <div>
                  <h1 className="text-2xl font-semibold">Projets</h1>
                  <p className="text-sm text-muted-foreground">
                    Espace de pilotage inspiré GitHub, avec flexibilité Notion pour vos vues.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="outline" asChild>
                <Link href={`/${resolvedParams.owner}/${resolvedParams.repo}/issues`}>
                  Voir les issues
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href={`/${resolvedParams.owner}/${resolvedParams.repo}/pulls`}>
                  Voir les pull requests
                </Link>
              </Button>
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button>Créer un projet</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-130">
                  <DialogHeader>
                    <DialogTitle>Nouveau projet</DialogTitle>
                    <DialogDescription>
                      Définissez un projet pour orchestrer les contributions et la roadmap.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Nom du projet</label>
                      <Input
                        value={newProject.name}
                        onChange={(event) =>
                          setNewProject((prev) => ({ ...prev, name: event.target.value }))
                        }
                        placeholder="Ex: Roadmap Q2"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Description</label>
                      <Textarea
                        value={newProject.description}
                        onChange={(event) =>
                          setNewProject((prev) => ({ ...prev, description: event.target.value }))
                        }
                        placeholder="Objectifs, contexte et périmètre."
                        rows={4}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Visibilité</label>
                      <Select
                        value={newProject.visibility}
                        onValueChange={(value) =>
                          setNewProject((prev) => ({
                            ...prev,
                            visibility: value as Project["visibility"],
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choisir" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Public</SelectItem>
                          <SelectItem value="private">Privé</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter className="mt-4">
                    <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                      Annuler
                    </Button>
                    <Button onClick={handleCreateProject}>Créer</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-3 rounded-xl border bg-background/60 p-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-1 flex-wrap items-center gap-2">
              <Input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Rechercher un projet"
                className="max-w-sm"
              />
              <Select
                value={statusFilter}
                onValueChange={(value) => setStatusFilter(value as typeof statusFilter)}
              >
                <SelectTrigger className="w-45">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="active">Actif</SelectItem>
                  <SelectItem value="paused">En pause</SelectItem>
                  <SelectItem value="completed">Terminé</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Tabs
              value={activeView}
              onValueChange={(value) => setActiveView(value as typeof activeView)}
            >
              <TabsList>
                <TabsTrigger value="board">Board</TabsTrigger>
                <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
                <TabsTrigger value="table">Tableau</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)_320px]">
          <aside className="hidden space-y-4 lg:block">
            <div className="rounded-xl border bg-muted/20 p-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Vues
              </p>
              <div className="mt-3 space-y-2 text-sm">
                {Object.entries(viewLabels).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveView(key as keyof typeof viewLabels)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left transition",
                      activeView === key
                        ? "bg-background font-medium shadow-sm"
                        : "text-muted-foreground hover:bg-muted/40"
                    )}
                  >
                    <span>{label}</span>
                    <Badge variant="outline" className="text-[10px]">
                      {key === "board" ? "Kanban" : key === "roadmap" ? "Timeline" : "Table"}
                    </Badge>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-xl border bg-background p-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Collections
              </p>
              <div className="mt-3 space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center justify-between">
                  <span>Milestones</span>
                  <span>{activeProject.roadmap.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Colonnes</span>
                  <span>{activeProject.columns.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Items</span>
                  <span>{activeProject.columns.reduce((acc, col) => acc + col.items, 0)}</span>
                </div>
              </div>
            </div>
          </aside>

          <main className="space-y-6">
            <Card>
              <CardHeader className="space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <CardTitle>Vue repository</CardTitle>
                    <CardDescription>
                      Travaillez comme sur GitHub, composez vos vues comme dans Notion.
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {filteredProjects.length} projet
                    {filteredProjects.length > 1 ? "s" : ""}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {filteredProjects.length === 0 ? (
                  <div className="rounded-lg border border-dashed p-6 text-center">
                    <p className="font-medium">Aucun projet ne correspond aux filtres.</p>
                    <p className="text-sm text-muted-foreground">
                      Ajustez vos critères ou créez un nouveau projet.
                    </p>
                  </div>
                ) : (
                  filteredProjects.map((project) => (
                    <div
                      key={project.id}
                      className={cn(
                        "rounded-xl border px-4 py-3 transition hover:border-primary/40",
                        project.id === activeProject.id && "border-primary/40 bg-muted/30"
                      )}
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div className="space-y-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="text-base font-semibold">{project.name}</p>
                            {statusBadge(project.status)}
                            <Badge variant="outline" className="text-xs">
                              {project.visibility === "public" ? "Public" : "Privé"}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{project.description}</p>
                          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                            <span>Lead: {project.lead}</span>
                            <span>Maj: {project.updatedAt}</span>
                            <span>
                              {project.columns.reduce((acc, col) => acc + col.items, 0)} items
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Button
                            variant={project.id === activeProject.id ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedProjectId(project.id)}
                          >
                            Ouvrir
                          </Button>
                          <Button variant="ghost" size="sm">
                            Paramètres
                          </Button>
                        </div>
                      </div>
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>Progression</span>
                          <span>{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} />
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <CardTitle>Espace de travail</CardTitle>
                    <CardDescription>
                      Composez votre vue active ({viewLabels[activeView].toLowerCase()}) et gardez
                      le rythme.
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {activeProject.columns.reduce((acc, col) => acc + col.items, 0)} items
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <Select
                    value={activeProject.id}
                    onValueChange={(value) => setSelectedProjectId(value)}
                  >
                    <SelectTrigger className="w-60">
                      <SelectValue placeholder="Choisir un projet" />
                    </SelectTrigger>
                    <SelectContent>
                      {projects.map((project) => (
                        <SelectItem key={project.id} value={project.id}>
                          {project.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Badge variant="secondary" className="text-xs">
                    {activeProject.roadmap.length} milestones
                  </Badge>
                </div>

                <Tabs
                  value={activeView}
                  onValueChange={(value) => setActiveView(value as typeof activeView)}
                >
                  <TabsContent value="board" className="space-y-4">
                    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                      {activeProject.columns.map((column) => (
                        <div
                          key={column.id}
                          className={cn(
                            "rounded-lg border bg-muted/10 p-3",
                            column.emphasis === "highlight" && "border-primary/40 bg-primary/5"
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-semibold">{column.name}</p>
                            <Badge variant="outline" className="text-xs">
                              {column.items}
                            </Badge>
                          </div>
                          <div className="mt-3 space-y-2">
                            {Array.from({ length: Math.max(2, Math.min(column.items, 3)) }).map(
                              (_, index) => (
                                <div
                                  key={`${column.id}-${index}`}
                                  className="rounded-md border bg-background px-2 py-2 text-xs text-muted-foreground"
                                >
                                  Contribution {index + 1}
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="roadmap" className="space-y-4">
                    {activeProject.roadmap.map((item) => (
                      <div key={item.id} className="rounded-lg border p-4">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <p className="font-semibold">{item.title}</p>
                            <p className="text-xs text-muted-foreground">{item.category}</p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {item.target}
                          </Badge>
                        </div>
                        <div className="mt-3 space-y-2">
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>
                              {item.status === "planning"
                                ? "Planification"
                                : item.status === "building"
                                  ? "Construction"
                                  : "Livré"}
                            </span>
                            <span>{item.progress}%</span>
                          </div>
                          <Progress value={item.progress} />
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                  <TabsContent value="table" className="space-y-4">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Projet</TableHead>
                          <TableHead>Statut</TableHead>
                          <TableHead>Lead</TableHead>
                          <TableHead>Progression</TableHead>
                          <TableHead>Mise à jour</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {projects.map((project) => (
                          <TableRow key={project.id}>
                            <TableCell className="font-medium">{project.name}</TableCell>
                            <TableCell>{statusBadge(project.status)}</TableCell>
                            <TableCell>{project.lead}</TableCell>
                            <TableCell>{project.progress}%</TableCell>
                            <TableCell>{project.updatedAt}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </main>

          <aside className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Insights</CardTitle>
                <CardDescription>Vue synthèse des contributions et milestones.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-lg border bg-muted/20 px-3 py-2">
                    <p className="text-xs text-muted-foreground">Items ouverts</p>
                    <p className="text-2xl font-semibold">{metrics.openItems}</p>
                  </div>
                  <div className="rounded-lg border bg-muted/20 px-3 py-2">
                    <p className="text-xs text-muted-foreground">PR mergées</p>
                    <p className="text-2xl font-semibold">{metrics.mergedPulls}</p>
                  </div>
                  <div className="rounded-lg border bg-muted/20 px-3 py-2">
                    <p className="text-xs text-muted-foreground">Issues fermées</p>
                    <p className="text-2xl font-semibold">{metrics.closedIssues}</p>
                  </div>
                  <div className="rounded-lg border bg-muted/20 px-3 py-2">
                    <p className="text-xs text-muted-foreground">Milestones actives</p>
                    <p className="text-2xl font-semibold">{metrics.activeMilestones}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-end">
                <Button variant="outline" size="sm">
                  Exporter
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contributions récentes</CardTitle>
                <CardDescription>Issues et PR proposées par les contributeurs.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {isLoadingItems && <p className="text-sm text-muted-foreground">Chargement...</p>}
                {itemsError && <p className="text-sm text-destructive">{itemsError}</p>}
                {!isLoadingItems && !itemsError && linkedItems.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    Aucune contribution locale n'est disponible.
                  </p>
                )}
                {linkedItems.map(renderLinkedItem)}
              </CardContent>
              <CardFooter className="justify-end">
                <Button variant="ghost" asChild>
                  <Link href={`/${resolvedParams.owner}/${resolvedParams.repo}/issues`}>
                    Gérer les issues
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Automatisations</CardTitle>
                <CardDescription>
                  Gardez le projet synchronisé avec les contributions.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {automations.map((automation) => (
                  <div key={automation.id} className="rounded-lg border p-3">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{automation.title}</p>
                      <Badge
                        variant={automation.status === "active" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {automation.status === "active" ? "Actif" : "Pause"}
                      </Badge>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{automation.detail}</p>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="justify-end">
                <Button variant="outline" size="sm">
                  Configurer
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Templates</CardTitle>
                <CardDescription>Démarrez vite avec des modèles prêts à l'emploi.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {templates.map((template) => (
                  <div key={template.id} className="rounded-lg border p-3">
                    <p className="text-sm font-medium">{template.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{template.description}</p>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="justify-end">
                <Button variant="ghost" size="sm">
                  Explorer la galerie
                </Button>
              </CardFooter>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}
