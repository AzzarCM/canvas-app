import React, { useState, useEffect } from 'react'
import { ImageItem } from '../selled/ImageItem';
import { useLoading, BallTriangle } from '@agney/react-loading';
import { API_HOST } from '../../constants/URLS'
import { useHistory } from 'react-router-dom';
import validator from 'validator';

export const WrapImages = (props) => {
    const { id } = props;

    const [imagenes, setImagenes] = useState([]);
    const [bandera, setBandera] = useState(true);
    const [nombre, setNombre] = useState('No encontrado');
    //console.log(imagenes);
    const { containerProps, indicatorEl } = useLoading({
        loading: bandera,
        indicator: <BallTriangle width="50" />,
    });

    const history = useHistory();

    useEffect(() => {
        getAllImages();
    }, [])

    const getAllImages = async () => {
        if(!validator.isNumeric(id)) {
            history.push('/main/themes');
            return;
        }
        const url = `${API_HOST}/paintings/theme/${id}`;
        const resp = await fetch(url)
        const { paintings } = await resp.json();
        const nombreTheme = paintings.map((item)=>{
            const nombre = item.theme.name
            return nombre
        })
        setNombre(nombreTheme[1]);
        setImagenes(paintings)
        setBandera(false);
    }
    return (
        <div className="animate__animated animate__fadeIn" style={{ width: "100%" }}>
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
                        <h1
                            className="temas__title-busqueda"
                            style={{marginBottom: '4rem'}}
                        >
                            Tema: <span className="temas__span-busqueda">"{nombre}"</span>
                        </h1>
                        {
                            imagenes.length >= 1 ?
                                <div style={{width: '100%'}} className="temas__wrap-container">
                                    {imagenes.map(item => {
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
