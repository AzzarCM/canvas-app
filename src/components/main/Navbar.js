import React,{useState} from 'react'
import {useDispatch, useSelector} from "react-redux"
import { startLogout } from '../../actions/auth';
import { Link } from 'react-router-dom'
import logo from '../../assets/img/logo.png';
import { ReactComponent as MenuIcon } from '../../assets/svg/menu.svg'
import { ReactComponent as CloseMenu } from '../../assets/svg/x.svg'
import { changeSearchText } from '../../actions/ui';
import firebase from "firebase/app";

export const Navbar = () => {
    
    const firebaseInfo = useSelector(state=> state.auth)
    var uid = firebaseInfo.uid
    // if(firebase.auth().currentUser){
    //   console.log("no esta logueado");
    // }else{
    //   var uid = firebase.auth().currentUser.uid;
    // }
    
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
    const pathHistory = `/main/history/${uid}`

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
                <a href="/auth/login" className="link-navbar">
                    LOG IN
                </a>
              </li>
              {
                JSON.stringify(firebaseInfo)=='{}'
                ? <div></div>
                :
                <div>
                  <li className="option mobile-option" onClick={closeMobileMenu}>
                    <p onClick={handleLogOut} className="link-navbar">
                        <a href="/auth/login">LOG OUT</a>
                    </p>
                  </li>
                  <li className="option mobile-option" onClick={closeMobileMenu}>
                    <a className="link-navbar" href={pathHistory}>
                      HISTORIAL
                    </a>
                  </li>
                </div>
              }
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
            <li onClick={closeMobileMenu}>  
              <a className="link-navbar" href="/auth/login">
                LOG IN
              </a>
            </li>
            {
              JSON.stringify(firebaseInfo)=='{}' 
              ? 
              <div></div>
              :
              <div>
              <li onClick={closeMobileMenu}>
                <p onClick={handleLogOut} className="link-navbar">
                    <a className="link-navbar" href="/auth/login">
                      LOG OUT
                    </a>
                </p>
              </li>
              <li>
                <a className="link-navbar" href={pathHistory}>
                  HISTORIAL
                </a>
              </li>
            </div>
            }
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


