import { NextRequest, NextResponse } from 'next/server'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

export async function POST(request: NextRequest) {
  try {
    const bookingData = await request.json()
    
    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
    const CHAT_ID = process.env.TELEGRAM_USER_ID // Изменено с TELEGRAM_CHAT_ID на TELEGRAM_USER_ID
    
    if (!BOT_TOKEN || !CHAT_ID || BOT_TOKEN === "YOUR_BOT_TOKEN_HERE" || CHAT_ID === "YOUR_CHAT_ID_HERE") {
      return NextResponse.json(
        { error: 'Telegram bot not configured. Please set BOT_TOKEN and CHAT_ID in .env.local' },
        { status: 400 }
      )
    }

    const message = `🏞️ НОВАЯ ЗАЯВКА НА РЕТРИТ В КАРЕЛИИ

👤 Имя: ${bookingData.name}
📞 Телефон: ${bookingData.phone}
📧 Email: ${bookingData.email}
📦 Пакет: ${bookingData.package || 'Не выбран'}
👥 Количество гостей: ${bookingData.guests} чел.
📅 Заезд: ${bookingData.checkIn ? format(new Date(bookingData.checkIn), "dd.MM.yyyy", { locale: ru }) : 'Не указано'}
📅 Выезд: ${bookingData.checkOut ? format(new Date(bookingData.checkOut), "dd.MM.yyyy", { locale: ru }) : 'Не указано'}
💬 Пожелания: ${bookingData.message || 'Нет пожеланий'}

⏰ Время подачи заявки: ${format(new Date(), "dd.MM.yyyy HH:mm", { locale: ru })}`

    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Telegram API error:', errorData)
      return NextResponse.json(
        { error: 'Failed to send message to Telegram' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in telegram API route:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
