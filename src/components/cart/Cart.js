import React from 'react'
import { Navbar } from '../main/Navbar'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { CartList } from './CartList'
import { SearchBar } from '../search/SearchBar'
import Swal from 'sweetalert2'

export const Cart = () => {

    const {total} = useSelector(state => state.cart)
    const authState = useSelector(state => state.auth)

    const handleClick = () =>{
        Swal.fire({
            icon: 'warning',
            title: 'Atencion',
            text: 'Debes estar logueado primero!',
            showConfirmButton: false,
            footer: '<a style="background-color: #42bda5; padding: 10px; border-radius: 5px; color: #fff" href="/auth/login">Iniciar Sesion</a>',
        })
    }

    return (
        <div className="home__main-container animate__animated animate__fadeIn">
            <Navbar/>
            <SearchBar/>
            <CartList/>
            <h2 className="temas__title-busqueda mt-5" >Sub Total</h2>
            <p style={{fontSize: 25}}>{`$${total}`}</p>
            {
                JSON.stringify(authState)=='{}' ?
                <button onClick={handleClick} style={{padding: 10}} className="checkout-button mb-5">pagar</button>
                :
                <Link className="cart__checkout-link" to="/main/checkout">
                    <button className="checkout-button mb-5">PAGAR</button>
                </Link>
            }
           
        </div>
    )
}
