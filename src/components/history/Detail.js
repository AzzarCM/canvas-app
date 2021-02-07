import React, {useEffect, useState} from 'react'
import { Footer } from '../main/Footer'
import { useParams } from 'react-router-dom'
import { Navbar } from '../main/Navbar';
import Jumbotron from 'react-bootstrap/Jumbotron'

export const Detail = () => {
    const {id} = useParams();
    const [orderDetail, setOrderDetail] = useState(null);

    function getOrderDetailById() {
        const url = `https://api-rest-canvas.herokuapp.com/api/orders-details/order/${id}`
        return fetch(url)
            .then((res)=>{
                return res.json();
            })
            .then((result)=>{
                return result
            })
    }

    useEffect(() => {
        getOrderDetailById()
            .then(({order_detail})=>{
                setOrderDetail(order_detail);
            })
    }, []);

    return (
        <div className="home__main-container animate__animated animate__fadeIn">
            <Navbar/>
            <h1 className="selled__title-related mb-5">{`Detalle de la orden #${id}`}</h1>
            {
                orderDetail && (
                    orderDetail.map((item)=>{
                        return (
                            <Jumbotron key={item.id}>
                                <div key={item.id} className="temas__container-jumbotron">
                                    <img className="temas__imagen"  key={item.id} src={item.painting.image_url} alt="imagen"/>
                                    <div key={item.id} className="temas_container-jumbo-right">
                                        <h1 key={item.id} style={{color: "#21AB91", marginBottom:50}}>{item.painting.name}</h1>
                                        <p key={item.id}>{item.painting.description}</p>
                                        <div key={item.id} style={{display: 'flex'}}>
                                            <b key={item.id}>Material: </b>
                                            <p key={item.id}style={{marginLeft: 10}}>{item.material.name}</p>
                                        </div>
                                        <div key={item.id} style={{display: 'flex'}}>
                                            <b key={item.id}>Precio: </b>
                                            <p key={item.id} style={{marginLeft: 10}}>{`$${item.price}`}</p>
                                        </div>
                                        <div key={item.id} style={{display: 'flex'}}>
                                            <b key={item.id}>Cantidad: </b>
                                            <p key={item.id} style={{marginLeft: 10}}>{item.quantity}</p>
                                        </div>
                                        <div key={item.id} style={{display: 'flex'}}>
                                            <b key={item.id}>Total: </b>
                                            <p key={item.id} style={{marginLeft: 10}}>{`$${item.amount}`}</p>
                                        </div>
                                    </div>
                                </div>                      
                            </Jumbotron>
                        )
                    })
                )
            }
            <Footer/>
        </div>
    )
}
