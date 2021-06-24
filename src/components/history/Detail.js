import React, { useEffect, useState } from 'react'
import { Footer } from '../main/Footer'
import { useParams } from 'react-router-dom'
import { Navbar } from '../main/Navbar';
import Jumbotron from 'react-bootstrap/Jumbotron'
import { API_HOST } from '../../constants/URLS'
import HeaderOrderDetails from './HeaderOrderDetails';
import { CustomerInfo } from './CustomerInfo'
import { TableDetails } from './TableDetails'
import { SummaryOrder } from './SummaryOrder';
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

    if (!orderDetail || !deliveryDetail) return null;
    console.log(deliveryDetail);
    const { total_amount, delivery_cost } = deliveryDetail[0];
    const total = parseFloat(total_amount).toFixed(2);
    const deliveryCost = parseFloat(delivery_cost).toFixed(2);
    const subTotal = parseFloat(total_amount - delivery_cost).toFixed(2);
    console.log(subTotal, 'en det');
    return (
        <div className="home__main-container animate__animated animate__fadeIn">
            <Navbar />
            <div className="history__delivery-container">
                <h3 className="selled__title-related">Proceso de la orden</h3>
                <HeaderOrderDetails order={deliveryDetail}/>
                <Jumbotron>
                    <h3 className="selled__title-related" style={{marginTop: 0}}>Detalles de la orden</h3>
                    <hr/>
                    <CustomerInfo order={deliveryDetail}/>
                    <div>
                        <TableDetails details={orderDetail}/>
                    </div>
                    <div className="footer-details">
                        <SummaryOrder 
                            subtotal={subTotal}
                            delivery_cost={deliveryCost}
                            total={total}
                        />

                    </div>
                </Jumbotron>
                
            </div>
            <Footer />
        </div>
    )
}
