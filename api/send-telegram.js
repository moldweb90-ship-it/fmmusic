// Helper function to escape Markdown special characters for Telegram
function escapeMarkdown(text) {
  if (!text) return '';
  return String(text)
    .replace(/\_/g, '\\_')
    .replace(/\*/g, '\\*')
    .replace(/\[/g, '\\[')
    .replace(/\]/g, '\\]')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
    .replace(/\~/g, '\\~')
    .replace(/\`/g, '\\`')
    .replace(/\>/g, '\\>')
    .replace(/\#/g, '\\#')
    .replace(/\+/g, '\\+')
    .replace(/\-/g, '\\-')
    .replace(/\=/g, '\\=')
    .replace(/\|/g, '\\|')
    .replace(/\{/g, '\\{')
    .replace(/\}/g, '\\}')
    .replace(/\./g, '\\.')
    .replace(/\!/g, '\\!');
}

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { formData, lang = 'ru' } = req.body;

    // Validate required fields
    if (!formData || !formData.name || !formData.phone) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Get Telegram bot token and chat ID from environment variables
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error('Telegram credentials not configured');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Format the message
    const typeText = formData.type === 'song' 
      ? (lang === 'ru' ? '🎵 Персональная Песня (700 MDL)' : '🎵 Piesă Personalizată (700 MDL)')
      : (lang === 'ru' ? '📝 Музыкальный Стих (500 MDL)' : '📝 Poezie Muzicală (500 MDL)');

    // Style mapping with full translations
    const styleMap = {
      'Pop': lang === 'ru' ? 'Поп-музыка' : 'Pop',
      'HipHop': lang === 'ru' ? 'Хип-хоп / Рэп' : 'Hip-Hop / Rap',
      'Chanson': lang === 'ru' ? 'Шансон' : 'Șanson',
      'Rock': lang === 'ru' ? 'Рок' : 'Rock',
      'RnB': lang === 'ru' ? 'R&B / Соул' : 'R&B / Soul',
      'Jazz': lang === 'ru' ? 'Джаз' : 'Jazz',
      'Classic': lang === 'ru' ? 'Классика' : 'Clasică',
      'Custom': formData.customStyle || (lang === 'ru' ? 'Свой вариант' : 'Alt stil')
    };

    // Mood mapping with full translations
    const moodMap = {
      'Romantic': lang === 'ru' ? 'Романтичное ❤️' : 'Romantic ❤️',
      'Touching': lang === 'ru' ? 'Трогательное (до слез) 🥺' : 'Emoționant (lacrimi) 🥺',
      'Fun': lang === 'ru' ? 'Веселое / Драйв 🔥' : 'Vesel / Drive 🔥',
      'Funny': lang === 'ru' ? 'С приколом / Смешное 😂' : 'Amuzant / Funny 😂',
      'Epic': lang === 'ru' ? 'Эпичное / Торжественное 🌟' : 'Epic / Solemn 🌟'
    };

    const styleText = formData.style ? (styleMap[formData.style] || formData.style) : '-';
    const moodText = formData.mood ? (moodMap[formData.mood] || formData.mood) : '-';

    // Build the message with proper formatting (escape user input to prevent Markdown breaking)
    let message = `🆕 *${lang === 'ru' ? 'НОВАЯ ЗАЯВКА' : 'CERERE NOUĂ'}*\n\n`;
    
    message += `*${lang === 'ru' ? 'ТИП ЗАКАЗА' : 'TIP COMANDĂ'}:* ${typeText}\n\n`;
    
    message += `*${lang === 'ru' ? 'КОНТАКТНАЯ ИНФОРМАЦИЯ' : 'INFORMAȚII CONTACT'}*\n`;
    message += `👤 *${lang === 'ru' ? 'Имя' : 'Nume'}:* ${escapeMarkdown(formData.name) || '-'}\n`;
    message += `📱 *${lang === 'ru' ? 'Телефон' : 'Telefon'}:* ${escapeMarkdown(formData.phone) || '-'}\n`;
    message += `💬 *${lang === 'ru' ? 'Telegram / Почта' : 'Telegram / Email'}:* ${escapeMarkdown(formData.telegram) || '-'}\n`;
    message += `🎯 *${lang === 'ru' ? 'Для кого' : 'Pentru cine'}:* ${escapeMarkdown(formData.recipient) || '-'}\n\n`;
    
    message += `*${lang === 'ru' ? 'ПАРАМЕТРЫ ЗАКАЗА' : 'PARAMETRI COMANDĂ'}*\n`;
    message += `💭 *${lang === 'ru' ? 'Настроение / Вайб' : 'Dispoziție / Vibe'}:* ${moodText}\n`;
    message += `🎵 *${lang === 'ru' ? 'Стиль музыки' : 'Stil muzical'}:* ${escapeMarkdown(styleText)}\n\n`;
    
    message += `*${lang === 'ru' ? 'ИСТОРИЯ / ФАКТЫ' : 'POVESTE / FAPTE'}*\n`;
    message += `${escapeMarkdown(formData.story) || '-'}\n\n`;
    
    message += `━━━━━━━━━━━━━━━━\n`;
    const dateTime = new Date().toLocaleString(lang === 'ru' ? 'ru-RU' : 'ro-RO', { 
      timeZone: 'Europe/Chisinau', 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    message += `🕐 ${lang === 'ru' ? 'Время заявки' : 'Timpul cererii'}: ${dateTime}`;

    message = message.trim();

    // Send message to Telegram
    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    
    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.ok) {
      console.error('Telegram API error:', data);
      return res.status(500).json({ error: 'Failed to send message to Telegram' });
    }

    return res.status(200).json({ success: true, message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error in send-telegram API:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

