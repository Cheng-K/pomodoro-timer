import { Button } from "react-bootstrap";
import { RxArrowLeft } from "react-icons/rx";
function BackButton({ className = "", iconStyle = "", onClick, ...props }) {
  return (
    <Button onClick={onClick} variant="secondary" {...props}>
      <RxArrowLeft size="2rem" className="icon-black" />
    </Button>
  );
}

export default BackButton;
