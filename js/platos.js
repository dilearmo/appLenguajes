function getListaPlatos() {
	var req = $.ajax({
		url: "http://pruebaservicioweb777.azurewebsites.net/ServicioPlatos.svc/obtenerPlatosDisponibles",
		timeout: 10000,
		dataType: 'jsonp'
	});
	req.success(function (listaPlatos) {listarPlatos(listaPlatos)});
	req.error(function(a, b, c) {alert('Me cago')});
}

function listarPlatos(listaPlatos) {
	$.each(listaPlatos, function() {
		var idPlato = this.id;
		var lista = document.getElementById('listaPlatos');
		var li = document.createElement('li');
		li.setAttribute('id', 'li' + idPlato);
		var p = document.createElement('p');

		var divHeader = document.createElement('div');
		divHeader.setAttribute('class', 'collapsible-header');

		var spanPlato = document.createElement('span');
		spanPlato.setAttribute('class', 'plato');
		spanPlato.setAttribute('id', 'plato' + idPlato);
		spanPlato.innerText = this.nombre;

		var	spanPrecio = document.createElement('span');
		spanPrecio.setAttribute('class', 'precio');
		spanPrecio.setAttribute('id', 'precio' + idPlato);
		spanPrecio.innerHTML = '<span>₡</span>'+this.precio;

		divHeader.appendChild(spanPlato);
		divHeader.appendChild(spanPrecio);

		var divContent = document.createElement('div');
		divContent.setAttribute('class', 'collapsible-body');

		var spanDesc = document.createElement('span');
		spanDesc.setAttribute('class', 'descripcion');
		spanDesc.setAttribute('id', 'desc' + idPlato);
		spanDesc.innerText = this.descripcion;

		var divImg = document.createElement('div');
		divImg.setAttribute('class', 'divImg');
		var imagen = document.createElement('img');
		imagen.setAttribute('class', 'imgPlato');
		imagen.setAttribute('class', 'materialboxed responsive-img');
		imagen.setAttribute('data-caption', this.nombre);
		imagen.setAttribute('width', '75');
		imagen.setAttribute('height', '75');
		imagen.setAttribute('id', 'img' + idPlato);
		imagen.setAttribute('alt', 'Imagen');
		imagen.setAttribute('src', 'http://icon-icons.com/icons2/281/PNG/256/Guacamole-icon_30330.png');
		divImg.appendChild(imagen);

		var inputCantidad = document.createElement('input');
		inputCantidad.setAttribute('type', 'number');
		inputCantidad.setAttribute('min', '1');
		inputCantidad.setAttribute('value', '1');
		inputCantidad.setAttribute('id', 'cantidad' + idPlato);

		var boton = document.createElement('button');
		boton.setAttribute('class', 'waves-effect waves-light btn');
		boton.setAttribute('id', 'btn' + idPlato);
		boton.setAttribute('onclick', 'guardarPlato(' + idPlato + '); Materialize.toast("Plato agregado a la orden!", 4000)');

		boton.innerText = "Agregar";

		p.appendChild(spanDesc);
		p.appendChild(divImg);
		p.appendChild(inputCantidad);
		p.appendChild(boton);
		divContent.appendChild(p);

		li.appendChild(divHeader);
		li.appendChild(divContent);
		lista.appendChild(li);
		setCollapsible();
	});
	$('#progreso').remove();
}

function setCollapsible() {
	$(document).ready(function(){
    	$('.collapsible').collapsible({
    		accordion : false 
    	});
    	$('.materialboxed').materialbox();
	});

}

function guardarPlato(idPlato) {
	var cantidad = document.getElementById('cantidad'+idPlato).value;
	var precio = document.getElementById('precio' + idPlato).innerText;
		sessionStorage.setItem('plato' + idPlato, idPlato);
		sessionStorage.setItem('cantidad' + idPlato, cantidad);
		sessionStorage.setItem('precio' + idPlato, precio);
}

function cerrarSesion() {
	sessionStorage.clear();
	window.location = './index.html';
}

function filtrar(element) {
    var value = $("#filtrador").val();
    
    $("#listaPlatos > li").each(function() {
        if ($(this).text().toLowerCase().search(value.toLowerCase()) > -1) {
            $(this).show();
        }
        else {
            $(this).hide();
        }
    });
}
