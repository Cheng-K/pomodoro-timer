import { Button } from "react-bootstrap";
import { MdAdd } from "react-icons/md";
import AppTooltip from "../AppTooltip";
function AddButton({ onClick, ...props }) {
  return (
    <AppTooltip text="Add Task">
      <Button onClick={onClick} variant="secondary" {...props}>
        <MdAdd size="32px" className="icon-black" />
      </Button>
    </AppTooltip>
  );
}

export default AddButton;
