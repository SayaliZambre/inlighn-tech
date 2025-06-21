"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Text, Sphere } from "@react-three/drei"
import { Suspense, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Play, RotateCcw } from "lucide-react"

function SkillNode({ position, color, label, completed = false }: any) {
  const meshRef = useRef<any>()
  const [hovered, setHovered] = useState(false)

  return (
    <group position={position}>
      <Sphere
        ref={meshRef}
        args={[0.3, 32, 32]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.2 : 1}
      >
        <meshStandardMaterial
          color={completed ? "#10b981" : hovered ? "#3b82f6" : color}
          emissive={hovered ? "#1e40af" : "#000000"}
          emissiveIntensity={hovered ? 0.2 : 0}
        />
      </Sphere>
      <Text position={[0, -0.6, 0]} fontSize={0.15} color="white" anchorX="center" anchorY="middle">
        {label}
      </Text>
    </group>
  )
}

function SkillTree() {
  const skills = [
    { position: [0, 0, 0], color: "#8b5cf6", label: "HTML/CSS", completed: true },
    { position: [-2, 1, 0], color: "#3b82f6", label: "JavaScript", completed: true },
    { position: [2, 1, 0], color: "#06b6d4", label: "React", completed: false },
    { position: [-2, 2, 0], color: "#10b981", label: "Node.js", completed: false },
    { position: [2, 2, 0], color: "#f59e0b", label: "Database", completed: false },
    { position: [0, 3, 0], color: "#ef4444", label: "Full Stack", completed: false },
  ]

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      {skills.map((skill, index) => (
        <SkillNode key={index} {...skill} />
      ))}
      {/* Connection lines */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={2}
            array={new Float32Array([0, 0, 0, -2, 1, 0])}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#4b5563" />
      </line>
    </>
  )
}

export function Interactive3DSkillTree() {
  return (
    <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">3D Learning Path</h3>
            <p className="text-gray-300 text-sm">Navigate your skill progression in 3D space</p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="border-white/20 text-white">
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset View
            </Button>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              <Play className="h-4 w-4 mr-2" />
              Start Learning
            </Button>
          </div>
        </div>

        <div className="h-96 rounded-lg overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800">
          <Canvas camera={{ position: [0, 0, 8] }}>
            <Suspense fallback={null}>
              <SkillTree />
              <OrbitControls enableZoom={true} enablePan={true} />
            </Suspense>
          </Canvas>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Completed: 2/6</Badge>
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">In Progress: 1/6</Badge>
          <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">Locked: 3/6</Badge>
        </div>
      </CardContent>
    </Card>
  )
}
