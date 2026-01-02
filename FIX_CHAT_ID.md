# Решение проблемы 404 при получении Chat ID

## Проблема: {"ok":false,"error_code":404,"description":"Not Found"}

Это означает, что токен неправильный или ссылка сформирована неправильно.

## Решение 1: Проверьте токен

1. Найдите **@BotFather** в Telegram
2. Отправьте `/mybots`
3. Выберите **@fbmusicmd_bot**
4. Нажмите **API Token**
5. **ВАЖНО**: Скопируйте токен полностью, без пробелов в начале или конце
6. Токен должен выглядеть так: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz` (две части через двоеточие)

## Решение 2: Проверьте ссылку

Ссылка должна быть **БЕЗ пробелов** и выглядеть так:

```
https://api.telegram.org/bot123456789:ABCdefGHIjklMNOpqrsTUVwxyz/getUpdates
```

**НЕПРАВИЛЬНО:**
- `https://api.telegram.org/bot 123456789:ABC/getUpdates` (пробел после bot)
- `https://api.telegram.org/bot123456789:ABC /getUpdates` (пробел перед /getUpdates)

## Решение 3: Самый простой способ - через @userinfobot

Если API не работает, используйте этот способ:

1. Найдите бота **@userinfobot** в Telegram
2. Отправьте `/start`
3. Бот покажет ваш **User ID** - это и есть ваш Chat ID!
4. Скопируйте это число

**Пример ответа:**
```
Your user ID: 123456789
```
Это число (123456789) - ваш Chat ID!

## Решение 4: Через @RawDataBot

1. Найдите **@RawDataBot**
2. Отправьте `/start`
3. В ответе найдите `"id":123456789` - это ваш Chat ID

## Что делать дальше?

После получения Chat ID:
1. Зайдите на Vercel
2. Settings → Environment Variables
3. Добавьте:
   - `TELEGRAM_BOT_TOKEN` = ваш токен (например: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)
   - `TELEGRAM_CHAT_ID` = ваш Chat ID (только цифры, например: `123456789`)
4. Сохраните и переразверните проект

