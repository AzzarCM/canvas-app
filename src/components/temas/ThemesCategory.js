import React from 'react'
import { Navbar } from "../main/Navbar"
import { SideBar } from './SideBar'
import { WrapImages } from './WrapImages'

export const ThemesCategory = () => {

    return (
        <div className="home__main-container">
            <Navbar/>
            <div className="temas__search-container">
                <SideBar/>
                <WrapImages/>
            </div>
        </div>
    )
}
