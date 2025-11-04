import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartWidget = () => {
  const cart = useCart();

  return (
    <Link to="/cart" className="cart-widget" aria-label="Carrito">
      <span className="cart-icon">🛒</span>
      {cart?.totalQuantity > 0 && (
        <span className="cart-badge">{cart.totalQuantity}</span>
      )}
    </Link>
  );
};

export default CartWidget;








