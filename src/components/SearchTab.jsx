import { Container, Row, Col, Form } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import "../styles/home.css";
import "../assets/img/spiaggia.jpg";

const SearchTab = () => {
  const [data, setData] = useState([]);
  const [citta, setCitta] = useState("");
  const [datainizio, setDatainizio] = useState("");

  const urlCitta = `/vacanze/citta/`;

  const handleCitySearch = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      try {
        const response = await axios.get(urlCitta + citta);
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("Ops, non è stato possibile contattare il server!");
      }
      setCitta("");
    }
  };

  const SearchDate = async (event) => {
    if (event.key === "Enter") {
      try {
        const response = await axios.get(urlCitta + datainizio);
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
      setDatainizio("");
    }
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <section id="cover">
      <div className="overlay"></div>

      <Container className="searchContent">
        <div>
          <h1> Cerca la tua vacanza </h1>
          <Form className="formContainer">
            <Form.Label className="fs-2 w-max ">
              La tua destinazione:
            </Form.Label>
            <Form.Control
              className="searchCity d-flex mt-1 mb-3"
              id="searchTab"
              value={citta}
              onChange={(event) => setCitta(event.target.value)}
              placeholder="City"
              autoComplete="off"
              onKeyPress={(event) => handleCitySearch(event)}
              type="text"
            />

            <Form.Label className="fs-2 w-max ">
              La tua data di arrivo:
            </Form.Label>
            <Form.Control
              className="searchCity d-flex mt-1 mb-3"
              id="searchTab"
              value={datainizio}
              onChange={(event) => setDatainizio(event.target.value)}
              placeholder="data di arrivo"
              autoComplete="off"
              onKeyPress={(event) => SearchDate(event)}
              type="date"
            />
          </Form>
        </div>
      </Container>
    </section>
  );
};

export default SearchTab;
