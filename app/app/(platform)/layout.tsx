import type { Metadata } from "next";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Header } from "./_components/Header";
import { Footer } from "./_components/Footer";

export const metadata: Metadata = {
  title: "Giteria - The code platform for everyone",
  description:
    "Painless self-hosted all-in-one software development service, including Git hosting, code review, team collaboration, package registry and CI/CD",
};

export default function PlatformLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="font-sans antialiased">
        <DashboardLayout>
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
        </DashboardLayout>
      </body>
    </html>
  );
}
