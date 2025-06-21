"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

interface LiquidPageTransitionProps {
  isTransitioning: boolean
  direction?: "in" | "out"
  color?: string
}

export function LiquidPageTransition({
  isTransitioning,
  direction = "in",
  color = "#3b82f6",
}: LiquidPageTransitionProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          className="fixed inset-0 z-50 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <radialGradient id="liquidTransitionGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={color} stopOpacity="0.9" />
                <stop offset="70%" stopColor={color} stopOpacity="0.6" />
                <stop offset="100%" stopColor={color} stopOpacity="0.3" />
              </radialGradient>
            </defs>

            {/* Main liquid wave */}
            <motion.path
              d="M0,100 Q200,50 400,100 T800,100 L800,0 L0,0 Z"
              fill="url(#liquidTransitionGradient)"
              initial={{
                d:
                  direction === "in"
                    ? "M0,100 Q200,100 400,100 T800,100 L800,0 L0,0 Z"
                    : "M0,0 Q200,0 400,0 T800,0 L800,0 L0,0 Z",
              }}
              animate={{
                d:
                  direction === "in"
                    ? [
                        "M0,100 Q200,100 400,100 T800,100 L800,0 L0,0 Z",
                        "M0,80 Q200,40 400,80 T800,80 L800,0 L0,0 Z",
                        "M0,60 Q200,20 400,60 T800,60 L800,0 L0,0 Z",
                        "M0,0 Q200,0 400,0 T800,0 L800,0 L0,0 Z",
                      ]
                    : [
                        "M0,0 Q200,0 400,0 T800,0 L800,0 L0,0 Z",
                        "M0,20 Q200,60 400,20 T800,20 L800,0 L0,0 Z",
                        "M0,40 Q200,80 400,40 T800,40 L800,0 L0,0 Z",
                        "M0,100 Q200,100 400,100 T800,100 L800,0 L0,0 Z",
                      ],
              }}
              transition={{
                duration: 1.5,
                ease: "easeInOut",
              }}
            />

            {/* Secondary liquid layer */}
            <motion.path
              d="M0,100 Q300,70 600,100 T1200,100 L1200,0 L0,0 Z"
              fill={color}
              opacity="0.4"
              initial={{
                d:
                  direction === "in"
                    ? "M0,100 Q300,100 600,100 T1200,100 L1200,0 L0,0 Z"
                    : "M0,0 Q300,0 600,0 T1200,0 L1200,0 L0,0 Z",
              }}
              animate={{
                d:
                  direction === "in"
                    ? [
                        "M0,100 Q300,100 600,100 T1200,100 L1200,0 L0,0 Z",
                        "M0,70 Q300,30 600,70 T1200,70 L1200,0 L0,0 Z",
                        "M0,40 Q300,10 600,40 T1200,40 L1200,0 L0,0 Z",
                        "M0,0 Q300,0 600,0 T1200,0 L1200,0 L0,0 Z",
                      ]
                    : [
                        "M0,0 Q300,0 600,0 T1200,0 L1200,0 L0,0 Z",
                        "M0,30 Q300,70 600,30 T1200,30 L1200,0 L0,0 Z",
                        "M0,60 Q300,90 600,60 T1200,60 L1200,0 L0,0 Z",
                        "M0,100 Q300,100 600,100 T1200,100 L1200,0 L0,0 Z",
                      ],
              }}
              transition={{
                duration: 1.5,
                ease: "easeInOut",
                delay: 0.2,
              }}
            />

            {/* Liquid droplets */}
            {[...Array(8)].map((_, i) => (
              <motion.circle
                key={i}
                cx={100 + i * 150}
                cy={50}
                r="8"
                fill={color}
                opacity="0.6"
                initial={{
                  cy: direction === "in" ? 150 : -50,
                  opacity: 0,
                  scale: 0,
                }}
                animate={{
                  cy: direction === "in" ? [150, 50, 30] : [30, 50, 150],
                  opacity: [0, 0.6, 0],
                  scale: [0, 1, 0.5],
                }}
                transition={{
                  duration: 1.2,
                  ease: "easeOut",
                  delay: i * 0.1,
                }}
              />
            ))}
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
