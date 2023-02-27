import React from "react";
import Container from "react-bootstrap/Container";
import RestartButton from "./buttons/RestartButton";
function Footer({
  currentSession,
  maxSession,
  onRestartSession,
  isTimerRunning,
}) {
  return (
    <Container fluid className="d-flex flex-grow-1 align-items-end">
      <Container
        className="d-flex align-items-center justify-content-start"
        fluid
      >
        <RestartButton
          className="bg-primary border border-0 control-button-small"
          iconStyle="icon-small icon-black"
          onClick={onRestartSession}
          disabled={isTimerRunning}
          data-cy="session-restart-btn"
        />
        <p
          className="fs-4 mb-0 ps-1 fw-semibold"
          data-cy="session-label"
        >{`Session ${currentSession}/${maxSession}`}</p>
      </Container>
    </Container>
  );
}

export default Footer;
