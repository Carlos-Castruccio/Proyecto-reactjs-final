import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from './CartItem';

const Cart = () => {
  const { items, totalPrice, totalQuantity, clear } = useCart();

  if (!items || items.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Carrito vacío</h2>
        <p>Agrega productos desde el catálogo.</p>
        <Link to="/" className="back-link">Ir al catálogo</Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Tu Carrito</h1>
      <div className="cart-list">
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <div className="cart-summary">
        <div className="cart-summary-row">
          <span>Unidades totales</span>
          <strong>{totalQuantity}</strong>
        </div>
        <div className="cart-summary-row">
          <span>Total a pagar</span>
          <strong>${totalPrice.toFixed(2)}</strong>
        </div>
        <div className="cart-actions">
          <button className="btn-secondary" onClick={clear}>Vaciar carrito</button>
          <Link to="/checkout" className="btn-primary">Finalizar compra</Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;


