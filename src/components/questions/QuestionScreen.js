import React from 'react'
import {Navbar} from "../main/Navbar";
import {Footer} from "../main/Footer"
import question from "../../assets/img/question.png";
export const QuestionScreen = () => {
    return (
        <div className="home__main-container">
            <Navbar/>
            <div className="questions__first-part">
                <img alt="imagen" src={question}/>
                <div>
                    <h1 className="questions__title">¿Tienes dudas?</h1>
                    <p className="questions__paragraph">Ingresa una palabra, frase o pregunta para localizar la <br/>
                        raíz de tus problemas, estaremos atentos de <br/>
                        responder si dicha pregunta aún no tiene respuesta. <br/>
                    </p>
                    <div className="questions__search-part">
                        <input className="questions__search-input" type="text"/>
                        <button className="questions__search-button"><i className="fas fa-search"></i></button>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
