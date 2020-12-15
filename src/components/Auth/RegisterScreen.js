import React from 'react'
import imagen from "../../assets/img/register.png"
import logo from "../../assets/img/logo.png"
export const RegisterScreen = () => {
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
                    <p style={{paddingRight:20}}>Ya tienes cuenta?</p>
                    <button className="btn-medium">
                        <a className="link-dec" href="/auth/login">Iniciar sesion</a>
                    </button>
                </div>  
            </div>
            <h2 className="auth__h2-align">Registrarse</h2>
            <form className="auth__form">
                <input 
                    type="text" 
                    placeholder="Correo"
                    className="auth__input"
                />
                <input 
                    type="text" 
                    placeholder="Nombre"
                    className="auth__input"
                />
                <input 
                    type="password" 
                    placeholder="Contraseña"
                    className="auth__input"    
                />
                <input 
                    type="password" 
                    placeholder="Repetir contraseña"
                    className="auth__input"    
                />
                <button
                    type="submit"
                    className="btn btn-primary"
                >
                    Crear cuenta
                </button>
            </form>
        </div>
    </div>
    )
}
