import dayjs from "dayjs";
import React, { useReducer, useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { MdAlarm, MdCalendarToday } from "react-icons/md";
import { createTaskForUpdate } from "../../utilities/database";
import DeleteButton from "./DeleteButton";
import DoneButton from "./DoneButton";
import EditButton from "./EditButton";

function Task({ editMode, onUpdate, onDelete, ...props }) {
  const [title, setTitle] = useState(props.defaultTitle);
  const [date, setDate] = useState(props.dueDate);
  const [time, setTime] = useState(props.dueTime);
  const [editValidated, setEditValidated] = useState(false);
  const [isDone, toggleIsDone] = useReducer((currentState) => {
    setTimeout(
      () =>
        onUpdate(
          createTaskForUpdate(
            props.id,
            title,
            dayjs(`${date} ${time}`).toDate(),
            !currentState,
            time !== ""
          )
        ),
      500
    );
    return !currentState;
  }, false);
  const [isEditing, toggleEditing] = useReducer(
    (currentState) => !currentState,
    false
  );
  const onEditFinish = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    setEditValidated(true);
    if (form.checkValidity() !== false) {
      setEditValidated(false);
      onUpdate(
        createTaskForUpdate(
          props.id,
          title,
          dayjs(`${date} ${time}`).toDate(),
          isDone,
          time !== ""
        )
      );
      toggleEditing();
    }
  };

  if (!editMode) {
    if (editValidated) setEditValidated(false);
    if (title !== props.defaultTitle) setTitle(props.defaultTitle);
    if (date !== props.dueDate) setDate(props.dueDate);
    if (time !== props.dueTime) setTime(props.dueTime);
    if (isEditing) toggleEditing();
  }
  return (
    <Container
      fluid
      className={`d-flex justify-content-between align-items-center ${props.className}`}
    >
      {editMode ? (
        <Form
          className="px-2"
          noValidate
          validated={editValidated}
          onSubmit={onEditFinish}
        >
          <Row>
            <Form.Group controlId="formTitle" as={Col}>
              <Form.Control
                type="text"
                value={title}
                required
                onChange={(newValue) => setTitle(newValue.target.value)}
                placeholder="Enter task name"
                disabled={!isEditing}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a name for the task.
              </Form.Control.Feedback>
            </Form.Group>
            <Col xs={2}>
              {isEditing ? (
                <DoneButton type="submit" />
              ) : (
                <EditButton onClick={toggleEditing} />
              )}
            </Col>
          </Row>

          <Row className="mt-2">
            <Form.Group controlId="formDueDate" as={Col}>
              <Form.Control
                type="date"
                value={date}
                onChange={(newValue) => {
                  if (newValue.target.value === "") setTime("");
                  setDate(newValue.target.value);
                }}
                disabled={!isEditing}
                max="9999-12-31"
                min="2023-01-01"
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid due date for the task.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formDueTime" as={Col}>
              <Form.Control
                type="time"
                value={time}
                onChange={(newValue) => {
                  setTime(newValue.target.value);
                }}
                disabled={!isEditing || date === ""}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid due time for the task.
              </Form.Control.Feedback>
            </Form.Group>
            <Col xs={2}>
              <DeleteButton onClick={() => onDelete(props.id)} />
            </Col>
          </Row>
        </Form>
      ) : (
        <>
          <div>
            <h5
              className={
                isDone ? `text-muted text-decoration-line-through` : ``
              }
            >
              {title}
            </h5>
            <div className="d-flex align-items-center">
              <MdCalendarToday
                className="me-1"
                color={isDone ? "#6c757d" : ""}
              />
              <span
                className={
                  isDone
                    ? `text-muted text-decoration-line-through me-3`
                    : `me-3`
                }
              >
                {date ? date : "No date"}
              </span>
              <MdAlarm className="me-1" color={isDone ? "#6c757d" : ""} />
              <span
                className={
                  isDone ? `text-muted text-decoration-line-through` : ``
                }
              >
                {time ? time : "No time"}
              </span>
            </div>
          </div>
          <input
            className="form-check-input task-checkbox"
            type="checkbox"
            checked={isDone}
            onChange={toggleIsDone}
          />
        </>
      )}
    </Container>
  );
}

export default Task;
