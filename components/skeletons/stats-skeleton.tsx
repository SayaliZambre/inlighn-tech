"use client"

import { motion } from "framer-motion"
import { AnimatedSkeleton } from "@/components/ui/animated-skeleton"

export function StatsSkeleton() {
  return (
    <div className="text-center">
      {/* Icon skeleton */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-4"
      >
        <AnimatedSkeleton variant="glow" className="w-12 h-12 md:w-16 md:h-16 mx-auto rounded-2xl" />
      </motion.div>

      {/* Number skeleton */}
      <AnimatedSkeleton variant="shimmer" className="h-8 md:h-10 lg:h-12 w-20 md:w-24 mx-auto mb-2 rounded" />

      {/* Label skeleton */}
      <AnimatedSkeleton variant="pulse" className="h-4 md:h-5 w-24 md:w-28 mx-auto rounded" />
    </div>
  )
}
