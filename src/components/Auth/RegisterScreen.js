import React, {useState} from 'react';
import imagen from "../../assets/img/register.png";
import logo from "../../assets/svg/logo.svg";
import { useForm } from '../../hooks/useForm';
import validator from "validator";
import { useDispatch } from 'react-redux';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';
export const RegisterScreen = () => {

    const dispatch = useDispatch();
    const [flag, setFlag] = useState(true)
    const [errorMessage, setErrorMessage] = useState('');
    const [ formValues, handleInputChange ] = useForm({
        name: '',
        email: '',
        password: '',
        password2: '',
    });

    const {name, email, password, password2} = formValues;

    function isFormValid() {
        if(validator.isEmpty(name)){
            setErrorMessage('El nombre es campo requerido');
            setFlag(false);
            return false
        } else if (!validator.isEmail(email)){
            setErrorMessage('El correo no es valido');
            setFlag(false)
            return false
        } else if (!validator.equals(password,password2)){
            setErrorMessage('Las contraseñas no coinciden');
            setFlag(false);
            return false
        }

        setFlag(true);
        setErrorMessage('');
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
            <img alt="una imagen" src={imagen}/>
        </div>
        <div className="auth__right-container">
            <div className="auth__mini-nav">
                <a href="/main/home">
                    <img alt="logo" src={logo}  width="100px" />
                </a>
                <div style={{
                    display:'flex', 
                    alignItems:'center'}}>
                    <p style={{paddingRight:20, marginBottom: 0}}>¿Ya tienes cuenta?</p>
                    <a href="/auth/login">
                        <button className="btn-medium">
                        Iniciar sesion
                        </button>
                    </a>
                </div>  
            </div>
            <h2 className="auth__h2-align">Registrarse</h2>
            {
                flag ?
                (
                    <div></div>
                ) :  <div className="auth__alert-error">
                        {errorMessage}
                    </div>
                
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
                    style={{ marginBottom: 15, height: 50 }}
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
