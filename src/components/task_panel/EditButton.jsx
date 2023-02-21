import Button from "react-bootstrap/Button";
import { MdEdit, MdEditOff } from "react-icons/md";
import AppTooltip from "../AppTooltip";
function EditButton({ onClick, offVariant = false, tooltip = "Edit Task" }) {
  return (
    <AppTooltip text={offVariant ? "Exit Editing" : tooltip}>
      <Button onClick={onClick} variant="secondary">
        {offVariant ? (
          <MdEditOff size="2rem" className="icon-black" />
        ) : (
          <MdEdit size="2rem" className="icon-black" />
        )}
      </Button>
    </AppTooltip>
  );
}

export default EditButton;
