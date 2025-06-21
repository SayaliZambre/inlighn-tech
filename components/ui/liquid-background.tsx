"use client"

import { motion } from "framer-motion"

interface LiquidBackgroundProps {
  className?: string
  intensity?: "low" | "medium" | "high"
}

export function LiquidBackground({ className = "", intensity = "medium" }: LiquidBackgroundProps) {
  const getIntensityConfig = () => {
    switch (intensity) {
      case "low":
        return { count: 3, maxSize: 200, animationDuration: 20 }
      case "high":
        return { count: 8, maxSize: 400, animationDuration: 15 }
      default:
        return { count: 5, maxSize: 300, animationDuration: 18 }
    }
  }

  const { count, maxSize, animationDuration } = getIntensityConfig()

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full opacity-10 dark:opacity-20"
          style={{
            background: `radial-gradient(circle, ${
              i % 2 === 0 ? "rgba(59, 130, 246, 0.3)" : "rgba(147, 51, 234, 0.3)"
            } 0%, transparent 70%)`,
            width: Math.random() * maxSize + 100,
            height: Math.random() * maxSize + 100,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 200 - 100, 0],
            y: [0, Math.random() * 200 - 100, 0],
            scale: [1, 1.2, 0.8, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: animationDuration + Math.random() * 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  )
}
