<?php
/**
 * Verumpraxis.kz - Contact Form Handler & Email Sender
 * Handles form submissions, sending via authenticated SMTP (Zoho Mail / custom)
 * with graceful fallback to server mail(), plus optional Telegram notifications
 * and persistent file logging.
 */

date_default_timezone_set('Asia/Almaty');

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

// 1. Read input
$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!is_array($data)) {
    echo json_encode(['success' => false, 'message' => 'Invalid JSON input']);
    exit;
}

$name     = isset($data['name']) ? trim($data['name']) : '';
$email    = isset($data['email']) ? trim($data['email']) : '';
$service  = isset($data['service']) ? trim($data['service']) : '';
$message  = isset($data['message']) ? trim($data['message']) : '';
$honeypot = isset($data['honeypot']) ? trim($data['honeypot']) : '';

// Anti-spam honeypot
if (!empty($honeypot)) {
    echo json_encode(['success' => true]);
    exit;
}

if (empty($name) || empty($email) || empty($service) || empty($message)) {
    echo json_encode(['success' => false, 'message' => 'All fields required']);
    exit;
}

// 2. Load Configuration
$configFile = __DIR__ . '/mail_config.php';
$config = [
    'to_email' => 'info@verumpraxis.kz',
    'use_smtp' => true,
    'smtp' => [
        'host' => 'smtppro.zoho.com',
        'port' => 465,
        'user' => 'info@verumpraxis.kz',
        'pass' => '',
        'from' => 'info@verumpraxis.kz',
        'from_name' => 'Verumpraxis Website',
    ],
    'telegram' => [
        'enabled' => true,
        'bot_token' => '8513809879:AAHLs2og5hJ_txSNTAu9ngPmbXx4IAvbbmg',
        'chat_id' => getenv('TELEGRAM_CHAT_ID') ?: '',
    ],
];

if (file_exists($configFile)) {
    $loadedConfig = include $configFile;
    if (is_array($loadedConfig)) {
        $config = array_replace_recursive($config, $loadedConfig);
    }
}

$now = date('d.m.Y H:i:s');
$clientIp = isset($_SERVER['HTTP_X_FORWARDED_FOR']) ? $_SERVER['HTTP_X_FORWARDED_FOR'] : (isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : 'unknown');

// 3. Prepare Email Content
$subject = "Новая заявка с сайта: " . $name . " — Verumpraxis";

$safeName = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
$safeEmail = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
$safeService = htmlspecialchars($service, ENT_QUOTES, 'UTF-8');
$safeMessage = nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8'));

$htmlBody = '<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>' . htmlspecialchars($subject, ENT_QUOTES, 'UTF-8') . '</title>
</head>
<body style="margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif; background-color: #0D2B36; color: #ffffff;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background-color: #103442; border: 1px solid rgba(255,255,255,0.12); border-radius: 6px; overflow: hidden;">
        <tr>
            <td style="padding: 24px 30px; background: linear-gradient(135deg, #1D4E5F 0%, #0D2B36 100%); border-bottom: 2px solid #3A9ABF;">
                <h1 style="margin: 0; font-size: 20px; font-weight: 600; color: #ffffff; letter-spacing: 0.05em;">VERUMPRAXIS</h1>
                <p style="margin: 6px 0 0 0; font-size: 13px; color: #3A9ABF; text-transform: uppercase; letter-spacing: 0.1em;">Новая заявка с веб-сайта</p>
            </td>
        </tr>
        <tr>
            <td style="padding: 30px;">
                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 14px; line-height: 1.6;">
                    <tr>
                        <td width="130" style="padding: 8px 0; color: rgba(255,255,255,0.6); font-weight: 500;">Имя клиента:</td>
                        <td style="padding: 8px 0; color: #ffffff; font-weight: 600;">' . $safeName . '</td>
                    </tr>
                    <tr>
                        <td width="130" style="padding: 8px 0; color: rgba(255,255,255,0.6); font-weight: 500;">Email клиента:</td>
                        <td style="padding: 8px 0;"><a href="mailto:' . $safeEmail . '" style="color: #3A9ABF; text-decoration: none; font-weight: 600;">' . $safeEmail . '</a></td>
                    </tr>
                    <tr>
                        <td width="130" style="padding: 8px 0; color: rgba(255,255,255,0.6); font-weight: 500;">Услуга:</td>
                        <td style="padding: 8px 0; color: #ffffff; font-weight: 600;">' . $safeService . '</td>
                    </tr>
                    <tr>
                        <td width="130" style="padding: 8px 0; color: rgba(255,255,255,0.6); font-weight: 500;">Дата и время:</td>
                        <td style="padding: 8px 0; color: rgba(255,255,255,0.8);">' . $now . ' (Алматы, UTC+5)</td>
                    </tr>
                </table>

                <div style="margin-top: 24px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1);">
                    <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #3A9ABF; margin-bottom: 10px; font-weight: 600;">Сообщение:</div>
                    <div style="background-color: rgba(255,255,255,0.04); border-left: 3px solid #3A9ABF; padding: 16px; border-radius: 4px; color: #ffffff; font-size: 14px; line-height: 1.6;">
                        ' . $safeMessage . '
                    </div>
                </div>

                <div style="margin-top: 26px; text-align: center;">
                    <a href="mailto:' . $safeEmail . '?subject=Re:%20Запрос%20в%20Verumpraxis" style="display: inline-block; padding: 12px 28px; background-color: #3A9ABF; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 13px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.05em;">Ответить клиенту</a>
                </div>
            </td>
        </tr>
        <tr>
            <td style="padding: 16px 30px; background-color: #0A1E26; font-size: 11px; color: rgba(255,255,255,0.4); text-align: center; border-top: 1px solid rgba(255,255,255,0.06);">
                IP отправителя: ' . htmlspecialchars($clientIp, ENT_QUOTES, 'UTF-8') . ' &bull; Verumpraxis.kz Юридический бутик
            </td>
        </tr>
    </table>
</body>
</html>';

$textBody = "🏛 VERUMPRAXIS — Новая заявка с сайта\n\n"
          . "Имя: $name\n"
          . "Email: $email\n"
          . "Услуга: $service\n"
          . "Дата: $now\n"
          . "IP: $clientIp\n\n"
          . "Сообщение:\n$message\n";

// 4. Send Email Function (Pure PHP SMTP with SSL/TLS)
function send_smtp_mail($to, $subject, $htmlBody, $textBody, $clientEmail, $clientName, $config) {
    $timeout = 10;
    $host = isset($config['host']) ? $config['host'] : 'smtppro.zoho.com';
    $port = isset($config['port']) ? (int)$config['port'] : 465;
    $user = isset($config['user']) ? $config['user'] : '';
    $pass = isset($config['pass']) ? $config['pass'] : '';
    $from = !empty($config['from']) ? $config['from'] : $user;
    $fromName = !empty($config['from_name']) ? $config['from_name'] : 'Verumpraxis Website';

    $isSsl = ($port === 465 || strpos($host, 'ssl://') === 0);
    $connectHost = ($isSsl && strpos($host, 'ssl://') !== 0) ? 'ssl://' . $host : $host;

    $context = stream_context_create([
        'ssl' => [
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true,
        ]
    ]);

    $socket = @stream_socket_client(
        $connectHost . ':' . $port,
        $errno,
        $errstr,
        $timeout,
        STREAM_CLIENT_CONNECT,
        $context
    );

    if (!$socket) {
        return ['success' => false, 'error' => "Cannot connect to $connectHost:$port: $errstr ($errno)"];
    }

    stream_set_timeout($socket, $timeout);

    $read = function() use ($socket) {
        $data = '';
        while (!feof($socket)) {
            $line = fgets($socket, 515);
            if ($line === false) break;
            $data .= $line;
            if (isset($line[3]) && $line[3] === ' ') break;
        }
        return $data;
    };

    $send = function($cmd, $expectedCode) use ($socket, $read) {
        if ($cmd !== null) {
            fputs($socket, $cmd . "\r\n");
        }
        $resp = $read();
        $code = (int)substr($resp, 0, 3);
        if ($code !== $expectedCode) {
            return ['ok' => false, 'code' => $code, 'msg' => trim($resp)];
        }
        return ['ok' => true, 'code' => $code, 'msg' => trim($resp)];
    };

    // Greeting
    $r = $send(null, 220);
    if (!$r['ok']) { fclose($socket); return ['success' => false, 'error' => 'Greeting: ' . $r['msg']]; }

    // EHLO
    $r = $send('EHLO verumpraxis.kz', 250);
    if (!$r['ok']) {
        $r = $send('HELO verumpraxis.kz', 250);
        if (!$r['ok']) { fclose($socket); return ['success' => false, 'error' => 'EHLO: ' . $r['msg']]; }
    }

    // STARTTLS if port 587
    if ($port === 587) {
        $r = $send('STARTTLS', 220);
        if (!$r['ok']) { fclose($socket); return ['success' => false, 'error' => 'STARTTLS: ' . $r['msg']]; }
        if (!stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
            fclose($socket);
            return ['success' => false, 'error' => 'TLS crypto handshake failed'];
        }
        $r = $send('EHLO verumpraxis.kz', 250);
        if (!$r['ok']) { fclose($socket); return ['success' => false, 'error' => 'EHLO after TLS: ' . $r['msg']]; }
    }

    // AUTH LOGIN
    if (!empty($user) && !empty($pass)) {
        $r = $send('AUTH LOGIN', 334);
        if (!$r['ok']) { fclose($socket); return ['success' => false, 'error' => 'AUTH LOGIN: ' . $r['msg']]; }

        $r = $send(base64_encode($user), 334);
        if (!$r['ok']) { fclose($socket); return ['success' => false, 'error' => 'Username rejected: ' . $r['msg']]; }

        $r = $send(base64_encode($pass), 235);
        if (!$r['ok']) { fclose($socket); return ['success' => false, 'error' => 'Password rejected: ' . $r['msg']]; }
    }

    // MAIL FROM
    $r = $send('MAIL FROM:<' . $from . '>', 250);
    if (!$r['ok']) { fclose($socket); return ['success' => false, 'error' => 'MAIL FROM: ' . $r['msg']]; }

    // RCPT TO
    $r = $send('RCPT TO:<' . $to . '>', 250);
    if (!$r['ok']) { fclose($socket); return ['success' => false, 'error' => 'RCPT TO: ' . $r['msg']]; }

    // DATA
    $r = $send('DATA', 354);
    if (!$r['ok']) { fclose($socket); return ['success' => false, 'error' => 'DATA: ' . $r['msg']]; }

    $boundary = 'bnd_' . md5(uniqid((string)time(), true));
    $dateHeader = date('r');
    $encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
    $encodedFromName = '=?UTF-8?B?' . base64_encode($fromName) . '?=';
    $encodedClientName = '=?UTF-8?B?' . base64_encode($clientName) . '?=';

    $headers = [
        'Date: ' . $dateHeader,
        'From: ' . $encodedFromName . ' <' . $from . '>',
        'Reply-To: ' . $encodedClientName . ' <' . $clientEmail . '>',
        'To: <' . $to . '>',
        'Subject: ' . $encodedSubject,
        'MIME-Version: 1.0',
        'Content-Type: multipart/alternative; boundary="' . $boundary . '"',
        'X-Mailer: Verumpraxis Mailer',
    ];

    $emailData = implode("\r\n", $headers) . "\r\n\r\n";

    // Text part
    $emailData .= '--' . $boundary . "\r\n";
    $emailData .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $emailData .= "Content-Transfer-Encoding: base64\r\n\r\n";
    $emailData .= chunk_split(base64_encode($textBody)) . "\r\n";

    // HTML part
    $emailData .= '--' . $boundary . "\r\n";
    $emailData .= "Content-Type: text/html; charset=UTF-8\r\n";
    $emailData .= "Content-Transfer-Encoding: base64\r\n\r\n";
    $emailData .= chunk_split(base64_encode($htmlBody)) . "\r\n";

    $emailData .= '--' . $boundary . '--' . "\r\n";
    $emailData .= '.';

    $r = $send($emailData, 250);
    $send('QUIT', 221);
    fclose($socket);

    if (!$r['ok']) {
        return ['success' => false, 'error' => 'Send data: ' . $r['msg']];
    }

    return ['success' => true];
}

// Fallback PHP Native Mail
function send_native_mail($to, $subject, $htmlBody, $textBody, $clientEmail, $clientName, $fromEmail, $fromName) {
    $boundary = 'bnd_' . md5(uniqid((string)time(), true));
    $encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
    $encodedFromName = '=?UTF-8?B?' . base64_encode($fromName) . '?=';
    $encodedClientName = '=?UTF-8?B?' . base64_encode($clientName) . '?=';

    $headers = [
        'From: ' . $encodedFromName . ' <' . $fromEmail . '>',
        'Reply-To: ' . $encodedClientName . ' <' . $clientEmail . '>',
        'MIME-Version: 1.0',
        'Content-Type: multipart/alternative; boundary="' . $boundary . '"',
        'X-Mailer: PHP/' . phpversion(),
    ];

    $body = '--' . $boundary . "\r\n"
          . "Content-Type: text/plain; charset=UTF-8\r\n"
          . "Content-Transfer-Encoding: base64\r\n\r\n"
          . chunk_split(base64_encode($textBody)) . "\r\n"
          . '--' . $boundary . "\r\n"
          . "Content-Type: text/html; charset=UTF-8\r\n"
          . "Content-Transfer-Encoding: base64\r\n\r\n"
          . chunk_split(base64_encode($htmlBody)) . "\r\n"
          . '--' . $boundary . '--';

    $headersStr = implode("\r\n", $headers);
    $additionalParams = '-f ' . escapeshellarg($fromEmail);

    $sent = @mail($to, $encodedSubject, $body, $headersStr, $additionalParams);
    if (!$sent) {
        $sent = @mail($to, $encodedSubject, $body, $headersStr);
    }

    return (bool)$sent;
}

// 5. Send Email
$mailStatus = 'NOT_ATTEMPTED';
$toEmail = isset($config['to_email']) ? $config['to_email'] : 'info@verumpraxis.kz';
$smtpConf = isset($config['smtp']) ? $config['smtp'] : [];
$useSmtp = !empty($config['use_smtp']) && !empty($smtpConf['pass']);

if ($useSmtp) {
    $errors = [];
    $targets = [
        ['host' => $smtpConf['host'], 'port' => (int)$smtpConf['port']],
        ['host' => 'smtppro.zoho.com', 'port' => 465],
        ['host' => 'smtp.zoho.com', 'port' => 465],
        ['host' => 'smtppro.zoho.com', 'port' => 587],
        ['host' => 'smtp.zoho.com', 'port' => 587],
    ];

    $smtpSuccess = false;
    $usedTarget = '';

    // Remove duplicates
    $seen = [];
    foreach ($targets as $t) {
        $key = $t['host'] . ':' . $t['port'];
        if (isset($seen[$key])) continue;
        $seen[$key] = true;

        $conf = $smtpConf;
        $conf['host'] = $t['host'];
        $conf['port'] = $t['port'];

        $res = send_smtp_mail($toEmail, $subject, $htmlBody, $textBody, $email, $name, $conf);
        if ($res['success']) {
            $smtpSuccess = true;
            $usedTarget = $key;
            break;
        } else {
            $errors[] = $key . ' => ' . $res['error'];
        }
    }

    if ($smtpSuccess) {
        $mailStatus = 'SENT_VIA_SMTP (' . $usedTarget . ')';
    } else {
        $mailStatus = 'ALL_SMTP_FAILED: [' . implode('; ', $errors) . ']';

        // Try HTTPS Web3Forms API if key provided (bypasses all blocked SMTP ports)
        if (!empty($config['web3forms_key'])) {
            $w3payload = [
                'access_key' => $config['web3forms_key'],
                'subject'    => "Новая заявка с сайта: $name — Verumpraxis",
                'from_name'  => 'Verumpraxis Website',
                'name'       => $name,
                'email'      => $email,
                'service'    => $service,
                'message'    => $message,
            ];

            $ch = curl_init('https://api.web3forms.com/submit');
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($w3payload));
            curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json', 'Accept: application/json']);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_TIMEOUT, 10);
            $w3res = curl_exec($ch);
            $w3code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            curl_close($ch);

            if ($w3code === 200) {
                $mailStatus = 'SENT_VIA_HTTPS_API (Web3Forms)';
            } else {
                $mailStatus .= ' -> WEB3FORMS_HTTP_' . $w3code;
            }
        }

        if (strpos($mailStatus, 'SENT_VIA_HTTPS_API') === false) {
            $fallbackSent = send_native_mail(
                $toEmail,
                $subject,
                $htmlBody,
                $textBody,
                $email,
                $name,
                isset($smtpConf['from']) ? $smtpConf['from'] : 'info@verumpraxis.kz',
                isset($smtpConf['from_name']) ? $smtpConf['from_name'] : 'Verumpraxis'
            );
            $mailStatus .= $fallbackSent ? ' -> FALLBACK_ATTEMPTED (FALLBACK_SUCCESS)' : ' -> FALLBACK_ATTEMPTED (FALLBACK_FAILED)';
        }
    }
} else {
    $fromEmail = !empty($smtpConf['from']) ? $smtpConf['from'] : 'info@verumpraxis.kz';
    $fromName = !empty($smtpConf['from_name']) ? $smtpConf['from_name'] : 'Verumpraxis';
    $nativeSent = send_native_mail($toEmail, $subject, $htmlBody, $textBody, $email, $name, $fromEmail, $fromName);
    $mailStatus = $nativeSent ? 'SENT_VIA_NATIVE_MAIL' : 'NATIVE_MAIL_FAILED';
    if (empty($smtpConf['pass'])) {
        $mailStatus .= ' (SMTP_PASS_EMPTY)';
    }
}

// 6. Send Telegram Notification (if configured)
$tgStatus = 'SKIPPED';
$tg = isset($config['telegram']) ? $config['telegram'] : [];
if (!empty($tg['enabled']) && !empty($tg['bot_token']) && !empty($tg['chat_id'])) {
    $tgText = "🏛 <b>Новая заявка с сайта Verumpraxis.kz</b>\n\n"
            . "👤 <b>Имя:</b> " . htmlspecialchars($name, ENT_QUOTES, 'UTF-8') . "\n"
            . "📧 <b>Email:</b> " . htmlspecialchars($email, ENT_QUOTES, 'UTF-8') . "\n"
            . "⚖️ <b>Услуга:</b> " . htmlspecialchars($service, ENT_QUOTES, 'UTF-8') . "\n\n"
            . "💬 <b>Сообщение:</b>\n" . htmlspecialchars($message, ENT_QUOTES, 'UTF-8') . "\n\n"
            . "🕒 <i>{$now}</i>";

    $ch = curl_init('https://api.telegram.org/bot' . $tg['bot_token'] . '/sendMessage');
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
        'chat_id' => $tg['chat_id'],
        'text' => $tgText,
        'parse_mode' => 'HTML',
    ]));
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    $tgResponse = curl_exec($ch);
    $tgHttpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    $tgStatus = ($tgHttpCode === 200) ? 'SENT' : ('FAILED_HTTP_' . $tgHttpCode);
}

// 7. Log submission locally
$logEntry = sprintf(
    "[%s] IP: %s | Name: %s | Email: %s | Service: %s | Mail: %s | TG: %s\n",
    $now,
    $clientIp,
    $name,
    $email,
    $service,
    $mailStatus,
    $tgStatus
);
@file_put_contents(__DIR__ . '/submissions.log', $logEntry, FILE_APPEND);

// 8. Response
echo json_encode([
    'success' => true,
    'message' => 'Заявка успешно принята'
]);