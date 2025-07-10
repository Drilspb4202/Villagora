"use client"

import Image from "next/image"
import { useState } from "react"

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  placeholder?: string
  onLoad?: () => void
  loading?: "lazy" | "eager"
  quality?: number
  sizes?: string
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  placeholder,
  onLoad,
  loading = "lazy",
  quality = 90,
  sizes = "(max-width: 640px) 100vw, (max-width: 768px) 80vw, (max-width: 1024px) 60vw, 50vw",
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  const handleLoad = () => {
    setIsLoaded(true)
    onLoad?.()
  }

  const handleError = () => {
    setHasError(true)
  }

  if (hasError) {
    return (
      <div className={`bg-gradient-to-br from-forest-800/20 to-forest-700/30 flex items-center justify-center ${className} border border-forest-600/20`}>
        <div className="text-forest-400 text-center p-4">
          <div className="text-3xl mb-2">🏞️</div>
          <p className="text-sm font-medium">Скоро здесь будет фото</p>
          <p className="text-xs text-forest-500 mt-1">Карельская природа</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Enhanced Skeleton with shimmer */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-forest-800/10 via-forest-700/20 to-forest-800/10 rounded-lg">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
        </div>
      )}

      {/* Low quality placeholder if provided */}
      {placeholder && !isLoaded && (
        <Image src={placeholder || "/placeholder.svg"} alt={alt} fill className="object-cover blur-sm" quality={10} />
      )}

      {/* Main image */}
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        fill={!width && !height}
        className={`object-cover transition-all duration-500 mobile-image ${
          isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
        }`}
        priority={priority}
        quality={quality}
        loading={priority ? "eager" : loading}
        onLoad={handleLoad}
        onError={handleError}
        sizes={sizes}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
      />

      {/* Loading indicator */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-forest-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  )
}
