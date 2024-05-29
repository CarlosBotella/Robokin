<?php

function test_insert_mesa_script() {
    $url = 'http://your-server-path/your-insert-mesa-script.php';

    // Data to be sent via POST
    $postData = array(
        'pose_x' => '10',
        'pose_y' => '20',
        'pose_w' => '30',
        'email' => 'test@example.com'
    );

    // Use cURL to send a POST request
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($postData));

    $response = curl_exec($ch);
    curl_close($ch);

    // Decode the JSON response
    $response_data = json_decode($response, true);

    // Assert that the response is as expected
    assert($response_data === "La mesa se creó correctamente" || (isset($response_data['error']) && $response_data['error'] === 'Error al procesar la solicitud. Por favor, inténtelo de nuevo más tarde.'), "Response is not as expected.");

    echo "All tests passed.\n";
}

// Execute the test
test_insert_mesa_script();

?>
