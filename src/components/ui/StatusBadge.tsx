import React from "react";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  let colorStyles = "bg-gray-500/20 text-gray-300 border-gray-500/30";

  const s = status.toLowerCase();
  if (["high", "critical"].includes(s)) {
    colorStyles = "bg-red-500/20 text-red-400 border-red-500/30 shadow-[0_0_10px_rgba(239,68,68,0.2)]";
  } else if (s === "medium") {
    colorStyles = "bg-yellow-500/20 text-yellow-400 border-yellow-500/30 shadow-[0_0_10px_rgba(234,179,8,0.2)]";
  } else if (s === "low" || s === "protected" || s === "active") {
    colorStyles = "bg-primary/20 text-primary border-primary/30 shadow-[0_0_10px_rgba(0,255,136,0.2)]";
  }

  return (
    <span
      className={cn(
        "px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-md flex items-center justify-center whitespace-nowrap",
        colorStyles,
        className
      )}
    >
      {status}
    </span>
  );
}
