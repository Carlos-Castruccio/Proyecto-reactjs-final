import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProductById } from '../services/productsService';
import ItemDetail from './ItemDetail';

const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const [selectedQty, setSelectedQty] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const productData = await fetchProductById(id);
        setProduct(productData);
      } catch (err) {
        setError('Producto no encontrado');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="loading-container">
        <h2>Cargando producto...</h2>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error || 'Producto no encontrado'}</p>
        <Link to="/" className="back-link">
          Volver al catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="item-detail-container">
      <ItemDetail 
        product={product} 
        selectedQty={selectedQty}
        onQuantityChange={setSelectedQty}
      />
    </div>
  );
};

export default ItemDetailContainer;
