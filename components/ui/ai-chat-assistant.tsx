"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, Send, X, Bot, User, Sparkles, Mic, MicOff, Minimize2, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { KineticTypography } from "@/components/ui/kinetic-typography"
import { TypewriterEffect } from "@/components/ui/typewriter-effect"
import { SplitTextAnimation } from "@/components/ui/split-text-animation"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
  isTyping?: boolean
}

interface QuickAction {
  id: string
  label: string
  action: string
  icon: React.ReactNode
}

const quickActions: QuickAction[] = [
  { id: "programs", label: "View Programs", action: "show_programs", icon: "📚" },
  { id: "pricing", label: "Pricing Info", action: "show_pricing", icon: "💰" },
  { id: "schedule", label: "Schedule Call", action: "schedule_call", icon: "📞" },
  { id: "demo", label: "Book Demo", action: "book_demo", icon: "🎥" },
]

const aiResponses = [
  "That's a great question! Our Full Stack Development program is perfect for beginners. It covers HTML, CSS, JavaScript, React, Node.js, and databases. The program is 8 months long with hands-on projects.",
  "Our Cybersecurity program has a 95% placement rate! Students learn ethical hacking, network security, incident response, and digital forensics. We have partnerships with top security firms.",
  "Data Science is one of our most popular programs! You'll master Python, machine learning, data visualization, and statistical analysis. Our graduates work at companies like Netflix, Google, and Microsoft.",
  "We offer flexible payment plans and scholarships. Our career services team helps with resume building, interview prep, and job placement. We're committed to your success!",
  "Our programs are designed for working professionals. Classes are available in evening and weekend batches. We also provide recorded sessions and 24/7 mentor support.",
  "Yes! We provide industry-recognized certificates upon completion. Our programs are designed with input from leading tech companies to ensure you learn the most relevant skills.",
]

export function AIChatAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "bot",
      content:
        "Hi! I'm your AI learning assistant. I can help you choose the perfect tech program, answer questions about our courses, or provide personalized career guidance. What would you like to know?",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [showQuickActions, setShowQuickActions] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus()
    }
  }, [isOpen, isMinimized])

  const simulateAIResponse = (userMessage: string) => {
    setIsTyping(true)
    setShowQuickActions(false)

    // Add typing indicator
    const typingMessage: Message = {
      id: `typing-${Date.now()}`,
      type: "bot",
      content: "",
      timestamp: new Date(),
      isTyping: true,
    }
    setMessages((prev) => [...prev, typingMessage])

    setTimeout(() => {
      // Remove typing indicator and add actual response
      setMessages((prev) => prev.filter((msg) => !msg.isTyping))

      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)]
      const aiMessage: Message = {
        id: Date.now().toString(),
        type: "bot",
        content: randomResponse,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 2000)
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    simulateAIResponse(inputValue)
    setInputValue("")
  }

  const handleQuickAction = (action: QuickAction) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: action.label,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    simulateAIResponse(action.action)
  }

  const startVoiceRecognition = () => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
      const recognition = new SpeechRecognition()

      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = "en-US"

      recognition.onstart = () => setIsListening(true)
      recognition.onend = () => setIsListening(false)

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setInputValue(transcript)
      }

      recognition.onerror = () => {
        setIsListening(false)
      }

      recognition.start()
    }
  }

  return (
    <>
      {/* Floating Action Button - LEFT SIDE */}
      <motion.div
        className="fixed bottom-6 left-6 z-50"
        initial={{ scale: 0, rotate: -180, x: -100 }}
        animate={{ scale: 1, rotate: 0, x: 0 }}
        transition={{
          delay: 2,
          type: "spring",
          stiffness: 260,
          damping: 20,
          duration: 0.8,
        }}
      >
        <motion.button
          className="relative w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center group overflow-hidden"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Animated background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
            animate={{
              background: [
                "linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899)",
                "linear-gradient(45deg, #8b5cf6, #ec4899, #3b82f6)",
                "linear-gradient(45deg, #ec4899, #3b82f6, #8b5cf6)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />

          {/* Icon with rotation animation */}
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }} className="relative z-10">
            {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
          </motion.div>

          {/* Pulsing ring effect */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-white/30"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.7, 0, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />

          {/* Sparkle effects */}
          <motion.div
            className="absolute -top-1 -right-1 text-yellow-300"
            animate={{
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: 0.5,
            }}
          >
            <Sparkles className="h-4 w-4" />
          </motion.div>

          {/* Left-side indicator */}
          <motion.div
            className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-green-400 rounded-full"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </motion.button>

        {/* Floating text indicator */}
        <motion.div
          className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-3 py-1 rounded-full whitespace-nowrap"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isOpen ? 0 : 1, y: isOpen ? 10 : 0 }}
          transition={{ delay: 3 }}
        >
          💬 Ask me anything!
        </motion.div>
      </motion.div>

      {/* Chat Window - LEFT SIDE */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: -50, y: 20 }}
            animate={{
              opacity: 1,
              scale: isMinimized ? 0.3 : 1,
              x: 0,
              y: 0,
              height: isMinimized ? 60 : 600,
            }}
            exit={{ opacity: 0, scale: 0.8, x: -50, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`fixed ${isMinimized ? "bottom-24 left-20" : "bottom-24 left-6"} z-50 ${isMinimized ? "w-80" : "w-96"} bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-slate-700/50 overflow-hidden`}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <motion.div
                    className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <Bot className="h-6 w-6" />
                  </motion.div>
                  <div>
                    <KineticTypography
                      text="AI Learning Assistant"
                      variant="elastic"
                      trigger="load"
                      className="font-semibold text-white"
                      speed={1.2}
                    />
                    <div className="flex items-center space-x-2">
                      <motion.div
                        className="w-2 h-2 bg-green-400 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                      />
                      <span className="text-sm opacity-90">Online</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="h-8 w-8 p-0 text-white hover:bg-white/20"
                  >
                    {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="h-8 w-8 p-0 text-white hover:bg-white/20"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 p-4 h-80 overflow-y-auto space-y-4 bg-gradient-to-b from-gray-50/50 to-white/50 dark:from-slate-800/50 dark:to-slate-900/50">
                  {messages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`flex items-start space-x-3 max-w-[85%] ${
                          message.type === "user" ? "flex-row-reverse space-x-reverse" : ""
                        }`}
                      >
                        <motion.div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            message.type === "user"
                              ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                              : "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                          }`}
                          whileHover={{ scale: 1.1 }}
                        >
                          {message.type === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                        </motion.div>
                        <div
                          className={`p-3 rounded-2xl shadow-sm ${
                            message.type === "user"
                              ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-br-md"
                              : "bg-white dark:bg-slate-800 text-gray-900 dark:text-white rounded-bl-md border border-gray-200 dark:border-slate-700"
                          }`}
                        >
                          {message.isTyping ? (
                            <div className="flex space-x-1">
                              {[...Array(3)].map((_, i) => (
                                <motion.div
                                  key={i}
                                  className="w-2 h-2 bg-gray-400 rounded-full"
                                  animate={{
                                    scale: [1, 1.5, 1],
                                    opacity: [0.5, 1, 0.5],
                                  }}
                                  transition={{
                                    duration: 1,
                                    repeat: Number.POSITIVE_INFINITY,
                                    delay: i * 0.2,
                                  }}
                                />
                              ))}
                            </div>
                          ) : (
                            <TypewriterEffect
                              text={message.content}
                              speed={message.type === "bot" ? 20 : 0}
                              className="text-sm leading-relaxed"
                              showCursor={false}
                            />
                          )}
                          <div className="text-xs opacity-70 mt-2">
                            {message.timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Actions */}
                {showQuickActions && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="px-4 pb-2">
                    <SplitTextAnimation
                      text="Quick Actions"
                      variant="fadeUp"
                      className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2"
                      stagger={0.05}
                    />
                    <div className="flex flex-wrap gap-2">
                      {quickActions.map((action, index) => (
                        <motion.button
                          key={action.id}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          onClick={() => handleQuickAction(action)}
                          className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-700 dark:to-slate-600 rounded-full text-sm text-gray-700 dark:text-gray-300 hover:from-blue-100 hover:to-purple-100 dark:hover:from-slate-600 dark:hover:to-slate-500 transition-all duration-200 border border-gray-200 dark:border-slate-600"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span>{action.icon}</span>
                          <span>{action.label}</span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Input */}
                <div className="p-4 border-t border-gray-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
                  <div className="flex space-x-2">
                    <div className="flex-1 relative">
                      <Input
                        ref={inputRef}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Ask me anything about our programs..."
                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                        className="pr-12 bg-gray-50 dark:bg-slate-800 border-gray-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                        disabled={isTyping}
                      />
                      <motion.div
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        animate={{ rotate: isTyping ? 360 : 0 }}
                        transition={{ duration: 1, repeat: isTyping ? Number.POSITIVE_INFINITY : 0 }}
                      >
                        <Sparkles className="h-4 w-4 text-gray-400" />
                      </motion.div>
                    </div>
                    <Button
                      onClick={startVoiceRecognition}
                      variant="outline"
                      size="icon"
                      className={`${
                        isListening
                          ? "bg-red-500 text-white border-red-500 hover:bg-red-600"
                          : "hover:bg-gray-100 dark:hover:bg-slate-700"
                      } transition-all duration-200`}
                      disabled={isTyping}
                    >
                      <motion.div
                        animate={{ scale: isListening ? [1, 1.2, 1] : 1 }}
                        transition={{ duration: 0.5, repeat: isListening ? Number.POSITIVE_INFINITY : 0 }}
                      >
                        {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                      </motion.div>
                    </Button>
                    <Button
                      onClick={handleSendMessage}
                      size="icon"
                      className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                      disabled={!inputValue.trim() || isTyping}
                    >
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Send className="h-4 w-4" />
                      </motion.div>
                    </Button>
                  </div>

                  {/* Status indicators */}
                  <div className="flex items-center justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-2">
                      {isTyping && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-center space-x-1"
                        >
                          <motion.div
                            className="w-1 h-1 bg-blue-500 rounded-full"
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                          />
                          <span>AI is typing...</span>
                        </motion.div>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <span>Powered by AI</span>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      >
                        <Sparkles className="h-3 w-3 text-blue-500" />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
