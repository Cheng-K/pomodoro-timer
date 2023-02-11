import { Button } from "react-bootstrap";
import { MdMenu } from "react-icons/md";
function TaskButton({ className = "", iconStyle = "", onClick }) {
  return (
    <Button
      className={`control-button  d-flex justify-content-center align-items-center ${className}`}
      onClick={onClick}
    >
      <MdMenu className={`icon ${iconStyle}`} />
    </Button>
  );
}

export default TaskButton;
