import React from 'react'
import { Footer } from '../main/Footer'
import { Navbar } from '../main/Navbar'
import { Relacionados } from '../temas/Relacionados'

export const MostSelledScreen = () => {
    return (
        <div className="home__main-container">
            <Navbar/>
            <h1 className="selled__title-related">Relacionados</h1>
            <Relacionados/>
            <Footer/>
        </div>
    )
}
