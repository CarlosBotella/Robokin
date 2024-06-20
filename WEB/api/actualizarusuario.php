<?php
    //-------------------------------------------------------------------------------------------------------
    //          email:text --> actualizarusuario()
    //-------------------------------------------------------------------------------------------------------
    session_start();

    if($_SERVER['REQUEST_METHOD'] == 'POST')
    {
        require_once("db.php");
        $email = $_POST["email"];
        $nombre = $_POST["nombre"];
        $telefono = $_POST["telefono"];

        $query = "UPDATE usuario  SET nombre='$nombre', telefono='$telefono' WHERE email='$email'";


        $result = $mysql->query($query);

        if($result == true)
        {
            if(isset($_SESSION['user_id']))
            {
                $_SESSION['user_id'] = $email;
            }
            echo json_encode("El usuario se actualizo coreectamente");
        }else
        {
            echo json_encode("Error");
        }

        $mysql->close();

    }

    