import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s - Giteria",
    default: "Giteria",
  },
  description:
    "Giteria - Where the world builds software. Access repositories, collaborate on code, and manage your projects.",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md space-y-6">{children}</div>
    </div>
  );
}
