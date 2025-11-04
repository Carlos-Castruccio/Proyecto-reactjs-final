import { Link } from 'react-router-dom';
import ItemCount from './ItemCount';
import { useCart } from '../context/CartContext';

const ItemDetail = ({ product, selectedQty, onQuantityChange }) => {
  const cart = useCart();

  return (
    <div className="item-detail">
      <div className="item-detail-image">
        <img 
          src={product.image} 
          alt={product.title}
          onError={(e) => {
            e.target.src = '/images/placeholder.jpg';
          }}
        />
      </div>
      <div className="item-detail-info">
        <h1>{product.title}</h1>
        <p className="item-detail-price">${product.price}</p>
        <p className="item-detail-category">Categoría: {product.category}</p>
        <p className="item-detail-stock">Stock disponible: {product.stock}</p>
        <p className="item-detail-description">{product.description}</p>
        <div className="item-detail-actions">
          {product.stock > 0 ? (
            <>
              <ItemCount stock={product.stock} initial={1} onChange={onQuantityChange} />
              <button
                className="add-to-cart-btn"
                onClick={() => cart?.addItem(product, selectedQty)}
              >
                Agregar al Carrito
              </button>
            </>
          ) : (
            <p className="no-stock">Producto sin stock</p>
          )}
          <Link to="/" className="back-link">
            Volver al catálogo
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;

