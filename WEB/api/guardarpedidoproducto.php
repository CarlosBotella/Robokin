<?php	
    //-------------------------------------------------------------------------------------------------------
    //         
    //-------------------------------------------------------------------------------------------------------
    if($_SERVER['REQUEST_METHOD'] == 'POST')
    {
        require_once("db.php");
        $idpedido = $_POST['idpedido'];
        $idproducto = $_POST['idproducto'];



        $query = "INSERT INTO pedidoproducto (idpedido, idproducto) VALUES ('$idpedido', '$idproducto')";

        $result = $mysql->query($query);

        if($result == true)
        {
            echo json_encode("El pedidoproducto se creo coreectamente");
        }else
        {
            echo json_encode("Error");
        }

        $mysql->close();
    }