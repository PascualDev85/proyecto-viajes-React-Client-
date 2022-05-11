import React from "react";
import { Col, Container, Row } from "react-bootstrap";

import "./scss/home.scss";

export const Home = () => {
  return (
    <>
      <Container fluid className="contHome">
        <Row>
          <Col>
            <div className="divHome">
              <h1>Travelers</h1>
              <h2>Experiencias y viajes</h2>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
