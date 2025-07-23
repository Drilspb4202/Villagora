"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  MapPin,
  CalendarIcon,
  Users,
  Phone,
  MessageCircle,
  Waves,
  TreePine,
  Home,
  Utensils,
  Droplets,
  Flame,
  ShoppingCart,
  Heart,
  Star,
  ArrowRight,
  Mountain,
  X,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  FileText,
} from "lucide-react"
import NextImage from "next/image"
import { useState, useEffect } from "react"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { OptimizedImage } from "@/components/optimized-image"
import {
  trackBookingFormOpened,
  trackBookingFormSubmitted,
  trackPhoneClick,
  trackTelegramClick,
  trackMapOpened,
  trackGalleryViewed,
  initYandexMetrikaTracking
} from "@/lib/yandex-metrika"

// Импорт клиентского компонента StagewiseToolbar
import StagewiseToolbarClient from '@/components/stagewise-toolbar-client'

// Импорты удалены

// Страница с SEO-оптимизацией для ретрита в Карелии
export default function KareliaRetreatLanding() {
  const [isVisible, setIsVisible] = useState(false)
  const [activePackage, setActivePackage] = useState(1)
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState("")
  const [checkInDate, setCheckInDate] = useState<Date>()
  const [checkOutDate, setCheckOutDate] = useState<Date>()
  const [checkInOpen, setCheckInOpen] = useState(false)
  const [checkOutOpen, setCheckOutOpen] = useState(false)
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [imageOrientation, setImageOrientation] = useState<'landscape' | 'portrait' | 'square'>('landscape')
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    guests: "1",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [isMapOpen, setIsMapOpen] = useState(false)

  // Обработчики для календарей
  const handleCheckInSelect = (date: Date | undefined) => {
    console.log('Check-in date selected:', date)
    setCheckInDate(date)
    setCheckInOpen(false)
  }

  const handleCheckOutSelect = (date: Date | undefined) => {
    console.log('Check-out date selected:', date)
    console.log('Current checkOutDate:', checkOutDate)
    console.log('Setting checkOutDate to:', date)
    setCheckOutDate(date)
    setCheckOutOpen(false)
    console.log('Check-out handler completed')
  }

  // Функция для расчета общей стоимости
  const calculateTotalPrice = () => {
    if (!selectedPackage || !formData.guests) return 0

    const selectedPkg = packages.find(pkg => pkg.name === selectedPackage)
    if (!selectedPkg) return 0

    const guestCount = parseInt(formData.guests) // Получаем число гостей
    const totalPrice = selectedPkg.pricePerPersonPerDay * selectedPkg.days * guestCount

    return totalPrice
  }

  // Функция для форматирования цены
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU').format(price) + ' ₽'
  }

  const [imagesLoaded, setImagesLoaded] = useState(false)

  useEffect(() => {
    setIsVisible(true)

    // Preload critical hero background image with high priority
    const heroImage = new window.Image()
    heroImage.src = "/images/hero/hero.jpg"
    heroImage.onload = () => {
      console.log("Hero background loaded")
    }

    // Preload other critical images
    const preloadImages = [
      "/images/hero/hero.jpg", // Hero background
    ]

    preloadImages.forEach((src) => {
      const img = new window.Image()
      img.src = src
    })

    // Инициализация Яндекс.Метрики трекинга
    initYandexMetrikaTracking()
  }, [])

  const preloadImageBatch = (imageUrls: string[]) => {
    let loadedCount = 0
    const totalImages = imageUrls.length

    imageUrls.forEach((url) => {
      const img = new window.Image()
      img.onload = () => {
        loadedCount++
        if (loadedCount === totalImages) {
          setImagesLoaded(true)
        }
      }
      img.src = url
    })
  }

  const packages = [
    {
      name: "Минимальный",
      duration: "3 дня",
      days: 3,
      price: "33 000 ₽",
      pricePerPersonPerDay: 11000,
      description: "Идеально для первого знакомства",
      gradient: "from-forest-600 to-forest-700",
      features: ["Проживание", "Питание", "Трансфер", "Баня"],
    },
    {
      name: "Средний",
      duration: "5 дней",
      days: 5,
      price: "52 000 ₽",
      pricePerPersonPerDay: 10400,
      description: "Оптимальный баланс отдыха",
      popular: true,
      gradient: "from-forest-500 to-forest-600",
      features: ["Проживание", "Питание", "Трансфер", "Баня", "Экотуры", "Ароматерапия"],
    },
    {
      name: "Комфортный",
      duration: "7 дней",
      days: 7,
      price: "68 000 ₽",
      pricePerPersonPerDay: 9415,
      description: "Полное погружение в природу",
      gradient: "from-forest-400 to-forest-500",
      features: ["Проживание", "Питание", "Трансфер", "Баня", "Экотуры", "Ароматерапия", "Рыбалка"],
    },
    {
      name: "Максимальный",
      duration: "10 дней",
      days: 10,
      price: "89 000 ₽",
      pricePerPersonPerDay: 8900,
      description: "Глубокая перезагрузка души",
      gradient: "from-amber-600 to-forest-600",
      features: ["Все включено", "Персональный гид", "Индивидуальные экскурсии", "Спа-процедуры"],
    },
  ]

  const features = [
    {
      id: "house",
      icon: <Home className="h-6 w-6 sm:h-8 sm:w-8" />,
      title: "Уютный дом",
      description: "Двухэтажный дом в тишине карельской природы",
      color: "from-forest-400 to-forest-600",
      images: [
        "/images/accommodation/house-1.jpg",
        "/images/accommodation/house-2.jpg",
        "/images/accommodation/house-3.jpg",
        "/images/accommodation/house-4.jpg",
        "/images/accommodation/house-5.jpg",
        "/images/accommodation/house-6.jpg",
        "/images/accommodation/house-7.jpg",
        "/images/accommodation/house-8.jpg",
        "/images/accommodation/house-9.jpg",
        "/images/accommodation/house-10.jpg",
        "/images/accommodation/house-11.jpg",
        "/images/accommodation/house-12.jpg",
        "/images/accommodation/house-13.jpg",
        "/images/accommodation/house-14.jpg",
        "/images/accommodation/house-15.jpg",
        "/images/accommodation/house-16.jpg",
        "/images/accommodation/house-17.jpg",
        "/images/accommodation/house-18.jpg",
        "/images/accommodation/house-19.jpg",
        "/images/accommodation/house-20.jpg",
        "/images/accommodation/house-21.jpg",
        "/images/accommodation/house-22.jpg",
        "/images/accommodation/house-23.jpg",
        "/images/accommodation/house-24.jpg",
        "/images/accommodation/house-25.jpg",
        "/images/accommodation/house-26.jpg",
        "/images/accommodation/house-27.jpg",
        "/images/accommodation/house-28.jpg",
        "/images/accommodation/house-29.jpg",
        "/images/accommodation/house-30.jpg",
      ],
      fullDescription:
        "Просторный двухэтажный дом с панорамными окнами, откуда открывается потрясающий вид на карельскую природу. Дом оборудован всем необходимым для комфортного проживания: уютные спальни, общая гостиная с камином, полностью оборудованная кухня.",
    },
    {
      id: "kitchen",
      icon: <Utensils className="h-6 w-6 sm:h-8 sm:w-8" />,
      title: "Северная кухня",
      description: "Калитки, окрошка, свежая рыба и сезонные угощения",
      color: "from-amber-500 to-amber-700",
      images: [],
      fullDescription:
        "Аутентичная карельская кухня с использованием местных продуктов. Свежая рыба из озера, лесные ягоды и грибы, традиционные калитки и другие блюда региональной кухни. Все готовится с душой и заботой о ваших вкусовых предпочтениях.",
    },
    {
      id: "lake",
      icon: <Waves className="h-6 w-6 sm:h-8 sm:w-8" />,
      title: "Сямозеро",
      description: "Трансфер к песчаным берегам для купания и медитаций",
      color: "from-slate-500 to-slate-700",
      images: [
        "/images/syamozero/syamozero-1.jpg",
        "/images/syamozero/syamozero-2.jpg",
        "/images/syamozero/syamozero-3.jpg",
        "/images/syamozero/syamozero-4.jpg",
      ],
      fullDescription:
        "Одно из красивейших озер Карелии с кристально чистой водой и песчаными пляжами. Наслаждайтесь рассветами и закатами над водной гладью, купайтесь в чистейшей воде, медитируйте на берегу под шум волн. Идеальное место для рыбалки, водных процедур и созерцания природы. Организуем регулярные трансферы к самым живописным местам озера, где можно полностью погрузиться в атмосферу карельской природы.",
    },
    {
      id: "ecotours",
      icon: <TreePine className="h-6 w-6 sm:h-8 sm:w-8" />,
      title: "Экотуры",
      description: "Сбор ягод, грибов, рыбалка и прогулки по лесу",
      color: "from-forest-500 to-forest-700",
      images: [
        "/images/ecotours/mushroom-picking-1.jpg",
        "/images/ecotours/berry-picking.jpg",
        "/images/ecotours/fishing.jpg",
        "/images/ecotours/forest-walk.jpg",
        "/images/ecotours/karelian-forest-1.jpg",
        "/images/ecotours/karelian-forest-2.jpg",
        "/images/ecotours/karelian-forest-3.jpg",
        "/images/ecotours/mushroom-picking-3.jpg",
        "/images/ecotours/mushroom-picking-4.jpg",
        "/images/ecotours/mushroom-picking.jpg",
      ],
      fullDescription:
        "Увлекательные туры по карельским лесам и озерам. Изучаем местную флору и фауну, собираем сезонные ягоды и грибы, учимся рыбачить на озере Сямозеро. Прогулки по древним карельским лесам с изучением лекарственных растений и следов диких животных. Все туры проводятся с опытным гидом-экологом, который расскажет о природе Карелии, научит различать съедобные грибы и ягоды, покажет лучшие места для рыбалки.",
    },
    {
      id: "aromatherapy",
      icon: <Droplets className="h-6 w-6 sm:h-8 sm:w-8" />,
      title: "Ароматерапия",
      description: "Эфирные масла и аромаритуалы для восстановления",
      color: "from-forest-300 to-forest-500",
      images: [
        "/images/wellness/essential-oils.jpg",
        "/images/wellness/aromatherapy-session.jpg",
        "/images/wellness/aroma-diffuser.jpg",
        "/images/wellness/relaxation-aromatherapy.jpg",
      ],
      fullDescription:
        "Профессиональные сеансы ароматерапии с использованием натуральных эфирных масел. Индивидуальный подбор ароматов для каждого гостя, обучение основам ароматерапии, создание персональных аромакомпозиций для домашнего использования.",
    },
    {
      id: "sauna",
      icon: <Flame className="h-6 w-6 sm:h-8 sm:w-8" />,
      title: "Баня на дровах",
      description: "Прогревание тела и расслабление под звёздами",
      color: "from-orange-500 to-red-600",
      images: [
        "/images/wellness/sauna-1.jpg",
        "/images/wellness/sauna-2.JPG",
        "/images/wellness/sauna-3.JPG",
        "/images/wellness/sauna-4.JPG",
        "/images/wellness/sauna-5.JPG",
      ],
      fullDescription:
        "Традиционная русская баня на дровах.\nВечерние банные процедуры под звёздным небом, ароматные веники из берёзы и дуба, густой жаркий пар из печи-каменки. После парения можно выйти и насладиться тишиной и ароматом карельского леса.\n\nБаня включает:\n— парную с печью-каменкой,\n— комнату отдыха с травяными чаями,\n— уличную зону для расслабления на свежем воздухе.\n\nРаботает ежедневно \nВсе необходимые принадлежности предоставляются.",
    },
    {
      id: "transfer",
      icon: <CreditCard className="h-6 w-6 sm:h-8 sm:w-8" />,
      title: "Трансфер",
      description: "Комфортная доставка от вокзала до места отдыха",
      color: "from-blue-500 to-blue-700",
      images: [],
      fullDescription:
        "Организуем комфортный трансфер от железнодорожного вокзала или аэропорта до места проведения ретрита. Современный транспорт, опытные водители, возможность остановок по пути для покупки необходимых вещей.",
    },
    {
      id: "karaoke",
      icon: <MessageCircle className="h-6 w-6 sm:h-8 sm:w-8" />,
      title: "Караоке",
      description: "Вечерние развлечения и музыкальные посиделки",
      color: "from-purple-500 to-purple-700",
      images: [],
      fullDescription:
        "Современная караоке-система для вечерних развлечений. Большая коллекция песен на русском и английском языках, качественное звуковое оборудование, возможность записи выступлений на память.",
    },
    {
      id: "hospitality",
      icon: <Heart className="h-6 w-6 sm:h-8 sm:w-8" />,
      title: "Гостеприимство",
      description: "Индивидуальный подход и забота о каждом госте",
      color: "from-pink-500 to-pink-700",
      images: [],
      fullDescription:
        "Наша команда обеспечивает высочайший уровень сервиса и индивидуальный подход к каждому гостю. Мы учитываем все ваши пожелания и потребности, создавая атмосферу домашнего уюта и заботы.",
    },
  ]

  const sendToTelegram = async (bookingData: any) => {
    try {
      const response = await fetch('/api/telegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('API error:', errorData)
        throw new Error(errorData.error || 'Failed to send message to Telegram')
      }

      return true
    } catch (error) {
      console.error('Error sending to Telegram:', error)
      return false
    }
  }

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const bookingData = {
      ...formData,
      package: selectedPackage,
      checkIn: checkInDate,
      checkOut: checkOutDate,
    }

    try {
      const success = await sendToTelegram(bookingData)

      if (success) {
        // Трекинг успешной отправки формы
        trackBookingFormSubmitted({
          package: selectedPackage,
          guests: parseInt(formData.guests) || 0,
          checkIn: checkInDate?.toISOString(),
          checkOut: checkOutDate?.toISOString(),
          totalPrice: calculateTotalPrice()
        })

        setShowSuccessMessage(true)
        // Очистить форму
        setFormData({
          name: "",
          email: "",
          phone: "",
          guests: "1",
          message: "",
        })
        setSelectedPackage("")
        setCheckInDate(undefined)
        setCheckOutDate(undefined)
        setCheckInOpen(false)
        setCheckOutOpen(false)

        // Закрыть модальное окно через 3 секунды
        setTimeout(() => {
          setIsBookingOpen(false)
          setShowSuccessMessage(false)
        }, 3000)
      } else {
        alert('Произошла ошибка при отправке заявки. Пожалуйста, попробуйте еще раз или свяжитесь с нами по телефону.')
      }
    } catch (error) {
      console.error('Error submitting booking:', error)
      alert('Произошла ошибка при отправке заявки. Пожалуйста, попробуйте еще раз или свяжитесь с нами по телефону.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const openBookingModal = (packageName: string) => {
    setSelectedPackage(packageName)
    setIsBookingOpen(true)
  }

  const openFeatureGallery = (featureId: string) => {
    setSelectedFeature(featureId)
    setCurrentImageIndex(0)
    // Определяем ориентацию первого изображения
    const feature = features.find(f => f.id === featureId)
    if (feature && feature.images[0]) {
      checkImageOrientation(feature.images[0])
    }
  }

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

  const closeFeatureGallery = () => {
    setSelectedFeature(null)
    setCurrentImageIndex(0)
  }

  const nextImage = () => {
    const feature = features.find((f) => f.id === selectedFeature)
    if (feature) {
      const newIndex = (currentImageIndex + 1) % feature.images.length
      setCurrentImageIndex(newIndex)
      checkImageOrientation(feature.images[newIndex])
    }
  }

  const prevImage = () => {
    const feature = features.find((f) => f.id === selectedFeature)
    if (feature) {
      const newIndex = (currentImageIndex - 1 + feature.images.length) % feature.images.length
      setCurrentImageIndex(newIndex)
      checkImageOrientation(feature.images[newIndex])
    }
  }

  // Keyboard navigation for gallery
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (selectedFeature) {
        if (event.key === 'ArrowLeft') {
          prevImage()
        } else if (event.key === 'ArrowRight') {
          nextImage()
        } else if (event.key === 'Escape') {
          closeFeatureGallery()
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [selectedFeature])  // eslint-disable-line react-hooks/exhaustive-deps

  const selectedFeatureData = features.find((f) => f.id === selectedFeature)

  return (
    <div className="min-h-screen bg-gradient-to-br from-forest-950 via-forest-900 to-slate-900 overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-60 h-60 sm:w-80 sm:h-80 bg-forest-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animate-shimmer"></div>
        <div className="absolute -bottom-40 -left-40 w-60 h-60 sm:w-80 sm:h-80 bg-amber-600 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse animation-delay-2000"></div>
      </div>

      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 text-center overflow-hidden"
        itemScope
        itemType="https://schema.org/TouristAttraction"
      >
        {/* Optimized Background with Next.js Image */}
        <div className="absolute inset-0">
          <NextImage
            src="/images/hero/hero.jpg"
            alt="Карельская природа, ретрит в Виллагоре, озеро Сямозеро, отдых на природе"
            fill
            priority
            quality={85}
            className="object-cover"
            sizes="100vw"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
            itemProp="image"
          />

          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50 z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-forest-900/30 via-transparent to-forest-900/30 z-10"></div>
        </div>

        {/* Content */}
        <div
          className={`relative max-w-6xl mx-auto transition-all duration-1000 z-20 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="mb-6 sm:mb-8">
            <TreePine className="h-12 w-12 sm:h-16 sm:w-16 text-forest-300 mx-auto mb-4 sm:mb-6 animate-breathe drop-shadow-lg" />
          </div>

          <h1
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-6 sm:mb-8 leading-tight px-2"
            itemProp="name"
          >
            <span className="bg-gradient-to-r from-forest-200 via-forest-300 to-amber-300 bg-clip-text text-transparent animate-pulse drop-shadow-2xl">
              Камерный ретрит
            </span>
            <br />
            <span className="text-white drop-shadow-2xl">в сердце Карелии</span>
          </h1>

          <p
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-8 sm:mb-12 text-stone-100 font-light max-w-4xl mx-auto leading-relaxed drop-shadow-lg px-4"
            itemProp="description"
          >
            Перезагрузка души в окружении леса, насыщенный отдых на природе Карелии
          </p>

          <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress" className="hidden">
            <span itemProp="addressLocality">Виллагора</span>,<span itemProp="addressRegion">Республика Карелия</span>,
            <span itemProp="postalCode">186135</span>,<span itemProp="addressCountry">Россия</span>
          </div>

          <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mb-8 sm:mb-12 px-4">
            <Badge
              className="text-sm sm:text-lg py-2 px-4 sm:py-3 sm:px-6 bg-black/30 backdrop-blur-md border-white/20 hover:bg-black/40 transition-all duration-300 transform hover:scale-105 text-white shadow-xl cursor-pointer animate-float-nature"
              onClick={() => {
                setIsMapOpen(true)
                trackMapOpened()
              }}
            >
              <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Деревня Виллагора
            </Badge>
            <Badge className="text-sm sm:text-lg py-2 px-4 sm:py-3 sm:px-6 bg-black/30 backdrop-blur-md border-white/20 hover:bg-black/40 transition-all duration-300 transform hover:scale-105 text-white shadow-xl">
              <CalendarIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              от 3 до 10 дней
            </Badge>
            <Badge className="text-sm sm:text-lg py-2 px-4 sm:py-3 sm:px-6 bg-black/30 backdrop-blur-md border-white/20 hover:bg-black/40 transition-all duration-300 transform hover:scale-105 text-white shadow-xl">
              <Users className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              До 5 человек
            </Badge>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4">
            <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-forest-600 to-forest-700 hover:from-forest-500 hover:to-forest-600 text-white text-base sm:text-lg px-8 sm:px-10 py-3 sm:py-4 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 group border-0 w-full sm:w-auto touch-friendly touch-target"
                  onClick={() => trackBookingFormOpened()}
                >
                  Забронировать место
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </DialogTrigger>
            </Dialog>

            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white/60 text-white bg-black/20 backdrop-blur-md hover:bg-black/30 hover:border-white/80 text-base sm:text-lg px-8 sm:px-10 py-3 sm:py-4 rounded-full transform hover:scale-105 transition-all duration-300 shadow-xl w-full sm:w-auto"
              onClick={() => {
                document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              Узнать больше
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative"
        itemScope
        itemType="https://schema.org/Resort"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-stone-100 to-stone-300 bg-clip-text text-transparent">
              Время услышать себя
            </h2>
            <p className="text-lg sm:text-xl text-stone-300 mb-8 sm:mb-12 leading-relaxed max-w-4xl mx-auto px-4">
              Ты чувствуешь, что пора перезагрузиться? Отпустить суету и, наконец, услышать себя?
              <br />
              ПриглашаЕМ тебя на <span className="font-semibold text-amber-300">КАМЕРНЫЙ РЕТРИТ В ЗАГОРОДНЫЙ ДОМ ВИЛЛАГОРЕ</span> — живописной деревне на берегу ламбушки, в окружении карельских лесов и озёр.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: Heart,
                title: "Для души",
                desc: "Отдых и восстановление в гармонии с природой",
                color: "from-rose-600 to-rose-700",
              },
              {
                icon: Mountain,
                title: "Природа",
                desc: "Карельские леса, озёра и чистый воздух",
                color: "from-forest-500 to-forest-700",
              },
              {
                icon: Users,
                title: "Камерность",
                desc: "Небольшая группа до 5 человек",
                color: "from-amber-600 to-amber-700",
              },
            ].map((item, index) => (
              <div key={index} className="group text-center transform hover:scale-105 transition-all duration-500">
                <div
                  className={`bg-gradient-to-r ${item.color} w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-2xl group-hover:shadow-3xl transition-all duration-300 group-hover:rotate-6`}
                >
                  {(() => {
                    const Icon = item.icon
                    return <Icon className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                  })()}
                </div>
                <h3 className="font-bold text-xl sm:text-2xl mb-3 sm:mb-4 text-stone-100">{item.title}</h3>
                <p className="text-stone-300 text-base sm:text-lg leading-relaxed px-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative" itemScope itemType="https://schema.org/Hotel">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-12 sm:mb-16 bg-gradient-to-r from-stone-100 to-stone-300 bg-clip-text text-transparent">
            Что тебя ждёт
          </h2>
          <meta itemProp="name" content="Ретрит в Карелии - Виллагора" />
          <meta
            itemProp="description"
            content="Уникальный ретрит на природе в Карелии с экскурсиями, банями и отдыхом на озере Сямозеро"
          />
          <meta itemProp="telephone" content="+79522010778" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className={`group bg-forest-900/30 backdrop-blur-sm border-forest-700/30 hover:bg-forest-800/40 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 shadow-2xl hover:shadow-3xl ${feature.images.length > 0 ? 'cursor-pointer' : ''}`}
                onClick={feature.images.length > 0 ? () => openFeatureGallery(feature.id) : undefined}
              >
                <CardHeader className="pb-3 sm:pb-4">
                  <div
                    className={`bg-gradient-to-r ${feature.color} w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:rotate-12`}
                  >
                    <div className="text-white">{feature.icon}</div>
                  </div>
                  <CardTitle className="text-xl sm:text-2xl text-stone-100 group-hover:text-forest-300 transition-colors duration-300">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-stone-300 text-base sm:text-lg leading-relaxed mb-3 sm:mb-4">
                    {feature.description}
                  </p>
                  {feature.images.length > 0 && (
                    <div className="flex items-center text-forest-400 text-sm font-medium">
                      <span>Посмотреть фото</span>
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 sm:mt-16 bg-gradient-to-r from-forest-900/20 to-forest-800/30 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-forest-700/30 shadow-2xl">
            <h3 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center text-stone-100">
              Дополнительные удобства
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {[
                { icon: ShoppingCart, text: "Магазин 24/7 в 3х минутах от дома" },
                { icon: Droplets, text: "Чистая родниковая вода" },
                { icon: "🏀", text: "Большой батут" },
                { icon: Flame, text: "Мангал для дневных и вечерних посиделок" },
                { icon: "📶", text: "Безлимитный Wi-Fi" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-forest-800/20 hover:bg-forest-700/30 transition-all duration-300 transform hover:scale-105"
                >
                  {typeof item.icon === "string" ? (
                    <div className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-xl sm:text-2xl">
                      {item.icon}
                    </div>
                  ) : (
                    (() => {
                      const Icon = item.icon
                      return <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-forest-400 flex-shrink-0" />
                    })()
                  )}
                  <span className="text-stone-300 text-base sm:text-lg">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Услуги за доп плату */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-12 sm:mb-16 bg-gradient-to-r from-stone-100 to-stone-300 bg-clip-text text-transparent">
            УСЛУГИ ЗА ДОП ПЛАТУ
          </h2>
          
          <div className="bg-forest-900/30 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-forest-700/30 shadow-2xl relative overflow-hidden group hover:shadow-forest-500/20 hover:border-forest-600/40 transition-all duration-500">
            {/* Декоративные элементы фона */}
            <div className="absolute inset-0 bg-gradient-to-br from-forest-800/20 via-forest-700/10 to-forest-900/30 z-0"></div>
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-forest-500/10 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-all duration-700"></div>
            <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-all duration-700 group-hover:scale-125"></div>
            
            {/* Декоративная карта */}
            <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path d="M10,10 Q50,20 90,10 T10,50 T90,90 T10,10" fill="none" stroke="currentColor" strokeWidth="0.2" className="text-forest-300" />
                <path d="M20,20 Q60,30 80,20 T20,60 T80,80 T20,20" fill="none" stroke="currentColor" strokeWidth="0.2" className="text-amber-300" />
              </svg>
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-6 mb-6 relative z-10">
              <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 relative group-hover:scale-110 transition-transform duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-forest-500/30 to-amber-500/30 rounded-full blur-lg opacity-70 group-hover:opacity-100 transition-all duration-500"></div>
                <svg viewBox="0 0 24 24" className="w-full h-full text-forest-400 relative z-10 drop-shadow-lg" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  <path d="M2 12h20" />
                </svg>
              </div>
              <p className="text-lg sm:text-xl text-stone-300 leading-relaxed backdrop-blur-sm bg-forest-900/10 p-3 rounded-lg border border-forest-700/20 shadow-inner">
                Выездные экскурсии в Петрозаводск, Сортавалу, Мраморный каньон и т.д. обсуждаются индивидуально с учетом ваших пожеланий.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 relative z-10">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-forest-800/40 backdrop-blur-sm hover:bg-forest-700/50 transition-all duration-300 transform hover:scale-105 border border-forest-700/30 hover:border-forest-600/50 shadow-lg hover:shadow-xl">
                <div className="w-10 h-10 flex-shrink-0 relative">
                  <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-md"></div>
                  <svg viewBox="0 0 24 24" className="w-full h-full text-amber-400 relative z-10 drop-shadow" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
                    <path d="M3 9V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4" />
                    <path d="M13 13h4" />
                    <path d="M13 17h4" />
                  </svg>
                </div>
                <span className="text-stone-300 font-medium">Петрозаводск</span>
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-xl bg-forest-800/40 backdrop-blur-sm hover:bg-forest-700/50 transition-all duration-300 transform hover:scale-105 border border-forest-700/30 hover:border-forest-600/50 shadow-lg hover:shadow-xl">
                <div className="w-10 h-10 flex-shrink-0 relative">
                  <div className="absolute inset-0 bg-forest-500/20 rounded-full blur-md"></div>
                  <svg viewBox="0 0 24 24" className="w-full h-full text-forest-400 relative z-10 drop-shadow" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
                    <path d="M14 11a2 2 0 0 0-2-2" />
                    <path d="M14 11a2 2 0 0 1-2 2" />
                  </svg>
                </div>
                <span className="text-stone-300 font-medium">Сортавала</span>
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-xl bg-forest-800/40 backdrop-blur-sm hover:bg-forest-700/50 transition-all duration-300 transform hover:scale-105 border border-forest-700/30 hover:border-forest-600/50 shadow-lg hover:shadow-xl">
                <div className="w-10 h-10 flex-shrink-0 relative">
                  <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-md"></div>
                  <svg viewBox="0 0 24 24" className="w-full h-full text-blue-400 relative z-10 drop-shadow" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </div>
                <span className="text-stone-300 font-medium">Мраморный каньон</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-12 sm:mb-16 bg-gradient-to-r from-stone-100 to-stone-300 bg-clip-text text-transparent">
            Выбери свой пакет
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {packages.map((pkg, index) => (
              <Card
                key={index}
                className={`group relative overflow-hidden bg-forest-900/30 backdrop-blur-sm border-forest-700/30 hover:bg-forest-800/40 transition-all duration-500 transform hover:scale-105 hover:-translate-y-4 shadow-2xl hover:shadow-3xl cursor-pointer ${
                  pkg.popular ? "ring-2 ring-forest-400 shadow-forest-400/25" : ""
                }`}
                onMouseEnter={() => setActivePackage(index)}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <Badge className="bg-gradient-to-r from-forest-500 to-forest-600 text-white px-4 sm:px-6 py-1 sm:py-2 shadow-xl animate-pulse text-sm">
                      <Star className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                      Популярный
                    </Badge>
                  </div>
                )}

                <div
                  className={`absolute inset-0 bg-gradient-to-br ${pkg.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                ></div>

                <CardHeader className="text-center relative z-10 pt-6 sm:pt-8">
                  <CardTitle className="text-xl sm:text-2xl text-stone-100 group-hover:text-forest-300 transition-colors duration-300">
                    {pkg.name}
                  </CardTitle>
                  <CardDescription className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-forest-400 to-amber-400 bg-clip-text text-transparent">
                    {pkg.duration}
                  </CardDescription>
                </CardHeader>

                <CardContent className="text-center relative z-10 px-4 sm:px-6">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-100 mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">
                    {pkg.price}
                  </div>
                  <div className="text-xs sm:text-sm text-stone-400 mb-3 sm:mb-4">
                    {formatPrice(pkg.pricePerPersonPerDay)} за человека в день
                  </div>
                  <p className="text-stone-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">{pkg.description}</p>

                  <Button
                    className={`w-full bg-gradient-to-r ${pkg.gradient} hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-white border-0 text-sm sm:text-base py-2 sm:py-3`}
                    onClick={() => openBookingModal(pkg.name)}
                  >
                    Выбрать пакет
                    <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-12 p-6 sm:p-8 bg-forest-900/20 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-forest-700/30">
            <p className="text-lg sm:text-xl text-stone-300 mb-3 sm:mb-4">
              <strong className="text-forest-400">Предоплата:</strong> 10 000 ₽ за человека
            </p>
            <p className="text-stone-400 text-sm sm:text-base mb-4">
              В стоимость включено: проживание, питание, трансфер, все активности
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white px-6 py-2 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
                  onClick={() => trackBookingFormOpened()}
                >
                  Записаться
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[95vw] max-w-[500px] bg-forest-900/95 backdrop-blur-sm border-forest-700/30 text-stone-100 max-h-[90vh] overflow-y-auto">
                {/* Используем тот же контент, что и в основном модальном окне бронирования */}
                <DialogHeader>
                  <DialogTitle className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-forest-400 to-amber-400 bg-clip-text text-transparent">
                    {showSuccessMessage ? "Заявка принята!" : "Бронирование ретрита"}
                  </DialogTitle>
                  <DialogDescription className="text-stone-300 text-sm sm:text-base">
                    {showSuccessMessage
                      ? "Спасибо за вашу заявку! Мы свяжемся с вами в ближайшее время для подтверждения бронирования."
                      : "Заполните форму, и мы свяжемся с вами для подтверждения бронирования"
                    }
                  </DialogDescription>
                </DialogHeader>

                {showSuccessMessage ? (
                  <div className="flex flex-col items-center justify-center py-8 space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-center text-stone-200 text-lg font-medium">
                      Ваша заявка успешно отправлена!
                    </p>
                    <p className="text-center text-stone-400 text-sm">
                      Окно закроется автоматически через несколько секунд
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="space-y-4 sm:space-y-6">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-stone-200 text-sm">
                            Имя *
                          </Label>
                          <Input
                            id="name"
                            type="text"
                            placeholder="Ваше имя"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="bg-forest-800/30 border-forest-600/30 text-stone-100 placeholder:text-stone-400 h-9 sm:h-10 no-zoom touch-friendly"
                            autoComplete="given-name"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-stone-200 text-sm">
                            Телефон *
                          </Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+7 (999) 123-45-67"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="bg-forest-800/30 border-forest-600/30 text-stone-100 placeholder:text-stone-400 h-9 sm:h-10 no-zoom touch-friendly"
                            autoComplete="tel"
                            inputMode="tel"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-stone-200 text-sm">
                          Email *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="bg-forest-800/30 border-forest-600/30 text-stone-100 placeholder:text-stone-400 h-9 sm:h-10 no-zoom touch-friendly"
                          autoComplete="email"
                          inputMode="email"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label className="text-stone-200 text-sm">Пакет</Label>
                          <Select value={selectedPackage} onValueChange={setSelectedPackage}>
                            <SelectTrigger className="bg-forest-800/30 border-forest-600/30 text-stone-100 h-9 sm:h-10">
                              <SelectValue placeholder="Выберите пакет" />
                            </SelectTrigger>
                            <SelectContent className="bg-forest-800 border-forest-600/30">
                              {packages.map((pkg) => (
                                <SelectItem key={pkg.name} value={pkg.name} className="text-stone-100 hover:bg-forest-700/50">
                                  <span className="block sm:hidden">{pkg.name}</span>
                                  <span className="hidden sm:block">
                                    {pkg.name} - {pkg.price}
                                  </span>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-stone-200 text-sm">Гостей</Label>
                          <Select
                            value={formData.guests}
                            onValueChange={(value) => setFormData({ ...formData, guests: value })}
                          >
                            <SelectTrigger className="bg-forest-800/30 border-forest-600/30 text-stone-100 h-9 sm:h-10">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-forest-800 border-forest-600/30">
                              {[1, 2, 3, 4, 5].map((num) => (
                                <SelectItem key={num} value={num.toString()} className="text-stone-100 hover:bg-forest-700/50">
                                  {num} {num === 1 ? "чел." : "чел."}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label className="text-stone-200 text-sm">Заезд</Label>
                          <Popover open={checkInOpen} onOpenChange={setCheckInOpen}>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full justify-start text-left font-normal bg-forest-800/30 border-forest-600/30 text-stone-100 hover:bg-forest-700/40 h-9 sm:h-10"
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {checkInDate ? format(checkInDate, "dd MMMM yyyy", { locale: ru }) : "Выберите дату заезда"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 bg-forest-800 border-forest-600/30" align="start">
                              <Calendar
                                key="checkin-calendar"
                                mode="single"
                                selected={checkInDate}
                                onSelect={handleCheckInSelect}
                                disabled={false}
                                className="text-stone-100"
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-stone-200 text-sm">Выезд</Label>
                          <Popover open={checkOutOpen} onOpenChange={setCheckOutOpen}>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full justify-start text-left font-normal bg-forest-800/30 border-forest-600/30 text-stone-100 hover:bg-forest-700/40 h-9 sm:h-10"
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {checkOutDate ? format(checkOutDate, "dd MMMM yyyy", { locale: ru }) : "Выберите дату выезда"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 bg-forest-800 border-forest-600/30" align="start">
                              <Calendar
                                key="checkout-calendar"
                                mode="single"
                                selected={checkOutDate}
                                onSelect={handleCheckOutSelect}
                                disabled={false}
                                className="text-stone-100"
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-stone-200 text-sm">
                          Пожелания
                        </Label>
                        <Textarea
                          id="message"
                          placeholder="Ваши пожелания..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="bg-forest-800/30 border-forest-600/30 text-stone-100 placeholder:text-stone-400 min-h-[60px] resize-none no-zoom touch-friendly mobile-text"
                          rows={3}
                        />
                      </div>

                      <div className="bg-forest-800/20 rounded-lg p-3 border border-forest-600/30">
                        <h4 className="font-semibold text-forest-400 mb-2 text-sm">Расчет стоимости:</h4>
                        {selectedPackage && formData.guests ? (
                          <div className="space-y-1 mb-3">
                            <div className="flex justify-between text-xs text-stone-300">
                              <span>Пакет: {selectedPackage}</span>
                              <span>{packages.find(p => p.name === selectedPackage)?.duration}</span>
                            </div>
                            <div className="flex justify-between text-xs text-stone-300">
                              <span>Количество гостей:</span>
                              <span>{formData.guests} чел.</span>
                            </div>
                            <div className="flex justify-between text-xs text-stone-300">
                              <span>Стоимость за человека в день:</span>
                              <span>{formatPrice(packages.find(p => p.name === selectedPackage)?.pricePerPersonPerDay || 0)}</span>
                            </div>
                            <div className="flex justify-between text-xs text-stone-300">
                              <span>Расчет:</span>
                              <span>{formatPrice(packages.find(p => p.name === selectedPackage)?.pricePerPersonPerDay || 0)} × {packages.find(p => p.name === selectedPackage)?.days} дн. × {formData.guests} чел.</span>
                            </div>
                            <hr className="border-forest-600/30 my-2" />
                            <div className="flex justify-between text-sm font-semibold text-forest-400">
                              <span>Общая стоимость:</span>
                              <span>{formatPrice(calculateTotalPrice())}</span>
                            </div>
                          </div>
                        ) : (
                          <p className="text-xs text-stone-400 mb-3">Выберите пакет и количество гостей для расчета</p>
                        )}

                        <h4 className="font-semibold text-forest-400 mb-1 text-sm">Условия:</h4>
                        <ul className="list-disc pl-4 text-xs text-stone-400">
                          <li>Предоплата 10 000 ₽ за человека</li>
                          <li>В стоимость включено: проживание, питание, трансфер, все активности</li>
                          <li>Заезд с 14:00, выезд до 12:00</li>
                        </ul>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsBookingOpen(false)}
                          className="flex-1 bg-forest-800/30 border-forest-600/50 text-stone-300 hover:bg-forest-700/40 hover:text-stone-200 hover:border-forest-500/70 transition-all duration-200 order-2 sm:order-1"
                        >
                          <X className="h-4 w-4 mr-2" />
                          Отмена
                        </Button>
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="flex-1 bg-gradient-to-r from-forest-600 to-forest-700 hover:from-forest-500 hover:to-forest-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200 order-1 sm:order-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Отправляем...
                            </>
                          ) : (
                            <>
                              <CreditCard className="h-4 w-4 mr-2" />
                              Забронировать
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </form>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-12 sm:mb-16 bg-gradient-to-r from-stone-100 to-stone-300 bg-clip-text text-transparent">
            Место силы — Карелия
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: "Карельские леса",
                subtitle: "Древние сосны и чистый воздух",
                images: [
                  "/images/ecotours/karelian-forest-1.jpg",
                  "/images/ecotours/karelian-forest-2.jpg",
                  "/images/ecotours/karelian-forest-3.jpg",
                ],
              },
              {
                title: "Озеро Сямозеро",
                subtitle: "Кристально чистая вода",
                images: [
                  "/images/syamozero/syamozero-1.jpg",
                  "/images/syamozero/syamozero-2.jpg",
                  "/images/syamozero/syamozero-3.jpg",
                ],
              },
              {
                title: "Уютный дом",
                subtitle: "Ваш дом вдали от дома",
                images: [
                  "/images/accommodation/house-1.jpg",
                  "/images/accommodation/house-2.jpg",
                  "/images/accommodation/house-3.jpg",
                ],
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group relative h-64 sm:h-80 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500"
              >
                <OptimizedImage 
                  src={item.images[0]}
                  alt={item.title}
                  width={800} 
                  height={600}
                  priority={index === 0}
                  className="w-full h-full group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-900/90 via-forest-800/30 to-transparent group-hover:from-forest-800/70 transition-all duration-500"></div>
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 text-white transform group-hover:translate-y-0 translate-y-2 transition-transform duration-300">
                  <h3 className="font-bold text-lg sm:text-2xl mb-1 sm:mb-2">{item.title}</h3>
                  <p className="text-stone-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm sm:text-base">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-forest-800/30 via-forest-700/20 to-forest-600/30"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 text-stone-100">
            Готов к перезагрузке?
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 sm:mb-12 text-stone-300 leading-relaxed max-w-4xl mx-auto px-4">
            Это не просто поездка — это отдых для души. Радушие, лёгкость, искренние разговоры и ощущение, что ты,
            наконец, возвращаешься к себе.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
            <Card
              className="group bg-forest-900/30 backdrop-blur-sm border-forest-700/30 hover:bg-forest-800/40 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 shadow-2xl cursor-pointer"
              onClick={() => window.open("tel:+79522010778")}
            >
              <CardHeader>
                <div className="flex items-center justify-center mb-4 sm:mb-6">
                  <div className="bg-gradient-to-r from-forest-500 to-forest-600 w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:rotate-12">
                    <Phone className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                </div>
                <CardTitle className="text-xl sm:text-2xl text-stone-100">Позвони</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl sm:text-2xl font-bold text-forest-400 mb-2">+7 952 201 0778</p>
                <p className="text-stone-300 text-sm sm:text-base">Детали и бронь по телефону</p>
              </CardContent>
            </Card>

            <Card
              className="group bg-forest-900/30 backdrop-blur-sm border-forest-700/30 hover:bg-forest-800/40 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 shadow-2xl cursor-pointer"
              onClick={() => {
                trackTelegramClick()
                window.open("https://t.me/RadmilaYakovleva")
              }}
            >
              <CardHeader>
                <div className="flex items-center justify-center mb-4 sm:mb-6">
                  <div className="bg-gradient-to-r from-amber-600 to-amber-700 w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:rotate-12">
                    <MessageCircle className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                </div>
                <CardTitle className="text-xl sm:text-2xl text-stone-100">Напиши в Telegram</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl sm:text-2xl font-bold text-amber-400 mb-2">@RadmilaYakovleva</p>
                <p className="text-stone-300 text-sm sm:text-base">Быстрые ответы в чате</p>
              </CardContent>
            </Card>

            <Card
              className="group bg-forest-900/30 backdrop-blur-sm border-forest-700/30 hover:bg-forest-800/40 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 shadow-2xl cursor-pointer"
              onClick={() => setIsBookingOpen(true)}
            >
              <CardHeader>
                <div className="flex items-center justify-center mb-4 sm:mb-6">
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:rotate-12">
                    <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                </div>
                <CardTitle className="text-xl sm:text-2xl text-stone-100">Оставить заявку</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl sm:text-2xl font-bold text-blue-400 mb-2">На сайте</p>
                <p className="text-stone-300 text-sm sm:text-base">Удобная форма бронирования</p>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-forest-600 to-forest-700 hover:from-forest-500 hover:to-forest-600 text-white text-lg sm:text-xl px-8 sm:px-12 py-3 sm:py-4 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 group border-0 w-full sm:w-auto"
              onClick={() => window.open("tel:+79522010778")}
            >
              <Phone className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" />
              Позвонить
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 ml-2 sm:ml-3 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white text-lg sm:text-xl px-8 sm:px-12 py-3 sm:py-4 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 group border-0 w-full sm:w-auto"
              onClick={() => {
                trackTelegramClick()
                window.open("https://t.me/RadmilaYakovleva")
              }}
            >
              <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" />
              Написать в Telegram
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 ml-2 sm:ml-3 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white text-lg sm:text-xl px-8 sm:px-12 py-3 sm:py-4 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 group border-0 w-full sm:w-auto"
              onClick={() => setIsBookingOpen(true)}
            >
              <FileText className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" />
              Оставить заявку
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 ml-2 sm:ml-3 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-forest-950/40 backdrop-blur-sm border-t border-forest-700/30">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-4 sm:mb-6">
            <TreePine className="h-10 w-10 sm:h-12 sm:w-12 text-forest-400 mx-auto mb-3 sm:mb-4 animate-pulse" />
          </div>
          <p className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-forest-400 to-amber-400 bg-clip-text text-transparent">
            Камерный ретрит в Карелии
          </p>
          <p className="text-stone-400 mb-4 sm:mb-6 text-base sm:text-lg">
            Деревня Виллагора • 3 - 10 дней • До 5 человек
          </p>
          <p className="text-stone-500 text-base sm:text-lg italic px-4">
            Это про дыхание полной грудью. Про тишину и природу. Про возвращение к себе.
          </p>
        </div>
      </footer>

      {/* Feature Gallery Modal */}
      <Dialog open={!!selectedFeature} onOpenChange={closeFeatureGallery}>
        <DialogContent className="w-[95vw] sm:max-w-[90vw] md:max-w-[900px] bg-forest-900/95 backdrop-blur-sm border-forest-700/30 text-stone-100 p-0 flex flex-col max-h-[90vh] overflow-hidden">
          {selectedFeatureData && (
            <>
              <DialogHeader className="p-3 sm:p-4 md:p-6 pb-0">
                <DialogTitle className="text-lg sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-forest-400 to-amber-400 bg-clip-text text-transparent flex items-center gap-2 sm:gap-3">
                  <div
                    className={`bg-gradient-to-r ${selectedFeatureData.color} w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0`}
                  >
                    <div className="text-white text-sm sm:text-base">{selectedFeatureData.icon}</div>
                  </div>
                  <span className="truncate">{selectedFeatureData.title}</span>
                </DialogTitle>
                <DialogDescription className="text-stone-300 text-xs sm:text-sm md:text-base leading-relaxed mt-2 sm:mt-3 pr-2 sm:pr-4">
                  {selectedFeatureData.fullDescription}
                </DialogDescription>
              </DialogHeader>

              {/* Главное изображение */}
              <div className="flex-grow overflow-hidden relative bg-forest-800/20">
                <div
                  className="w-full h-[50vh] relative"
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
                  <NextImage
                    src={selectedFeatureData.images[currentImageIndex] || "/placeholder.svg"}
                    alt={`${selectedFeatureData.title} ${currentImageIndex + 1}`}
                    fill
                    priority
                    className="object-contain"
                  />
                  
                  {/* Кнопки навигации */}
                  <button 
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 rounded-full p-2 text-white"
                    onClick={(e) => {
                      e.stopPropagation()
                      prevImage()
                    }}
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  
                  <button 
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 rounded-full p-2 text-white"
                    onClick={(e) => {
                      e.stopPropagation()
                      nextImage()
                    }}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                  
                  {/* Индикатор */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 px-3 py-1 rounded-full text-white text-sm">
                    {currentImageIndex + 1} / {selectedFeatureData.images.length}
                  </div>
                </div>
              </div>
              
              {/* Миниатюры - упрощенная версия */}
              <div className="p-4 bg-forest-800/20 border-t border-forest-700/30 overflow-x-auto">
                <div className="flex gap-2 min-w-max">
                  {selectedFeatureData.images.map((image, index) => (
                    <button
                      key={index}
                      className={`w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden ${
                        index === currentImageIndex ? "ring-2 ring-forest-400" : "opacity-70"
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    >
                      <NextImage
                        src={image}
                        alt={`${selectedFeatureData.title} миниатюра ${index + 1}`}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Booking Modal */}
      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="w-[95vw] max-w-[500px] bg-forest-900/95 backdrop-blur-sm border-forest-700/30 text-stone-100 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-forest-400 to-amber-400 bg-clip-text text-transparent">
              {showSuccessMessage ? "Заявка принята!" : "Бронирование ретрита"}
            </DialogTitle>
            <DialogDescription className="text-stone-300 text-sm sm:text-base">
              {showSuccessMessage
                ? "Спасибо за вашу заявку! Мы свяжемся с вами в ближайшее время для подтверждения бронирования."
                : "Заполните форму, и мы свяжемся с вами для подтверждения бронирования"
              }
            </DialogDescription>
          </DialogHeader>

          {showSuccessMessage ? (
            <div className="flex flex-col items-center justify-center py-8 space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-center text-stone-200 text-lg font-medium">
                Ваша заявка успешно отправлена!
              </p>
              <p className="text-center text-stone-400 text-sm">
                Окно закроется автоматически через несколько секунд
              </p>
            </div>
          ) : (
            <form onSubmit={handleBookingSubmit} className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-stone-200 text-sm">
                    Имя *
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Ваше имя"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-forest-800/30 border-forest-600/30 text-stone-100 placeholder:text-stone-400 h-9 sm:h-10 no-zoom touch-friendly"
                    autoComplete="given-name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-stone-200 text-sm">
                    Телефон *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+7 (999) 123-45-67"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-forest-800/30 border-forest-600/30 text-stone-100 placeholder:text-stone-400 h-9 sm:h-10 no-zoom touch-friendly"
                    autoComplete="tel"
                    inputMode="tel"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-stone-200 text-sm">
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-forest-800/30 border-forest-600/30 text-stone-100 placeholder:text-stone-400 h-9 sm:h-10 no-zoom touch-friendly"
                  autoComplete="email"
                  inputMode="email"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-stone-200 text-sm">Пакет</Label>
                  <Select value={selectedPackage} onValueChange={setSelectedPackage}>
                    <SelectTrigger className="bg-forest-800/30 border-forest-600/30 text-stone-100 h-9 sm:h-10">
                      <SelectValue placeholder="Выберите пакет" />
                    </SelectTrigger>
                    <SelectContent className="bg-forest-800 border-forest-600/30">
                      {packages.map((pkg) => (
                        <SelectItem key={pkg.name} value={pkg.name} className="text-stone-100 hover:bg-forest-700/50">
                          <span className="block sm:hidden">{pkg.name}</span>
                          <span className="hidden sm:block">
                            {pkg.name} - {pkg.price}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-stone-200 text-sm">Гостей</Label>
                  <Select
                    value={formData.guests}
                    onValueChange={(value) => setFormData({ ...formData, guests: value })}
                  >
                    <SelectTrigger className="bg-forest-800/30 border-forest-600/30 text-stone-100 h-9 sm:h-10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-forest-800 border-forest-600/30">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <SelectItem key={num} value={num.toString()} className="text-stone-100 hover:bg-forest-700/50">
                          {num} {num === 1 ? "чел." : "чел."}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-stone-200 text-sm">Заезд</Label>
                  <Popover open={checkInOpen} onOpenChange={setCheckInOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal bg-forest-800/30 border-forest-600/30 text-stone-100 hover:bg-forest-700/40 h-9 sm:h-10"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {checkInDate ? format(checkInDate, "dd MMMM yyyy", { locale: ru }) : "Выберите дату заезда"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-forest-800 border-forest-600/30" align="start">
                      <Calendar
                        key="checkin-calendar"
                        mode="single"
                        selected={checkInDate}
                        onSelect={handleCheckInSelect}
                        disabled={false}
                        className="text-stone-100"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label className="text-stone-200 text-sm">Выезд</Label>
                  <Popover open={checkOutOpen} onOpenChange={setCheckOutOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal bg-forest-800/30 border-forest-600/30 text-stone-100 hover:bg-forest-700/40 h-9 sm:h-10"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {checkOutDate ? format(checkOutDate, "dd MMMM yyyy", { locale: ru }) : "Выберите дату выезда"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-forest-800 border-forest-600/30" align="start">
                      <Calendar
                        key="checkout-calendar"
                        mode="single"
                        selected={checkOutDate}
                        onSelect={handleCheckOutSelect}
                        disabled={false}
                        className="text-stone-100"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-stone-200 text-sm">
                  Пожелания
                </Label>
                <Textarea
                  id="message"
                  placeholder="Ваши пожелания..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-forest-800/30 border-forest-600/30 text-stone-100 placeholder:text-stone-400 min-h-[60px] resize-none no-zoom touch-friendly mobile-text"
                  rows={3}
                />
              </div>

              <div className="bg-forest-800/20 rounded-lg p-3 border border-forest-600/30">
                <h4 className="font-semibold text-forest-400 mb-2 text-sm">Расчет стоимости:</h4>
                {selectedPackage && formData.guests ? (
                  <div className="space-y-1 mb-3">
                    <div className="flex justify-between text-xs text-stone-300">
                      <span>Пакет: {selectedPackage}</span>
                      <span>{packages.find(p => p.name === selectedPackage)?.duration}</span>
                    </div>
                    <div className="flex justify-between text-xs text-stone-300">
                      <span>Количество гостей:</span>
                      <span>{formData.guests} чел.</span>
                    </div>
                    <div className="flex justify-between text-xs text-stone-300">
                      <span>Стоимость за человека в день:</span>
                      <span>{formatPrice(packages.find(p => p.name === selectedPackage)?.pricePerPersonPerDay || 0)}</span>
                    </div>
                    <div className="flex justify-between text-xs text-stone-300">
                      <span>Расчет:</span>
                      <span>{formatPrice(packages.find(p => p.name === selectedPackage)?.pricePerPersonPerDay || 0)} × {packages.find(p => p.name === selectedPackage)?.days} дн. × {formData.guests} чел.</span>
                    </div>
                    <hr className="border-forest-600/30 my-2" />
                    <div className="flex justify-between text-sm font-semibold text-forest-400">
                      <span>Общая стоимость:</span>
                      <span>{formatPrice(calculateTotalPrice())}</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-stone-400 mb-3">Выберите пакет и количество гостей для расчета</p>
                )}

                <h4 className="font-semibold text-forest-400 mb-1 text-sm">Условия:</h4>
                <ul className="list-disc pl-4 text-xs text-stone-400">
                  <li>Предоплата 10 000 ₽ за человека</li>
                  <li>В стоимость включено: проживание, питание, трансфер, все активности</li>
                  <li>Заезд с 14:00, выезд до 12:00</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsBookingOpen(false)}
                  className="flex-1 bg-forest-800/30 border-forest-600/50 text-stone-300 hover:bg-forest-700/40 hover:text-stone-200 hover:border-forest-500/70 transition-all duration-200 order-2 sm:order-1"
                >
                  <X className="h-4 w-4 mr-2" />
                  Отмена
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-forest-600 to-forest-700 hover:from-forest-500 hover:to-forest-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200 order-1 sm:order-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Отправляем...
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-4 w-4 mr-2" />
                      Забронировать
                    </>
                  )}
                </Button>
              </div>
            </div>
          </form>
          )}
        </DialogContent>
      </Dialog>
      {/* Map Modal */}
      <Dialog open={isMapOpen} onOpenChange={setIsMapOpen}>
        <DialogContent className="w-[95vw] max-w-[800px] bg-forest-900/95 backdrop-blur-sm border-forest-700/30 text-stone-100 p-0 max-h-[90vh] overflow-y-auto">
          <DialogHeader className="p-4 sm:p-6 pb-4">
            <DialogTitle className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-forest-400 to-amber-400 bg-clip-text text-transparent flex items-center gap-2 sm:gap-3">
              <div className="bg-gradient-to-r from-forest-500 to-forest-600 w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center">
                <MapPin className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
              </div>
              Деревня Виллагора
            </DialogTitle>
            <DialogDescription className="text-stone-300 text-sm sm:text-base">
              посёлок Виллагора, Чалнинское сельское поселение, Пряжинский район, Республика Карелия
              <br />
              <span className="text-forest-400 font-mono text-xs sm:text-sm">Координаты: 61.89101283682342, 33.68979055651442</span>
            </DialogDescription>
          </DialogHeader>

          <div className="relative h-64 sm:h-96 bg-forest-800/20">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2134.8!2d33.68979055651442!3d61.89101283682342!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNjHCsDUzJzI3LjYiTiAzM8KwNDEnMjMuMiJF!5e0!3m2!1sru!2sru!4v1640000000000!5m2!1sru!2sru"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-b-lg"
            />
          </div>

          <div className="p-4 sm:p-6 pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Button
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white border-0 text-sm sm:text-base touch-friendly"
                onClick={() => window.open(`https://yandex.ru/maps?whatshere%5Bpoint%5D=33.68979055651442%2C61.89101283682342&whatshere%5Bzoom%5D=18.245955&ll=33.68979055651442%2C61.89087251654484&z=18.245955`, "_blank")}
              >
                <MapPin className="h-4 w-4 mr-2" />
                Яндекс.Карты
              </Button>
              <Button
                className="bg-gradient-to-r from-forest-600 to-forest-700 hover:from-forest-500 hover:to-forest-600 text-white border-0 text-sm sm:text-base touch-friendly"
                onClick={() => window.open(`https://maps.google.com/?q=61.89101283682342,33.68979055651442`, "_blank")}
              >
                <MapPin className="h-4 w-4 mr-2" />
                Google Maps
              </Button>
              <Button
                className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white border-0 text-sm sm:text-base touch-friendly"
                onClick={() => {
                  navigator.clipboard.writeText("61.89101283682342, 33.68979055651442")
                  // Можно добавить уведомление о копировании
                }}
              >
                📋 Координаты
              </Button>
            </div>

            <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-forest-800/20 rounded-lg border border-forest-600/30">
              <h4 className="font-semibold text-forest-400 mb-2 text-sm sm:text-base">Как добраться:</h4>
              <ul className="text-xs sm:text-sm text-stone-300 space-y-1">
                <li>• Из Петрозаводска: ~45 км по трассе А-121</li>
                <li>• Ближайшая ж/д станция: Пряжа (15 км)</li>
                <li>• Трансфер включен во все пакеты</li>
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Добавляем StagewiseToolbar только в режиме разработки */}
      {process.env.NODE_ENV === 'development' && <StagewiseToolbarClient />}
    </div>
  )
}
