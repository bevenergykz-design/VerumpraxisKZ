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

    // Send email notification
    try {
      const appUrl = process.env.NEXTAUTH_URL || '';
      let appName = 'Verumpraxis';
      try { appName = appUrl ? new URL(appUrl).hostname?.split?.('.')?.[0] ?? 'Verumpraxis' : 'Verumpraxis'; } catch {}

      const htmlBody = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1D4E5F; border-bottom: 2px solid #3A9ABF; padding-bottom: 10px;">
            Новая заявка с сайта Verumpraxis
          </h2>
          <div style="background: #F4F7F9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Имя:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p style="margin: 10px 0;"><strong>Услуга:</strong> ${service}</p>
            <p style="margin: 10px 0;"><strong>Сообщение:</strong></p>
            <div style="background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #3A9ABF;">
              ${message}
            </div>
          </div>
          <p style="color: #666; font-size: 12px;">
            Отправлено: ${new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Almaty' })}
          </p>
        </div>
      `;

      let senderEmail = 'noreply@verumpraxis.kz';
      try {
        if (appUrl) senderEmail = `noreply@${new URL(appUrl).hostname}`;
      } catch {}

      await fetch('https://apps.abacus.ai/api/sendNotificationEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          deployment_token: process.env.ABACUSAI_API_KEY,
          app_id: process.env.WEB_APP_ID,
          notification_id: process.env.NOTIF_ID_CONTACT_FORM_SUBMISSION,
          subject: `Новая заявка от ${name} — Verumpraxis`,
          body: htmlBody,
          is_html: true,
          recipient_email: 'info@verumpraxis.kz',
          sender_email: senderEmail,
          sender_alias: 'Verumpraxis Website',
        }),
      });
    } catch (emailError: any) {
      console.error('Email notification failed:', emailError);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Contact form error:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
