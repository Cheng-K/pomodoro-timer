import dayjs from "dayjs";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { createTaskForAdd } from "../utilities/database";

function AddTaskModal({ show, handleClose, onAdd }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [title, setTitle] = useState("");
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);
    if (form.checkValidity() !== false) {
      handleClose();
      onAdd(
        createTaskForAdd(title, dayjs(`${date} ${time}`).toDate(), time !== "")
      );
    }
  };

  const resetForm = () => {
    setValidated(false);
    setDate("");
    setTime("");
    setTitle("");
  };

  return (
    <Modal
      size="lg"
      centered
      show={show}
      onHide={handleClose}
      onExited={resetForm}
      contentClassName="modal-bg"
      data-cy="add-task-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>Add Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId="formTaskName" className="mb-3">
            <Form.Label>Task Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter task name"
              required
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              data-cy="add-task-title-input"
            />
            <Form.Control.Feedback
              type="invalid"
              data-cy="add-task-title-input-invalid-feedback"
            >
              Please enter a name for the task.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formDueDate" className="mb-3">
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              max="9999-12-31"
              min="2023-01-01"
              data-cy="add-task-calendar-input"
            />
            <Form.Control.Feedback
              type="invalid"
              data-cy="add-task-calendar-input-invalid-feedback"
            >
              Please enter a valid due date for the task. Min: 01/01/2023 | Max:
              31/12/9999
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formDueTime" className="mb-3">
            <Form.Label>Due Time</Form.Label>
            <Form.Control
              type="time"
              value={time}
              onChange={(event) => setTime(event.target.value)}
              disabled={date === ""}
              data-cy="add-task-time-input"
            />
            <Form.Control.Feedback
              type="invalid"
              data-cy="add-task-time-input-invalid-feedback"
            >
              Please enter a valid due time for the task.
            </Form.Control.Feedback>
          </Form.Group>
          <Button
            variant="danger"
            type="submit"
            className="d-block ms-auto mt-4"
            data-cy="add-task-submit-btn"
          >
            <span className="white-text fw-semibold">Submit</span>
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddTaskModal;
