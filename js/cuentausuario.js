function cargarInfoCliente() {
	$.ajax({
		url: "http://webserviceslenguajes.azurewebsites.net/ServiciosUsuario.svc/BuscarPorId?id=" + sessionStorage.getItem("idUsuario"),
		timeout: 10000,
		dataType: 'jsonp',
		success: function(usuario) { cargarEnCampos(usuario); }
	});
}

function cargarEnCampos(usuario) {
	if(usuario != null) {
		$("#txtNombre").val((usuario.nombre).split(" ")[0]);
		$("#spanNombre").text((usuario.nombre).split(" ")[0]);
		$("#txtApellidos").val(getApellidos(usuario.nombre));
		$("#spanApellidos").text(getApellidos(usuario.nombre));
		$("#txtDireccionFisica").val(usuario.direccion);
		$("#spanDirFis").text(usuario.direccion);
		$("#txtCorreo").val(usuario.Correo);
		$("#spanCorreo").text(usuario.Correo);
		$("#txtContrasena").val(usuario.contrasena);
	}

}

function getApellidos(nombre) {
	var array = nombre.split(" ");
	var apes = "";
	for (var i = 1; i <= array.length - 1; i++) {
		apes += array[i] + " ";
	}
	return apes;
} 

function modificarNombre() {
	var nuevoNombre = document.getElementById('txtNombre').value;
	if (nuevoNombre != "") {
		return 1;
	} else {
		Materialize.toast('Debe especificar un nombre', 2000);
		return 0;
	}
}

function modificarApellidos() {
	var nuevosApe = document.getElementById('txtApellidos').value;
	if (nuevosApe != "") {
		return 1;
	} else {
		Materialize.toast('Debe especificar al menos un apellido', 2000);
		return 0;
	}
}

function modificarContrasena() {
	var nuevaContrasena = document.getElementById('txtContrasena').value;
	if (nuevaContrasena != "") {
		return 1;
	} else {
		Materialize.toast('Debe especificar una contraseña', 2000);
		return 0;
	}
}

function modificarDireccion() {
	var nuevaDireccion = document.getElementById('txtDireccionFisica').value;
	if (nuevaDireccion != "") {
		return 1;
	} else {
		Materialize.toast('Debe especificar una dirección', 2000);
		return 0;
	}
}

function modificarEmail() {
	var nuevoEmail = document.getElementById('txtCorreo').value;
	if (nuevoEmail != "") {
		return 1;
	} else {
		Materialize.toast('Debe especificar un correo electrónico valido', 2000);
		return 0;
	}
}

function modificarUsuario() {
	var validacion = 0;
	validacion += modificarNombre();
	validacion += modificarEmail();
	validacion += modificarDireccion();
	validacion += modificarContrasena();
	validacion += modificarApellidos();
	if(validacion == 5) {
		$.ajax({
			url: "http://webserviceslenguajes.azurewebsites.net/ServiciosUsuario.svc/modificarCliente?id=" + sessionStorage.getItem("idUsuario")
			+"&nombre=" + $("#txtNombre").val() + " " + $("#txtApellidos").val() + "&Correo=" + $("#txtCorreo").val()
			+ "&contrasena=" + $("#txtContrasena").val() + "&direccion=" + $("#txtDireccionFisica").val(),
			timeout: 10000,
			dataType: 'jsonp',
			success: function() { Materialize.toast("Datos actualizados", 3000); }
		});
	}
}

function cerrarSesion() {
	sessionStorage.clear();
	window.location = './index.html';
}