import React from 'react'
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import header from '../../assets/img/header.jpg';
import banner1 from '../../assets/img/banner1.png';
import banner2 from '../../assets/img/banner2.png';
import banner3 from '../../assets/img/banner3.jpg';
import banner4 from '../../assets/img/banner4.jpg';



export const Carousel = () => {



    return (
        <div className="carousel__main-container">
            <AliceCarousel>
                <img alt="imagen" src={banner3}  className="carousel__sliderimg"/>  
                <img alt="imagen" src={banner4}  className="carousel__sliderimg"/>
            </AliceCarousel>
        </div>
    )
}
