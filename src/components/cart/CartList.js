import React,{useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { addQuantity, changeTotal, removeItem, subtractQuantity } from '../../actions/cart';
import cartImage from '../../assets/img/emptycart.jpeg';
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import { TableCart } from './TableCart';

export const CartList = () => {

    const dispatch = useDispatch();
    const {addedItems} = useSelector(state => state.cart)

    useEffect(() => {
        if(addedItems.length == 0){
            dispatch( (changeTotal(0)) );
        }
    }, [addedItems])

    return (
        <div className="animate__animated animate__fadeIn" style={{ display: 'flex', width: '100%', justifyContent: 'center'}}>
             {   
                addedItems.length > 0 ?
                    (<TableCart addedItems={addedItems} />)
                 :  
                    <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                        <img className="carrito-image" src={cartImage} alt="empty cart"/>
                        <h3 className="cart-empty-message">Carro vacío</h3>
                       <Link className="cart__checkout-link" to="/main/themes">
                            <button className="checkout-button mb-5">Regresar a comprar</button>
                        </Link>
                    </div>
            }
        </div>
    )
}
