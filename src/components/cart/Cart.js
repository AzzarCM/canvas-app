import React from 'react'
import { Navbar } from '../main/Navbar'
import {useSelector, useDispatch} from 'react-redux'
import { addQuantity, removeItem, subtractQuantity } from '../../actions/cart';

export const Cart = () => {
    const dispatch = useDispatch();
    const {addedItems, total} = useSelector(state => state.cart)
    
    console.log(addedItems);

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
        <div className="home__main-container">
            <Navbar/>
            {   
                addedItems.length > 0 ?
                    addedItems.map((item )=>{
                        return(
                            <li className="cart__list-container" key={item.id}>
                                <div>
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
                    <h1>Nada en el carrito</h1>  
            }
            <h2>Recibo</h2>
            {total.toFixed(2)}
        </div>
    )
}
