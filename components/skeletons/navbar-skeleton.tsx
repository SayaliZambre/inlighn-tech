"use client"

import { motion } from "framer-motion"
import { AnimatedSkeleton } from "@/components/ui/animated-skeleton"

export function NavbarSkeleton() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo skeleton */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center space-x-2"
          >
            <AnimatedSkeleton variant="glow" className="w-8 h-8 rounded-lg" />
            <AnimatedSkeleton variant="pulse" className="h-6 w-32 rounded" />
          </motion.div>

          {/* Desktop navigation skeleton */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-1">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                >
                  <AnimatedSkeleton variant="shimmer" className="h-8 w-20 rounded-md" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Actions skeleton */}
          <div className="flex items-center space-x-4">
            <AnimatedSkeleton variant="glow" className="w-10 h-10 rounded-full" />
            <AnimatedSkeleton variant="pulse" className="h-10 w-24 rounded-lg hidden lg:block" />
            <AnimatedSkeleton variant="shimmer" className="w-8 h-8 rounded lg:hidden" />
          </div>
        </div>
      </div>
    </nav>
  )
}
