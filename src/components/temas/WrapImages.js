import React, { useState, useEffect } from 'react'
import { ImageItem } from '../selled/ImageItem';
import { useLoading, BallTriangle } from '@agney/react-loading';
import {useDispatch} from "react-redux"
import {Link} from 'react-router-dom'
import {changeSearchText} from '../../actions/ui'
export const WrapImages = (props) => {
    const { id } = props;

    const [imagenes, setImagenes] = useState([]);
    const [bandera, setBandera] = useState(true);
    const [nombre, setNombre] = useState('No encontrado');
    const dispatch = useDispatch();


    const handleSearchBar = (text) =>{
        dispatch(changeSearchText(text));
    }

    console.log(imagenes);

    const { containerProps, indicatorEl } = useLoading({
        loading: bandera,
        indicator: <BallTriangle width="50" />,
    });

    useEffect(() => {
        getAllImages();
    }, [])

    const getAllImages = async () => {
        const url = `https://api-rest-canvas.herokuapp.com/api/themes/get-paintings/${id}`;
        const resp = await fetch(url)

        const { themes } = await resp.json();
        const imagenes = themes.map(item => {
            const paintings = item.paintings;
            return paintings;
        })
        const nombreTheme = themes.map(item => {
            const nombre = item.name;
            return nombre
        })
        setNombre(nombreTheme)
        setImagenes(imagenes);
        setBandera(false);
    }
    //className="animate__animated animate__fadeIn"
    return (
        <div style={{ width: "95%" }}>
            {
                bandera ?
                    <section style={{
                        display: 'flex',
                        justifyContent: 'center',
                        height: '100vh',
                        width: '100vw',
                    }} {...containerProps}>
                        {indicatorEl}
                    </section> :
                    <div>
                        <div className="input-search">
                            <input onChange={(e) => handleSearchBar(e.target.value)} name="search" className="navbar__search-input" type="text" placeholder="Busca un cuadro!" />

                            <button className="navbar__search-button" type="button">
                                <Link className="navbar__shopping-cart-icon" to="/main/search">
                                    <i className="fas fa-search"></i>
                                </Link>
                            </button>

                        </div>
                        <h1
                            className="temas__title-busqueda"
                        >
                            Busqueda: <span className="temas__span-busqueda">"{nombre}"</span>
                        </h1>
                        {
                            imagenes[0].length >= 1 ?
                                <div className="temas__wrap-container">
                                    {imagenes[0].map(item => {
                                        return (
                                            <ImageItem key={item.id} img={item} />
                                        )
                                    })
                                    }
                                </div> :

                                <h1 className="temas__no-cuadros">No hay cuadros disponibles:(</h1>
                        }
                    </div>
            }
        </div>
    )
}
