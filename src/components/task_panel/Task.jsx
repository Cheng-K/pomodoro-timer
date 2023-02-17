import React, { useState, useEffect, useReducer } from "react";
import Container from "react-bootstrap/Container";
import dayjs from "dayjs";
import { MdCalendarToday, MdAlarm } from "react-icons/md";

function Task({ editMode }) {
  const [title, setTitle] = useState("Programming");
  const [isDone, toggleIsDone] = useReducer(
    (currentState) => !currentState,
    false
  );
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [time, setTime] = useState(dayjs().format("HH:mm"));
  useEffect(() => {
    setTitle("Programming");
    setDate(dayjs().format("YYYY-MM-DD"));
    setTime(dayjs().format("HH:mm"));
  }, []);
  return (
    <Container
      fluid
      className="d-flex justify-content-between align-items-center"
    >
      <div>
        {editMode ? (
          <>
            <input
              type="text"
              value={title}
              onChange={(newValue) => setTitle(newValue.target.value)}
            />
            <input
              type="date"
              value={date}
              onChange={(newValue) => {
                setDate(newValue.target.value);
              }}
            />
            <input
              type="time"
              value={time}
              className="ms-2"
              onChange={(newValue) => {
                setTime(newValue.target.value);
              }}
            />
          </>
        ) : (
          <>
            <h5>{title}</h5>
            <div className="d-flex align-items-center">
              <MdCalendarToday className="me-1" />
              <span className="me-3">{date}</span>
              <MdAlarm className="me-1" />
              <span>{time}</span>
            </div>
          </>
        )}
      </div>
      <input
        className="form-check-input task-checkbox"
        type="checkbox"
        checked={isDone}
        onChange={toggleIsDone}
      />
    </Container>
  );
}

export default Task;
