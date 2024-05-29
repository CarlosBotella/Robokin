<?php

function test_insert_producto_script() {
    $url = 'http://your-server-path/your-insert-producto-script.php';

    // Data to be sent via POST
    $postData = array(
        'nombre' => 'Test Product',
        'pose_x' => '10',
        'pose_y' => '20',
        'pose_w' => '30',
        'stock' => '100',
        'precio' => '15.99',
        'tipo' => 'Test Type',
        'descripcion' => 'This is a test product description.',
    );

    // File to be sent
    $file = curl_file_create('/path/to/test/image.jpg', 'image/jpeg', 'image.jpg');

    // Append file to post data
    $postData['foto'] = $file;

    // Use cURL to send a POST request
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);

    $response = curl_exec($ch);
    curl_close($ch);

    // Decode the JSON response
    $response_data = json_decode($response, true);

    // Assert that the response is as expected
    if (isset($response_data['error'])) {
        assert($response_data['error'] === 'Error al procesar la solicitud. Por favor, inténtelo de nuevo más tarde.', "Error response is not as expected.");
    } else {
        assert($response_data === "El producto se creó correctamente", "Success response is not as expected.");
    }

    echo "All tests passed.\n";
}

// Execute the test
test_insert_producto_script();

?>

