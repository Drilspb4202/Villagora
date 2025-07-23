# Этап сборки
FROM node:18-alpine AS builder

# Установка зависимостей для сборки
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./
# Установка зависимостей
RUN npm ci

# Копируем исходный код проекта
COPY . .

# Сборка приложения
RUN npm run build

# Этап подготовки статических файлов для Timeweb Cloud
FROM builder AS static-generator
WORKDIR /app

# Создаем директорию /out для Timeweb Cloud
RUN mkdir -p /out
# Копируем статические файлы
RUN cp -r .next/static /out/
RUN cp -r public/* /out/
# Создаем index.html для Timeweb Cloud
RUN echo '<!DOCTYPE html><html><head><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=/_next/static/index.html"></head><body><p>Перенаправление...</p></body></html>' > /out/index.html

# Этап запуска
FROM node:18-alpine AS runner
WORKDIR /app

# Установка только production зависимостей
ENV NODE_ENV production

# Добавляем пользователя с ограниченными правами
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Копируем собранное приложение из предыдущего этапа
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Создаем директорию /out и копируем статические файлы
COPY --from=static-generator /out /out

# Устанавливаем права для пользователя nextjs
RUN chown -R nextjs:nodejs /app

USER nextjs

# Порт на котором будет работать приложение (стандартный порт для Timeweb Cloud)
EXPOSE 3000

# Устанавливаем переменную окружения для порта
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Запускаем приложение
CMD ["node", "server.js"] 