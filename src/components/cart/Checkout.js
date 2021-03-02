import React, { useEffect, useState } from 'react'
import { Navbar } from '../main/Navbar'
import { CartList } from './CartList'
import { useSelector, useDispatch } from 'react-redux'
import {useForm} from '../../hooks/useForm'
import firebase from "firebase/app";
import { emptyCart } from '../../actions/cart'
import Swal from 'sweetalert2'
import validator from "validator";
import { removeError, setError } from '../../actions/ui'
import { Footer } from '../main/Footer'
import errorImg from '../../assets/img/error.png'
import doneImg from '../../assets/img/done.png'
import wompi from '../../assets/img/wompi.png'
import { API_HOST } from '../../constants/URLS'


export const Checkout = () => {
    
    const monthNames = ["Enero", "Febrero", "Marzo", "April", "Mayo", "Junio",
    "Julio", "Augosto", "Septiembre", "Octubre", "Noviembre", "Deciembre"
    ];
    const dayNames = ["Domingo", "Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"];

    //constants from firebasse
    var uid = firebase.auth().currentUser.uid;
    var name = firebase.auth().currentUser.displayName;
    var mail = firebase.auth().currentUser.email;
    

    
    //redux variables
    const dispatch = useDispatch();
    const {msgError} = useSelector( state => state.ui);
    const {total, addedItems} = useSelector(state => state.cart)
   

    //useStates

    var today = new Date();
    var tresDias = new Date();
    var cincoDias = new Date();

    tresDias.setDate(today.getDate() + 3);
    cincoDias.setDate(today.getDate() + 5);
   
    const [zones, setZones] = useState([]);
    const [zoneSelected, setZoneSelected] = useState(0);
    const [zoneName, setZoneName] = useState('');
    const [errorMessage, setErrorMessage] = useState('campos vacios');
    const [totalPlusShipping, setTotalPlusShipping] = useState(0);

    const zoneIdAux = zoneName.split("-");

    //console.log(zoneId[0], 'soy zoneid');
    var zoneId = zoneIdAux[0];

    //valores del formulario e informacion del cliente
    const [ formValues, handleInputChange ] = useForm({
        customer_name: name,
        email: mail,
        customer_phone: '',
        delivery_address: '',
        customer_uid: uid,
        delivery_zone_id: zoneId,
        instructions:'',
    });

    //Valores de la tarjeta de credito
    const [ cardValues, handleInputCardChange ] = useForm({
        numeroTarjeta: '',
        mesVencimiento: '',
        anioVencimiento: '',
        cvv: '',
    })

    //var totalWithShipping = (total + parseFloat(zoneSelected)).toFixed(2);
    useEffect(() => {
        setTotalPlusShipping((total + parseFloat(zoneSelected)).toFixed(2))

    }, [formValues, cardValues, handleInputCardChange])
    
    useEffect(() => {
        getAllZones();
    }, [])

    const getAllZones = async () => {
        const url = `${API_HOST}/delivery-zones`
        var idToken = localStorage.getItem("idToken")
        const resp = await fetch(url,{
            headers:{
                "Authorization": 'Bearer ' + idToken,
            }
        })
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

    const { customer_name, email,customer_phone, delivery_address,delivery_zone_id } = formValues;
    const {numeroTarjeta,cvv, mesVencimiento, anioVencimiento} = cardValues
    formValues.delivery_zone_id = parseFloat(zoneId);
    formValues.total_amount = parseFloat(totalPlusShipping);


    useEffect(() => {
        isFormValuesValid()
    }, [cardValues,formValues]);

    function isFormValuesValid() {
        if(validator.isEmpty(customer_name)){
            setErrorMessage("El campo del nombre esta vacio")
            return false
        }else if(validator.isEmpty(email)){
            setErrorMessage("El campo del correo esta vacio")
            return false
        }else if(validator.isEmpty(customer_phone)){
            setErrorMessage("El campo del telefono esta vacio")
            return false
        }else if(validator.isEmpty(delivery_address)){
            setErrorMessage("El campo de la direccion esta vacio")
            return false
        }else if(isNaN(delivery_zone_id)){
            setErrorMessage("Necesita seleccionar una zona de envio")
            return false
        }else if(!validator.isCreditCard(numeroTarjeta)){
            setErrorMessage("El numero de tarjeta proporcionado no concuerda con VISA o MasterCard")
            return false
        }else if(validator.isEmpty(cvv)){
            setErrorMessage("El CVV esta vacio");
            return false;
        }else if(validator.isEmpty(mesVencimiento)){
            setErrorMessage("El mes de la tarjeta esta vacio")
            return false;
        }else if(validator.isEmpty(anioVencimiento)){
            setErrorMessage("El año esta vacio")
            return false
        }else if(!validator.isLength(mesVencimiento,2,2)){
            setErrorMessage("el mes debe de tener 2 numeros")
            return false
        }else if(!validator.isLength(anioVencimiento,4,4)){
            setErrorMessage("El año debe tener 4 numeros")
            return false
        }else if(!validator.isLength(cvv,3,3)){
            setErrorMessage("El cvv debe de tener 3 numeros")
            return false
        }
        dispatch(removeError());
        return true
    }
    console.log(validator.isLength(mesVencimiento,2,2));

    const handleSubmitData = () =>{

        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken){
            if(isFormValuesValid()){
                const data = {
                    ...formValues,
                    cardData: cardValues,
                    detail: item,
                };
                console.log(data);
                Swal.fire({
                    title: 'Seguro que desea proceder?',
                    confirmButtonText: 'Si, seguro!',
                    showLoaderOnConfirm: true,
                    showDenyButton: true,
                    preConfirm: () =>{
                        const url = `${API_HOST}/orders`
                        return   fetch(url,{
                            method: "POST",
                            headers: {
                                "Content-type": "application/json",
                                "Authorization": 'Bearer ' + idToken,
                            },
                            body: JSON.stringify(data),
                        })
                        .then((res)=>res.json())
                        .then((resp)=>{
                            console.log(resp, 'esta es la respuesta');
                            if(!resp.error){
                                const path = `/main/history/${uid}`
                                Swal.fire({
                                    imageUrl: doneImg,
                                    title: 'Gracias!',
                                    html: '<p style="color:#42bda5;font-size: 35;">Excelente! Tu<br>compra ha sido<br>realizada con exito</p>',
                                    showConfirmButton:true,
                                    confirmButtonText: 'Entendido!',
                                    footer: `<a style="background-color: #42bda5; padding: 10px; border-radius: 5px; color: #fff" href="${path}">Ver Historial</a>`
                                })
                                dispatch(emptyCart());
                                setTotalPlusShipping(0);
                                setZoneSelected(0);
                                console.log("posteado con exito");
                            }else{
                                Swal.fire({
                                    imageUrl: errorImg,
                                    html: '<p style="color:#42bda5;font-size: 35;">Ops! Parece <br> que tu compra <br> no ha sido procesada</p>',
                                    showConfirmButton: true,
                                    confirmButtonText: 'Ver detalles'
                                })
                                .then((result)=>{
                                    if(result.isConfirmed){
                                        Swal.fire({
                                            html:`<pre><code>${resp.message}</code></pre>`
                                        })
                                    }
                                })
                            }
                        });
                    }
                })
            }else{
    
                Swal.fire({
                    icon: 'error',
                    text: 'Hubo un error en los campos',
                    confirmButtonText: 'Ver Detalles'
                })
                .then((result)=>{
                    if(result.isConfirmed){
                        Swal.fire({
                            html:`<pre><code>${errorMessage}</code></pre>`
                        })
                    }
                })
            }
        })
        .catch(function(error) {
            // Handle error
            console.log("hubo un error con la autorizacion bearer", error);
          });

    }

    return (
        <div className="home__main-container animate__animated animate__fadeIn">
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
                <label>Zona <span style={{color: 'red'}}>*</span></label>
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
                <div className="input-with-icon mt-5">
                    <i className="fas fa-asterisk icon"></i>
                    <textarea 
                        className="text-area-direccion"
                        type="text"
                        name="instructions" 
                        placeholder="Instrucciones para realizar la entrega"
                        onChange={ handleInputChange }
                    />
                </div>
                
                <h2 className="temas__title-busqueda mb-5 mt-5">Informacion de pago</h2>
                <img src={wompi} alt="wompi" style={{width: 200}}/>
                <div>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <div className="input-with-icon">
                            <i className="fas fa-credit-card icon"></i>
                            <input 
                                className="input-number-card" 
                                type="text" 
                                placeholder="Numero Tarjeta" 
                                name="numeroTarjeta" 
                                onChange={ handleInputCardChange }
                            />
                        </div>
                        <div style={{display: 'flex', marginBottom: 15}}>
                            <i className="fas fa-user icon"></i>
                            <input 
                                className="input-number-card" 
                                type="text"
                                placeholder="Nombre Tarjetahabiente"
                            />
                        </div> 
                    </div>
                    <div style={{display: 'flex'}}>
                        <div className="inputs-container-foot">
                            <i className="fas fa-calendar-day icon"></i>
                            <input 
                                className="input__card-field" 
                                type="number" 
                                placeholder="MM"
                                name="mesVencimiento"
                                onChange={ handleInputCardChange }
                            />
                        </div>
                        <div className="inputs-container-foot">
                            <i className="far fa-calendar icon"></i>
                            <input 
                                className="input__card-field" 
                                type="number" 
                                placeholder="YYYY"
                                name="anioVencimiento"
                                onChange={ handleInputCardChange }
                            />
                        </div>
                        
                    </div>
                    <div style={{width: "50%", marginTop:"1rem"}} className="inputs-container-foot">
                            <i className="fas fa-lock icon"></i>
                            <input 
                                className="input__card-field" 
                                type="number" 
                                placeholder="CVC"
                                name="cvv"
                                onChange={ handleInputCardChange }

                            />
                    </div>   
                </div>
            </form>
           

            <h1 className="selled__title-related mb-5">Resumen de la compra</h1>
            <p>{`NOTA: la entrega estimada seria entre el ${dayNames[tresDias.getDay()]} ${tresDias.getDate()} de ${monthNames[tresDias.getMonth()]} al  ${dayNames[cincoDias.getDay()]} ${cincoDias.getDate()} de ${monthNames[cincoDias.getMonth()]}`}</p>
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
                        <p className="cart__total-color">{`$${totalPlusShipping}`}</p>
                    </div>
                    <button onClick={handleSubmitData} className="checkout-button" type="submit">Confirmar compra</button>
                </div>
                
            </div>
            <Footer/>
        </div>
        
    )
}
