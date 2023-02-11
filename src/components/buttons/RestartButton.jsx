import { Button } from "react-bootstrap";
import { MdRefresh } from "react-icons/md";
function RestartButton({ className = "", iconStyle = "", onClick }) {
  return (
    <Button
      variant="secondary"
      className={`rounded-circle control-button d-flex justify-content-center align-items-center ${className}`}
      onClick={onClick}
    >
      <MdRefresh className={`icon ${iconStyle}`} />
    </Button>
  );
}

export default RestartButton;
