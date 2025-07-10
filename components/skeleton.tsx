"use client"

import { cn } from "@/lib/utils"

interface SkeletonProps {
  className?: string
  variant?: "default" | "card" | "text" | "image" | "button" | "circle"
  animate?: boolean
}

export function Skeleton({ 
  className, 
  variant = "default",
  animate = true,
  ...props 
}: SkeletonProps & React.HTMLAttributes<HTMLDivElement>) {
  const baseClasses = "bg-gradient-to-r from-forest-800/20 via-forest-700/30 to-forest-800/20"
  const animateClasses = animate ? "animate-pulse" : ""
  
  const variantClasses = {
    default: "rounded-md",
    card: "rounded-lg h-48 w-full",
    text: "rounded h-4 w-full",
    image: "rounded-lg aspect-video w-full",
    button: "rounded-full h-10 w-24",
    circle: "rounded-full aspect-square"
  }

  return (
    <div
      className={cn(
        baseClasses,
        animateClasses,
        variantClasses[variant],
        className
      )}
      {...props}
    />
  )
}

// Специализированные skeleton компоненты
export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-3", className)}>
      <Skeleton variant="image" />
      <div className="space-y-2">
        <Skeleton variant="text" className="h-4 w-3/4" />
        <Skeleton variant="text" className="h-4 w-1/2" />
      </div>
    </div>
  )
}

export function SkeletonGallery({ count = 6, className }: { count?: number; className?: string }) {
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}

export function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton 
          key={i} 
          variant="text" 
          className={i === lines - 1 ? "w-2/3" : "w-full"} 
        />
      ))}
    </div>
  )
}

export function SkeletonPackageCard({ className }: { className?: string }) {
  return (
    <div className={cn("p-6 border border-forest-700/30 rounded-lg space-y-4", className)}>
      <div className="text-center space-y-2">
        <Skeleton variant="text" className="h-6 w-32 mx-auto" />
        <Skeleton variant="text" className="h-4 w-20 mx-auto" />
      </div>
      <div className="text-center">
        <Skeleton variant="text" className="h-8 w-24 mx-auto" />
        <Skeleton variant="text" className="h-3 w-32 mx-auto mt-1" />
      </div>
      <Skeleton variant="text" className="h-4 w-full" />
      <Skeleton variant="button" className="w-full" />
    </div>
  )
}

export function SkeletonFeature({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-start space-x-4", className)}>
      <Skeleton variant="circle" className="w-12 h-12 flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton variant="text" className="h-5 w-3/4" />
        <SkeletonText lines={2} />
      </div>
    </div>
  )
}

// Shimmer эффект для более красивой анимации
export function ShimmerSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("relative overflow-hidden bg-forest-800/20 rounded-lg", className)}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
    </div>
  )
}
