import { Button } from "react-bootstrap";
import { MdMenu } from "react-icons/md";
function TaskButton({ onClick, className = "", iconStyle = "", ...props }) {
  return (
    <Button
      className={`control-button  d-flex justify-content-center align-items-center ${className}`}
      onClick={onClick}
      {...props}
    >
      <MdMenu className={`icon ${iconStyle}`} />
    </Button>
  );
}

export default TaskButton;
