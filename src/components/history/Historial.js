import React, {useEffect, useState} from 'react'
import { Footer } from '../main/Footer'
import { Navbar } from '../main/Navbar'
import Table from 'react-bootstrap/Table'
import {useParams, Link} from "react-router-dom"
import { API_HOST } from '../../constants/URLS'


export const Historial = () => {
    const {id} = useParams();
    const [orden, setOrden] = useState([]);

    
    function getOrderById() {
        const url = `${API_HOST}/orders/orders-by-customer/${id}`
            var idToken = localStorage.getItem("idToken")
            return fetch(url,{
                headers: {
                    "Authorization": 'Bearer ' + idToken,
                }
            })
            .then((res)=>{
                return res.json();
            })
            .then((result)=>{
                return result
            })
    }

    useEffect(() => {
        getOrderById()
            .then((res)=>{
                setOrden(res.orders)
            })
    }, [])


    return (
        <div className="home__main-container animate__animated animate__fadeIn">
            <Navbar />
            <h1 className="selled__title-related mb-5">Historial de compras</h1>
            <Table variant="dark" style={{marginBottom: 200, width: '80vw', borderRadius: 25, borderStyle: 'hidden', marginLeft: '1rem'}} responsive="md" striped bordered hover>
                <thead>
                    <tr>
                        <th>Orden Id</th>
                        <th>Fecha Orden</th>
                        <th>Nombre</th>
                        <th>Envio</th>
                        <th>Total</th>
                        <th>Estado</th>
                        <th>Accion</th>
                    </tr>
                </thead>
                <tbody style={{textAlign: 'center'}}>
                    {
                        orden.length > 0 ? (
                            orden.map((item)=>{
                                const D = new Date(item.order_date)
                                const path = `/main/history/orderDetail/${item.id}`
                                return (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{`${D.getDate()}/${D.getMonth()+1}/${D.getFullYear()}`}</td>
                                        <td>{item.customer_name}</td>
                                        <td>{`$${item.delivery_cost}`}</td>
                                        <td>{`$${item.total_amount}`}</td>
                                        <td>{item.status}</td>
                                        <td><Link className="detail-button" to={path}>Ver <i className="fas fa-info-circle responsive-icon"></i></Link></td>
                                    </tr>    
                                )
                            })
                        ) : <tr><td>No hay ordenes disponibles.</td></tr>
                    }

                </tbody>
            </Table>
            <Footer />
        </div>
    )
}
