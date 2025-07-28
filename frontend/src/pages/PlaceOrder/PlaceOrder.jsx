import React, { useContext, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { getTotalCartAmount, clearCart } = useContext(StoreContext);
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handlePayment = (e) => {
    e.preventDefault();
    setOrderPlaced(true);
    clearCart();

    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <form className="place-order">
      {/* ✅ Popup */}
      {orderPlaced && (
        <div className="order-popup">
          <p>🎉 Order placed successfully!</p>
        </div>
      )}

      {/* ✅ All page content gets blurred */}
      <div className={`place-order-wrapper ${orderPlaced ? 'blurred' : ''}`}>
        <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multi-fields">
            <input type="text" placeholder="First name" required />
            <input type="text" placeholder="Last name" required />
          </div>
          <input type="email" placeholder="Email address" required />
          <input type="text" placeholder="Street" required />
          <div className="multi-fields">
            <input type="text" placeholder="City" required />
            <input type="text" placeholder="State" required />
          </div>
          <div className="multi-fields">
            <input type="text" placeholder="Zip Code" required />
            <input type="text" placeholder="Country" required />
          </div>
          <input type="text" placeholder="Phone" required />
        </div>

        <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>₹ {getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>₹ {getTotalCartAmount() === 0 ? 0 : 20}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>₹ {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 20}</b>
              </div>
            </div>
            <button type="button" onClick={handlePayment}>
              PROCEED TO PAYMENT
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
