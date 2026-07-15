<?php
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo "ERROR: POST method required";
    exit;
}

$code = $_POST['code'] ?? '';
if (empty($code)) {
    echo "ERROR: No code provided";
    exit;
}

// Security: basic sanity check (optional - for demo purposes)
// In production, implement proper sandboxing

ob_start();
try {
    eval('?>' . $code);
    $output = ob_get_clean();
    echo $output ?: "(no output)";
} catch (Throwable $e) {
    ob_end_clean();
    echo "ERROR: " . $e->getMessage();
}
?>
