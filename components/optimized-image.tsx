"use client"

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  quality?: number;
  className?: string;
  sizes?: string;
  style?: React.CSSProperties;
  onLoadingComplete?: () => void;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  quality = 80,
  className = '',
  sizes = '100vw',
  style,
  onLoadingComplete,
  ...props
}) => {
  // Создаем пути для WebP и оптимизированных версий
  const baseSrc = src.replace(/\.(jpg|jpeg|png)$/, '');
  const ext = src.match(/\.(jpg|jpeg|png)$/)?.[0] || '';
  
  // Определяем пути для разных форматов и размеров
  const webpSrc = `${baseSrc}.webp`;
  const optimizedSrc = `${baseSrc}-optimized${ext}`;
  const previewSrc = `${baseSrc}-preview${ext}`;
  
  // Проверяем, существует ли оптимизированная версия
  // Если нет, используем оригинальный путь
  const imageSrc = src;
  
  // Создаем базовый placeholder для блюра
  const blurDataURL = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiMyMzM1MjkiLz48L3N2Zz4=";

  // Проверяем наличие обязательных свойств width и height
  if (!fill && (!width || !height)) {
    // Если не указаны width и height и не используется fill, устанавливаем дефолтные значения
    width = width || 1200;
    height = height || 800;
    console.warn(`Warning: Image with src "${src}" is missing width or height. Using defaults: ${width}x${height}`);
  }

  return (
    <div className={cn('relative', className)} style={style}>
      {fill ? (
        <Image
          src={imageSrc}
          alt={alt}
          fill={true}
          priority={priority}
          quality={quality}
          sizes={sizes}
          placeholder="blur"
          blurDataURL={blurDataURL}
          onLoadingComplete={onLoadingComplete}
          {...props}
        />
      ) : (
        <Image
          src={imageSrc}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          quality={quality}
          sizes={sizes}
          placeholder="blur"
          blurDataURL={blurDataURL}
          onLoadingComplete={onLoadingComplete}
          {...props}
        />
      )}
    </div>
  );
};

export default OptimizedImage;
