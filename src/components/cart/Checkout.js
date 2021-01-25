import React, { useEffect, useState } from 'react'
import { Navbar } from '../main/Navbar'
import { CartList } from './CartList'
import { useSelector } from 'react-redux'
import {useForm} from '../../hooks/useForm'
import firebase from "firebase/app";

export const Checkout = () => {
    
    var uid = firebase.auth().currentUser.uid;
    var name = firebase.auth().currentUser.displayName;
    var mail = firebase.auth().currentUser.email;
   

    const {total, addedItems} = useSelector(state => state.cart)
    const [zones, setZones] = useState([]);
    const [zoneSelected, setZoneSelected] = useState(0);
    const [zoneName, setZoneName] = useState('');
    const [inputVencimiento, setInputVencimiento] = useState('');
    
    const zoneIdAux = zoneName.split("-");
    const inputSplited = inputVencimiento.split("/");

    var mes = inputSplited[0];
    var anio = inputSplited[1];

    //console.log(zoneId[0], 'soy zoneid');
    var zoneId = zoneIdAux[0];
    console.log(zoneId,'soy zone ID');
    //valores del formulario e informacion del cliente
    const [ formValues, handleInputChange ] = useForm({
        customer_name: name,
        email: mail,
        customer_phone: '222',
        delivery_address: '',
        customer_uid: uid,
        delivery_zone_id: zoneId,
    });

    //Valores de la tarjeta de credito
    const [ cardValues, handleInputCardChange ] = useForm({
        card_number: '',
        on_card_name: '',
        mesVencimiento: mes,
        anioVencimiento: anio,
        card_cvc: '',
    })

    const totalWithShipping = (total + parseFloat(zoneSelected)).toFixed(2);


    useEffect(() => {
        getAllZones();
    }, [])

    const getAllZones = async () => {
        const url = "https://api-rest-canvas.herokuapp.com/api/delivery-zones";
        const resp = await fetch(url)
        const { delivery_zones } = await resp.json();
        const zonas = delivery_zones.map((item)=>{
            return {
                id: item.id,
                name: item.name,
                delivery_price: item.delivery_cost,
                active: item.active,
            }
        })
        setZones(zonas)
    }

    const handleDropDownChange = (e) =>{

        setZoneSelected(e.target.value)
        setZoneName(e.target.options[e.target.selectedIndex].text)

    }

    const handleExpireDate = (e) =>{
        setInputVencimiento(e.target.value);
    }


    const cuadros = () =>{
        addedItems.map((item)=>{
            return {
                paintingId: item.id,
                material_id: item.material_id,
                measurements: item.medidas,
                price: item.price,
                quantity: item.quantity,
            }
        })
        console.log(cuadros);
    } 

    const item = addedItems.map((item)=>{
        return {
            paintingId: item.id,
            material_id: item.material_id,
            measurements: item.medidas,
            price: item.price,
            quantity: item.quantity,
        }
    })

    const { customer_name, email,customer_phone  } = formValues;

    formValues.delivery_zone_id = parseFloat(zoneId);
    formValues.total_amount = parseFloat(totalWithShipping);
    cardValues.mesVencimiento = parseInt(mes);
    cardValues.anioVencimiento = parseInt(anio);

    const data = [{
        cardData: cardValues,
        custumerData: formValues,
        detail: item,
    }]

    console.log(data, 'soy data');

    return (
        <div className="home__main-container">
            <Navbar/>
            <form>
                <h2 className="temas__title-busqueda mb-5 mt-5">Informacion del cliente</h2>
                <div className="input-container">
                    <label>Nombre <span style={{color: 'red'}}>*</span></label>
                    <div className="input-with-icon">
                        <i className="fas fa-user icon"></i>
                        <input  
                            className="input-number-card"
                            type="text"
                            name="customer_name" 
                            placeholder="Nombre"
                            value={ customer_name }
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
                            name="customer_phone" 
                            placeholder="Numero telefonico"
                            value={ customer_phone }
                            onChange={ handleInputChange }
                        />
                    </div>
                </div>
                   
                   
                <h2 className="temas__title-busqueda mb-5 mt-5">Informacion de la entrega</h2>
                <select
                    defaultValue=""
                    className="cart__select-zones"
                    onChange={handleDropDownChange}
                >
                    <option  selected disabled hidden>Zonas de Envio</option>
                    {zones.map((item)=>{
                        return  (
                        <option
                            key={item.id} 
                            value={item.delivery_price}
                            
                        >
                           {item.id} {`- ${item.name}`} {`$${item.delivery_price}`}
                        </option>
                        )
                    })}
                </select>
                <div className="input-with-icon mt-5">
                    <i className="fas fa-map-marked-alt icon"></i>
                    <textarea 
                        className="text-area-direccion"
                        type="text"
                        name="delivery_address" 
                        placeholder="Direccion de envio"
                        onChange={ handleInputChange }
                    />
                </div>
                
                <h2 className="temas__title-busqueda mb-5 mt-5">Informacion de pago</h2>
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
                                onChange={ handleExpireDate }
                            />
                        </div>
                        <div className="inputs-container-foot">
                            <i className="fas fa-lock icon"></i>
                            <input 
                                className="input__card-field" 
                                type="number" 
                                placeholder="CVC"
                                name="card_cvc"
                                onChange={ handleInputCardChange }

                            />
                        </div>   
                    </div>
                </div>
            </form>
           

            <h2 className="temas__title-busqueda mb-5 mt-5">Resumen de la compra</h2>
            <CartList/>
            <div className="cart__container-total">
                <div className="cart__container-divs-total">
                    <div className="cart__horizontal-total">
                        <p className="cart__p-align">Sub Total</p>
                        <p>{`$${total}`}</p>
                    </div>
                    <div className="cart__horizontal-total">
                        <p className="cart__p-align">Costo de envio</p>
                        <p>{`$${zoneSelected}`}</p>
                    </div>
                    <div className="cart__horizontal-total">
                        <p className="cart__p-align">Total</p>
                        <p className="cart__total-color">{`$${totalWithShipping}`}</p>
                    </div>
                    <button className="checkout-button" type="submit">Confirmar compra</button>
                </div>
                
            </div>
        </div>
    )
}
