import React, {useState, useEffect} from 'react'
import {Navbar} from "../main/Navbar";
import {Footer} from "../main/Footer"
import {
    useParams
  } from "react-router-dom";
import checkbox from "../../assets/img/checkbox.png";
import tarjeta from "../../assets/img/tarjeta.png";
import {Relacionados} from "./Relacionados"

import { useDispatch, useSelector } from "react-redux"
import { addToCart } from '../../actions/cart'
import Swal from 'sweetalert2'


export const TemasScreen = () => {

    const authState = useSelector(state => state.auth);
    const dispatch = useDispatch();
    let {id} = useParams();
    const [painting, setPainting] = useState([]);
    const [banderaMat, setBanderaMat] = useState(false);
    const [idMaterial, setIdMaterial] = useState(1);
    const [dimensions, setDimensions] = useState([]);
    const [banderaDim, setBanderaDim] = useState(false)
    const [medidas, setMedidas] = useState('')
    const [radioChecked, setRadioChecked] = useState(true);
    const [temaId, setTemaId] = useState(0);
    const [precio, setPrecio] = useState(0);
    const [material, setMaterial] = useState('');
    

    console.log(dimensions ,'dimension');
    console.log(material,'material');

    useEffect(() => {
        getPainting();
    }, [])

    const getPainting = async () =>{
        const url = `https://api-rest-canvas.herokuapp.com/api/paintings/${id}`;
        const resp = await fetch(url)
        
        const {painting_info} = await resp.json();
        
        const cuadro = painting_info.map( img =>{
            return {
                id: img.id,
                name: img.name,
                url: img.image_url,
                descripcion: img.description,
                materials: img.materials,
                measurements: img.measurements,
                theme_id: img.theme_id,
            }
        })
        setPainting(cuadro);
        setBanderaMat(true);
        setBanderaDim(true);
     }
    
    const handleClick = () =>{
        if(precio === 0 || material === '' || precio == 0){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Selecciona un material y su dimension!',
                showConfirmButton:true,
              });
        }
        else if(JSON.stringify(authState)=='{}'){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Necesitas estar logueado!',
                showConfirmButton:true,
              });
        }
        else{
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Agregado al carrito!',
                showConfirmButton: true,
              })
            dispatch(addToCart(id, precio, material,idMaterial,medidas));
        }
    }

    const handleWarning = () =>{
        Swal.fire({
            icon: 'warning',
            title: 'ATENCION!',
            text: 'Debes estar logueado para comprar :)',
            showConfirmButton: true,
        });
    }
    const handleSecondWarning = () =>{
        Swal.fire({
            icon: 'error',
            title: 'ATENCION!',
            text: 'Debes seleccionar dimension y material',
            showConfirmButton: true,
        });
    }

    const handleDropDownChange = (e) =>{
        setIdMaterial(e.target.value)
        setBanderaDim(true);
        setRadioChecked(false);
        setPrecio(0)
    }

    const handlePrice = (e) =>{
        setPrecio(e.target.value)
        setRadioChecked(true)
    }

    
    if(banderaDim){
        const result = painting[0].measurements.filter(dim => dim.material_id == idMaterial);
        setTemaId(painting[0].theme_id);
        setDimensions(result);
        setBanderaDim(false);
    }
    const handleChecked = (name) =>{
        setMaterial(name)
    }

    const handleCheckedDim = (altura, ancho) =>{
        const medida = `Alto ${altura} Ancho ${ancho}`
        setMedidas(medida);
    }

    return (
        <div className="home__main-container">
            <Navbar/>
            <div className="temas__tema-container animate__animated animate__fadeInLeft">
                <div className="temas__image-container">
                    {painting.map( img =>{
                        return(
                            <img 
                                alt="imagen" 
                                src={img.url}
                                key={img.id}
                                className="temas__imagen"
                            />
                        )
                    })}
                    <div className="temas__garantia">
                        <img alt="imagen" src={checkbox}/>
                        <p className="temas__garantia-p">
                            Garantía de 30 días, lo cambiamos o regresamos tu dinero.
                        </p>
                    </div>
                </div>
                <div className="temas__info-container">
                    {painting.map( item =>{
                        return (
                            <h1 
                            key={item.id}
                            className="temas__info-h1">
                            {item.name}
                            </h1>
                        )
                    })}

                    {painting.map( item =>{
                        return (
                            <p 
                            key={item.id}
                            className="temas__info-p">
                                {item.descripcion}
                            </p>
                        )
                    })}
                   
                    <div className="temas__materiales">
                        <div className="temas__width-select">
                            <h4 className="temas__btn-title">Material</h4>
                            <div className="btn-div-wrap">
                            {
                                banderaMat ? 
                                painting[0].materials.map((material)=>{
                                    return (
                                        <div key={material.id}>
                                            <input 
                                                onClick={handleDropDownChange} 
                                                className="btn-radio" 
                                                type="radio" 
                                                name="name_name" 
                                                id={material.name} 
                                                value={material.id} 
                                                style={{visibility: 'hidden'}}/>
                                            <label onClick={()=>handleChecked(material.name)} className="btn-material" htmlFor={material.name}>{material.name}</label>
                                        </div>
                                    )
                                })
                                : <p>No hay medidas disponibles</p>
                            }
                            </div>
                            
                        </div>
                        <div className="temas__width-select">
                            <h4 className="temas__btn-title">Dimensiones</h4>
                            <div className="btn-div-wrap">
                            {
                                dimensions.length >= 1 ?
                                dimensions.map((dim)=>{
                                    return (
                                        <div key={dim.id}>
                                            <input 
                                                onClick={handlePrice} 
                                                className="btn-radio-second" 
                                                type="radio" 
                                                name="name_name2" 
                                                id={dim.id} 
                                                value={dim.price} 
                                                style={{visibility: 'hidden'}}
                                            />
                                            <label 
                                                className="btn-material" 
                                                htmlFor={dim.id}
                                                onClick={()=>handleCheckedDim(dim.height, dim.width)}
                                            >
                                                {`${dim.height} X ${dim.width}`}
                                            </label>
                                        </div>
                                        
                                    )
                                })
                                :
                                (<p>No hay medidas disponibles</p>)
                            }
                            </div>
                            
                        </div>
                    </div>
                    {
                        precio == 0 ? 
                        <p className="temas__precio-cuadro">
                            {`Selecciona un material y dimension para conocer el precio $${precio}`}
                        </p> :
                        <p className="temas__precio-cuadro">
                        {`Precio del cuadro $${precio}`}
                        </p>
                    }
                
                        
                </div>
            </div>
            <div className="temas__buy-container">

                <div className="temas__empty-space">
                    <img className="imagen__tarjeta" alt="imagen" src={tarjeta}/>
                    <p style={{fontSize: 24}}>
                        Querido usuario de 
                        Canvas,tomamos 
                        este espacio para 
                        acordarte que tus 
                        compras siempre  
                        estan aseguradas y 
                        tiene su respectiva 
                        garantía.
                        ¡Agradecemos tu
                        preferencia!
                    </p>
                </div>
                <div>
                    
                </div>
                <div className="temas__buy-container-right">
                    <button onClick={handleClick} className="temas-btn-carrito">
                        <i 
                            className="fas fa-shopping-cart"></i>
                         Agregar al carrito
                    </button>
                    {
                        JSON.stringify(authState)=='{}' ?
                        precio == 0 ? 
                        <a>
                            <button onClick={handleWarning} className="temas-btn-carrito resize mt-5">
                                <i className="fas fa-arrow-up"></i>
                                Comprar
                            </button> 
                        </a> :
                         <a>
                         <button onClick={handleClick} className="temas-btn-carrito resize mt-5">
                             <i className="fas fa-arrow-up"></i>
                             Comprar
                         </button> 
                        </a> :
                        <a href="/main/checkout">
                            <button onClick={handleClick} className="temas-btn-carrito resize mt-5">
                                <i className="fas fa-arrow-up"></i>
                                Comprar
                            </button>
                        </a>
                    }
                   
                </div>
            </div>
            <h1 className="selled__title-related">Relacionados</h1>
            <Relacionados painting_id={id} theme_id={temaId}/>
            <Footer/>
        </div>
    )
}
