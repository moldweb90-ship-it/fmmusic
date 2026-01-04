# Инструкция: Настройка API для отправки заявок в Telegram

## Важно понимать:

- **Домен `fmvibe.ru` остается на GitHub Pages** - DNS настройки не меняются
- **API будет на отдельном URL Vercel** (например: `https://fmvibe-api.vercel.app`)
- Сайт с GitHub Pages будет отправлять запросы на API на Vercel
- Это нормально и безопасно - многие сайты так работают

## Шаги:

### 1. Развернуть API на Vercel (один раз):

1. Зайдите на https://vercel.com
2. Войдите в аккаунт (или создайте)
3. Нажмите "Add New Project" (Добавить проект)
4. Нажмите "Browse" и выберите папку `telegram-api` из этого проекта
5. Или загрузите файлы из папки `telegram-api`:
   - `api/send-telegram.js`
   - `package.json`
6. В настройках проекта (Settings → Environment Variables) добавьте:
   - `TELEGRAM_BOT_TOKEN` = `8578932138:AAHj-jNv91RCyqBH-FMZmJ...` (ваш токен)
   - `TELEGRAM_CHAT_ID` = `978836383` (ваш Chat ID)
7. Нажмите "Deploy"
8. После деплоя скопируйте URL проекта (будет вверху, например: `https://fmvibe-api.vercel.app`)

### 2. Указать URL API в основном проекте:

1. Откройте файл `src/App.jsx`
2. Найдите строку 5: `const API_URL = ...`
3. Замените на: `const API_URL = 'https://your-api-url.vercel.app/api/send-telegram';`
   (где `your-api-url` - ваш URL из шага 1.8)
4. Сохраните файл
5. Закоммитьте и запушите изменения

### 3. Готово!

После этого заявки будут отправляться в Telegram через API на Vercel.

---

## Если что-то не работает:

- Убедитесь, что URL API правильный (должен заканчиваться на `/api/send-telegram`)
- Проверьте, что переменные окружения на Vercel установлены правильно
- Проверьте консоль браузера (F12) на наличие ошибок

