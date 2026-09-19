"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export const FloatingSparkles = ({
  className,
  sparkleCount = 40,
}: {
  className?: string;
  sparkleCount?: number;
}) => {
  const [sparkles, setSparkles] = useState<
    { id: string; top: string; left: string; size: number; delay: number; duration: number }[]
  >([]);

  useEffect(() => {
    const generateSparkles = () => {
      return Array.from({ length: sparkleCount }).map((_, i) => ({
        id: `sparkle-${i}`,
        top: `${random(0, 100)}%`,
        left: `${random(0, 100)}%`,
        size: random(8, 20),
        delay: random(0, 5000) / 1000,
        duration: random(2000, 6000) / 1000,
      }));
    };
    setSparkles(generateSparkles());
  }, [sparkleCount]);

  return (
    <div className={cn("absolute inset-0 pointer-events-none overflow-hidden", className)}>
      <AnimatePresence>
        {sparkles.map((sparkle) => (
          <motion.div
            key={sparkle.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0],
              rotate: [0, 90, 180],
            }}
            transition={{
              duration: sparkle.duration,
              delay: sparkle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute text-primary/40 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
            style={{
              top: sparkle.top,
              left: sparkle.left,
              width: sparkle.size,
              height: sparkle.size,
            }}
          >
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 160 160"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M80 0C80 0 84.2846 41.2925 101.496 58.504C118.707 75.7154 160 80 160 80C160 80 118.707 84.2846 101.496 101.496C84.2846 118.707 80 160 80 160C80 160 75.7154 118.707 58.504 101.496C41.2925 84.2846 0 80 0 80C0 80 41.2925 75.7154 58.504 58.504C75.7154 41.2925 80 0 80 0Z"
                fill="currentColor"
              />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
