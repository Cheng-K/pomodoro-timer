import { Container } from "react-bootstrap";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import PlayButton from "./PlayButton";
import RestartButton from "./RestartButton";
import StopButton from "./StopButton";
import SkipButton from "./SkipButton";
import PauseButton from "./PauseButton";

function ControlButton() {
  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center h-25"
    >
      <ButtonGroup
        size="lg"
        className="d-flex justify-content-around align-items-end flex-grow-0"
      >
        <StopButton className="mx-3" />
        <PauseButton className="mx-3" />
        <SkipButton className="mx-3" />
      </ButtonGroup>
    </Container>
  );
}

export default ControlButton;
