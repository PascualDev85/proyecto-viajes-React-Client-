import React from "react";
import { Col, Container, Row } from "react-bootstrap";

import "./scss/home.scss";

export const Service = () => {
  return (
    <>
      <Container fluid className="contHome">
        <Row>
          <Col>
            <div className="divHome">
              <h1>Services</h1>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
