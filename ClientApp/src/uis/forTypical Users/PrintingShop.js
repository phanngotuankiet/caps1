import React, { useState, useEffect } from "react";
import styles from "./PrintingShop.module.css";
import Card from "../card/Card";
import Cart from "./all a cart has/Cart";
import CartButton from "./all a cart has/CartButton";
import CartPopupStyles from "./all a cart has/CartPopup.module.css";

const PrintingShop = () => {
  const [cart, setCart] = useState([]);
  const [availableDocuments, setAvailableDocuments] = useState([
    {
      id: 1,
      title: "Mathematics Textbook",
      price: 20,
      quantity: 10,
    },
    {
      id: 2,
      title: "Physics Textbook",
      price: 25,
      quantity: 20,
    },
    {
      id: 3,
      title: "Economic Textbook",
      price: 26,
      quantity: 90,
    },
    {
      id: 4,
      title: "Bio Textbook",
      price: 28,
      quantity: 45,
    },
    {
      id: 5,
      title: "IT Textbook",
      price: 29,
      quantity: 58,
    },
    {
      id: 6,
      title: "Philosophys Textbook",
      price: 29,
      quantity: 53,
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const addToCart = (document) => {
    const existingItem = cart.find((item) => item.id === document.id);

    if (existingItem) {
      const updatedCart = cart.map((item) =>
        item.id === document.id && item.quantity < availableDocuments.find(doc => doc.id === item.id).quantity
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCart(updatedCart);
      updateAvailableDocuments(document, availableDocuments.find(doc => doc.id === document.id).quantity - 1);
      setAvailableDocuments(prevState => prevState.map((item) =>
        item.id === document.id ? { ...item, quantity: item.quantity - 1 } : item
      ));
    } else {
      setCart([...cart, { ...document, quantity: 1 }]);
      updateAvailableDocuments(document, availableDocuments.find(doc => doc.id === document.id).quantity - 1 );
      setAvailableDocuments(prevState => prevState.map((item) =>
        item.id === document.id ? { ...item, quantity: item.quantity - 1 } : item
      ));
    }
  };

  const removeFromCart = (document) => {
    const updatedCart = cart
      .map((item) =>
        item.id === document.id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);
    setCart(updatedCart);
    updateAvailableDocuments(document, availableDocuments.find(doc => doc.id === document.id).quantity - 1);
    setAvailableDocuments(prevState => prevState.map((item) =>
      item.id === document.id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const updateAvailableDocuments = (document, quantity) => {
    const updatedAvailableDocumentsVar = availableDocuments.map((item) =>
      item.id === document.id ? { ...item, quantity: quantity } : item
    );
    setAvailableDocuments(updatedAvailableDocumentsVar);
  };

  // useEffect(() => {
  //   const unpaidDocuments = availableDocuments.filter(
  //     (document) => document.quantity > 0
  //   );
  //   setAvailableDocuments(unpaidDocuments);
  // }, []);

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className={styles.printingShop}>
      <div className={styles.wholeContent}>
        <div className={styles.floatCart}>
          <CartButton cart={cart} onClick={toggleCart} />
        </div>
        <h1>Surf all the Documents you want!</h1>
        <div className={styles.documentList}>
          {availableDocuments.map((document) => (
            <div className={styles.flexItem}>
              <Card
                key={document.id}
                document={document}
                addToCart={addToCart}
              />
            </div>
          ))}
        </div>
        {availableDocuments.length === 0 && (
          <p>No documents are available at this time.</p>
        )}
        
        <p style={{ color: "red" }}>Total Price: ${getTotalPrice()}</p>
      </div>
      {isCartOpen && (
        <div className={CartPopupStyles.blurredBackground}>
          <div className={CartPopupStyles.cartPopup}>
            <Cart
              cart={cart}
              removeFromCart={removeFromCart}
              availableDocuments={availableDocuments}
              addToCart={addToCart}
              toggleCart={toggleCart}
              setAvailableDocuments={setAvailableDocuments}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PrintingShop;
