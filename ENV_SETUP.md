# Настройка переменных окружения на Vercel

После того как код будет задеплоен на Vercel, нужно добавить переменные окружения:

1. Зайдите на https://vercel.com
2. Откройте проект "fmmusic"
3. Перейдите в **Settings** → **Environment Variables**
4. Добавьте две переменные:

   **Переменная 1:**
   - Name: `TELEGRAM_BOT_TOKEN`
   - Value: `8578932138:AAHj-jNv91RCyqBH-FMZmJS0p-dHKbyw0uI`
   - Environment: Production, Preview, Development (все три галочки)

   **Переменная 2:**
   - Name: `TELEGRAM_CHAT_ID`
   - Value: `978836383`
   - Environment: Production, Preview, Development (все три галочки)

5. Нажмите **Save**
6. Переразверните проект:
   - Перейдите в **Deployments**
   - Выберите последний deployment
   - Нажмите три точки (⋯) → **Redeploy**

После этого API будет работать и заявки будут приходить в Telegram!

