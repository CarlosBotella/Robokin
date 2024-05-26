<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    require_once("db.php");
    
    $id_producto = $_POST['id_producto'];  
    $nombre = $_POST['nombre'];
    $pose_x = $_POST['pose_x'];
    $pose_y = $_POST['pose_y'];
    $pose_w = $_POST['pose_w'];
    $stock = $_POST['stock'];
    $precio = $_POST['precio'];
    $tipo = $_POST['tipo'];
    $descripcion = $_POST['descripcion'];

    $query = "UPDATE producto SET 
                nombre = '$nombre', 
                pose_x = '$pose_x', 
                pose_y = '$pose_y', 
                pose_w = '$pose_w', 
                stock = '$stock',  
                precio = '$precio', 
                tipo = '$tipo', 
                descripcion = '$descripcion' 
              WHERE id_producto = '$id_producto'";

    $result = $mysql->query($query);

    if ($result === true) {
        echo json_encode("El producto se actualizó correctamente");
    } else {
        echo json_encode("Error al actualizar el producto");
    }

    $mysql->close();
}
?>
