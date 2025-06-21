"use client"

import { motion } from "framer-motion"

interface LiquidSectionDividerProps {
  className?: string
  color?: "blue" | "purple" | "gradient"
  height?: number
}

export function LiquidSectionDivider({ className = "", color = "gradient", height = 100 }: LiquidSectionDividerProps) {
  const getColorPath = () => {
    switch (color) {
      case "blue":
        return "#3b82f6"
      case "purple":
        return "#8b5cf6"
      default:
        return "url(#liquidGradient)"
    }
  }

  return (
    <div className={`w-full overflow-hidden ${className}`} style={{ height }}>
      <svg width="100%" height="100%" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
        <defs>
          <linearGradient id="liquidGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>

        <motion.path
          d="M0,60 C300,120 600,0 900,60 C1050,90 1150,30 1200,60 L1200,120 L0,120 Z"
          fill={getColorPath()}
          initial={{ d: "M0,60 C300,120 600,0 900,60 C1050,90 1150,30 1200,60 L1200,120 L0,120 Z" }}
          animate={{
            d: [
              "M0,60 C300,120 600,0 900,60 C1050,90 1150,30 1200,60 L1200,120 L0,120 Z",
              "M0,40 C300,80 600,20 900,80 C1050,110 1150,50 1200,80 L1200,120 L0,120 Z",
              "M0,80 C300,40 600,100 900,40 C1050,70 1150,10 1200,40 L1200,120 L0,120 Z",
              "M0,60 C300,120 600,0 900,60 C1050,90 1150,30 1200,60 L1200,120 L0,120 Z",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Additional liquid layers */}
        <motion.path
          d="M0,80 C400,40 800,120 1200,80 L1200,120 L0,120 Z"
          fill="rgba(255,255,255,0.1)"
          animate={{
            d: [
              "M0,80 C400,40 800,120 1200,80 L1200,120 L0,120 Z",
              "M0,100 C400,60 800,140 1200,100 L1200,120 L0,120 Z",
              "M0,80 C400,40 800,120 1200,80 L1200,120 L0,120 Z",
            ],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </svg>
    </div>
  )
}
