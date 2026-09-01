<?php
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

$name = isset($data['name']) ? trim($data['name']) : '';
$email = isset($data['email']) ? trim($data['email']) : '';
$service = isset($data['service']) ? trim($data['service']) : '';
$message = isset($data['message']) ? trim($data['message']) : '';
$honeypot = isset($data['honeypot']) ? trim($data['honeypot']) : '';

if (!empty($honeypot)) {
    echo json_encode(['success' => true]);
    exit;
}

if (empty($name) || empty($email) || empty($service) || empty($message)) {
    echo json_encode(['success' => false, 'message' => 'All fields required']);
    exit;
}

// Telegram Bot Settings
$botToken = '8513809879:AAHLs2og5hJ_txSNTAu9ngPmbXx4IAvbbmg';
$chatId = getenv('TELEGRAM_CHAT_ID') ?: '';

// Log submission locally on server
$logEntry = date('Y-m-d H:i:s') . " | Name: $name | Email: $email | Service: $service | Message: $message\n";
@file_put_contents(__DIR__ . '/submissions.log', $logEntry, FILE_APPEND);

// Send Telegram notification
if (!empty($botToken) && !empty($chatId)) {
    $now = date('d.m.Y H:i');
    $text = "🏛 <b>Новая заявка с сайта Verumpraxis.kz</b>\n\n"
          . "👤 <b>Имя:</b> " . htmlspecialchars($name, ENT_QUOTES, 'UTF-8') . "\n"
          . "📧 <b>Email:</b> " . htmlspecialchars($email, ENT_QUOTES, 'UTF-8') . "\n"
          . "⚖️ <b>Услуга:</b> " . htmlspecialchars($service, ENT_QUOTES, 'UTF-8') . "\n\n"
          . "💬 <b>Сообщение:</b>\n" . htmlspecialchars($message, ENT_QUOTES, 'UTF-8') . "\n\n"
          . "🕒 <i>$now</i>";

    $url = "https://api.telegram.org/bot{$botToken}/sendMessage";
    $payload = json_encode([
        'chat_id' => $chatId,
        'text' => $text,
        'parse_mode' => 'HTML'
    ]);

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    @curl_exec($ch);
    @curl_close($ch);
}

// Backup email notification
$to = 'info@verumpraxis.kz';
$subject = "=?UTF-8?B?" . base64_encode("Новая заявка от $name — Verumpraxis") . "?=";
$mailBody = "Имя: $name\nEmail: $email\nУслуга: $service\n\nСообщение:\n$message\n";
$headers = "From: noreply@verumpraxis.kz\r\nReply-To: $email\r\nContent-Type: text/plain; charset=UTF-8\r\n";
@mail($to, $subject, $mailBody, $headers);

echo json_encode(['success' => true]);