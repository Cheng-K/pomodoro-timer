import React from "react";
import Container from "react-bootstrap/Container";
import RestartButton from "./buttons/RestartButton";
function Footer() {
  return (
    <Container fluid className="d-flex flex-grow-1 align-items-end">
      <Container
        className="d-flex align-items-center justify-content-start"
        fluid
      >
        <RestartButton
          className="bg-primary border border-0 control-button-small"
          iconStyle="icon-small icon-black"
        />
        <p className="fs-4 mb-0 ps-1 fw-semibold">Session 1/4</p>
      </Container>
    </Container>
  );
}

export default Footer;
