let lista = [];
let indice = 0;

const audio = document.getElementById("audioPlayer");
const barra = document.getElementById("playerBar");
const volumen = document.getElementById("volumeRange");
const songName = document.getElementById("songName");

async function cargarMusica(){
    const resp = await fetch("musica.json");
    lista = await resp.json();

    indice = Math.floor(Math.random()*lista.length);
    cargarCancion();
}

function cargarCancion(){
    audio.src = lista[indice].url;
    songName.textContent = lista[indice].title;
    audio.play();
}

function playPause(){
    if(audio.paused){ audio.play(); }
    else{ audio.pause(); }
}

function nextSong(){
    indice = (indice+1)%lista.length;
    cargarCancion();
}

function prevSong(){
    indice = (indice-1+lista.length)%lista.length;
    cargarCancion();
}

audio.ontimeupdate = () => {
    barra.value = audio.currentTime * 100 / audio.duration;
};

barra.oninput = () => {
    audio.currentTime = barra.value * audio.duration / 100;
};

volumen.oninput = () => {
    audio.volume = volumen.value;
    localStorage.setItem("volumenGelm",volumen.value);
};

window.onload = () => {
    if(localStorage.getItem("volumenGelm")){
        volumen.value = localStorage.getItem("volumenGelm");
        audio.volume = volumen.value;
    }
    if(localStorage.getItem("temaColor")){
        document.documentElement.style.setProperty("--tema", localStorage.getItem("temaColor"));
    }
    cargarMusica();
};
