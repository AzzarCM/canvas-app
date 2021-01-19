import React, { useEffect, useState } from 'react'
import { Navbar } from '../main/Navbar'
import { CartList } from './CartList'
import {useSelector} from 'react-redux'
import {useForm} from '../../hooks/useForm'

export const Checkout = () => {
    
    const {total} = useSelector(state => state.cart)
    const [zones, setZones] = useState([]);
    const [zoneSelected, setZoneSelected] = useState(0);
    const [zoneName, setZoneName] = useState('');

    const [ formValues, handleInputChange ] = useForm({
        fname: '',
        email: 'canvas@gmail.com',
        telefono: '2277777'
    });

    const [ cardValues, handleInputCardChange ] = useForm({
        card_number: '',
        on_card_name: '',
        card_expire_date: '',
        card_cvc: '',
    })

    useEffect(() => {
        getAllZones();
    }, [])

    const getAllZones = async () => {
        const url = "https://canvas-api-rest.herokuapp.com/api/delivery-zones";
        const resp = await fetch(url)
        const { delivery_zones } = await resp.json();
        const zonas = delivery_zones.map((item)=>{
            return {
                id: item.id,
                name: item.name,
                delivery_price: item.delivery_price,
                active: item.active,
            }
        })
        setZones(zonas)
    }

    
    
    

    const { fname, email, telefono } = formValues;

    const handleDropDownChange = (e) =>{
        setZoneSelected(e.target.value)
        setZoneName(e.target.options[e.target.selectedIndex].text)
    }

    return (
        <div className="home__main-container">
            <Navbar/>
            <form>
                <h2 className="temas__title-busqueda">Informacion del cliente</h2>
                <div className="input-container">
                    <label>Nombre <span style={{color: 'red'}}>*</span></label>
                    <div className="input-with-icon">
                        <i className="fas fa-user icon"></i>
                        <input  
                            className="input-number-card"
                            type="text"
                            name="fname" 
                            placeholder="Nombre"
                            value={ fname }
                            onChange={ handleInputChange }
                        />
                    </div>
                    
                </div>
                <div className="input-container">
                    <label>Correo Electronico <span style={{color: 'red'}}>*</span></label>
                    <div className="input-with-icon">
                        <i className="fas fa-envelope icon"></i>
                        <input 
                            className="input-number-card"
                            type="email"
                            name="email" 
                            placeholder="Correo Electronico"
                            value={ email }
                            onChange={ handleInputChange }
                        />
                    </div>
                   
                </div>
                <div className="input-container">
                    <label>Telefono <span style={{color: 'red'}}>*</span></label>
                    <div className="input-with-icon">
                        <i className="fas fa-phone icon"></i>
                        <input 
                            className="input-number-card"
                            type="text"
                            name="telefono" 
                            placeholder="Numero telefonico"
                            value={ telefono }
                            onChange={ handleInputChange }
                        />
                    </div>
                </div>
                   
                   
                <h2 className="temas__title-busqueda">Informacion de la entrega</h2>
                <select
                    className="cart__select-zones"
                    onChange={handleDropDownChange}
                >
                    <option defaultValue="" selected disabled hidden>Zonas de Envio</option>
                    {zones.map((item)=>{
                        return  (
                        <option
                            key={item.id} 
                            value={item.delivery_price}
                            
                        >
                            {item.name} {`($${item.delivery_price})`}
                        </option>
                        )
                    })}
                </select>
                
                <h2 className="temas__title-busqueda">Informacion de pago</h2>
                <div>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <div className="input-with-icon">
                            <i className="fas fa-credit-card icon"></i>
                            <input 
                                className="input-number-card" 
                                type="text" 
                                placeholder="Numero Tarjeta" 
                                name="card_number" 
                                onChange={ handleInputCardChange }
                            />
                        </div>
                        <div style={{display: 'flex', marginBottom: 15}}>
                            <i className="fas fa-user icon"></i>
                            <input 
                                className="input-number-card" 
                                type="text"
                                placeholder="Nombre Tarjetahabiente"
                                name="on_card_name"
                                onChange={ handleInputCardChange }
                            />
                        </div> 
                    </div>
                    <div style={{display: 'flex'}}>
                        <div className="inputs-container-foot">
                            <i className="far fa-calendar icon"></i>
                            <input 
                                className="input__card-field" 
                                type="text" 
                                placeholder="MM/YY"
                                name="card_expire_date"
                                onChange={ handleInputCardChange }
                            />
                        </div>
                        <div className="inputs-container-foot">
                            <i className="fas fa-lock icon"></i>
                            <input 
                                className="input__card-field" 
                                type="text" 
                                placeholder="CVC"
                                name="card_cvc"
                                onChange={ handleInputCardChange }

                            />
                        </div>   
                    </div>
                </div>
            </form>
           

            <h2 className="temas__title-busqueda">Resumen de la compra</h2>
            <CartList/>
            <div className="cart__container-total">
                <div className="cart__horizontal-total">
                    <p className="cart__p-align">Sub Total</p>
                    <p>{`$${total.toFixed(2)}`}</p>
                </div>
                <div className="cart__horizontal-total">
                    <p className="cart__p-align">Costo de envio</p>
                    <p>{`$${zoneSelected}`}</p>
                </div>
                <div className="cart__horizontal-total">
                    <p className="cart__p-align">Total</p>
                    <p>{`$${(total + parseFloat(zoneSelected)).toFixed(2)}`}</p>
                </div>
                <button type="submit">Confirmar compra</button>
            </div>
        </div>
    )
}
