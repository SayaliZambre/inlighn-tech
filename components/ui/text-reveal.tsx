"use client"

import { motion, useAnimation, useInView } from "framer-motion"
import { useEffect, useRef } from "react"

interface TextRevealProps {
  text: string
  className?: string
  variant?: "curtain" | "typewriter" | "wave" | "slide"
  delay?: number
  duration?: number
}

export function TextReveal({ text, className = "", variant = "curtain", delay = 0, duration = 1 }: TextRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("animate")
    }
  }, [isInView, controls])

  const getVariantAnimation = () => {
    switch (variant) {
      case "curtain":
        return {
          initial: { clipPath: "inset(0 100% 0 0)" },
          animate: { clipPath: "inset(0 0% 0 0)" },
        }
      case "typewriter":
        return {
          initial: { width: 0 },
          animate: { width: "100%" },
        }
      case "wave":
        return {
          initial: { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
          animate: { clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)" },
        }
      case "slide":
        return {
          initial: { x: "-100%" },
          animate: { x: "0%" },
        }
      default:
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
        }
    }
  }

  const animation = getVariantAnimation()

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        initial={animation.initial}
        animate={controls}
        variants={{
          initial: animation.initial,
          animate: animation.animate,
        }}
        transition={{
          duration,
          delay,
          ease: "easeOut",
        }}
        className="inline-block"
      >
        {text}
      </motion.div>
    </div>
  )
}
