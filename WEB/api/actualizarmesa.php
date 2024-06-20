<?php
    //-------------------------------------------------------------------------------------------------------
    //     
    //-------------------------------------------------------------------------------------------------------
    session_start();

    if($_SERVER['REQUEST_METHOD'] == 'POST')
    {
        require_once("db.php");
        $idmesa = $_POST['idmesa'];
        $pose_x = $_POST['pose_x'];
        $pose_y = $_POST['pose_y'];
        $pose_w = $_POST['pose_w'];
        $email = $_POST['email'];

        $query = "UPDATE mesa  SET email='$email', pose_x='$pose_x' , pose_y = '$pose_y', pose_w='$pose_w' WHERE idmesa='$idmesa'";


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