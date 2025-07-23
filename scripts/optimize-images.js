const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Конфигурация
const config = {
  // Директория с изображениями
  imageDir: path.join(__dirname, '../public/images'),
  // Качество JPEG
  jpegQuality: 80,
  // Качество WebP
  webpQuality: 75,
  // Максимальная ширина больших изображений
  maxWidth: 1920,
  // Ширина для создания превью
  previewWidth: 300,
  // Расширения файлов для обработки
  extensions: ['.jpg', '.jpeg', '.png'],
  // Пропускать файлы с этими суффиксами
  skipSuffixes: ['-optimized', '-preview'],
};

// Функция для рекурсивного обхода директорий
async function processDirectory(directory) {
  console.log(`Обрабатываем директорию: ${directory}`);
  
  const items = fs.readdirSync(directory);
  
  for (const item of items) {
    const fullPath = path.join(directory, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      // Рекурсивно обрабатываем поддиректории
      await processDirectory(fullPath);
    } else {
      // Обрабатываем файл если это изображение
      const ext = path.extname(fullPath).toLowerCase();
      if (config.extensions.includes(ext)) {
        // Проверяем, не является ли файл уже оптимизированным
        if (!config.skipSuffixes.some(suffix => fullPath.includes(suffix))) {
          await optimizeImage(fullPath);
        }
      }
    }
  }
}

// Функция для оптимизации изображения
async function optimizeImage(imagePath) {
  try {
    const parsedPath = path.parse(imagePath);
    const optimizedPath = path.join(
      parsedPath.dir, 
      `${parsedPath.name}-optimized${parsedPath.ext}`
    );
    const previewPath = path.join(
      parsedPath.dir, 
      `${parsedPath.name}-preview${parsedPath.ext}`
    );
    const webpPath = path.join(
      parsedPath.dir, 
      `${parsedPath.name}${parsedPath.ext === '.png' ? '-optimized' : ''}.webp`
    );
    
    console.log(`Оптимизируем: ${imagePath}`);
    
    // Получаем информацию об изображении
    const metadata = await sharp(imagePath).metadata();
    
    // Оптимизируем основное изображение
    await sharp(imagePath)
      .resize({
        width: Math.min(metadata.width, config.maxWidth),
        withoutEnlargement: true
      })
      .jpeg({ quality: config.jpegQuality, mozjpeg: true })
      .toFile(optimizedPath);
    
    // Создаем превью
    await sharp(imagePath)
      .resize({
        width: config.previewWidth,
        withoutEnlargement: true
      })
      .jpeg({ quality: 60, mozjpeg: true })
      .toFile(previewPath);
    
    // Создаем WebP версию
    await sharp(imagePath)
      .resize({
        width: Math.min(metadata.width, config.maxWidth),
        withoutEnlargement: true
      })
      .webp({ quality: config.webpQuality })
      .toFile(webpPath);
    
    console.log(`✅ Готово: ${path.basename(imagePath)}`);
    console.log(`   - Оптимизированное: ${path.basename(optimizedPath)}`);
    console.log(`   - Превью: ${path.basename(previewPath)}`);
    console.log(`   - WebP: ${path.basename(webpPath)}`);
  } catch (error) {
    console.error(`❌ Ошибка при оптимизации ${imagePath}:`, error);
  }
}

// Главная функция
async function main() {
  console.log('🖼️ Начинаем оптимизацию изображений...');
  console.log(`📁 Директория: ${config.imageDir}`);
  console.log(`⚙️ Настройки: JPEG ${config.jpegQuality}%, WebP ${config.webpQuality}%, макс. ширина ${config.maxWidth}px`);
  
  try {
    await processDirectory(config.imageDir);
    console.log('✨ Оптимизация завершена!');
  } catch (error) {
    console.error('❌ Произошла ошибка:', error);
    process.exit(1);
  }
}

// Запускаем скрипт
main(); 