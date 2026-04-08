import { db, addDoc, collection, getDocs } from "./firebase.js";

// Cargar estado al iniciar
window.onload = () => {
  document.getElementById("estado").innerText =
    localStorage.getItem("estado") || "No entrenado hoy";

  document.getElementById("historial").innerText =
    localStorage.getItem("progreso") || "Sin datos aún";

  document.getElementById("notas").value =
    localStorage.getItem("notas") || "";
};

async function cargarProgreso() {
  const querySnapshot = await getDocs(collection(db, "progreso"));

  let texto = "";

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    texto += `${data.fecha} - ${data.dominadas} dominadas\n`;
  });

  document.getElementById("historial").innerText = texto;
}

// Marcar entrenamiento
function marcarEntreno() {
  const fecha = new Date().toLocaleDateString();
  const mensaje = `Entrenado el ${fecha}`;
  localStorage.setItem("estado", mensaje);
  document.getElementById("estado").innerText = mensaje;
}

// Guardar progreso
async function guardarProgreso() {
  const dominadas = document.getElementById("dominadas").value;

  try {
    await addDoc(collection(db, "progreso"), {
      dominadas: Number(dominadas),
      fecha: new Date().toISOString()
    });

    alert("Guardado en la nube 🔥");
  } catch (error) {
    console.error("Error:", error);
  }
}

// Guardar notas
function guardarNotas() {
  const notas = document.getElementById("notas").value;
  localStorage.setItem("notas", notas);
  alert("Notas guardadas");
}

window.onload = () => {
  cargarProgreso();
};