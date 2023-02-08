import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { MdSettings, MdMenu } from "react-icons/md";

function Header() {
  return (
    <Container fluid>
      <Row className="p-3">
        <Col className="d-flex justify-content-start align-items-center" xs={2}>
          <MdMenu size="2rem" />
        </Col>
        <Col className="col">
          <h1 className="text-center fs-2 fw-bold">Stay focused</h1>
        </Col>
        <Col className="d-flex justify-content-end align-items-center" xs={2}>
          <MdSettings size="2rem" />
        </Col>
      </Row>
    </Container>
  );
}

export default Header;
