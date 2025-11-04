import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { removeItem, updateQuantity } = useCart();

  return (
    <div className="cart-item">
      <img className="cart-item-image" src={item.image} alt={item.title} />
      <div className="cart-item-info">
        <h4>{item.title}</h4>
        <div className="cart-item-controls">
          <button 
            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
            aria-label="Disminuir cantidad"
          >
            -
          </button>
          <span>{item.quantity}</span>
          <button 
            onClick={() => updateQuantity(item.id, Math.min((item.stock ?? Infinity), item.quantity + 1))}
            aria-label="Aumentar cantidad"
          >
            +
          </button>
        </div>
      </div>
      <div className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</div>
      <button 
        className="cart-item-remove" 
        onClick={() => removeItem(item.id)}
        aria-label="Eliminar producto"
      >
        ✕
      </button>
    </div>
  );
};

export default CartItem;


