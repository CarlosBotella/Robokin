<?php
    //-------------------------------------------------------------------------------------------------------
    //     
    //-------------------------------------------------------------------------------------------------------
    session_start();

    if($_SERVER['REQUEST_METHOD'] == 'POST')
    {
        require_once("db.php");
        $idpedido = $_POST['idpedido'];
        $idmesa = $_POST['idmesa'];
        $idrobot = $_POST['idrobot'];
        $total = $_POST['total'];
        $fecha = $_POST['fecha'];

        $query = "UPDATE pedido  SET idmesa='$idmesa', idrobot='$idrobot' , total = '$total', fecha='$fecha' WHERE idpedido='$idpedido'";


        $result = $mysql->query($query);

        if($result == true)
        {
            echo json_encode("El pedido se actualizo coreectamente");
        }else
        {
            echo json_encode("Error");
        }

        $mysql->close();

    }