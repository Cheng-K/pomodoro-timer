import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import SettingInput from "./SettingInput";
import { settingsKey } from "../utilities/database";
function SettingsModal({ show, handleClose, onUpdate, ...props }) {
  const [inputWorkMins, setInputWorkMins] = useState(25);
  const [inputShortRestMins, setInputShortRestMins] = useState(5);
  const [inputLongRestMins, setInputLongRestMins] = useState(15);
  const [inputSessionNumber, setInputSessionNumber] = useState(4);
  const [validated, setValidated] = useState(false);

  const onSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);
    if (form.checkValidity() !== false)
      onUpdate([
        { name: settingsKey.maxSession, value: inputSessionNumber },
        { name: settingsKey.workDuration, value: inputWorkMins * 60 },
        { name: settingsKey.shortRestDuration, value: inputShortRestMins * 60 },
        { name: settingsKey.longRestDuration, value: inputLongRestMins * 60 },
      ]);
  };
  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      centered
      contentClassName="modal-bg"
      onExited={() => setValidated(false)}
      onEnter={() => {
        setInputWorkMins(props.currentWorkSeconds / 60);
        setInputShortRestMins(props.currentShortRestSeconds / 60);
        setInputLongRestMins(props.currentLongRestSeconds / 60);
        setInputSessionNumber(Math.ceil(props.currentMaxSession / 2));
      }}
      data-cy="settings-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>Settings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit} noValidate validated={validated}>
          <SettingInput
            value={inputWorkMins}
            onValueChange={(event) => setInputWorkMins(event.target.value)}
            text="Duration of each work session (mins)"
            controlId="formGroupWorkDuration"
            minValue={25}
            maxValue={60}
            className="mb-3"
            invalidMsg="Please provide a valid numeric input. Value must be between 25 to 60 mins"
            required={true}
            data-cy="settings-work-mins"
          />
          <SettingInput
            value={inputShortRestMins}
            onValueChange={(event) => setInputShortRestMins(event.target.value)}
            text="Duration of each short break (mins)"
            controlId="formGroupShortBreak"
            minValue={5}
            maxValue={10}
            className="mb-3"
            invalidMsg="Please provide a valid numeric input. Value must be between 3 to 5 mins"
            required={true}
            data-cy="settings-shortbreak-mins"
          />
          <SettingInput
            value={inputLongRestMins}
            onValueChange={(event) => setInputLongRestMins(event.target.value)}
            text="Duration of each long break (mins)"
            controlId="formGroupLongBreak"
            minValue={15}
            maxValue={30}
            className="mb-3"
            invalidMsg="Please provide a valid numeric input. Value must be between 10 to 30 mins"
            required={true}
            data-cy="settings-longbreak-mins"
          />
          <SettingInput
            value={inputSessionNumber}
            onValueChange={(event) => setInputSessionNumber(event.target.value)}
            text="Number of sessions to long break (mins)"
            controlId="formGroupSessionsNumber"
            minValue={4}
            maxValue={8}
            className="mb-5"
            invalidMsg="Please provide a valid numeric input. Value must be between 4 to 8 sessions"
            required={true}
            data-cy="settings-session"
          />
          <Button
            variant="danger"
            type="submit"
            className="d-block ms-auto"
            data-cy="settings-submit-btn"
          >
            <span className="white-text fw-semibold">Save Changes</span>
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default SettingsModal;
