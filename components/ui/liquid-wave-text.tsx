"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface LiquidWaveTextProps {
  text: string
  className?: string
  waveColor?: string
  textColor?: string
  animationSpeed?: number
}

export function LiquidWaveText({
  text,
  className = "",
  waveColor = "#3b82f6",
  textColor = "currentColor",
  animationSpeed = 3,
}: LiquidWaveTextProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className={`relative inline-block ${className}`}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 400 100"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={waveColor} stopOpacity="0.8" />
            <stop offset="50%" stopColor={waveColor} stopOpacity="0.6" />
            <stop offset="100%" stopColor={waveColor} stopOpacity="0.8" />
          </linearGradient>

          <clipPath id="textClip">
            <text
              x="50%"
              y="60%"
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="24"
              fontWeight="bold"
              fill="white"
            >
              {text}
            </text>
          </clipPath>
        </defs>

        {/* Animated wave background */}
        <motion.path
          d="M0,60 Q100,20 200,60 T400,60 L400,100 L0,100 Z"
          fill="url(#waveGradient)"
          clipPath="url(#textClip)"
          animate={{
            d: [
              "M0,60 Q100,20 200,60 T400,60 L400,100 L0,100 Z",
              "M0,40 Q100,80 200,40 T400,40 L400,100 L0,100 Z",
              "M0,60 Q100,20 200,60 T400,60 L400,100 L0,100 Z",
            ],
          }}
          transition={{
            duration: animationSpeed,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Secondary wave layer */}
        <motion.path
          d="M0,70 Q150,30 300,70 T600,70 L600,100 L0,100 Z"
          fill={waveColor}
          opacity="0.3"
          clipPath="url(#textClip)"
          animate={{
            d: [
              "M0,70 Q150,30 300,70 T600,70 L600,100 L0,100 Z",
              "M0,50 Q150,90 300,50 T600,50 L600,100 L0,100 Z",
              "M0,70 Q150,30 300,70 T600,70 L600,100 L0,100 Z",
            ],
          }}
          transition={{
            duration: animationSpeed * 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
      </svg>

      {/* Text overlay */}
      <div className="relative z-10 font-bold text-2xl text-center py-4" style={{ color: textColor }}>
        {text}
      </div>
    </div>
  )
}
