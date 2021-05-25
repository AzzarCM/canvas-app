import React, {useState,useEffect} from 'react'
import { useLoading, BallTriangle } from '@agney/react-loading';
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import { API_HOST } from '../../constants/URLS'
export const Temas = () => {

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
        const url = `${API_HOST}/themes`
        const resp = await fetch(url)
        const { themes } = await resp.json();
        const temas = themes.map(theme => {
            return {
                id: theme.id,
                name: theme.name,
                image_url: theme.image_url,
                active: theme.active,
            }
        })
        setThemes(temas);
        setLoading(false);
    }

    return (
        <div className="temas__themes-container animate__animated animate__fadeIn">
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
                <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
                    { themes.map(item => {
                        const path = `/main/categoria/${item.id}`
                        return (
                            <div> {item.active ? 
                                <Card className="temas__card-individual" key={item.id}>
                                    <Card.Img className="temas__card-image" variant="top" src={item.image_url} />
                                    <Card.Body className="temas__card-body">
                                    <Card.Title style={{color: "#31B199", marginBottom: '2rem'}}>{item.name}</Card.Title>
                                    <a href={path}>
                                        <Button  variant="outline-secondary">Ver tema</Button>
                                    </a>
                                    </Card.Body>
                                 </Card> :
                                <div></div>
                            
                            }</div>
                           
                        )
                    })}
                </div> 
            }
        </div>
    )
}
