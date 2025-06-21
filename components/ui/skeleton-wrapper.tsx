"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface SkeletonWrapperProps {
  children: React.ReactNode
  skeleton: React.ReactNode
  loading?: boolean
  delay?: number
  className?: string
}

export function SkeletonWrapper({
  children,
  skeleton,
  loading = false,
  delay = 0,
  className = "",
}: SkeletonWrapperProps) {
  const [isLoading, setIsLoading] = useState(loading)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    if (loading) {
      setIsLoading(true)
      setShowContent(false)
    } else {
      const timer = setTimeout(() => {
        setIsLoading(false)
        setTimeout(() => setShowContent(true), 100)
      }, delay)

      return () => clearTimeout(timer)
    }
  }, [loading, delay])

  return (
    <div className={`relative ${className}`}>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="skeleton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 0.95,
              filter: "blur(4px)",
            }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
          >
            {skeleton}
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{
              opacity: 0,
              scale: 0.95,
              filter: "blur(4px)",
            }}
            animate={{
              opacity: showContent ? 1 : 0,
              scale: showContent ? 1 : 0.95,
              filter: showContent ? "blur(0px)" : "blur(4px)",
            }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
              delay: 0.1,
            }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
