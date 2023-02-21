import { Button } from "react-bootstrap";
import { MdDone } from "react-icons/md";
import AppTooltip from "../AppTooltip";
function DoneButton({ className = "", iconStyle = "", onClick, ...props }) {
  return (
    <AppTooltip text="Done Editing">
      <Button onClick={onClick} variant="secondary" {...props}>
        <MdDone size="2rem" className="icon-black" />
      </Button>
    </AppTooltip>
  );
}

export default DoneButton;
