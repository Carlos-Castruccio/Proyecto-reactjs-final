import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCLxzlCdW9vak0MW_y6F_HFKZy_2QHrUwY",
  authDomain: "reactjs-c357c.firebaseapp.com",
  projectId: "reactjs-c357c",
  storageBucket: "reactjs-c357c.firebasestorage.app",
  messagingSenderId: "139021634429",
  appId: "1:139021634429:web:ab8460a3010c11045a5a14"
};

// Inicializar Firebase
let db = null;

try {
  const app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  console.log('✅ Firebase inicializado correctamente');
} catch (error) {
  console.error('❌ Error al inicializar Firebase:', error);
}

export { db };


