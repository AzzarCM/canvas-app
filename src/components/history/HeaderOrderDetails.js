import React from 'react'
import { progressOrderBar } from '../../utils/utils'
import moment from 'moment'
import step1 from '../../assets/img/step1.png';
import step2 from "../../assets/img/step2.png";
import step3 from "../../assets/img/step3.png";
import step4 from "../../assets/img/step4.png";

function HeaderOrderDetails({order}) {
    return (
        <>
            {order && 
            <>
                <div className="row d-flex justify-content-between px-3 top delivery">
                    <div className="d-flex header-bar delivery">
                        <h5>
                            ORDEN <span className="text-primary font-weight-bold">{`# ${order[0].id}`}</span>
                        </h5>
                    </div>
                    <div className="d-flex flex-column text-sm-right delivery">
                        <p className="mb-0">
                            Fecha de entrega estimada: 
                        </p>
                        <p style={{fontWeight: 'bold', marginBottom: 0}}>{`${moment(order[0].order_date).add(3,'days').format("DD-MM-YYYY")} al ${moment(order[0].order_date).add(5,'days').format("DD-MM-YYYY")}`}</p>
                    </div>
                </div>
                <div className="row d-flex justify-content-center delivery progress-column">
                        <div className="col-12">
                            <ul id="progressbar" className="text-center">
                                {progressOrderBar(order[0].status)}
                            </ul>
                        </div>
                </div>
                <div className="row justify-content-between top container-labels delivery">
                    <div className="row d-flex icon-content icon-container delivery">
                        {" "}
                        <img className="icon_header" src={step1} />
                        <div className="d-flex flex-column text-container delivery">
                            <p className="font-weight-bold text-label">
                            Orden
                            <br />
                            Pendiente
                            </p>
                        </div>
                    </div>
                    <div className="row d-flex icon-content icon-container delivery">
                    {" "}
                    <img className="icon_header" src={step2} />
                        <div className="d-flex flex-column text-container delivery">
                            <p className="font-weight-bold text-label">
                            Orden
                            <br />
                            Confirmada
                            </p>
                        </div>
                    </div>
                    <div className="row d-flex icon-content icon-container delivery">
                    {" "}
                    <img className="icon_header" src={step3} />
                        <div className="d-flex flex-column text-container delivery">
                            <p className="font-weight-bold text-label">
                            Orden <br />
                            En camino
                            </p>
                        </div>
                    </div>
                    <div className="row d-flex icon-content icon-container delivery">
                    {" "}
                    <img className="icon_header" src={step4} />
                        <div className="d-flex flex-column text-container delivery">
                            <p className="font-weight-bold text-label">
                            Orden <br />
                            Entregada
                            </p>
                        </div>
                    </div>
                </div>
            </>
            }
        </>
    )
}

export default HeaderOrderDetails

