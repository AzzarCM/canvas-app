import React from 'react'

//components

import { Footer } from './Footer';
import { Carousel } from './Carousel'
import { Navbar } from './Navbar'

//assets

import tablet from '../../assets/img/tablet.png';
import cuadro from "../../assets/img/cuadro.png";

import firebase from "firebase/app";
import {useSelector} from 'react-redux'
import { SearchBar } from '../search/SearchBar';
import { Temas } from '../temas/Temas';

export const PrincipalScreen = () => {
    // animate__animated animate__fadeIn

    const auth = useSelector(state => state.auth);
    if(JSON.stringify(auth) == '{}'){
        console.log("no se ha logueado nadie");
    }else{
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
            // Send token to your backend via HTTPS
            // ...
            console.log(idToken);
          }).catch(function(error) {
            // Handle error
          });
    }

   
    return (
        <div className="home__main-container animate__animated animate__fadeIn">
            <Navbar />
            <SearchBar/>
            <Carousel />
            <div className="home__canvas-text-container">
                <h2 className="home__canvas-text">CANVAS</h2>
                <p className="home__paragraph-p">Lorem reprehenderit ut quis dolor tempor id aliquip eu.
                Adipisicing sint sunt fugiat exercitation nisi. Tempor officia
                sunt tempor veniam. Nisi culpa consectetur elit duis est irure
                incididunt adipisicing sunt et velit. Veniam culpa exercitation
                non ex minim consequat non dolor amet. Fugiat dolor sit aliqua
                ipsum laboris.
                </p>
            </div>
            <div className="home__separator">
                <div className="home__line1"></div>
                <h2 className="home__text">¿Necesitas inspiracion?<br />
                <span className="home__span">Mira nuestros temas</span></h2>
                <div className="home__line2"></div>
            </div>

            <Temas/>

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

            <div className="home__cuadro-part">
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
            </div>
            <Footer/>
        </div>
    )
}
