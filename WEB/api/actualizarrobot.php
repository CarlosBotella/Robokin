<?php
    //-------------------------------------------------------------------------------------------------------
    //     
    //-------------------------------------------------------------------------------------------------------
    session_start();

    if($_SERVER['REQUEST_METHOD'] == 'POST')
    {
        require_once("db.php");

        $idrobot = $_POST['idrobot'];
        $estado = $_POST['estado'];
        $pose_x = $_POST['pose_x'];
        $pose_y = $_POST['pose_y'];
        $pose_w = $_POST['pose_w'];
        $email = $_POST['email'];

        $query = "UPDATE robot  SET estado='$estado', pose_x='$pose_x' , pose_y = '$pose_y', pose_w = '$pose_w', email = '$email' WHERE idrobot='$idrobot'";


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