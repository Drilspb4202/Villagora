# Деплой Next.js приложения на Timeweb Cloud

## Инструкция по локальному запуску

1. Клонировать репозиторий
2. Установить зависимости: `npm install`
3. Запустить в режиме разработки: `npm run dev`
4. Открыть в браузере: `http://localhost:3000`

## Деплой на Timeweb Cloud

### Вариант 1: Использование Timeweb Cloud Apps (рекомендуется)

#### Решение проблемы с `index.html`

В Timeweb Cloud Apps требуется наличие файла `index.html` в корневой директории `/out`. Наш Dockerfile создает специальный файл `index.html` с редиректом на Next.js приложение.

1. Зарегистрируйтесь или войдите в аккаунт на [Timeweb Cloud](https://timeweb.cloud/)
2. Перейдите в раздел "Apps" и выберите "Создать новое приложение"
3. Выберите "Docker" в качестве типа приложения (не "Next.js")
4. Подключите свой GitHub-репозиторий или загрузите код проекта
5. Укажите путь к Dockerfile (если он в корне, оставьте `/Dockerfile`)
6. Нажмите "Создать"

После этого Timeweb Cloud автоматически соберет образ из Dockerfile и запустит ваше приложение.

### Вариант 2: Альтернативный подход с экспортом статического сайта

Если вам нужен полностью статический сайт:

1. Измените `next.config.js`:
   ```js
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     output: 'export', // вместо 'standalone'
     images: {
       unoptimized: true, // для статического экспорта
     },
     // ...остальные настройки
   }
   ```

2. Выполните экспорт: `npm run export`
3. Загрузите содержимое папки `out` в Timeweb Cloud Apps

### Вариант 3: Использование Docker Containers

Для продвинутых пользователей:

1. Убедитесь, что в вашем проекте настроены файлы:
   - `Dockerfile` (с многоэтапной сборкой и поддержкой `/out`)
   - `.dockerignore`
   - `docker-compose.yml` (для локального тестирования)
   
2. Соберите Docker-образ:
   ```bash
   npm run docker:build
   # или напрямую
   docker build -t my-nextjs-app .
   ```

3. Загрузите образ в Container Registry:
   ```bash
   docker tag my-nextjs-app cr.timeweb.cloud/ваш-логин/my-nextjs-app
   docker push cr.timeweb.cloud/ваш-логин/my-nextjs-app
   ```

4. В панели управления Timeweb Cloud создайте контейнер, выбрав ваш образ из Container Registry.

### Вариант 4: Развертывание на VPS/VDS

1. Создайте VPS/VDS на Timeweb Cloud
2. Подключитесь к серверу по SSH
3. Установите Node.js и Git
4. Клонируйте репозиторий на сервер
5. Установите PM2: `npm install -g pm2`
6. Соберите проект: `npm run build`
7. Запустите проект через PM2: `pm2 start npm --name "nextjs" -- start`

## Решение распространенных проблем

### Ошибка: index.html not found in the /out

Эта ошибка возникает, когда Timeweb Cloud Apps не может найти файл `index.html` в директории `/out`. 

**Решение**: 
- Используйте наш обновленный Dockerfile, который создает необходимую структуру в `/out`
- Выберите тип "Docker" при создании приложения в Timeweb Cloud Apps

### Ошибка сборки Next.js

Если возникают ошибки при сборке Next.js приложения, проверьте:

1. Версии зависимостей в package.json
2. Настройки в next.config.js
3. Логи сборки (в Timeweb Cloud Apps или локально)

### Проблемы с кешем

Для очистки кеша Next.js:
```bash
rm -rf .next
npm run build
```

## Дополнительные настройки для Timeweb Cloud

### SSL-сертификат

1. В панели управления Timeweb Cloud перейдите в раздел "Домены и SSL"
2. Привяжите ваш домен к приложению
3. Нажмите "Выпустить SSL-сертификат" и следуйте инструкциям

### Мониторинг

Для мониторинга состояния приложения используется API-эндпоинт:
- `/api/health` - проверка работоспособности приложения
