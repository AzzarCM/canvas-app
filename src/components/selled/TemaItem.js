import React from 'react'
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import { useHistory } from 'react-router-dom'

export const TemaItem = ({item}) => {
    let history = useHistory();
    const path = `/main/categoria/${item.id}` 
    
    const handleClick = () =>{
        history.push(path);
    }
    return (
        <div>
            {item.active ?
            <Card onClick={handleClick} className="temas__card-individual" key={item.id}>
                <Card.Img className="temas__card-image" variant="top" src={item.image_url} />
                <Card.Body className="temas__card-body">
                    <Card.Title style={{color: "#31B199", marginTop: '2rem'}}>{item.name}</Card.Title>
                    {item.discount > 0.0 && <div className="temas__overlay-cont">{`${item.discount*100}% OFF`}</div>}
                </Card.Body>
                
            </Card> :
            <></>
            }
        </div>
        
    )
}
