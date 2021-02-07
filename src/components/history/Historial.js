import React, {useEffect, useState} from 'react'
import { Footer } from '../main/Footer'
import { Navbar } from '../main/Navbar'
import Table from 'react-bootstrap/Table'
import {useParams, Link} from "react-router-dom"

export const Historial = () => {
    const {id} = useParams();
    const [orden, setOrden] = useState(null);

    function getOrderById() {
        const url = `https://api-rest-canvas.herokuapp.com/api/orders/orders-by-customer/${id}`
        return fetch(url)
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
            <Table responsive="md" className="historial__table-container" striped bordered hover>
                <thead>
                    <tr>
                        <th>Orden Id</th>
                        <th>Fecha Orden</th>
                        <th>Nombre</th>
                        <th>Lugar</th>
                        <th>Envio</th>
                        <th>Total</th>
                        <th>Estado</th>
                        <th>Accion</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orden && (
                            orden.map((item)=>{
                                const D = new Date(item.order_date)
                                const path = `/main/history/orderDetail/${item.id}`
                                return (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{`${D.getDate()}/${D.getMonth()+1}/${D.getFullYear()}`}</td>
                                        <td>{item.customer_name}</td>
                                        <td>{item.delivery_zone.name}</td>
                                        <td>{`$${item.delivery_zone.delivery_cost}`}</td>
                                        <td>{`$${item.total_amount}`}</td>
                                        <td>{item.status}</td>
                                        <td><Link to={path}>Ver detalle</Link></td>
                                    </tr>    
                                )
                            })
                        ) 
                    }

                </tbody>
            </Table>
            <Footer />
        </div>
    )
}
