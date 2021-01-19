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
            <h2>Recibo</h2>
            {total.toFixed(2)}

            <Link className="cart__checkout-link" to="/main/checkout">Pagar</Link>
        </div>
    )
}
