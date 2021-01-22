import React from 'react'
import { Navbar } from '../main/Navbar'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { CartList } from './CartList'

export const Cart = () => {

    const {total} = useSelector(state => state.cart)

    return (
        <div className="home__main-container">
            <Navbar/>
            <CartList/>
            <h2 className="temas__title-busqueda mt-5" >Sub Total</h2>
            <p style={{fontSize: 25}}>{`$${total}`}</p>

            <Link className="cart__checkout-link" to="/main/checkout">
                <button className="checkout-button mb-5">pagar</button>
            </Link>
        </div>
    )
}
