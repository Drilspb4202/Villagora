import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'

// SEO метаданные
export const metadata: Metadata = {
  metadataBase: new URL('https://www.villagora.ru'),
  title: {
    default: 'Камерный ретрит в Карелии | Виллагора | Отдых на природе у озера Сямозеро',
    template: '%s | Камерный ретрит в Карелии'
  },
  description: 'Камерный ретрит в сердце Карелии - перезагрузка души в окружении леса. Насыщенный отдых на природе в загородном доме Виллагора у озера Сямозеро с баней на дровах и экотурами. Бронирование от 13,000₽ за человека.',
  generator: 'Next.js',
  applicationName: 'Ретрит Карелия',
  referrer: 'origin-when-cross-origin',
  keywords: [
    // Основные целевые запросы
    'отдых карелия', 'дом ретрит', 'ретрит карелия', 'отдых карелия дом', 'карелия дом отдых',
    'ретрит в карелии', 'отдых в карелии', 'дом для отдыха карелия', 'карельский ретрит',

    // Дополнительные ключевые слова
    'Виллагора', 'Сямозеро', 'карельская природа', 'загородный дом карелия',
    'экотуризм', 'отдых на природе', 'баня на дровах', 'карельская кухня', 'медитация в лесу',
    'перезагрузка', 'восстановление сил', 'тишина', 'лесные прогулки', 'сбор ягод',
    'рыбалка в карелии', 'экотуры', 'ароматерапия', 'природа', 'отдых летом', 'бронирование',
    'турбаза карелия', 'загородный отдых', 'эко отель', 'wellness retreat', 'digital detox',

    // Локальные запросы
    'отдых на сямозере', 'дом у озера карелия', 'аренда дома карелия', 'коттедж карелия',
    'отдых с баней карелия', 'эко дом карелия', 'retreat house karelia', 'карелия отпуск'
  ],
  authors: [{ name: 'Радмила Яковлева', url: 'https://t.me/RadmilaYaковлева' }],
  creator: 'Радмила Яковлева',
  publisher: 'Ретрит Карелия',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Камерный ретрит в Карелии | Виллагора у озера Сямозеро',
    description: 'Камерный ретрит в сердце Карелии - перезагрузка души в окружении леса. Насыщенный отдых на природе в загородном доме Виллагора с баней на дровах и экотурами. Бронирование от 13,000₽.',
    siteName: 'Камерный ретрит в Карелии',
    images: [{
      url: '/images/hero/hero.jpg',
      width: 1200,
      height: 630,
      alt: 'Ретрит в Карелии - отдых на природе в Виллагоре',
    }, {
      url: '/images/gallery/hero-landscape.jpg',
      width: 1200,
      height: 800,
      alt: 'Карельская природа - озеро и лес',
    }],
    locale: 'ru_RU',
    type: 'website',
    url: 'https://www.villagora.ru',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Камерный ретрит в Карелии | Виллагора у озера Сямозеро',
    description: 'Камерный ретрит в сердце Карелии - перезагрузка души в окружении леса. Насыщенный отдых на природе с баней на дровах. Бронирование от 13,000₽.',
    images: ['/images/hero/hero.jpg'],
    creator: '@RadmilaYаковлева',
    site: '@VillagoraRetreat',
  },
  alternates: {
    canonical: 'https://www.villagora.ru',
  },
  category: 'travel',
  verification: {
    google: 'googleverification',
    yandex: 'yandexverification',
  },
  appleWebApp: {
    capable: true,
    title: 'Ретрит Карелия',
    statusBarStyle: 'black-translucent',
  },
}

// Импортируем клиентский компонент StagewiseToolbarClient
import StagewiseToolbarClient from './stagewise-toolbar-client'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        {/* Мобильная оптимизация */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes, viewport-fit=cover" />
        <meta name="format-detection" content="telephone=yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="theme-color" content="#1a2e05" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0f1a03" media="(prefers-color-scheme: dark)" />
        <meta name="msapplication-navbutton-color" content="#1a2e05" />
        <meta name="apple-mobile-web-app-title" content="Ретрит Карелия" />

        {/* SEO и индексация */}
        <link rel="canonical" href="https://www.villagora.ru" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="bingbot" content="index, follow" />
        <meta name="yandex" content="index, follow" />

        {/* Иконки и манифест */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon-192x192.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Дополнительные мета-теги для корректного отображения при поделении ссылкой */}
        <meta property="og:title" content="Камерный ретрит в Карелии | Виллагора" />
        <meta property="og:description" content="Камерный ретрит в сердце Карелии - перезагрузка души в окружении леса. Насыщенный отдых на природе в загородном доме Виллагора у озера Сямозеро с баней на дровах и экотурами." />
        <meta property="og:image" content={`https://www.villagora.ru/images/hero/hero.jpg?v=${Date.now()}`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Камерный ретрит в Карелии - отдых на природе у озера Сямозеро" />
        <meta property="og:url" content="https://www.villagora.ru" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Камерный ретрит в Карелии" />
        <meta property="og:locale" content="ru_RU" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Камерный ретрит в Карелии | Виллагора" />
        <meta name="twitter:description" content="Камерный ретрит в сердце Карелии - перезагрузка души в окружении леса. Насыщенный отдых на природе с баней на дровах." />
        <meta name="twitter:image" content={`https://www.villagora.ru/images/hero/hero.jpg?v=${Date.now()}`} />
        <meta name="twitter:image:alt" content="Камерный ретрит в Карелии - отдых на природе" />
        <meta name="twitter:creator" content="@RadmilaYаковлева" />
        <meta name="twitter:site" content="@VillagoraRetreat" />

        {/* Дополнительные SEO метатеги */}
        <meta name="author" content="Радмила Яковлева" />
        <meta name="publisher" content="Камерный ретрит в Карелии" />
        <meta name="application-name" content="Камерный ретрит в Карелии" />
        <meta name="msapplication-TileColor" content="#1a2e05" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        {/* Дополнительные метатеги для целевых запросов */}
        <meta name="subject" content="Отдых в Карелии, аренда дома, ретрит на природе" />
        <meta name="topic" content="Отдых Карелия дом ретрит" />
        <meta name="summary" content="Отдых в Карелии в доме-ретрите Виллагора у озера Сямозеро с баней и экотурами" />
        <meta name="classification" content="Туризм, отдых, ретрит, Карелия" />
        <meta name="designer" content="Радмила Яковлева" />
        <meta name="owner" content="Радмила Яковлева" />
        <meta name="url" content="https://www.villagora.ru" />
        <meta name="identifier-URL" content="https://www.villagora.ru" />
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
        <meta name="pagename" content="Камерный ретрит в Карелии" />
        <meta name="pagetopic" content="камерный ретрит карелия отдых на природе" />
        <meta name="page-type" content="Туристический сайт" />

        {/* Дополнительные метатеги для поисковых систем */}
        <meta name="language" content="Russian" />
        <meta name="content-language" content="ru" />
        <meta name="reply-to" content="info@villagora.ru" />
        <meta name="expires" content="never" />
        <meta name="cache-control" content="public" />
        <meta name="pragma" content="cache" />
        <meta name="resource-type" content="document" />
        <meta name="document-type" content="Public" />
        <meta name="document-rating" content="Safe for Kids" />
        <meta name="document-distribution" content="Global" />
        <meta name="document-classification" content="Business" />

        {/* Метатеги для социальных сетей */}
        <meta name="vk:image" content="https://www.villagora.ru/images/hero/hero.jpg" />
        <meta name="vk:title" content="Камерный ретрит в Карелии | Виллагора" />
        <meta name="vk:description" content="Камерный ретрит в сердце Карелии - перезагрузка души в окружении леса" />

        {/* Метатеги для мессенджеров */}
        <meta name="telegram:channel" content="@RadmilaYаковлева" />
        <meta name="whatsapp:title" content="Камерный ретрит в Карелии" />
        <meta name="whatsapp:description" content="Камерный ретрит в сердце Карелии - перезагрузка души в окружении леса" />

        {/* Дополнительные локальные метатеги */}
        <meta name="locality" content="Виллагора" />
        <meta name="region" content="Карелия" />
        <meta name="country" content="Россия" />
        <meta name="postal-code" content="186350" />
        <meta name="street-address" content="деревня Виллагора" />
        <meta name="organization" content="Камерный ретрит в Карелии" />
        <meta name="contact" content="info@villagora.ru" />

        {/* Геолокация для локального SEO */}
        <meta name="geo.region" content="RU-KR" />
        <meta name="geo.placename" content="Деревня Виллагора, Карелия, Россия" />
        <meta name="geo.position" content="61.89101283682342;33.68979055651442" />
        <meta name="ICBM" content="61.89101283682342, 33.68979055651442" />

        {/* Preconnect для улучшения производительности */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />

        {/* Preload только критических изображений, которые используются сразу */}
        <link rel="preload" as="image" href="/images/hero/hero.jpg" />
        <link rel="preload" as="image" href="/images/syamozero/syamozero-1.jpg" />
        <link rel="preload" as="image" href="/images/accommodation/house-1.jpg" />

        {/* Prefetch для изображений, которые скоро понадобятся */}
        <link rel="prefetch" as="image" href="/images/wellness/sauna-1.jpg" />
        <link rel="prefetch" as="image" href="/images/ecotours/karelian-forest-1.jpg" />

        {/* Шрифты с display=swap для быстрой загрузки */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap"
        />

        {/* Yandex.Metrika counter */}
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){
                try {
                  m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                  m[i].l=1*new Date();
                  for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                  k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a);

                  // Handle script load errors
                  k.onerror = function() {
                    console.log('Yandex.Metrika script failed to load (possibly blocked)');
                  };
                } catch(e) {
                  console.log('Yandex.Metrika initialization failed:', e);
                }
              })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

              // Initialize with error handling
              setTimeout(function() {
                try {
                  if (typeof ym !== 'undefined') {
                    ym(103023290, "init", {
                         clickmap:true,
                         trackLinks:true,
                         accurateTrackBounce:true,
                         webvisor:true,
                         ecommerce:"dataLayer"
                    });
                  }
                } catch(e) {
                  console.log('Yandex.Metrika init failed:', e);
                }
              }, 100);
            `
          }}
        />
        <noscript>
          <div>
            <img src="https://mc.yandex.ru/watch/103023290" style={{position:'absolute', left:'-9999px'}} alt="" />
          </div>
        </noscript>

        {/* Структурированные данные JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "TouristAttraction",
                "name": "Отдых в Карелии - Дом Ретрит Виллагора",
                "alternateName": "Виллагора Ретрит",
                "description": "Отдых в Карелии в загородном доме-ретрите Виллагора у озера Сямозеро. Аренда уютного дома с баней на дровах, карельской кухней и экотурами для восстановления сил на природе.",
                "url": "https://www.villagora.ru",
                "sameAs": [
                  "https://t.me/RadmilaYаковлева"
                ],
                "image": [
                  "https://www.villagora.ru/images/hero/hero.jpg",
                  "https://www.villagora.ru/images/syamozero/syamozero-1.jpg",
                  "https://www.villagora.ru/images/accommodation/house-1.jpg"
                ],
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Виллагора",
                  "addressRegion": "Республика Карелия",
                  "addressCountry": "RU",
                  "postalCode": "186350"
                },
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": 61.89101283682342,
                  "longitude": 33.68979055651442
                },
                "offers": {
                  "@type": "Offer",
                  "priceCurrency": "RUB",
                  "price": "13000",
                  "priceSpecification": {
                    "@type": "PriceSpecification",
                    "price": "13000",
                    "priceCurrency": "RUB",
                    "unitText": "за человека в день"
                  },
                  "availability": "https://schema.org/InStock",
                  "validFrom": "2024-01-01",
                  "category": "Отдых и туризм"
                },
                "amenityFeature": [
                  {
                    "@type": "LocationFeatureSpecification",
                    "name": "Баня на дровах",
                    "value": true
                  },
                  {
                    "@type": "LocationFeatureSpecification",
                    "name": "Проживание в доме",
                    "value": true
                  },
                  {
                    "@type": "LocationFeatureSpecification",
                    "name": "Карельская кухня",
                    "value": true
                  },
                  {
                    "@type": "LocationFeatureSpecification",
                    "name": "Экотуры",
                    "value": true
                  },
                  {
                    "@type": "LocationFeatureSpecification",
                    "name": "Ароматерапия",
                    "value": true
                  },
                  {
                    "@type": "LocationFeatureSpecification",
                    "name": "Озеро Сямозеро",
                    "value": true
                  }
                ],
                "provider": {
                  "@type": "Person",
                  "name": "Радмила Яковлева",
                  "url": "https://t.me/RadmilaYаковлева"
                },
                "keywords": "отдых карелия, дом ретрит, карелия отдых, загородный дом, баня на дровах, озеро сямозеро"
              },
              {
                "@context": "https://schema.org",
                "@type": "LodgingBusiness",
                "name": "Дом Ретрит Виллагора",
                "description": "Загородный дом для отдыха в Карелии у озера Сямозеро с баней на дровах",
                "url": "https://www.villagora.ru",
                "telephone": "+7-XXX-XXX-XXXX",
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
                "amenityFeature": [
                  "Баня на дровах",
                  "Питание включено",
                  "Экотуры",
                  "Ароматерапия",
                  "Доступ к озеру"
                ]
              },
              {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "Как добраться до ретрита в Виллагоре?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Мы организуем комфортабельный трансфер от вокзала до места отдыха и обратно. Встретим, отвезём и с теплом проводим обратно."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Что включено в стоимость ретрита?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "В стоимость включено: проживание, питание, трансфер, баня на дровах, экотуры и ароматерапия (в зависимости от выбранного пакета)."
                    }
                  }
                ]
              }
            ])
          }}
        />
      </head>
      <body suppressHydrationWarning={true} className="overflow-x-hidden">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          {/* Добавляем StagewiseToolbar через клиентский компонент */}
          {process.env.NODE_ENV === 'development' && <StagewiseToolbarClient />}
        </ThemeProvider>
      </body>
    </html>
  )
}
