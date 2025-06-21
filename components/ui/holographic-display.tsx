"use client"

import { Canvas } from "@react-three/fiber"
import { Suspense, useRef } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, Cpu, Database, Shield } from "lucide-react"

function HologramPanel({ position, children }: any) {
  const meshRef = useRef<any>()

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <planeGeometry args={[2, 1.5]} />
        <meshBasicMaterial color="#00ffff" transparent opacity={0.1} side={2} />
      </mesh>
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[1.8, 1.3]} />
        <meshBasicMaterial color="#003366" transparent opacity={0.3} />
      </mesh>
    </group>
  )
}

function HolographicScene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 5]} color="#00ffff" intensity={0.5} />

      <HologramPanel position={[-2, 0, 0]} />
      <HologramPanel position={[2, 0, 0]} />
      <HologramPanel position={[0, 1.5, 0]} />

      {/* Scanning lines effect */}
      <mesh position={[0, 0, -1]}>
        <planeGeometry args={[10, 0.1]} />
        <meshBasicMaterial color="#00ffff" transparent opacity={0.3} />
      </mesh>
    </>
  )
}

export function HolographicDisplay() {
  const stats = [
    { icon: Activity, label: "System Status", value: "Online", color: "text-green-400" },
    { icon: Cpu, label: "Processing", value: "98.7%", color: "text-blue-400" },
    { icon: Database, label: "Data Sync", value: "Active", color: "text-cyan-400" },
    { icon: Shield, label: "Security", value: "Secure", color: "text-purple-400" },
  ]

  return (
    <Card className="bg-black/50 border-cyan-500/30 backdrop-blur-sm overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-cyan-400 mb-2">Holographic Interface</h3>
            <p className="text-gray-300 text-sm">Advanced learning environment visualization</p>
          </div>
          <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 animate-pulse">ACTIVE</Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 3D Hologram Display */}
          <div className="h-64 rounded-lg overflow-hidden bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/30">
            <Canvas camera={{ position: [0, 0, 5] }}>
              <Suspense fallback={null}>
                <HolographicScene />
              </Suspense>
            </Canvas>

            {/* Scan lines overlay */}
            <div className="absolute inset-0 pointer-events-none">
              <motion.div
                className="w-full h-0.5 bg-cyan-400/50"
                animate={{ y: [0, 256, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />
            </div>
          </div>

          {/* System Stats */}
          <div className="space-y-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20"
              >
                <div className="flex items-center gap-3">
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  <span className="text-gray-300">{stat.label}</span>
                </div>
                <span className={`font-mono ${stat.color}`}>{stat.value}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Holographic grid effect */}
        <div className="mt-6 h-32 relative overflow-hidden rounded-lg bg-gradient-to-t from-cyan-900/20 to-transparent">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_24%,rgba(0,255,255,0.1)_25%,rgba(0,255,255,0.1)_26%,transparent_27%,transparent_74%,rgba(0,255,255,0.1)_75%,rgba(0,255,255,0.1)_76%,transparent_77%,transparent)] bg-[length:20px_20px]" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_24%,rgba(0,255,255,0.1)_25%,rgba(0,255,255,0.1)_26%,transparent_27%,transparent_74%,rgba(0,255,255,0.1)_75%,rgba(0,255,255,0.1)_76%,transparent_77%,transparent)] bg-[length:20px_20px]" />
        </div>
      </CardContent>
    </Card>
  )
}
