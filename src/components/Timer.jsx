import React, { useCallback, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
function Timer({ isWorkingSession, currentSeconds }) {
  return (
    <Container fluid className="timer-container">
      <svg viewBox="0 0 10 10" x="200" width="100%" height="90%">
        <g>
          <circle
            cx="5"
            cy="5"
            r="4"
            className="timer-progress timer-progress-bg"
          />
          {isWorkingSession ? (
            <circle cx="5" cy="5" r="4" className="timer-progress" />
          ) : (
            <circle
              cx="5"
              cy="5"
              r="4"
              className="timer-progress timer-progress-rest"
            />
          )}
          <text x="33%" y="55%" font-size="1.2px" font-weight="bolder">
            {`${Math.floor(currentSeconds / 60).toLocaleString("en-US", {
              minimumIntegerDigits: 2,
              useGrouping: false,
            })}:${(currentSeconds % 60).toLocaleString("en-US", {
              minimumIntegerDigits: 2,
              useGrouping: false,
            })}`}
          </text>
        </g>
      </svg>
      <p className="text-center fw-bold text-light-black fs-2">Programming</p>
    </Container>
  );
}

export default Timer;
