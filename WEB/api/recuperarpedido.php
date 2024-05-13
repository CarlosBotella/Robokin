<?php
    //-------------------------------------------------------------------------------------------------------
    //          
    //-------------------------------------------------------------------------------------------------------
    if($_SERVER['REQUEST_METHOD'] == 'GET')
    {
        require_once("db.php");

        $id_pedido = $_GET['id_pedido'];

        $query = "SELECT * FROM pedido WHERE id_pedido = '$id_pedido'";

        $result = $mysql->query($query);
        
        if($mysql->affected_rows > 0)
        {
            while($row = $result->fetch_assoc()) 
            {
                $array = $row;
            }
            echo json_encode($array);
        }else
        {
            echo "Fallo";
        }

        $result -> close();
        $mysql -> close();
    }