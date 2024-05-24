<?php	
    //-------------------------------------------------------------------------------------------------------
    //         
    //-------------------------------------------------------------------------------------------------------
    if($_SERVER['REQUEST_METHOD'] == 'POST')
    {
        require_once("db.php");

        $estado = $_POST['estado'];
        $pose_x = $_POST['pose_x'];
        $pose_y = $_POST['pose_y'];
        $pose_w = $_POST['pose_w'];
        $email = $_POST['email'];


        $query = "INSERT INTO robot (estado, pose_x, pose_y, pose_w, email) VALUES ('$estado', '$pose_x', '$pose_y', '$pose_w', '$email')";

        $result = $mysql->query($query);

        if($result == true)
        {
            echo json_encode("El robot se creo coreectamente");
        }else
        {
            echo json_encode("Error");
        }

        $mysql->close();
    }