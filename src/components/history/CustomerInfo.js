import React from 'react'

export const CustomerInfo = ({ order }) => {
    return (
        <>
            {
                order && (
                    <div>
                        <p className="title-info">Información del cliente</p>
                        <div style={{marginLeft: '4.5rem'}} className="address-container">
                            <div className="address-delivery text">
                                <p
                                    className="title-address"
                                    style={{ fontWeight: 700, paddingBottom: 8 }}
                                >
                                    Dirrección de entrega:{" "}
                                </p>
                                <p className="margin-0">{order[0].customer_name}</p>
                                <p className="margin-0">{order[0].email}</p>
                                <p className="margin-0">{`+503 ${order[0].customer_phone}`}</p>
                                <p className="margin-0">{order[0].delivery_address}</p>
                                <p className="margin-0">{`${order[0].suburb}, ${order[0].municipality}, ${order[0].department}, El Salvador.`}</p>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

