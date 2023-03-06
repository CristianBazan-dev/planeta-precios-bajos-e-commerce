import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { GlobalState } from "../../../GlobalState";

import Loading from "../utils/loading/Loading";

const initialState = {
  product_id: "",
  title: "",
  unit_price: 0,
  description:
    "How to and tutorial videos of cool CSS effect, Web Design ideas, Javascript libraries, Node.",
  content:
    " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ",
  category: "",
  _id: "",
};

function CreateProduct(props) {
  const state = useContext(GlobalState);
  const [product, setProduct] = useState(initialState);
  const [categories] = state.categoriesAPI.categories;
  const [images, setImages] = useState(false);
  const [loading, setLoading] = useState(false);
  const [onEdit, setOnEdit] = useState(false);

  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;
  const [products] = state.productsAPI.products;
  const [callback, setCallback] = state.productsAPI.products;

  const history = useNavigate();
  const param = useParams();

  useEffect(() => {
    if (param.id) {
      setOnEdit(true);
      products.forEach((product) => {
        if (product._id === param.id) {
          setProduct(product);
          setImages(product.images);
        }
      });
    } else {
      setOnEdit(false);
      setProduct(initialState);
      setImages(false);
    }
  }, [param.id, products]);

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) return alert("No eres administrador/a");
      const file = e.target.files[0];

      if (!file) return alert("No se ha seleccionado ningún archivo.");

      if (file.size > 1024 * 1024)
        return alert("El archivo es demasiado pesado.");

      if (file.type !== "image/jpeg" && file.type !== "image/png")
        return alert(
          "Formato no soportado. Seleccione una imagen en .jpg o .png"
        );

      let formData = new FormData();
      formData.append("file", file);

      setLoading(true);
      const res = await axios.post("/api/upload", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
      setLoading(false);
      setImages(res.data);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleDestroy = async () => {
    try {
      if (!isAdmin) return alert("No eres administrador/a");

      setLoading(true);
      await axios.post(
        "/api/destroy",
        { public_id: images.public_id },
        {
          headers: { Authorization: token },
        }
      );
      setLoading(false);
      setImages(false);
    } catch (err) {
      alert(err.response.msg);
    }
  };

  const handleChangeInput = async (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) return alert("No eres administrador/a");

      if (!images) return alert("No se ha seleccionado ninguna imagen.");

      if (onEdit) {
        await axios.put(
          `/api/products/${product._id}`,
          { ...product, images },
          {
            headers: { Authorization: token },
          }
        );
      } else {
        await axios.post(
          "/api/products",
          { ...product, images },
          {
            headers: { Authorization: token },
          }
        );
      }
      setCallback(!callback);

      window.location.href="/"
    } catch (err) {
      alert(err.response.data.msg);
      console.log(err);
    }
  };

  const styleUpload = {
    display: images ? "block" : "none",
  };

  return (
    <div className="create_product">
    
      <form onSubmit={handleSubmit}>
        <div className="row">
          <label htmlFor="product_id">ID del producto</label>

          <input
            type="text"
            name="product_id"
            required
            value={product.product_id}
            id="product_id"
            onChange={handleChangeInput}
            disabled={product._id}
          />
        </div>

        <div className="row">
          <label htmlFor="title">Título</label>

          <input
            type="text"
            name="title"
            required
            value={product.title}
            id="title"
            onChange={handleChangeInput}
          />
        </div>

        <div className="row">
          <label htmlFor="brand">Marca</label>

          <input
            type="text"
            name="title"
            required
            value={product.title}
            id="title"
            onChange={handleChangeInput}
          />
        </div>

        <div className="row">
          <label htmlFor="model">Modelo</label>

          <input
            type="text"
            name="title"
            required
            value={product.title}
            id="title"
            onChange={handleChangeInput}
          />
        </div>

        <div className="row">
          <label htmlFor=" unit_price">Precio</label>

          <input
            type="number"
            name=" unit_price"
            required
            value={product.unit_price}
            id="unit_price"
            onChange={handleChangeInput}
          />
        </div>

        <div className="row">
          <label htmlFor="title">Oferta</label>

          <input
            type="text"
            name="title"
            required
            value={product.title}
            id="title"
            onChange={handleChangeInput}
          />
        </div>

        <div className="row">
          <label htmlFor="description">Descripción</label>

          <input
            type="text"
            name="description"
            required
            value={product.description}
            id="description"
            onChange={handleChangeInput}
          />
        </div>

        <div className="row">
          <label htmlFor="content">Contenido</label>

          <input
            type="text"
            name="content"
            required
            value={product.content}
            id="content"
            onChange={handleChangeInput}
          />
        </div>

        <div className="row">
          <label htmlFor="categories">Categoría</label>

          <select
            name="category"
            value={product.category}
            onChange={handleChangeInput}
          >
            <option value="">Por favor, elija una categoría.</option>

            {categories.map((category) => {
              return (
                <option value={category._id} key={category._id}>
                  {category.name}
                </option>
              );
            })}
          </select>
        </div>

        <button type="submit">{onEdit ? "Actualizar" : "Crear"}</button>
      </form>

      <div className="upload">
        <input type="file" name="file" id="file_up" onChange={handleUpload} />
        {loading ? (
          <div id="file_img">
            <Loading />
          </div>
        ) : (
          <div id="file_img" style={styleUpload}>
            <img src={images ? images.url : ""} alt="" />
            <span onClick={handleDestroy}>X</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateProduct;
