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
  $id=$_POST['id'];
  $fecha=$_POST['fecha'];
  $bloque=$_POST['bloque'];
  $sala=$_POST['sala'];
  $contenido=$_POST['contenido'];
  $presentes=$_POST['presentes'];


  if($presentes!=null){
    $link = mysqli_connect($bd_host, $bd_usuario, $bd_password, $bd_base)
    or die('No se pudo conectar: ' . mysqli_error($link));
    $query = 'select max(id) from clase;'
      or die('Error en la consulta: ' . mysqli_error($link));
    $result = $link->query($query);
    $id_clase = mysqli_fetch_array($result);
    if($id_clase!=null){
      foreach ($presentes as $key => $value) {
        if($value!='on'){
          $sql="INSERT INTO asistencia  VALUES ('$value','$id_clase[0]')";
          mysql_query($sql,$con) or die('Error. '.mysql_error());
        }
      }
    }
    
  }

 
//registra los datos de la clase
  if($id==null && $presentes==null){
    $sql="INSERT INTO clase (fecha, bloque, sala, contenido)  VALUES ('$fecha', '$bloque', '$sala', '$contenido')";
    mysql_query($sql,$con) or die('Error. '.mysql_error());
    
  }else{
    if($fecha==null && $presentes==null){
      $sql="DELETE FROM asistencia where clase_id ='$id'";
      mysql_query($sql,$con) or die('Error. '.mysql_error());
	     $sql="DELETE FROM clase where id ='$id'";
	     mysql_query($sql,$con) or die('Error. '.mysql_error());
    }else{
      $sql="UPDATE clase SET fecha='$fecha', bloque='$bloque', sala='$sala', contenido='$contenido' where id ='$id'";
      mysql_query($sql,$con) or die('Error. '.mysql_error());
    }
  }


 
?>