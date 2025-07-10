import Head from 'next/head'
import { russianSeoConfig, generateRussianSeoTags } from '@/lib/russian-seo'

interface SeoHeadProps {
  pageType?: 'home' | 'accommodation' | 'services' | 'gallery' | 'booking'
  customTitle?: string
  customDescription?: string
  customKeywords?: string[]
  customImage?: string
  customUrl?: string
}

export function SeoHead({
  pageType = 'home',
  customTitle,
  customDescription,
  customKeywords = [],
  customImage,
  customUrl
}: SeoHeadProps) {
  const seoData = generateRussianSeoTags(pageType)
  
  const title = customTitle || seoData.title
  const description = customDescription || seoData.description
  const keywords = [...seoData.keywords, ...customKeywords].join(', ')
  const image = customImage || 'https://www.villagora.ru/images/hero/hero.jpg'
  const url = customUrl || 'https://www.villagora.ru'

  return (
    <Head>
      {/* Основные метатеги */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Дополнительные SEO метатеги */}
      <meta name="subject" content="Отдых в Карелии, аренда дома, ретрит на природе" />
      <meta name="topic" content="Отдых Карелия дом ретрит" />
      <meta name="summary" content={description} />
      <meta name="classification" content="Туризм, отдых, ретрит, Карелия" />
      <meta name="designer" content="Радмила Яковлева" />
      <meta name="owner" content="Радмила Яковлева" />
      <meta name="url" content={url} />
      <meta name="identifier-URL" content={url} />
      <meta name="directory" content="submission" />
      <meta name="category" content="Туризм и отдых" />
      <meta name="coverage" content="Worldwide" />
      <meta name="distribution" content="Global" />
      <meta name="rating" content="General" />
      <meta name="revisit-after" content="7 days" />
      <meta name="subtitle" content="Загородный дом для отдыха в Карелии" />
      <meta name="target" content="all" />
      <meta name="HandheldFriendly" content="True" />
      <meta name="MobileOptimized" content="320" />
      <meta name="audience" content="all" />
      <meta name="pagename" content={title} />
      <meta name="pagetopic" content="отдых карелия дом ретрит" />
      <meta name="page-type" content="Туристический сайт" />
      
      {/* Геолокация */}
      <meta name="geo.region" content="RU-KR" />
      <meta name="geo.placename" content="Деревня Виллагора, Карелия, Россия" />
      <meta name="geo.position" content="61.89101283682342;33.68979055651442" />
      <meta name="ICBM" content="61.89101283682342, 33.68979055651442" />
      
      {/* Верификация поисковых систем */}
      <meta name="yandex-verification" content="f50dc52975e186f5" />
      <meta name="google-site-verification" content="71af140f47e6ae4c" />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Отдых в Карелии - дом ретрит у озера Сямозеро" />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Отдых Карелия Дом Ретрит" />
      <meta property="og:locale" content="ru_RU" />
      
      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content="Отдых в Карелии - дом ретрит у озера" />
      <meta name="twitter:creator" content="@RadmilaYakovleva" />
      <meta name="twitter:site" content="@VillagoraRetreat" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Дополнительные ссылки */}
      <link rel="alternate" hrefLang="ru" href={url} />
      <link rel="alternate" hrefLang="x-default" href={url} />
      
      {/* Структурированные данные для конкретной страницы */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": title,
            "description": description,
            "url": url,
            "image": image,
            "inLanguage": "ru-RU",
            "isPartOf": {
              "@type": "WebSite",
              "name": "Отдых Карелия Дом Ретрит",
              "url": "https://www.villagora.ru"
            },
            "about": {
              "@type": "TouristAttraction",
              "name": "Дом Ретрит Виллагора",
              "description": "Отдых в Карелии в загородном доме у озера Сямозеро",
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 61.89101283682342,
                "longitude": 33.68979055651442
              }
            },
            "mainEntity": {
              "@type": "LocalBusiness",
              "name": "Отдых Карелия Дом Ретрит - Виллагора",
              "description": description,
              "url": url,
              "telephone": "+7 921 646 5545",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Виллагора",
                "addressRegion": "Республика Карелия",
                "addressCountry": "RU"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 61.89101283682342,
                "longitude": 33.68979055651442
              },
              "priceRange": "13000-20000 RUB",
              "servesCuisine": "Карельская кухня",
              "amenityFeature": [
                "Баня на дровах",
                "Проживание в доме",
                "Карельская кухня",
                "Экотуры",
                "Ароматерапия",
                "Доступ к озеру Сямозеро"
              ]
            }
          })
        }}
      />
    </Head>
  )
}

// Хук для динамического обновления метатегов
export function useSeoUpdate(pageData: SeoHeadProps) {
  if (typeof document !== 'undefined') {
    // Обновляем title
    if (pageData.customTitle) {
      document.title = pageData.customTitle
    }
    
    // Обновляем description
    if (pageData.customDescription) {
      const descMeta = document.querySelector('meta[name="description"]')
      if (descMeta) {
        descMeta.setAttribute('content', pageData.customDescription)
      }
    }
    
    // Обновляем Open Graph
    if (pageData.customTitle) {
      const ogTitle = document.querySelector('meta[property="og:title"]')
      if (ogTitle) {
        ogTitle.setAttribute('content', pageData.customTitle)
      }
    }
    
    if (pageData.customDescription) {
      const ogDesc = document.querySelector('meta[property="og:description"]')
      if (ogDesc) {
        ogDesc.setAttribute('content', pageData.customDescription)
      }
    }
    
    if (pageData.customImage) {
      const ogImage = document.querySelector('meta[property="og:image"]')
      if (ogImage) {
        ogImage.setAttribute('content', pageData.customImage)
      }
    }
  }
}
