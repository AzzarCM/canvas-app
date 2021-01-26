import React, {useEffect, useState} from 'react'
import { Footer } from '../main/Footer'
import { Navbar } from '../main/Navbar'
import Table from 'react-bootstrap/Table'
import {useParams} from "react-router-dom"

export const Historial = () => {
    const {id} = useParams();
    const [orden, setOrden] = useState(null);

    console.log(orden);
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
        <div className="home__main-container">
            <Navbar />
            <h1 className="selled__title-related mb-5">Historial de compras</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Orden Id</th>
                        <th>Nombre</th>
                        <th>Last Name</th>
                        <th>Username</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orden && (
                            orden.map((item)=>{
                                return (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.customer_name}</td>
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
