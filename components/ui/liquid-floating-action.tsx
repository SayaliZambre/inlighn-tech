"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, Phone, Mail, X } from "lucide-react"

const actions = [
  { icon: MessageCircle, label: "Chat", color: "from-green-500 to-emerald-500" },
  { icon: Phone, label: "Call", color: "from-blue-500 to-cyan-500" },
  { icon: Mail, label: "Email", color: "from-purple-500 to-violet-500" },
]

export function LiquidFloatingAction() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bottom-16 right-0 space-y-3"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            {actions.map((action, index) => (
              <motion.button
                key={action.label}
                className={`flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${action.color} text-white shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Liquid ripple effect */}
                <motion.div
                  className="absolute inset-0 bg-white/20 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: index * 0.3,
                  }}
                />
                <action.icon className="h-5 w-5 relative z-10" />
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB */}
      <motion.button
        className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center relative overflow-hidden"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Liquid background animation */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600"
          animate={{
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />

        {/* Liquid bubbles */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full"
            style={{
              left: `${30 + i * 20}%`,
              top: `${40 + i * 10}%`,
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
          />
        ))}

        <motion.div animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.3 }} className="relative z-10">
          {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </motion.div>
      </motion.button>
    </div>
  )
}
