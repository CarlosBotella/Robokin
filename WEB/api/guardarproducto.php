<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    require_once("db.php");

    $nombre = $_POST['nombre'];
    $pose_x = $_POST['pose_x'];
    $pose_y = $_POST['pose_y'];
    $pose_w = $_POST['pose_w'];
    $stock = $_POST['stock'];
    $precio = $_POST['precio'];
    $tipo  = $_POST['tipo'];
    $descripcion = $_POST['descripcion'];

    // Guardar la imagen en el servidor
    $target_dir = "../img/";
    $target_file = $target_dir . basename($_FILES["foto"]["name"]);
    move_uploaded_file($_FILES["foto"]["tmp_name"], $target_file);

    $query = "INSERT INTO producto (nombre, pose_x, pose_y, pose_w, stock, precio,tipo, foto, descripcion) VALUES ('$nombre', '$pose_x', '$pose_y', '$pose_w', '$stock', '$precio', '$tipo' ,'$target_file', '$descripcion')";

    $result = $mysql->query($query);

    if ($result == true) {
        echo json_encode("El producto se creó correctamente");
    } else {
        echo json_encode("Error");
    }

    $mysql->close();
}
?>
