"use client";

import React from "react";
import { Zen_Dots } from "next/font/google";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const zenDots = Zen_Dots({
  weight: "400",
  subsets: ["latin"],
});

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  animated?: boolean;
}

export function Logo({ className, size = "md", animated = false }: LogoProps) {
  const sizeClasses = {
    sm: "text-2xl",
    md: "text-3xl",
    lg: "text-5xl",
    xl: "text-6xl md:text-7xl",
  };

  const letterVariants: Variants = {
    hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 100, damping: 10 }
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const text = "SENTINEL";

  if (!animated) {
    return (
      <div className={cn("flex items-center justify-center select-none relative group", className)}>
        <div className={cn(zenDots.className, "text-white tracking-[0.15em] flex", sizeClasses[size])}>
          {text}
        </div>
        <div className="absolute inset-0 bg-primary/20 blur-[12px] -z-10 rounded-full opacity-20" />
      </div>
    );
  }

  return (
    <motion.div
      whileHover="hover"
      initial="hidden"
      animate="visible"
      className={cn(
        "flex items-center justify-center cursor-pointer select-none",
        className
      )}
    >
      <motion.div
        variants={containerVariants}
        className={cn(
          zenDots.className,
          "text-white tracking-[0.15em] flex",
          sizeClasses[size]
        )}
      >
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            variants={letterVariants}
            className="relative inline-block transition-all duration-300"
          >
            {char}
          </motion.span>
        ))}
      </motion.div>
      
      {/* Dynamic Glow Layer */}
      <motion.div 
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 0.2 },
          hover: { opacity: 0.2 }
        }}
        transition={{ duration: 1.5, ease: "linear" }}
        className="absolute inset-0 bg-primary/20 blur-[12px] -z-10 rounded-full"
      />
    </motion.div>
  );
}
