<?php	
    //-------------------------------------------------------------------------------------------------------
    //         
    //-------------------------------------------------------------------------------------------------------
    if($_SERVER['REQUEST_METHOD'] == 'POST')
    {
        require_once("db.php");

        $idrobot = $_POST['idrobot'];
        $nombre = $_POST['nombre'];
   

        $query = "INSERT INTO ruta (idrobot, nombre) VALUES ('$idrobot', '$nombre')";

        $result = $mysql->query($query);

        if($result == true)
        {
            echo json_encode("La ruta se creo coreectamente");
        }else
        {
            echo json_encode("Error");
        }

        $mysql->close();
    }