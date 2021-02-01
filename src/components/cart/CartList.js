import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { addQuantity, removeItem, subtractQuantity } from '../../actions/cart';
import cartImage from '../../assets/img/emptycart.png';
import { Link } from 'react-router-dom'

export const CartList = () => {

    const dispatch = useDispatch();
    const {addedItems} = useSelector(state => state.cart)

    const handleAddClick = (id) =>{
        dispatch(addQuantity(id));
    }
    
    const handleSubClick = (id) =>{
        dispatch(subtractQuantity(id));
    }

    const handleRemoveItemClick = (id) => {
        dispatch(removeItem(id));
    }

    return (
        <div>
             {   
                addedItems.length > 0 ?
                    addedItems.map((item )=>{
                        // animate__animated animate__fadeInUp
                        return(
                            <li className="cart__list-container" key={item.id}>
                                <div className="cart__img-container">
                                    <img 
                                        className="cart__item-image"
                                        src={item.image_url} 
                                        alt={item.image_url}
                                    />
                                </div>
                                <div className="cart__item-desc">
                                    <span className="cart__item-title">{item.name}</span>
                                    <p>{item.description}</p>
                                    <p>
                                        <b>{`Price: $${item.price}`}</b>
                                    </p>
                                    <p>
                                        <b>Cantidad: {item.quantity}</b>    
                                    </p>
                                    <div className="cart__icons-container">
                                        <i onClick={()=>handleAddClick(item.id)} className="fas fa-angle-up cart__icons"></i>
                                        <i onClick={()=>handleSubClick(item.id)} className="fas fa-angle-down cart__icons"></i>
                                        <i onClick={()=>handleRemoveItemClick(item.id)} className="fas fa-trash-alt cart__icons delete"></i>
                                    </div>

                                </div>
                            </li>   
                        )
                    })
                 :  
                    <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                        <img className="carrito-image" src={cartImage} alt="empty cart"/>
                        <Link className="cart__checkout-link" to="/main/themes">
                            <button className="checkout-button mb-5">Regresar a comprar!</button>
                        </Link>
                    </div>
                    
            }
        </div>
    )
}
