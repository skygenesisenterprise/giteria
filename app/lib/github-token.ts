import { db, STORES } from "@/lib/db";

const GITHUB_TOKEN_ID = "github_token";

export async function getGitHubToken(): Promise<string | null> {
  try {
    const result = await db.get<{ id: string; value: string }>(STORES.SETTINGS, GITHUB_TOKEN_ID);
    return result?.value || null;
  } catch {
    return null;
  }
}

export async function setGitHubToken(token: string): Promise<void> {
  await db.put(STORES.SETTINGS, { id: GITHUB_TOKEN_ID, value: token });
}

export async function clearGitHubToken(): Promise<void> {
  await db.delete(STORES.SETTINGS, GITHUB_TOKEN_ID);
}
