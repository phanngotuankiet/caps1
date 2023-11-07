import React, { useState } from 'react';
import styles from './Cart.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Cart = ({ cart, removeFromCart, addToCart, toggleCart, availableDocuments, setAvailableDocuments }) => {
  const [cartImported, setCartImported] = useState(cart);

  const getTotalPrice = () => {
    return cartImported.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const updateAvailableDocuments = (document, quantity) => {
    const updatedAvailableDocuments = availableDocuments.map((item) =>
      item.id === document.id ? { ...item, quantity: quantity } : item
    );
    setAvailableDocuments(updatedAvailableDocuments);
  };

  const handleAddToCart = (document) => {
    const existingItem = cartImported.find((item) => item.id === document.id);
  
    if (existingItem) {
      const updatedCart = cartImported.map((item) =>
        item.id === document.id && item.quantity < availableDocuments.find(doc => doc.id === item.id).quantity
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCartImported(updatedCart);
      updateAvailableDocuments(document, availableDocuments.find(doc => doc.id === document.id).quantity - 1);
      setAvailableDocuments(prevState => prevState.map((item) =>
        item.id === document.id ? { ...item, quantity: item.quantity - 1 } : item
      ));
    } else {
      setCartImported([...cartImported, { ...document, quantity: 1 }]);
      updateAvailableDocuments(document, availableDocuments.find(doc => doc.id === document.id).quantity - 1);
      setAvailableDocuments(prevState => prevState.map((item) =>
        item.id === document.id ? { ...item, quantity: item.quantity - 1 } : item
      ));
    }
  };
  
  
  const handleRemoveFromCart = (document) => {
    const updatedCart = cartImported
      .map((item) =>
        item.id === document.id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);
    setCartImported(updatedCart);
    updateAvailableDocuments(document, availableDocuments.find(doc => doc.id === document.id).quantity + 1);
    setAvailableDocuments(prevState => prevState.map((item) =>
      item.id === document.id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  return (
    <div className={styles.cartContainer}>
      <button className={styles.closeButton} onClick={toggleCart}>
        <FontAwesomeIcon icon={faTimes} />
      </button>

      {cartImported.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cartImported.map((item) => (
              <li key={item.id} className={styles.cartItem}>
                <span className={styles.itemInfo}>{item.title} - Quantity: {item.quantity}</span>

                <div>
                  <button onClick={() => handleRemoveFromCart(item)} className={styles.removeItemBtn} disabled={item.quantity <= 1}>-</button>
                  <button onClick={() => handleAddToCart(item)} className={styles.addItemBtn} disabled={item.quantity >= availableDocuments.find(doc => doc.id === item.id).quantity}>+</button>
                </div>
              </li>
            ))}
          </ul>

          <p className={styles.totalPrice}>Total Price: ${getTotalPrice()}</p>
        </div>
      )}
    </div>
  );
};

export default Cart;