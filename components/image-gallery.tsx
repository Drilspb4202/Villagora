"use client"

import { useState, useEffect } from "react"
import { OptimizedImage } from "./optimized-image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ImageGalleryProps {
  images: string[]
  title: string
  className?: string
}

export function ImageGallery({ images, title, className = "" }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [preloadedImages, setPreloadedImages] = useState<Set<string>>(new Set())
  const [imageOrientation, setImageOrientation] = useState<'landscape' | 'portrait' | 'square'>('landscape')
  const [touchStart, setTouchStart] = useState<number | null>(null)

  // Функция для определения ориентации изображения
  const checkImageOrientation = (imageSrc: string) => {
    if (!imageSrc) return

    const img = new Image()
    img.onload = () => {
      const aspectRatio = img.width / img.height
      if (aspectRatio > 1.2) {
        setImageOrientation('landscape')
      } else if (aspectRatio < 0.8) {
        setImageOrientation('portrait')
      } else {
        setImageOrientation('square')
      }
    }
    img.src = imageSrc
  }

  // Preload next and previous images
  useEffect(() => {
    const preloadIndexes = [(currentIndex + 1) % images.length, (currentIndex - 1 + images.length) % images.length]

    preloadIndexes.forEach((index) => {
      const imageUrl = images[index]
      if (!preloadedImages.has(imageUrl)) {
        const img = new Image()
        img.src = imageUrl
        img.onload = () => {
          setPreloadedImages((prev) => new Set([...prev, imageUrl]))
        }
      }
    })
  }, [currentIndex, images, preloadedImages])

  // Проверяем ориентацию текущего изображения
  useEffect(() => {
    if (images[currentIndex]) {
      checkImageOrientation(images[currentIndex])
    }
  }, [currentIndex, images])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        prevImage()
      } else if (event.key === 'ArrowRight') {
        nextImage()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])  // eslint-disable-line react-hooks/exhaustive-deps

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className={`relative ${className}`}>
      <div
        className={`relative rounded-lg overflow-hidden flex items-center justify-center cursor-pointer select-none mobile-optimized touch-optimized ${
          imageOrientation === 'portrait'
            ? 'h-[50vh] sm:h-[60vh] max-h-[400px] sm:max-h-[500px]'
            : imageOrientation === 'square'
            ? 'h-64 sm:h-80 md:h-96'
            : 'h-56 sm:h-72 md:h-96'
        }`}
        onTouchStart={(e) => {
          const touch = e.touches[0]
          setTouchStart(touch.clientX)
        }}
        onTouchEnd={(e) => {
          if (!touchStart) return
          const touch = e.changedTouches[0]
          const diff = touchStart - touch.clientX

          if (Math.abs(diff) > 50) { // Minimum swipe distance
            if (diff > 0) {
              nextImage() // Swipe left = next image
            } else {
              prevImage() // Swipe right = previous image
            }
          }
          setTouchStart(null)
        }}
      >
        <OptimizedImage
          src={images[currentIndex]}
          alt={`${title} ${currentIndex + 1}`}
          priority={currentIndex === 0}
          className={`w-full h-full ${
            imageOrientation === 'portrait'
              ? 'object-contain'
              : 'object-cover'
          }`}
        />

        {/* Navigation - оптимизированная для мобильных */}
        <Button
          variant="outline"
          size="icon"
          className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-black/60 border-white/20 text-white hover:bg-black/80 w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-lg touch-manipulation"
          onClick={prevImage}
        >
          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-black/60 border-white/20 text-white hover:bg-black/80 w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-lg touch-manipulation"
          onClick={nextImage}
        >
          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
        </Button>

        {/* Indicators - показываем только для небольшого количества изображений */}
        {images.length <= 10 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentIndex ? "bg-white scale-125" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        )}

        {/* Счетчик для большого количества изображений */}
        {images.length > 10 && (
          <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      <div className="mt-4">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-forest-600 scrollbar-track-forest-800/20 smooth-scroll">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all duration-200 touch-manipulation ${
                index === currentIndex
                  ? "border-forest-400 scale-105 sm:scale-110 shadow-lg"
                  : "border-forest-700/30 hover:border-forest-500/50 active:scale-95 sm:hover:scale-105"
              }`}
              title={`Фото ${index + 1}`}
            >
              <OptimizedImage
                src={image}
                alt={`${title} thumbnail ${index + 1}`}
                className="w-full h-full"
              />

              {/* Номер изображения для больших галерей */}
              {images.length > 15 && (
                <div className="absolute top-1 left-1 bg-black/70 text-white text-xs px-1 rounded">
                  {index + 1}
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Подсказки для мобильных */}
        {images.length > 5 && (
          <div className="mt-2 text-center space-y-1">
            <p className="text-xs text-forest-500 sm:hidden">
              ← Прокрутите для просмотра всех фото →
            </p>
            <p className="text-xs text-forest-400 sm:hidden">
              Свайпайте по фото влево/вправо для переключения
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
