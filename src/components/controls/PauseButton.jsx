import { Button } from "react-bootstrap";
import { MdPause } from "react-icons/md";
function PauseButton({ className = "" }) {
  return (
    <Button
      variant="secondary"
      className={`rounded-circle control-button-large  d-flex justify-content-center align-items-center ${className}`}
    >
      <MdPause className="icon-large" />
    </Button>
  );
}

export default PauseButton;
