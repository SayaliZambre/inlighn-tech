"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { LiquidLoader } from "./liquid-loader"

interface AdvancedPreloaderProps {
  onComplete: () => void
}

export function AdvancedPreloader({ onComplete }: AdvancedPreloaderProps) {
  const [progress, setProgress] = useState(0)
  const [currentPhase, setCurrentPhase] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  const phases = [
    "Initializing Systems...",
    "Loading AI Modules...",
    "Preparing 3D Environment...",
    "Syncing Liquid Animations...",
    "Finalizing Experience...",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 15 + 5

        // Update phase based on progress
        const phaseIndex = Math.floor((newProgress / 100) * phases.length)
        setCurrentPhase(Math.min(phaseIndex, phases.length - 1))

        if (newProgress >= 100) {
          clearInterval(interval)
          setIsComplete(true)
          setTimeout(() => {
            onComplete()
          }, 1500)
          return 100
        }
        return newProgress
      })
    }, 200)

    return () => clearInterval(interval)
  }, [onComplete, phases.length])

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 dark:from-black dark:via-slate-900 dark:to-blue-900"
        >
          {/* Animated Background Particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-60"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                }}
                animate={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />
            ))}
          </div>

          {/* Main Content Container */}
          <div className="relative z-10 flex flex-col items-center space-y-8">
            {/* Logo Animation */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative"
            >
              <div className="w-24 h-24 relative">
                {/* Outer Ring */}
                <motion.div
                  className="absolute inset-0 border-4 border-blue-500 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />

                {/* Inner Ring */}
                <motion.div
                  className="absolute inset-2 border-2 border-purple-400 rounded-full"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />

                {/* Center Logo */}
                <div className="absolute inset-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <motion.span
                    className="text-white font-bold text-lg"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    IT
                  </motion.span>
                </div>
              </div>
            </motion.div>

            {/* Company Name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
                Inlighn Tech
              </h1>
              <p className="text-blue-200 text-lg mt-2 opacity-80">Shape Your Tech Future</p>
            </motion.div>

            {/* Liquid Loader */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <LiquidLoader size="lg" color="blue" />
            </motion.div>

            {/* Progress Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="w-80 max-w-sm space-y-4"
            >
              {/* Progress Bar Container */}
              <div className="relative">
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full relative"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    {/* Shimmer Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                      animate={{ x: [-100, 320] }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    />
                  </motion.div>
                </div>

                {/* Progress Percentage */}
                <motion.div
                  className="absolute -top-8 right-0 text-blue-300 font-mono text-sm"
                  key={Math.floor(progress)}
                  initial={{ scale: 1.2, opacity: 0.7 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {Math.floor(progress)}%
                </motion.div>
              </div>

              {/* Loading Phase Text */}
              <motion.div
                className="text-center"
                key={currentPhase}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-blue-200 text-sm font-medium">{phases[currentPhase]}</p>
              </motion.div>
            </motion.div>

            {/* Floating Elements */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-40"
                  initial={{
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                  }}
                  animate={{
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    scale: [1, 1.5, 1],
                    opacity: [0.4, 0.8, 0.4],
                  }}
                  transition={{
                    duration: Math.random() * 5 + 5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Completion Animation */}
          {progress >= 100 && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <motion.div
                className="w-32 h-32 border-4 border-green-400 rounded-full flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, ease: "easeInOut" }}
              >
                <motion.svg
                  className="w-16 h-16 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                  <motion.path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </motion.svg>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
