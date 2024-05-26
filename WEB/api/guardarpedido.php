<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    require_once("db.php");

    $id_mesa = $_POST['id_mesa'];
    $id_robot = $_POST['id_robot'];
    $total = $_POST['total'];
    $fecha = $_POST['fecha'];

        // Guardar el pedido principal
        $query_pedido = "INSERT INTO pedido (id_mesa, id_robot, total, fecha) VALUES ('$id_mesa', '$id_robot', '$total', '$fecha')";
        $result_pedido = $mysql->query($query_pedido);

        if ($result_pedido === true) {
            // Obtener el ID del pedido recién insertado
            $last_id = $mysql->insert_id;

            // Devolver solo el ID del último pedido insertado
            echo json_encode(array("id_pedido" => $last_id));
        } else {
            // Informar sobre el error al crear el pedido
            echo json_encode(array("message" => "Error al crear el pedido"));
        }

    $mysql->close();
}
?>