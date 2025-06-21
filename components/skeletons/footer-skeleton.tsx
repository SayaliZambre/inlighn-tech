"use client"

import { motion } from "framer-motion"
import { AnimatedSkeleton } from "@/components/ui/animated-skeleton"

export function FooterSkeleton() {
  return (
    <footer className="bg-black/40 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <div className="flex items-center space-x-2 mb-6">
                  <AnimatedSkeleton variant="glow" className="w-8 h-8 rounded-lg" />
                  <AnimatedSkeleton variant="pulse" className="h-6 w-32 rounded" />
                </div>

                <div className="space-y-2">
                  <AnimatedSkeleton variant="wave" className="h-4 w-full rounded" />
                  <AnimatedSkeleton variant="wave" className="h-4 w-5/6 rounded" />
                  <AnimatedSkeleton variant="wave" className="h-4 w-4/5 rounded" />
                </div>

                <div className="space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-center">
                      <AnimatedSkeleton variant="glow" className="w-4 h-4 mr-3 rounded" />
                      <AnimatedSkeleton variant="pulse" className="h-4 w-40 rounded" />
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Footer Links */}
            {[...Array(4)].map((_, sectionIndex) => (
              <motion.div
                key={sectionIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: sectionIndex * 0.1 }}
              >
                <AnimatedSkeleton variant="pulse" className="h-5 w-20 mb-4 rounded" />
                <div className="space-y-3">
                  {[...Array(4)].map((_, linkIndex) => (
                    <AnimatedSkeleton key={linkIndex} variant="shimmer" className="h-4 w-24 rounded" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="py-8 border-t border-white/10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
          >
            <div className="space-y-2">
              <AnimatedSkeleton variant="pulse" className="h-7 w-32 rounded" />
              <AnimatedSkeleton variant="wave" className="h-5 w-64 rounded" />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <AnimatedSkeleton variant="shimmer" className="h-10 flex-1 rounded" />
              <AnimatedSkeleton variant="glow" className="h-10 w-24 rounded" />
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <div className="py-8 border-t border-white/10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-col md:flex-row justify-between items-center"
          >
            <AnimatedSkeleton variant="pulse" className="h-4 w-48 rounded" />
            <div className="flex space-x-4 mt-4 md:mt-0">
              {[...Array(5)].map((_, i) => (
                <AnimatedSkeleton key={i} variant="glow" className="w-5 h-5 rounded" />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
