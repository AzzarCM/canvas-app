import React, { useState, useEffect } from 'react'
import { ImageItem } from '../selled/ImageItem';
import { useLoading, BallTriangle } from '@agney/react-loading';
export const WrapImages = (props) => {
    const { id } = props;

    const [imagenes, setImagenes] = useState([]);
    const [bandera, setBandera] = useState(true);
    const [nombre, setNombre] = useState('No encontrado');

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
        <div className="animate__animated animate__fadeIn" style={{ width: "95%" }}>
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
                        >
                            Tema: <span className="temas__span-busqueda">"{nombre}"</span>
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
