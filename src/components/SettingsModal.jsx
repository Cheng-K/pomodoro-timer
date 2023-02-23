import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import SettingInput from "./SettingInput";
function SettingsModal({ show, handleClose, ...props }) {
  const [inputWorkMins, setInputWorkMins] = useState(25);
  const [inputShortRestMins, setInputShortRestMins] = useState(5);
  const [inputLongRestMins, setInputLongRestMins] = useState(15);
  const [inputSessionNumber, setSessionNumber] = useState(4);
  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      centered
      contentClassName="modal-bg"
    >
      <Modal.Header closeButton>
        <Modal.Title>Settings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <SettingInput
            value={inputWorkMins}
            onValueChange={(event) => setInputWorkMins(event.target.value)}
            text="Duration of each work session (mins)"
            controlId="formGroupWorkDuration"
            minValue={25}
            maxValue={60}
            className="mb-3"
          />
          <SettingInput
            value={inputShortRestMins}
            onValueChange={(event) => setInputShortRestMins(event.target.value)}
            text="Duration of each short break (mins)"
            controlId="formGroupShortBreak"
            minValue={3}
            maxValue={5}
            className="mb-3"
          />
          <SettingInput
            value={inputLongRestMins}
            onValueChange={(event) => setInputLongRestMins(event.target.value)}
            text="Duration of each long break (mins)"
            controlId="formGroupLongBreak"
            minValue={10}
            maxValue={30}
            className="mb-3"
          />
          <SettingInput
            value={inputSessionNumber}
            onValueChange={(event) => setSessionNumber(event.target.value)}
            text="Number of sessions to long break (mins)"
            controlId="formGroupSessionsNumber"
            minValue={4}
            maxValue={8}
            className="mb-5"
          />
          <Button variant="danger" type="submit" className="d-block ms-auto">
            <span className="white-text fw-semibold">Save Changes</span>
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default SettingsModal;
