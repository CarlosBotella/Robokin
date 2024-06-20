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
        $idruta = $_POST['idruta'];


        $query = "INSERT INTO pose (pose_x, pose_y, pose_w, idruta) VALUES ('$pose_x', '$pose_y', '$pose_w', '$idruta')";

        $result = $mysql->query($query);

        if($result == true)
        {
            echo json_encode("La pose se creo coreectamente");
        }else
        {
            echo json_encode("Error");
        }

        $mysql->close();
    }