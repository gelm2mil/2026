let lista = [];
let indexActual = 0;
let audio = new Audio();

async function cargarMusica() {
    const res = await fetch("musica.json");
    lista = await res.json();

    // Buscar "the good life"
    const inicio = lista.findIndex(t => t.title.toLowerCase().includes("the good life"));
    indexActual = inicio >= 0 ? inicio : 0;

    cargarCancion();
}

function cargarCancion() {
    const tema = lista[indexActual];
    audio.src = tema.url;
    document.getElementById("currentTitle").textContent = tema.title;
    audio.play();
}

document.getElementById("playPauseBtn").onclick = () => {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
};

document.getElementById("nextBtn").onclick = () => {
    indexActual = (indexActual + 1) % lista.length;
    cargarCancion();
};

document.getElementById("prevBtn").onclick = () => {
    indexActual = (indexActual - 1 + lista.length) % lista.length;
    cargarCancion();
};

audio.onended = () => {
    indexActual = (indexActual + 1) % lista.length;
    cargarCancion();
};

cargarMusica();
