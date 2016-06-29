function validarCampos() {
	$("#txtNombre").checkValidity();
	$("#txtApellido").checkValidity();
	$("#txtContrasena").checkValidity();
	$("#txtDireccionFisica").checkValidity();
	$("#txtCorreo").checkValidity();
}

function registrar() {
	'http://pruebaservicioweb777.azurewebsites.net/ServiciosUsuario.svc/agregarUsuario?nom=Nombre&nombreUsuario=usernameee&correo=correo@hotmail.com&contrasena=1234&cedula=7777777777&rol=1&direccion=asdasdbkjabsdkabsdkbaskdbaksdbkasd&habilitado=1';
}