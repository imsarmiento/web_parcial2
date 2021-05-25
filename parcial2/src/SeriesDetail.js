import React from "react";
import { Card } from "react-bootstrap";

function SeriesDetail({ serie }) {
  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={serie.poster} />
        <Card.Body>
          <Card.Title>{serie.name}</Card.Title>
          <Card.Text>
            {serie.description}
            <br></br>
            <a href={serie.webpage}>{serie.webpage}</a>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default SeriesDetail;
