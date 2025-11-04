import { useState, useEffect } from 'react';

const ItemCount = ({ stock = 0, initial = 1, onChange }) => {
  const [count, setCount] = useState(initial);

  useEffect(() => {
    setCount((prev) => Math.max(1, Math.min(prev, stock || 1)));
  }, [stock]);

  const decrease = () => {
    setCount((prev) => {
      const next = Math.max(1, prev - 1);
      onChange?.(next);
      return next;
    });
  };

  const increase = () => {
    setCount((prev) => {
      const next = Math.min(stock || 1, prev + 1);
      onChange?.(next);
      return next;
    });
  };

  return (
    <div className="item-count">
      <button className="count-btn" onClick={decrease} disabled={count <= 1}>
        -
      </button>
      <span className="count-value">{count}</span>
      <button className="count-btn" onClick={increase} disabled={count >= (stock || 1)}>
        +
      </button>
    </div>
  );
};

export default ItemCount;







