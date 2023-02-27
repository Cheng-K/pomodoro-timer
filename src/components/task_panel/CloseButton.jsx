import { Button } from "react-bootstrap";
import { MdClose } from "react-icons/md";
import AppTooltip from "../AppTooltip";
function CloseButton({ onClick, ...props }) {
  return (
    <AppTooltip text="Close Tasks List">
      <Button onClick={onClick} variant="secondary" {...props}>
        <MdClose size="2rem" className="icon-black" />
      </Button>
    </AppTooltip>
  );
}

export default CloseButton;
