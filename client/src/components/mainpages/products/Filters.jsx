import React, { useContext } from "react";

import { GlobalState } from "../../../GlobalState";

function Filters() {
  const state = useContext(GlobalState);

  const [categories] = state.categoriesAPI.categories;
  const [category, setCategory] = state.productsAPI.category;
  const [sort, setSort] = state.productsAPI.sort;
  const [search, setSearch] = state.productsAPI.search;

  const handleCategory = (e) => {
    setCategory(e.target.value);
    setSearch("");
  };

  return (
    <div className="filter_menu">
      <div className="row">
        <span>Categorías </span>

        <select name="category" value={category} onChange={handleCategory}>
          <option value="">Todos los productos</option>
          {categories.map((category) => {
            return (
              <option value={"category=" + category._id} key={category._id} id="category">
                {category.name}
              </option>
              
            );
          })}
        </select>
      </div>

      <input
        type="text"
        value={search}
        placeholder="Ingresa tu búsqueda!"
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
      />

      <div className="row sort">
        <span>Filtros</span>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">Más nuevo</option>
          <option value="sort=oldest">Más antigüo</option>
          <option value="sort=-sold">Más vendido</option>
          <option value="sort=-unit_price">Precio: Más caro</option>
          <option value="sort=unit_price">Precio: Más barato</option>
        </select>
      </div>
    </div>
  );
}

export default Filters;
