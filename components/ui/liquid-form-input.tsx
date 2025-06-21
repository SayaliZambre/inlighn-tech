"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"

interface LiquidFormInputProps {
  placeholder?: string
  type?: string
  value?: string
  onChange?: (value: string) => void
  className?: string
  label?: string
}

export function LiquidFormInput({
  placeholder = "",
  type = "text",
  value = "",
  onChange,
  className = "",
  label,
}: LiquidFormInputProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [hasValue, setHasValue] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setHasValue(newValue.length > 0)
    onChange?.(newValue)
  }

  const fillPercentage = Math.min((value.length / 20) * 100, 100)

  return (
    <div className={`relative ${className}`}>
      {label && (
        <motion.label
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          animate={{
            color: isFocused ? "#3b82f6" : undefined,
          }}
        >
          {label}
        </motion.label>
      )}

      <div className="relative">
        {/* Liquid fill background */}
        <div className="absolute inset-0 rounded-lg overflow-hidden">
          <motion.div
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-500/20 to-blue-400/10"
            initial={{ height: 0 }}
            animate={{
              height: isFocused || hasValue ? `${Math.max(fillPercentage, 10)}%` : 0,
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Liquid wave effect */}
            <svg className="absolute top-0 left-0 w-full h-4" viewBox="0 0 400 20" preserveAspectRatio="none">
              <motion.path
                d="M0,10 Q100,0 200,10 T400,10 L400,20 L0,20 Z"
                fill="rgba(59, 130, 246, 0.3)"
                animate={{
                  d: [
                    "M0,10 Q100,0 200,10 T400,10 L400,20 L0,20 Z",
                    "M0,5 Q100,15 200,5 T400,5 L400,20 L0,20 Z",
                    "M0,10 Q100,0 200,10 T400,10 L400,20 L0,20 Z",
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            </svg>

            {/* Floating bubbles */}
            {(isFocused || hasValue) &&
              [...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-blue-400/40 rounded-full"
                  style={{
                    left: `${20 + i * 30}%`,
                    bottom: "20%",
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.4, 0.8, 0.4],
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
          </motion.div>
        </div>

        {/* Input field */}
        <Input
          ref={inputRef}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`relative z-10 bg-transparent border-2 transition-all duration-300 ${
            isFocused ? "border-blue-500 shadow-lg shadow-blue-500/20" : "border-gray-300 dark:border-gray-600"
          }`}
        />

        {/* Liquid border animation */}
        <motion.div
          className="absolute inset-0 rounded-lg border-2 border-blue-500"
          initial={{ opacity: 0, scale: 1 }}
          animate={{
            opacity: isFocused ? [0, 0.5, 0] : 0,
            scale: isFocused ? [1, 1.02, 1] : 1,
          }}
          transition={{
            duration: 2,
            repeat: isFocused ? Number.POSITIVE_INFINITY : 0,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  )
}
