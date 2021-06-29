import React, {useState, useEffect} from 'react'
import {Navbar} from "../main/Navbar";
import {Footer} from "../main/Footer"
import {
    useParams,
    useHistory
  } from "react-router-dom";
import checkbox from "../../assets/img/checkbox.png";
import tarjeta from "../../assets/img/tarjeta.png";
import {Relacionados} from "./Relacionados"
import compra from '../../assets/img/compra.png'
import { useDispatch, useSelector } from "react-redux"
import { addToCart } from '../../actions/cart'
import Swal from 'sweetalert2/src/sweetalert2.js'
import errorImg from '../../assets/img/error.png'
import { SearchBar } from '../search/SearchBar';
import { API_HOST } from '../../constants/URLS'
import { CarouselImages } from './CarouselImages'

export const TemasScreen = () => {
    
    window.onpopstate = function name(e) {
        window.location.reload();
    }
    const authState = useSelector(state => state.auth);
    const dispatch = useDispatch();
    let {id} = useParams();
    let history = useHistory();
    const [banderitaCheck, setBanderitaCheck] = useState(false);

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
    const [discount, setDiscount] = useState(0);
    const [precioReal, setPrecioReal] = useState(0);
   
    
    useEffect(() => {
        getPainting();
    }, [])

    const getPainting = async () =>{
        const url = `${API_HOST}/paintings/${id}`;
        const resp = await fetch(url)
        
        const {painting_info} = await resp.json();
        //console.log(painting_info);
        const cuadro = painting_info.map( img =>{
            return {
                id: img.id,
                name: img.name,
                url: img.image_url,
                descripcion: img.description,
                materials: img.materials,
                measurements: img.measurements,
                theme_id: img.theme_id,
                stock: img.stock,
            }
        })
        const descuento = painting_info.map((item)=>{
            return item.theme.discount;
        })
        setDiscount(descuento);
        setPainting(cuadro);
        setBanderaMat(true);
        setBanderaDim(true);
     }
    
    const handleClick = () =>{
        if(precio === 0 || material === '' || precio == 0 || precio === null){
            Swal.fire({
                imageUrl:errorImg,
                imageWidth: 155,
                imageHeight: 250,
                html: '<p style="color:#42bda5;font-size: 35;">Debes seleccionar un material y su dimension!</p>',
                showConfirmButton:true,
              });
        }
        else if(JSON.stringify(authState)=='{}'){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                html: '<p style="color:#42bda5;font-size: 35;">Inicia sesion para comprar!</p>',
                showConfirmButton:false,
                footer: '<a style="background-color: #42bda5; padding: 10px; border-radius: 5px; color: #fff" href="/auth/login">Iniciar Sesion</a>',
              });
        }

        else{
            Swal.fire({
                position: 'center',
                html: '<p style="color:#42bda5;font-size: 35;">El cuadro<br>fue agregado<br>exitosamente!</p>',
                imageUrl: compra,
                imageWidth: 200,
                imageHeight: 200,
                footer: '<a style="background-color: #42bda5; padding: 10px; border-radius: 5px; color: #fff" href="/main/cart">Ver carrito</a>'
              })
            dispatch(addToCart(id, precio, material,idMaterial,medidas));
        }
    }

    const handleAddToCart = () =>{
        if(precio === 0 || material === '' || precio == 0){
            Swal.fire({
                imageUrl:errorImg,
                imageWidth: 155,
                imageHeight: 250,
                html: '<p style="color:#42bda5;font-size: 35;">Debes seleccionar un material y su dimension!</p>',
                showConfirmButton:true,
              });
        }else{
            Swal.fire({
                position: 'center',
                html: '<p style="color:#42bda5;font-size: 35;">El cuadro<br>fue agregado<br>exitosamente!</p>',
                imageUrl: compra,
                imageWidth: 200,
                imageHeight: 200,
              })
            dispatch(addToCart(id, precio, material,idMaterial,medidas));
            let path = `/main/cart`;
            history.push(path);
        }
    }


    const handleWarning = () =>{
        Swal.fire({
            icon: 'warning',
            title: 'ATENCION!',
            html: '<p style="color:#42bda5;font-size: 35;">Inicia sesion para comprar!</p>',
            showConfirmButton: false,
            footer: '<a style="background-color: #42bda5; padding: 10px; border-radius: 5px; color: #fff" href="/auth/login">Iniciar Sesion</a>',
        });
    }

    const handleDropDownChange = (e) =>{
        //console.log(e.target.id);
        setIdMaterial(e.target.value)
        setBanderaDim(true);
        setRadioChecked(false);
        setPrecio(0)
    }

    const handlePrice = (e) =>{
        if(discount != null && discount > 0){
            setPrecio((e.target.value)*(1-discount))
            setPrecioReal(e.target.value);
            setRadioChecked(true)
        }else{
            setPrecio(e.target.value)
            setRadioChecked(true)
        }
        
        
    }

    
    if(banderaDim){
        const result = painting[0].measurements.filter(dim => dim.material_id == idMaterial);
        setTemaId(painting[0].theme_id);
        setDimensions(result);
        setBanderaDim(false);
    }
    const handleChecked = (name) =>{
        setBanderitaCheck(true);
        setMaterial(name)
    }

    const handleCheckedDim = (altura, ancho) =>{
        const medida = `${altura} X ${ancho}`
        setMedidas(medida);
    }

    return (
        <div className="home__main-container animate__animated animate__fadeInLeft">
            <Navbar/>
            <SearchBar/>
            <div className="temas__tema-container">
                <div className="temas__image-container">
                    {painting.map( item =>{
                        return (
                            <h1 
                            key={item.id}
                            className="temas__info-h1-movil">
                            {item.name}
                            </h1>
                        )
                    })}
                    
                    {painting.map( img =>{
                        return(
                            <CarouselImages key={img.id} img={img.url}/>
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
                            {discount > 0 ? <>{item.name}<hr/><span style={{color:'red'}}>{`- ${discount*100}% descuento`}</span></>: item.name}
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
                            <h4 style={{marginBottom: 0, marginRight: 15}} className="temas__btn-title">Dimensiones</h4>
                            <div className="btn-div-wrap">
                            {
                                banderitaCheck ? 
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
                                :
                                <h3 className="selled__title-related" style={{margin:0}}>Selecciona un material primero</h3>
                            }
                            </div>
                            
                        </div>
                    </div>
                    {
                        precio == 0 ? 
                        <p className="temas__precio-cuadro">
                            
                        </p> :
                        <p className="temas__precio-cuadro">
                        {precioReal > 0 ? <div><p className="temas__precio-normal-tachado">{`$${precioReal}`}</p><p>{`Precio del cuadro: $${precio}`}</p></div> : <p>{`Precio del cuadro: $${precio}`}</p>}
                        </p>
                    }
                
        
                </div>
            </div>
            <div className="temas__buy-container">

                <div className="temas__empty-space">
                    <img style={{width: 80, marginRight: 15}} alt="imagen" src={tarjeta}/>
                    <p className="temas__querido">
                        Tomamos 
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
                <div  className="temas__garantia-movil">
                        <img className="temas__check-movil" alt="imagen" src={checkbox}/>
                        <p className="temas__garantia-p">
                            Garantía de 30 días, lo cambiamos o regresamos tu dinero.
                        </p>
                </div>
                </div>
                <div className="temas__buy-container-right">
                    <button onClick={handleAddToCart} className="temas-btn-carrito">
                        <i 
                            className="fas fa-shopping-cart"></i>
                         Agregar al carrito
                    </button>
                    {
                        JSON.stringify(authState)=='{}' ?

                        <a>
                        <button onClick={handleWarning} className="temas-btn-carrito resize mt-5">
                            <i className="fas fa-arrow-up"></i>
                            Comprar
                        </button> 
                        </a> :
                        precio == 0 ? 
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
