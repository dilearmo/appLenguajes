function listarPlatos() {
	var lista = document.getElementById('listaPlatos');
	var li = document.createElement('li');
	var p = document.createElement('p');

	var divHeader = document.createElement('div');
	divHeader.setAttribute('class', 'collapsible-header');
	var spanPlato = document.createElement('span');
	spanPlato.setAttribute('class', 'plato');
	spanPlato.innerText = "Plato ";
	var	spanPrecio = document.createElement('span');
	spanPrecio.setAttribute('class', 'precio');
	spanPrecio.innerText = "Precio";
	divHeader.appendChild(spanPlato);
	divHeader.appendChild(spanPrecio);

	var divContent = document.createElement('div');
	divContent.setAttribute('class', 'collapsible-body');
	var spanDesc = document.createElement('span');
	spanDesc.setAttribute('class', 'descripcion');
	spanDesc.innerText = "Descripcion completa";
	var imagen = document.createElement('img');
	imagen.setAttribute('class', 'imgPlato');
	imagen.setAttribute('alt', 'Imagen');
	var boton = document.createElement('button');
	boton.innerText = "Agregar a la orden";
	p.appendChild(spanDesc);
	p.appendChild(imagen);
	p.appendChild(boton);
	divContent.appendChild(p);

	li.appendChild(divHeader);
	li.appendChild(divContent);
	lista.appendChild(li);
	setCollapsible();
}

function setCollapsible() {
	$(document).ready(function(){
    	$('.collapsible').collapsible({
    		accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    	});
	});

}