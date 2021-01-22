import React, {useState, useEffect} from 'react'
import {Navbar} from "../main/Navbar";
import {Footer} from "../main/Footer"
import {
    useParams
  } from "react-router-dom";
import checkbox from "../../assets/img/checkbox.png";
import tarjeta from "../../assets/img/tarjeta.png";
import {Relacionados} from "./Relacionados"

import { useDispatch } from "react-redux"
import { addToCart } from '../../actions/cart'
import Swal from 'sweetalert2'


export const TemasScreen = () => {

    const dispatch = useDispatch();
    let {id} = useParams();
    const [imagen, setImagen] = useState([]);
    const [banderaMat, setBanderaMat] = useState(false);
    
    // const [materialSelected, setMaterialSelected] = useState('');
    // const [materials, setMaterials] = useState([]);

    useEffect(() => {
        getImagen();
    }, [])

    const getImagen = async () =>{
        const url = `https://canvas-api-rest.herokuapp.com/api/paintings/${id}`;
        const resp = await fetch(url)
        
        const {painting_info} = await resp.json();
        
        const infoImage = painting_info.map( img =>{
            return {
                id: img.id,
                name: img.name,
                url: img.image_url,
                descripcion: img.description,
                materials: img.materials
            }
        })
        setImagen(infoImage);
        setBanderaMat(true);
     }

    const handleClick = () =>{
        console.log(id);
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Agregado al carrito!',
            showConfirmButton: true,
          })
        dispatch(addToCart(id, 30));
    }

    //console.log(imagen);
    //console.log(materials);
    return (
        <div className="home__main-container">
            <Navbar/>
            <div className="temas__tema-container animate__animated animate__fadeInLeft">
                <div className="temas__image-container">
                    {imagen.map( img =>{
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
                    {imagen.map( item =>{
                        return (
                            <h1 
                            key={item.id}
                            className="temas__info-h1">
                            {item.name}
                            </h1>
                        )
                    })}

                    {imagen.map( item =>{
                        return (
                            <p 
                            key={item.id}
                            className="temas__info-p">
                                {item.descripcion}
                            </p>
                        )
                    })}
                   
                    <div className="temas__materiales">
                        <select>
                            {
                                banderaMat ?
                                imagen[0].materials.map((material)=>{
                                    return(
                                        <option key={material.id}>{material.name}</option>
                                    )
                                })
                                : <option>No hay materiales</option>
                            }
                        </select>
                        <h4 className="temas__btn-title">Material</h4>
                        <button className="temas-btn">Acrílico</button>
                        <button className="temas-btn">Carbón</button>
                    </div>
                    {
                        imagen.map((item)=>{
                            return (
                                <p style={{fontSize: 25, marginTop: 10}} key={item.id}>
                                    {`$${item.price}`}
                                </p>
                            )
                        })
                    }
                </div>
            </div>
            <div className="temas__buy-container">

                <div className="temas__empty-space"></div>
                <div>
                    <img alt="imagen" src={tarjeta}/>
                    <p style={{fontSize: 24}}>
                        Querido usuario de <br/>
                        Canvas,tomamos <br/>
                        este espacio para <br/>
                        acordarte que tus  <br/>
                        compras siempre  <br/>
                        estan aseguradas y  <br/>
                        tiene su respectiva  <br/>
                        garantía. <br/>
                        <br/>
                        ¡Agradecemos tu <br/>
                        preferencia!
                    </p>
                </div>
                <div className="temas__buy-container-right">
                    {/* {<div className="temas__div-cantidad">
                        <p style={{
                            fontSize: 25,
                            marginRight: 20
                        }}>
                            Cantidad: 
                        </p>
                        <input 
                            className="temas__input-cantidad"
                            type="number" 
                            max="10"
                            step="1" 
                            min="1"/>
                    </div>} */}
                    <button onClick={handleClick} className="temas-btn-carrito">
                        <i 
                            className="fas fa-shopping-cart"></i>
                         Agregar al carrito
                    </button>
                    <button className="temas-btn-carrito resize">
                        <i className="fas fa-arrow-up"></i>
                        Comprar
                    </button>
                </div>
            </div>
            <h1>Relacionados</h1>
            <Relacionados/>
            <Footer/>
        </div>
    )
}
