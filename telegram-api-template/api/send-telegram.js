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
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { formData } = req.body;

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
      ? '🎵 Персональная Песня (3000 руб)'
      : '📝 Музыкальный Стих (2000 руб)';

    // Style mapping
    const styleMap = {
      'Pop': 'Поп-музыка',
      'HipHop': 'Хип-хоп / Рэп',
      'Chanson': 'Шансон',
      'Rock': 'Рок',
      'RnB': 'R&B / Соул',
      'Jazz': 'Джаз',
      'Classic': 'Классика',
      'Custom': formData.customStyle || 'Свой вариант'
    };

    // Mood mapping
    const moodMap = {
      'Romantic': 'Романтичное ❤️',
      'Touching': 'Трогательное (до слез) 🥺',
      'Fun': 'Веселое / Драйв 🔥',
      'Funny': 'С приколом / Смешное 😂',
      'Epic': 'Эпичное / Торжественное 🌟'
    };

    const styleText = formData.style ? (styleMap[formData.style] || formData.style) : '-';
    const moodText = formData.mood ? (moodMap[formData.mood] || formData.mood) : '-';

    // Build the message with proper formatting (escape user input to prevent Markdown breaking)
    let message = `🆕 *НОВАЯ ЗАЯВКА*\n\n`;
    
    message += `*ТИП ЗАКАЗА:* ${typeText}\n\n`;
    
    message += `*КОНТАКТНАЯ ИНФОРМАЦИЯ*\n`;
    message += `👤 *Имя:* ${escapeMarkdown(formData.name) || '-'}\n`;
    message += `📱 *Телефон:* ${escapeMarkdown(formData.phone) || '-'}\n`;
    message += `💬 *Telegram / Почта:* ${escapeMarkdown(formData.telegram) || '-'}\n`;
    message += `🎯 *Для кого:* ${escapeMarkdown(formData.recipient) || '-'}\n\n`;
    
    message += `*ПАРАМЕТРЫ ЗАКАЗА*\n`;
    message += `💭 *Настроение / Вайб:* ${moodText}\n`;
    message += `🎵 *Стиль музыки:* ${escapeMarkdown(styleText)}\n\n`;
    
    message += `*ИСТОРИЯ / ФАКТЫ*\n`;
    message += `${escapeMarkdown(formData.story) || '-'}\n\n`;
    
    message += `━━━━━━━━━━━━━━━━\n`;
    const dateTime = new Date().toLocaleString('ru-RU', { 
      timeZone: 'Europe/Moscow', 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    message += `🕐 Время заявки: ${dateTime}`;

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

