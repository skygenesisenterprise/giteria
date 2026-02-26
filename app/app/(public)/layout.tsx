import type { Metadata } from "next";
// import { AuthProvider } from "@/context/AuthContext";
import { DashboardLayout } from "@/components/DashboardLayout";
import * as React from "react";
import Footer from "./_components/Footer";
import Navbar from "./_components/Navbar";

export const metadata: Metadata = {
  title: "Giteria - The code platform for everyone",
  description:
    "Painless self-hosted all-in-one software development service, including Git hosting, code review, team collaboration, package registry and CI/CD",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="font-sans antialiased">
        <Navbar />
        {/* <AuthProvider>
          <DashboardLayout>{children}</DashboardLayout>
          {/* <Toaster /> */}
        {/* </AuthProvider> */}
        <DashboardLayout>
          {children}
          <Footer />
        </DashboardLayout>
      </body>
    </html>
  );
}
