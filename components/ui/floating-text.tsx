"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface FloatingTextProps {
  text: string
  className?: string
  intensity?: "low" | "medium" | "high"
  direction?: "up" | "down" | "left" | "right" | "random"
}

export function FloatingText({ text, className = "", intensity = "medium", direction = "up" }: FloatingTextProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const getIntensityValues = () => {
    switch (intensity) {
      case "low":
        return { distance: 10, duration: 4 }
      case "high":
        return { distance: 30, duration: 2 }
      default:
        return { distance: 20, duration: 3 }
    }
  }

  const getDirectionValues = () => {
    const { distance } = getIntensityValues()

    switch (direction) {
      case "down":
        return { y: [0, distance, 0], x: 0 }
      case "left":
        return { x: [0, -distance, 0], y: 0 }
      case "right":
        return { x: [0, distance, 0], y: 0 }
      case "random":
        return {
          x: [0, Math.random() * distance - distance / 2, 0],
          y: [0, Math.random() * distance - distance / 2, 0],
        }
      default:
        return { y: [0, -distance, 0], x: 0 }
    }
  }

  const { duration } = getIntensityValues()
  const movement = getDirectionValues()

  return (
    <motion.div
      className={`inline-block ${className}`}
      animate={movement}
      transition={{
        duration,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    >
      {text}
    </motion.div>
  )
}
