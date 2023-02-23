import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function SettingInput({
  controlId,
  text,
  value,
  onValueChange,
  minValue,
  maxValue,
  ...props
}) {
  return (
    <Form.Group controlId={controlId} as={Row} className={props.className}>
      <Form.Label column md={9} xs={12}>
        {text}
      </Form.Label>
      <Col md={3} xs="auto">
        <Form.Control
          type="number"
          min={minValue}
          max={maxValue}
          value={value}
          onChange={onValueChange}
        />
      </Col>
    </Form.Group>
  );
}

export default SettingInput;
