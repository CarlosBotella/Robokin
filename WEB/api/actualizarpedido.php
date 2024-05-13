<?php
    //-------------------------------------------------------------------------------------------------------
    //     
    //-------------------------------------------------------------------------------------------------------
    session_start();

    if($_SERVER['REQUEST_METHOD'] == 'POST')
    {
        require_once("db.php");

        $id_pedido = $_POST['id_pedido'];
        $id_robot = $_POST['id_robot'];
        $id_mesa = $_POST['id_mesa'];
        $total = $_POST['total'];

        $query = "UPDATE pedido  SET id_robot='$id_robot', id_mesa='$id_mesa' , total = '$total' WHERE id_pedido='$id_pedido'";


        $result = $mysql->query($query);

        if($result == true)
        {
            echo json_encode("El pedido se actualizo coreectamente");
        }else
        {
            echo json_encode("Error");
        }

        $mysql->close();

    }