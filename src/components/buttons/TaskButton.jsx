import { Button } from "react-bootstrap";
import { MdMenu } from "react-icons/md";
function TaskButton({ className = "", iconStyle = "" }) {
  return (
    <Button
      className={`control-button  d-flex justify-content-center align-items-center ${className}`}
    >
      <MdMenu className={`icon ${iconStyle}`} />
    </Button>
  );
}

export default TaskButton;
