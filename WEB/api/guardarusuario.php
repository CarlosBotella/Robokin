<?php	
    //-------------------------------------------------------------------------------------------------------
    //          Email:text, contrasenya:text, nombreyapellidos:text --> guardarusuario()
    //-------------------------------------------------------------------------------------------------------
    if($_SERVER['REQUEST_METHOD'] == 'POST')
    {
        require_once("db.php");

        $email = $_POST['email'];
        $contrasenya = password_hash($_POST['contrasenya'], PASSWORD_BCRYPT);
        $nombre = $_POST['nombre'];
        $telefono = $_POST['telefono'];

        $query = "INSERT INTO usuario (email, contrasenya, nombre, telefono ) VALUES ('$email', '$contrasenya', '$nombre', '$telefono')";

        $result = $mysql->query($query);

        if($result == true)
        {
            echo json_encode("El usuario se creo coreectamente");
        }else
        {
            echo json_encode("Error");
        }

        $mysql->close();
    }