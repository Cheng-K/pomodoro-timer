import { Button } from "react-bootstrap";
import { MdPause } from "react-icons/md";
function PauseButton({ onClick, className = "", ...props }) {
  return (
    <Button
      variant="secondary"
      className={`rounded-circle control-button-large  d-flex justify-content-center align-items-center ${className}`}
      onClick={onClick}
      {...props}
    >
      <MdPause className="icon-large" />
    </Button>
  );
}

export default PauseButton;
