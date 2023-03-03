import Button from "react-bootstrap/Button";
import { MdEdit, MdEditOff } from "react-icons/md";
import AppTooltip from "../AppTooltip";
function EditButton({
  onClick,
  offVariant = false,
  tooltip = "Edit Task",
  ...props
}) {
  return (
    <AppTooltip text={offVariant ? "Exit Editing" : tooltip}>
      <Button onClick={onClick} variant="secondary" {...props}>
        {offVariant ? (
          <MdEditOff size="32px" className="icon-black" />
        ) : (
          <MdEdit size="32px" className="icon-black" />
        )}
      </Button>
    </AppTooltip>
  );
}

export default EditButton;
