<?php	
    //-------------------------------------------------------------------------------------------------------
    //         
    //-------------------------------------------------------------------------------------------------------
    if($_SERVER['REQUEST_METHOD'] == 'POST')
    {
        require_once("db.php");

        $id_robot = $_POST['id_robot'];
        $id_mesa = $_POST['id_mesa'];
        $total = $_POST['total'];


        $query = "INSERT INTO pedido (id_robot, id_mesa, total) VALUES ('$id_robot', '$id_mesa', '$total')";

        $result = $mysql->query($query);

        if($result == true)
        {
            echo json_encode("El pedido se creo coreectamente");
        }else
        {
            echo json_encode("Error");
        }

        $mysql->close();
    }