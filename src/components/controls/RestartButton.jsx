import { Button } from "react-bootstrap";
import { MdRefresh } from "react-icons/md";
function RestartButton({ className = "" }) {
  return (
    <Button
      variant="secondary"
      className={`rounded-circle control-button d-flex justify-content-center align-items-center ${className}`}
    >
      <MdRefresh className="icon" />
    </Button>
  );
}

export default RestartButton;
