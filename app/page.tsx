import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/app/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Dashboard - Giteria",
  description: "Your Git platform dashboard",
};

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back to your Git platform</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Your Repositories</CardTitle>
            <CardDescription>Manage your Git repositories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-4">12</div>
            <Link href="/repos">
              <Button variant="outline" size="sm">View All</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Organizations</CardTitle>
            <CardDescription>Collaborate with teams</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-4">3</div>
            <Link href="/orgs">
              <Button variant="outline" size="sm">View All</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Models</CardTitle>
            <CardDescription>Your AI assistants</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-4">5</div>
            <Link href="/models">
              <Button variant="outline" size="sm">Manage Models</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest commits and pull requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Pushed to main</p>
                  <p className="text-xs text-muted-foreground">my-repo • 2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Pull request merged</p>
                  <p className="text-xs text-muted-foreground">another-repo • 5 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Issue created</p>
                  <p className="text-xs text-muted-foreground">project-repo • 1 day ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Link href="/repos/new">
                <Button className="w-full justify-start" variant="outline">
                  Create New Repository
                </Button>
              </Link>
              <Link href="/orgs/new">
                <Button className="w-full justify-start" variant="outline">
                  Create Organization
                </Button>
              </Link>
              <Link href="/models/new">
                <Button className="w-full justify-start" variant="outline">
                  Add AI Model
                </Button>
              </Link>
              <Link href="/settings">
                <Button className="w-full justify-start" variant="outline">
                  Settings
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}