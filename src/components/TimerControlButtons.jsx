import { Container } from "react-bootstrap";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import PlayButton from "./buttons/PlayButton";
import RestartButton from "./buttons/RestartButton";
import StopButton from "./buttons/StopButton";
import SkipButton from "./buttons/SkipButton";
import PauseButton from "./buttons/PauseButton";

function TimerControlButtons() {
  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center control-button-container"
    >
      <ButtonGroup
        size="lg"
        className="d-flex justify-content-around align-items-end flex-grow-0"
      >
        <StopButton className="mx-3" />
        <PlayButton className="mx-3" />
        <RestartButton className="mx-3 flip" />
      </ButtonGroup>
    </Container>
  );
}

export default TimerControlButtons;
