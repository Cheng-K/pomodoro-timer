import { Button } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import AppTooltip from "../AppTooltip";
function DeleteButton({ className = "", iconStyle = "", onClick }) {
  return (
    <AppTooltip text="Delete Task">
      <Button onClick={onClick} variant="secondary">
        <MdDelete size="2rem" className="icon-black" />
      </Button>
    </AppTooltip>
  );
}

export default DeleteButton;
