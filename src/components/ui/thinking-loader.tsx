"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const defaultPhrases = [
  "Initializing Zero-Knowledge circuits...",
  "Synthesizing cryptographic proofs...",
  "Validating tamper-evident hashes...",
  "Securing vault access...",
];

export const ThinkingLoader = ({
  phrases = defaultPhrases,
  className,
}: {
  phrases?: string[];
  className?: string;
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 2000); // Change phrase every 2 seconds
    return () => clearInterval(interval);
  }, [phrases]);

  return (
    <div className={cn("flex flex-col items-center justify-center space-y-4", className)}>
      <div className="flex space-x-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-primary"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      <div className="h-6 overflow-hidden relative w-64 text-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-sm font-medium text-muted-foreground absolute inset-0 flex justify-center w-full"
          >
            {phrases[index]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
};
