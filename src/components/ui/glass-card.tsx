"use client";

import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { motion } from "framer-motion";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  breathing?: boolean;
}

export function GlassCard({ children, className, breathing }: GlassCardProps) {
  return (
    <motion.div
      whileHover={{ y: -1 }}
      transition={{ duration: 0.08, ease: "easeOut" }}
      className={cn(
        "relative overflow-hidden rounded-lg border border-border/50 bg-card/80 p-5 backdrop-blur-md",
        "shadow-sm hover:shadow-lg transition-all",
        breathing && "animate-pulse",
        className
      )}
    >
      <div className="relative z-10 flex flex-col h-full">{children}</div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white/[0.07] to-transparent opacity-0 transition-opacity duration-100 hover:opacity-100" />
    </motion.div>
  );
}

GlassCard.Header = function GlassCardHeader({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("flex flex-row items-center justify-between mb-2", className)}>{children}</div>;
};

GlassCard.Icon = function GlassCardIcon({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("inline-flex items-center justify-center text-primary", className)}>
      {children}
    </div>
  );
};

GlassCard.Title = function GlassCardTitle({ children, className }: { children: ReactNode; className?: string }) {
  return <h3 className={cn("text-[10px] md:text-xs font-mono font-semibold tracking-widest uppercase text-muted-foreground", className)}>{children}</h3>;
};

GlassCard.Body = function GlassCardBody({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("text-2xl font-bold mt-1 text-foreground", className)}>{children}</div>;
};

GlassCard.Link = function GlassCardLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link href={href} className={cn("mt-4 inline-block text-sm font-medium text-primary hover:underline", className)}>
      {children}
    </Link>
  );
};
