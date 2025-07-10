"use client"

import Image from "next/image"
import { useState, useEffect } from "react"

interface ProgressiveImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  quality?: number
  sizes?: string
  placeholder?: string
  lowQualitySrc?: string
}

export function ProgressiveImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  quality = 90,
  sizes = "(max-width: 640px) 100vw, (max-width: 768px) 80vw, (max-width: 1024px) 60vw, 50vw",
  placeholder,
  lowQualitySrc,
}: ProgressiveImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isLowQualityLoaded, setIsLowQualityLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [currentSrc, setCurrentSrc] = useState(lowQualitySrc || src)

  // Генерируем низкокачественную версию URL
  const generateLowQualityUrl = (originalSrc: string) => {
    if (lowQualitySrc) return lowQualitySrc
    // Для демонстрации используем тот же URL с низким качеством
    return originalSrc
  }

  useEffect(() => {
    if (lowQualitySrc && !isLowQualityLoaded) {
      const img = new window.Image()
      img.onload = () => {
        setIsLowQualityLoaded(true)
        setCurrentSrc(lowQualitySrc)
      }
      img.src = lowQualitySrc
    }
  }, [lowQualitySrc, isLowQualityLoaded])

  const handleLoad = () => {
    setIsLoaded(true)
    if (currentSrc !== src) {
      setCurrentSrc(src)
    }
  }

  const handleError = () => {
    setHasError(true)
  }

  // Базовый blur placeholder в формате data URL
  const blurDataURL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="

  if (hasError) {
    return (
      <div className={`bg-gradient-to-br from-forest-800/20 to-forest-700/30 flex items-center justify-center ${className} border border-forest-600/20 aspect-ratio-16-9`}>
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
      {/* Skeleton loader */}
      {!isLowQualityLoaded && !isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-forest-800/10 via-forest-700/20 to-forest-800/10 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
        </div>
      )}

      {/* Low quality image (blurred) */}
      {lowQualitySrc && isLowQualityLoaded && !isLoaded && (
        <Image
          src={lowQualitySrc}
          alt={alt}
          width={width}
          height={height}
          fill={!width && !height}
          className="object-cover filter blur-sm scale-110 transition-all duration-300"
          quality={10}
          priority={priority}
        />
      )}

      {/* High quality image */}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        fill={!width && !height}
        className={`object-cover transition-all duration-500 ${
          isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
        }`}
        priority={priority}
        quality={quality}
        loading={priority ? "eager" : "lazy"}
        onLoad={handleLoad}
        onError={handleError}
        sizes={sizes}
        placeholder="blur"
        blurDataURL={blurDataURL}
      />

      {/* Loading indicator */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-forest-900/20">
          <div className="w-8 h-8 border-2 border-forest-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  )
}
