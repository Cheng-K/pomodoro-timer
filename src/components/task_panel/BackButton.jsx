import { Button } from "react-bootstrap";
import { RxArrowLeft } from "react-icons/rx";
function BackButton({ className = "", iconStyle = "", onClick }) {
  return (
    <Button onClick={onClick} variant="secondary">
      <RxArrowLeft size="2rem" className="icon-black" />
    </Button>
  );
}

export default BackButton;
