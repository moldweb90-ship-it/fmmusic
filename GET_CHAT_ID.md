# Как получить Chat ID для @fbmusicmd_bot

## Шаг 1: Получите токен бота от BotFather

1. Найдите в Telegram **@BotFather**
2. Отправьте `/mybots`
3. Выберите вашего бота **@fbmusicmd_bot**
4. Нажмите **API Token**
5. **Скопируйте токен** (выглядит так: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)

## Шаг 2: Откройте ссылку в браузере

1. Убедитесь, что вы **написали вашему боту @fbmusicmd_bot** хотя бы одно сообщение (например, "/start")
2. Откройте в браузере эту ссылку (замените `ВАШ_ТОКЕН` на токен из шага 1):

```
https://api.telegram.org/botВАШ_ТОКЕН/getUpdates
```

**Пример:**
Если ваш токен `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`, то ссылка будет:
```
https://api.telegram.org/bot123456789:ABCdefGHIjklMNOpqrsTUVwxyz/getUpdates
```

## Шаг 3: Найдите Chat ID в ответе

В ответе будет JSON. Найдите блок, который выглядит так:

```json
"chat":{"id":123456789,"first_name":"Ваше Имя",...
```

**Число после `"id":` - это ваш Chat ID!**

Например, если видите `"id":123456789`, то ваш Chat ID = `123456789`

## Альтернативный способ: через @userinfobot

1. Найдите бота **@userinfobot** в Telegram
2. Отправьте ему `/start`
3. Он покажет ваш User ID - это и есть ваш Chat ID для личных сообщений

## Что делать дальше?

После того, как получите Chat ID:
1. Зайдите на Vercel
2. Settings → Environment Variables
3. Добавьте:
   - `TELEGRAM_BOT_TOKEN` = ваш токен
   - `TELEGRAM_CHAT_ID` = ваш Chat ID (только цифры!)
4. Сохраните и переразверните проект

