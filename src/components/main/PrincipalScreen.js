import React from 'react'
import { Carousel } from './Carousel'
import { Navbar } from './Navbar'

export const PrincipalScreen = () => {
    return (
        <div className="home__main-container">
            <Navbar/>
            <Carousel/>
        </div>
    )
}
