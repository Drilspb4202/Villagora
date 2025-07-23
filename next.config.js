/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // Добавляем поддержку статического экспорта для Timeweb Cloud
  distDir: '.next',
  // Оптимизация изображений
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 дней
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: process.env.NODE_ENV === 'development', // Отключаем оптимизацию в режиме разработки
  },

  // Оптимизация производительности
  experimental: {
    // optimizeCss: true, // Отключено из-за проблем с critters в Vercel
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },

  // Сжатие
  compress: true,

  // PWA настройки
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*).webp',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },

  // Оптимизация бандла
  webpack: (config, { dev, isServer }) => {
    // Оптимизация для продакшена
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      }
    }

    return config
  },

  // Настройки для мобильных устройств
  async rewrites() {
    return [
      {
        source: '/manifest.json',
        destination: '/manifest.json',
      },
    ]
  },
}

module.exports = nextConfig
