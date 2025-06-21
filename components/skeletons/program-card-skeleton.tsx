"use client"
import { AnimatedSkeleton } from "@/components/ui/animated-skeleton"
import { Card, CardContent } from "@/components/ui/card"

export function ProgramCardSkeleton() {
  return (
    <Card className="bg-white/80 dark:bg-white/5 border-gray-200 dark:border-white/10 backdrop-blur-sm h-full">
      <CardContent className="p-4 md:p-6">
        {/* Icon skeleton */}
        <AnimatedSkeleton variant="shimmer" className="w-12 h-12 md:w-16 md:h-16 rounded-2xl mb-4 md:mb-6" />

        {/* Title skeleton */}
        <AnimatedSkeleton variant="pulse" className="h-6 md:h-8 w-3/4 mb-3 rounded" />

        {/* Description skeleton */}
        <div className="space-y-2 mb-4">
          <AnimatedSkeleton variant="wave" className="h-4 w-full rounded" />
          <AnimatedSkeleton variant="wave" className="h-4 w-5/6 rounded" />
          <AnimatedSkeleton variant="wave" className="h-4 w-4/5 rounded" />
        </div>

        {/* Badge and stats skeleton */}
        <div className="flex justify-between items-center mb-4">
          <AnimatedSkeleton variant="glow" className="h-6 w-20 rounded-full" />
          <AnimatedSkeleton variant="pulse" className="h-4 w-16 rounded" />
        </div>

        {/* Button skeleton */}
        <AnimatedSkeleton variant="shimmer" className="h-10 w-full rounded-lg" />
      </CardContent>
    </Card>
  )
}
