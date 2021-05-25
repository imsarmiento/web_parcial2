import React, { useState } from "react";
import SeriesDetail from "./SeriesDetail";
import { Container, Table, Row, Col } from "react-bootstrap";
import { FormattedMessage, FormattedDate } from "react-intl";
import Graph from "./Graph";

function SeriesList({ data, ...rest }) {
  const [selectedSeries, setSelectedSeries] = useState(null);

  const handleClick = (serie) => {
    setSelectedSeries(serie);
  };

  const parseDate = (date) => {
    var parts = date.split("/");
    var dt = new Date(
      parseInt(parts[2], 10),
      parseInt(parts[1], 10) - 1,
      parseInt(parts[0], 10)
    );
    return dt;
  };

  //

  return (
    <Container fluid>
      <Row>
        <Col md="auto">
          <Table striped hover style={{ width: "40rem" }}>
            <thead>
              <tr>
                <th>
                  <FormattedMessage id="id" defaultMessage="#" />
                </th>
                <th>
                  <FormattedMessage id="name" defaultMessage="Name" />
                </th>
                <th>
                  <FormattedMessage id="channel" defaultMessage="Channel" />
                </th>
                <th>
                  <FormattedMessage id="seasons" defaultMessage="Seasons" />
                </th>
                <th>
                  <FormattedMessage id="episodes" defaultMessage="Episodes" />
                </th>
                <th>
                  <FormattedMessage
                    id="releaseDate"
                    defaultMessage="Release Date"
                  />
                </th>
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
                    <td>
                      <FormattedDate
                        value={parseDate(serie.release)}
                        year="numeric"
                        day="numeric"
                        month="long"
                        weekday="long"
                      />
                    </td>
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
      <Row>
        <Graph datos={data}></Graph>
      </Row>
    </Container>
  );
}

export default SeriesList;
