import React from 'react'
import { Navbar } from "../main/Navbar";
import { Footer } from "../main/Footer"
import question from "../../assets/img/question.png";
import Accordion from "@material-ui/core/Accordion"
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { SearchBar } from '../search/SearchBar';
import Table from 'react-bootstrap/Table'

export const QuestionScreen = () => {
    return (
        <div className="home__main-container animate__animated animate__fadeIn">
            <Navbar />
            <SearchBar/>
            <div className="questions__first-part">
                <img className="question__image" alt="imagen" src={question} />
                <div>
                    <h1 className="questions__title">¿Tienes dudas?</h1>
                    <p className="questions__paragraph">Aqui hay una serio de preguntas frecuentes por parte de nuestros clientes <br />
                        Cualquier pregunta mas especifica la puedes hacer a traves de nuestras redes <br />
                        o puedes mandarnos un correo a: <br></br> <br></br> atencionalcliente@canvasframeit.com <br />
                    </p>
                   {/* { <div className="questions__search-part">
                        <input className="questions__search-input" type="text" />
                        <button className="questions__search-button"><i className="fas fa-search"></i></button>
                    </div>} */}
                </div>
            </div>
            <h1 className="selled__title-related mb-5">Preguntas frecuentes!</h1>

            <div className="questions__accordion-div">

                <h1 className="selled__title-related mb-5">ORDENES Y PEDIDOS</h1>
                <Accordion
                    style={{marginBottom: 5}}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                    <Typography style={{color:"#42bda5", fontSize: 30}}>¿Que materiales ocupan?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography
                            style={{color: '#868686'}}
                        >
                            Todos los cuadros cuentan con su bastidor de madera, Actualmente ofrecemos canvas (lienzo), acrílico y vinil laminado. Sin embargo, estamos trabajando constantemente para traerte una mayor variedad.
                        </Typography>
                    </AccordionDetails>
                </Accordion>


                <Accordion
                    style={{marginBottom: 5}}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                    <Typography style={{color:"#42bda5", fontSize: 30}}>¿Puedo cancelar mi orden?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography
                            style={{color: '#868686'}}
                        >
                            En el momento en el que colocas tu orden, empezamos a trabajar en ella lo más rápido posible. Sin embargo, sabemos que los errores ocurren. Haremos todo lo posible para cancelar tu orden. Para procesar tu cancelación, escríbenos un correo a atencionalcliente@canvasframeit.com.
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion
                    style={{marginBottom: 5}}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                    <Typography style={{color:"#42bda5", fontSize: 30}}>¿Cuáles son los tiempos de producción y envío?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography
                            style={{color: '#868686'}}
                        >
                            <b>
                            Siempre buscamos completar los pedidos lo antes posible. Sin embargo, los tiempos a los que nos comprometemos son los siguientes:

                            </b>
                            <Table>
                            <thead>
                            <tr>
                                <th>Material</th>
                                <th>Produccion</th>
                                <th>Envio</th>
                                <th>Recoleccion</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Canvas</td>
                                <td>1-2 dias</td>
                                <td>1-2 dias</td>
                                <td>3 dias</td>
                            </tr>
                            <tr>
                                <td>Vinil Laminado</td>
                                <td>1-2 dias</td>
                                <td>1-2 dias</td>
                                <td>3 dias</td>
                            </tr>
                            <tr>
                                <td>CanBites</td>
                                <td>1-2 dias</td>
                                <td>1-2 dias</td>
                                <td>3 dias</td>
                            </tr>
                        </tbody>
                        </Table>
                        <b>
                        *Todos los tiempos de producción y envío solo toman en cuenta los días hábiles. Es decir, de Lunes a Viernes, a excepción de los días de asueto oficiales.
                        Estos tiempos de producción son considerados para todos los pedidos hechos antes de las 12:00 p. m. (mediodía). Los pedidos hechos después de este horario serán pasados a producción hasta el siguiente día hábil, a partir del que empieza a contar nuestro tiempo de producción y envío.
                        Un pedido se pasa a producción solamente hasta que se haya concretado el pago. El tiempo de producción se puede extender en los casos en que la imagen proporcionada por el cliente no sea de la resolución requerida para obtener un buen resultado a la hora de la impresión.
                        </b>
                       
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion
                    style={{marginBottom: 5}}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                    <Typography style={{color:"#42bda5", fontSize: 30}}>¿Cómo reviso el estatus de mi pedido?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography
                            style={{color: '#868686'}}
                        >
                            
                            En la opcion de la barra de navegacion que dice "HISTORIAL" hay 4 estados

                            
                            <br/>
                            <b>EN PROCESO</b>
                            <br/>
                            <b>CONFIRMADA</b>
                            <br/>
                            <b>EN CAMINO</b>
                            <br/>
                            <b>ENTREGADA</b>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            
                <Accordion
                    style={{marginBottom: 5}}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                    <Typography style={{color:"#42bda5", fontSize: 30}}>¿A dónde pueden llegar los envíos?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography
                            style={{color: '#868686'}}
                        >
                            ¡A donde sea, dentro de El Salvador! Hacemos envíos a cualquier lugar de El Salvador
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion
                    style={{marginBottom: 5}}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                    <Typography style={{color:"#42bda5", fontSize: 30}}>¿Se pueden hacer pedidos por fuera de la página?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography
                            style={{color: '#868686'}}
                        >
                           Puedes realizar tus pedidos por medio de la página web, nuestra página en Instagram, correo electrónico o por nuestro whatsapp. Si requieres asistencia en cualquier parte del proceso, ¡Estamos para ayudarte! Envíanos un correo a micanva@canvasframeit.com.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                
                <Accordion
                    style={{marginBottom: 5}}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                    <Typography style={{color:"#42bda5", fontSize: 30}}>¿Hay descuentos por volumen?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography
                            style={{color: '#868686'}}
                        >
                            ¡Claro que sí! Para pedidos de grandes cantidades, ofrecemos descuentos especiales.

                            Si tu pedido es de nivel empresarial, la mejor manera para manejarlo es directamente con nosotros. Puedes empezar escribiéndonos un correo a atencionalcliente@canvasframeit.com.

                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion
                    style={{marginBottom: 5}}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                    <Typography style={{color:"#42bda5", fontSize: 30}}>¿Puedo solicitar un cuadro a medida exacta?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography
                            style={{color: '#868686'}}
                        >
                    ¡Si puedes! Si deseas un cuadro con medidas personalizadas, nos puedes escribir un correo a atencionalcliente@canvasframeit.com comentándonos las medidas que deseas acompañada de la imagen, luego de verificar la calidad de la imagen y la proporción del cuadro, te comentamos el precio del cuadro. 

                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion
                    style={{marginBottom: 5}}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                    <Typography style={{color:"#42bda5", fontSize: 30}}>¿Qué resolución necesita tener la foto?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography
                            style={{color: '#868686'}}
                        >
                            <ul class="list-group">
                                <li class="list-group-item">Enviadas por correo electrónico con resolución completa</li>
                                <li class="list-group-item">No se garantiza buena resolución si las fotos son enviadas por whatsapp, facebook o cualquier otra red social</li>
                                <li class="list-group-item">Tomadas con celular o con cámara profesional. </li>
                                <li class="list-group-item">No se garantiza buena resolución si la imagen es pequeña.</li>
                                <li class="list-group-item">Descargadas de bancos de imágenes de buena calidad.</li>
                                <li class="list-group-item">No se garantiza buena resolución con fotografías con filtros de redes sociales.</li>
                                <li class="list-group-item">No se aceptan montajes realizados, es necesario brindar la imagen con la resolución adecuada, en caso se deseen cuadros de montajes realizados, el diseño del cuadro tendrá costo aparte y no garantizamos exactitud en la réplica de cuadros hechos en montajes. </li>
                            </ul>
                        <b>
                        Cualquier teléfono celular moderno o cámara digital toma fotografías con una calidad más que suficiente para una impresión de alta definición. Sin embargo, es importante que esta foto no haya sido transferida por alguna aplicación como Whatsapp, Facebook, Instagram, etc. ya que estas aplicaciones comprimen las imágenes, y hacen que pierdan calidad.
                        En sí, la resolución mínima dependerá del tamaño del cuadro, y si tienes alguna duda de si tu imagen se verá bien impresa en el tamaño que quieres, puedes enviarnos un correo a atencionalcliente@canvasframeit.com adjuntando tu imagen y con gusto te ayudaremos.

                        </b>
                      
     
                        </Typography>
                    </AccordionDetails>
                </Accordion>


                <Accordion
                    style={{marginBottom: 5}}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                    <Typography style={{color:"#42bda5", fontSize: 30}}>¿Puedo ver una muestra de mi pedido?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography
                            style={{color: '#868686'}}
                        >
                            ¡Claro! Si gustas, puedes solicitar una muestra digital de tu pedido. Solo agrégalo en las notas al hacer el pago y ¡listo!
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion
                    style={{marginBottom: 5}}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                    <Typography style={{color:"#42bda5", fontSize: 30}}>¿Me pueden ayudar con correcciones de mi foto?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography
                            style={{color: '#868686'}}
                        >
                        ¡Nuestro equipo de diseño está para ayudarte! Cualquier corrección menor, como edición de contrastes, concentración del color, ojos rojos, o convertir la foto en blanco y negro puede ser procesado por nuestros diseñadores ¡sin costo extra! hasta 3 cambios máximos por imagen.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion
                    style={{marginBottom: 5}}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                    <Typography style={{color:"#42bda5", fontSize: 30}}>¿Qué cuidados debo darle a mis productos?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography
                            style={{color: '#868686'}}
                        >
                            <b>
                            Cada uno de nuestros productos requiere de diferentes medidas para mantener su calidad impecable. Sin embargo, tenemos algunas recomendaciones para maximizar la conservación de tus pedidos:

                            </b>
                           <ul class="list-group">
                                <li class="list-group-item">Colocarlos en un lugar sin exposición directa al sol.</li>
                                <li class="list-group-item">Mantenerlos en un ambiente libre de humedad.</li>
                                <li class="list-group-item">Mantenerlos fuera del alcance de niños y mascotas</li>
                                <li class="list-group-item">Cada 3 días sacudir el polvo gentilmente y con el equipo apropiado.</li>
                                <li class="list-group-item">Mantenerlo en un ambiente cerrado (no al aire libre)</li>
                            </ul>

                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <h1 className="selled__title-related mb-5">PAGO Y FACTURACIÓN</h1>

                <Accordion
                    style={{marginBottom: 5}}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                    <Typography style={{color:"#42bda5", fontSize: 30}}>¿Cuáles son los métodos de pago?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography
                            style={{color: '#868686'}}
                        >
                            <b>
                            Contamos con una variedad de métodos de pago:
                            </b>
                          
                           
                           <ul class="list-group">
                                <li class="list-group-item">Tarjetas de crédito o débito</li>
                                <li class="list-group-item">Pago en efectivo contra entrega si tu entrega es en el área de San Salvador.</li>
                            </ul>

                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion
                    style={{marginBottom: 5}}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                    <Typography style={{color:"#42bda5", fontSize: 30}}>¿Puedo solicitar factura con nombre o Crédito Fiscal?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography
                            style={{color: '#868686'}}
                        >
                            <b>
                            ¡Sin duda! Para solicitar tu factura envía un correo a atencionalcliente@canvasframeit.com con la razón social, NRC, correo electrónico y el número de pedido que quieras que se facture.
                            Solicitamos que los siguientes datos sean enviados a nuestro correo electrónico atencionalcliente@canvasframeit.com para generación de factura:

                            </b>
                           
                           
                           <ul class="list-group">
                                <li class="list-group-item">Número de Pedido:</li>
                                <li class="list-group-item">Monto total del pago:</li>
                                <li class="list-group-item">Razón Social:</li>
                                <li class="list-group-item">NRC:</li>
                                <li class="list-group-item">Método de pago: (si es tarjeta, especificar si de crédito o débito)</li>
                                <li class="list-group-item">Correo electrónico al que se enviará la factura</li>
                            </ul>

                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </div>
            <Footer />
        </div>
    )
}
