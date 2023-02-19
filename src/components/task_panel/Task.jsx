import React, { useState, useEffect, useReducer } from "react";
import Container from "react-bootstrap/Container";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import { MdCalendarToday, MdAlarm } from "react-icons/md";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import dayjs from "dayjs";

function Task({ editMode, ...props }) {
  const [title, setTitle] = useState(props.defaultTitle);
  const [isDone, toggleIsDone] = useReducer(
    (currentState) => !currentState,
    false
  );
  const [date, setDate] = useState(props.due.format("YYYY-MM-DD"));
  const [time, setTime] = useState(props.due.format("HH:mm"));

  useEffect(() => {
    if (!editMode) {
      props.onUpdate({ title, dueDateTime: dayjs(`${date} ${time}`) });
    }
  }, [editMode]);

  return (
    <Container
      fluid
      className={`d-flex justify-content-between align-items-center ${props.className}`}
    >
      {editMode ? (
        <>
          <div>
            <Form.Group controlId="formTitle">
              <Form.Control
                type="text"
                value={title}
                required
                onChange={(newValue) => setTitle(newValue.target.value)}
                placeholder="Enter task name"
              />
              <Form.Control.Feedback type="invalid">
                Please enter a name for the task.
              </Form.Control.Feedback>
            </Form.Group>

            <Row className="mt-2">
              <Form.Group controlId="formDueDate" as={Col}>
                <Form.Control
                  type="date"
                  value={date}
                  onChange={(newValue) => {
                    setDate(newValue.target.value);
                  }}
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
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid due time for the task.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
          </div>
          <DeleteButton />
        </>
      ) : (
        <>
          <div>
            <h5>{title}</h5>
            <div className="d-flex align-items-center">
              <MdCalendarToday className="me-1" />
              <span className="me-3">{date}</span>
              <MdAlarm className="me-1" />
              <span>{time}</span>
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
