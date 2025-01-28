import React, { useState } from 'react';
import styles from './Cart.module.css';

interface CartItem {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, name: "Wood Magazine Rack", description: "Red", price: 120, quantity: 2 },
    { id: 2, name: "Eco-friendly Helmet", description: "Black", price: 132, quantity: 1 },
    { id: 3, name: "Sigg Water Bottle", description: "Graphite Black", price: 23, quantity: 2 },
  ]);

  const handleQuantityChange = (id: number, delta: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + delta) }
          : item
      )
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const calculateSubtotal = (): number => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Your Cart</h2>
      <div className={styles.cartContent}>
        {/* Cart Items */}
        <table className={styles.cartTable}>
          <thead>
            <tr>
              <th className={styles.tableHeader}>Product</th>
              <th className={styles.tableHeader}>Price</th>
              <th className={styles.tableHeader}>Quantity</th>
              <th className={styles.tableHeader}>Total</th>
              <th className={styles.tableHeader}></th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id} className={styles.tableRow}>
                <td className={styles.tableCell}>
                  <div>
                    <strong>{item.name}</strong>
                    <br />
                    <span className={styles.itemDescription}>{item.description}</span>
                  </div>
                </td>
                <td className={styles.tableCell}>${item.price}</td>
                <td className={styles.tableCellQuantity}>
                  <button className={styles.quantityButton} onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                  <span className={styles.quantity}>{item.quantity}</span>
                  <button className={styles.quantityButton} onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                </td>
                <td className={styles.tableCell}>${item.price * item.quantity}</td>
                <td className={styles.tableCellRemove}>
                  <button className={styles.removeButton} onClick={() => handleRemoveItem(item.id)}>X</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Order Summary */}
        <div className={styles.orderSummary}>
          <h3 className={styles.summaryHeader}>Order Summary</h3>
          <div className={styles.summaryRow}>
            <span>Subtotal</span>
            <span>${calculateSubtotal()}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className={styles.summaryRowTotal}>
            <span>Total</span>
            <span>${calculateSubtotal()}</span>
          </div>
          <button className={styles.checkoutButton}>CHECKOUT</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
