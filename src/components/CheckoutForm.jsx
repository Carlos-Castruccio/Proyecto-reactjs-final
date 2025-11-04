import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { db } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

async function createOrderInFirestore(order) {
  try {
    if (!db) {
      console.warn('Firebase no está disponible. Se generará un ID local.');
      return { id: null };
    }
    
    const ordersRef = collection(db, 'orders');
    const docRef = await addDoc(ordersRef, { ...order, createdAt: serverTimestamp() });
    console.log('✅ Orden creada en Firestore con ID:', docRef.id);
    return { id: docRef.id };
  } catch (error) {
    console.error('❌ Error al crear orden en Firestore:', error);
    return { id: null };
  }
}

const CheckoutForm = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clear } = useCart();
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [orderId, setOrderId] = useState(null);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const order = {
        buyer: form,
        items: items.map(({ id, title, price, quantity }) => ({ id, title, price, quantity })),
        total: totalPrice,
      };

      const res = await createOrderInFirestore(order);
      const generatedId = res.id || crypto.randomUUID();
      setOrderId(generatedId);
      clear();
    } catch (err) {
      setError('No se pudo generar la orden. Intenta nuevamente.');
    } finally {
      setSubmitting(false);
    }
  };

  if (orderId) {
    return (
      <div className="checkout-success">
        <h2>¡Gracias por tu compra!</h2>
        <p>Tu id de orden es: <strong>{orderId}</strong></p>
        <button className="btn-primary" onClick={() => navigate('/')}>Volver al inicio</button>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Carrito vacío</h2>
        <p>Agrega productos desde el catálogo.</p>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      <div className="checkout-content">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h2>Datos del Comprador</h2>
          <label>
            Nombre
            <input name="name" value={form.name} onChange={handleChange} required />
          </label>
          <label>
            Email
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
          </label>
          <label>
            Teléfono
            <input name="phone" value={form.phone} onChange={handleChange} required />
          </label>
          {error && <p className="error-text">{error}</p>}
          <button className="btn-primary" type="submit" disabled={submitting}>
            {submitting ? 'Procesando...' : 'Confirmar compra'}
          </button>
        </form>
        <div className="checkout-summary">
          <h3>Resumen de Compra</h3>
          <div className="checkout-items">
            {items.map((item) => (
              <div key={item.id} className="checkout-item">
                <span className="checkout-item-name">{item.title}</span>
                <span className="checkout-item-quantity">x{item.quantity}</span>
                <span className="checkout-item-price">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="checkout-total">
            <span>Total a pagar:</span>
            <strong>${totalPrice.toFixed(2)}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;


