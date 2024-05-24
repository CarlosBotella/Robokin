<?php
    //-------------------------------------------------------------------------------------------------------
    //          
    //-------------------------------------------------------------------------------------------------------
    if($_SERVER['REQUEST_METHOD'] == 'GET')
    {
        require_once("db.php");

        $idpose = $_GET['idpose'];

        $query = "SELECT * FROM pose WHERE idpose = '$idpose'";

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