import React, {useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { startLoginEmailPassword, startFacebookLogin, startGoogleLogin } from '../../actions/auth';
import imagen from "../../assets/img/inicio-sesion.png"
import logo from "../../assets/svg/logo.svg";
import { useForm } from '../../hooks/useForm'
import validator from "validator";
import Swal from 'sweetalert2';

export const LoginScreen = (props) => {
    
    const dispatch = useDispatch();
    const [flag, setFlag] = useState(true)
    const [errorMessage, setErrorMessage] = useState('');
    const { loading } = useSelector(state => state.ui);
    const [formValues, handleInputChange] = useForm({
        email: '',
        password: ''
    });

    const { email, password } = formValues;

    function isFormValid() {
        if (!validator.isEmpty(email)) {
            setErrorMessage('El campo del correo esta vacio')
            setFlag(false)
            return false
        } else if (validator.isEmail(email)) {
            setErrorMessage('Correo electronico invalido')
            setFlag(false)
            return false
        } else if (validator.isEmpty(password)) {
            setErrorMessage('El campo de la contraseña esta vacia')
            setFlag(false)
            return false
        } else if (password.lenght <= 6) {
            setErrorMessage('la contraseña debe ser mayor a 6 caracteres')
            setFlag(false)
            return false
        }
        setFlag(true)
        setErrorMessage('');
        return true
    }
    const handleLogin = (e) => {
        e.preventDefault();
        if (isFormValid()) {
            dispatch(startLoginEmailPassword(email, password));
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                html: `<pre><code>${errorMessage}</code></pre>`
            })
        }

    }

    const handleFacebookLogin = (e) => {
        e.preventDefault();
        dispatch(startFacebookLogin());
    }

    const handleGoogleLogin = (e) => {
        e.preventDefault();
        dispatch(startGoogleLogin());
    }

    return (
        <div className="auth__container animate__animated animate__fadeIn">
            <div className="auth__image">
                <img alt="una imagen" src={imagen} />
            </div>
            <div className="auth__right-container">
                <div className="auth__mini-nav">
                    <a href="/main/home">
                        <img alt="logo" src={logo} width="100px" />
                    </a>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <p style={{ paddingRight: 20, marginBottom: 0 }}>¿Sin cuenta?</p>
                        <a href="/auth/register">
                            <button className="btn-medium">
                                Regístrate
                            </button>
                        </a>

                    </div>
                </div>
                <h2 className="auth__h2-align">Iniciar sesión</h2>
                <form className="auth__form" onSubmit={handleLogin}>
                    <input
                        type="text"
                        name="email"
                        placeholder="Correo"
                        className="auth__input"
                        value={email}
                        onChange={handleInputChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        className="auth__input"
                        value={password}
                        onChange={handleInputChange}

                    />
                    <button
                        type="submit"
                        style={{ marginBottom: 15, height: 50 }}
                        className="btn btn-primary"
                        disabled={loading}
                    >
                        Iniciar sesion
                    </button>
                    <button
                        style={{ marginBottom: 15, height: 50, backgroundColor: '#3b5998' }}
                        className="btn btn-primary color-fb"
                        onClick={handleFacebookLogin}
                    >
                        <i style={{ marginRight: 30 }} className="fab fa-facebook-f"></i>
                    Iniciar sesión con facebook
                    </button>
                    <button
                        style={{ marginBottom: 15, height: 50}}
                        className="btn btn-primary"
                        onClick={handleGoogleLogin}
                    >
                        <i style={{ marginRight: 30 }} className="fab fa-google"></i>
                    Iniciar sesión con Google
                </button>
                </form>

            </div>
        </div>
    )
}
