function setCollapsible() {
	$(document).ready(function(){
    	$('.collapsible').collapsible({
    		accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    	});
	});

}

function getPlatosInSession() {
	/*var promedio = 100 / sessionStorage.length;
	var conteoTiempo = 0;*/
	for (var i = 0; i <= sessionStorage.length - 1; i++) {
		var key = sessionStorage.key(i);
		var item = sessionStorage.getItem(key);
		if(key.search('plato') > -1) {
			var plato = buscarPlatoPorId(item);
		}
		/*conteoTiempo = conteoTiempo + promedio;
		if (conteoTiempo > 97) {
			conteoTiempo = 100;
		}
		$('#progreso').css('width', conteoTiempo + '%');
		alert(conteoTiempo + "  "  + promedio);*/
	}
}

function getCantidad(id) {
	for (var i = 0; i <= sessionStorage.length - 1; i++) {
		var key = sessionStorage.key(i);
		var item = sessionStorage.getItem(key);
		if(key.search('cantidad'+id) > -1) {
			return item;
		}
	}
}

function listarPlatos(plato) {
	/*var req = $.ajax({
		url: "http://webserviceslenguajes.azurewebsites.net/ServicioPlatos.svc/getNombreImagen?id=" + plato.id,
		timeout: 10000,
		dataType: 'jsonp',
		async: false
		});
	req.success( function(imagen) {sessionStorage.setItem('img', imagen);});
	setTimeout(function() {*/
		var idPlato = plato.id;
		var lista = document.getElementById('listaPlatos');
		var li = document.createElement('li');
		li.setAttribute('id', 'li' + idPlato);
		var p = document.createElement('p');

		var divHeader = document.createElement('div');
		divHeader.setAttribute('class', 'collapsible-header');

		var spanPlato = document.createElement('span');
		spanPlato.setAttribute('class', 'plato');
		spanPlato.setAttribute('id', 'plato' + idPlato);
		spanPlato.innerText = plato.nombre;

		var	spanPrecio = document.createElement('span');
		spanPrecio.setAttribute('class', 'precio');
		spanPrecio.setAttribute('id', 'precio' + idPlato);
		spanPrecio.innerHTML = '₡' + plato.precio;

		divHeader.appendChild(spanPlato);
		divHeader.appendChild(spanPrecio);

		var divContent = document.createElement('div');
		divContent.setAttribute('class', 'collapsible-body');

		var spanDesc = document.createElement('span');
		spanDesc.setAttribute('class', 'descripcion');
		spanDesc.setAttribute('id', 'desc' + idPlato);
		spanDesc.innerText = plato.descripcion;

		var divImg = document.createElement('div');
		divImg.setAttribute('class', 'divImg');
		var imagen = document.createElement('img');
		imagen.setAttribute('class', 'imgPlato');
		imagen.setAttribute('class', 'materialboxed responsive-img');
		imagen.setAttribute('data-caption', 'Nombre del plato');
		imagen.setAttribute('width', '75');
		imagen.setAttribute('height', '75');
		imagen.setAttribute('id', 'img' + idPlato);
		imagen.setAttribute('alt', 'Imagen');
		imagen.setAttribute('src', 'http://webserviceslenguajes.azurewebsites.net/images/default.png'/*+ getImgSession()*/);
		divImg.appendChild(imagen);

		var inputCantidad = document.createElement('input');
		inputCantidad.setAttribute('value', 'Cantidad: ' + getCantidad(idPlato));
		inputCantidad.setAttribute('disabled', true);
		inputCantidad.setAttribute('id', 'cantidad' + idPlato);

		var boton = document.createElement('button');
		boton.setAttribute('id', 'btn' + idPlato);
		boton.setAttribute('class', 'waves-effect waves-light btn')
		boton.setAttribute('onclick', 'eliminarPlato(' + idPlato + ')');

		boton.innerText = "Eliminar";

		p.appendChild(spanDesc);
		p.appendChild(divImg);
		p.appendChild(inputCantidad);
		p.appendChild(boton);
		divContent.appendChild(p);

		li.appendChild(divHeader);
		li.appendChild(divContent);
		lista.appendChild(li);
		setCollapsible();
		calcularTotal(idPlato);
	/*}, 2000);*/
}

function eliminarPlato(id) {
	swal({
	  title: "¿Está seguro que desea eliminar el plato de la orden?",
	  text: "Esta acción no podrá deshacerse",
	  type: "warning",
	  showCancelButton: true,
	  confirmButtonClass: "btn-danger",
	  confirmButtonText: "Eliminar",
	  cancelButtonText: "Cancelar",
	  closeOnConfirm: false
	},
	function(){
		reducirTotal(id);
		$('#li'+id).remove();
		sessionStorage.removeItem('cantidad'+id);
		sessionStorage.removeItem('plato'+id);
		swal("¡Listo!", "El plato fue eliminado de la orden", "success");
	});
}

function cerrarSesion() {
	sessionStorage.clear();
	window.location = './index.html';
}

function buscarPlatoPorId(id) {
	var req = $.ajax({
		url: "http://webserviceslenguajes.azurewebsites.net/ServicioPlatos.svc/platoPorId?id=" + id,
		timeout: 10000,
		dataType: 'jsonp'
	});

	req.success(function (plato) {listarPlatos(plato);});
	req.error(function(a, b, c) {alert('Error interno de la base de datos\n' + a.toString())});
}

function calcularTotal(id) {
	if( $('#total').val() == '' ) {
		var t = sessionStorage.getItem('precio' + id).replace("₡", "") * sessionStorage.getItem('cantidad' + id);
		$('#total').val(t);
		document.getElementById('total').innerText = "₡" + t;
	} else {
		var total = $('#total').val();
		total = parseInt(total) + parseInt(sessionStorage.getItem('precio' + id).replace("₡", "") * sessionStorage.getItem('cantidad' + id));
		$('#total').val(total);
		document.getElementById('total').innerText = "₡" + total;
	}
}

function reducirTotal(id) {
	var total = $('#total').val();
	total = parseInt(total) - parseInt(sessionStorage.getItem('precio' + id).replace("₡", "") * sessionStorage.getItem('cantidad' + id));
	$('#total').val(total);
	document.getElementById('total').innerText = "₡" + total;
}

function quitarBarra() {
	$('#progreso').remove();
}

function realizarPedido() {
	swal({
	  title: "¿Realizar pedido?",
	  text: "Total: " + document.getElementById('total').innerText,
	  type: "warning",
	  showCancelButton: true,
	  confirmButtonClass: "btn-success",
	  confirmButtonText: "Realizar",
	  cancelButtonText: "Cancelar",
	  closeOnConfirm: false
	},
	function(){
		enviarPedido();
		swal("¡Listo!", "Su pedido ha sido enviado\n¡Pronto estará disfrutando su comida!", "success");
	});
}

function enviarPedido() {
	var reqPedido = $.ajax({
		url: "http://webserviceslenguajes.azurewebsites.net/ServiciosPedidos.svc/guardarPedido?estado=3&idCliente=" 
		+ sessionStorage.getItem("idUsuario") +"&fecha=" + obtenerFechaActual() + "&lat=" + $("#lat").val() + "&lon=" + $("#lon").val(),
		timeout: 10000,
		dataType: 'jsonp'
	});
	reqPedido.success(function(idResultado) { setTimeout(insertarDetalles(idResultado), 2000); });
	reqPedido.error(function(a, b, c) {alert('Error interno de la base de datos\n' + a.toString())});
}

function obtenerFechaActual() {
	var fecha = new Date();
	return fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate() + " " + fecha.getHours() + ":" 
	+ fecha.getMinutes() + ":" + fecha.getSeconds() + "." + fecha.getMilliseconds();
}

function ganarTiempo() {

}

function insertarDetalles(idNuevoPedido) {
	for (var i = 0; i <= sessionStorage.length - 1; i++) {
		var key = sessionStorage.key(i);
		var item = sessionStorage.getItem(key);
		if(key.search('plato') > -1) {
			var idActual = item;
			var req = $.ajax({
				url: "http://webserviceslenguajes.azurewebsites.net/ServiciosDetalles.svc/guardarDetalle?idPedido=" + idNuevoPedido 
				+ "&idPlato=" + item + "&cantidad=" + sessionStorage.getItem("cantidad" + item),
				timeout: 10000,
				dataType: 'jsonp'
			});
			//limpiarPLatoDeSession(idActual);
			req.error(function(a, b, c) {alert('Error interno de la base de datos\n' + a.toString())});
		}
	}
}

function limpiarPLatoDeSession(id) {
	sessionStorage.removeItem("plato"+id);
	sessionStorage.removeItem("cantidad"+id);
	sessionStorage.removeItem("precio"+id);
	$("#li"+id).remove();
}

function getNombreImagen(id) {
	var req = $.ajax({
		url: "http://webserviceslenguajes.azurewebsites.net/ServicioPlatos.svc/getNombreImagen?id=" + id,
		timeout: 10000,
		dataType: 'jsonp',
		async: false
		});
	alert(idPlato);
	req.success( function(imagen) { sessionStorage.setItem('img', imagen);});
}

function getImgSession() {
	var i = sessionStorage.getItem('img');
	if (i.includes('null')) {
		return '/default.png';
	} else {
		sessionStorage.setItem('img', null);
		if(i.charAt(0) == "/") {
			return i;
		} else {
			return "/" + i;
		}
	}
}

function limpiarPlatosSession() {
	var idUsuario = sessionStorage.getItem('idUsuario');
	sessionStorage.clear();
	sessionStorage.setItem('idUsuario', idUsuario);
	$("#listaPlatos").empty();
	var li = document.createElement('li');
	var div = document.createElement('div');
	div.setAttribute('class', 'collapsible-header');
	var spanPlato = document.createElement('span');
	spanPlato.setAttribute('class', 'plato');
	spanPlato.innerText = "Plato";
	var spanPrecio = document.createElement('span');
	spanPrecio.setAttribute('class', 'precio');
	spanPrecio.innerText = "Precio";
	div.appendChild(spanPlato);
	div.appendChild(spanPrecio);
	li.appendChild(div);
	$("#listaPlatos").append(li);
}