import React from 'react'
import kioriLogo from '../../assets/svg/botlogo.svg'

export const Footer = () => {
    return (
        <div className="foot__main-container">
            <div className="foot__upper-div">
                <div className="foot__left-part">
                    <a className="foot__links mb-5 align-text" href="/main/terms">TÉRMINOS Y CONDICIONES</a>
                    <a className="foot__links mb-5 align-text" href="/main/faq">PREGUNTAS FRECUENTES</a>
                    <a className="foot__links mb-5 align-text" href="/main/garantia">SOBRE GARANTÍA</a>
                </div>
                <div className="foot__middle-part">
                    <h3 className="foot__links mb-10 align-text">CONTACTO</h3>
                    <div className="foot__phone mb-5">
                        <p style={{color:'white'}}>Teléfono: </p>
                        <p style={{color:'white'}}>+503 7609 9688</p>
                    </div>
                    <div className="foot__phone mb-5">
                        <p style={{color:'white'}}>Email: </p>
                        <p style={{color:'white', marginLeft: 30}}>micanva@canvasframeit.com</p>
                    </div>
                </div>
                <div className="foot__right-part">
                    <h3 className="foot__links mb-5 align-text">REDES</h3>
                    <p 
                    className="mb-5 align-text" 
                    style={{
                        color:'white',
                        fontSize: 21,

                        }}>
                        Aquí tendrás más noticias e información<br/> 
                        sobre nuestra actividad ¡Síguenos!
                    </p>
                    <div className="foot__social-icons">
                        <a className="mr-2" href="https://www.facebook.com/Canvas-SV-111154510666281" target="__blank"><i className="fab fa-facebook-square a-color"></i></a>
                        <a className="mr-2" href="https://twitter.com/CanvasFrameIt" target="__blank"><i className="fab fa-twitter-square a-color"></i></a>
                        <a className="mr-2" href="https://www.instagram.com/canvas.sv/" target="__blank"><i className="fab fa-instagram-square a-color"></i></a>
                    </div>
                </div>
            </div>
            <div className="foot__bottom-div">
                <p style={{ margin: 0, paddingRight: '1rem', color: 'white' }}>Made with love by</p><img src={kioriLogo} className="footer__logo-kiori"/>
            </div>
        </div>
    )
}
