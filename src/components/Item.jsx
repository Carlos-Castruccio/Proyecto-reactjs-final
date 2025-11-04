import { Link } from 'react-router-dom';

const Item = ({ product }) => {
  const handleImageError = (e) => {
    
    e.target.src = '/images/placeholder.jpg';
  };

  return (
    <div className="item-card">
      <div className="item-image">
        <img 
          src={product.image} 
          alt={product.title}
          onError={handleImageError}
        />
      </div>
      <div className="item-info">
        <h3>{product.title}</h3>
        <p className="item-price">${product.price}</p>
        <p className="item-category">{product.category}</p>
        <p className="item-stock">Stock: {product.stock}</p>
        <Link to={`/item/${product.id}`} className="item-detail-link">
          Ver Detalle
        </Link>
      </div>
    </div>
  );
};

export default Item;
