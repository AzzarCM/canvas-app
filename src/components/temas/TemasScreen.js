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


export const TemasScreen = () => {

    const dispatch = useDispatch();
    let {id} = useParams();
    const [imagen, setImagen] = useState([])
    
    useEffect(() => {
        getImagen();
    }, [])

    const getImagen = async () =>{
        const url = `https://canvas-api-rest.herokuapp.com/api/paintings/${id}`;
        const resp = await fetch(url)
        
        const {painting} = await resp.json();
        const infoImage = painting.map( img =>{
            return {
                id: img.id,
                name: img.name,
                price: img.price,
                url: img.image_url,
                descripcion: img.description,
            }
        })
        setImagen(infoImage);
     }

    const handleClick = () =>{
        console.log(id);
        dispatch(addToCart(id));
    }


    return (
        <div className="home__main-container">
            <Navbar/>
            <div className="temas__tema-container">
                <div>
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
                        <h4 className="temas__btn-title">Material</h4>
                        <button className="temas-btn">Acrílico</button>
                        <button className="temas-btn">Carbón</button>
                    </div>
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
                    <div className="temas__div-cantidad">
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
                    </div>
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
