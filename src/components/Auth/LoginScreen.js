import React from 'react'
import { useDispatch,useSelector } from "react-redux";
import { startLoginEmailPassword, startFacebookLogin, startGoogleLogin } from '../../actions/auth';
import imagen from "../../assets/img/inicio-sesion.png"
import logo from "../../assets/img/logo.png"
import { useForm } from '../../hooks/useForm'
import validator from "validator";
import { setError, removeError } from "../../actions/ui"
export const LoginScreen = (props) => {

    const dispatch = useDispatch();
    const {msgError} = useSelector( state => state.ui);
    const {loading} = useSelector(state => state.ui);
    const [ formValues, handleInputChange ] = useForm({
        email: 'canvas@gmail.com',
        password: '123456'
    });

    const { email, password } = formValues;

    function isFormValid() {
        if(!validator.isEmail(email)){
            dispatch( setError('Correo electronico invalido'));
            return false
        }else if(validator.isEmpty(email)){
            dispatch( setError('El campo del correo esta vacio'))
            return false
        }else if(validator.isEmpty(password)){
            dispatch(setError('El campo de la contraseña esta vacia'))
            return false
        }else if(password.lenght < 6){
            dispatch(setError('la contraseña debe ser mayor a 6 caracteres'))
            return false
        }

        dispatch(removeError())
        return true
    }
    const handleLogin = (e) =>{
        e.preventDefault();
        if(isFormValid()){
            dispatch( startLoginEmailPassword(email, password) );
        }
        
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
                {
                msgError &&
                (
                    <div className="auth__alert-error">
                        {msgError}
                    </div>
                )
                
                }
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
                        disabled={loading}
                    >
                        Iniciar sesion
                    </button>
                </form>
                <button 
                    className="btn btn-facebook"
                    onClick={ handleFacebookLogin }
                >
                    <i style={{marginRight:30}} className="fab fa-facebook-f"></i>
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
