<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Only process POST requests
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get JSON data (for fetch API)
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);
    
    // Alternatively get form data
    $name = isset($data['name']) ? strip_tags(trim($data['name'])) : strip_tags(trim($_POST["name"]));
    $email = isset($data['email']) ? filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL) : filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $subject = isset($data['subject']) ? strip_tags(trim($data['subject'])) : strip_tags(trim($_POST["subject"]));
    $message = isset($data['message']) ? trim($data['message']) : trim($_POST["message"]);
    
    // Validate
    $errors = [];
    if (empty($name)) $errors[] = "Name is required";
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = "Valid email is required";
    if (empty($message)) $errors[] = "Message is required";
    
    if (!empty($errors)) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => implode(", ", $errors)]);
        exit;
    }
    
    // Set recipient
    $to = "abivarthan444@gmail.com";
    
    // Email headers
    $headers = "From: $name <$email>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
    // Email subject
    $email_subject = "New Contact: $subject";
    
    // Email content
    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Message:\n$message\n";
    
    // Send email
    if (mail($to, $email_subject, $email_content, $headers)) {
        http_response_code(200);
        echo json_encode(["success" => true, "message" => "Thank you! Your message has been sent."]);
    } else {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Mail function failed. Please try emailing directly."]);
    }
} else {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Method not allowed"]);
}
?>