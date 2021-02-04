import React, { useEffect, useState } from 'react'
import { Navbar } from "../main/Navbar"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import { Footer } from '../main/Footer'
import { useLoading, BallTriangle } from '@agney/react-loading';
import { SearchBar } from '../search/SearchBar'

export const AllThemes = () => {
    
    const [themes, setThemes] = useState([])
    const [loading, setLoading] = useState(true);

    const { containerProps, indicatorEl } = useLoading({
        loading: loading,
        indicator: <BallTriangle width="50" />,
      });

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
        setLoading(false);
    }

    return (
        <div className="home__main-container animate__animated animate__fadeIn">
            <Navbar />
            <SearchBar/>
            {
                loading ?
                    <section style={{
                        display: 'flex',
                        justifyContent: 'center',
                        height: '100vh',
                        width: '100vw',
                    }} {...containerProps}>
                        {indicatorEl}
                    </section>
                :
                    <div className="temas__themes-container animate__animated animate__fadeIn">
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
            }
            
            <Footer/>
        </div>
    )
}
