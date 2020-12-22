import React from 'react'
import {Navbar} from "../main/Navbar";
import {Footer} from "../main/Footer"
import uploadImage from "../../assets/img/upload.png"
export const UploadScreen = () => {
    return (
        <div className="home__main-container">
            <Navbar/>
                <div className="upload__container">
                <img alt="imagen" src={uploadImage}/>
                <h1 className="upload__title">CREA TU PROPIO CANVAS</h1>
                <p className="upload__paragraph">¿Quieres enmarcar tus recuerdos? Arrastra y suelta <br/>
                tus imagenes para comenzar. 32 MB de límite.
                </p>
                <button className="temas-btn resize-2 ml-0">SUBIR FOTO</button>
            </div>
            <Footer/>
        </div>
    )
}
