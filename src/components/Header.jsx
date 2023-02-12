import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TaskButton from "./buttons/TaskButton";
import SettingsButton from "./buttons/SettingsButton";

function Header({ isWorkingSession }) {
  return (
    <Container fluid>
      <Row className="p-3">
        <Col className="d-flex justify-content-start align-items-center" xs={2}>
          <TaskButton
            className="control-button-small"
            iconStyle="icon-small icon-black"
          />
        </Col>
        <Col className="col">
          <h1 className="text-center fs-2 fw-bold">
            {isWorkingSession ? "Stay focused" : "Take a break"}
          </h1>
        </Col>
        <Col className="d-flex justify-content-end align-items-center" xs={2}>
          <SettingsButton
            className="control-button-small"
            iconStyle="icon-small icon-black"
          />
        </Col>
      </Row>
    </Container>
  );
}

export default Header;
