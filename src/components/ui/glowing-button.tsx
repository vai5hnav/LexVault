"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";

export const GlowingButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className="relative group inline-block">
        <motion.div
          className="absolute -inset-0.5 bg-gradient-to-r from-primary to-purple-600 rounded-lg blur opacity-40 group-hover:opacity-75 transition duration-500 group-hover:duration-75"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ backgroundSize: "200% auto" }}
        />
        <Button
          ref={ref}
          className={cn("relative z-10 w-full h-full", className)}
          {...props}
        >
          {children}
        </Button>
      </div>
    );
  }
);
GlowingButton.displayName = "GlowingButton";
