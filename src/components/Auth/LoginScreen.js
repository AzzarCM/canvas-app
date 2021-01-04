import React from 'react'
import { useDispatch } from "react-redux";
import { startLoginEmailPassword, startFacebookLogin, startGoogleLogin } from '../../actions/auth';
import imagen from "../../assets/img/inicio-sesion.png"
import logo from "../../assets/img/logo.png"
import { useForm } from '../../hooks/useForm'
export const LoginScreen = (props) => {

    const dispatch = useDispatch();

    const [ formValues, handleInputChange ] = useForm({
        email: 'canvas@gmail.com',
        password: '1234'
    });

    const { email, password } = formValues;

    const handleLogin = (e) =>{
        e.preventDefault();
        
        dispatch( startLoginEmailPassword(email, password) );
    }

    const handleFacebookLogin = () => {
        dispatch( startFacebookLogin() );
    }

    const handleGoogleLogin = () => {
        dispatch( startGoogleLogin() );
    }

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
                <form className="auth__form" onSubmit={ handleLogin }>
                    <input 
                        type="text"
                        name="email" 
                        placeholder="Correo"
                        className="auth__input"
                        value={ email }
                        onChange={ handleInputChange }
                    />
                    <input 
                        type="password" 
                        name="password"
                        placeholder="Contraseña"
                        className="auth__input"
                        value={ password }
                        onChange={ handleInputChange }

                    />
                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        Iniciar sesion
                    </button>
                </form>
                <button 
                    className="btn btn-facebook"
                    onClick={ handleFacebookLogin }
                >
                    <i style={{marginRight:30}} class="fab fa-facebook-f"></i>
                    Iniciar sesión con facebook
                </button>
                <div onClick={ handleGoogleLogin } className="auth__social-networks">
                    <div className="google-btn">
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                        <b>Sign in with google</b>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
