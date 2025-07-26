'use client'

import dynamic from 'next/dynamic'

// Динамический импорт StagewiseToolbar
const StagewiseToolbar = dynamic(
  () => import('@stagewise/toolbar-next').then(mod => mod.StagewiseToolbar),
  { ssr: false }
)

export default function StagewiseToolbarWrapper() {
  // Отображаем StagewiseToolbar только в режиме разработки
  if (process.env.NODE_ENV !== 'development') {
    return null
  }
  
  return <StagewiseToolbar />
} 