"use client"

import { motion } from "framer-motion"
import { useState } from "react"

interface LiquidMorphingBlobProps {
  size?: number
  color?: string
  intensity?: "low" | "medium" | "high"
  className?: string
  interactive?: boolean
}

export function LiquidMorphingBlob({
  size = 200,
  color = "#3b82f6",
  intensity = "medium",
  className = "",
  interactive = true,
}: LiquidMorphingBlobProps) {
  const [isHovered, setIsHovered] = useState(false)

  const getIntensityConfig = () => {
    switch (intensity) {
      case "low":
        return { morphSpeed: 8, morphRange: 10 }
      case "high":
        return { morphSpeed: 3, morphRange: 30 }
      default:
        return { morphSpeed: 5, morphRange: 20 }
    }
  }

  const { morphSpeed, morphRange } = getIntensityConfig()

  const generatePath = (variation: number) => {
    const baseRadius = 40
    const points = 8
    let path = "M"

    for (let i = 0; i <= points; i++) {
      const angle = (i / points) * Math.PI * 2
      const radius = baseRadius + Math.sin(angle * 3 + variation) * morphRange
      const x = 50 + Math.cos(angle) * radius
      const y = 50 + Math.sin(angle) * radius

      if (i === 0) {
        path += `${x},${y}`
      } else {
        const prevAngle = ((i - 1) / points) * Math.PI * 2
        const prevRadius = baseRadius + Math.sin(prevAngle * 3 + variation) * morphRange
        const prevX = 50 + Math.cos(prevAngle) * prevRadius
        const prevY = 50 + Math.sin(prevAngle) * prevRadius

        const cpX1 = prevX + Math.cos(prevAngle + Math.PI / 2) * 10
        const cpY1 = prevY + Math.sin(prevAngle + Math.PI / 2) * 10
        const cpX2 = x + Math.cos(angle - Math.PI / 2) * 10
        const cpY2 = y + Math.sin(angle - Math.PI / 2) * 10

        path += ` C${cpX1},${cpY1} ${cpX2},${cpY2} ${x},${y}`
      }
    }

    return path + " Z"
  }

  return (
    <div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
      onMouseEnter={() => interactive && setIsHovered(true)}
      onMouseLeave={() => interactive && setIsHovered(false)}
    >
      <svg width="100%" height="100%" viewBox="0 0 100 100">
        <defs>
          <radialGradient id="blobGradient" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor={color} stopOpacity="0.8" />
            <stop offset="50%" stopColor={color} stopOpacity="0.6" />
            <stop offset="100%" stopColor={color} stopOpacity="0.2" />
          </radialGradient>

          <filter id="gooey">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
            <feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" />
          </filter>
        </defs>

        {/* Main morphing blob */}
        <motion.path
          fill="url(#blobGradient)"
          filter="url(#gooey)"
          animate={{
            d: [
              generatePath(0),
              generatePath(Math.PI / 2),
              generatePath(Math.PI),
              generatePath((3 * Math.PI) / 2),
              generatePath(0),
            ],
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{
            d: {
              duration: morphSpeed,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            },
            scale: {
              duration: 0.3,
              ease: "easeOut",
            },
          }}
        />

        {/* Inner liquid bubbles */}
        {[...Array(3)].map((_, i) => (
          <motion.circle
            key={i}
            cx={30 + i * 20}
            cy={40 + i * 10}
            r="3"
            fill={color}
            opacity="0.4"
            filter="url(#gooey)"
            animate={{
              cx: [30 + i * 20, 30 + i * 20 + 10, 30 + i * 20],
              cy: [40 + i * 10, 40 + i * 10 - 5, 40 + i * 10],
              r: [3, 5, 3],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: morphSpeed * 0.8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </svg>
    </div>
  )
}
