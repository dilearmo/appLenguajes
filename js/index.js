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

function error(a, b, c) {
    alert("a: " + a.responseText + "a: " + a.status + "\n" + "b: " + b + "\n" + "c: " + c);
}

function loguear() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    if(username != "" && password != "") {
        logueo(username, password);
    } else {
        Materialize.toast("Ingrese sus datos", 2000);
    }
}

function logueo(nombreUsuario, contrasena) {
    $.ajax({
        url: 'http://webserviceslenguajes.azurewebsites.net/ServiciosUsuario.svc/login?nombreUsuario=' + nombreUsuario + '&contrasena=' + contrasena,
        dataType: 'jsonp',
        timeout: 10000,
        success: function(datos) { ingresar(datos, nombreUsuario); },
        error: function(a, b, c) { error(a, b, c); }
    });
}

function ingresar(datos, username) {
    if(datos == true) {
        obtenerIdUsuario(username);
    } else {
        Materialize.toast('Los datos son incorrectos', 4000);
    }
}

function obtenerIdUsuario(username) {
    $.ajax({
        url: 'http://webserviceslenguajes.azurewebsites.net/ServiciosUsuario.svc/getIdByUsername?username=' + username,
        dataType: 'jsonp',
        timeout: 10000,
        success: function(id) { verificarHabilitado(id); },
        error: function(a, b, c) { error(a, b, c); }
    });
}

function verificarHabilitado(id) {
    $.ajax({
        url: 'http://webserviceslenguajes.azurewebsites.net/ServiciosUsuario.svc/estaHabilitado?id=' + id,
        dataType: 'jsonp',
        timeout: 10000,
        success: function(habilitado) { ingresarONo(habilitado, id); },
        error: function(a, b, c) { error(a, b, c); }
    });
}

function ingresarONo(habilitado, id) {
    if(habilitado == 1) {
        ingresarIdUsuarioInSession(id);
    } else {
        Materialize.toast("Su cuenta se encuentra deshabilitada.\nPor favor, contacte a la administración para más detalles.", 5000);
    }
}

function ingresarIdUsuarioInSession(id) {
    sessionStorage.setItem('idUsuario', id);
    setTimeout (pasarAPlatos(), 2000);
}

function pasarAPlatos() {
    window.location.href = "platos.html";
}