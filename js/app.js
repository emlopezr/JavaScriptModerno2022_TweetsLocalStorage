// VARIABLES

const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = []; // Lista donde se guardarán los tweets del usuario

// LISTENERS

cargarListeners();
function cargarListeners() {
    // Inicio de la aplicación (Cargar LocalStorage)
    document.addEventListener('DOMContentLoaded', cargarTweets)

    // Agregar Tweet a la lista
    formulario.addEventListener('submit', agregarTweet)
}

// FUNCIONES

function cargarTweets() {
    // Buscar si hay Tweets en memoria o si no asignar un arreglo vacío
    tweets = JSON.parse(localStorage.getItem('tweets')) || [];

    // Mostrar los tweets en pantalla
    actualizarHTML();
}

function agregarTweet(e) {
    e.preventDefault(); // Prevenir acción predeterminada del botón

    // Texto del Textarea donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;

    // Validar si es un String vacío
    if (tweet === '') {
        // Tweet vacío
        mostrarError('Un Tweet no puede ir vacío');
        return;
    }

    // Objeto que identifica al Tweet de manera única
    const tweetObj = {
        id: Date.now(),
        tweet // Llave y valor se llaman igual (Lo mismo que poner tweet: tweet)
    }

    // Agregar nuevo Tweet a la lista
    tweets = [...tweets, tweetObj]

    // Actualizar el HTML de los Tweets
    actualizarHTML();

    // Reiniciar el formulario
    formulario.reset();
}

function mostrarError(error) {
    // Crear el mensaje de error
    const msgError = document.createElement('P');
    msgError.textContent = error;
    msgError.classList.add('error');

    // Insertarlo en el HTML
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(msgError);

    // Quitar mensaje de error luego de 3s
    setTimeout(() => msgError.remove(), 3000);
}

function actualizarHTML() {
    // Limpiar el HTML previo
    limpiarHTML();

    // Comprobar si hay Tweets
    if (tweets.length > 0) {
        tweets.forEach(tweet => {
            // Crear selector
            const li = document.createElement('LI');
            li.textContent = tweet.tweet;

            // Botón de eliminar
            const btnEliminar = document.createElement('A');
            btnEliminar.textContent = 'X';
            btnEliminar.classList.add('borrar-tweet');

            // Funcionalidad del botón de eliminar
            btnEliminar.onclick = () => borrarTweet(tweet.id);

            // Insertar en el HTML
            li.appendChild(btnEliminar);
            listaTweets.appendChild(li);
        });
    }

    // Guardar los tweets en LocalStorage
    sincronizarStorage();
}

function limpiarHTML() {
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}

function borrarTweet(id) {
    // ELiminar de la lista
    tweets = tweets.filter(tweet => tweet.id !== id);

    // Actualizar el HTML de los Tweets
    actualizarHTML();
}

function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}