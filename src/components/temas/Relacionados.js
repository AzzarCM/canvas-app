import React,{useState, useEffect} from 'react'
import { ImageItem } from '../selled/ImageItem';
import { API_HOST} from '../../constants/URLS'

export const Relacionados = (props) => {

    const {painting_id, theme_id} = props;
    const [relatedPaintings, setRelatedPaintings] = useState([]);
    console.log(relatedPaintings);
    function getRelatedImages() {
        const url = `${API_HOST}/paintings/related/${theme_id}/${painting_id}`

        return fetch(url)
            .then((res)=>{
                return res.json()
            })
            .then((result)=>{
                return result
            })
    }  
    
    useEffect(() => {
        getRelatedImages()
            .then(({related_paintings})=>{
                setRelatedPaintings(related_paintings);
            })
    }, [painting_id, theme_id])

    return (
        <div className="related__main-container">
            {
                relatedPaintings.length > 1 
                ?
                relatedPaintings.map((cuadro)=>{
                    return (
                        // 
                        <h1>probando</h1>
                    )
                })
                :
                <h1>No hay cuadros relacionados!</h1>
            }
        </div>
    )
}
