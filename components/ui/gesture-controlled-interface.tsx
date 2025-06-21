"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Hand, Eye, Zap, Target } from "lucide-react"

export function GestureControlledInterface() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isTracking, setIsTracking] = useState(false)
  const [gestureConfidence, setGestureConfidence] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100
        setMousePosition({ x, y })

        // Simulate gesture confidence based on movement
        const confidence = Math.min(100, Math.abs(x - 50) + Math.abs(y - 50))
        setGestureConfidence(confidence)
      }
    }

    const container = containerRef.current
    if (container && isTracking) {
      container.addEventListener("mousemove", handleMouseMove)
      return () => container.removeEventListener("mousemove", handleMouseMove)
    }
  }, [isTracking])

  const gestures = [
    { name: "Point", icon: Target, confidence: gestureConfidence > 60 ? 95 : 0 },
    { name: "Swipe", icon: Hand, confidence: gestureConfidence > 40 ? 78 : 0 },
    { name: "Pinch", icon: Zap, confidence: gestureConfidence > 80 ? 89 : 0 },
  ]

  return (
    <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Hand className="h-5 w-5 text-blue-400" />
          Gesture Recognition
          <Badge className={`${isTracking ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"}`}>
            {isTracking ? "Active" : "Inactive"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Gesture Tracking Area */}
          <div
            ref={containerRef}
            className="relative h-64 rounded-lg bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-white/20 overflow-hidden cursor-none"
            onMouseEnter={() => setIsTracking(true)}
            onMouseLeave={() => setIsTracking(false)}
          >
            {/* Grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />

            {/* Hand cursor */}
            {isTracking && (
              <motion.div
                className="absolute w-8 h-8 bg-blue-500 rounded-full shadow-lg"
                style={{
                  left: `${mousePosition.x}%`,
                  top: `${mousePosition.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  boxShadow: [
                    "0 0 0 0 rgba(59, 130, 246, 0.7)",
                    "0 0 0 10px rgba(59, 130, 246, 0)",
                    "0 0 0 0 rgba(59, 130, 246, 0)",
                  ],
                }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
              >
                <Hand className="h-4 w-4 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </motion.div>
            )}

            {/* Tracking zones */}
            <div className="absolute top-4 left-4 right-4 bottom-4 border-2 border-dashed border-white/30 rounded-lg flex items-center justify-center">
              <div className="text-center text-white/60">
                <Eye className="h-8 w-8 mx-auto mb-2" />
                <p className="text-sm">Move your hand to interact</p>
              </div>
            </div>
          </div>

          {/* Gesture Recognition Results */}
          <div className="space-y-3">
            <h4 className="text-white font-medium">Detected Gestures</h4>
            {gestures.map((gesture, index) => (
              <div key={gesture.name} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                <div className="flex items-center gap-3">
                  <gesture.icon className="h-5 w-5 text-blue-400" />
                  <span className="text-white">{gesture.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${gesture.confidence}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <span className="text-white text-sm font-mono w-12">{gesture.confidence}%</span>
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="flex gap-3">
            <Button
              onClick={() => setIsTracking(!isTracking)}
              className={`flex-1 ${isTracking ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`}
            >
              {isTracking ? "Stop Tracking" : "Start Tracking"}
            </Button>
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
              onClick={() => {
                setGestureConfidence(0)
                setMousePosition({ x: 50, y: 50 })
              }}
            >
              Reset
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
