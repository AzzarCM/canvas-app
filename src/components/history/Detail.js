import React, { useEffect, useState } from 'react'
import { Footer } from '../main/Footer'
import { useParams } from 'react-router-dom'
import { Navbar } from '../main/Navbar';
import Jumbotron from 'react-bootstrap/Jumbotron'
import { API_HOST } from '../../constants/URLS'
export const Detail = () => {
    const { id } = useParams();
    const [orderDetail, setOrderDetail] = useState(null);
    const [deliveryDetail, setDeliveryDetail] = useState(null);

    function getOrderDetailById() {
        const url = `${API_HOST}/orders-details/order/${id}`
        var idToken = localStorage.getItem("idToken");
        return fetch(url,{
            headers:{
                "Authorization": 'Bearer ' + idToken,
            }
        })
        .then((res) => {
            return res.json();
        })
        .then((result) => {
            return result
        })
    }
    function getOrderDeliveryDetail() {
        const url = `${API_HOST}/orders/${id}`
        var idToken = localStorage.getItem("idToken");
        return fetch(url,{
            headers:{
                "Authorization": 'Bearer ' + idToken,
            }
        })
        .then((res) => {
            return res.json();
        })
        .then((result) => {
            return result
        })
    }

    useEffect(() => {
        getOrderDeliveryDetail()
            .then(({ order }) => {
                setDeliveryDetail(order);
            })
    }, [])

    useEffect(() => {
        getOrderDetailById()
            .then(({ order_detail }) => {
                setOrderDetail(order_detail);
            })
    }, []);

    return (
        <div className="home__main-container animate__animated animate__fadeIn">
            <Navbar />
            <div className="history__delivery-container">
                <h3 className="selled__title-related">Detalles de la orden</h3>
                <Jumbotron>
                {
                    deliveryDetail && (
                        deliveryDetail.map((item) => {
                            const D = new Date(item.order_date);
                            return (
                                <div>
                                    <div className="history__order-details">
                                        <b>Numero: </b>
                                        <p style={{ marginLeft: 10 }}>{`#${item.id}`}</p>
                                    </div>
                                    <div className="history__order-details">
                                        <b>Fecha de la orden: </b>
                                        <p style={{ marginLeft: 10 }}>{`${D.getDate()}/${D.getMonth() + 1}/${D.getFullYear()}`}</p>
                                    </div>
                                    <div className="history__order-details">
                                        <b>Estado: </b>
                                        <p style={{ marginLeft: 10 }}>{item.status}</p>
                                    </div>
                                    <div className="history__order-details">
                                        <b>Tipo de pago: </b>
                                        <p style={{ marginLeft: 10 }}>{item.payment_type}</p>
                                    </div>
                                    <div className="history__order-details">
                                        <b>Total pagado: </b>
                                        <p style={{ marginLeft: 10 }}>{`$${item.total_amount}`}</p>
                                    </div>
                                </div>
                            )
                        })
                    )
                }
                </Jumbotron>
                
            </div>

            <div className="history__delivery-container">
                <h3 style={{margin:10}} className="selled__title-related">Detalles del envio</h3>
                <Jumbotron>
                {
                    deliveryDetail && (
                        deliveryDetail.map((item) => {
                            const D = new Date(item.order_date);
                            return (
                                <div>
                                    <div className="history__order-details">
                                        <b>Nombre: </b>
                                        <p style={{ marginLeft: 10 }}>{item.customer_name}</p>
                                    </div>
                                    <div className="history__order-details">
                                        <b>Telefono: </b>
                                        <p style={{ marginLeft: 10 }}>{item.customer_phone}</p>
                                    </div>
                                    <div className="history__order-details">
                                        <b>Zona: </b>
                                        <p style={{ marginLeft: 10 }}>{item.delivery_zone.name}</p>
                                    </div>
                                    <div className="history__order-details">
                                        <b>Direccion: </b>
                                        <p style={{ marginLeft: 10 }}>{item.delivery_address}</p>
                                    </div>
                                    <div className="history__order-details">
                                        <b>Fecha de entrega: </b>
                                        <p style={{ marginLeft: 10 }}>{`${D.getDate() + 3}/${D.getMonth() + 1}/${D.getFullYear()} al ${D.getDate() + 5}/${D.getMonth() + 1}/${D.getFullYear()}`}</p>
                                    </div>
                                    <div className="history__order-details">
                                        <b>Costo de envio: </b>
                                        <p style={{ marginLeft: 10 }}>{`$${item.delivery_zone.delivery_cost}`}</p>
                                    </div>
                                    <div className="history__order-details">
                                        <b>Instrucciones: </b>
                                        <p style={{ marginLeft: 10 }}>{item.instructions ? item.instructions : <p>No hay instrucciones especificas para la entrega</p>}</p>
                                    </div>
                                </div>
                            )
                        })
                    )
                }
                </Jumbotron>   
            </div>

            <div className="history__delivery-container">
                <h3 style={{margin:10}} className="selled__title-related">Articulos adquiridos</h3>
                {
                orderDetail && (
                    orderDetail.map((item) => {
                        return (
                            <Jumbotron key={item.id}>
                                <div key={item.id} className="temas__container-jumbotron">
                                    <div>
                                        <h1 style={{ color: "#21AB91", marginBottom: 10, textAlign:'center'}}>{item.painting.name}</h1>
                                        <img className="temas__imagen-detail" src={item.painting.image_url} alt="imagen" />
                                    </div>
                        
                                    <div className="temas_container-jumbo-right"> 
                                        <p >{item.painting.description}</p>
                                        <div className="history__order-details">
                                            <b>Material: </b>
                                            <p style={{ marginLeft: 10 }}>{item.material.name}</p>
                                        </div>
                                        <div className="history__order-details">
                                            <b>Precio: </b>
                                            <p style={{ marginLeft: 10 }}>{`$${item.price}`}</p>
                                        </div>
                                        <div className="history__order-details">
                                            <b>Cantidad: </b>
                                            <p style={{ marginLeft: 10 }}>{item.quantity}</p>
                                        </div>
                                        <div className="history__order-details">
                                            <b>Total: </b>
                                            <p style={{ marginLeft: 10 }}>{`$${item.amount}`}</p>
                                        </div>
                                    </div>
                                </div>
                            </Jumbotron>
                        )
                    })
                )
            }
            </div>
            <Footer />
        </div>
    )
}
