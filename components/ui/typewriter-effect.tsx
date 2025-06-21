"use client"

import { motion, useInView } from "framer-motion"
import { useEffect, useRef, useState } from "react"

interface TypewriterEffectProps {
  text: string
  speed?: number
  delay?: number
  className?: string
  showCursor?: boolean
  cursorColor?: string
  onComplete?: () => void
}

export function TypewriterEffect({
  text,
  speed = 50,
  delay = 0,
  className = "",
  showCursor = true,
  cursorColor = "currentColor",
  onComplete,
}: TypewriterEffectProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    const timer = setTimeout(
      () => {
        if (currentIndex < text.length) {
          setDisplayText(text.slice(0, currentIndex + 1))
          setCurrentIndex(currentIndex + 1)
        } else if (!isComplete) {
          setIsComplete(true)
          onComplete?.()
        }
      },
      currentIndex === 0 ? delay : speed,
    )

    return () => clearTimeout(timer)
  }, [currentIndex, text, speed, delay, isInView, isComplete, onComplete])

  return (
    <div ref={ref} className={`inline-block ${className}`}>
      <span>{displayText}</span>
      {showCursor && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          style={{ color: cursorColor }}
          className="ml-1"
        >
          |
        </motion.span>
      )}
    </div>
  )
}
