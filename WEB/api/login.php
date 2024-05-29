<?php

session_start();

$response = array('message' => '', 'error' => true);

if (isset($_SESSION['user_id'])) {
    header('Location: ../html/option.html');
    exit();
}

require_once("database.php");

try {
    if (!empty($_POST['email']) && !empty($_POST['contrasenya'])) {
        // Prepare the SQL statement
        $records = $conn->prepare('SELECT email, contrasenya FROM usuario WHERE email = :email');
        $records->bindParam(':email', $_POST['email']);
        $records->execute();
        $results = $records->fetch(PDO::FETCH_ASSOC);

        if ($results && password_verify($_POST['contrasenya'], $results['contrasenya'])) {
            // Set session variables and response
            $_SESSION['user_id'] = $results['email'];
            $response['error'] = false;
        } else {
            $response['message'] = "Uno o ambos datos no son correctos";
        }
    } else {
        $response['message'] = "Por favor, complete ambos campos";
    }
} catch (Exception $e) {
    $response['message'] = "Error al procesar la solicitud: " . $e->getMessage();
    // Log the exception message if needed
    // error_log($e->getMessage());
}

// Set the content type to application/json and return the response
header('Content-Type: application/json');
echo json_encode($response);

?>
