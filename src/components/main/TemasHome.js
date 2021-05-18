import React, {useState,useEffect}  from 'react'
import { useLoading, BallTriangle } from '@agney/react-loading';
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import { API_HOST } from '../../constants/URLS'

export const TemasHome = () => {

    const [themes, setThemes] = useState([])
    const [loading, setLoading] = useState(true);

    const { containerProps, indicatorEl } = useLoading({
        loading: loading,
        indicator: <BallTriangle width="50" />,
      });
    
    function getThemes() {
        const url = `${API_HOST}/themes/home`
        return fetch(url).then((res)=>{
            console.log("hola");
            return res.json()
        })
        .then((result)=>{
            return result
        })
    }
    
    useEffect(() => {
        getThemes()
        .then((res)=>{
            if(res.error){
                console.log('hubo un error cargando los temas :C');
            }else{
                setThemes(res.paintings);
                setLoading(false);
            }
        })
    }, [])
    
      

    return (
        <div  className="temas__themes-container animate__animated animate__fadeIn">
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
            <div style={{display: 'flex', flexWrap: 'wrap'}}>
            { themes.map(item => {
                const path = `/main/categoria/${item.id}`
                console.log(path);
                return (
                    <Card className="temas__card-individual" key={item.id}>
                        <Card.Img className="temas__card-image" variant="top" src={item.image_url} />
                        <Card.Body className="temas__card-body">
                            <Card.Title style={{color: "#31B199", marginBottom: '2rem'}}>{item.name}</Card.Title>
                            <a href={path}>
                            <Button  variant="outline-secondary">Ver tema</Button>
                            </a>
                        </Card.Body>
                    </Card>
                )
            })}
        </div> 
           } 
        </div>
    )
}
