import React, { useEffect, useState } from 'react'
import { Navbar } from "../main/Navbar"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"


export const AllThemes = () => {
    
    const [themes, setThemes] = useState([])
    console.log(themes);

    useEffect(() => {
        getAllThemes();
    }, [])

    const getAllThemes = async () => {
        const url = "https://canvas-api-rest.herokuapp.com/api/themes";
        const resp = await fetch(url)
        const { themes } = await resp.json();
        const temas = themes.map(theme => {
            return {
                id: theme.id,
                name: theme.name,
                description: theme.description,
            }
        })
        setThemes(temas);
    }

    return (
        <div className="home__main-container">
            <Navbar />
            <div className="temas__themes-container">
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
                            <Card.Body>
                                <Card.Title>{item.name}</Card.Title>
                                <Card.Text>
                                    {item.description}
                                </Card.Text>
                                <a href={path}>
                                <Button  variant="outline-secondary">Ver todos</Button>
                                </a>
                            </Card.Body>
                        </Card>
                    )
                })}
            </div> 
        </div>
    )
}
