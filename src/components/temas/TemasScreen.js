import React, {useState, useEffect} from 'react'
import {Navbar} from "../main/Navbar";
import {Footer} from "../main/Footer"
import {
    useParams
  } from "react-router-dom";
import checkbox from "../../assets/img/checkbox.png";
import tarjeta from "../../assets/img/tarjeta.png";
import {Relacionados} from "./Relacionados"

import { useDispatch, useSelector } from "react-redux"
import { addToCart } from '../../actions/cart'
import Swal from 'sweetalert2'


export const TemasScreen = () => {

    const authState = useSelector(state => state.auth);
    console.log(authState);
    var flag = false;
    const dispatch = useDispatch();
    let {id} = useParams();
    const [painting, setPainting] = useState([]);
    const [banderaMat, setBanderaMat] = useState(false);
    const [idMaterial, setIdMaterial] = useState(1);
    const [dimensions, setDimensions] = useState([]);
    const [banderaDim, setBanderaDim] = useState(false)
    const [medidas, setMedidas] = useState('')

    
    const [precio, setPrecio] = useState(0);
    const [material, setMaterial] = useState('');
    
    useEffect(() => {
        getPainting();
    }, [])

    const getPainting = async () =>{
        const url = `https://api-rest-canvas.herokuapp.com/api/paintings/${id}`;
        const resp = await fetch(url)
        
        const {painting_info} = await resp.json();
        
        const cuadro = painting_info.map( img =>{
            return {
                id: img.id,
                name: img.name,
                url: img.image_url,
                descripcion: img.description,
                materials: img.materials,
                measurements: img.measurements,
            }
        })
        setPainting(cuadro);
        setBanderaMat(true);
        setBanderaDim(true);
     }

    const handleClick = () =>{
        console.log(id);
        if(precio === 0 || material === '' || precio == 0){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Selecciona un material y su dimension!',
                showConfirmButton:true,
              });
        }
        // else if(JSON.stringify(authState)=='{}'){
        //     Swal.fire({
        //         icon: 'error',
        //         title: 'Oops...',
        //         text: 'Necesitas estar logueado!',
        //         showConfirmButton:true,
        //       });
        // }
        else{
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Agregado al carrito!',
                showConfirmButton: true,
              })
            dispatch(addToCart(id, precio, material,idMaterial,medidas));
        }
    }
    const handleDropDownChange = (e) =>{
        setIdMaterial(e.target.value)
        setMaterial(e.target.options[e.target.selectedIndex].text);
        setBanderaDim(true);
        
    }

    const handlePrice = (e) =>{
        setPrecio(e.target.value)
        setMedidas(e.target.options[e.target.selectedIndex].text);
    }

    
    if(banderaDim){
        const result = painting[0].measurements.filter(dim => dim.material_id == idMaterial);
        setDimensions(result);
        setBanderaDim(false);
        flag=true
    }

    console.log(idMaterial);

    return (
        <div className="home__main-container">
            <Navbar/>
            <div className="temas__tema-container animate__animated animate__fadeInLeft">
                <div className="temas__image-container">
                    {painting.map( img =>{
                        return(
                            <img 
                                alt="imagen" 
                                src={img.url}
                                key={img.id}
                                className="temas__imagen"
                            />
                        )
                    })}
                    <div className="temas__garantia">
                        <img alt="imagen" src={checkbox}/>
                        <p className="temas__garantia-p">
                            Garantía de 30 días, lo cambiamos o regresamos tu dinero.
                        </p>
                    </div>
                </div>
                <div className="temas__info-container">
                    {painting.map( item =>{
                        return (
                            <h1 
                            key={item.id}
                            className="temas__info-h1">
                            {item.name}
                            </h1>
                        )
                    })}

                    {painting.map( item =>{
                        return (
                            <p 
                            key={item.id}
                            className="temas__info-p">
                                {item.descripcion}
                            </p>
                        )
                    })}
                   
                    <div className="temas__materiales">
                        <div className="temas__width-select">
                            <h4 className="temas__btn-title">Material</h4>
                            <select
                                className="temas__width-select cart__select-zones"
                                onChange={handleDropDownChange}
                             >
                                <option value='' selected>Materiales</option>
                                {
                                    banderaMat ?
                                    painting[0].materials.map((material)=>{
                                        return(
                                            <option 
                                                key={material.id} 
                                                value={material.id}
                                            >
                                                {material.name}
                                            </option>
                                        )
                                    })
                                    : <option>No hay materiales</option>
                                }
                            </select>
                        </div>
                        <div className="temas__width-select">
                            <h4 className="temas__btn-title">Dimensiones</h4>
                            <select
                                className="temas__width-select cart__select-zones"
                                onChange={handlePrice}
                            >
                                <option value={0} selected>Dimensiones</option>
                                {
                                    dimensions.map((dim)=>{
                                        return (
                                            <option
                                                key={dim.id}
                                                value={dim.price} 
                                            >
                                                {`Alto: ${dim.height} Ancho: ${dim.width}`}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    {
                        precio == 0 ? 
                        <p className="temas__precio-cuadro">
                            {`Selecciona un material y dimension para conocer el precio $${precio}`}
                        </p> :
                        <p className="temas__precio-cuadro">
                        {`Precio del cuadro $${precio}`}
                        </p>
                    }
                
                        
                </div>
            </div>
            <div className="temas__buy-container">

                <div className="temas__empty-space">
                    <img className="imagen__tarjeta" alt="imagen" src={tarjeta}/>
                    <p style={{fontSize: 24}}>
                        Querido usuario de 
                        Canvas,tomamos 
                        este espacio para 
                        acordarte que tus 
                        compras siempre  
                        estan aseguradas y 
                        tiene su respectiva 
                        garantía.
                        ¡Agradecemos tu
                        preferencia!
                    </p>
                </div>
                <div>
                    
                </div>
                <div className="temas__buy-container-right">
                     {/* {{<div className="temas__div-cantidad">
                        <p style={{
                            fontSize: 25,
                            marginRight: 20
                        }}>
                            Cantidad: 
                        </p>
                        <input 
                            className="temas__input-cantidad"
                            type="number"
                            name="cantidad"
                            onChange={handleCantidad} 
                            max="10"
                            defaultValue="1"
                            step="1" 
                            min="1"/>
                    </div>}} */}
                    <button onClick={handleClick} className="temas-btn-carrito">
                        <i 
                            className="fas fa-shopping-cart"></i>
                         Agregar al carrito
                    </button>
                    {
                        JSON.stringify(authState)=='{}' ?
                        precio == 0 ? 
                        <a>
                            <button onClick={handleClick} className="temas-btn-carrito resize">
                                <i className="fas fa-arrow-up"></i>
                                Comprar
                            </button> 
                        </a> :
                         <a>
                         <button onClick={handleClick} className="temas-btn-carrito resize">
                             <i className="fas fa-arrow-up"></i>
                             Comprar
                         </button> 
                        </a> :
                        <a href="/main/checkout">
                            <button onClick={handleClick} className="temas-btn-carrito resize">
                                <i className="fas fa-arrow-up"></i>
                                Comprar
                            </button>
                        </a>
                    }
                   
                </div>
            </div>
            <h1>Relacionados</h1>
            <Relacionados/>
            <Footer/>
        </div>
    )
}
