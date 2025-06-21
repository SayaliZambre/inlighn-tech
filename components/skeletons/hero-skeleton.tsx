"use client"

import { motion } from "framer-motion"
import { AnimatedSkeleton } from "@/components/ui/animated-skeleton"

export function HeroSkeleton() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="relative z-10 text-center px-4 max-w-7xl mx-auto">
        <div className="space-y-6 md:space-y-8">
          {/* Badge skeleton */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <AnimatedSkeleton variant="glow" className="h-8 w-48 rounded-full" />
          </motion.div>

          {/* Title skeleton */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <AnimatedSkeleton variant="shimmer" className="h-12 md:h-16 lg:h-20 w-full max-w-4xl mx-auto rounded" />
            <AnimatedSkeleton variant="shimmer" className="h-12 md:h-16 lg:h-20 w-5/6 max-w-3xl mx-auto rounded" />
          </motion.div>

          {/* Description skeleton */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-3 max-w-4xl mx-auto"
          >
            <AnimatedSkeleton variant="wave" className="h-6 md:h-8 w-full rounded" />
            <AnimatedSkeleton variant="wave" className="h-6 md:h-8 w-4/5 mx-auto rounded" />
            <AnimatedSkeleton variant="wave" className="h-6 md:h-8 w-3/4 mx-auto rounded" />
          </motion.div>

          {/* Buttons skeleton */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <AnimatedSkeleton variant="glow" className="h-12 md:h-14 w-full sm:w-40 rounded-full" />
            <AnimatedSkeleton variant="pulse" className="h-12 md:h-14 w-full sm:w-36 rounded-full" />
          </motion.div>
        </div>
      </div>

      {/* Floating particles skeleton */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
          >
            <AnimatedSkeleton variant="glow" className="w-2 h-2 md:w-3 md:h-3 rounded-full" />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
