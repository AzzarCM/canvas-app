import React from 'react'
import logo from '../../assets/img/logo.png';
export const Navbar = () => {
    return (
        <div className="navbar__main-container">
            <img alt="logo" src={logo}/>
            <div className="navbar__righ-container">
                <a className="link-navbar" href="/main/mas-vendidos">Mas Vendidos</a>
                <a className="link-navbar" href="/main/mas-vendidos">Temas</a>
                <a className="link-navbar" href="/main/mas-vendidos">Sube tu foto</a>
                <a className="link-navbar" href="/main/mas-vendidos">Preguntas frecuentes</a>
                <div>
                    <input className="navbar__search-input" type="text" placeholder="Search something"/>
                    <button className="navbar__search-button" type="button">
                        <i className="fas fa-search"></i>
                    </button>
                </div>
                <button className="navbar__search-button">
                    <i 
                        className="fas fa-shopping-cart"
                        style={{
                            fontSize: 30
                        }}
                    ></i>
                </button>
                
            </div>
        </div>
    )
}
