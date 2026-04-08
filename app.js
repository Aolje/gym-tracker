import { db, addDoc, collection, getDocs } from "./firebase.js";

// Fecha actual
const fecha = new Date();
document.getElementById("fecha").innerText = fecha.toLocaleDateString();

// Rutina por día
const rutinas = {
  0: "Descanso 😴",
  1: "Espalda + Bíceps",
  2: "Pecho + Tríceps",
  3: "Pierna + Core",
  4: "Espalda + Hombros",
  5: "Brazos + Pecho",
  6: "Full + Cardio"
};

const ejercicios = {
  "Espalda + Bíceps": [
    "Dominadas",
    "Remo mancuerna",
    "Curl bíceps",
    "Curl martillo"
  ],
  "Pecho + Tríceps": [
    "Flexiones",
    "Press mancuernas",
    "Fondos",
    "Extensión tríceps"
  ],
  "Pierna + Core": [
    "Sentadillas",
    "Peso muerto",
    "Zancadas",
    "Plancha"
  ],
  "Espalda + Hombros": [
    "Dominadas",
    "Remo",
    "Elevaciones laterales",
    "Press hombro"
  ],
  "Brazos + Pecho": [
    "Flexiones",
    "Curl bíceps",
    "Tríceps",
    "Fondos"
  ],
  "Full + Cardio": [
    "Flexiones",
    "Sentadillas",
    "Plancha",
    "Cardio"
  ]
};

const dia = fecha.getDay();
const rutinaHoy = rutinas[dia];

document.getElementById("rutinaHoy").innerText = rutinaHoy;

// Mostrar ejercicios
window.mostrarEjercicios = function () {
  const lista = document.getElementById("listaEjercicios");
  lista.innerHTML = "";

  if (ejercicios[rutinaHoy]) {
    ejercicios[rutinaHoy].forEach(ej => {
      const li = document.createElement("li");
      li.innerText = ej;
      lista.appendChild(li);
    });
  }

  document.getElementById("ejerciciosCard").classList.remove("hidden");
};

// Marcar entrenamiento
window.marcarCompletado = function () {
  alert("🔥 Entrenamiento completado");
};

// Guardar progreso en Firebase
window.guardarProgreso = async function () {
  const dominadas = document.getElementById("dominadas").value;

  await addDoc(collection(db, "progreso"), {
    dominadas: Number(dominadas),
    fecha: new Date().toLocaleString()
  });

  alert("Guardado 🔥");
  cargarHistorial();
};

// Cargar historial
async function cargarHistorial() {
  const querySnapshot = await getDocs(collection(db, "progreso"));

  let texto = "";

  querySnapshot.forEach(doc => {
    const data = doc.data();
    texto += `${data.fecha} - ${data.dominadas} dominadas\n`;
  });

  document.getElementById("historial").innerText = texto;
}

// Inicializar
cargarHistorial();