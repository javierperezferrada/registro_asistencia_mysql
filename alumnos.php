<?php 
	error_reporting(-1);
	ini_set('display_errors', '1');

	$link = mysqli_connect('localhost', 'root', 'utn45t', 'info226')
		or die('No se pudo conectar: ' . mysqli_error($link));

	$query = 'select * from alumno;'
		or die('Error en la consulta: ' . mysqli_error($link));
	//echo $query;

	$result = $link->query($query);

	$num=$result->num_rows;

	$alumnos = array();
	while( $row=mysqli_fetch_array($result)){
		$alumnos[] = $row;
	}
	//echo var_dump($alumnos);
	$json=json_encode($alumnos);


	//echo var_dump($clases);

	header('Content-Type: application/json');
	echo $json;?>