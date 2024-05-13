<?php
    //-------------------------------------------------------------------------------------------------------
    //     
    //-------------------------------------------------------------------------------------------------------
    session_start();

    if($_SERVER['REQUEST_METHOD'] == 'POST')
    {
        require_once("db.php");
        $nombre = $_POST['nombre'];
        $pose_x = $_POST['pose_x'];
        $pose_y = $_POST['pose_y'];
        $pose_w = $_POST['pose_w'];
        $stock = $_POST['stock'];
        $precio = $_POST['precio'];

        $query = "UPDATE producto  SET nombre='$nombre', pose_x='$pose_x' , pose_y = '$pose_y', pose_w = '$pose_w', stock = '$stock', precio = '$precio' WHERE nombre='$nombre'";


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
