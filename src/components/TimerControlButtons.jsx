import { Container } from "react-bootstrap";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import PlayButton from "./buttons/PlayButton";
import RestartButton from "./buttons/RestartButton";
import StopButton from "./buttons/StopButton";
import SkipButton from "./buttons/SkipButton";
import PauseButton from "./buttons/PauseButton";

function TimerControlButtons({
  isTimerRunning,
  onRestartBtn,
  onPauseBtn,
  onStartBtn,
  onSkipBtn,
  onStopBtn,
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
        <StopButton className="mx-3" onClick={onStopBtn} />
        {isTimerRunning ? (
          <>
            <PauseButton className="mx-3" onClick={onPauseBtn} />
            <SkipButton className="mx-3" onClick={onSkipBtn} />
          </>
        ) : (
          <>
            <PlayButton className="mx-3" onClick={onStartBtn} />
            <RestartButton className="mx-3 flip" onClick={onRestartBtn} />
          </>
        )}
      </ButtonGroup>
    </Container>
  );
}

export default TimerControlButtons;
