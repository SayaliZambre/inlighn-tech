"use client"

import { motion } from "framer-motion"
import { AnimatedSkeleton } from "@/components/ui/animated-skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function QuizSkeleton() {
  return (
    <Card className="bg-white/5 dark:bg-white/5 border-white/10 backdrop-blur-sm max-w-2xl mx-auto">
      <CardHeader className="text-center">
        {/* Header skeleton */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <AnimatedSkeleton variant="glow" className="w-6 h-6 rounded" />
          <AnimatedSkeleton variant="pulse" className="h-7 w-48 rounded" />
        </div>
        <AnimatedSkeleton variant="wave" className="h-5 w-64 mx-auto rounded" />
      </CardHeader>

      <CardContent>
        {/* Progress skeleton */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <AnimatedSkeleton variant="pulse" className="h-4 w-24 rounded" />
            <AnimatedSkeleton variant="pulse" className="h-4 w-12 rounded" />
          </div>
          <AnimatedSkeleton variant="shimmer" className="h-8 w-full rounded-full" />
        </div>

        {/* Question skeleton */}
        <AnimatedSkeleton variant="wave" className="h-6 w-5/6 mb-6 rounded" />

        {/* Options skeleton */}
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1, duration: 0.3 }}
            >
              <AnimatedSkeleton variant="shimmer" className="h-16 w-full rounded-lg" />
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
