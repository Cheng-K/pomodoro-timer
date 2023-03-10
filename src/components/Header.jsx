import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TaskButton from "./buttons/TaskButton";
import SettingsButton from "./buttons/SettingsButton";

function Header({
  isWorkingSession,
  taskButtonOnClick,
  settingsButtonOnClick,
  isTimerRunning,
}) {
  return (
    <Container fluid>
      <Row className="p-3">
        <Col className="d-flex justify-content-start align-items-center" xs={2}>
          <TaskButton
            data-cy="task-btn"
            className="control-button-small show-text"
            iconStyle="icon-small icon-black"
            onClick={taskButtonOnClick}
            disabled={isTimerRunning}
          />
          <span data-cy="task-btn-tooltip">Show Tasks</span>
        </Col>
        <Col className="col">
          <h1 className="text-center fs-2 fw-bold" data-cy="header-title">
            {isWorkingSession ? "Stay focused" : "Take a break"}
          </h1>
        </Col>
        <Col
          className="d-flex justify-content-start align-items-center flex-row-reverse"
          xs={2}
        >
          <SettingsButton
            data-cy="settings-btn"
            className="control-button-small show-text"
            iconStyle="icon-small icon-black"
            onClick={settingsButtonOnClick}
            disabled={isTimerRunning}
          />
          <span className="text-end" data-cy="settings-btn-tooltip">
            Settings
          </span>
        </Col>
      </Row>
    </Container>
  );
}

export default Header;
