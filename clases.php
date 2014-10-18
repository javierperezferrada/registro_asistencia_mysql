<?php 
	error_reporting(-1);
	ini_set('display_errors', '1');

	$link = mysqli_connect('localhost', 'root', 'utn45t', 'info226')
		or die('No se pudo conectar: ' . mysqli_error($link));

	$query = 'select c.*,count(asis.clase_id)/ (select count(*) from alumno)*100 p_asistencia from clase c left join asistencia asis on c.id=asis.clase_id group by c.id ;
'
		or die('Error en la consulta: ' . mysqli_error($link));
	//echo $query;

	$result = $link->query($query);

	$num=$result->num_rows;

	$clases = array();
	while( $row=mysqli_fetch_array($result)){
		$clases[] = $row;
	}
	//echo var_dump($clases);	
	$json=json_encode($clases);

	//echo var_dump($clases);

	header('Content-Type: application/json');
	echo $json;?>