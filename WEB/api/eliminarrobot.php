<?php
if(isset($_GET['id_robot'])) {
    $id_robot = $_GET['id_robot'];
    require_once("db.php");

    $query = "DELETE FROM robot WHERE id_robot = '$id_robot'"; 
    $response = array('message' => '', 'error' => true);

    $result = $mysql->query($query);

    if ($result == true) {
        $response['error'] = false;
        $response['message'] = "Robot eliminada correctamente";
    } else {
        $response['message'] = "Error al eliminar usuario";
    }

    $mysql->close();
} else {
    $response['message'] = "ID de robot no proporcionado";
}
echo json_encode($response);
?>
