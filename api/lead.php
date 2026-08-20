<?php
// Rótul Web - free lead receiver for PHP hosting (e.g. Plesk).
// No external API or paid service is required.

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);

if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Invalid JSON']);
    exit;
}

// Honeypot: bots should leave this empty.
if (!empty($data['website'])) {
    echo json_encode(['ok' => true]);
    exit;
}

function clean($value, $max = 500) {
    $value = trim((string)$value);
    $value = preg_replace('/[\r\n]+/', ' ', $value);
    return mb_substr($value, 0, $max);
}

$name = clean($data['name'] ?? '', 120);
$email = filter_var(trim((string)($data['email'] ?? '')), FILTER_VALIDATE_EMAIL);
$phone = clean($data['phone'] ?? '', 50);
$business = clean($data['businessType'] ?? '', 120);
$service = clean($data['service'] ?? '', 120);
$hasWebsite = clean($data['hasWebsite'] ?? '', 20);
$goal = clean($data['goal'] ?? '', 200);
$score = (int)($data['score'] ?? 0);
$createdAt = clean($data['createdAt'] ?? date('c'), 50);

if ($name === '' || !$email || $phone === '') {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'Missing required fields']);
    exit;
}

$line = [date('c'), $name, $email, $phone, $business, $service, $hasWebsite, $goal, $score];

// Store leads outside the public web root when possible.
$storageDir = dirname(__DIR__) . DIRECTORY_SEPARATOR . 'storage';
if (!is_dir($storageDir)) {
    @mkdir($storageDir, 0750, true);
}

$csvPath = $storageDir . DIRECTORY_SEPARATOR . 'leads.csv';
$isNew = !file_exists($csvPath);
$fp = @fopen($csvPath, 'ab');
if ($fp) {
    if ($isNew) {
        fputcsv($fp, ['created_at','name','email','phone','business','service','has_website','goal','score']);
    }
    fputcsv($fp, $line);
    fclose($fp);
}

$subject = '🔥 Nuevo lead de Rótul Web';
$body = "Nuevo cliente potencial recibido desde la web.\n\n"
      . "Nombre: {$name}\n"
      . "Email: {$email}\n"
      . "Teléfono: {$phone}\n"
      . "Negocio: {$business}\n"
      . "Servicio: {$service}\n"
      . "Tiene web: {$hasWebsite}\n"
      . "Objetivo: {$goal}\n"
      . "Puntuación: {$score}/10\n"
      . "Fecha: {$createdAt}\n";

$headers = "From: Rótul Web <info@rotulweb.com>\r\n"
         . "Reply-To: {$email}\r\n"
         . "Content-Type: text/plain; charset=UTF-8\r\n";

$mailSent = @mail('info@rotulweb.com', $subject, $body, $headers);

http_response_code(200);
echo json_encode(['ok' => true, 'mailSent' => $mailSent]);
