<?php	
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../phpmailer/src/Exception.php';
require '../phpmailer/src/PHPMailer.php';
require '../phpmailer/src/SMTP.php';
//-------------------------------------------------------------------------------------------------------
//          Email:text, contrasenya:text, nombreyapellidos:text, telefono:text --> registro()
//-------------------------------------------------------------------------------------------------------
    if($_SERVER['REQUEST_METHOD'] == 'POST')
    {
        require_once("db.php");
        $email = $_POST['email'];
        $contrasenya = password_hash($_POST['contrasenya'], PASSWORD_BCRYPT);
        $telefono = $_POST['telefono'];
        $nombre =  $_POST['nombre'];

        $query = "INSERT INTO usuario (email, contrasenya, nombre, telefono) VALUES ('$email', '$contrasenya', '$nombre', '$nombre')";

        $result = $mysql->query($query);

        if($result == true)
        {
            echo json_encode("bien");

            
        }else
        {
            echo json_encode("Ocurrio un error al crear el usuario");
        }


        
        $mysql->close();
    }