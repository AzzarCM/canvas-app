import React from 'react';
import imagen from "../../assets/img/register.png";
import logo from "../../assets/img/logo.png";
import { useForm } from '../../hooks/useForm';
import validator from "validator";
import { useDispatch, useSelector } from 'react-redux';
import { setError, removeError } from "../../actions/ui"
import { startRegisterWithEmailPasswordName } from '../../actions/auth';
export const RegisterScreen = () => {

    const dispatch = useDispatch();
    const hola = useSelector(state=>state);
    console.log(hola);
    const {msgError} = useSelector( state => state.ui);

    const [ formValues, handleInputChange ] = useForm({
        name: 'Cristian Mundo',
        email: 'canvas@gmail.com',
        password: '123456',
        password2: '123456',
    });

    const {name, email, password, password2} = formValues;

    function isFormValid() {
        if(validator.isEmpty(name)){
            dispatch( setError('Name is required'));
            return false
        } else if (!validator.isEmail(email)){
            dispatch( setError('Email is not valid'));
            return false
        } else if (!validator.equals(password,password2)){
            dispatch( setError('Password does not match'))
            return false
        }

        dispatch(removeError());
        return true
    }

    const handleRegister = (e) =>{
        e.preventDefault();
        if( isFormValid()){
            dispatch( startRegisterWithEmailPasswordName(email, password, name));
        }
        
    }
    

    return (
        <div className="auth__container animate__animated animate__fadeIn">
        <div className="auth__image">
            <img alt="una imagen" src={imagen} />
        </div>
        <div className="auth__right-container">
            <div className="auth__mini-nav">
                <img alt="logo" src={logo}/>
                <div style={{
                    display:'flex', 
                    alignItems:'center'}}>
                    <p style={{paddingRight:20, marginBottom: 0}}>Ya tienes cuenta?</p>
                    <a href="/auth/login">
                        <button className="btn-medium">
                        Iniciar sesion
                        </button>
                    </a>
                </div>  
            </div>
            <h2 className="auth__h2-align">Registrarse</h2>
            {
                msgError &&
                (
                    <div className="auth__alert-error">
                        {msgError}
                    </div>
                )
                
            }
            <form 
            onSubmit={handleRegister}
            className="auth__form">
                <input 
                    type="text" 
                    placeholder="Correo"
                    name="email"
                    className="auth__input"
                    value={ email }
                    onChange={ handleInputChange }
                />
                <input 
                    name="name"
                    type="text" 
                    placeholder="Nombre"
                    className="auth__input"
                    value={ name }
                    onChange={ handleInputChange }
                />
                <input 
                    name="password"
                    type="password" 
                    placeholder="Contraseña"
                    className="auth__input" 
                    value={ password }   
                    onChange={ handleInputChange }
                />
                <input 
                    name="password2"
                    type="password" 
                    placeholder="Repetir contraseña"
                    className="auth__input"
                    value={ password2 }  
                    onChange={ handleInputChange }  
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
