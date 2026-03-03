"use client";

import * as React from "react";
import { DashboardLeft } from "@/components/dashboard/DashboardLeft";
import { DashboardCenter } from "@/components/dashboard/DashboardCenter";
import { DashboardRight } from "@/components/dashboard/DashboardRight";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-400 mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3 xl:col-span-2">
            <DashboardLeft />
          </div>

          <div className="lg:col-span-6 xl:col-span-7">
            <DashboardCenter />
          </div>

          <div className="lg:col-span-3 xl:col-span-3">
            <DashboardRight />
          </div>
        </div>
      </div>
    </div>
  );
}
