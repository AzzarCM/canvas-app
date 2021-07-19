import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../../actions/auth";
import { Link, useHistory } from "react-router-dom";
import logo from "../../assets/svg/logo.svg";
import { ReactComponent as MenuIcon } from "../../assets/svg/menu.svg";
import { ReactComponent as CloseMenu } from "../../assets/svg/x.svg";
import { changeSearchText } from "../../actions/ui";

export const Navbar = () => {
  const firebaseInfo = useSelector((state) => state.auth);
  var uid = firebaseInfo.uid;
  const history = useHistory();

  const dispatch = useDispatch();
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const addedItems = useSelector((state) => state.cart.addedItems);

  var total = 0;
  addedItems.map((item) => {
    total += item.quantity;
  });

  const handleLogOut = () => {
    dispatch(startLogout());
  };

  const handleSearchBar = (text) => {
    dispatch(changeSearchText(text));
  };
  const pathHistory = `/main/history/${uid}`;

  return (
    <div className="header">
      <div className="logo-nav">
        <div className="logo-container">
          <a href="/main/home">
            <img
              style={{ marginLeft: 10 }}
              alt="logo"
              className="navbar-logo-img"
              src={logo}
            />
          </a>
        </div>
        <ul className={click ? "nav-options active" : "nav-options"}>
          {/* {<li onClick={closeMobileMenu}>
                <a className="link-navbar" href="/main/most-selled">MAS VENDIDOS</a>
              </li>} */}
          <li onClick={closeMobileMenu}>
            <a className="link-navbar" href="/main/themes">
              TEMAS
            </a>
          </li>
          <li onClick={closeMobileMenu}>
            <a className="link-navbar" href="/main/upload">
              SUBE TU FOTO
            </a>
          </li>
          <li onClick={closeMobileMenu}>
            <a className="link-navbar" href="/main/faq">
              PREGUNTAS FRECUENTES
            </a>
          </li>

          <li className="option mobile-option" onClick={closeMobileMenu}>
            <Link className="navbar__shopping-cart-icon" to="/main/cart">
              <div style={{ display: "flex", color: "white" }}>
                <i
                  className="fas fa-shopping-cart"
                  style={{
                    fontSize: 30,
                  }}
                ></i>
                <p className="navbar__total">{total}</p>
              </div>
            </Link>
          </li>
          {JSON.stringify(firebaseInfo) == "{}" ? (
            <li className="option mobile-option" onClick={closeMobileMenu}>
              <a href="/auth/login" className="link-navbar">
                INICIAR SESIÓN
              </a>
            </li>
          ) : (
            null
          )}

          {JSON.stringify(firebaseInfo) == "{}" ? (
            null
          ) : (
            <div>
              <li className="option mobile-option" onClick={closeMobileMenu}>
                <a className="link-navbar" href={pathHistory}>
                  HISTORIAL
                </a>
              </li>
              <li className="option mobile-option" onClick={closeMobileMenu}>
                <p onClick={handleLogOut} className="link-navbar">
                  <a href="/auth/login">SALIR</a>
                </p>
              </li>
            </div>
          )}
        </ul>
      </div>
      <ul className="signin-up">
        <li className="sign-in" onClick={closeMobileMenu}>
          <form style={{ display: "flex" }} onSubmit={() => history.push('/main/search')}>
            <input
              onChange={(e) => handleSearchBar(e.target.value)}
              name="search"
              className="navbar__search-input"
              type="text"
              placeholder="Buscar..."
            />
            <button className="navbar__search-button" type="button">
              <Link className="navbar__shopping-cart-icon" to="/main/search">
                <i className="fas fa-search"></i>
              </Link>
            </button>
          </form>
        </li>
        <li>
          <Link className="navbar__shopping-cart-icon" to="/main/cart">
            <div style={{ display: "flex" }}>
              <i
                className="fas fa-shopping-cart"
                style={{
                  fontSize: 30,
                }}
              ></i>
              <p className="navbar__total">{total}</p>
            </div>
          </Link>
        </li>
        {JSON.stringify(firebaseInfo) == "{}" ? (
          <li onClick={closeMobileMenu}>
            <a
              style={{ color: "#21AB91" }}
              className="link-navbar"
              href="/auth/login"
            >
              LOG IN
            </a>
          </li>
        ) : (
          <div></div>
        )}

        {JSON.stringify(firebaseInfo) == "{}" ? (
          <div></div>
        ) : (
          <div style={{ display: "flex" }}>
            <li>
              <a className="link-navbar" href={pathHistory}>
                HISTORIAL
              </a>
            </li>
            <li style={{ marginLeft: 10 }} onClick={closeMobileMenu}>
              <p onClick={handleLogOut} className="link-navbar">
                <a
                  style={{ color: "#EC7063" }}
                  className="link-navbar"
                  href="/auth/login"
                >
                  SALIR
                </a>
              </p>
            </li>
          </div>
        )}
      </ul>
      <div className="mobile-menu" onClick={handleClick}>
        {click ? (
          <CloseMenu className="menu-icon" />
        ) : (
          <MenuIcon className="menu-icon" />
        )}
      </div>
    </div>
  );
};
