<?php
include ("../Models/ProductoDAO.php");
$clase=new ProductoDAO();
$clases = $clase->TraerClases();
print_r(json_encode($clases));
?>