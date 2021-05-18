import React from 'react'

//components

import { Footer } from './Footer';
import { Carousel } from './Carousel'
import { Navbar } from './Navbar'

//assets

import tablet from '../../assets/img/tablet.png';

import { SearchBar } from '../search/SearchBar';
import { TemasHome } from '../main/TemasHome'

export const PrincipalScreen = () => {

   
    return (
        <div className="home__main-container animate__animated animate__fadeIn">
            <Navbar />
            <SearchBar/>
            
            <div className="carousel__main-image">
                <div className="carousel__container">
                    <p className="p-text-cuadro" >Cuadros personalizados</p>
                    <span className="span-text-foto">Mandanos tu foto o elige de nuestra colección</span>
                </div>
                <div className="container-redes">
                    <p><i className="fab fa-facebook"></i> CANVAS SV</p>
                    <p><i className="fab fa-instagram"></i> CANVAS.SV</p>
                    <p><i className="fab fa-whatsapp"></i> +503 7609 9688</p>
                </div>
            </div>
            
            <div className="home__separator">
                <div className="home__line1"></div>
                <h2 className="home__text">¿Necesitas inspiracion?<br />
                <span className="home__span">Mira nuestros temas</span></h2>
                <div className="home__line2"></div>
            </div>

            <TemasHome/>

            <div className="home__tablet-part">
                <div className="home__table-left">
                    <h3 className="home__aun-no">¿Aun no <br/> te decides?</h3>
                    <p className="home__envia-p">¡Envíanos tu foto <br/> para crear tu canva!</p>
                    <a href="/main/upload">
                        <button className="home__btn">  EMPEZAR <i className="fas fa-plus"></i></button>
                    </a>
                </div>
                <img alt="imagen" src={tablet}/>
            </div>
            <div className="home__canvas-text-container">
                <h2 className="home__canvas-text">CANVAS</h2>
                <p className="home__paragraph-p">
                ¿QUIÉNES SOMOS? <br/><br/>
                Somos una empresa que nace con el objetivo de ayudarte a personalizar tus espacios 
                materializando tus ideas, “la imagen que tu quieras del tamaño que tu quieras” 
                marcando una diferencia sin limitarnos a las propuestas que posee el mercado actual.
                </p>
            </div>
            {/* {<div className="home__cuadro-part">
                <img alt="imagen" src={cuadro}/>
                <div className="home__table-left">
                    <h3 className="home__tienes">
                        ¿Tienes<br/>
                        preguntas?
                    </h3>
                    <p className="home__preocupes-p">
                        ¡No te preocupes!<br/>
                        resolveremos<br/>
                        cualquier inquietud
                    </p>
                    <a href="/main/faq">
                        <button className="home__btn">IR A PREGUNTAS</button>
                    </a>
                </div>
            </div>} */}
            <Footer/>
        </div>
    )
}
