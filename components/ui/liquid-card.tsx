"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

interface LiquidCardProps {
  children: React.ReactNode
  className?: string
  hoverEffect?: boolean
}

export function LiquidCard({ children, className = "", hoverEffect = true }: LiquidCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hoverEffect) return

    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setMousePosition({ x, y })
  }

  return (
    <Card
      className={`relative overflow-hidden transition-all duration-300 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Liquid hover effect */}
      {hoverEffect && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="absolute w-32 h-32 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)",
              left: `${mousePosition.x}%`,
              top: `${mousePosition.y}%`,
              transform: "translate(-50%, -50%)",
            }}
            animate={{
              scale: isHovered ? [1, 1.5, 1] : 1,
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      )}

      {/* Liquid border animation */}
      <motion.div
        className="absolute inset-0 rounded-lg"
        style={{
          background: `conic-gradient(from 0deg, transparent, rgba(59, 130, 246, 0.3), transparent)`,
          padding: "1px",
        }}
        animate={{
          rotate: isHovered ? 360 : 0,
        }}
        transition={{
          duration: 3,
          repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
          ease: "linear",
        }}
      >
        <div className="w-full h-full bg-white dark:bg-gray-900 rounded-lg" />
      </motion.div>

      <CardContent className="relative z-10">{children}</CardContent>
    </Card>
  )
}
