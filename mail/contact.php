<?php
// Configuration
$recipient_email = 'lossjayet@gmail.com';
$email_subject = 'Nouveau message depuis le formulaire de contact du portfolio';
$sender_email = 'no-reply@' . $_SERVER['HTTP_HOST']; // Utilisation d'une adresse du domaine

// Sécurité: vérifier la méthode HTTP
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Méthode non autorisée']);
    exit;
}

// Vérifier l'origine de la requête (CORS)
$allowed_origins = [
    'http://localhost',
    'http://localhost:3000',
    'https://votre-site.com', // Remplacer par votre domaine réel en production
];

$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';

if (!in_array($origin, $allowed_origins) && $origin !== '') {
    http_response_code(403);
    echo json_encode(['success' => false, 'message' => 'Origine non autorisée']);
    exit;
}

// Récupérer les données du formulaire
$nom = filter_input(INPUT_POST, 'nom', FILTER_SANITIZE_STRING);
$email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
$message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING);

// Validation des données
if (empty($nom) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Tous les champs sont requis']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Adresse email invalide']);
    exit;
}

// Protection contre les attaques CSRF
// Cette vérification simple peut être améliorée avec des tokens CSRF
if (!isset($_SERVER['HTTP_X_REQUESTED_WITH']) || strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) !== 'xmlhttprequest') {
    http_response_code(403);
    echo json_encode(['success' => false, 'message' => 'Requête interdite']);
    exit;
}

// Honeypot pour la protection anti-spam
if (!empty($_POST['website'])) {
    // C'est un spam - silencieusement retourner succès sans envoyer d'email
    echo json_encode(['success' => true, 'message' => 'Message envoyé avec succès']);
    exit;
}

// Protection contre les injections d'en-têtes
$nom = str_replace(["\r", "\n"], '', $nom);
$email = str_replace(["\r", "\n"], '', $email);

// Préparer le contenu de l'email
$email_content = "Nouveau message depuis le formulaire de contact du portfolio\n\n";
$email_content .= "Nom: $nom\n";
$email_content .= "Email: $email\n";
$email_content .= "Message:\n$message\n";

// Préparer les en-têtes de l'email
// L'expéditeur est maintenant une adresse fixe du domaine, pas l'email saisi par l'utilisateur
$headers = "From: Portfolio Contact <$sender_email>\r\n";
$headers .= "Reply-To: $email\r\n";  // Le Reply-To reste l'email de l'utilisateur pour pouvoir lui répondre
$headers .= "X-Mailer: PHP/" . phpversion();

// Envoi de l'email
$mail_sent = mail($recipient_email, $email_subject, $email_content, $headers);

// Vérifier si l'email a été envoyé avec succès
if ($mail_sent) {
    http_response_code(200);
    echo json_encode(['success' => true, 'message' => 'Message envoyé avec succès']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Une erreur est survenue lors de l\'envoi du message']);
} 