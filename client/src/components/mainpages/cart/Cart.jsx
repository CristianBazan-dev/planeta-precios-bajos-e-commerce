import React, { useContext, useEffect, useState } from "react";
import { GlobalState } from "../../../GlobalState";
import { Link } from "react-router-dom";
import axios from "axios";
// import PaypalButton from "./PaypalButton";
// import Checkout from "../checkout/Checkout";

function Cart(props) {
  const state = useContext(GlobalState);
  const [cart, setCart] = state.userAPI.cart;
  const [token] = state.token;
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return prev + item.unit_price * item.quantity;
      }, 0);

      setTotal(total);
    };
    getTotal();
  }, [cart]);

  const addToCart = async (cart) => {
    await axios.patch(
      "/users/addcart",
      { cart },
      {
        headers: { Authorization: token },
      }
    );
  };

  const increment = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity += 1;
      }
    });

    setCart([...cart]);
    addToCart(cart);
  };

  const decrement = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity === 1 ? (item.quantity = 1) : (item.quantity -= 1);
      }
    });

    setCart([...cart]);
    addToCart(cart);
  };

  const removeProduct = (id) => {
    if (window.confirm("Está seguro de querer eliminar este producto?")) {
      cart.forEach((item, index) => {
        if (item._id === id) {
          cart.splice(index, 1);
        }
      });

      setCart([...cart]);
      addToCart(cart);
    }
  };

  const tranSuccess = async (payment) => {
    let { paymentID, address } = payment;
    paymentID = payment.id;
    address = payment.purchase_units[0].shipping.address;
    await axios.post(
      "/api/payment",
      { cart, paymentID, address },
      {
        headers: { Authorization: token },
      }
    );

    setCart([]);
    addToCart([]);
    alert("Compra realizada!");
  };

  if (cart.length === 0)
    return (
      <h2 style={{ textAlign: "center", fontSize: "5rem", color: "#222" }}>
        Carrito vacío. Puedes ver nuestros productos haciendo click{" "}
        <Link to="/">aquí.</Link>
      </h2>
    );

  return (
    <div>
      {cart.map((product) => {
        return (
          <div className="detail cart" key={product.id}>
            <img src={product.images.url} alt={product.title} />

            <div className="box-detail">
              <h2>{product.title}</h2>

              <h3>${product.unit_price * product.quantity}</h3>
              <p>{product.description}</p>
              <p>{product.content}</p>

              <div className="amount">
                <button onClick={() => decrement(product._id)}>-</button>

                <span>{product.quantity}</span>

                <button onClick={() => increment(product._id)}>+</button>
              </div>

              <div
                className="delete"
                onClick={() => removeProduct(product._id)}
              >
                X
              </div>
            </div>
          </div>
        );
      })}

      <div className="total">
        <h2>Total: $ {total}</h2>
        <Link to="/checkout" className="checkout-button" cart={total}>
          Comprar
        </Link>
        {/* <PaypalButton total={total} tranSuccess={tranSuccess} /> */}
      </div>
    </div>
  );
}

export default Cart;
