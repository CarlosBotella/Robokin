<?php	
    //-------------------------------------------------------------------------------------------------------
    //         
    //-------------------------------------------------------------------------------------------------------
    if($_SERVER['REQUEST_METHOD'] == 'POST')
    {
        require_once("db.php");
        $idmesa = $_POST['idmesa'];
        $idrobot = $_POST['idrobot'];
        $total = $_POST['total'];
        $fecha = $_POST['fecha'];


        $query = "INSERT INTO pedido (idmesa, idrobot, total, fecha) VALUES ('$idmesa', '$idrobot', '$total', '$fecha')";

        $result = $mysql->query($query);

        if($result == true)
        {
            echo json_encode("El pedido se creo coreectamente");
        }else
        {
            echo json_encode("Error");
        }

        $mysql->close();
    }