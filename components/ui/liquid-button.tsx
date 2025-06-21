"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface LiquidButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  variant?: "primary" | "secondary" | "outline"
  size?: "sm" | "md" | "lg"
}

export function LiquidButton({
  children,
  className = "",
  onClick,
  variant = "primary",
  size = "md",
}: LiquidButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([])
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const newRipple = { id: Date.now(), x, y }
      setRipples((prev) => [...prev, newRipple])

      setTimeout(() => {
        setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id))
      }, 1000)
    }

    onClick?.()
  }

  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
      case "secondary":
        return "bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white"
      case "outline":
        return "border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
      default:
        return "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
    }
  }

  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return "px-4 py-2 text-sm"
      case "lg":
        return "px-8 py-4 text-lg"
      default:
        return "px-6 py-3 text-base"
    }
  }

  return (
    <Button
      ref={buttonRef}
      className={`relative overflow-hidden rounded-full font-semibold transition-all duration-300 ${getVariantStyles()} ${getSizeStyles()} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Liquid background animation */}
      <motion.div
        className="absolute inset-0 opacity-30"
        initial={false}
        animate={{
          background: isHovered
            ? "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 0%, transparent 70%)"
            : "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 70%)",
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />

      {/* Flowing liquid effect */}
      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={
          isHovered
            ? {
                background: [
                  "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
                  "linear-gradient(45deg, transparent 60%, rgba(255,255,255,0.1) 80%, transparent 100%)",
                  "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
                ],
              }
            : {}
        }
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />

      {/* Click ripple effects */}
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="absolute rounded-full bg-white/30"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20,
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      ))}

      {/* Button content */}
      <span className="relative z-10">{children}</span>
    </Button>
  )
}
