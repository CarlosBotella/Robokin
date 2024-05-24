<?php
    //-------------------------------------------------------------------------------------------------------
    //     
    //-------------------------------------------------------------------------------------------------------
    session_start();

    if($_SERVER['REQUEST_METHOD'] == 'POST')
    {
        require_once("db.php");
        $idpedido = $_POST['idpedido'];
        $idproducto = $_POST['idproducto'];

        $query = "UPDATE pedidoproducto  SET idproducto='$idproducto' WHERE idpedido='$idpedido'";


        $result = $mysql->query($query);

        if($result == true)
        {
            echo json_encode("El pedidoproducto se actualizo coreectamente");
        }else
        {
            echo json_encode("Error");
        }

        $mysql->close();

    }