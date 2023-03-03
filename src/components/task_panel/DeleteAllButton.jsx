import { Button } from "react-bootstrap";
import { MdDeleteForever } from "react-icons/md";
import AppTooltip from "../AppTooltip";
function DeleteAllButton({ onClick, ...props }) {
  return (
    <AppTooltip text="Delete All Showing Tasks">
      <Button onClick={onClick} variant="secondary" {...props}>
        <MdDeleteForever size="32px" className="icon-black" />
      </Button>
    </AppTooltip>
  );
}

export default DeleteAllButton;
