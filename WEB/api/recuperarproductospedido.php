<?php
    //-------------------------------------------------------------------------------------------------------
    //          
    //-------------------------------------------------------------------------------------------------------
    if($_SERVER['REQUEST_METHOD'] == 'GET')
    {
        require_once("db.php");

        $id_pedido = $_GET['id_pedido'];

        $query = "SELECT * FROM pedidoproducto WHERE id_pedido = '$id_pedido'";

        $result = $mysql->query($query);
        
        if($result->num_rows > 0)
        {
            $array = array(); // Inicializar un array para almacenar los resultados

            // Iterar sobre cada fila de resultado y almacenarla en el array
            while($row = $result->fetch_assoc()) 
            {
                $array[] = $row;
            }

            // Codificar el array en JSON y devolverlo
            echo json_encode($array);
        }
        else
        {
            echo "No se encontraron resultados para el pedido con ID $id_pedido";
        }

        // Cerrar la conexión y liberar los recursos
        $result->close();
        $mysql->close();
    }
?>
