"use client"

import { motion } from "framer-motion"
import { AnimatedSkeleton } from "@/components/ui/animated-skeleton"
import { Card, CardContent } from "@/components/ui/card"

export function TestimonialSkeleton() {
  return (
    <Card className="bg-white/10 dark:bg-white/5 backdrop-blur-sm border-white/20 relative overflow-hidden">
      <CardContent className="p-6">
        {/* Quote icon skeleton */}
        <AnimatedSkeleton variant="glow" className="w-8 h-8 rounded mb-4" />

        {/* Content skeleton */}
        <div className="space-y-3 mb-6">
          <AnimatedSkeleton variant="wave" className="h-4 w-full rounded" />
          <AnimatedSkeleton variant="wave" className="h-4 w-11/12 rounded" />
          <AnimatedSkeleton variant="wave" className="h-4 w-4/5 rounded" />
          <AnimatedSkeleton variant="wave" className="h-4 w-3/4 rounded" />
        </div>

        {/* Rating skeleton */}
        <div className="flex items-center mb-4 space-x-1">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1, duration: 0.3 }}
            >
              <AnimatedSkeleton variant="pulse" className="w-4 h-4 rounded" />
            </motion.div>
          ))}
        </div>

        {/* Author info skeleton */}
        <div className="flex items-center">
          <AnimatedSkeleton variant="shimmer" className="w-12 h-12 rounded-full mr-4" />
          <div className="flex-1">
            <AnimatedSkeleton variant="pulse" className="h-5 w-32 mb-2 rounded" />
            <AnimatedSkeleton variant="wave" className="h-4 w-40 rounded" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
