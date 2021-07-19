import React from "react";
import { Navbar } from "../main/Navbar";
import { Footer } from "../main/Footer";
//import uploadImage from "../../assets/img/upload.png"
import socialMedia from "../../assets/img/social.png";
import { SearchBar } from "../search/SearchBar";
export const UploadScreen = () => {
  return (
    <div style={{ height: '100vh', justifyContent: 'space-between'}} className="home__main-container animate__animated animate__fadeIn">
      <Navbar />
      <SearchBar />
      <div className="upload__container">
        <img className="upload__img" src={socialMedia} alt="imagen" />
        <div className="upload__text-container">
          <h1 className="selled__title-related mb-5">
            ENVÍA TU
            <br />
            CANVA VÍA
            <br />
            INSTAGRAM
          </h1>
          <p className="upload__align">
            Podemos procesar tu pedido vía inbox en instagram, haz click en el
            botón para que automáticamente estes en nuestro chat y mandes tu
            foto ¡Te esperamos!
          </p>
          <a href="https://www.instagram.com/canvas.sv/">
            <button className="temas-btn resize-2 ml-0">Enviar mensaje</button>
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
};
