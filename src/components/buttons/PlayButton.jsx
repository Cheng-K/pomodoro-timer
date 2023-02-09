import { Button } from "react-bootstrap";
import { MdPlayArrow } from "react-icons/md";
function PlayButton({ className = "" }) {
  return (
    <Button
      variant="secondary"
      className={`control-button-large rounded-circle  d-flex justify-content-center align-items-center ${className}`}
    >
      <MdPlayArrow className="icon-large" />
    </Button>
  );
}

export default PlayButton;
