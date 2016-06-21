function setCollapsible() {
	$(document).ready(function(){
    	$('.collapsible').collapsible({
    		accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    	});
	});

}

function listarPlatos() {
	for (var idPlato = 3; idPlato >= 0; idPlato--) {
		
		var lista = document.getElementById('listaPlatos');
		var li = document.createElement('li');
		li.setAttribute('id', 'li' + idPlato);
		var p = document.createElement('p');

		var divHeader = document.createElement('div');
		divHeader.setAttribute('class', 'collapsible-header');

		var spanPlato = document.createElement('span');
		spanPlato.setAttribute('class', 'plato');
		spanPlato.setAttribute('id', 'plato' + idPlato);
		spanPlato.innerText = "Plato ";

		var	spanPrecio = document.createElement('span');
		spanPrecio.setAttribute('class', 'precio');
		spanPrecio.setAttribute('id', 'precio' + idPlato);
		spanPrecio.innerText = "Precio";

		divHeader.appendChild(spanPlato);
		divHeader.appendChild(spanPrecio);

		var divContent = document.createElement('div');
		divContent.setAttribute('class', 'collapsible-body');

		var spanDesc = document.createElement('span');
		spanDesc.setAttribute('class', 'descripcion');
		spanDesc.setAttribute('id', 'desc' + idPlato);
		spanDesc.innerText = "Descripcion completa";

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
		imagen.setAttribute('src', 'http://icon-icons.com/icons2/281/PNG/256/Guacamole-icon_30330.png');
		divImg.appendChild(imagen);

		var boton = document.createElement('button');
		boton.setAttribute('id', 'btn' + idPlato);
		boton.setAttribute('class', 'waves-effect waves-light btn')
		boton.setAttribute('onclick', 'eliminarPlato(' + idPlato + ')');

		boton.innerText = "Eliminar";

		p.appendChild(spanDesc);
		p.appendChild(divImg);
		p.appendChild(boton);
		divContent.appendChild(p);

		li.appendChild(divHeader);
		li.appendChild(divContent);
		lista.appendChild(li);
		setCollapsible();

	}
}

function eliminarPlato() {

}

function cerrarSesion() {
	sessionStorage.clear();
	window.location = './index.html';
}