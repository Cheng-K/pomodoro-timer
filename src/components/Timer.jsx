import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProgressBar from "react-bootstrap/ProgressBar";
function Timer() {
  return (
    <Container fluid className="timer-container bg-primary">
      <svg viewBox="0 0 10 10" x="200" width="100%" height="90%">
        <g>
          <circle cx="5" cy="5" r="4" className="timer-progress" />
          <text x="33%" y="55%" font-size="1.2px" font-weight="bolder">
            30:00
          </text>
        </g>
      </svg>
      <p className="text-center fw-bold text-light-black fs-2">Programming</p>
    </Container>
  );
}

export default Timer;
