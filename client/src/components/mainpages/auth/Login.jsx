import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Lock from '../../headers/icon/lock.svg'
import Mail from '../../headers/icon/mail.svg'

function Login(props) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/users/login", { ...user });

      localStorage.setItem("firstLogin", true);

      window.location.href = "/";
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
            
            <div>
        
                <div className="login-card">

                    <div className="login-card-logo">
                      <img src="https://res.cloudinary.com/dhbvri4ni/image/upload/v1675777472/planeta-precios-bajos-e-commerce/logo_rcgxiz.png" alt="" />
                    </div>

                    <div className="login-card-header">
                        <h1>Iniciar sesión</h1>
                        <div>Por favor, ingresa en tu cuenta para adquirir nuestros productos!</div>
                    </div>

                    <form onSubmit={loginSubmit} className="login-card-form">

                        <div className="form-item">
                            <span className="form-item-icon-material-symbols-rounded">
                                  <img src={Mail} alt="" />
                            </span>
                            
                            <input
                            type="text"
                            name="email"
                            required
                            placeholder="E-mail"
                            value={user.email}
                            onChange={onChangeInput}
                            />
                        </div>

                        
                        <div className="form-item">
                        <span className="form-item-icon-material-symbols-rounded">
                                  <img src={Lock} alt="" />
                            </span>
                            <input
                            type="password"
                            name="password"
                            required
                            placeholder="Contraseña"
                            value={user.password}
                            onChange={onChangeInput}
                            />
                        </div>

                        <div className="form-item-other">
                            <div className="checkbox">
                                <input 
                                type="checkbox" 
                                id="rememberMeCheckbox"
                                checked
                                />
                                <label htmlFor="rememberMeCheckbox">Recuerdame</label>
                            </div>

                            <a href="/">Olvide mi contraseña!</a>
                        </div>

                        <button type="submit">Iniciar sesión</button>
                    </form>

                    <div className="login-card-footer">
                        No tienes una cuenta? <Link to='/register'>Crea una!</Link>
                    </div>

                </div>
            </div>
  );
}

export default Login;

