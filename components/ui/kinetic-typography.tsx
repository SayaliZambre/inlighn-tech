"use client"

import { motion, useAnimation, useInView } from "framer-motion"
import { useEffect, useRef, useState } from "react"

interface KineticTypographyProps {
  text: string
  variant?: "morph" | "stretch" | "rotate" | "wave" | "glitch" | "typewriter" | "split" | "3d" | "bounce" | "elastic"
  trigger?: "load" | "hover" | "scroll" | "click"
  className?: string
  speed?: number
  delay?: number
}

export function KineticTypography({
  text,
  variant = "morph",
  trigger = "scroll",
  className = "",
  speed = 1,
  delay = 0,
}: KineticTypographyProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const controls = useAnimation()
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  useEffect(() => {
    if (trigger === "scroll" && isInView) {
      controls.start("animate")
    } else if (trigger === "load") {
      controls.start("animate")
    }
  }, [isInView, trigger, controls])

  useEffect(() => {
    if (trigger === "hover" && isHovered) {
      controls.start("animate")
    } else if (trigger === "hover" && !isHovered) {
      controls.start("initial")
    }
  }, [isHovered, trigger, controls])

  useEffect(() => {
    if (trigger === "click" && isClicked) {
      controls.start("animate")
      setTimeout(() => setIsClicked(false), 2000)
    }
  }, [isClicked, trigger, controls])

  const getVariantAnimation = () => {
    const baseTransition = { duration: 1 / speed, delay }

    switch (variant) {
      case "morph":
        return {
          initial: { scaleX: 0.5, scaleY: 2, opacity: 0 },
          animate: { scaleX: 1, scaleY: 1, opacity: 1 },
          transition: { ...baseTransition, type: "spring", bounce: 0.4 },
        }

      case "stretch":
        return {
          initial: { scaleX: 0, scaleY: 1 },
          animate: { scaleX: 1, scaleY: 1 },
          transition: { ...baseTransition, type: "spring", stiffness: 100 },
        }

      case "rotate":
        return {
          initial: { rotateY: 90, opacity: 0 },
          animate: { rotateY: 0, opacity: 1 },
          transition: baseTransition,
        }

      case "wave":
        return {
          initial: { y: 50, opacity: 0 },
          animate: { y: 0, opacity: 1 },
          transition: { ...baseTransition, type: "spring", bounce: 0.6 },
        }

      case "glitch":
        return {
          initial: { x: 0, opacity: 1 },
          animate: {
            x: [0, -5, 5, -3, 3, 0],
            opacity: [1, 0.8, 1, 0.9, 1],
            filter: ["hue-rotate(0deg)", "hue-rotate(90deg)", "hue-rotate(0deg)"],
          },
          transition: { ...baseTransition, repeat: 2 },
        }

      case "bounce":
        return {
          initial: { y: -100, opacity: 0 },
          animate: { y: 0, opacity: 1 },
          transition: { ...baseTransition, type: "spring", bounce: 0.8 },
        }

      case "elastic":
        return {
          initial: { scale: 0, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          transition: { ...baseTransition, type: "spring", stiffness: 200, damping: 10 },
        }

      case "3d":
        return {
          initial: { rotateX: 90, rotateY: 45, opacity: 0 },
          animate: { rotateX: 0, rotateY: 0, opacity: 1 },
          transition: baseTransition,
        }

      default:
        return {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: baseTransition,
        }
    }
  }

  const animation = getVariantAnimation()

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => setIsClicked(true)}
      style={{ perspective: "1000px" }}
    >
      <motion.span
        initial={animation.initial}
        animate={controls}
        variants={{
          initial: animation.initial,
          animate: animation.animate,
        }}
        transition={animation.transition}
        className="inline-block"
        style={{ transformOrigin: "center" }}
      >
        {text}
      </motion.span>
    </motion.div>
  )
}
