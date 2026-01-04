# Настройка API для отправки заявок в Telegram

GitHub Pages не поддерживает серверные функции, поэтому нужно создать отдельный API endpoint.

## Вариант 1: Vercel API (Рекомендуется)

### Шаг 1: Создайте отдельный проект на Vercel

1. Создайте новую папку (например, `telegram-api`)
2. Создайте файл `api/send-telegram.js` (скопируйте из текущего проекта)
3. Создайте `package.json`:
```json
{
  "name": "telegram-api",
  "version": "1.0.0",
  "type": "module"
}
```

### Шаг 2: Разверните на Vercel

1. Зайдите на [vercel.com](https://vercel.com)
2. Импортируйте проект (или используйте Vercel CLI)
3. Добавьте переменные окружения:
   - `TELEGRAM_BOT_TOKEN` - ваш токен бота
   - `TELEGRAM_CHAT_ID` - ваш Chat ID

### Шаг 3: Укажите URL API в основном проекте

После деплоя на Vercel вы получите URL вида: `https://your-api.vercel.app/api/send-telegram`

В основном проекте создайте файл `.env`:
```
VITE_API_URL=https://your-api.vercel.app/api/send-telegram
```

Или укажите URL напрямую в `src/App.jsx` (строка 5):
```javascript
const API_URL = 'https://your-api.vercel.app/api/send-telegram';
```

## Вариант 2: Использовать существующий API endpoint

Если у вас уже есть API endpoint на другом сервере, просто укажите его URL в переменной `API_URL` в `src/App.jsx`.

## Вариант 3: Cloudflare Workers (Бесплатно)

Можно создать простой Cloudflare Worker для отправки в Telegram. Требует настройки аккаунта Cloudflare.

