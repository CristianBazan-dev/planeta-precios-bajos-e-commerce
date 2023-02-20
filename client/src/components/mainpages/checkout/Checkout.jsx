import React, { useContext, useState, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";

function Checkout() {
  const state = useContext(GlobalState);
  const [cart] = state.userAPI.cart;
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);

      setTotal(total);
    };
    getTotal();
  }, [cart]);




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
                  <td>${item.price}</td>
                  <td>{item.quantity}</td>
                  
                  <td>${item.price * item.quantity}</td>
                </tr> 
              );
              
            })}
          </tbody>
          
          <tbody className="total"> 
            <td>
              <h4>Total: ${total}</h4>
              </td>
            
          </tbody>
          
        </table>
      </div>

      <div>
        
        <form action="" className="consumer-form">
        <h2>Datos del comprador</h2>
          <span>Nombre</span>
          <input type="text" 
          name="name" 
           />
        
          <span>Apellido</span>
          <input 
          type="text" 
          name="lastName" 
          
          />

          <span>DNI</span>
          <input 
          type="text" 
          name="personalId" 
           />
        
          <span>Teléfono celular</span>
          <input 
          type="text"
          name="phone" 
          />

          <h2>Datos para el envío</h2>
          <span>Provincia</span>
          <select name="" id="">
            <option value="">Buenos Aires</option>
            <option value="">Catamarca</option>
            <option value="">Chaco</option>
            <option value="">Chubut</option>
            <option value="">Córdoba</option>
            <option value="">Corrientes</option>
            <option value="">Entre Rios</option>
            <option value="">Formosa</option>
            <option value="">Jujuy</option>
            <option value="">La Pampa</option>
            <option value="">La Rioja</option>
            <option value="">Mendoza</option>
            <option value="">Misiones</option>
            <option value="">Neuquén</option>
            <option value="">Río Negro</option>
            <option value="">Salta</option>
            <option value="">San Juan</option>
            <option value="">San Luis</option>
            <option value="">Santa Cruz</option>
            <option value="">Santa Fe</option>
            <option value="">Santiago del Estero</option>
            <option value="">Tierra del Fuego</option>
            <option value="">Tucumán</option>
          </select>

          <span>Localidad</span>
          <input type="text" />

          <span>Código postal</span>
          <input type="number"></input>

          <button type="submit">Pasar a envío</button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
