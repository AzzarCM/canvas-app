import React, { useEffect, useState } from 'react'
import { Navbar } from "../main/Navbar"
import { Footer } from '../main/Footer'
import { SearchBar } from '../search/SearchBar'
import { Temas } from './Temas'

export const AllThemes = () => {
    
    return (
        <div className="home__main-container animate__animated animate__fadeIn">
            <Navbar />
            <SearchBar/>
            <Temas/>
            <Footer/>
        </div>
    )
}
