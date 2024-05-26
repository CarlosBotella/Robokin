<?php	
    //-------------------------------------------------------------------------------------------------------
    //         
    //-------------------------------------------------------------------------------------------------------
    if($_SERVER['REQUEST_METHOD'] == 'POST')
    {
        require_once("db.php");
        $id_pedido = $_POST['id_pedido'];
        $id_producto = $_POST['id_producto'];
        $cantidad = $_POST['cantidad'];



        $query = "INSERT INTO pedidoproducto (id_pedido, id_producto, cantidad) VALUES ('$id_pedido', '$id_producto', '$cantidad')";

        $result = $mysql->query($query);

        if($result == true)
        {
            echo json_encode("El pedidoproducto se creo coreectamente");
        }else
        {
            echo json_encode("Error");
        }

        $mysql->close();
    }