import React from 'react'

export const SummaryOrder = ({ subtotal, delivery_cost, total }) => {
    return (
        <div style={{marginTop: '2rem'}}>
            <p className="title-info summary-text">Resumen</p>
            <div className="summary-container">
                <p className="text-summary-desc margin-0">
                    Subtotal: <span className="subtotal-cost">{`$ ${subtotal}`}</span>
                </p>
                <p className="text-summary-desc margin-0">
                    Envío: <span className="delivery-cost">{`$ ${delivery_cost}`}</span>
                </p>
                <hr />
                <p className="text-summary-desc total-text margin-0">
                    Total: <span className="total-cost">{`$ ${total}`}</span>
                </p>
            </div>
        </div>
    )
}
