"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"
import Image from "next/image"

interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  content: string
  rating: number
  avatar: string
}

interface LiquidTestimonialCardProps {
  testimonial: Testimonial
  isActive?: boolean
  className?: string
}

export function LiquidTestimonialCard({ testimonial, isActive = false, className = "" }: LiquidTestimonialCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="relative overflow-hidden bg-white/10 dark:bg-white/5 backdrop-blur-sm border-white/20">
        {/* Liquid background effect */}
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={
            isHovered || isActive
              ? {
                  background: [
                    "radial-gradient(circle at 20% 20%, #3b82f6 0%, transparent 50%)",
                    "radial-gradient(circle at 80% 80%, #8b5cf6 0%, transparent 50%)",
                    "radial-gradient(circle at 20% 80%, #3b82f6 0%, transparent 50%)",
                    "radial-gradient(circle at 80% 20%, #8b5cf6 0%, transparent 50%)",
                    "radial-gradient(circle at 20% 20%, #3b82f6 0%, transparent 50%)",
                  ],
                }
              : {}
          }
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Liquid border animation */}
        <motion.div
          className="absolute inset-0 rounded-lg"
          style={{
            background: `conic-gradient(from 0deg, transparent, rgba(59, 130, 246, 0.5), transparent, rgba(139, 92, 246, 0.5), transparent)`,
            padding: "1px",
          }}
          animate={
            isActive
              ? {
                  rotate: 360,
                }
              : {}
          }
          transition={{
            duration: 8,
            repeat: isActive ? Number.POSITIVE_INFINITY : 0,
            ease: "linear",
          }}
        >
          <div className="w-full h-full bg-white/10 dark:bg-gray-900/50 rounded-lg backdrop-blur-sm" />
        </motion.div>

        <CardContent className="relative z-10 p-6">
          {/* Quote icon with liquid effect */}
          <motion.div
            className="relative mb-4"
            animate={
              isHovered
                ? {
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }
                : {}
            }
            transition={{
              duration: 2,
              repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
              ease: "easeInOut",
            }}
          >
            <Quote className="h-8 w-8 text-blue-400 opacity-60" />

            {/* Liquid droplets around quote */}
            {isHovered &&
              [...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-blue-400/40 rounded-full"
                  style={{
                    left: `${-10 + i * 15}px`,
                    top: `${-5 + i * 8}px`,
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 0.6, 0],
                    y: [0, -20, -40],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeOut",
                    delay: i * 0.3,
                  }}
                />
              ))}
          </motion.div>

          {/* Testimonial content */}
          <motion.p
            className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed"
            animate={
              isActive
                ? {
                    opacity: [0.8, 1, 0.8],
                  }
                : {}
            }
            transition={{
              duration: 3,
              repeat: isActive ? Number.POSITIVE_INFINITY : 0,
              ease: "easeInOut",
            }}
          >
            "{testimonial.content}"
          </motion.p>

          {/* Rating stars with liquid animation */}
          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={
                  isHovered
                    ? {
                        scale: [1, 1.2, 1],
                        rotate: [0, 360, 0],
                      }
                    : {}
                }
                transition={{
                  duration: 1,
                  delay: i * 0.1,
                  repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
                  ease: "easeInOut",
                }}
              >
                <Star
                  className={`h-4 w-4 ${i < testimonial.rating ? "text-yellow-400 fill-current" : "text-gray-400"}`}
                />
              </motion.div>
            ))}
          </div>

          {/* Author info */}
          <div className="flex items-center">
            <motion.div className="relative mr-4" whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
              <Image
                src={testimonial.avatar || "/placeholder.svg"}
                alt={testimonial.name}
                width={48}
                height={48}
                className="rounded-full"
              />

              {/* Liquid ring around avatar */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-blue-400/50"
                animate={
                  isActive
                    ? {
                        scale: [1, 1.1, 1],
                        opacity: [0.5, 0.8, 0.5],
                      }
                    : {}
                }
                transition={{
                  duration: 2,
                  repeat: isActive ? Number.POSITIVE_INFINITY : 0,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            <div>
              <motion.h4
                className="font-semibold text-gray-900 dark:text-white"
                animate={
                  isHovered
                    ? {
                        color: ["#1f2937", "#3b82f6", "#1f2937"],
                      }
                    : {}
                }
                transition={{
                  duration: 2,
                  repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
                  ease: "easeInOut",
                }}
              >
                {testimonial.name}
              </motion.h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {testimonial.role} at {testimonial.company}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
