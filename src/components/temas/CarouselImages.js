import React from 'react'
import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';
import img2 from '../../assets/img/paint1.jpg';
import img3 from '../../assets/img/paint2.jpg';

export const CarouselImages = ({img}) => {
    const images = [{src: img},{src: img2}, {src: img3}]
    

    return (
        <Carousel images={images} className="carusel__container-img" maxIcon={false} playIcon={false} />
    )
}
