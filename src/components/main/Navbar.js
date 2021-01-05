import React from 'react'
import {useDispatch} from "react-redux"
import { startLogout } from '../../actions/auth';
import logo from '../../assets/img/logo.png';
export const Navbar = () => {

    const dispatch = useDispatch();

    const handleLogOut = () =>{
        dispatch( startLogout());
    }

    return (
        <div className="navbar__main-container">
            <a href="/main/home">
                <img alt="logo" src={logo}/>
            </a>
            <div className="navbar__righ-container">
                <a className="link-navbar" href="/main/most-selled">MAS VENDIDOS</a>
                <a className="link-navbar" href="/main/themes">TEMAS</a>
                <a className="link-navbar" href="/main/upload">SUBE TU FOTO</a>
                <a className="link-navbar" href="/main/faq">PREGUNTAS FRECUENTES</a>
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
                <a className="link-navbar" href="/auth/login">LOG IN</a>
                <a onClick={handleLogOut} className="link-navbar" href="">LOG OUT</a>
                
            </div>
        </div>
    )
}
