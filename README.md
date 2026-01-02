# Flower Box Landing Page

Landing page для Flower Box - сервиса персонализированной музыки и стихов к букетам.

## Технологии

- React 18
- Vite
- Tailwind CSS
- Lucide React (иконки)

## Разработка

```bash
# Установка зависимостей
npm install

# Запуск dev сервера
npm run dev

# Сборка для продакшена
npm run build

# Предпросмотр продакшен сборки
npm run preview
```

## Развертывание на Vercel

1. Установите Vercel CLI (если еще не установлен):
```bash
npm i -g vercel
```

2. Войдите в Vercel:
```bash
vercel login
```

3. Разверните проект:
```bash
vercel
```

Или подключите проект через веб-интерфейс Vercel:
- Зайдите на https://vercel.com
- Нажмите "Add New Project"
- Подключите ваш Git репозиторий (или загрузите файлы)
- Vercel автоматически определит настройки из `vercel.json`

## Настройка Telegram бота для получения заявок

Для работы отправки заявок в Telegram необходимо:

1. **Создать бота через BotFather:**
   - Откройте Telegram и найдите @BotFather
   - Отправьте команду `/newbot`
   - Следуйте инструкциям: задайте имя и username бота
   - Скопируйте токен бота (выглядит как `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)

2. **Получить Chat ID:**
   - Напишите вашему боту любое сообщение
   - Откройте в браузере: `https://api.telegram.org/bot<ВАШ_ТОКЕН>/getUpdates`
   - Найдите в ответе поле `"chat":{"id":123456789}` - это ваш Chat ID
   - Или используйте бота @userinfobot, чтобы узнать свой user ID

3. **Настроить переменные окружения в Vercel:**
   - Зайдите в настройки проекта на Vercel
   - Перейдите в раздел "Settings" → "Environment Variables"
   - Добавьте две переменные:
     - `TELEGRAM_BOT_TOKEN` = ваш токен бота
     - `TELEGRAM_CHAT_ID` = ваш Chat ID (только цифры, без кавычек)
   - Нажмите "Save" и переразверните проект

4. **Проверка:**
   - Заполните форму на сайте
   - Отправьте заявку
   - Проверьте, что сообщение пришло в Telegram

**Важно:** После добавления переменных окружения в Vercel нужно переразвернуть проект, чтобы изменения вступили в силу.

## Структура проекта

```
├── src/
│   ├── App.jsx          # Основной компонент
│   ├── main.jsx         # Точка входа
│   └── index.css        # Глобальные стили + Tailwind
├── index.html           # HTML шаблон
├── package.json         # Зависимости
├── vite.config.js       # Конфигурация Vite
├── tailwind.config.js   # Конфигурация Tailwind
├── postcss.config.js    # Конфигурация PostCSS
└── vercel.json          # Конфигурация Vercel
```

