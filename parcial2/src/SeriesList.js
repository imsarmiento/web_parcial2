import React, { useState } from "react";
import SeriesDetail from "./SeriesDetail";
import { Container, Table, Row, Col } from "react-bootstrap";

function SeriesList({ data }) {
  const [selectedSeries, setSelectedSeries] = useState(null);

  const handleClick = (serie) => {
    setSelectedSeries(serie);
  };

  //

  return (
    <Container fluid>
      <Row>
        <Col md="auto">
          <Table striped hover style={{ width: "40rem" }}>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Channel</th>
                <th>Username</th>
                <th>Username</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              {data.map((serie, index) => {
                return (
                  <tr key={index} onClick={() => handleClick(serie)}>
                    <td>{serie.id}</td>
                    <td>{serie.name}</td>
                    <td>{serie.channel}</td>
                    <td>{serie.seasons}</td>
                    <td>{serie.episodes}</td>
                    <td>{serie.release}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
        <Col md="auto">
          {selectedSeries !== null ? (
            <SeriesDetail serie={selectedSeries} />
          ) : null}
        </Col>
      </Row>
    </Container>
  );
}

export default SeriesList;
