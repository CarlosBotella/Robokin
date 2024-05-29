<?php

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    require_once("db.php");

    try {
        $query = "SELECT * FROM producto"; // Suponiendo que la tabla se llama 'producto'
        $result = $mysql->query($query);

        if (!$result) {
            throw new Exception("Error al ejecutar la consulta: " . $mysql->error);
        }

        // Procesar los resultados y devolver los datos como JSON
        $products = array();
        while ($row = mysqli_fetch_assoc($result)) {
            $products[] = $row;
        }

        // Devolver los productos en formato JSON
        echo json_encode($products);

        $result->close();
    } catch (Exception $e) {
        // Log the error for developers
        error_log('Error: ' . $e->getMessage());

        // Return a generic error message
        echo json_encode(array('error' => 'Error al procesar la solicitud. Por favor, inténtelo de nuevo más tarde.'));
    } finally {
        $mysql->close();
    }
}
?>
