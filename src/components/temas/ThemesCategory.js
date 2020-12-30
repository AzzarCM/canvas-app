import React from 'react'
import { Navbar } from "../main/Navbar"
import { SideBar } from './SideBar'
import { WrapImages } from './WrapImages'
import {useParams} from "react-router-dom"
import { Footer } from '../main/Footer'
export const ThemesCategory = () => {
    const {id} = useParams();
    return (
        <div className="home__main-container">
            <Navbar/>
            <div className="temas__search-container">
                <SideBar/>
                <WrapImages id={id}/>
            </div>
            <Footer/>
        </div>
    )
}
