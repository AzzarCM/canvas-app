import React from 'react'

export const TableDetails = ({ details }) => {
    return (
        <>
            {
                details && (
                    <div>
                        <p style={{ marginLeft: '4.5rem' }} className="title-info product-title">Información de productos</p>
                        <div className="table-responsive">
                            <table className="table table-details">
                                <thead className="table-light text-center">
                                    <tr style={{borderColor: 'inherit', borderStyle: 'solid', borderWidth: 2}}>
                                        <th scope="col">Producto</th>
                                        <th scope="col">Precio</th>
                                        <th scope="col">Cantidad</th>
                                        <th scope="col">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        details.map((item) => (
                                            <tr className="align-middle text-center">
                                                <th scope="row" width="40%">
                                                    <div className="container-product-item principal-info">
                                                        <img className="product-img" src={item.painting.image_url} width="80px" />
                                                        <div className="text-container-product">
                                                            <p className="product-name margin-0">{item.painting.name}</p>
                                                            <p className="description-product-item material-name margin-0">{item.material.name}</p>
                                                            <p className="description-product-item dimensions margin-0">{`${item.measurements} m`}</p>
                                                        </div>
                                                    </div>
                                                </th>
                                                <td width="20%" className="row-price">{`$ ${item.price}`}</td>
                                                <td width="20%">{item.quantity}</td>
                                                <td width="20%">{`$ ${item.amount}`}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>

                        </div>
                    </div>
                )
            }
        </>
    )
}
