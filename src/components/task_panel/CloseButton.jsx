import { Button } from "react-bootstrap";
import { MdClose } from "react-icons/md";
function CloseButton({ className = "", iconStyle = "", onClick }) {
  return (
    <Button onClick={onClick} variant="secondary">
      <MdClose size="2rem" className="icon-black" />
    </Button>
  );
}

export default CloseButton;
