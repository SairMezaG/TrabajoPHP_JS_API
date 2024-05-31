<?php
include ('../Models/ProductoDAO.php');

$clase = new ProductoDAO();
$msg = $clase->eliminarClases($_GET['id']);

?>