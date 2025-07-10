"use client"

import { useState, useEffect, useRef } from "react"
import { Skeleton, SkeletonCard, SkeletonPackageCard, SkeletonFeature } from "./skeleton"

interface FastContentLoaderProps {
  children: React.ReactNode
  type?: "default" | "card" | "package" | "feature" | "gallery"
  delay?: number
  className?: string
  skeletonCount?: number
}

export function FastContentLoader({
  children,
  type = "default",
  delay = 100,
  className = "",
  skeletonCount = 1,
}: FastContentLoaderProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Небольшая задержка для плавности
          setTimeout(() => {
            setIsLoaded(true)
          }, delay)
          observer.disconnect()
        }
      },
      {
        rootMargin: "50px",
        threshold: 0.1,
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [delay])

  const renderSkeleton = () => {
    switch (type) {
      case "card":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: skeletonCount }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )
      case "package":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: skeletonCount }).map((_, i) => (
              <SkeletonPackageCard key={i} />
            ))}
          </div>
        )
      case "feature":
        return (
          <div className="space-y-6">
            {Array.from({ length: skeletonCount }).map((_, i) => (
              <SkeletonFeature key={i} />
            ))}
          </div>
        )
      case "gallery":
        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: skeletonCount }).map((_, i) => (
              <Skeleton key={i} variant="image" className="aspect-square" />
            ))}
          </div>
        )
      default:
        return <Skeleton className="h-48 w-full" />
    }
  }

  return (
    <div ref={ref} className={className}>
      {isLoaded ? (
        <div className="animate-fadeInUp">
          {children}
        </div>
      ) : isVisible ? (
        <div className="animate-pulse">
          {renderSkeleton()}
        </div>
      ) : (
        <div className="loading-gradient h-48 rounded-lg"></div>
      )}
    </div>
  )
}

// Специализированные компоненты для разных типов контента
export function FastImageGallery({
  children,
  count = 6,
  className = "",
}: {
  children: React.ReactNode
  count?: number
  className?: string
}) {
  return (
    <FastContentLoader
      type="gallery"
      skeletonCount={count}
      className={className}
      delay={150}
    >
      {children}
    </FastContentLoader>
  )
}

export function FastPackageGrid({
  children,
  count = 4,
  className = "",
}: {
  children: React.ReactNode
  count?: number
  className?: string
}) {
  return (
    <FastContentLoader
      type="package"
      skeletonCount={count}
      className={className}
      delay={200}
    >
      {children}
    </FastContentLoader>
  )
}

export function FastFeatureList({
  children,
  count = 3,
  className = "",
}: {
  children: React.ReactNode
  count?: number
  className?: string
}) {
  return (
    <FastContentLoader
      type="feature"
      skeletonCount={count}
      className={className}
      delay={100}
    >
      {children}
    </FastContentLoader>
  )
}
