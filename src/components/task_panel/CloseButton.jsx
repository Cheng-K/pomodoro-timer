import { Button } from "react-bootstrap";
import { MdClose } from "react-icons/md";
import AppTooltip from "../AppTooltip";
function CloseButton({ className = "", iconStyle = "", onClick }) {
  return (
    <AppTooltip text="Close Tasks List">
      <Button onClick={onClick} variant="secondary">
        <MdClose size="2rem" className="icon-black" />
      </Button>
    </AppTooltip>
  );
}

export default CloseButton;
