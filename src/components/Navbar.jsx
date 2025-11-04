import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchCategories } from '../services/productsService';
import CartWidget from './CartWidget';

const Navbar = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const load = async () => {
      const cats = await fetchCategories();
      setCategories(cats);
    };
    load();
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="brand-link">
          <h2>TechStore</h2>
        </Link>
      </div>
      
      <div className="navbar-menu">
        <Link to="/" className="nav-link">
          Inicio
        </Link>
        
        <div className="dropdown">
          <span className="dropdown-toggle">Categorías</span>
          <div className="dropdown-content">
            {categories.map((category) => (
              <Link 
                key={category} 
                to={`/category/${category}`} 
                className="dropdown-link"
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Link>
            ))}
          </div>
        </div>
        <Link to="/cart" className="nav-link">Carrito</Link>
        <CartWidget />
      </div>
    </nav>
  );
};

export default Navbar;
