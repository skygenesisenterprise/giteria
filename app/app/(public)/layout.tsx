import type { Metadata } from "next";
import "@/styles/globals.css";
// import { AuthProvider } from "@/context/AuthContext";
import { DashboardLayout } from "@/components/DashboardLayout";

export const metadata: Metadata = {
  title: "Giteria - The code platform for everyone",
  description: "Painless self-hosted all-in-one software development service, including Git hosting, code review, team collaboration, package registry and CI/CD",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="font-sans antialiased">
        {/* <AuthProvider>
          <DashboardLayout>{children}</DashboardLayout>
          {/* <Toaster /> */}
        {/* </AuthProvider> */}
        <DashboardLayout>{children}</DashboardLayout>
      </body>
    </html>
  );
}
