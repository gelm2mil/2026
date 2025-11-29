let audio = new Audio();
let playlist = [];
let index = 0;

// Cargar lista desde musica.json
fetch("musica.json")
  .then(res => res.json())
  .then(data => {
    playlist = data;
    index = Math.floor(Math.random() * playlist.length);
    cargarCancion();
  });

function cargarCancion() {
  let song = playlist[index];
  audio.src = song.url;
  document.getElementById("songName").textContent =
    "Reproduciendo: " + song.title;
  audio.play();
}

// Botones
document.getElementById("playBtn").addEventListener("click", () => audio.play());
document.getElementById("pauseBtn").addEventListener("click", () => audio.pause());

document.getElementById("nextBtn").addEventListener("click", () => {
  index = (index + 1) % playlist.length;
  cargarCancion();
});

document.getElementById("prevBtn").addEventListener("click", () => {
  index = (index - 1 + playlist.length) % playlist.length;
  cargarCancion();
});

// Barra de progreso
audio.addEventListener("timeupdate", () => {
  let bar = document.getElementById("playerBar");
  bar.value = (audio.currentTime / audio.duration) * 100 || 0;
});

document.getElementById("playerBar").addEventListener("input", (e) => {
  audio.currentTime = (audio.duration * e.target.value) / 100;
});
document.getElementById("volumeRange").addEventListener("input", function () {
  audio.volume = this.value;
});
// =============================
// SPA: cargar módulos en iframe
// =============================
function cargarModulo(url) {
  const zona = document.getElementById("moduloZona");
  const frame = document.getElementById("moduleFrame");

  if (!zona || !frame) return;

  frame.src = url;
  zona.classList.add("activo");

  // Opcional: hacer scroll suave al módulo
  try {
    zona.scrollIntoView({ behavior: "smooth", block: "start" });
  } catch (e) {
    // Navegadores viejos simplemente lo ignoran
  }
}
let canciones = [];
let index = 0;
let audio = document.getElementById("audioPlayer");
let bar = document.getElementById("playerBar");
let vol = document.getElementById("volumeRange");
let songName = document.getElementById("songName");

// CARGAR LISTA musica.json
fetch("musica.json")
  .then(r => r.json())
  .then(data => {
    canciones = data;
    index = Math.floor(Math.random() * canciones.length);
    cargarCancion();
  });

// Cargar canción
function cargarCancion(){
    audio.src = canciones[index].url;
    songName.textContent = "Reproduciendo: " + canciones[index].nombre;
    audio.play();
}

// Play / Pause
function playPause(){
  if(audio.paused){ audio.play(); }
  else{ audio.pause(); }
}

// Siguiente
function nextSong(){
    index = (index + 1) % canciones.length;
    cargarCancion();
}

// Anterior
function prevSong(){
    index = (index - 1 + canciones.length) % canciones.length;
    cargarCancion();
}

// Barra de progreso
audio.addEventListener("timeupdate", ()=>{
  bar.value = (audio.currentTime / audio.duration) * 100;
});

bar.addEventListener("input", ()=>{
  audio.currentTime = (bar.value / 100) * audio.duration;
});

// Volumen
vol.addEventListener("input", ()=>{
  audio.volume = vol.value;
});



