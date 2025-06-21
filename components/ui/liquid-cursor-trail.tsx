"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface TrailPoint {
  id: number
  x: number
  y: number
  timestamp: number
}

export function LiquidCursorTrail() {
  const [trailPoints, setTrailPoints] = useState<TrailPoint[]>([])
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let animationFrame: number

    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true)

      const newPoint: TrailPoint = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
        timestamp: Date.now(),
      }

      setTrailPoints((prev) => {
        const filtered = prev.filter((point) => Date.now() - point.timestamp < 1000)
        return [...filtered, newPoint].slice(-15) // Keep last 15 points
      })
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
      setTimeout(() => setTrailPoints([]), 1000)
    }

    const cleanup = () => {
      setTrailPoints((prev) => prev.filter((point) => Date.now() - point.timestamp < 1000))
      animationFrame = requestAnimationFrame(cleanup)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseleave", handleMouseLeave)
    animationFrame = requestAnimationFrame(cleanup)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  if (!isVisible || trailPoints.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50 hidden lg:block">
      <svg width="100%" height="100%" className="absolute inset-0">
        <defs>
          <radialGradient id="trailGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </radialGradient>

          <filter id="liquidFilter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
            <feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 15 -7" />
          </filter>
        </defs>

        <AnimatePresence>
          {trailPoints.map((point, index) => {
            const age = Date.now() - point.timestamp
            const opacity = Math.max(0, 1 - age / 1000)
            const size = Math.max(2, 20 - index * 1.2)

            return (
              <motion.circle
                key={point.id}
                cx={point.x}
                cy={point.y}
                r={size}
                fill="url(#trailGradient)"
                filter="url(#liquidFilter)"
                initial={{ scale: 0, opacity: 0.8 }}
                animate={{
                  scale: 1,
                  opacity: opacity * 0.6,
                  r: [size, size * 1.2, size * 0.8],
                }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                  r: {
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  },
                }}
              />
            )
          })}
        </AnimatePresence>

        {/* Connect trail points with liquid paths */}
        {trailPoints.length > 1 && (
          <motion.path
            d={`M ${trailPoints.map((p) => `${p.x},${p.y}`).join(" L ")}`}
            stroke="url(#trailGradient)"
            strokeWidth="3"
            fill="none"
            filter="url(#liquidFilter)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        )}
      </svg>
    </div>
  )
}
