"use client"

import { motion } from "framer-motion"
import { AnimatedSkeleton } from "@/components/ui/animated-skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function CodePlaygroundSkeleton() {
  return (
    <Card className="bg-white/5 dark:bg-white/5 border-white/10 backdrop-blur-sm">
      <CardHeader>
        {/* Header skeleton */}
        <div className="flex items-center gap-2 mb-2">
          <AnimatedSkeleton variant="glow" className="w-6 h-6 rounded" />
          <AnimatedSkeleton variant="pulse" className="h-6 w-48 rounded" />
        </div>
        <AnimatedSkeleton variant="wave" className="h-5 w-64 rounded" />
      </CardHeader>

      <CardContent>
        {/* Tabs skeleton */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.3 }}
            >
              <AnimatedSkeleton variant="shimmer" className="h-10 rounded-lg" />
            </motion.div>
          ))}
        </div>

        {/* Code editor skeleton */}
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <AnimatedSkeleton variant="pulse" className="h-6 w-20 rounded" />
            <div className="flex gap-2">
              <AnimatedSkeleton variant="glow" className="w-8 h-8 rounded" />
              <AnimatedSkeleton variant="glow" className="w-8 h-8 rounded" />
            </div>
          </div>

          {/* Code lines skeleton */}
          <div className="bg-gray-900 rounded-lg p-4 space-y-2">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, duration: 0.2 }}
              >
                <AnimatedSkeleton
                  variant="wave"
                  className={`h-4 rounded ${i % 3 === 0 ? "w-3/4" : i % 3 === 1 ? "w-5/6" : "w-2/3"}`}
                />
              </motion.div>
            ))}
          </div>

          {/* Run button skeleton */}
          <div className="flex justify-center">
            <AnimatedSkeleton variant="glow" className="h-12 w-32 rounded-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
