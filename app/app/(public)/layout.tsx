import type { Metadata } from "next";
import { DashboardLayout } from "@/components/DashboardLayout";
import * as React from "react";
import Footer from "./_components/Footer";
import Navbar from "./_components/Navbar";

export const metadata: Metadata = {
  title: "Giteria - The code platform for everyone",
  description:
    "Painless self-hosted all-in-one software development service, including Git hosting, code review, team collaboration, package registry and CI/CD",
};

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <DashboardLayout>
        {children}
        <Footer />
      </DashboardLayout>
    </>
  );
}
