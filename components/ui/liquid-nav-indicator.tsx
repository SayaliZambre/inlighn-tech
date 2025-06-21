"use client"

import { motion } from "framer-motion"

interface LiquidNavIndicatorProps {
  isActive: boolean
  className?: string
}

export function LiquidNavIndicator({ isActive, className = "" }: LiquidNavIndicatorProps) {
  return (
    <div className={`relative ${className}`}>
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: isActive ? 1 : 0,
          opacity: isActive ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />

      {isActive && (
        <>
          {/* Liquid ripple effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-blue-400/30"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />

          {/* Inner liquid blob */}
          <motion.div
            className="absolute inset-2 rounded-full bg-white/20"
            animate={{
              scale: [0.8, 1.2, 0.8],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </>
      )}
    </div>
  )
}
