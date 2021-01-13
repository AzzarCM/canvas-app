import React, {useState, useEffect} from 'react'
import { ImageItem } from '../selled/ImageItem';

export const WrapImages = (props) => {
    const {id} = props;

    const [imagenes, setImagenes] = useState([]);
    const [bandera, setBandera] = useState(true);
    const [nombre, setNombre] = useState('No encontrado');
    useEffect( () => {
        getAllImages();
    }, [])

    const getAllImages = async () => {
        const url = `https://canvas-api-rest.herokuapp.com/api/themes/get-paintings/${id}`;
        const resp = await fetch(url)
        
        const { themes } = await resp.json();
        const imagenes = themes.map( item =>{
            const paintings = item.paintings;
            return paintings;
        })
        const nombreTheme = themes.map(item =>{
            const nombre = item.name;
            return nombre
        })
        setNombre(nombreTheme)
        setImagenes(imagenes);
        setBandera(false);
    }

    return (
        <div style={{width: "100%"}}>
            {
                bandera ? 
                <h1>Loading</h1> :
                <div>
                    <h1 style={{
                        textAlign: 'center',
                    }}>
                        {`Busqueda: "${nombre}"`}
                    </h1>
                    {
                        imagenes[0] ? 
                        <div className="temas__wrap-container">
                        {imagenes[0].map(item =>{
                            return (
                                <ImageItem key={item.id} img={item}/>
                                )
                            })
                        }
                        </div> :

                        <h1>No hay cuadros disponibles:(</h1>
                    }   
                </div> 
            }
        </div>
    )
}
