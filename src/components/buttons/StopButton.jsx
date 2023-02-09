import { Button } from "react-bootstrap";
import { MdStop } from "react-icons/md";
function StopButton({ className = "" }) {
  return (
    <Button
      variant="secondary"
      className={`rounded-circle control-button  d-flex justify-content-center align-items-center ${className}`}
    >
      <MdStop className="icon" />
    </Button>
  );
}

export default StopButton;
