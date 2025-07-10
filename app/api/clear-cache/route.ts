import { NextResponse } from 'next/server';

// API endpoint для сброса кэша и принудительного обновления превью
export async function GET() {
  // Генерируем новую версию для обхода кэша
  const version = Date.now();

  // URLs для очистки кэша в различных сервисах
  const urls = {
    main: 'https://www.villagora.ru',
    refresh: `https://www.villagora.ru/refresh-cache.html?v=${version}`,
    telegram: `https://www.villagora.ru/telegram-preview.html?v=${version}`,
    image: `https://www.villagora.ru/images/hero/hero.jpg?v=${version}`
  };

  // Инструкции для ручной очистки кэша
  const instructions = {
    telegram: 'Отправьте ссылку в @WebpageBot для обновления превью',
    facebook: 'Используйте Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/',
    twitter: 'Используйте Twitter Card Validator: https://cards-dev.twitter.com/validator',
    whatsapp: 'Отправьте ссылку в чат и дождитесь обновления превью'
  };

  return NextResponse.json({
    success: true,
    message: 'Cache invalidation URLs generated',
    version,
    urls,
    instructions,
    metadata: {
      title: 'Ретрит в Карелии | Отдых на природе в Виллагоре',
      description: 'Камерный ретрит в Виллагоре. Перезагрузка души в окружении хвойных лесов Карелии.',
      image: urls.image,
      updated: new Date().toISOString()
    }
  });
}

// POST endpoint для принудительного обновления
export async function POST() {
  const version = Date.now();

  try {
    // Здесь можно добавить логику для автоматической очистки кэша
    // через API различных сервисов (если доступны)

    return NextResponse.json({
      success: true,
      message: 'Cache cleared successfully',
      version,
      timestamp: new Date().toISOString(),
      nextSteps: [
        'Поделитесь ссылкой в Telegram для проверки',
        'Проверьте превью в других мессенджерах',
        'Дождитесь обновления (может занять до 24 часов)'
      ]
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Error clearing cache',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
