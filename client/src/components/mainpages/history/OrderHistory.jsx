import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { GlobalState } from "../../../GlobalState";

function OrderHistory(props) {
  const state = useContext(GlobalState);
  const [history, setHistory] = state.userAPI.history;
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;

  useEffect(() => {
    if (token) {
      const getHistory = async () => {
        if (isAdmin) {
          const res = await axios.get("/api/payment", {
            headers: { Authorization: token },
          });
          setHistory(res.data);
        } else {
          const res = await axios.get("/users/history", {
            headers: { Authorization: token },
          });
          setHistory(res.data);
        }
      };
      getHistory();
    }
  }, [token, isAdmin, setHistory]);

  return (
    <div className="history-page">
      <h2>Pedidos</h2>

      <h4>Tienes {history.length} compras</h4>

      <table>
        <thead>
          <tr>
            <th>ID del pago</th>
            <th>Fecha de compra</th>
            <th>Detalles</th>
          </tr>
        </thead>

        <tbody>
          {history.map((items) => {
            return (
              <tr key={items._id}>
                <td>{items.paymentID}</td>
                <td>{new Date(items.createdAt).toLocaleDateString()}</td>
                <td>
                  <Link to={`/history/${items._id}`}>Ver</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default OrderHistory;
