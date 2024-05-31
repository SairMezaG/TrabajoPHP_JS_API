<?php

class Conexion {
    private $host;
    private $db;
    private $user;
    private $pwd ;
    public $conn;

	function __construct($hostaux,$useraux,$pwdaux,$dbaux){
		$this->host=$hostaux;
		$this->user=$useraux;
		$this->pwd=$pwdaux;
		$this->db=$dbaux;

	}

    public function Conectar() {
		try{
			$this->conn = new PDO("mysql:host={$this->host}; dbname={$this->db}", $this->user,$this->pwd);
			return $this->conn;

		}catch(Exception $e){
			echo "error al conectar a la base de datos ======>".$e;
		
		}
    }
	public function cerrarConexion() {
		try{
			$this->conn = null;
			echo "Conexion cerrada";
		}catch(Exception $e){
			echo "error al cerrar la conexion".$e;
		};

	}
}



?>
