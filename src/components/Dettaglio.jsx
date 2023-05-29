import "../styles/dettaglio.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Container, Row, Col, Button, Badge, ListGroup } from "react-bootstrap";
import axios from "../api/axios";
import { useParams } from "react-router-dom";
import CustomNav from "./CustomNavbar";

const Dettaglio = ({ selectedVacanza, updateSelectedVacanza }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  console.log("PARAMS", id);

  //funzione per memrizzare i dati della vacanza selezionata e reindirizzamento al from di registrazione
  const handlePrenotaClick = () => {
    updateSelectedVacanza(data);
    navigate("/prenotazione");
  };

  const [data, setData] = useState({});
  const [attivita, setAttivita] = useState([]);
  const [testimonianze, setTestimonianze] = useState([]);
  const urlVacanza = `vacanze/id/${id}`;

  useEffect(() => {
    getData();
    console.log(attivita);
    console.log(testimonianze);
  }, [id]);

  const getData = async function () {
    try {
      const response = await axios.get(urlVacanza);
      setData(response.data);
      console.log(response.data);
      setAttivita(response.data.attivita);
      console.log(response.data.attivita);
      setTestimonianze(response.data?.attivita[0]?.testimonianze);
      console.log(response.data?.attivita[0]?.testimonianze);
    } catch (error) {
      console.log("C'è stato un errore nel contattare il server", error);
    }
  };

  return (
    <>
      <CustomNav className="mynavbar" claim="Scopri di più" />
      <Container>
        <Row className=" cardVacanza flex-row">
          <Col className="h-25">
            <img
              className="coverpic w-100"
              src={data?.immagineurl}
              alt="vacanza"
            />
          </Col>

          <Col>
            <h1>
              Visita <strong>{data?.citta}</strong>
            </h1>
            <h3>{data?.descrizione}</h3>
            <p>
              {" "}
              Dal {data?.datainizio} al {data?.datafine} presso{" "}
              {data?.indirizzo}. <br />
              Alloggerai presso un{" "}
              <span className="minuscolo"> {data?.alloggio} </span>. <br />
              Riesci già a sentire il profumo della {data?.tipoluogo}? Prenota
              subito!
            </p>
            <Button className="bottone" onClick={handlePrenotaClick}>
              PRENOTA
            </Button>
          </Col>
          <Row className="flex-column">
            <Col>
              <h2>
                Attività proposta:{" "}
                {/* <strong> {data?.attivita[0].attivita}</strong> */}
                <strong> {attivita[0]?.attivita}</strong>
              </h2>
              <p>{attivita[0]?.descrizione}.</p>
            </Col>
            <Col>
              <h3> Cosa dicono i nostri clienti?</h3>
              <ListGroup>
                {testimonianze.length > 0 ? (
                  testimonianze.map((test) => (
                    <ListGroup.Item key={`feedback-${test.id}`}>
                      <Row>
                        <Col>
                          <Badge bg="dark" className="me-2">
                            {test.nome} {test.cognome}
                          </Badge>
                        </Col>
                        <Row className="flex-column">
                          <Col>{test.feedback}</Col>
                          <Col>Rating: {test.rating}/5</Col>
                        </Row>
                      </Row>
                    </ListGroup.Item>
                  ))
                ) : (
                  <ListGroup.Item>
                    Nessun elemento da visualizzare
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Col>
          </Row>
        </Row>
      </Container>
    </>
  );
};

export default Dettaglio;
