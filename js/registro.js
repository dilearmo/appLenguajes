function validarCampos() {
	$("#txtNombre").checkValidity();
	$("#txtApellido").checkValidity();
	$("#txtContrasena").checkValidity();
	$("#txtDireccionFisica").checkValidity();
	$("#txtCorreo").checkValidity();
}

function registrar() {
	var req = $.ajax({
		url: 'http://pruebaservicioweb777.azurewebsites.net/ServiciosUsuario.svc/agregarUsuario?nom=' + $("#txtNombre").val() + " " + $("#txtApellidos").val() + 
			'&nombreUsuario=' + $("#txtUsername").val() + '&correo=' + $("#txtCorreo").val() + '&contrasena=' + $("#txtContrasena").val() + 
			'&cedula=' + $("#txtCedula").val() + '&rol=2&direccion=' + $("#txtDireccionFisica").val() + '&habilitado=1',
		timeout: 10000,
		dataType: 'jsonp'
	});
	req.success(function () {
		$("#txtNombre").val("");
		$("#txtApellidos").val("");
		$("#txtUsername").val("");
		$("#txtCorreo").val("");
		$("#txtContrasena").val("");
		$("#txtCedula").val("");
		$("#txtDireccionFisica").val("");
		swal({
			title: "¡Felicidades!",
		  	text: "Registro exitso",
		  	type: "success",
		  	confirmButtonText: "Aceptar",
		  	closeOnConfirm: false
			}, function(isConfirm) {
		  	if (isConfirm) {
		    	window.location.href = "platos.html";
		  	}
		});
	});
	req.error(function(a, b, c) {alert('Me cago')});
}

function mensajeSuccess() {
	registrar();
}