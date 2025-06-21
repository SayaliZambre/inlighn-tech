"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

interface MorphingTextProps {
  texts: string[]
  className?: string
  interval?: number
  variant?: "fade" | "slide" | "scale" | "rotate" | "glitch"
}

export function MorphingText({ texts, className = "", interval = 3000, variant = "fade" }: MorphingTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length)
    }, interval)

    return () => clearInterval(timer)
  }, [texts.length, interval])

  const getVariantAnimation = () => {
    switch (variant) {
      case "slide":
        return {
          initial: { x: 100, opacity: 0 },
          animate: { x: 0, opacity: 1 },
          exit: { x: -100, opacity: 0 },
        }
      case "scale":
        return {
          initial: { scale: 0, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          exit: { scale: 0, opacity: 0 },
        }
      case "rotate":
        return {
          initial: { rotateY: 90, opacity: 0 },
          animate: { rotateY: 0, opacity: 1 },
          exit: { rotateY: -90, opacity: 0 },
        }
      case "glitch":
        return {
          initial: { opacity: 0, filter: "blur(10px)" },
          animate: {
            opacity: 1,
            filter: "blur(0px)",
            x: [0, -2, 2, 0],
            textShadow: ["0 0 0 transparent", "2px 0 0 #ff0000, -2px 0 0 #00ffff", "0 0 0 transparent"],
          },
          exit: { opacity: 0, filter: "blur(10px)" },
        }
      default:
        return {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -20 },
        }
    }
  }

  const animation = getVariantAnimation()

  return (
    <div className={`relative ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={animation.initial}
          animate={animation.animate}
          exit={animation.exit}
          transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {texts[currentIndex]}
        </motion.span>
      </AnimatePresence>
      {/* Invisible text for layout */}
      <span className="opacity-0 pointer-events-none">
        {texts.reduce((longest, current) => (current.length > longest.length ? current : longest), "")}
      </span>
    </div>
  )
}
