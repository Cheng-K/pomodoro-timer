import { Container } from "react-bootstrap";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import PlayButton from "./buttons/PlayButton";
import RestartButton from "./buttons/RestartButton";
import SkipButton from "./buttons/SkipButton";
import PauseButton from "./buttons/PauseButton";

function TimerControlButtons({
  isTimerRunning,
  onRestartBtn,
  onPauseBtn,
  onStartBtn,
  onSkipBtn,
}) {
  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center control-button-container"
    >
      <ButtonGroup
        size="lg"
        className="d-flex justify-content-around align-items-end flex-grow-0"
      >
        <RestartButton
          className="mx-3 flip"
          onClick={onRestartBtn}
          disabled={!isTimerRunning}
        />
        {isTimerRunning ? (
          <PauseButton className="mx-3" onClick={onPauseBtn} />
        ) : (
          <PlayButton className="mx-3" onClick={onStartBtn} />
        )}
        <SkipButton className="mx-3" onClick={onSkipBtn} />
      </ButtonGroup>
    </Container>
  );
}

export default TimerControlButtons;