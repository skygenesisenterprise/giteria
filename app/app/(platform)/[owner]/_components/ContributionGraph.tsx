"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface ContributionGraphProps {
  username: string;
  year?: number;
}

const LEVEL_COLORS = {
  0: "bg-muted/20",
  1: "bg-primary/30",
  2: "bg-primary/50",
  3: "bg-primary/70",
  4: "bg-primary",
};

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function generateContributions(year: number): ContributionDay[] {
  const days: ContributionDay[] = [];
  const startDate = new Date(year, 0, 1);
  const endDate = new Date(year, 11, 31);

  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().split("T")[0];
    const random = Math.random();
    let level: 0 | 1 | 2 | 3 | 4 = 0;

    if (random > 0.4) level = 1;
    if (random > 0.6) level = 2;
    if (random > 0.8) level = 3;
    if (random > 0.95) level = 4;

    days.push({ date: dateStr, count: level * Math.floor(Math.random() * 5 + 1), level });
  }

  return days;
}

export function ContributionGraph({ username, year = 2026 }: ContributionGraphProps) {
  const [currentYear, setCurrentYear] = React.useState(year);
  const contributions = React.useMemo(() => generateContributions(currentYear), [currentYear]);

  const totalContributions = contributions.reduce((sum, day) => sum + day.count, 0);

  const weeks: ContributionDay[][] = [];
  let currentWeek: ContributionDay[] = [];

  const firstDay = new Date(currentYear, 0, 1);
  const startDayOfWeek = firstDay.getDay();

  for (let i = 0; i < startDayOfWeek; i++) {
    currentWeek.push({ date: "", count: 0, level: 0 });
  }

  contributions.forEach((day, index) => {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push({ date: "", count: 0, level: 0 });
    }
    weeks.push(currentWeek);
  }

  const years = [2026, 2025, 2024, 2023, 2022, 2021, 2020];

  return (
    <div className="p-4 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <select
            value={currentYear}
            onChange={(e) => setCurrentYear(Number(e.target.value))}
            className="bg-transparent text-sm font-medium text-foreground focus:outline-none"
          >
            {years.map((y) => (
              <option key={y} value={y} className="bg-card text-foreground">
                {y}
              </option>
            ))}
          </select>
          <span className="text-sm text-muted-foreground">
            {totalContributions.toLocaleString()} contributions
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentYear(currentYear - 1)}
            className="p-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentYear(currentYear + 1)}
            className="p-1 text-muted-foreground hover:text-foreground transition-colors"
            disabled={currentYear >= new Date().getFullYear()}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto pb-2">
        <div className="flex gap-1">
          <div className="flex flex-col gap-1 mr-1 text-xs text-muted-foreground">
            <span className="h-3"></span>
            <span className="h-3">Mon</span>
            <span className="h-3"></span>
            <span className="h-3">Wed</span>
            <span className="h-3"></span>
            <span className="h-3">Fri</span>
            <span className="h-3"></span>
          </div>

          <div className="flex gap-0.5">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-0.5">
                {week.map((day, dayIndex) => (
                  <div
                    key={dayIndex}
                    className={`w-3 h-3 rounded-sm ${
                      day.date ? LEVEL_COLORS[day.level] : "bg-transparent"
                    }`}
                    title={day.date ? `${day.count} contributions on ${day.date}` : ""}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 mt-3 text-xs text-muted-foreground">
        <span>Less</span>
        <div className="flex gap-0.5">
          <div className={`w-3 h-3 rounded-sm ${LEVEL_COLORS[0]}`} />
          <div className={`w-3 h-3 rounded-sm ${LEVEL_COLORS[1]}`} />
          <div className={`w-3 h-3 rounded-sm ${LEVEL_COLORS[2]}`} />
          <div className={`w-3 h-3 rounded-sm ${LEVEL_COLORS[3]}`} />
          <div className={`w-3 h-3 rounded-sm ${LEVEL_COLORS[4]}`} />
        </div>
        <span>More</span>
      </div>
    </div>
  );
}
