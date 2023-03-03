import dayjs from "dayjs";
import React, { useReducer, useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { MdAlarm, MdCalendarToday } from "react-icons/md";
import { createTaskForUpdate } from "../../utilities/database";
import DeleteButton from "./DeleteButton";
import DoneButton from "./DoneButton";
import EditButton from "./EditButton";
import DeleteTaskModal from "../DeleteTaskModal";

function Task({ editMode, onUpdate, onDelete, ...props }) {
  const [title, setTitle] = useState(props.defaultTitle);
  const [date, setDate] = useState(props.dueDate);
  const [time, setTime] = useState(props.dueTime);
  const [editValidated, setEditValidated] = useState(false);
  const [deleteModalShowing, setDeleteModalShowing] = useState(false);
  const [isDone, toggleIsDone] = useReducer((currentState) => {
    setTimeout(() => {
      onUpdate(
        createTaskForUpdate(
          props.id,
          title,
          dayjs(`${date} ${time}`).toDate(),
          !currentState,
          time !== "",
          props.active
        )
      );
      if (props.active) props.onDeactivate();
    }, 500);
    return !currentState;
  }, props.done);
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
          time !== "",
          props.active
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
    <>
      <Container
        fluid
        className={`d-flex justify-content-between align-items-center ${props.className}`}
        data-cy="task-container"
      >
        {editMode ? (
          <Form
            className="px-2"
            noValidate
            validated={editValidated}
            onSubmit={onEditFinish}
          >
            <Row>
              <Form.Group controlId="editFormTitle" as={Col}>
                <Form.Control
                  type="text"
                  value={title}
                  required
                  onChange={(newValue) => setTitle(newValue.target.value)}
                  placeholder="Enter task name"
                  disabled={!isEditing}
                  maxLength={40}
                  data-cy="edit-task-title-input"
                />
                <Form.Control.Feedback
                  type="invalid"
                  data-cy="edit-task-title-invalid-feedback"
                >
                  Please provide a valid name for the task. Max: 40 characters.
                </Form.Control.Feedback>
              </Form.Group>
              <Col xs={2}>
                {isEditing ? (
                  <DoneButton type="submit" data-cy="edit-task-submit-btn" />
                ) : (
                  <EditButton
                    onClick={toggleEditing}
                    data-cy="edit-task-edit-btn"
                  />
                )}
              </Col>
            </Row>

            <Row className="mt-2">
              <Col xs={10}>
                <Row>
                  <Form.Group controlId="editFormDueDate" as={Col}>
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
                      data-cy="edit-task-calendar-input"
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      data-cy="edit-task-calendar-invalid-feedback"
                    >
                      Please enter a valid due date for the task.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="editFormDueTime" as={Col}>
                    <Form.Control
                      type="time"
                      value={time}
                      onChange={(newValue) => {
                        setTime(newValue.target.value);
                      }}
                      disabled={!isEditing || date === ""}
                      data-cy="edit-task-time-input"
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      data-cy="edit-task-time-invalid-feedback"
                    >
                      Please enter a valid due time for the task.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
              </Col>
              <Col xs={2}>
                <DeleteButton
                  onClick={() => setDeleteModalShowing(true)}
                  data-cy="edit-task-delete-btn"
                />
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
                data-cy="task-title-label"
              >
                {title}
              </h5>
              <div className="d-flex align-items-center mb-1">
                {date && (
                  <>
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
                      data-cy="task-calendar-label"
                    >
                      {date}
                    </span>
                  </>
                )}
                {time && (
                  <>
                    <MdAlarm className="me-1" color={isDone ? "#6c757d" : ""} />
                    <span
                      className={
                        isDone ? `text-muted text-decoration-line-through` : ``
                      }
                      data-cy="task-time-label"
                    >
                      {time}
                    </span>
                  </>
                )}
              </div>
              {!isDone && (
                <Button
                  variant={`${
                    props.active ? "outline-success" : "outline-light-black"
                  }`}
                  size="sm"
                  className={`mt-1 ${
                    props.active ? "active-button" : "inactive-button"
                  }`}
                  onClick={
                    props.active
                      ? () => props.onDeactivate()
                      : () => props.onActivate(props.id)
                  }
                  data-cy="working-pending-badge"
                ></Button>
              )}
            </div>
            <input
              className={`form-check-input task-checkbox ${
                props.expired ? "task-checkbox-overdue" : ""
              }`}
              type="checkbox"
              checked={isDone}
              onChange={toggleIsDone}
              data-cy="task-checkbox"
            />
          </>
        )}
      </Container>
      <DeleteTaskModal
        show={deleteModalShowing}
        handleClose={() => setDeleteModalShowing(false)}
        deleteTarget={props.defaultTitle}
        onDelete={() => onDelete(props.id)}
        data-cy="delete-task-modal"
      />
    </>
  );
}

export default Task;
