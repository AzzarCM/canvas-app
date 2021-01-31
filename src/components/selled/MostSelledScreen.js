import React, {useEffect, useState} from 'react'
import { Footer } from '../main/Footer'
import { Navbar } from '../main/Navbar'
import { Relacionados } from '../temas/Relacionados'
import { ImageItem } from './ImageItem'
import { useLoading, BallTriangle } from '@agney/react-loading';

export const MostSelledScreen = () => {
    const [loading, setLoading] = useState(true);
    const [images, setImages] = useState([]);
    
    const { containerProps, indicatorEl } = useLoading({
        loading: loading,
        indicator: <BallTriangle width="50" />,
      });

    useEffect(() => {
        getImages();
    }, [])

    const getImages = async () =>{
       const url = "https://api-rest-canvas.herokuapp.com/api/paintings";
       const resp = await fetch(url)
       const {paintings} = await resp.json();
       const imagenes = paintings.map( img =>{
           return {
               id: img.id,
               name: img.name,
               price: img.price,
               image_url: img.image_url,
           }
       })
       setImages(imagenes);
       setLoading(false);
    }

    return (
        <div className="home__main-container animate__animated animate__fadeIn">
            <Navbar/>
            <h1 className="selled__title-related mb-5">Favoritas por nuestros usuarios</h1>
            
            {
                loading ? 
                    <section style={{
                        display: 'flex',
                        justifyContent: 'center',
                        height: '100vh',
                        width: '100vw',
                    }} {...containerProps}>
                        {indicatorEl}
                    </section>
                    : 
                    <div style={{paddingBottom: 150}} className="selled__images-container">
                        {
                            images.map(img => {
                                return(<ImageItem
                                    key={img.id}
                                    img={img}
                                />)
                            })}
                    </div>   
            }
            <Footer/>
        </div>
    )
}
