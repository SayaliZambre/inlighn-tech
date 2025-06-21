"use client"

import { motion } from "framer-motion"

interface LiquidProgressProps {
  value: number
  max?: number
  className?: string
  color?: "blue" | "purple" | "green" | "red"
  showWaves?: boolean
}

export function LiquidProgress({
  value,
  max = 100,
  className = "",
  color = "blue",
  showWaves = true,
}: LiquidProgressProps) {
  const percentage = Math.min((value / max) * 100, 100)

  const getColorStyles = () => {
    switch (color) {
      case "purple":
        return {
          primary: "#8b5cf6",
          secondary: "#a78bfa",
          gradient: "linear-gradient(45deg, #8b5cf6, #a78bfa)",
        }
      case "green":
        return {
          primary: "#10b981",
          secondary: "#34d399",
          gradient: "linear-gradient(45deg, #10b981, #34d399)",
        }
      case "red":
        return {
          primary: "#ef4444",
          secondary: "#f87171",
          gradient: "linear-gradient(45deg, #ef4444, #f87171)",
        }
      default:
        return {
          primary: "#3b82f6",
          secondary: "#60a5fa",
          gradient: "linear-gradient(45deg, #3b82f6, #60a5fa)",
        }
    }
  }

  const colors = getColorStyles()

  return (
    <div className={`relative w-full h-8 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden ${className}`}>
      {/* Progress fill with liquid effect */}
      <motion.div
        className="absolute inset-y-0 left-0 rounded-full"
        style={{
          background: colors.gradient,
        }}
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Liquid waves */}
        {showWaves && (
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute inset-0"
              style={{
                background: `repeating-linear-gradient(
                  90deg,
                  transparent,
                  transparent 10px,
                  rgba(255, 255, 255, 0.1) 10px,
                  rgba(255, 255, 255, 0.1) 20px
                )`,
              }}
              animate={{
                x: ["-20px", "0px"],
              }}
              transition={{
                duration: 1,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />

            {/* Floating bubbles */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white/30 rounded-full"
                style={{
                  left: `${20 + i * 30}%`,
                  top: "50%",
                }}
                animate={{
                  y: [0, -8, 0],
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: i * 0.3,
                }}
              />
            ))}
          </div>
        )}
      </motion.div>

      {/* Progress text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{Math.round(percentage)}%</span>
      </div>
    </div>
  )
}
