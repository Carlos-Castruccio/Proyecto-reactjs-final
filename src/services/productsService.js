import { db } from '../firebase/config';
import { collection, getDocs, getDoc, doc, query, where } from 'firebase/firestore';

// Función auxiliar para verificar Firebase
function checkFirebase() {
  if (!db) {
    throw new Error('Firebase no está inicializado. Verifica la configuración de Firebase.');
  }
}

export async function fetchAllProducts() {
  checkFirebase();
  try {
    console.log('🔥 Obteniendo productos de Firestore...');
    const snap = await getDocs(collection(db, 'items'));
    const products = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    console.log(`✅ Productos obtenidos: ${products.length} productos`);
    return products;
  } catch (error) {
    console.error('❌ Error al obtener productos de Firestore:', error);
    throw new Error(`Error al obtener productos: ${error.message}`);
  }
}

export async function fetchProductsByCategory(category) {
  checkFirebase();
  try {
    console.log(`🔥 Buscando productos de la categoría "${category}" en Firestore...`);
    const q = query(collection(db, 'items'), where('category', '==', category));
    const snap = await getDocs(q);
    const products = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    console.log(`✅ Productos obtenidos: ${products.length} productos`);
    return products;
  } catch (error) {
    console.error('❌ Error al obtener productos de Firestore:', error);
    throw new Error(`Error al obtener productos por categoría: ${error.message}`);
  }
}

export async function fetchProductById(id) {
  checkFirebase();
  try {
    console.log(`🔥 Buscando producto con ID: ${id}`);
    const ref = doc(db, 'items', String(id));
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      throw new Error(`Producto con ID "${id}" no encontrado en Firestore`);
    }
    const product = { id: snap.id, ...snap.data() };
    console.log(`✅ Producto encontrado: ${product.title || id}`);
    return product;
  } catch (error) {
    console.error('❌ Error al obtener producto de Firestore:', error);
    throw new Error(`Error al obtener producto: ${error.message}`);
  }
}

export async function fetchCategories() {
  checkFirebase();
  try {
    console.log('🔥 Obteniendo categorías de Firestore...');
    const snap = await getDocs(collection(db, 'items'));
    const categories = [...new Set(snap.docs.map((d) => d.data().category).filter(Boolean))];
    console.log(`✅ Categorías obtenidas: ${categories.length} categorías`);
    return categories;
  } catch (error) {
    console.error('❌ Error al obtener categorías de Firestore:', error);
    throw new Error(`Error al obtener categorías: ${error.message}`);
  }
}


