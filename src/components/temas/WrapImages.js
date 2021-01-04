import React, {useState, useEffect} from 'react'
import { ImageItem } from '../selled/ImageItem';

export const WrapImages = (props) => {
    const {id} = props;

    const [imagenes, setImagenes] = useState([]);
    const [bandera, setBandera] = useState(true);

    useEffect( async () => {
        await getAllImages();
    }, [])

    const getAllImages = async () => {
        const url = `https://canvas-api-rest.herokuapp.com/api/themes/get-paintings/${id}`;
        const resp = await fetch(url)
        
        const { themes } = await resp.json();
        const imagenes = themes.map( item =>{
            const paintings = item.paintings;
            return paintings;
        })
        setImagenes(imagenes);
        setBandera(false);
    }

    return (
        <div className="temas__wrap-container">
            {
                bandera ? 
                <h1>Loading</h1> :
                imagenes[0].map(item =>{
                    return (<ImageItem key={item.id} img={item}/>)
                })

            }
        </div>
    )
}
