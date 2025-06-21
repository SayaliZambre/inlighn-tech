"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface InkSplash {
  id: number
  x: number
  y: number
  size: number
  color: string
}

interface LiquidInkSplashProps {
  children: React.ReactNode
  className?: string
  inkColor?: string
  splashSize?: "sm" | "md" | "lg"
}

export function LiquidInkSplash({
  children,
  className = "",
  inkColor = "#3b82f6",
  splashSize = "md",
}: LiquidInkSplashProps) {
  const [inkSplashes, setInkSplashes] = useState<InkSplash[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  const getSplashSize = () => {
    switch (splashSize) {
      case "sm":
        return 50
      case "lg":
        return 150
      default:
        return 100
    }
  }

  const handleClick = (e: React.MouseEvent) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const newSplash: InkSplash = {
      id: Date.now(),
      x,
      y,
      size: getSplashSize(),
      color: inkColor,
    }

    setInkSplashes((prev) => [...prev, newSplash])

    setTimeout(() => {
      setInkSplashes((prev) => prev.filter((splash) => splash.id !== newSplash.id))
    }, 2000)
  }

  return (
    <div ref={containerRef} className={`relative overflow-hidden cursor-pointer ${className}`} onClick={handleClick}>
      {children}

      <AnimatePresence>
        {inkSplashes.map((splash) => (
          <motion.div
            key={splash.id}
            className="absolute pointer-events-none"
            style={{
              left: splash.x - splash.size / 2,
              top: splash.y - splash.size / 2,
              width: splash.size,
              height: splash.size,
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: [0, 1.2, 1.5], opacity: [1, 0.8, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            <svg width="100%" height="100%" viewBox="0 0 100 100">
              <defs>
                <radialGradient id={`inkGradient-${splash.id}`} cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor={splash.color} stopOpacity="0.8" />
                  <stop offset="70%" stopColor={splash.color} stopOpacity="0.4" />
                  <stop offset="100%" stopColor={splash.color} stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Main ink blob */}
              <motion.path
                d="M50,20 C70,25 80,40 75,55 C80,70 65,85 50,80 C35,85 20,70 25,55 C20,40 30,25 50,20 Z"
                fill={`url(#inkGradient-${splash.id})`}
                animate={{
                  d: [
                    "M50,20 C70,25 80,40 75,55 C80,70 65,85 50,80 C35,85 20,70 25,55 C20,40 30,25 50,20 Z",
                    "M50,15 C75,20 85,35 80,50 C85,65 70,80 50,85 C30,80 15,65 20,50 C15,35 25,20 50,15 Z",
                    "M50,10 C80,15 90,30 85,45 C90,60 75,75 50,90 C25,75 10,60 15,45 C10,30 20,15 50,10 Z",
                  ],
                }}
                transition={{ duration: 2, ease: "easeOut" }}
              />

              {/* Ink droplets */}
              {[...Array(6)].map((_, i) => (
                <motion.circle
                  key={i}
                  cx={30 + i * 8}
                  cy={30 + i * 5}
                  r="2"
                  fill={splash.color}
                  opacity="0.6"
                  animate={{
                    cx: [30 + i * 8, 30 + i * 8 + (Math.random() - 0.5) * 40],
                    cy: [30 + i * 5, 30 + i * 5 + (Math.random() - 0.5) * 40],
                    r: [2, 4, 1],
                    opacity: [0.6, 0.3, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    ease: "easeOut",
                    delay: i * 0.1,
                  }}
                />
              ))}
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
