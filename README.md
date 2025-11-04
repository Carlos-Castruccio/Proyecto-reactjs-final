# TechStore - Proyecto React

Aplicación e-commerce desarrollada con React que permite navegar por un catálogo de productos, ver detalles, gestionar un carrito de compras y realizar compras con registro en Firebase.

## Funcionalidades Implementadas

### ✅ Conexión a Firebase
- Conexión a Firestore para almacenar el listado de productos en la colección `items`
- Almacenamiento de órdenes de compra en la colección `orders` al confirmar una compra
- Variables de entorno configuradas mediante archivo `.env`

### ✅ Navegación y Rutas
- Navegación completa con React Router entre:
  - Catálogo principal (`/`)
  - Categorías (`/category/:categoryId`)
  - Detalle de producto (`/item/:id`)
  - Carrito (`/cart`)
  - Checkout (`/checkout`)
- Enlaces en NavBar para todas las secciones

### ✅ Componentes Contenedores y Presentación
- **ItemListContainer**: Contenedor que obtiene datos de Firebase
- **ItemList**: Componente de presentación que renderiza la lista
- **ItemDetailContainer**: Contenedor que obtiene el producto por ID
- **ItemDetail**: Componente de presentación que muestra el detalle

### ✅ ItemCount
- Selector de cantidad con validaciones:
  - Valor mínimo: 1
  - Límite máximo: stock disponible
  - Botones deshabilitados cuando se alcanzan los límites

### ✅ Carrito de Compras
- Estado global del carrito mediante Context API (`CartContext`)
- Componente `Cart` que muestra:
  - Lista de productos en el carrito
  - Cantidades por producto
  - Subtotal por producto (precio × cantidad)
  - Total de unidades
  - Total a pagar
- Funcionalidades:
  - Agregar productos
  - Actualizar cantidades
  - Eliminar productos
  - Vaciar carrito completo

### ✅ CartWidget
- Icono de carrito (🛒) visible en NavBar
- Badge con el total de unidades agregadas al carrito
- Se muestra solo cuando hay productos en el carrito

### ✅ Checkout
- Formulario de datos del comprador (nombre, email, teléfono)
- Generación de documento en Firestore con:
  - Datos del comprador
  - Lista de items comprados
  - Total de la compra
  - Timestamp de creación
- Muestra al usuario el ID de la orden generada

### ✅ Renderizado Condicional
- **Loaders**: Muestra spinner mientras carga productos
- **Mensajes de error**: Muestra errores cuando no se pueden cargar productos
- **Sin stock**: Muestra "Producto sin stock" cuando stock = 0
- **Carrito vacío**: Muestra mensaje cuando el carrito está vacío
- **Sin productos**: Muestra mensaje cuando no hay productos en el catálogo

## Estructura del Proyecto

```
src/
├── components/          # Componentes de UI
│   ├── App.jsx         # Componente principal con rutas
│   ├── Navbar.jsx      # Barra de navegación
│   ├── CartWidget.jsx  # Widget del carrito
│   ├── ItemListContainer.jsx   # Contenedor de lista
│   ├── ItemList.jsx           # Lista de productos
│   ├── Item.jsx              # Tarjeta de producto
│   ├── ItemDetailContainer.jsx  # Contenedor de detalle
│   ├── ItemDetail.jsx         # Vista de detalle
│   ├── ItemCount.jsx         # Selector de cantidad
│   ├── Cart.jsx              # Vista del carrito
│   ├── CartItem.jsx          # Item individual del carrito
│   ├── CheckoutForm.jsx      # Formulario de checkout
│   └── NotFound.jsx          # Página 404
├── context/
│   └── CartContext.jsx       # Context del carrito
├── firebase/
│   └── config.js             # Configuración de Firebase
├── services/
│   └── productsService.js    # Servicios para obtener productos
└── main.jsx                  # Punto de entrada
```

## Configuración de Firebase

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar variables de entorno
Crear archivo `.env` en la raíz del proyecto con:
```env
VITE_FIREBASE_API_KEY=tu-api-key
VITE_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu-proyecto-id
VITE_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=tu-sender-id
VITE_FIREBASE_APP_ID=tu-app-id
```

### 3. Configurar Firestore
- Crear colección `items` en Firestore con documentos que contengan:
  - `title` (string): Nombre del producto
  - `price` (number): Precio del producto
  - `description` (string): Descripción del producto
  - `category` (string): Categoría del producto (ej: "smartphones", "laptops", "tablets", "audio")
  - `image` (string): URL o ruta de la imagen
  - `stock` (number): Cantidad disponible

- Las órdenes se guardan automáticamente en la colección `orders` con:
  - `buyer`: Datos del comprador (name, email, phone)
  - `items`: Array de productos comprados
  - `total`: Total de la compra
  - `createdAt`: Timestamp de creación

## Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Genera el build de producción
- `npm run preview`: Previsualiza el build de producción
- `npm run lint`: Ejecuta el linter

## Componentes Principales

- ✅ App
- ✅ NavBar
- ✅ CartWidget
- ✅ ItemListContainer
- ✅ ItemList
- ✅ Item
- ✅ ItemDetailContainer
- ✅ ItemDetail
- ✅ ItemCount
- ✅ Cart
- ✅ CartItem
- ✅ CheckoutForm

