<?php	
    //-------------------------------------------------------------------------------------------------------
    //         
    //-------------------------------------------------------------------------------------------------------
    if($_SERVER['REQUEST_METHOD'] == 'POST')
    {
        require_once("db.php");

        $nombre = $_POST['nombre'];
        $pose_x = $_POST['pose_x'];
        $pose_y = $_POST['pose_y'];


        $query = "INSERT INTO mesa (nombre, pose_x, pose_y) VALUES ('$nombre', '$pose_x', '$pose_y')";

        $result = $mysql->query($query);

        if($result == true)
        {
            echo json_encode("La mesa se creo coreectamente");
        }else
        {
            echo json_encode("Error");
        }

        $mysql->close();
    }