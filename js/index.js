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
    //var   nombreArtista = txtArtista.value;

    //JQuery
    var nombreArtista = $('#artista').val();
    var direccion = 'https://api.spotify.com/v1/search?type=artist&q='+nombreArtista;
    var req = $.ajax({
        url: direccion,
        timeout: 10000,
        success: function(datos) { procesarArtistas(datos) },
        error: function(a, b, c) {error(a, b, c)}
    });
}

function procesarArtistas(datos) {
    $('#listaArtistas').empty();
    //var lista = document.getElementById("listaArtistas");
    $.each(datos.artists.items, function() {
        var nuevoLi = document.createElement('li');
        var a = document.createElement('a');
        a.innerHTML = this.name; // Se usa this porque estamos recorriendo
        a.href = 'prueba.html?id=' + this.id; // "#artista es el div vista con id artista"
        nuevoLi.appendChild(a);
        //lista.appendChild(nuevoLi);
        $('#listaArtistas').append(nuevoLi);
    });

    //ESTO SIRVE PARA DARLE EL CSS A LO QUE SE GENERA

    //$('ui-page').trigger('create');
}

function error(a, b, c) {
    alert("a: " + a.responseText + "a: " + a.status + "\n" + "b: " + b + "\n" + "c: " + c);
}