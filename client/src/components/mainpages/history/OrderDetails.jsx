import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";

function OrderDetails() {
  const state = useContext(GlobalState);

  const [history] = state.userAPI.history;

  const [orderDetails, setOrderDetails] = useState([]);

  const params = useParams();

  useEffect(() => {
    if (params.id) {
      history.forEach((item) => {
        if (item._id === params.id) setOrderDetails(item);
      });
    }
  }, [params.id, history]);

  if (orderDetails.length === 0) return null;

  return (
    <div className="history-page">
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
            <td>{orderDetails.name}</td>
            <td>{orderDetails.country}</td>
            <td>{orderDetails.state}</td>
            <td>{orderDetails.city}</td>
            <td>{orderDetails.postalCode}</td>
            <td>{orderDetails.address}</td>
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
          {orderDetails.items.map((item) => {
            return <tr key={item._id}>
                        <td><img src={item.images.url} alt="" /></td>
                        <td>{item.title}</td>
                        <td>{item.quantity}</td>
                        <td>{item.unit_price * item.quantity}</td>
            </tr>;  
          })
          
          }
        </tbody>
      </table>
    </div>
  );
}

export default OrderDetails;
