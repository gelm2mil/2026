// ================================
// SCRIPT CONECTADO A GOOGLE SHEETS
// AGENDA 2026 - PMT CHIMALTENANGO
// ================================

// MISMO SCRIPT QUE DENUNCIAS (YA FUNCIONAL)
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwoBuC3yyjqRSQEC5DgLTvlbt2LZizWEsyLnnnXJSx6m3-g6dKlGe9QPuc_L4ml8K1-8A/exec";

// ================================
// ENVIAR REGISTRO DE AGENDA
// ================================
function enviarAgendaAGoogle(registro) {

  const fd = new FormData();

  // CAMPOS PARA GOOGLE SHEETS
  fd.append("modulo", "AGENDA_2026");
  fd.append("fecha", registro.fecha);
  fd.append("categoria", registro.categoria);
  fd.append("apoyo", registro.apoyo || "");
  fd.append("lugar", registro.lugar || "");
  fd.append("detalle", registro.detalle);
  fd.append("hora", new Date().toLocaleTimeString("es-GT"));

  fetch(SCRIPT_URL, {
    method: "POST",
    body: fd
  })
  .then(r => r.text())
  .then(() => {
    console.log("✅ Agenda respaldada en Google Sheets");
  })
  .catch(err => {
    console.error("❌ Error respaldo Agenda:", err);
  });
}
