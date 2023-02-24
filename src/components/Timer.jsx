import React from "react";
import Container from "react-bootstrap/Container";
function Timer({ isWorkingSession, currentSeconds, totalSeconds }) {
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
          <circle
            cx="5"
            cy="5"
            r="4"
            className={`timer-progress ${
              isWorkingSession ? "" : "timer-progress-rest"
            }`}
            strokeDasharray={`${(currentSeconds / totalSeconds) * 25.2} 26`}
          />
          <text x="33%" y="55%" fontSize="1.2px" fontWeight="bolder">
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
    </Container>
  );
}

export default Timer;
