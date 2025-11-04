import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer';
import NotFound from './components/NotFound';
import Cart from './components/Cart';
import CheckoutForm from './components/CheckoutForm';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            {/* Ruta principal - productos */}
            <Route path="/" element={<ItemListContainer />} />
            
            {/* Ruta para productos por categoría */}
            <Route path="/category/:categoryId" element={<ItemListContainer />} />
            
            {/* Ruta para detalle de producto */}
            <Route path="/item/:id" element={<ItemDetailContainer />} />

          {/* Carrito */}
          <Route path="/cart" element={<Cart />} />

          {/* Checkout */}
          <Route path="/checkout" element={<CheckoutForm />} />
            
            {/* Ruta 404  */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
