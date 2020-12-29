import React from 'react'
import imagen from "../../assets/img/inicio-sesion.png"
import logo from "../../assets/img/logo.png"
export const LoginScreen = (props) => {
    console.log(props);
    return (
        <div className="auth__container">
            <div className="auth__image">
                <img alt="una imagen" src={imagen} />
            </div>
            <div className="auth__right-container">
                <div className="auth__mini-nav">
                    <img alt="logo" src={logo}/>
                    <div style={{
                        display:'flex', 
                        alignItems:'center'}}>
                        <p style={{paddingRight:20}}>Sin cuenta?</p>
                        <button className="btn-medium">
                            <a className="link-dec" href="/auth/register">Registrate</a>
                        </button>
                    </div>  
                </div>
                <h2 className="auth__h2-align">Iniciar sesión</h2>
                <form className="auth__form">
                    <input 
                        type="text" 
                        placeholder="Correo"
                        className="auth__input"
                    />
                    <input 
                        type="password" 
                        placeholder="Contraseña"
                        className="auth__input"    
                    />
                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        Iniciar sesion
                    </button>
                </form>
                <button className="btn btn-facebook">
                    <i style={{marginRight:30}} class="fab fa-facebook-f"></i>
                    Iniciar sesión con facebook
                </button>
            </div>
        </div>
    )
}
