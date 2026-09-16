<?php
/**
 * Verumpraxis.kz - Конфигурация отправки заявок с сайта
 * 
 * ПОЧТА:
 * Домен verumpraxis.kz использует почтовый сервис Zoho Mail (mx.zoho.com).
 * В DNS домена настроена SPF-запись (include:zohomail.com ~all).
 * Для 100% гарантированной доставки писем в папку Входящие info@verumpraxis.kz
 * (без попадания в спам и без блокировок хостинга) рекомендуется указать
 * Пароль приложения Zoho (App Password) в поле 'pass'.
 * 
 * Как получить App Password в Zoho:
 * 1. Войдите в https://accounts.zoho.com (логин: info@verumpraxis.kz)
 * 2. Перейдите в раздел: Безопасность (Security) -> Пароли приложений (App Passwords)
 * 3. Нажмите Создать (Generate New Password), введите название (например: Website)
 * 4. Вставьте полученный пароль в поле 'pass' ниже.
 * 
 * Если 'pass' оставлен пустым, скрипт отправляет письмо через mail() сервера,
 * а также ВСЕ заявки всегда надежно записываются в файл submissions.log.
 */

return [
    // Получатель заявок
    'to_email' => 'info@verumpraxis.kz',

    // Отправка через SMTP (true - отправлять через SMTP, false - стандартный mail())
    'use_smtp' => true,

    // Резервная отправка через HTTPS Web3Forms API (обходит все блокировки SMTP портов хостинга)
    'web3forms_key' => '9a7852ab-aa18-465d-8e1d-37834d7fba02',

    // Параметры SMTP (по умолчанию настроены под Zoho Mail)
    'smtp' => [
        'host' => 'smtppro.zoho.com', // или smtp.zoho.com
        'port' => 465,                 // 465 (SSL) или 587 (TLS)
        'user' => 'info@verumpraxis.kz',
        'pass' => 'RvGksk0RsgAu',
        'from' => 'info@verumpraxis.kz',
        'from_name' => 'Verumpraxis Website',
    ],

    // Уведомления в Telegram (опционально)
    'telegram' => [
        'enabled' => true,
        'bot_token' => '8513809879:AAHLs2og5hJ_txSNTAu9ngPmbXx4IAvbbmg',
        'chat_id' => '', // <- Вставьте сюда ваш Telegram Chat ID (например: 123456789)
    ],
];
