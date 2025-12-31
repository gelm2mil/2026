// ================================
// AGENDA 2026 - PMT CHIMALTENANGO
// SCRIPT CONECTADO A GOOGLE SHEETS
// ================================

const AGEN_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzyfSHwK9C72Ac3M_L2e06KKNMp_SVQcSIyvBY9_wMRlcHL-bCM6P3TR7qZJOT8Y87q/exec";

// ================================
// ENVIAR ACTIVIDAD A GOOGLE SHEETS
// ================================
async function enviarAgendaGoogle(registro) {
  const fd = new FormData();

  fd.append("fecha", registro.fecha);
  fd.append("hora", registro.hora);
  fd.append("categoria", registro.categoria);
  fd.append("apoyo", registro.apoyo || "");
  fd.append("lugar", registro.lugar || "");
  fd.append("detalle", registro.detalle);

  try {
    await fetch(AGEN_SCRIPT_URL, {
      method: "POST",
      body: fd
    });
  } catch (err) {
    console.warn("No se pudo enviar a Google Sheets:", err);
  }
}

// ================================
// RESPALDO AUTOMÁTICO NOCTURNO
// (23:00 a 23:59 - 1 vez por día)
// ================================
(function respaldoNocturno() {
  const ahora = new Date();
  const hora = ahora.getHours();
  const marca = ahora.toDateString();

  if (hora >= 23 && localStorage.getItem("backup_agenda_" + marca) !== "ok") {
    const data = JSON.parse(localStorage.getItem("agenda_2026_gelm") || "[]");

    data.forEach(r => enviarAgendaGoogle(r));

    localStorage.setItem("backup_agenda_" + marca, "ok");
    console.log("✔ Respaldo nocturno Agenda enviado");
  }
})();
