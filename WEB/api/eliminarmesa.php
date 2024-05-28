<?php
if(isset($_GET['id_mesa'])) {
    $id_mesa = $_GET['id_mesa'];
    require_once("db.php");

    $query = "DELETE FROM mesa WHERE id_mesa = '$id_mesa'"; 
    $response = array('message' => '', 'error' => true);

    $result = $mysql->query($query);

    if ($result == true) {
        $response['error'] = false;
        $response['message'] = "Mesa eliminada correctamente";
    } else {
        $response['message'] = "Error al eliminar usuario";
    }

    $mysql->close();
} else {
    $response['message'] = "ID de mesa no proporcionado";
}
echo json_encode($response);
?>
