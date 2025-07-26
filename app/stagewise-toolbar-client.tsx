'use client'

import { useEffect, useState } from 'react'

export default function StagewiseToolbarClient() {
  const [StagewiseToolbar, setStagewiseToolbar] = useState<React.ComponentType | null>(null)

  useEffect(() => {
    // Загружаем компонент только на клиенте и только в режиме разработки
    if (process.env.NODE_ENV === 'development') {
      import('@stagewise/toolbar-next')
        .then((mod) => {
          setStagewiseToolbar(() => mod.StagewiseToolbar)
        })
        .catch((err) => {
          console.error('Failed to load Stagewise Toolbar:', err)
        })
    }
  }, [])

  // Если компонент не загружен или не в режиме разработки, не рендерим ничего
  if (!StagewiseToolbar) return null

  return <StagewiseToolbar />
} 