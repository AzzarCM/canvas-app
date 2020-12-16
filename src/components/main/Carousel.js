import React from 'react'
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import image1 from "../../assets/img/imagef.png"
import image2 from "../../assets/img/images.jpg"
export const Carousel = () => {
    return (
        <div className="carousel__main-container">
            <AliceCarousel autoPlay autoPlayInterval="3000">
                <img alt="imagen" src={image1} className="carousel__sliderimg"/>
                <img alt="imagen" src={image2} className="carousel__sliderimg"/>
            </AliceCarousel>
        </div>
    )
}
