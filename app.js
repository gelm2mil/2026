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
