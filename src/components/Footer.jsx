import React from "react";
import Container from "react-bootstrap/Container";
import RestartButton from "./controls/RestartButton";
function Footer() {
  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-start"
    >
      <RestartButton
        className="bg-primary border border-0 control-button-small"
        iconStyle="icon-small icon-black"
      />
      <p className="fs-4 mb-1 fw-semibold">Session 1/4</p>
    </Container>
  );
}

export default Footer;
