"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface MetricCardProps {
  title: string;
  value: React.ReactNode;
  icon: React.ReactNode;
  valueColorClass?: string;
  className?: string;
}

export function MetricCard({ title, value, icon, valueColorClass = "text-white", className }: MetricCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
      className={cn(
        "glass-panel rounded-2xl p-6 relative overflow-hidden group border border-white/5 hover:border-primary/20 transition-colors",
        className
      )}
    >
      {/* Subtle glow effect behind icon */}
      <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors duration-500" />
      
      <div className="flex items-center gap-4 mb-4 relative z-10">
        <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-gray-300 group-hover:text-primary transition-colors duration-300">
          {icon}
        </div>
        <p className="text-gray-400 font-medium">{title}</p>
      </div>
      
      <h2 className={cn("text-3xl font-bold tracking-tight relative z-10", valueColorClass)}>
        {value}
      </h2>
    </motion.div>
  );
}
