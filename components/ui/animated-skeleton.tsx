"use client"

import type React from "react"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedSkeletonProps {
  className?: string
  variant?: "shimmer" | "pulse" | "wave" | "glow"
  speed?: "slow" | "normal" | "fast"
  children?: React.ReactNode
}

export function AnimatedSkeleton({
  className,
  variant = "shimmer",
  speed = "normal",
  children,
}: AnimatedSkeletonProps) {
  const getSpeedDuration = () => {
    switch (speed) {
      case "slow":
        return 2.5
      case "fast":
        return 1
      default:
        return 1.5
    }
  }

  const duration = getSpeedDuration()

  const variants = {
    shimmer: {
      background: [
        "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
        "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
      ],
      backgroundPosition: ["-200px 0", "200px 0"],
      transition: {
        duration,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      },
    },
    pulse: {
      opacity: [0.6, 1, 0.6],
      transition: {
        duration,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
    wave: {
      background: [
        "linear-gradient(45deg, #f0f0f0 25%, transparent 25%, transparent 50%, #f0f0f0 50%, #f0f0f0 75%, transparent 75%)",
        "linear-gradient(45deg, #f0f0f0 25%, transparent 25%, transparent 50%, #f0f0f0 50%, #f0f0f0 75%, transparent 75%)",
      ],
      backgroundPosition: ["0 0", "20px 20px"],
      transition: {
        duration,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      },
    },
    glow: {
      boxShadow: ["0 0 0 rgba(59, 130, 246, 0)", "0 0 20px rgba(59, 130, 246, 0.3)", "0 0 0 rgba(59, 130, 246, 0)"],
      transition: {
        duration,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  return (
    <motion.div
      className={cn(
        "bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden relative",
        variant === "shimmer" &&
          "bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700",
        className,
      )}
      animate={variants[variant]}
      style={{
        backgroundSize: variant === "shimmer" ? "200px 100%" : variant === "wave" ? "20px 20px" : undefined,
      }}
    >
      {children}
    </motion.div>
  )
}
