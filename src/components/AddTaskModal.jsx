import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import dayjs from "dayjs";

function AddTaskModal({ show, handleClose, onAdd }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);
    if (form.checkValidity() !== false) {
      console.log(title);
      console.log(date);
      console.log(time);
      handleClose();
      onAdd({ title, dueDateTime: dayjs(`${date} ${time}`) });
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
      contentClassName="add-task-modal"
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
            />
            <Form.Control.Feedback type="invalid">
              Please enter a name for the task.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formDueDate" className="mb-3">
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid due date for the task.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group
            controlId="formDueTime"
            className="mb-3"
            value={time}
            onChange={(event) => setTime(event.target.value)}
          >
            <Form.Label>Due Time</Form.Label>
            <Form.Control
              type="time"
              value={time}
              onChange={(event) => setTime(event.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid due time for the task.
            </Form.Control.Feedback>
          </Form.Group>
          <Button
            variant="danger"
            type="submit"
            className="d-block ms-auto mt-4"
          >
            <span className="white-text fw-semibold">Submit</span>
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddTaskModal;