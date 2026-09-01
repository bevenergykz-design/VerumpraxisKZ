export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const data = await request?.json?.();
    const name = data?.name ?? '';
    const email = data?.email ?? '';
    const service = data?.service ?? '';
    const message = data?.message ?? '';
    const honeypot = data?.honeypot ?? '';

    // Spam check
    if (honeypot) {
      return NextResponse.json({ success: true });
    }

    // Validate
    if (!name || !email || !service || !message) {
      return NextResponse.json({ success: false, message: 'All fields are required' }, { status: 400 });
    }

    // Save to DB
    await prisma.contactSubmission.create({
      data: { name, email, service, message },
    });

    // Send Telegram notification
    try {
      const botToken = process.env.TELEGRAM_BOT_TOKEN || '8513809879:AAHLs2og5hJ_txSNTAu9ngPmbXx4IAvbbmg';
      const chatId = process.env.TELEGRAM_CHAT_ID;

      if (botToken && chatId) {
        const escapeHtml = (str: string) =>
          str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');

        const nowFormatted = new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Almaty' });

        const telegramText =
          `🏛 <b>Новая заявка с сайта Verumpraxis.kz</b>\n\n` +
          `👤 <b>Имя:</b> ${escapeHtml(name)}\n` +
          `📧 <b>Email:</b> ${escapeHtml(email)}\n` +
          `⚖️ <b>Услуга:</b> ${escapeHtml(service)}\n\n` +
          `💬 <b>Сообщение:</b>\n${escapeHtml(message)}\n\n` +
          `🕒 <i>${nowFormatted}</i>`;

        const chatIds = chatId.split(',').map((id: string) => id.trim()).filter(Boolean);

        for (const targetChatId of chatIds) {
          await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: targetChatId,
              text: telegramText,
              parse_mode: 'HTML',
            }),
          });
        }
      }
    } catch (tgError: any) {
      console.error('Telegram notification failed:', tgError);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Contact form error:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
