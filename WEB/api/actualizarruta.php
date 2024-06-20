<?php
    //-------------------------------------------------------------------------------------------------------
    //     
    //-------------------------------------------------------------------------------------------------------
    session_start();

    if($_SERVER['REQUEST_METHOD'] == 'POST')
    {
        require_once("db.php");

        $idrobot = $_POST['idrobot'];
        $nombre = $_POST['nombre'];
        $idruta = $_POST['idruta'];
       

        $query = "UPDATE ruta  SET idrobot='$idrobot', nombre='$nombre' WHERE idruta='$idruta'";


        $result = $mysql->query($query);

        if($result == true)
        {
            echo json_encode("La ruta se actualizo coreectamente");
        }else
        {
            echo json_encode("Error");
        }

        $mysql->close();

    }