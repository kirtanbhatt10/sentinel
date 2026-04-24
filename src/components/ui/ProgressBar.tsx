"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  label: string;
  value: number;
  colorClass?: string;
}

export function ProgressBar({ label, value, colorClass = "from-primary to-emerald-400" }: ProgressBarProps) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // Delay slightly to ensure animation triggers after initial render
    const timeout = setTimeout(() => setWidth(value), 100);
    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <div className="w-full">
      <div className="flex justify-between text-sm mb-2">
        <span className="text-gray-400">{label}</span>
        <span className="font-semibold text-white">{value}%</span>
      </div>
      <div className="w-full bg-gray-800/50 rounded-full h-2.5 overflow-hidden border border-white/5 relative">
        <div
          className={cn(
            "absolute top-0 left-0 h-full rounded-full transition-all duration-[1500ms] ease-out bg-gradient-to-r",
            colorClass
          )}
          style={{ width: `${width}%` }}
        >
          {/* Subtle glow highlight on the bar */}
          <div className="absolute top-0 right-0 bottom-0 w-10 bg-gradient-to-r from-transparent to-white/30 blur-sm"></div>
        </div>
      </div>
    </div>
  );
}
