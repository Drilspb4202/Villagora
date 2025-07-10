"use client"

import { useState, useEffect, useRef } from "react"
import { ProgressiveImage } from "./progressive-image"

interface SmartLazyImageProps {
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
  preloadDistance?: number
}

export function SmartLazyImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  quality = 90,
  sizes,
  placeholder,
  lowQualitySrc,
  preloadDistance = 200, // Расстояние в пикселях для предзагрузки
}: SmartLazyImageProps) {
  const [shouldLoad, setShouldLoad] = useState(priority)
  const [isPreloading, setIsPreloading] = useState(false)
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (priority || shouldLoad) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Предзагрузка когда элемент приближается к viewport
          if (entry.isIntersecting || entry.boundingClientRect.top < preloadDistance) {
            if (!isPreloading) {
              setIsPreloading(true)
              // Предзагружаем изображение
              const img = new Image()
              img.src = src
              img.onload = () => {
                setShouldLoad(true)
              }
            }
          }
        })
      },
      {
        rootMargin: `${preloadDistance}px`,
        threshold: 0,
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [src, priority, shouldLoad, isPreloading, preloadDistance])

  return (
    <div ref={imgRef} className={className}>
      {shouldLoad ? (
        <ProgressiveImage
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-full"
          priority={priority}
          quality={quality}
          sizes={sizes}
          placeholder={placeholder}
          lowQualitySrc={lowQualitySrc}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-forest-800/10 to-forest-700/20 flex items-center justify-center aspect-ratio-16-9">
          {isPreloading ? (
            <div className="flex flex-col items-center space-y-2">
              <div className="w-6 h-6 border-2 border-forest-400 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-xs text-forest-400">Загрузка...</p>
            </div>
          ) : (
            <div className="text-forest-400 text-center">
              <div className="text-2xl mb-1">🏞️</div>
              <p className="text-xs">Фото загрузится</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
