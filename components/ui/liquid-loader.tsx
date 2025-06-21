"use client"

import { motion } from "framer-motion"

interface LiquidLoaderProps {
  size?: "sm" | "md" | "lg"
  color?: string
}

export function LiquidLoader({ size = "md", color = "blue" }: LiquidLoaderProps) {
  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return { width: 40, height: 40 }
      case "lg":
        return { width: 80, height: 80 }
      default:
        return { width: 60, height: 60 }
    }
  }

  const getColorStyles = () => {
    switch (color) {
      case "purple":
        return "#8b5cf6"
      case "green":
        return "#10b981"
      case "red":
        return "#ef4444"
      default:
        return "#3b82f6"
    }
  }

  const { width, height } = getSizeStyles()
  const colorValue = getColorStyles()

  return (
    <div className="flex items-center justify-center">
      <svg width={width} height={height} viewBox="0 0 100 100">
        <defs>
          <linearGradient id="liquidGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colorValue} stopOpacity="0.8" />
            <stop offset="50%" stopColor={colorValue} stopOpacity="0.6" />
            <stop offset="100%" stopColor={colorValue} stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* Main liquid blob */}
        <motion.path
          d="M50,20 C70,20 80,40 80,50 C80,70 60,80 50,80 C40,80 20,70 20,50 C20,40 30,20 50,20 Z"
          fill="url(#liquidGradient)"
          initial={{ d: "M50,20 C70,20 80,40 80,50 C80,70 60,80 50,80 C40,80 20,70 20,50 C20,40 30,20 50,20 Z" }}
          animate={{
            d: [
              "M50,20 C70,20 80,40 80,50 C80,70 60,80 50,80 C40,80 20,70 20,50 C20,40 30,20 50,20 Z",
              "M50,15 C75,25 85,45 75,55 C85,75 55,85 50,80 C45,85 15,75 25,55 C15,45 25,25 50,15 Z",
              "M50,25 C65,15 75,35 85,50 C75,65 65,85 50,75 C35,85 25,65 15,50 C25,35 35,15 50,25 Z",
              "M50,20 C70,20 80,40 80,50 C80,70 60,80 50,80 C40,80 20,70 20,50 C20,40 30,20 50,20 Z",
            ],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Inner liquid drops */}
        <motion.circle
          cx="50"
          cy="50"
          r="8"
          fill={colorValue}
          opacity="0.6"
          animate={{
            r: [8, 12, 8],
            opacity: [0.6, 0.3, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />

        <motion.circle
          cx="35"
          cy="40"
          r="4"
          fill={colorValue}
          opacity="0.4"
          animate={{
            cx: [35, 45, 35],
            cy: [40, 35, 40],
            r: [4, 6, 4],
          }}
          transition={{
            duration: 2.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        <motion.circle
          cx="65"
          cy="60"
          r="3"
          fill={colorValue}
          opacity="0.5"
          animate={{
            cx: [65, 55, 65],
            cy: [60, 65, 60],
            r: [3, 5, 3],
          }}
          transition={{
            duration: 2.2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1.5,
          }}
        />
      </svg>
    </div>
  )
}
