// Importaciones desde CDN (NO necesitas instalar nada)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, addDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Pega aquí TU configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyB_w_YtR5K9YNmxREqd5_aSpumss7EnGto",
    authDomain: "gym-tracker-8f485.firebaseapp.com",
    projectId: "gym-tracker-8f485",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Exportar funciones para usarlas en app.js
export { db, addDoc, collection, getDocs };