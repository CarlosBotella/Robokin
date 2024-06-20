<?php
if(isset($_GET['id_producto']) && isset($_GET['foto'])) {
    $id_producto = $_GET['id_producto'];
    $foto = $_GET['foto'];
    require_once("db.php");

    // Eliminar el archivo de la foto
    if (unlink($foto)) {
        // El archivo se eliminó correctamente, ahora eliminar el registro de la base de datos
        $query = "DELETE FROM producto WHERE id_producto = '$id_producto'"; 
        $response = array('message' => '', 'error' => true);

        $result = $mysql->query($query);

        if ($result == true) {
            $response['error'] = false;
            $response['message'] = "Producto eliminado correctamente";
        } else {
            $response['message'] = "Error al eliminar producto";
        }
    } else {
        $response['message'] = "Error al eliminar el archivo de la foto";
    }

    $mysql->close();
} else {
    $response['message'] = "ID de producto o ruta de foto no proporcionados";
}
echo json_encode($response);
?>
