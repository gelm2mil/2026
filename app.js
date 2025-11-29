/* ================================
   REPRODUCTOR GELM — 2026
================================ */

let canciones = [];
let indice = 0;

const audio = document.getElementById("audioPlayer");
const barra = document.getElementById("playerBar");
const volumen = document.getElementById("volumeRange");
const songName = document.getElementById("songName");

/* ================================
   CARGAR EL JSON
================================ */
fetch("musica.json")
  .then(r => r.json())
  .then(data => {
    canciones = data;
    if (canciones.length > 0) {
      cargarCancion(0);
    } else {
      songName.textContent = "Sin canciones";
    }
  })
  .catch(err => {
    console.error("Error al cargar JSON:", err);
    songName.textContent = "Error cargando música";
  });

/* ================================
   FUNCIONES PRINCIPALES
================================ */

function cargarCancion(i) {
  indice = i;

  const c = canciones[i];
  audio.src = c.url;

  songName.textContent = "Reproduciendo: " + c.title;
  audio.play();
}

function playPause() {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}

function nextSong() {
  indice++;
  if (indice >= canciones.length) indice = 0;
  cargarCancion(indice);
}

function prevSong() {
  indice--;
  if (indice < 0) indice = canciones.length - 1;
  cargarCancion(indice);
}

/* ================================
   BARRA DE PROGRESO
================================ */
audio.addEventListener("timeupdate", () => {
  if (!isNaN(audio.duration)) {
    barra.value = (audio.currentTime / audio.duration) * 100;
  }
});

barra.addEventListener("input", () => {
  audio.currentTime = (barra.value / 100) * audio.duration;
});

/* ================================
   VOLUMEN
================================ */
volumen.addEventListener("input", () => {
  audio.volume = volumen.value;
});

/* Reproducir siguiente si termina */
audio.addEventListener("ended", nextSong);
