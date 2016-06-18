/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

function BuscarArtista() {
	//javascrpt
	//var txtArtista = document.getElementById("artista");
	//var	nombreArtista = txtArtista.value;

	//JQuery

	$('body').addClass('ui-loading');


	var nombreArtista = $('#artista').val();
	var req = $.ajax({
		url: 'https://api.spotify.com/v1/search?type=artist&q='+nombreArtista,
		timeout: 10000,
		success: function(datos) { procesarArtistas(datos) }
	});
}

function procesarArtistas(datos) {
	$('#listaArtistas').empty();
	//var lista = document.getElementById("listaArtistas");
	$.each(datos.artists.items, function() {
		var nuevoA = document.createElement('a');
		nuevoA.innerHTML = this.name;
		nuevoA.href = "#artista";

		var nuevoLi = document.createElement('li');
		nuevoLi.appendChild(nuevoA);

		nuevoLi.setAttribute("id", this.id);
		nuevoLi.setAttribute("onclick", "CargarInfoArtista(this.id)");
		$('#listaArtistas').append(nuevoLi);
	});

	//ESTO SIRVE PARA DARLE EL CSS A LO QUE SE GENERA***********************

	$('#listaArtistas').listview('refresh');
	//$('ui-page').trigger('create');

	$('body').removeClass('ui-loading');
}

function CargarInfoArtista(id) {
	//var id = getParameterByName('id');

	var req = $.ajax({ 
				url: 'https://api.spotify.com/v1/artists/' + id,
				timeout: 10000,
				success: function(datos) {MostrarDatosArtista(datos);}
				//error: function() {ProcesarError();}
	});

	var reqCanciones = $.ajax({
						url: 'https://api.spotify.com/v1/artists/' + id +'/top-tracks?country=US',
						timeout: 10000,
						success: function (datos2) {Populares(datos2)}
	});
}

function ProcesarError() {
	$('body').removeClass('ui-loading');
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function MostrarDatosArtista(datos) {
	$('#nombreArtista').html("" + datos.name); //Aqui se usa datos porque no es un recorrido, es un solo objeto
	$('#seguidores').html('' + datos.followers.total); // El HTML es para sobreescribir y no append
	var img = document.getElementById("imagen");
	img.src = datos.images[2].url;
}

function Populares(datos) {
	$('#cancionesMasPopulares').empty();

	var liTitulo = document.createElement("li");
	liTitulo.innerHTML = "canciones Populares";
	liTitulo.setAttribute('data-role', "list-divider");
	$('#cancionesMasPopulares').append(liTitulo);

	$.each(datos.tracks, function() {
		var nuevoLi = document.createElement('li');
		var a = document.createElement('a');
		a.innerHTML = this.name; // Se usa this porque estamos recorriendo
		a.href = this.preview_url;
		nuevoLi.appendChild(a);
		$('#cancionesMasPopulares').append(nuevoLi);
	});

	$('#cancionesMasPopulares').listview('refresh');
}