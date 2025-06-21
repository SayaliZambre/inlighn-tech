"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { AdvancedPreloader } from "./advanced-preloader"

interface PreloaderWrapperProps {
  children: React.ReactNode
}

export function PreloaderWrapper({ children }: PreloaderWrapperProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Prevent scrolling during loading
    if (isLoading) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isLoading])

  const handleLoadingComplete = () => {
    setIsLoading(false)
    setTimeout(() => {
      setShowContent(true)
    }, 500)
  }

  return (
    <>
      {isLoading && <AdvancedPreloader onComplete={handleLoadingComplete} />}
      <div className={`transition-opacity duration-1000 ${showContent ? "opacity-100" : "opacity-0"}`}>{children}</div>
    </>
  )
}
