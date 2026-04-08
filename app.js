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

// Ejercicios detallados PRO
const ejercicios = {
  "Espalda + Bíceps": [
    {
      nombre: "Dominadas",
      series: 5,
      reps: "1–3 + negativas",
      peso: "Peso corporal",
      descanso: "90 seg",
      notas: "Bajar lento 5 seg"
    },
    {
      nombre: "Remo mancuerna",
      series: 4,
      reps: "10",
      peso: "8–9 kg",
      descanso: "60 seg",
      notas: "Espalda recta"
    },
    {
      nombre: "Remo inclinado",
      series: 4,
      reps: "12",
      peso: "7–8 kg",
      descanso: "60 seg",
      notas: "Controla bajada"
    },
    {
      nombre: "Curl bíceps",
      series: 4,
      reps: "10",
      peso: "6–7 kg",
      descanso: "60 seg",
      notas: "Sin balanceo"
    },
    {
      nombre: "Curl martillo",
      series: 3,
      reps: "12",
      peso: "6–7 kg",
      descanso: "60 seg",
      notas: "Movimiento controlado"
    }
  ],

  "Pecho + Tríceps": [
    {
      nombre: "Flexiones",
      series: 4,
      reps: "Al fallo (13–15)",
      peso: "Peso corporal",
      descanso: "60 seg",
      notas: "Cuerpo recto"
    },
    {
      nombre: "Press mancuernas",
      series: 4,
      reps: "10",
      peso: "8–9 kg",
      descanso: "60 seg",
      notas: "Bajar lento"
    },
    {
      nombre: "Aperturas",
      series: 3,
      reps: "12",
      peso: "5 kg",
      descanso: "60 seg",
      notas: "No bajar demasiado"
    },
    {
      nombre: "Fondos en silla",
      series: 3,
      reps: "Al fallo",
      peso: "Peso corporal",
      descanso: "60 seg",
      notas: "Controlar bajada"
    },
    {
      nombre: "Extensión tríceps",
      series: 3,
      reps: "12",
      peso: "6–7 kg",
      descanso: "60 seg",
      notas: "Codos fijos"
    }
  ],

  "Pierna + Core": [
    {
      nombre: "Sentadillas",
      series: 4,
      reps: "12",
      peso: "9 kg",
      descanso: "60 seg",
      notas: "Rodillas alineadas"
    },
    {
      nombre: "Peso muerto",
      series: 4,
      reps: "10",
      peso: "8–9 kg",
      descanso: "90 seg",
      notas: "Espalda recta SIEMPRE"
    },
    {
      nombre: "Zancadas",
      series: 3,
      reps: "10 por pierna",
      peso: "6–8 kg",
      descanso: "60 seg",
      notas: "Paso controlado"
    },
    {
      nombre: "Pantorrillas",
      series: 4,
      reps: "15",
      peso: "Mancuernas",
      descanso: "45 seg",
      notas: "Sube lento"
    },
    {
      nombre: "Plancha",
      series: 4,
      reps: "45–60 seg",
      peso: "—",
      descanso: "45 seg",
      notas: "Aprieta abdomen"
    },
    {
      nombre: "Elevaciones piernas",
      series: 3,
      reps: "12",
      peso: "—",
      descanso: "45 seg",
      notas: "No arquear espalda"
    }
  ],

  "Espalda + Hombros": [
    {
      nombre: "Dominadas",
      series: 4,
      reps: "1–3",
      peso: "Peso corporal",
      descanso: "90 seg",
      notas: "Control total"
    },
    {
      nombre: "Remo",
      series: 3,
      reps: "12",
      peso: "7–8 kg",
      descanso: "60 seg",
      notas: "Codos atrás"
    },
    {
      nombre: "Elevaciones laterales",
      series: 4,
      reps: "12",
      peso: "4–6 kg",
      descanso: "60 seg",
      notas: "No subir demasiado"
    },
    {
      nombre: "Press hombro",
      series: 4,
      reps: "10",
      peso: "6–8 kg",
      descanso: "60 seg",
      notas: "Control total"
    },
    {
      nombre: "Pájaros",
      series: 3,
      reps: "12",
      peso: "4–6 kg",
      descanso: "60 seg",
      notas: "Espalda inclinada"
    }
  ],

  "Brazos + Pecho": [
    {
      nombre: "Curl bíceps",
      series: 4,
      reps: "12",
      peso: "6–7 kg",
      descanso: "60 seg"
    },
    {
      nombre: "Curl martillo",
      series: 3,
      reps: "12",
      peso: "6–7 kg",
      descanso: "60 seg"
    },
    {
      nombre: "Extensión tríceps",
      series: 4,
      reps: "12",
      peso: "6–7 kg",
      descanso: "60 seg"
    },
    {
      nombre: "Fondos",
      series: 3,
      reps: "Al fallo",
      peso: "Peso corporal",
      descanso: "60 seg"
    },
    {
      nombre: "Flexiones",
      series: 3,
      reps: "Al fallo",
      peso: "Peso corporal",
      descanso: "60 seg"
    }
  ],

  "Full + Cardio": [
    {
      nombre: "Flexiones",
      series: 4,
      reps: "15",
      peso: "Peso corporal",
      descanso: "45 seg"
    },
    {
      nombre: "Sentadillas",
      series: 4,
      reps: "15",
      peso: "Peso corporal",
      descanso: "45 seg"
    },
    {
      nombre: "Curl bíceps",
      series: 3,
      reps: "12",
      peso: "6–7 kg",
      descanso: "45 seg"
    },
    {
      nombre: "Plancha",
      series: 4,
      reps: "45 seg",
      peso: "—",
      descanso: "45 seg"
    },
    {
      nombre: "Cardio",
      series: 1,
      reps: "10–15 min",
      peso: "—",
      descanso: "—",
      notas: "Puede ser voleibol"
    }
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

  try {
    await addDoc(collection(db, "progreso"), {
      dominadas: Number(dominadas),
      fecha: new Date().toLocaleString()
    });
    alert("Guardado 🔥");
    cargarHistorial();
  } catch (error) {
    console.error("Error al guardar en Firebase:", error);
    alert("Error al guardar: " + error.message);
  }
};

// Cargar historial
async function cargarHistorial() {
  try {
    const querySnapshot = await getDocs(collection(db, "progreso"));

    let texto = "";

    querySnapshot.forEach(doc => {
      const data = doc.data();
      texto += `${data.fecha} - ${data.dominadas} dominadas\n`;
    });

    document.getElementById("historial").innerText = texto || "Sin registros aún.";
  } catch (error) {
    console.error("Error al cargar historial:", error);
    document.getElementById("historial").innerText = "Error al cargar: " + error.message;
  }
}

// ====== MODO COACH ======

let rutinaCoach = [
  {
    nombre: "Dominadas",
    series: 5,
    reps: "1-3",
    peso: "Peso corporal"
  },
  {
    nombre: "Remo mancuerna",
    series: 4,
    reps: "10",
    peso: "8-9 kg"
  },
  {
    nombre: "Curl bíceps",
    series: 4,
    reps: "10",
    peso: "6-7 kg"
  }
];

let ejercicioActual = 0;
let serieActual = 0;
let timerInterval;

// Mostrar ejercicio
function mostrarEjercicio() {
  const e = rutinaCoach[ejercicioActual];

  document.getElementById("ejercicioNombre").innerText = e.nombre;
  document.getElementById("ejercicioInfo").innerText =
    `Series: ${e.series} | Reps: ${e.reps}`;
  document.getElementById("pesoInfo").innerText =
    `Peso: ${e.peso}`;

  document.getElementById("contadorSeries").innerText =
    `Serie ${serieActual + 1} de ${e.series}`;
}

// Iniciar entrenamiento
window.iniciarEntrenamiento = function () {
  ejercicioActual = 0;
  serieActual = 0;
  mostrarEjercicio();
};

// Completar serie
window.completarSerie = function () {
  const e = rutinaCoach[ejercicioActual];

  serieActual++;

  if (serieActual < e.series) {
    iniciarTimer(60); // descanso
    mostrarEjercicio();
  } else {
    ejercicioActual++;
    serieActual = 0;

    if (ejercicioActual < rutinaCoach.length) {
      mostrarEjercicio();
    } else {
      document.getElementById("ejercicioNombre").innerText =
        "🔥 Entrenamiento completado";
      document.getElementById("ejercicioInfo").innerText = "";
      document.getElementById("pesoInfo").innerText = "";
      document.getElementById("contadorSeries").innerText = "";
    }
  }
};

// Timer
function iniciarTimer(segundos) {
  let tiempo = segundos;

  clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    document.getElementById("timer").innerText =
      `Descanso: ${tiempo}s`;

    tiempo--;

    if (tiempo < 0) {
      clearInterval(timerInterval);
      document.getElementById("timer").innerText = "🔥 Sigue!";
    }
  }, 1000);
}

// Inicializar
cargarHistorial();