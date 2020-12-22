import React from 'react'
import landscapes from '../../assets/img/landscapes.png';
import people from '../../assets/img/people.png';
import arte from '../../assets/img/arte.png';
import caminos from '../../assets/img/caminos.png';

export const Relacionados = () => {
    return (
        <div className="related__main-container">
            <div className="home__photo-item">
                    <img alt="imagen" src={landscapes}/>
                    <p className="home__photo-title">LANDSCAPES</p>
                    <p className="related__color-c">$119.00</p>
                </div>
                <div className="home__photo-item">
                    <img alt="imagen" src={caminos}/>
                    <p className="home__photo-title">CAMINOS</p>
                    <p className="related__color-c">$99.00</p>
                </div>
                <div className="home__photo-item">
                    <img alt="imagen" src={arte}/>
                    <p className="home__photo-title">ARTE</p>
                    <p className="related__color-c">$399.99</p>
                </div>
                <div className="home__photo-item">
                    <img alt="imagen" src={people}/>
                    <p className="home__photo-title">PEOPLE</p>
                    <p className="related__color-c">$200.00</p>
            </div>
        </div>
    )
}
