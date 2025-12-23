/* ======================================================
   APP JS — SISTEMA GELM 2026 (Versión sin reproductor)
====================================================== */

console.log("✔ APP.js cargado correctamente — GELM 2026");

/* 
   Archivo limpio.  
   Ya no existe reproductor, música, volumen, ni barras de progreso.
   Aquí puedes agregar funciones globales del sistema más adelante.
*/

// Ejemplo de función reutilizable
function notificar(msg) {
    alert("📌 GELM:\n" + msg);
}

const canvas = document.getElementById("firmaCanvas");
const ctx = canvas.getContext("2d");

let firmando = false;

function ajustarCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  ctx.strokeStyle = "#000";
}

ajustarCanvas();
window.addEventListener("resize", ajustarCanvas);

canvas.addEventListener("pointerdown", e => {
  firmando = true;
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
});

canvas.addEventListener("pointermove", e => {
  if (!firmando) return;
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
});

canvas.addEventListener("pointerup", () => firmando = false);
canvas.addEventListener("pointerleave", () => firmando = false);

function limpiarFirma() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
document.addEventListener("DOMContentLoaded", () => {

  const canvas = document.getElementById("firmaCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let firmando = false;

  function ajustarCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#000";
  }

  ajustarCanvas();
  window.addEventListener("resize", ajustarCanvas);

  canvas.addEventListener("pointerdown", e => {
    firmando = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
  });

  canvas.addEventListener("pointermove", e => {
    if (!firmando) return;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  });

  canvas.addEventListener("pointerup", () => firmando = false);
  canvas.addEventListener("pointerleave", () => firmando = false);

  window.limpiarFirma = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

});

