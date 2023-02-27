import { Button } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import AppTooltip from "../AppTooltip";
function DeleteButton({ onClick, ...props }) {
  return (
    <AppTooltip text="Delete Task">
      <Button onClick={onClick} variant="secondary" {...props}>
        <MdDelete size="2rem" className="icon-black" />
      </Button>
    </AppTooltip>
  );
}

export default DeleteButton;
