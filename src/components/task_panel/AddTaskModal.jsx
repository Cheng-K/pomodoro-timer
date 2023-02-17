import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function AddTaskModal({ show, handleClose, onAdd }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  return (
    <Modal
      size="lg"
      centered
      show={show}
      onHide={handleClose}
      contentClassName="add-task-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>Add Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <></>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onAdd} variant="danger">
          <span className="white-text fw-semibold">Submit</span>
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddTaskModal;
