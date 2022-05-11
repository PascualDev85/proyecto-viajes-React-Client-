import React from "react";
import { Col, Container, Row } from "react-bootstrap";

import "./scss/home.scss";

export const About = () => {
  return (
    <>
      <Container fluid className="contHome">
        <Row>
          <Col>
            <div className="divHome">
              <h1>About</h1>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
