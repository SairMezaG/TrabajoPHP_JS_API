<?php
include ("../Models/ProductoDAO.php");

$clase = new ProductoDAO();
$msg = $clase->agregarClases($_GET['id'], $_GET['nombre'], $_GET['descripcion']);


?>