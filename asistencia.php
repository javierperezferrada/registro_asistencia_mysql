<?php
  error_reporting(-1);
  ini_set('display_errors', '1');
//Configuracion de la conexion a base de datos
  $bd_host = "localhost"; 
  $bd_usuario = "root"; 
  $bd_password = "utn45t"; 
  $bd_base = "info226"; 
 
$con = mysql_connect($bd_host, $bd_usuario, $bd_password); 
mysql_select_db($bd_base, $con); 
 
//variables POST
  $accion=$_POST['accion'];
  $id=$_POST['id'];
  $fecha=$_POST['fecha'];
  $bloque=$_POST['bloque'];
  $sala=$_POST['sala'];
  $contenido=$_POST['contenido'];
  $presentes=$_POST['presentes'];

  if($accion==null){
    $accion=$presentes[1];
  }

  
  switch($accion){
    case 1: //borra un la asitencia y la clase.
      $sql="DELETE FROM asistencia where clase_id ='$id'";
      mysql_query($sql,$con) or die('Error. '.mysql_error());
      $sql="DELETE FROM clase where id ='$id'";
      mysql_query($sql,$con) or die('Error. '.mysql_error());
      break;

    case 2: //crea una nueva clase sin asistencia.
      $sql="INSERT INTO clase (fecha, bloque, sala, contenido)  VALUES ('$fecha', '$bloque', '$sala', '$contenido')";
      mysql_query($sql,$con) or die('Error. '.mysql_error());
      break;

    case 3://editar clase
      $sql="INSERT INTO clase (id, fecha, bloque, sala, contenido) VALUES ('$id', '$fecha', '$bloque', '$sala', '$contenido')";
      mysql_query($sql,$con) or die('Error. '.mysql_error());
      break;

    case 4://agrega asistencia a la ultima clase creada.
      $link = mysqli_connect($bd_host, $bd_usuario, $bd_password, $bd_base)
      or die('No se pudo conectar: ' . mysqli_error($link));
      $query = 'select max(id) from clase;'
        or die('Error en la consulta: ' . mysqli_error($link));
      $result = $link->query($query);
      $id_clase = mysqli_fetch_array($result);
      $id_c = $id_clase[0];
      foreach ($presentes as $key => $value) {
        if($key<2){
          null;
        }else{
          if($value!='on'){
            $sql="INSERT INTO asistencia  VALUES ('$value','$id_c')";
            mysql_query($sql,$con) or die('Error. '.mysql_error());
          }
        }
      }
      break;

    case 5://agrega asistencia a clase id .
      $id_c = $presentes[0];
      foreach ($presentes as $key => $value) {
        if($key<2){
          null;
        }else{
          if($value!='on'){
            $sql="INSERT INTO asistencia  VALUES ('$value','$id_c')";
            mysql_query($sql,$con) or die('Error. '.mysql_error());
          }
        }
      }
      break;
  }


 
?>