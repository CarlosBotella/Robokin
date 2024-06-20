<?php
    //-------------------------------------------------------------------------------------------------------
    //     
    //-------------------------------------------------------------------------------------------------------
    session_start();

    if($_SERVER['REQUEST_METHOD'] == 'POST')
    {
        require_once("db.php");
        $stock = $_POST['stock'];
        $id_producto = $_POST['id_producto'];

        $query = "UPDATE producto  SET stock = '$stock' WHERE id_producto='$id_producto'";


        $result = $mysql->query($query);

        if($result == true)
        {
            echo json_encode("El producto se actualizo coreectamente");
        }else
        {
            echo json_encode("Error");
        }

        $mysql->close();

    }
