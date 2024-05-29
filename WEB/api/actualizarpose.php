<?php
    //-------------------------------------------------------------------------------------------------------
    //     
    //-------------------------------------------------------------------------------------------------------
    session_start();

    if($_SERVER['REQUEST_METHOD'] == 'POST')
    {
        require_once("db.php");
        $idpose = $_POST['idpose'];
        $pose_x = $_POST['pose_x'];
        $pose_y = $_POST['pose_y'];
        $pose_w = $_POST['pose_w'];
        $idruta = $_POST['idruta'];


        $query = "UPDATE pose  SET idruta='$idruta', pose_x='$pose_x' , pose_y = '$pose_y', pose_w = '$pose_w' WHERE idpose='$idpose'";


        $result = $mysql->query($query);

        if($result == true)
        {
            echo json_encode("La pose se actualizo coreectamente");
        }else
        {
            echo json_encode("Error");
        }

        $mysql->close();

    }
