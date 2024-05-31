<?php
include ("../Models/ProductoDAO.php");
$clase=new ProductoDAO();

if ($_REQUEST['id']=='') {
    $clase->agregarClases($_GET['id'], $_GET['nombre'], $_GET['descripcion']);
}else{
    $clase->actualizarClase($_REQUEST['id'],$_REQUEST['nombre'],$_REQUEST['descripcion']);
}

?>