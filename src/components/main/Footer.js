import React from 'react'
import kioriLogo from '../../assets/svg/botlogo.svg'
import logoCanva from '../../assets/svg/toplogo.svg'
import fb from '../../assets/svg/facebook.svg';
export const Footer = () => {
    return (
        <div className="foot__main-container">
            <div className="foot__upper-div">
                <img src={logoCanva} alt="logo" className="logocanva"/>
                <p className="foot__linea-vertical">|</p>
                <div className="foot__left-part">
                    <a className="foot__links align-text" href="/main/faq">Preguntas frecuentes</a>
                    <a className="foot__links align-text" href="/main/terms">Términos y condiciones</a>
                    <a className="foot__links align-text" href="/main/garantia">Sobre garantía</a>
                </div>
                <p className="foot__linea-vertical">|</p>
                <div className="foot__middle-part">
                    <p className="foot__text-info" style={{color:'white'}}>+503 7609 9688</p>
                    <p className="foot__text-info" style={{color:'white'}}>micanva@canvasframeit.com</p>
                </div>
                <div className="foot__right-part">
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
