"use client"

import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

interface LiquidTransitionProps {
  isVisible: boolean
  children: React.ReactNode
  direction?: "up" | "down" | "left" | "right"
  duration?: number
}

export function LiquidTransition({ isVisible, children, direction = "up", duration = 0.8 }: LiquidTransitionProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const getDirectionVariants = () => {
    const distance = 50
    switch (direction) {
      case "down":
        return { y: -distance, opacity: 0 }
      case "left":
        return { x: distance, opacity: 0 }
      case "right":
        return { x: -distance, opacity: 0 }
      default:
        return { y: distance, opacity: 0 }
    }
  }

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial={getDirectionVariants()}
          animate={{
            y: 0,
            x: 0,
            opacity: 1,
            scale: [0.9, 1.02, 1],
          }}
          exit={getDirectionVariants()}
          transition={{
            duration,
            ease: [0.25, 0.46, 0.45, 0.94],
            scale: {
              duration: duration * 0.6,
              ease: "easeOut",
            },
          }}
        >
          <motion.div
            animate={{
              filter: ["blur(0px) brightness(1)", "blur(1px) brightness(1.1)", "blur(0px) brightness(1)"],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
