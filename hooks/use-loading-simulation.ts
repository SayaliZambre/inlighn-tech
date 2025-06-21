"use client"

import { useState, useEffect } from "react"

interface UseLoadingSimulationProps {
  duration?: number
  autoStart?: boolean
}

export function useLoadingSimulation({ duration = 2000, autoStart = true }: UseLoadingSimulationProps = {}) {
  const [isLoading, setIsLoading] = useState(autoStart)
  const [progress, setProgress] = useState(0)

  const startLoading = () => {
    setIsLoading(true)
    setProgress(0)
  }

  const stopLoading = () => {
    setIsLoading(false)
    setProgress(100)
  }

  useEffect(() => {
    if (!isLoading) return

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setIsLoading(false)
          return 100
        }
        return prev + 100 / (duration / 100)
      })
    }, 100)

    return () => clearInterval(interval)
  }, [isLoading, duration])

  return {
    isLoading,
    progress,
    startLoading,
    stopLoading,
  }
}
