import React, { useContext, useState, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import axios from "axios";
import { Link } from "react-router-dom";

function Checkout() {
  const state = useContext(GlobalState);
  const [cart, setCart] = state.userAPI.cart;
  const [token] = state.token;
  const [total, setTotal] = useState(0);
  const [paymentId, setPaymentId] = useState("");
  const [mpLink, setMpLink] = useState("");

  const [checkout, setCheckout] = useState({
    name: "",
    lastName: "",
    personalId: "",
    payer_email: "",
    phone: "",
    country: "",
    state: "",
    city: "",
    postalCode: "",
    items: cart,
  });

  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return prev + item.unit_price * item.quantity;
      }, 0);

      setTotal(total);
    };
    getTotal();
  }, [cart]);

  const onChangeInput = async (e) => {
    const { name, value } = e.target;
    setCheckout({ ...checkout, [name]: value });
  };

  const addToCart = async (cart) => {
    await axios.patch(
      "/users/addcart",
      { cart },
      {
        headers: { Authorization: token },
      }
    );
  };

  const checkoutSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "/api/payment",
        { total, ...checkout },
        {
          headers: { Authorization: token },
        }
      );

      const paymentId = res.data;
      setPaymentId(paymentId);

      const mpRes = await axios.post(`/api/payment/${paymentId}`, {
        headers: { Authorization: token },
      });

      const mpLink = mpRes.data.init_point;
      setMpLink(mpLink);

      alert("Compra confirmada! Serás redirigido a realizar el pago");

      window.open(`${mpLink}`);
      window.location.href = "/history  ";
      setCart([]);
      addToCart([]);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  console.log(paymentId, mpLink);

  return (
    <div className="checkout-page">
      <div className="product-table">
        <table style={{ margin: "30px 0px" }}>
          <thead>
            <tr>
              <th>Item</th>
              <th>Producto</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Sub-total</th>
            </tr>
          </thead>

          <tbody>
            {cart.map((item) => {
              return (
                <tr key={item._id}>
                  <td>
                    <img src={item.images.url} alt="" />
                  </td>
                  <td>{item.title}</td>
                  <td>${item.unit_price}</td>
                  <td>{item.quantity}</td>

                  <td>${item.unit_price * item.quantity}</td>
                </tr>
              );
            })}
          </tbody>

          <tbody className="total">
            <tr>
              <td>
                <h4>Total: ${total}</h4>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <form onSubmit={checkoutSubmit} className="consumer-form">
          <div className="buyer-data">
            <h2>Datos del comprador</h2>
            <span>Nombre</span>
            <input
              type="text"
              name="name"
              value={checkout.name}
              onChange={onChangeInput}
            />

            <span>Apellido</span>
            <input
              type="text"
              name="lastName"
              value={checkout.lastName}
              onChange={onChangeInput}
            />

            <span>DNI</span>
            <input
              type="text"
              name="personalId"
              value={checkout.personalId}
              onChange={onChangeInput}
            />

            <span>E-mail</span>
            <input
              type="text"
              name="payer_email"
              value={checkout.payer_email}
              onChange={onChangeInput}
            />

            <span>Teléfono celular</span>
            <input
              type="text"
              name="phone"
              value={checkout.phone}
              onChange={onChangeInput}
            />
          </div>

          <div className="shipping-data">
            <h2>Datos para el envío</h2>

            <span>País</span>
            <input
              type="text"
              name="country"
              value={checkout.country}
              onChange={onChangeInput}
            />

            <span>Provincia</span>
            <select
              name="state"
              value={checkout.state}
              onChange={onChangeInput}
              id="selectState"
            >
              <option value="Buenos Aires">Buenos Aires</option>
              <option value="Catamarca">Catamarca</option>
              <option value="Chaco">Chaco</option>
              <option value="Chubut">Chubut</option>
              <option value="Córdoba">Córdoba</option>
              <option value="Corrientes">Corrientes</option>
              <option value="Entre Ríos">Entre Rios</option>
              <option value="Formosa">Formosa</option>
              <option value="Jujuy">Jujuy</option>
              <option value="La Pampa">La Pampa</option>
              <option value="La Rioja">La Rioja</option>
              <option value="Mendoza">Mendoza</option>
              <option value="Misiones">Misiones</option>
              <option value="Neuquén">Neuquén</option>
              <option value="Río Negro">Río Negro</option>
              <option value="Salta">Salta</option>
              <option value="San Juan">San Juan</option>
              <option value="San Luis">San Luis</option>
              <option value="Santa Cruz">Santa Cruz</option>
              <option value="Santa Fe">Santa Fe</option>
              <option value="Santiago del Estero">Santiago del Estero</option>
              <option value="Tierra del Fuego">Tierra del Fuego</option>
              <option value="Tucumán">Tucumán</option>
            </select>

            <span>Localidad</span>
            <input
              type="text"
              name="city"
              value={checkout.city}
              onChange={onChangeInput}
            />

            <span>Código postal</span>
            <input
              type="number"
              name="postalCode"
              value={checkout.postalCode}
              onChange={onChangeInput}
            ></input>

            <span>Dirección</span>
            <input
              type="text"
              name="address"
              value={checkout.address}
              onChange={onChangeInput}
            ></input>
          </div>

          <button type="submit">Continuar con el pago</button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
