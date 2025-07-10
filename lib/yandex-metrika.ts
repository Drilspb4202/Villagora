// Утилиты для работы с Яндекс.Метрикой
declare global {
  interface Window {
    ym: (
      counterId: number,
      method: string,
      ...params: any[]
    ) => void;
  }
}

const YANDEX_METRIKA_ID = 103023290;

// Проверка доступности Яндекс.Метрики
export const isYandexMetrikaAvailable = (): boolean => {
  return typeof window !== 'undefined' && typeof window.ym === 'function';
};

// Отслеживание целей
export const trackGoal = (goalName: string, params?: Record<string, any>) => {
  if (isYandexMetrikaAvailable()) {
    try {
      if (params) {
        window.ym(YANDEX_METRIKA_ID, 'reachGoal', goalName, params);
      } else {
        window.ym(YANDEX_METRIKA_ID, 'reachGoal', goalName);
      }
      console.log(`Yandex Metrika goal tracked: ${goalName}`, params);
    } catch (error) {
      console.error('Error tracking Yandex Metrika goal:', error);
    }
  }
};

// Отслеживание параметров пользователя
export const setUserParams = (params: Record<string, any>) => {
  if (isYandexMetrikaAvailable()) {
    try {
      window.ym(YANDEX_METRIKA_ID, 'userParams', params);
      console.log('Yandex Metrika user params set:', params);
    } catch (error) {
      console.error('Error setting Yandex Metrika user params:', error);
    }
  }
};

// Отслеживание внешних ссылок
export const trackExternalLink = (url: string) => {
  if (isYandexMetrikaAvailable()) {
    try {
      window.ym(YANDEX_METRIKA_ID, 'extLink', url);
      console.log(`Yandex Metrika external link tracked: ${url}`);
    } catch (error) {
      console.error('Error tracking external link:', error);
    }
  }
};

// Отслеживание файлов
export const trackFileDownload = (url: string) => {
  if (isYandexMetrikaAvailable()) {
    try {
      window.ym(YANDEX_METRIKA_ID, 'file', url);
      console.log(`Yandex Metrika file download tracked: ${url}`);
    } catch (error) {
      console.error('Error tracking file download:', error);
    }
  }
};

// Отслеживание не отказов (для точного показателя отказов)
export const trackNotBounce = () => {
  if (isYandexMetrikaAvailable()) {
    try {
      window.ym(YANDEX_METRIKA_ID, 'notBounce');
      console.log('Yandex Metrika not bounce tracked');
    } catch (error) {
      console.error('Error tracking not bounce:', error);
    }
  }
};

// Предустановленные цели для отслеживания
export const YandexMetrikaGoals = {
  // Основные цели
  BOOKING_FORM_OPENED: 'booking_form_opened',
  BOOKING_FORM_SUBMITTED: 'booking_form_submitted',
  CONTACT_FORM_SUBMITTED: 'contact_form_submitted',
  
  // Взаимодействие с контентом
  GALLERY_VIEWED: 'gallery_viewed',
  PACKAGES_VIEWED: 'packages_viewed',
  FAQ_OPENED: 'faq_opened',
  
  // Контакты и связь
  PHONE_CLICKED: 'phone_clicked',
  TELEGRAM_CLICKED: 'telegram_clicked',
  MAP_OPENED: 'map_opened',
  
  // Навигация
  SCROLL_TO_ABOUT: 'scroll_to_about',
  SCROLL_TO_PACKAGES: 'scroll_to_packages',
  SCROLL_TO_GALLERY: 'scroll_to_gallery',
  SCROLL_TO_CONTACT: 'scroll_to_contact',
  
  // Время на сайте
  TIME_30_SECONDS: 'time_30_seconds',
  TIME_60_SECONDS: 'time_60_seconds',
  TIME_120_SECONDS: 'time_120_seconds',
  
  // Глубина просмотра
  SCROLL_25_PERCENT: 'scroll_25_percent',
  SCROLL_50_PERCENT: 'scroll_50_percent',
  SCROLL_75_PERCENT: 'scroll_75_percent',
  SCROLL_100_PERCENT: 'scroll_100_percent',
};

// Функции для отслеживания конкретных действий
export const trackBookingFormOpened = (packageName?: string) => {
  trackGoal(YandexMetrikaGoals.BOOKING_FORM_OPENED, {
    package: packageName || 'unknown'
  });
};

export const trackBookingFormSubmitted = (formData: {
  package?: string;
  guests?: number;
  checkIn?: string;
  checkOut?: string;
  totalPrice?: number;
}) => {
  trackGoal(YandexMetrikaGoals.BOOKING_FORM_SUBMITTED, formData);
};

export const trackContactFormSubmitted = (formType: string) => {
  trackGoal(YandexMetrikaGoals.CONTACT_FORM_SUBMITTED, {
    form_type: formType
  });
};

export const trackPhoneClick = () => {
  trackGoal(YandexMetrikaGoals.PHONE_CLICKED);
};

export const trackTelegramClick = () => {
  trackGoal(YandexMetrikaGoals.TELEGRAM_CLICKED);
};

export const trackMapOpened = () => {
  trackGoal(YandexMetrikaGoals.MAP_OPENED);
};

export const trackGalleryViewed = (imageIndex?: number) => {
  trackGoal(YandexMetrikaGoals.GALLERY_VIEWED, {
    image_index: imageIndex
  });
};

export const trackPackagesViewed = () => {
  trackGoal(YandexMetrikaGoals.PACKAGES_VIEWED);
};

export const trackFaqOpened = (questionIndex?: number) => {
  trackGoal(YandexMetrikaGoals.FAQ_OPENED, {
    question_index: questionIndex
  });
};

// Автоматическое отслеживание времени на сайте
export const initTimeTracking = () => {
  if (typeof window === 'undefined') return;

  // 30 секунд
  setTimeout(() => {
    trackGoal(YandexMetrikaGoals.TIME_30_SECONDS);
  }, 30000);

  // 60 секунд
  setTimeout(() => {
    trackGoal(YandexMetrikaGoals.TIME_60_SECONDS);
  }, 60000);

  // 120 секунд
  setTimeout(() => {
    trackGoal(YandexMetrikaGoals.TIME_120_SECONDS);
  }, 120000);
};

// Автоматическое отслеживание прокрутки
export const initScrollTracking = () => {
  if (typeof window === 'undefined') return;

  let scrollTracked = {
    '25': false,
    '50': false,
    '75': false,
    '100': false
  };

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / documentHeight) * 100;

    if (scrollPercent >= 25 && !scrollTracked['25']) {
      trackGoal(YandexMetrikaGoals.SCROLL_25_PERCENT);
      scrollTracked['25'] = true;
    }
    if (scrollPercent >= 50 && !scrollTracked['50']) {
      trackGoal(YandexMetrikaGoals.SCROLL_50_PERCENT);
      scrollTracked['50'] = true;
    }
    if (scrollPercent >= 75 && !scrollTracked['75']) {
      trackGoal(YandexMetrikaGoals.SCROLL_75_PERCENT);
      scrollTracked['75'] = true;
    }
    if (scrollPercent >= 100 && !scrollTracked['100']) {
      trackGoal(YandexMetrikaGoals.SCROLL_100_PERCENT);
      scrollTracked['100'] = true;
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
};

// Инициализация всех трекингов
export const initYandexMetrikaTracking = () => {
  if (typeof window === 'undefined') return;

  // Ждем загрузки Яндекс.Метрики
  const checkMetrika = () => {
    if (isYandexMetrikaAvailable()) {
      initTimeTracking();
      initScrollTracking();
      console.log('Yandex Metrika tracking initialized');
    } else {
      setTimeout(checkMetrika, 1000);
    }
  };

  setTimeout(checkMetrika, 1000);
};
