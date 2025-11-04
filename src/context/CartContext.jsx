import { createContext, useContext, useMemo, useState, useCallback } from 'react';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]); // [{id, title, price, image, stock, quantity}]

  const addItem = useCallback((product, quantity) => {
    setItems((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        const updated = prev.map((p) =>
          p.id === product.id
            ? { ...p, quantity: Math.min(p.quantity + quantity, product.stock || p.stock || Infinity) }
            : p
        );
        return updated;
      }
      return [
        ...prev,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          stock: product.stock ?? Infinity,
          quantity: Math.min(quantity, product.stock ?? Infinity),
        },
      ];
    });
  }, []);

  const removeItem = useCallback((id) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const updateQuantity = useCallback((id, quantity) => {
    setItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantity: Math.max(1, Math.min(quantity, p.stock ?? Infinity)) } : p))
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const totals = useMemo(() => {
    const totalQuantity = items.reduce((acc, p) => acc + p.quantity, 0);
    const totalPrice = items.reduce((acc, p) => acc + p.quantity * p.price, 0);
    return { totalQuantity, totalPrice };
  }, [items]);

  const value = useMemo(
    () => ({ items, addItem, removeItem, updateQuantity, clear, ...totals }),
    [items, addItem, removeItem, updateQuantity, clear, totals]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};


export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return ctx;
};


export default CartContext;
