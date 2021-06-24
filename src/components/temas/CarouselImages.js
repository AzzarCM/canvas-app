import React from 'react'
import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';
import img2 from '../../assets/img/paint1.jpeg';
import img3 from '../../assets/img/paint2.jpeg';

export const CarouselImages = ({img}) => {
    const images = [{src: img},{src: img2}, {src: img3}]
    

    return (
        <Carousel images={images} style={{backgroundColor: 'white', width: 500}} maxIcon={false} />
    )
}
