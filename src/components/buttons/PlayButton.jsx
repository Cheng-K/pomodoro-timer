import { Button } from "react-bootstrap";
import { MdPlayArrow } from "react-icons/md";
function PlayButton({ onClick, className = "", ...props }) {
  return (
    <Button
      variant="secondary"
      className={`control-button-large rounded-circle  d-flex justify-content-center align-items-center ${className}`}
      onClick={onClick}
      {...props}
    >
      <MdPlayArrow className="icon-large" />
    </Button>
  );
}

export default PlayButton;
