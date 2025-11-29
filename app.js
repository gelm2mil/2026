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
const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const pauseBtn = document.getElementById("pauseBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const playerBar = document.getElementById("playerBar");
const songName = document.getElementById("songName");

// Lista de canciones
const songs = [
  "musica/nova.mp3",
  "musica/gelm2.mp3",
  "musica/rockers.mp3"
];

let index = 0;

function loadSong(i) {
  audio.src = songs[i];
  songName.textContent = "Reproduciendo: " + songs[i].split("/").pop();
  audio.load();
  audio.play();
}

// Botón play
playBtn.addEventListener("click", () => {
  audio.play();
});

// Botón pausa
pauseBtn.addEventListener("click", () => {
  audio.pause();
});

// Anterior
prevBtn.addEventListener("click", () => {
  index = (index - 1 + songs.length) % songs.length;
  loadSong(index);
});

// Siguiente
nextBtn.addEventListener("click", () => {
  index = (index + 1) % songs.length;
  loadSong(index);
});

// Barra de progreso
audio.addEventListener("timeupdate", () => {
  playerBar.value = (audio.currentTime / audio.duration) * 100;
});

playerBar.addEventListener("input", () => {
  audio.currentTime = (playerBar.value / 100) * audio.duration;
});

// Iniciar automáticamente
audio.addEventListener("loadeddata", () => {
  audio.play();
});

