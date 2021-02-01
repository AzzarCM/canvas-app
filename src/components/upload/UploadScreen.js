import React from 'react'
import {Navbar} from "../main/Navbar";
import {Footer} from "../main/Footer"
//import uploadImage from "../../assets/img/upload.png"
import socialMedia from '../../assets/img/social.png';
export const UploadScreen = () => {
    return (
        <div className="home__main-container">
            <Navbar/>
                <div className="upload__container">
               {/* { <img alt="imagen" src={uploadImage}/>
                <h1 className="upload__title">CREA TU PROPIO CANVAS</h1>
                <p className="upload__paragraph">¿Quieres enmarcar tus recuerdos? Arrastra y suelta <br/>
                tus imagenes para comenzar. 32 MB de límite.
                </p>
                <button className="temas-btn resize-2 ml-0">SUBIR FOTO</button>} */}
                
                <img className="upload__img" src={socialMedia} alt="imagen"/>
                <div className="upload__text-container">
                    <h1 className="selled__title-related mb-5">ENVIA TU<br/>CANVA VIA<br/>INSTAGRAM</h1>
                    <p className="upload__align">Podemos procesar tu pedido vía inbox en instagram, haz click en el botón para que automaticamente estes en nuestro chat y mandes tu foto ¡Te esperamos!</p>
                    <a href="https://www.instagram.com/canvas.sv/"><button className="temas-btn resize-2 ml-0">Enviar mensaje</button></a>
                </div>
                </div>
            <Footer/>
        </div>
    )
}
