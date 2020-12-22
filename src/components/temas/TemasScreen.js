import React from 'react'
import {Navbar} from "../main/Navbar";
import {Footer} from "../main/Footer"

import tema from "../../assets/img/temas.png";
import checkbox from "../../assets/img/checkbox.png";
import tarjeta from "../../assets/img/tarjeta.png";
import {Relacionados} from "./Relacionados"

export const TemasScreen = () => {
    return (
        <div className="home__main-container">
            <Navbar/>
            <div className="temas__tema-container">
                <div>
                    <img alt="imagen" src={tema}/>
                    <div className="temas__garantia">
                        <img alt="imagen" src={checkbox}/>
                        <p className="temas__garantia-p">
                            Garantía de 30 días, lo cambiamos o regresamos tu dinero.
                        </p>
                    </div>
                </div>
                <div className="temas__info-container">
                    <h1 className="temas__info-h1">
                        UNA NOCHE<br/>
                        EN EL CAMPO
                    </h1>
                    <p className="temas__info-p"> 
                        Reprehenderit mollit reprehenderit amet amet culpa tempor id. Occaecat 
                        consequat nostrud Lorem consectetur adipisicing eiusmod excepteur ex 
                        velit id nulla. Quis ullamco deserunt sit quis dolore amet Lorem veniam. 
                        Pariatur ut labore elit ea sunt nisi officia nisi adipisicing ex in.
                    </p>
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
                    <button className="temas-btn-carrito">
                        <i className="fas fa-shopping-cart"></i>
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
