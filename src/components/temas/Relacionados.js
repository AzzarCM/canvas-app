import React,{useState, useEffect} from 'react'
import landscapes from '../../assets/img/landscapes.png';
import people from '../../assets/img/people.png';
import arte from '../../assets/img/arte.png';
import caminos from '../../assets/img/caminos.png';
import { ImageItem } from '../selled/ImageItem';

export const Relacionados = (props) => {

    const {painting_id, theme_id} = props;
    const [relatedPaintings, setRelatedPaintings] = useState([]);

    function getRelatedImages() {
        const url = `https://api-rest-canvas.herokuapp.com/api/paintings/related/${theme_id}/${painting_id}`

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
    
    console.log(relatedPaintings);

    return (
        <div className="related__main-container">
            {
                relatedPaintings.length >= 1 
                ?
                relatedPaintings.map((cuadro)=>{
                    return (
                        <ImageItem img={cuadro}/>
                    )
                })
                :
                <h1>No hay cuadros relacionados!</h1>
            }
        </div>
    )
}
