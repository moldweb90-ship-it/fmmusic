# Telegram API для fmvibe.ru

API endpoint для отправки заявок в Telegram бот.

## Развертывание на Vercel

1. Зайдите на https://vercel.com и войдите в аккаунт
2. Нажмите "Add New Project"
3. Импортируйте эту папку `telegram-api` (или загрузите файлы)
4. В настройках проекта добавьте переменные окружения:
   - `TELEGRAM_BOT_TOKEN` = ваш токен бота (например: 8578932138:AAHj-jNv91RCyqBH-FMZmJ...)
   - `TELEGRAM_CHAT_ID` = ваш Chat ID (например: 978836383)
5. Нажмите "Deploy"
6. После деплоя скопируйте URL проекта (будет вида: https://fmvibe-api.vercel.app)
7. Используйте этот URL + `/api/send-telegram` в основном проекте

## Использование

После развертывания API будет доступен по адресу:
`https://your-project-name.vercel.app/api/send-telegram`

Этот URL нужно указать в основном проекте в файле `src/App.jsx` в строке 5.

