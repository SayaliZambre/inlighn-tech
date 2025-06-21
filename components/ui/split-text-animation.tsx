"use client"

import { motion, useAnimation, useInView } from "framer-motion"
import { useEffect, useRef } from "react"

interface SplitTextAnimationProps {
  text: string
  variant?: "fadeUp" | "slideIn" | "rotate" | "scale" | "wave" | "typewriter"
  className?: string
  delay?: number
  stagger?: number
  trigger?: "scroll" | "load"
}

export function SplitTextAnimation({
  text,
  variant = "fadeUp",
  className = "",
  delay = 0,
  stagger = 0.05,
  trigger = "scroll",
}: SplitTextAnimationProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const controls = useAnimation()

  useEffect(() => {
    if ((trigger === "scroll" && isInView) || trigger === "load") {
      controls.start("animate")
    }
  }, [isInView, trigger, controls])

  const getVariantAnimation = () => {
    switch (variant) {
      case "fadeUp":
        return {
          initial: { opacity: 0, y: 50 },
          animate: { opacity: 1, y: 0 },
        }
      case "slideIn":
        return {
          initial: { opacity: 0, x: -50 },
          animate: { opacity: 1, x: 0 },
        }
      case "rotate":
        return {
          initial: { opacity: 0, rotateY: 90 },
          animate: { opacity: 1, rotateY: 0 },
        }
      case "scale":
        return {
          initial: { opacity: 0, scale: 0 },
          animate: { opacity: 1, scale: 1 },
        }
      case "wave":
        return {
          initial: { opacity: 0, y: 20, rotateZ: -10 },
          animate: { opacity: 1, y: 0, rotateZ: 0 },
        }
      case "typewriter":
        return {
          initial: { opacity: 0, width: 0 },
          animate: { opacity: 1, width: "auto" },
        }
      default:
        return {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
        }
    }
  }

  const animation = getVariantAnimation()
  const words = text.split(" ")

  return (
    <motion.div ref={ref} className={`inline-block ${className}`}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block mr-2">
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={`${wordIndex}-${charIndex}`}
              className="inline-block"
              initial={animation.initial}
              animate={controls}
              variants={{
                initial: animation.initial,
                animate: animation.animate,
              }}
              transition={{
                duration: 0.6,
                delay: delay + (wordIndex * word.length + charIndex) * stagger,
                type: "spring",
                bounce: 0.4,
              }}
              style={{ transformOrigin: "center" }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.div>
  )
}
