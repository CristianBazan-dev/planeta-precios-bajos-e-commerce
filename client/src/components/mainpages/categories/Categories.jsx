import React, { useState, useContext } from 'react';
import axios from 'axios'

import { GlobalState } from "../../../GlobalState";

function Categories(props) {
  const state = useContext(GlobalState);

  const [token] = state.token;
  const [categories] = state.categoriesAPI.categories;
  const [callback, setCallback] = state.categoriesAPI.callback;

  const [category, setCategory] = useState("");
  const [onEdit, setOnEdit] = useState("");
  const [id, setID] = useState("");

  const createCategory = async (e) => {
    e.preventDefault();
    try {
      if (onEdit) {
        const res = await axios.put(
          `/api/category/$${id}`,
          { name: category },
          {
            headers: { Authorization: token },
          }
        );

        alert(res.data.msg);
      } else {
        const res = await axios.post(
          "/api/category",
          { name: category },
          {
            headers: { Authorization: token },
          }
        );

        alert(res.data.msg);
      }
      setOnEdit(false);
      setCategory("");
      setCallback(!callback);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const editCategory = async (id, name) => {
    setID(id);
    setCategory(name);
    setOnEdit(true);
  };

  const deleteCategory = async (id) => {
    try {
      const res = await axios.delete(`/api/category/${id}`, {
        headers: { Authorization: token },
      });
      alert(res.data.msg);
      setCallback(!callback);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div className="categories">
      <form onSubmit={createCategory}>
        <label htmlFor="category">Categoría</label>
        <input
          type="text"
          name="category"
          value={category}
          required
          onChange={(e) => setCategory(e.target.value)}
        />

        <button type="submit">{onEdit ? "Actualizar" : "Crear"}</button>
      </form>

      <div className="col">
        {categories.map((category) => {
        return (
            <div className="row" key={category._id}>
                <div>
                    <p>{category.name}</p>

                    <div>
                        <button 
                        onClick={() => editCategory(category._id, category.name)}
                        >
                        Editar
                        </button>

                        <button 
                        onClick = {() => deleteCategory(category._id)}
                        >
                            Eliminar
                        </button>
                    </div>

                </div>
            </div>
        );
      })}
      </div>
    </div>
  );
}

export default Categories;
