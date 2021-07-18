import React,{useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { addQuantity, changeTotal, removeItem, subtractQuantity } from '../../actions/cart';
import cartImage from '../../assets/img/emptycart.jpeg';
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';

export const CartList = () => {

    const dispatch = useDispatch();
    const {addedItems} = useSelector(state => state.cart)

    const handleAddClick = (id) =>{
        //const item = addedItems.filter(cuadro => cuadro.id == id);
        dispatch(addQuantity(id));   
    }
    
    const handleSubClick = (id) =>{
        dispatch(subtractQuantity(id));
    }

    const handleRemoveItemClick = (id) => {
        dispatch(removeItem(id));
    }
    useEffect(() => {
        if(addedItems.length == 0){
            dispatch( (changeTotal(0)) );
        }
    }, [addedItems])

    return (
        <div className="animate__animated animate__fadeIn">
             {   
                addedItems.length > 0 ?
                    addedItems.map((item )=>{
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
                                    <div style={{display: 'flex', width: 300, justifyContent: 'space-between'}}>
                                        <div>
                                            <p>
                                                <b>Precio: <span style={{color:"#21AB91"}}>{`$${item.price}`}</span></b>
                                            </p>
                                            <p>
                                                <b>Cantidad: <span style={{color:"#21AB91"}}>{`${item.quantity}`}</span></b>    
                                            </p>
                                        </div>
                                        <div>
                                            <p>
                                                <b>Medidas: <span style={{color:"#21AB91"}}>{`${item.medidas}`}</span></b>    
                                            </p>
                                            <p>
                                                <b>Material: <span style={{color:"#21AB91"}}>{`${item.material}`}</span></b>    
                                            </p>
                                        </div>
                                    </div>
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
                        <h3 className="cart-empty-message">Carro vacío</h3>
                       <Link className="cart__checkout-link" to="/main/themes">
                            <button className="checkout-button mb-5">Regresar a comprar</button>
                        </Link>
                    </div>
                    
            }
        </div>
    )
}
