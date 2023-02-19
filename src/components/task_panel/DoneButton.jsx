import { Button } from "react-bootstrap";
import { MdDone } from "react-icons/md";
function DoneButton({ className = "", iconStyle = "", onClick, ...props }) {
  return (
    <Button onClick={onClick} variant="secondary" {...props}>
      <MdDone size="2rem" className="icon-black" />
    </Button>
  );
}

export default DoneButton;
