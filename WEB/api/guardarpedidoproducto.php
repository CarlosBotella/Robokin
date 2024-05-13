<?php	
    //-------------------------------------------------------------------------------------------------------
    //         
    //-------------------------------------------------------------------------------------------------------
    if($_SERVER['REQUEST_METHOD'] == 'POST')
    {
        require_once("db.php");

        $id_pedido = $_POST['id_pedido'];
        $id_producto = $_POST['id_producto'];

        $query = "INSERT INTO pedido_producto (id_pedido, id_producto) VALUES ('$id_pedido', '$id_producto')";

        $result = $mysql->query($query);

        if($result == true)
        {
            echo json_encode("El productopedido se creo coreectamente");
        }else
        {
            echo json_encode("Error");
        }

        $mysql->close();
    }