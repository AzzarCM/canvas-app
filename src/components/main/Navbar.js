import React,{useState} from 'react'
import {useDispatch, useSelector} from "react-redux"
import { startLogout } from '../../actions/auth';
import { Link } from 'react-router-dom'
import logo from '../../assets/img/logo.png';
import { ReactComponent as MenuIcon } from '../../assets/svg/menu.svg'
import { ReactComponent as CloseMenu } from '../../assets/svg/x.svg'
import { changeSearchText } from '../../actions/ui';


export const Navbar = () => {
    
    const dispatch = useDispatch();
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
    const addedItems = useSelector(state => state.cart.addedItems);
        console.log(addedItems);
         var total = 0
       addedItems.map((item)=>{
            total += item.quantity
        })
    
    const handleLogOut = () =>{
        dispatch( startLogout());
    }

    const handleSearchBar = (text) =>{
        dispatch(changeSearchText(text));
    }

    return (
        <div className="header">
          <div className="logo-nav">
            <div className="logo-container">
                <a href="/main/home">
                    <img alt="logo" src={logo}/>
                </a>
            </div>
            <ul className={click ? "nav-options active" : "nav-options"}>
              <li onClick={closeMobileMenu}>
                <a className="link-navbar" href="/main/most-selled">MAS VENDIDOS</a>
              </li>
              <li onClick={closeMobileMenu}>
                <a className="link-navbar" href="/main/themes">TEMAS</a>
              </li>
              <li onClick={closeMobileMenu}>
                <a className="link-navbar" href="/main/upload">SUBE TU FOTO</a>
              </li>
              <li onClick={closeMobileMenu}>
                <a className="link-navbar" href="/main/faq">PREGUNTAS FRECUENTES</a>
              </li>
              
              <li className="option mobile-option" onClick={closeMobileMenu}>
                <Link
                        className="navbar__shopping-cart-icon" 
                        to="/main/cart">
                        <div style={{display:'flex', color:'white'}}>
                            <i
                            className="fas fa-shopping-cart"
                            style={{
                                fontSize: 30
                            }}
                            >
                            </i>
                            {total}
                        </div>  
                </Link>
              </li>
              <li className="option mobile-option" onClick={closeMobileMenu}>
                <p onClick={handleLogOut} className="link-navbar">
                    LOG OUT
                </p>
              </li>
            </ul>
          </div>
          <ul className="signin-up">
            <li className="sign-in" onClick={closeMobileMenu}>
            <div style={{display:'flex'}}>
                <input onChange={(e)=>handleSearchBar(e.target.value)} name="search" className="navbar__search-input" type="text" placeholder="Search something"/>
                <button className="navbar__search-button" type="button">
                    <i className="fas fa-search"></i>
                </button>
                </div>
            </li>
            <li>
                <Link
                    className="navbar__shopping-cart-icon" 
                    to="/main/cart">
                    <div style={{display:'flex'}}>
                        <i
                        className="fas fa-shopping-cart"
                        style={{
                            fontSize: 30
                        }}
                        >
                        </i>
                        {total}
                    </div>
                    
                </Link>
            </li>
            <li style={{marginLeft:10}} onClick={closeMobileMenu}>
              <p onClick={handleLogOut} className="link-navbar">
                LOG OUT
              </p>
            </li>
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
}


