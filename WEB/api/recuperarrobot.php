<?php
    //-------------------------------------------------------------------------------------------------------
    //          
    //-------------------------------------------------------------------------------------------------------
    if($_SERVER['REQUEST_METHOD'] == 'GET')
    {
        require_once("db.php");

        $id_robot = $_GET['id_robot'];

        $query = "SELECT * FROM robot WHERE id_robot = '$id_robot'"; //cambiar por el nombre

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