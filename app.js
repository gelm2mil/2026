let lista = [];
let indice = 0;
let audio;
let autoPlay = true;

// Cargar JSON
fetch("musica.json")
    .then(r => r.json())
    .then(data => {
        lista = data;
        iniciarReproductor();
    });

function iniciarReproductor() {
    if (!lista.length) return;

    // ALEATORIO AL INICIAR
    indice = Math.floor(Math.random() * lista.length);

    audio = new Audio(lista[indice].url);
    actualizarTitulo();

    audio.volume = 0.70;

    // AUTOPLAY AUTOMÁTICO
    audio.play().catch(() => {});

    // Cuando termina la canción → siguiente aleatoria
    audio.onended = () => siguiente(true);

    // Volumen slider
    document.getElementById("volumen").addEventListener("input", (e) => {
        audio.volume = e.target.value;
    });

    // Botones
    document.getElementById("playPauseBtn").onclick = playPause;
    document.getElementById("prevBtn").onclick = anterior;
    document.getElementById("nextBtn").onclick = () => siguiente(true);
}

function actualizarTitulo() {
    document.getElementById("currentTitle").textContent = lista[indice].title;
}

function playPause() {
    if (audio.paused) audio.play();
    else audio.pause();
}

function anterior() {
    indice = (indice - 1 + lista.length) % lista.length;
    cambiarCancion();
}

function siguiente(aleatorio = false) {
    if (aleatorio) {
        indice = Math.floor(Math.random() * lista.length);
    } else {
        indice = (indice + 1) % lista.length;
    }
    cambiarCancion();
}

function cambiarCancion() {
    audio.pause();
    audio = new Audio(lista[indice].url);
    audio.volume = document.getElementById("volumen").value;
    actualizarTitulo();
    audio.play();
    audio.onended = () => siguiente(true);
}
