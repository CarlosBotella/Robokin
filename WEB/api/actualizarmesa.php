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

        $query = "UPDATE mesa  SET nombre='$nombre', pose_x='$pose_x' , pose_y = '$pose_y' WHERE nombre='$nombre'";


        $result = $mysql->query($query);

        if($result == true)
        {
            echo json_encode("La mesa se actualizo coreectamente");
        }else
        {
            echo json_encode("Error");
        }

        $mysql->close();

    }