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



export const QuestionScreen = () => {
    return (
        <div className="home__main-container">
            <Navbar />
            <SearchBar/>
            <div className="questions__first-part">
                <img className="question__image" alt="imagen" src={question} />
                <div>
                    <h1 className="questions__title">¿Tienes dudas?</h1>
                    <p className="questions__paragraph">Ingresa una palabra, frase o pregunta para localizar la <br />
                        raíz de tus problemas, estaremos atentos de <br />
                        responder si dicha pregunta aún no tiene respuesta. <br />
                    </p>
                    <div className="questions__search-part">
                        <input className="questions__search-input" type="text" />
                        <button className="questions__search-button"><i className="fas fa-search"></i></button>
                    </div>
                </div>
            </div>
            <h1 className="selled__title-related mb-5">Preguntas frecuentes!</h1>

            <div className="questions__accordion-div">
                <Accordion
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                    <Typography align="center">¿Que materiales ocupan?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                            sit amet blandit leo lobortis eget.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography>Aqui iria otra pregunta frecuente XD</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                            sit amet blandit leo lobortis eget.
                        </Typography>
                    </AccordionDetails>
                </Accordion>

            </div>
            <Footer />
        </div>
    )
}
