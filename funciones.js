var id;
var fecha;
var bloque;
var sala;
var contenido;
var presentes = new Array();
//JQuery
$(document).ready(function(){

	/*******Funciones para clases.html********/
	$('#nueva_clase').click(function(){
		window.open('asistencia.html','_self');
	});//fin nueva_clase.click

	$('#editar_clase').click(function(){
		if(id == null){
			alert('Debe seleccionar una clase para editar.')
		}else{
			window.open('asistencia.html','_self');

			//revisar para cargar datos de clase a editar a asistencia.html
			$(document).ready(function(){
			 	$('input[name=fecha]').val(fecha);
			 	$('input[name=bloque]').val(bloque);
			 	$('input[name=sala]').val(sala);
			 	$('input[name=contenido]').val(contenido);
			});//fin document.ready anidado
		}

	});
//Graba los datos de una nueva clase en la base de datos mysql y luego muestra las clases.
	$(document).on('click','#editar', function(){
			$('#datos').hide();
			var datos = id;
			datos += '&'+ $('#datos').serialize();
			$.post('asistencia.php', datos, processData).error('ouch!!');
 	 		function processData(data){
 	 			alert('La clase se ha editado satisfactoriamente.');
 	 		};//fin processData
 	 		$('#datos').each (function(){
  				this.reset();
			});//fin datos.each
 	 		mostrar_clases(); 
	});//fin grabar.click

	$(document).on('click','#grabar', function(){
			$('#datos').hide();
			var datos = $('#datos').serialize();
			$.post('asistencia.php', datos, processData).error('ouch!!');
 	 		function processData(data){
 	 			alert('La clase se ha creado satisfactoriamente.');
 	 			mostrar_clases(); 
 	 		};//fin processData
 	 		$('#datos').each (function(){
  				this.reset();
			});//fin datos.each
	});//fin grabar.click

	$(document).on('click','#cancelar',function(){
		$('#datos').hide();
		$('#datos').each (function(){
  			this.reset();
		});//fin datos.each
	});//fin cancelar.click

	$(document).on('click','tr', function(){
		$(this).children('td').each(function(index){
			switch(index){
				case 0:
					id = $(this).text();
					break;
				case 1:
					fecha = $(this).text();
					break;
				case 2:
					bloque = $(this).text();
					break;
				case 3:
					sala = $(this).text();
					break;
				case 4:
					contenido = $(this).text();
					break;
			}
		})
	});//fin tr.click

/*******Funciones para asistencia.html********/
	$('#guardar').click(function(){
		$("input[type=checkbox]:checked").each(function(){
		//cada elemento seleccionado
			presentes[presentes.length] = $(this).val();
		});

		var datos = $('#datos_clase').serialize();
		$.post('asistencia.php', datos, processData).error('ouch!!');
 	 		function processData(data){
 	 			$.ajax({
					async: false,
					type: "POST",
					url: "asistencia.php",
					data: {
					    presentes: presentes
					},
					success: function(data) {}
				});//fin ajax
				presentes=[];
				alert('Clase creada exitosamente. Asistencia agregada.');
				window.open('clases.html','_self');
 	 		};//fin processData
	});//fin guardar.click

	$('#cancelar_clase').click(function(){
		window.open('clases.html','_self');
	});




});//fin document.ready

//Funcion que se encarga de solicitar los datos de las clases con el objeto XMLhttpRequest().
function mostrar_clases(){

	var xmlhttp = new XMLHttpRequest();
	var url = "clases.php";
	xmlhttp.onreadystatechange = function() {
	   	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	   		var myArr = JSON.parse(xmlhttp.responseText);
	   		var test= carga_tabla(myArr);
	    	}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();

}


//funcion que carga la tabla clases con un arreglo que recibe como parametro.
function carga_tabla(arr) {
		    var out = "<th>Fecha</th><th>Bloque</th><th>Sala</th><th>Contenido</th><th>Asistencia</th>";
		    var i;
		    for(i = 0; i < arr.length; i++) {
		        out += "<tr ><td>" + arr[i].id + '</td><td>' + arr[i].fecha + '</td><td>' + arr[i].bloque + '</td><td>'+ arr[i].sala + '</td><td>'+
		        arr[i].contenido + '</td><td>'+(Number(arr[i].p_asistencia)).toFixed()+'%</td></tr>';
		    }
		    document.getElementById("clases").innerHTML = out;
		}


function mostrar_alumnos(){
	var xmlhttp = new XMLHttpRequest();
	var url = "alumnos.php";
	xmlhttp.onreadystatechange = function() {
    	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	       	var myArr = JSON.parse(xmlhttp.responseText);
	   		var test= carga_tabla_alumnos(myArr);
	   	}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function carga_tabla_alumnos(arr) {
    var out = "<th>Rut</th><th>Nombres</th><th>Apellidos</th><th>e-mail</th><th>Asistencia</th>";
    var i;
    for(i = 0; i < arr.length; i++) {
        out += "<tr><td>" + arr[i].id + '</td><td>' + arr[i].rut + '</td><td>' + arr[i].nombres + '</td><td>'+ arr[i].apellidos + '</td><td>'+
        arr[i].email + "</td><td><input type='checkbox' class='check_asistencia' value='"+arr[i].id+"'/></td></tr>";
    }
    document.getElementById("alumnos").innerHTML = out;
}


function contar_asistencia(){
	var x = document.getElementsByTagName('input');
  	var cont = 0;
    for(var i=0;i<x.length;i++){
    	if(x[i].type==="checkbox"){
    		if(x[i].checked){
    			cont+=1;
    		}
    	}
    }	
  	alert("Hoy asistierón "+cont+" alumnos")
}


function eliminar_clase(){
 	if(id==null){
 		alert("Seleccione una clase para eliminar.")
 	}else{
	  	var xmlhttp = new XMLHttpRequest();
	  	xmlhttp.open("POST", "asistencia.php",true);
	  	xmlhttp.onreadystatechange=function() {
		  //la función responseText tiene todos los datos pedidos al servidor
	  	if (xmlhttp.readyState==4) {
	          	mostrar_clases();
			}
		 }
		xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		//enviando los valores a registro.php para que inserte los datos
		xmlhttp.send("id="+id);
	}
  }




