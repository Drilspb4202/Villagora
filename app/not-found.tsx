import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-forest-950 via-forest-900 to-slate-900 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-forest-900/30 backdrop-blur-sm border border-forest-700/30 rounded-xl p-6 sm:p-8 text-center">
        <div className="mb-6">
          <div className="w-20 h-20 bg-forest-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">🌲</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-stone-100 mb-2">Страница не найдена</h1>
          <p className="text-stone-300 mb-6">
            Извините, запрашиваемая страница не существует или была перемещена.
          </p>
        </div>
        
        <Link href="/" passHref>
          <Button 
            className="bg-gradient-to-r from-forest-600 to-forest-700 hover:from-forest-500 hover:to-forest-600 text-white py-2 px-6 rounded-full shadow-lg flex items-center justify-center gap-2 mx-auto"
          >
            <Home className="w-5 h-5" />
            <span>Вернуться на главную</span>
          </Button>
        </Link>
      </div>
    </div>
  )
} 