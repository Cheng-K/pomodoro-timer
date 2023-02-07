import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { MdSettings, MdMenu } from "react-icons/md";

function Header() {
  return (
    <Container fluid>
      <Row>
        <Col
          className="d-flex justify-content-start align-items-center p-2"
          xs={2}
        >
          <MdMenu size="2rem" />
        </Col>
        <Col className="col p-2">
          <h2 className="text-center">Stay focused</h2>
        </Col>
        <Col
          className="d-flex justify-content-end align-items-center p-2"
          xs={2}
        >
          <MdSettings size="2rem" />
        </Col>
      </Row>
    </Container>
  );
}

export default Header;
