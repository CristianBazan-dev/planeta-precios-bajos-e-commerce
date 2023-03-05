import React, { useContext, useState, useEffect } from 'react';      
import { GlobalState } from '../../../../GlobalState';
import { useParams } from "react-router-dom";

function Payment(checkout) {
    const state = useContext(GlobalState);
    const [cart] = state.userAPI.cart;
    const [token] = state.token;
    const [total, setTotal] = useState(0);

 
console.log(checkout)
    return (
        <div className="payment-page">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>País</th>
              <th>Provincia</th>
              <th>Localidad</th>
              <th>Código postal</th>
              <th>Dirección</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
  
        <table style={{ margin: "30px 0px" }}>
          <thead>
            <tr>
              <th></th>
              <th>Productos</th>
              <th>Cantidad</th>
              <th>Precio</th>
            </tr>
          </thead>
  
          <tbody>
    
            
          </tbody>
        </table>
      </div>
    );
}

export default Payment;