import { Row, Col, Accordion } from "react-bootstrap";
import { faFaceSmileWink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import { useState, useEffect } from "react";
const AccordionPrenotazione = ({
  nome,
  cognome,
  prenotazioni,
  email,
  token,
}) => {
  const urlPrenotazione = `/prenotazioni/numero_prenotazione/`;
  const [data, setData] = useState();

  const getPrenotazione = async function () {
    console.log(urlPrenotazione);
    console.log(prenotazioni[0]?.numeroprenotazione);
    console.log(token);
    try {
      const response = await axios.get(
        urlPrenotazione + prenotazioni[0].numeroprenotazione,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      console.log("risposta ok");
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      if (!error?.response) {
        console.log("C'è stato un errore nel contattare il server", error);
      }
    }
  };

  useEffect(() => {
    getPrenotazione();
  }, []);

  return (
    <Row>
      <h2> Prenotazione avvenuta con successo!</h2>
      <Col>
        <Accordion defaultActiveKey="0" flush>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Dati della tua prenotazione</Accordion.Header>
            <Accordion.Body>
              <p>
                Gentile
                <strong>
                  {" "}
                  {nome} {cognome}
                </strong>
                , grazie per aver scelto Easy Vacanza! Ecco i dettagli della tua
                prenotazione.
                <br />
                Il tuo codice di prenotazione è:
                <strong> {prenotazioni?.numeroprenotazione}</strong>
                <br />A breve riceverai una email all'indirizzo
                <strong> {email}</strong> . Ricordati di controllare nella
                cartella dello spam!
                <span className="ps-2">
                  <FontAwesomeIcon icon={faFaceSmileWink} />
                </span>
              </p>
              <p>
                Hai esigenze particolari?
                <Link to="/contatti"> Scrivici qui </Link>
              </p>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>
              Informazioni sul vostro pacchetto vacanza
            </Accordion.Header>
            <Accordion.Body></Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Col>
    </Row>
  );
};

export default AccordionPrenotazione;
