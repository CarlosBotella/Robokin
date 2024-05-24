<?php	
    //-------------------------------------------------------------------------------------------------------
    //         
    //-------------------------------------------------------------------------------------------------------
    if($_SERVER['REQUEST_METHOD'] == 'POST')
    {
        require_once("db.php");
        $pose_x = $_POST['pose_x'];
        $pose_y = $_POST['pose_y'];
        $pose_w = $_POST['pose_w'];
        $email = $_POST['email'];


        $query = "INSERT INTO mesa (pose_x, pose_y, pose_w, email) VALUES ('$pose_x', '$pose_y', '$pose_w', '$email')";

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