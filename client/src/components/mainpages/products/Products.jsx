import React, { useContext, useState } from "react";
import axios from "axios";

import { GlobalState } from "../../../GlobalState";
import { Link } from "react-router-dom";

import ProductItem from "../utils/productItem/ProductItem";
import Loading from "../utils/loading/Loading";
import Filters from "./Filters";
import LoadMore from "./LoadMore";

import { ReactComponent as Whatsapp } from "../../headers/icon/whatsapp.svg";

function Products(props) {
  const state = useContext(GlobalState);
  const [products, setProducts] = state.productsAPI.products;
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;
  const [callback, setCallback] = state.productsAPI.callback;
  const [loading, setLoading] = useState(false);
  const [isCheck, setIsCheck] = useState(false);

  const handleCheck = (id) => {
    products.forEach((product) => {
      if (product._id === id) product.checked = !product.checked;
    });
    setProducts([...products]);
  };

  const deleteProduct = async (id, public_id) => {
    try {
      setLoading(true);

      const destroyImg = axios.post(
        "/api/destroy",
        { public_id },
        {
          headers: { Authorization: token },
        }
      );

      const deleteProduct = axios.delete(`/api/products/${id}`, {
        headers: { Authorization: token },
      });

      await destroyImg;
      await deleteProduct;
      setCallback(!callback);
      setLoading(false);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const checkAll = () => {
    products.forEach((product) => {
      product.checked = !isCheck;
    });
    setProducts([...products]);
    setIsCheck(!isCheck);
  };

  const deleteAll = () => {
    products.forEach((product) => {
      if (product.checked) deleteProduct(product._id, product.images.public_id);
    });
  };

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );

  return (
    <>
      <Filters />

      {/* {isAdmin && (
        <div className="delete-all">
          <span>Seleccionar todo</span>
          <input type="checkbox" checked={isCheck} onChange={checkAll} />
          <button onClick={deleteAll}>Eliminar todo</button>
        </div>
      )} */}

      <div className="products">
        {products.map((product) => {
          return (
            <ProductItem
              key={product._id}
              product={product}
              isAdmin={isAdmin}
              deleteProduct={deleteProduct}
              // handleCheck={handleCheck}
            />
          );
        })}
      </div>

      <a href="https://api.whatsapp.com/send/?phone=543467445119&text=Hi%21+You+can+communicate+with+me+through+whatsapp.&type=phone_number&app_absent=0" target= "_blank">
      <Whatsapp width="60px" fill="var(--base)" className="whatsapp-logo" />

      </a>
      

      <LoadMore />
      {products.length === 0 && <Loading />}
    </>
  );
}

export default Products;
