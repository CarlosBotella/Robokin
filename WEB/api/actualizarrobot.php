<?php
    //-------------------------------------------------------------------------------------------------------
    //     
    //-------------------------------------------------------------------------------------------------------
    session_start();

    if($_SERVER['REQUEST_METHOD'] == 'POST')
    {
        require_once("db.php");

        $id_robot = $_POST['id_robot'];
        $estado = $_POST['estado'];
        $pose_x = $_POST['pose_x'];
        $pose_y = $_POST['pose_y'];
        $pose_w = $_POST['pose_w'];

        $query = "UPDATE robot  SET estado='$estado', pose_x='$pose_x' , pose_y = '$pose_y', pose_w = '$pose_w' WHERE id_robot='$id_robot'";


        $result = $mysql->query($query);

        if($result == true)
        {
            echo json_encode("El robot se actualizo coreectamente");
        }else
        {
            echo json_encode("Error");
        }

        $mysql->close();

    }