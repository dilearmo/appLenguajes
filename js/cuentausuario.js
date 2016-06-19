function modificarNombre() {
	var nuevoNombre = document.getElementById('txtNombre');
	if (nuevoNombre != "") {
		// Guardar
	} else {
		alert('Debe especificar un nombre');
	}
}

function modificarApellidos() {
	var nuevosApe = document.getElementById('txtApellidos');
	if (nuevosApe != "") {
		// Guardar
	} else {
		alert('Debe especificar al menos un apellido');
	}
}

function modificarContrasena() {
	var nuevaContrasena = document.getElementById('txtContrasena');
	if (nuevaContrasena != "") {
		// Guardar
	} else {
		alert('Debe especificar una contraseña');
	}
}

function modificarDireccion() {
	var nuevaDireccion = document.getElementById('txtDireccionFisica');
	if (nuevaDireccion != "") {
		// Guardar
	} else {
		alert('Debe especificar una dirección');
	}
}

function modificarEmail() {
	var nuevoEmail = document.getElementById('txtEmail');
	if (nuevoEmail != "") {
		// Guardar
	} else {
		alert('Debe especificar un email valido');
	}
}

function cerrarSesion() {
	sessionStorage.clear();
	window.location = './index.html';
}