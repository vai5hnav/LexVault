"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const AuroraBackground = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative flex flex-col h-full w-full bg-background overflow-hidden",
        className
      )}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
          }}
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Infinity,
          }}
          className="absolute -inset-[100%] opacity-20 blur-3xl"
          style={{
            background:
              "radial-gradient(circle at center, rgba(147, 51, 234, 0.4) 0%, rgba(59, 130, 246, 0.4) 30%, transparent 60%)",
            backgroundSize: "200% 200%",
          }}
        />
        <motion.div
          animate={{
            backgroundPosition: ["100% 100%", "0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 25,
            ease: "linear",
            repeat: Infinity,
          }}
          className="absolute -inset-[100%] opacity-20 blur-3xl"
          style={{
            background:
              "radial-gradient(circle at center, rgba(6, 182, 212, 0.4) 0%, rgba(139, 92, 246, 0.4) 40%, transparent 60%)",
            backgroundSize: "150% 150%",
          }}
        />
      </div>
      <div className="relative z-10 h-full w-full flex flex-col">{children}</div>
    </div>
  );
};
