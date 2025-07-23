import { NextApiRequest, NextApiResponse } from 'next'

/**
 * API endpoint для проверки здоровья приложения (health check)
 * Используется Docker и Timeweb Cloud для проверки состояния приложения
 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Возвращаем статус 200 и сообщение "OK"
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() })
} 