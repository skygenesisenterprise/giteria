import { db, STORES } from "@/lib/db";
import { getGitHubToken } from "./github-token";
import { getRepository } from "./repo/RepositoryData";

export interface WorkflowFile {
  id: string;
  name: string;
  path: string;
  repoFullName: string;
  content?: string;
}

export interface WorkflowRun {
  id: string;
  workflowId: string;
  workflowName: string;
  repoFullName: string;
  commit: string;
  branch: string;
  status: "success" | "failed" | "running" | "queued" | "pending" | "cancelled";
  conclusion?: string | null;
  duration: string;
  createdAt: string;
  updatedAt: string;
  url?: string;
}

export async function fetchAndCacheWorkflowFiles(
  owner: string,
  repo: string
): Promise<WorkflowFile[]> {
  const repoFullName = `${owner}/${repo}`;

  try {
    const repository = await getRepository(owner, repo);

    if (!repository?.mirrorFrom) {
      return getWorkflowFilesFromDB(repoFullName);
    }

    const githubMatch = repository.mirrorFrom.match(/github\.com[/:]([^\/]+)\/([^\/]+)/);
    if (!githubMatch) {
      return getWorkflowFilesFromDB(repoFullName);
    }

    const [, mirrorOwner, mirrorRepo] = githubMatch;
    const repoName = mirrorRepo.replace(/\.git$/, "");

    const token = await getGitHubToken();
    const headers: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const workflowsPath = ".github/workflows";
    const response = await fetch(
      `https://api.github.com/repos/${mirrorOwner}/${repoName}/contents/${workflowsPath}`,
      { headers }
    );

    if (!response.ok) {
      return getWorkflowFilesFromDB(repoFullName);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      return getWorkflowFilesFromDB(repoFullName);
    }

    const workflows: WorkflowFile[] = data
      .filter(
        (item: { name?: string }) => item.name?.endsWith(".yml") || item.name?.endsWith(".yaml")
      )
      .map((item: { name: string; path: string; sha: string }) => ({
        id: `${repoFullName}:${item.name.replace(/\.(yml|yaml)$/, "")}`,
        name: item.name.replace(/\.(yml|yaml)$/, ""),
        path: item.path,
        repoFullName,
      }));

    await db.clear(STORES.WORKFLOWS);
    for (const workflow of workflows) {
      await db.put(STORES.WORKFLOWS, workflow);
    }

    return workflows;
  } catch {
    return getWorkflowFilesFromDB(repoFullName);
  }
}

export async function fetchAndCacheWorkflowRuns(
  owner: string,
  repo: string,
  perPage: number = 20
): Promise<WorkflowRun[]> {
  const repoFullName = `${owner}/${repo}`;

  try {
    const repository = await getRepository(owner, repo);

    if (!repository?.mirrorFrom) {
      return getWorkflowRunsFromDB(repoFullName);
    }

    const githubMatch = repository.mirrorFrom.match(/github\.com[/:]([^\/]+)\/([^\/]+)/);
    if (!githubMatch) {
      return getWorkflowRunsFromDB(repoFullName);
    }

    const [, mirrorOwner, mirrorRepo] = githubMatch;
    const repoName = mirrorRepo.replace(/\.git$/, "");

    const token = await getGitHubToken();
    const headers: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(
      `https://api.github.com/repos/${mirrorOwner}/${repoName}/actions/runs?per_page=${perPage}`,
      { headers }
    );

    if (!response.ok) {
      return getWorkflowRunsFromDB(repoFullName);
    }

    const data = await response.json();

    if (!data.workflow_runs) {
      return getWorkflowRunsFromDB(repoFullName);
    }

    const runs: WorkflowRun[] = data.workflow_runs.map(
      (run: {
        id: number;
        name: string;
        workflow_id: number;
        head_sha: string;
        head_branch: string;
        status: string;
        conclusion: string | null;
        created_at: string;
        updated_at: string;
        run_started_at: string;
        html_url: string;
      }) => ({
        id: String(run.id),
        workflowId: String(run.workflow_id),
        workflowName: run.name || "Unknown",
        repoFullName,
        commit: run.head_sha,
        branch: run.head_branch,
        status: mapStatus(run.status, run.conclusion),
        conclusion: run.conclusion,
        duration: calculateDuration(run.run_started_at, run.updated_at),
        createdAt: run.created_at,
        updatedAt: run.updated_at,
        url: run.html_url,
      })
    );

    await db.clear(STORES.WORKFLOW_RUNS);
    for (const run of runs) {
      await db.put(STORES.WORKFLOW_RUNS, run);
    }

    return runs;
  } catch {
    return getWorkflowRunsFromDB(repoFullName);
  }
}

async function getWorkflowFilesFromDB(repoFullName: string): Promise<WorkflowFile[]> {
  try {
    return await db.getAllByIndex<WorkflowFile>(STORES.WORKFLOWS, "repoFullName", repoFullName);
  } catch {
    return [];
  }
}

async function getWorkflowRunsFromDB(repoFullName: string): Promise<WorkflowRun[]> {
  try {
    return await db.getAllByIndex<WorkflowRun>(STORES.WORKFLOW_RUNS, "repoFullName", repoFullName);
  } catch {
    return [];
  }
}

function mapStatus(status: string, conclusion: string | null): WorkflowRun["status"] {
  if (status === "queued" || status === "pending") return "queued";
  if (status === "in_progress") return "running";
  if (status === "completed") {
    if (conclusion === "success") return "success";
    if (conclusion === "failure") return "failed";
    if (conclusion === "cancelled") return "cancelled";
  }
  if (status === "cancelled") return "cancelled";
  return "pending";
}

function calculateDuration(startedAt: string, updatedAt: string): string {
  if (!startedAt || !updatedAt) return "-";

  const start = new Date(startedAt);
  const end = new Date(updatedAt);
  const seconds = Math.floor((end.getTime() - start.getTime()) / 1000);

  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  if (minutes < 60) return `${minutes}m ${remainingSeconds}s`;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
}
