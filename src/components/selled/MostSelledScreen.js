import React, {useEffect, useState} from 'react'
import { Footer } from '../main/Footer'
import { Navbar } from '../main/Navbar'
import { Relacionados } from '../temas/Relacionados'
import { ImageItem } from './ImageItem'


export const MostSelledScreen = () => {
   
    const [loading, setLoading] = useState(true);
    console.log(loading);
    const [images, setImages] = useState([]);
    console.log(images);
    useEffect(() => {
        getImages();
    }, [])

    const getImages = async () =>{
       const url = "https://canvas-api-rest.herokuapp.com/api/paintings";
       const resp = await fetch(url)
       const {paintings} = await resp.json();
       const imagenes = paintings.map( img =>{
           return {
               id: img.id,
               name: img.name,
               price: img.price,
               imageUrl: img.imageUrl,
           }
       })
       setImages(imagenes);
       setLoading(false);
    }

    return (
        <div className="home__main-container">
            <Navbar/>
            <h1 className="selled__title-related mb-5">Favoritas por nuestros usuarios</h1>
            
            {
                loading ? 
                    <h1>Loading...</h1> 
                    : 
                    <div className="selled__images-container">
                        {
                            images.map(img => {
                                return(<ImageItem
                                    key={img.id}
                                    img={img}
                                />)
                            })}
                    </div>   
            }
            
            <h1 className="selled__title-related">Relacionados</h1>
            <Relacionados/>
            <Footer/>
        </div>
    )
}
