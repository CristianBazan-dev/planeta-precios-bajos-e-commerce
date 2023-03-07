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

  const [paymentMethod, setPaymentMethod] = useState(""); 
  const [shippingMethod, setShippingMethod] = useState(""); 
  const [shippingPrice, setShippingPrice] = useState(0); 



  const [checkout, setCheckout] = useState({
    name: "",
    lastName: "",
    personalId: "",
    payer_email: "",
    phone: "",
    country: "",
    state: "",
    postalCode: "",
    city: "",
    address: "",
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


  useEffect(() => {
    const setPayment = () => {

    }
  })

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

  const paySelection = (e) => {
    console.log(e.target.id)
    let paymentMethod = e.target.value; 

    setPaymentMethod(paymentMethod) 
    console.log(paymentMethod);   
  };

  const shipSelection = (e) => {
    let shippingMethod = e.target.value; 
    setShippingMethod(shippingMethod); 
    console.log(shippingMethod)

    if(shippingMethod == "correo_arg"){
      const shippingForm = document.querySelector('.shipping-data')

      shippingForm.classList.toggle('active'); 
    }else{
      const shippingForm = document.querySelector('.shipping-data')

      shippingForm.classList.remove('active'); 
    }
  }






  console.log(paymentId, mpLink);

  return (
    <div className="checkout-page">
      

      <div>
        <form onSubmit={checkoutSubmit} className="consumer-form">
          <div className="payment-method">
            <h2>Método de pago</h2>

            <div className="form-item" id="mp">
              {/* <input type="checkbox" className="check-pay-meth" /> */}
              <input
                type="radio"
                onClick={paySelection}
                value="mp"
                name="paymentMethod"
                id="mp"
              />

              <img
                src="https://res.cloudinary.com/dhbvri4ni/image/upload/v1677862587/planeta-precios-bajos-e-commerce/0006813_mercadopago-checkout-latam-tecnofin_z51fvi.png"
                alt=""
                className="mp"
              />
            </div>

            <div className="form-item" id="transfer">
              {/* <input type="checkbox" className="check-pay-meth" /> */}
              <input
                type="radio"
                onClick={paySelection}
                value="transfer"
                name="paymentMethod"
                id="transfer"
              />
              <img
                src="https://res.cloudinary.com/dhbvri4ni/image/upload/v1677871231/planeta-precios-bajos-e-commerce/Transfer_s8nqkh.png"
                alt=""
              />
              <label>Transferencia bancaria</label>
            </div>

            <div className="form-item" id="sucursalPay">
              {/* <input type="checkbox" className="check-pay-meth" /> */}
              <input
                type="radio"
                onClick={paySelection}
                value="sucursal"
                name="paymentMethod"
                id="sucursalPay"
              />
              <img
                src="https://res.cloudinary.com/dhbvri4ni/image/upload/v1677871231/planeta-precios-bajos-e-commerce/Sucursal_oy3lk6.png"
                alt=""
              />
              <label>Pago en sucursal</label>
            </div>
          </div>

          <div className="buyer-data">
            <h2>Datos del comprador</h2>

            <div className="form-container">
              <div className="form-item">
                <span>Nombre</span>
                <input
                  type="text"
                  name="name"
                  value={checkout.name}
                  onChange={onChangeInput}
                />
              </div>

              <div className="form-item">
                <span>Apellido</span>
                <input
                  type="text"
                  name="lastName"
                  value={checkout.lastName}
                  onChange={onChangeInput}
                />
              </div>

              <div className="form-item">
                <span>DNI</span>
                <input
                  type="text"
                  name="personalId"
                  value={checkout.personalId}
                  onChange={onChangeInput}
                />
              </div>

              <div className="form-item">
                <span>Email</span>
                <input
                  type="text"
                  name="payer_email"
                  value={checkout.payer_email}
                  onChange={onChangeInput}
                />
              </div>

              <div className="form-item">
                <span>Teléfono celular</span>
                <input
                  type="text"
                  name="phone"
                  value={checkout.phone}
                  onChange={onChangeInput}
                />
              </div>
            </div>
          </div>

          <div className="shipping-method" id="shippingMethod">
            <h2>Método de envío</h2>

            <div className="form-item">
              {/* <input type="checkbox" className="check-pay-meth" /> */}
              <input
                type="radio"
                onClick={shipSelection}
                value="correo_arg"
                name="shippingMethod"
                
              />
              <img
                src="https://res.cloudinary.com/dhbvri4ni/image/upload/v1677871845/planeta-precios-bajos-e-commerce/Correo_cbdbub.png"
                className="cor-Ar"
                alt=""
              />
            </div>

            <div className="form-item">
              {/* <input type="checkbox" className="check-pay-meth" /> */}
              <input
                type="radio"
                onClick={shipSelection}
                value="sucursal"
                name="shippingMethod"
                
              />
              <img
                src="https://res.cloudinary.com/dhbvri4ni/image/upload/v1677871231/planeta-precios-bajos-e-commerce/Sucursal_oy3lk6.png"
                alt=""
              />
              <label>Retiro en sucursal</label>
            </div>
          </div>

          <div className="shipping-data">
            <h2>Datos para el envío</h2>
            <div className="form-container">
              <div className="form-item">
                <span>País</span>
                <input
                  type="text"
                  name="country"
                  value={checkout.country}
                  onChange={onChangeInput}
                />
              </div>

              <div className="form-item">
                <span>Provincia</span>
                <select
                  name="state"
                  value={checkout.state}
                  onChange={onChangeInput}
                  id="selectState"
                >
                  <option value="Buenos Aires">
                    <input type="hidden" value="2342" name="ship_price" />
                    Buenos Aires</option>
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
                  <option value="Santiago del Estero">
                    Santiago del Estero
                  </option>
                  <option value="Tierra del Fuego">Tierra del Fuego</option>
                  <option value="Tucumán">Tucumán</option>
                </select>
              </div>

              <div className="form-item">
                <span>Localidad</span>
                <input
                  type="text"
                  name="city"
                  value={checkout.city}
                  onChange={onChangeInput}
                />
              </div>

              <div className="form-item">
                <span>Código postal</span>
                <input
                  type="text"
                  name="postalCode"
                  value={checkout.postalCode}
                  onChange={onChangeInput}
                ></input>
              </div>

              <div className="form-item">
                <span>Dirección</span>
                <input
                  type="text"
                  name="address"
                  value={checkout.address}
                  onChange={onChangeInput}
                ></input>
              </div>

              <div className="form-item">
                <span>Costo de envío</span>
                <input type="text" placeholder="$" value="ship_price"/>
              </div>


            </div>
          </div>

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

          <button type="submit">Continuar con el pago</button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
