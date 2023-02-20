import React, { useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { GlobalState } from "../../GlobalState";

import { ReactComponent as Menu } from "./icon/menu.svg";
import { ReactComponent as Close } from "./icon/close.svg";
import { ReactComponent as Orders } from "./icon/orders.svg";
import Cart from "./icon/cart.svg";
import User from "./icon/user.svg";

function Header(props) {
  const state = useContext(GlobalState);

  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  const [cart] = state.userAPI.cart;
  const [name] = state.userAPI.name;

  const logoutUser = async () => {
    await axios.get("/users/logout");

    localStorage.removeItem("firstLogin");

    window.location.href = "/";
  };

  const adminRouter = () => {
    return (
      <>
        <div className="admin-ul">
          <li>
            <Link to="/create_product">Crear producto</Link>
          </li>

          <li>
            <Link to="/category">Categorías</Link>
          </li>

          <li>
            <Link to="/history">{isAdmin ? "Pedidos" : "Compras"}</Link>
          </li>

          <li>
            <Link to="/" onClick={logoutUser}>
              Cerrar sesión
            </Link>
          </li>
        </div>
      </>
    );
  };

  const loggedRouter = () => {
    return (
      <>
        <h3>{isAdmin ? "" : "Hola " + name}</h3>

        <li>
          <Link to="/history">{isAdmin ? "Pedidos" : "Compras"}</Link>
        </li>

        <li>
          <Link to="/" onClick={logoutUser}>
            Cerrar sesión
          </Link>
        </li>
      </>
    );
  };

  return (
    <header>
      {/* <div className="menu">
        <Menu
          width="20px"
          onClick={() => {
            const menuDeploy = document.querySelector(".menu-deploy");
            menuDeploy.classList.toggle("active");
          }}
        />
        <div className="menu-deploy active">
          <Close className="close-icon"
          onClick={() => {
            const menuDeploy = document.querySelector(".menu-deploy");
            menuDeploy.classList.remove("active");
          }} />

          <nav>
            <ul>
              <li>¿Quiénes somos?</li>
              <li>Sucursales</li>
            </ul>
          </nav>
        </div>
      </div> */}

      <div className="logo">
        <Link to="/">
          <img
            src="https://res.cloudinary.com/dhbvri4ni/image/upload/v1675777472/planeta-precios-bajos-e-commerce/logo_rcgxiz.png"
            alt=""
          />
        </Link>
      </div>

      <nav>
        <ul>
          <li>Nosotros</li>
          <li>Sucursales</li>
          <li>Contacto</li>
        </ul>
      </nav>

      <ul className="admin-title" >
        <h1>
          <Link to="/">
            {isAdmin ? `${name} - Admin` : ""}
            {isAdmin ? <div
              className="bars"
              onClick={() => {
                const adminMenuDeploy = document.querySelector(".admin-ul");
                adminMenuDeploy.classList.toggle("active");
              }}
            >
              <div className="bar-1"></div>
              <div className="bar-2"></div>
            </div>

            : ""}
          </Link>
        </h1>

        <div>{isAdmin && adminRouter()}</div>
      </ul>

      <div className="icons">
        {isAdmin ? (
          ""
        ) : (
          <div>
            <div className="user-icon">
              <img
                src={User}
                alt=""
                onMouseOver={() => {
                  const menuDeploy = document.querySelector(".user-menu");
                  menuDeploy.classList.add("active");
                }}
              />
            </div>

            <div
              className="user-menu"
              onMouseOver={() => {
                const menuDeploy = document.querySelector(".user-menu");
                menuDeploy.classList.add("active");
              }}
              onMouseOut={() => {
                const menuDeploy = document.querySelector(".user-menu");
                menuDeploy.classList.remove("active");
              }}
            >
              {isLogged ? (
                loggedRouter()
              ) : (
                <div className="login-menu">
                  <li>
                    <Link to="/login">Iniciar sesión</Link>
                  </li>

                  <li>
                    <Link to="/register">Registro</Link>
                  </li>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="cart-icon">
          <span>{cart.length}</span>
          <Link to="/cart">
            <img src={Cart} alt="" width="30" />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
