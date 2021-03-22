import React from 'react'
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import header from '../../assets/img/header.jpg';
export const Carousel = () => {
    return (
        <div className="carousel__main-container">
            <AliceCarousel autoPlay autoPlayInterval="3000">
                <img alt="imagen" src={header} className="carousel__sliderimg"/>
            </AliceCarousel>
        </div>
    )
}
