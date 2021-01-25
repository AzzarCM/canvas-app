import React, { useEffect, useState } from 'react'
import { Navbar } from "../main/Navbar"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import { Footer } from '../main/Footer'


export const AllThemes = () => {
    
    const [themes, setThemes] = useState([])

    useEffect(() => {
        getAllThemes();
    }, [])

    const getAllThemes = async () => {
        const url = "https://api-rest-canvas.herokuapp.com/api/themes";
        const resp = await fetch(url)
        const { themes } = await resp.json();
        const temas = themes.map(theme => {
            return {
                id: theme.id,
                name: theme.name,
                image_url: theme.image_url,
            }
        })
        setThemes(temas);
    }

    return (
        <div className="home__main-container">
            <Navbar />
            <div className="temas__themes-container animate__animated animate__fadeInLeft">
                { themes.map(item => {
                    const path = `/main/categoria/${item.id}`
                    console.log(path);
                    return (
                        <Card key={item.id} style={
                            {
                             width: '18rem',
                             marginLeft: 10,
                             marginTop: 10,
                                
                            }}>
                            <Card.Img style={{
                                width: 286,
                                height: 180,
                                objectFit: 'cover',
                            }} variant="top" src={item.image_url} />
                            <Card.Body>
                                <Card.Title>{item.name}</Card.Title>
                                <a href={path}>
                                <Button  variant="outline-secondary">Ver todos</Button>
                                </a>
                            </Card.Body>
                        </Card>
                    )
                })}
            </div> 
            <Footer/>
        </div>
    )
}
