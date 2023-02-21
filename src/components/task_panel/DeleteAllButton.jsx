import { Button } from "react-bootstrap";
import { MdDeleteForever } from "react-icons/md";
import AppTooltip from "../AppTooltip";
function DeleteAllButton({ className = "", iconStyle = "", onClick }) {
  return (
    <AppTooltip text="Delete All Showing Tasks">
      <Button onClick={onClick} variant="secondary">
        <MdDeleteForever size="2rem" className="icon-black" />
      </Button>
    </AppTooltip>
  );
}

export default DeleteAllButton;
