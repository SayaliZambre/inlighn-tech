"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Video, MessageSquare, Share, Mic } from "lucide-react"

interface Collaborator {
  id: string
  name: string
  avatar: string
  status: "online" | "coding" | "away"
  cursor: { x: number; y: number }
  color: string
}

export function RealTimeCollaboration() {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([
    {
      id: "1",
      name: "Sarah Chen",
      avatar: "/placeholder.svg?height=32&width=32",
      status: "coding",
      cursor: { x: 25, y: 30 },
      color: "#3b82f6",
    },
    {
      id: "2",
      name: "Mike Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      status: "online",
      cursor: { x: 60, y: 45 },
      color: "#10b981",
    },
    {
      id: "3",
      name: "Alex Kim",
      avatar: "/placeholder.svg?height=32&width=32",
      status: "away",
      cursor: { x: 80, y: 20 },
      color: "#f59e0b",
    },
  ])

  const [messages, setMessages] = useState([
    { id: "1", user: "Sarah Chen", message: "Let's work on the authentication logic", time: "2:34 PM" },
    { id: "2", user: "Mike Johnson", message: "I'll handle the database connection", time: "2:35 PM" },
  ])

  // Simulate cursor movement
  useEffect(() => {
    const interval = setInterval(() => {
      setCollaborators((prev) =>
        prev.map((collab) => ({
          ...collab,
          cursor: {
            x: Math.max(10, Math.min(90, collab.cursor.x + (Math.random() - 0.5) * 10)),
            y: Math.max(10, Math.min(90, collab.cursor.y + (Math.random() - 0.5) * 10)),
          },
        })),
      )
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Users className="h-5 w-5 text-green-400" />
          Real-Time Collaboration
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
            {collaborators.filter((c) => c.status !== "away").length} Active
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Collaborative Code Editor */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-white font-medium">Shared Code Editor</h4>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="border-white/20 text-white">
                  <Video className="h-4 w-4 mr-2" />
                  Video Call
                </Button>
                <Button size="sm" variant="outline" className="border-white/20 text-white">
                  <Share className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {/* Code Editor with Cursors */}
            <div className="relative h-64 rounded-lg bg-gray-900 border border-white/20 overflow-hidden">
              <div className="p-4 font-mono text-sm text-gray-300">
                <div className="text-blue-400">function authenticateUser(credentials) {`{`}</div>
                <div className="ml-4 text-green-400">// Validate user credentials</div>
                <div className="ml-4">const user = await User.findOne(credentials);</div>
                <div className="ml-4">if (!user) {`{`}</div>
                <div className="ml-8 text-red-400">throw new Error('Invalid credentials');</div>
                <div className="ml-4">{`}`}</div>
                <div className="ml-4 text-purple-400">return generateToken(user);</div>
                <div>{`}`}</div>
              </div>

              {/* Collaborative Cursors */}
              {collaborators
                .filter((c) => c.status !== "away")
                .map((collaborator) => (
                  <motion.div
                    key={collaborator.id}
                    className="absolute pointer-events-none"
                    style={{
                      left: `${collaborator.cursor.x}%`,
                      top: `${collaborator.cursor.y}%`,
                    }}
                    animate={{
                      left: `${collaborator.cursor.x}%`,
                      top: `${collaborator.cursor.y}%`,
                    }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  >
                    <div className="w-0.5 h-5 animate-pulse" style={{ backgroundColor: collaborator.color }} />
                    <div
                      className="absolute -top-6 left-0 px-2 py-1 rounded text-xs text-white whitespace-nowrap"
                      style={{ backgroundColor: collaborator.color }}
                    >
                      {collaborator.name}
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>

          {/* Chat and Collaborators */}
          <div className="space-y-4">
            {/* Active Collaborators */}
            <div>
              <h4 className="text-white font-medium mb-3">Active Collaborators</h4>
              <div className="space-y-2">
                {collaborators.map((collaborator) => (
                  <div key={collaborator.id} className="flex items-center gap-3 p-2 rounded-lg bg-white/5">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={collaborator.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {collaborator.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-white text-sm">{collaborator.name}</span>
                        <div
                          className={`w-2 h-2 rounded-full ${
                            collaborator.status === "online"
                              ? "bg-green-400"
                              : collaborator.status === "coding"
                                ? "bg-blue-400"
                                : "bg-gray-400"
                          }`}
                        />
                      </div>
                      <span className="text-gray-400 text-xs capitalize">{collaborator.status}</span>
                    </div>
                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                        <Mic className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                        <Video className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Chat */}
            <div>
              <h4 className="text-white font-medium mb-3">Live Chat</h4>
              <div className="h-32 bg-white/5 rounded-lg p-3 overflow-y-auto space-y-2">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm"
                    >
                      <span className="text-blue-400 font-medium">{message.user}</span>
                      <span className="text-gray-400 text-xs ml-2">{message.time}</span>
                      <div className="text-gray-300">{message.message}</div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 text-sm"
                />
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
