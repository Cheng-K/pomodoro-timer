import { Button } from "react-bootstrap";
import { MdAdd } from "react-icons/md";
import AppTooltip from "../AppTooltip";
function AddButton({ className = "", iconStyle = "", onClick }) {
  return (
    <AppTooltip text="Add Task">
      <Button onClick={onClick} variant="secondary">
        <MdAdd size="2rem" className="icon-black" />
      </Button>
    </AppTooltip>
  );
}

export default AddButton;
