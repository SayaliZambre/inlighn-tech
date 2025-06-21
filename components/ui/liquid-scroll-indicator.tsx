"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export function LiquidScrollIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalHeight) * 100
      setScrollProgress(Math.min(progress, 100))
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200/20 dark:bg-gray-800/20 z-50">
      <motion.div
        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 relative overflow-hidden"
        style={{ width: `${scrollProgress}%` }}
        transition={{ duration: 0.1 }}
      >
        {/* Liquid wave effect */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `repeating-linear-gradient(
              90deg,
              transparent,
              transparent 5px,
              rgba(255, 255, 255, 0.3) 5px,
              rgba(255, 255, 255, 0.3) 10px
            )`,
          }}
          animate={{
            x: ["-10px", "0px"],
          }}
          transition={{
            duration: 0.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />

        {/* Liquid droplets */}
        <motion.div
          className="absolute right-0 top-0 w-4 h-4 bg-white/50 rounded-full transform -translate-y-1/2"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 1,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </div>
  )
}
