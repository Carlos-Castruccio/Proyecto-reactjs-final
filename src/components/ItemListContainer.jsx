import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemList from './ItemList';
import { fetchAllProducts, fetchProductsByCategory } from '../services/productsService';

const ItemListContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { categoryId } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let productsData;
        if (categoryId) {
          productsData = await fetchProductsByCategory(categoryId);
        } else {
          productsData = await fetchAllProducts();
        }
        
        setProducts(productsData);
      } catch (err) {
        setError('Error al cargar los productos');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  if (loading) {
    return (
      <div className="loading-container">
        <h2>Cargando productos...</h2>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="item-list-container">
      <h1>
        {categoryId 
          ? `Productos de la categoría: ${categoryId}` 
          : 'Catálogo de Productos'
        }
      </h1>
      {products.length === 0 ? (
        <p>No se encontraron productos.</p>
      ) : (
        <ItemList products={products} />
      )}
    </div>
  );
};

export default ItemListContainer;
